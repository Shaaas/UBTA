import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { jwtVerify } from "jose";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? "ubta-admin-secret-change-in-production"
);

async function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get("ubta_admin_token")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { id: string; role: string };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { memberId, mpesaReceipt, amount } = await req.json();

    if (!memberId) {
      return NextResponse.json({ error: "memberId is required" }, { status: 400 });
    }

    // Update member status
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ status: "verified" })
      .eq("id", memberId);

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    // Only handle transaction if receipt provided
    if (mpesaReceipt) {
      // Try to update existing transaction first
      const { data: existingTx } = await supabase
        .from("transactions")
        .select("id")
        .eq("profile_id", memberId)
        .single();

      if (existingTx) {
        // Update existing transaction
        await supabase
          .from("transactions")
          .update({
            mpesa_receipt_number: mpesaReceipt,
            transaction_type:     "member_registration_paid",
            amount:               amount ?? 1200,
          })
          .eq("profile_id", memberId);
      } else {
        // Create new transaction for manually added members
        await supabase
          .from("transactions")
          .insert({
            profile_id:           memberId,
            mpesa_receipt_number: mpesaReceipt,
            transaction_type:     "member_registration_paid",
            amount:               amount ?? 1200,
          });
      }
    } else {
      // No receipt — create a manual verification transaction
      await supabase
        .from("transactions")
        .insert({
          profile_id:           memberId,
          mpesa_receipt_number: "MANUAL",
          transaction_type:     "member_registration_paid",
          amount:               amount ?? 1200,
        });
    }

    return NextResponse.json({ success: true });

  } catch (err: unknown) {
    console.error("Verify member error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
