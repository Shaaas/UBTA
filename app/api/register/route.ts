import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("254")) return digits;
  if (digits.startsWith("0"))   return "254" + digits.slice(1);
  return "254" + digits;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      mpesaReceipt, amount, membershipType,
      fullName, phone, idNumber, bikeRegistration,
      county, subCounty, stageNode, dateOfBirth,
      kraPin, emailAddress, kinName, kinPhone, kinRelationship,
    } = body;

    if (!fullName || !phone || !mpesaReceipt) {
      return NextResponse.json(
        { error: "Full name, phone, and M-Pesa receipt are required" },
        { status: 400 }
      );
    }

    const formattedPhone = formatPhone(phone);

    // ── 1. Upsert profile ────────────────────────────────────────────────────
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .upsert(
        {
          phone_number:               formattedPhone,
          full_name:                  fullName,
          id_number:                  idNumber         ?? "",
          bike_registration_number:   bikeRegistration ?? "",
          working_county:             county           ?? "",
          sub_county:                 subCounty        ?? "",
          current_operating_location: stageNode        ?? "",
          date_of_birth:              dateOfBirth      ?? null,
          email_address:              emailAddress     ?? null,
          next_of_kin_name:           kinName          ?? null,
          next_of_kin_contact:        kinPhone         ?? null,
          next_of_kin_relationship:   kinRelationship  ?? null,
          welfare_balance:            0,
          sacco_balance:              0,
          status:                     "pending",
        },
        { onConflict: "phone_number" }
      )
      .select("id, member_number")
      .single();

    if (profileError) {
      console.error("Profile upsert error:", profileError.message);
      return NextResponse.json(
        { error: "Failed to save your details. Please try again." },
        { status: 500 }
      );
    }

    // ── 2. Insert pending transaction ────────────────────────────────────────
    const { error: txError } = await supabase
      .from("transactions")
      .insert({
        profile_id:           profile.id,
        mpesa_receipt_number: mpesaReceipt,
        amount:               amount,
        phone_number:         formattedPhone,
        account_reference:    kraPin ?? "UBTA-REG",
        transaction_type:     membershipType ?? "member_registration",
        raw_callback_json:    null,
      });

    if (txError) {
      console.error("Transaction insert error:", txError.message);
      // Don't fail — profile saved, admin can add receipt manually
    }

    return NextResponse.json({
      success:      true,
      memberNumber: profile.member_number,
      message:      "Application submitted. Pending verification.",
    });

  } catch (err: unknown) {
    console.error("Register route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}