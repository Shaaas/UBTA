import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ─── Supabase admin client (service role — server only) ───────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!.replace("/rest/v1/", ""), // strip REST suffix if present
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
  const credentials = Buffer.from(
    `${process.env.DARAJA_CONSUMER_KEY}:${process.env.DARAJA_CONSUMER_SECRET}`
  ).toString("base64");

  const res = await fetch(
    `${process.env.DARAJA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
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
    const body = await req.json();

    // ── 1. Parse & validate payload ──────────────────────────────────────────
    const {
      // Payment
      phone,
      amount,
      membershipType, // "ubta_only" | "sacco_only" | "both" | "affiliate"

      // Profile fields
      fullName,
      idNumber,
      bikeRegistration,
      county,
      subCounty,
      stageNode,
      customStageNode,   // only set when stageNode === "Other / Not Listed"
      dateOfBirth,
      kraPin,            // stored in account_reference on transaction
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
    const shortcode      = process.env.DARAJA_SHORTCODE!;
    const passkey        = process.env.DARAJA_PASSKEY!;
    const ts             = timestamp();
    const pwd            = password(shortcode, passkey, ts);

    // ── 2. Get OAuth token ───────────────────────────────────────────────────
    const token = await getDarajaToken();

    // ── 3. Initiate STK push ─────────────────────────────────────────────────
    const stkRes = await fetch(
      `${process.env.DARAJA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
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
          CallBackURL:       process.env.DARAJA_CALLBACK_URL, // e.g. https://yourdomain.co.ke/api/mpesa/callback
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
    // We upsert on phone_number so re-submissions don't create duplicates.
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
      // Log but don't fail — STK push already sent, callback will retry
      console.error("Supabase profile upsert error:", profileError.message);
    }

    // ── 5. Insert pending transaction ────────────────────────────────────────
    const { error: txError } = await supabase.from("transactions").insert({
      profile_id:          profile?.id ?? null,
      mpesa_receipt_number: stkData.CheckoutRequestID, // real receipt comes in callback
      amount:              amount,
      phone_number:        formattedPhone,
      account_reference:   kraPin ?? "UBTA-REG",
      transaction_type:    membershipType ?? "member_registration",
      raw_callback_json:   null, // filled in by /api/mpesa/callback
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