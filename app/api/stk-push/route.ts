import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Force Next.js to treat this STK engine endpoint as purely dynamic
export const dynamic = 'force-dynamic';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Normalise any Kenyan phone format to 254XXXXXXXXX */
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("254")) return digits;
  if (digits.startsWith("0"))   return "254" + digits.slice(1);
  return "254" + digits;
}

/** Safaricom STK timestamp: YYYYMMDDHHmmss */
function timestamp(): string {
  return new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .slice(0, 14);
}

/** Base64(Shortcode + Passkey + Timestamp) */
function password(shortcode: string, passkey: string, ts: string): string {
  return Buffer.from(shortcode + passkey + ts).toString("base64");
}

/** Get Daraja OAuth token */
async function getDarajaToken(): Promise<string> {
  // Safe string defaults prevent crash failures when running inside the Vercel builder container
  const consumerKey = process.env.DARAJA_CONSUMER_KEY || "placeholder";
  const consumerSecret = process.env.DARAJA_CONSUMER_SECRET || "placeholder";
  const baseUrl = process.env.DARAJA_BASE_URL || "https://sandbox.safaricom.co.ke";

  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  const res = await fetch(
    `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${credentials}` } }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Daraja OAuth failed: ${text}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

// ─── POST /api/stk-push ───────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    // Safely pull string targets for build container evaluation
    const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co').replace("/rest/v1/", "");
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';

    // Scoped execution inside the runtime pipeline blocks compile-time environment validation crashes
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();

    // ── 1. Parse & validate payload ──────────────────────────────────────────
    const {
      phone,
      amount,
      membershipType,
      fullName,
      idNumber,
      bikeRegistration,
      county,
      subCounty,
      stageNode,
      customStageNode,
      dateOfBirth,
      kraPin,
      kinName,
      kinPhone,
      kinRelationship,
    } = body;

    if (!phone || !amount || !fullName || !idNumber) {
      return NextResponse.json(
        { error: "Missing required fields: phone, amount, fullName, idNumber" },
        { status: 400 }
      );
    }

    const formattedPhone = formatPhone(phone);
    const shortcode      = process.env.DARAJA_SHORTCODE || "000000";
    const passkey        = process.env.DARAJA_PASSKEY || "placeholder";
    const baseUrl        = process.env.DARAJA_BASE_URL || "https://sandbox.safaricom.co.ke";
    const callbackUrl    = process.env.DARAJA_CALLBACK_URL || "https://example.com/api/mpesa/callback";
    const ts             = timestamp();
    const pwd            = password(shortcode, passkey, ts);

    // ── 2. Get OAuth token ───────────────────────────────────────────────────
    const token = await getDarajaToken();

    // ── 3. Initiate STK push ─────────────────────────────────────────────────
    const stkRes = await fetch(
      `${baseUrl}/mpesa/stkpush/v1/processrequest`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: shortcode,
          Password:          pwd,
          Timestamp:         ts,
          TransactionType:   "CustomerPayBillOnline",
          Amount:            amount,
          PartyA:            formattedPhone,
          PartyB:            shortcode,
          PhoneNumber:       formattedPhone,
          CallBackURL:       callbackUrl,
          AccountReference:  "UBTA-REG",
          TransactionDesc:   `UBTA Registration - ${membershipType ?? "member"}`,
        }),
      }
    );

    const stkData = await stkRes.json();

    if (!stkRes.ok || stkData.ResponseCode !== "0") {
      console.error("STK push error:", stkData);
      return NextResponse.json(
        {
          error: stkData.errorMessage ?? stkData.ResponseDescription ?? "STK push failed",
          rawDetails: stkData,
        },
        { status: 400 }
      );
    }

    // ── 4. Insert profile into Supabase ──────────────────────────────────────
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .upsert(
        {
          phone_number:               formattedPhone,
          full_name:                  fullName,
          id_number:                  idNumber,
          bike_registration_number:   bikeRegistration  ?? "",
          working_county:             county            ?? "",
          sub_county:                 subCounty         ?? "",
          current_operating_location: stageNode         ?? "",
          custom_stage_node:          customStageNode   ?? null,
          date_of_birth:              dateOfBirth       ?? null,
          next_of_kin_name:           kinName           ?? null,
          next_of_kin_contact:        kinPhone          ?? null,
          next_of_kin_relationship:   kinRelationship   ?? null,
          welfare_balance:            0,
          sacco_balance:              0,
        },
        { onConflict: "phone_number" }
      )
      .select("id")
      .single();

    if (profileError) {
      console.error("Supabase profile upsert error:", profileError.message);
    }

    // ── 5. Insert pending transaction ────────────────────────────────────────
    const { error: txError } = await supabase.from("transactions").insert({
      profile_id:          profile?.id ?? null,
      mpesa_receipt_number: stkData.CheckoutRequestID,
      amount:              amount,
      phone_number:        formattedPhone,
      account_reference:   kraPin ?? "UBTA-REG",
      transaction_type:    membershipType ?? "member_registration",
      raw_callback_json:   null,
    });

    if (txError) {
      console.error("Supabase transaction insert error:", txError.message);
    }

    // ── 6. Return success ────────────────────────────────────────────────────
    return NextResponse.json({
      success:          true,
      checkoutRequestId: stkData.CheckoutRequestID,
      message:          stkData.CustomerMessage ?? "STK push sent. Check your phone.",
    });

  } catch (err: unknown) {
    console.error("STK push handler error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}