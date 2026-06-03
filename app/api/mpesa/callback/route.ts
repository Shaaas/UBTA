import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Force Next.js to treat this webhook endpoint as completely dynamic
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // Safely parse or fallback to placeholder URLs during compilation
    const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co').replace("/rest/v1/", "");
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';

    // Initialize inside the execution handler to block build-time env crashes
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const raw = await req.json();
    const callback = raw?.Body?.stkCallback;

    if (!callback) {
      return NextResponse.json({ error: "Invalid callback payload" }, { status: 400 });
    }

    const {
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = callback;

    // ── Payment failed or was cancelled ──────────────────────────────────────
    if (ResultCode !== 0) {
      console.warn(`STK callback — payment failed [${ResultCode}]: ${ResultDesc}`);

      await supabase
        .from("transactions")
        .update({
          transaction_type: `failed_${ResultCode}`,
          raw_callback_json: raw,
        })
        .eq("mpesa_receipt_number", CheckoutRequestID);

      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    // ── Payment succeeded — extract metadata ──────────────────────────────────
    const items: { Name: string; Value: string | number }[] =
      CallbackMetadata?.Item ?? [];

    const get = (name: string) =>
      items.find((i) => i.Name === name)?.Value ?? null;

    const mpesaReceiptNumber = get("MpesaReceiptNumber") as string | null;
    const transactionDate    = get("TransactionDate");
    const phoneNumber        = get("PhoneNumber");
    const amount             = get("Amount");

    // ── Update transaction row ────────────────────────────────────────────────
    const { error } = await supabase
      .from("transactions")
      .update({
        mpesa_receipt_number: mpesaReceiptNumber ?? CheckoutRequestID,
        transaction_type:     "member_registration_paid",
        raw_callback_json:    raw,
      })
      .eq("mpesa_receipt_number", CheckoutRequestID);

    if (error) {
      console.error("Supabase transaction update error:", error.message);
    }

    console.log(
      `✅ Payment confirmed — Receipt: ${mpesaReceiptNumber} | Amount: ${amount} | Phone: ${phoneNumber} | Date: ${transactionDate}`
    );

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });

  } catch (err: unknown) {
    console.error("Callback handler error:", err);
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
}