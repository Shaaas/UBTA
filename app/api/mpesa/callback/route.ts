import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!.replace("/rest/v1/", ""),
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * POST /api/mpesa/callback
 *
 * Safaricom calls this URL after the user completes (or cancels) the STK push.
 * We update the matching transaction row with the real receipt number and full
 * callback JSON for audit purposes.
 *
 * This URL must be:
 *  - Publicly reachable (no localhost — use ngrok during dev)
 *  - Set as DARAJA_CALLBACK_URL in your .env
 *  - Whitelisted in your Daraja app's callback URL field
 */
export async function POST(req: NextRequest) {
  try {
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

      // Always return 200 to Safaricom — they retry on non-200
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
      .eq("mpesa_receipt_number", CheckoutRequestID); // was stored as CheckoutRequestID initially

    if (error) {
      console.error("Supabase transaction update error:", error.message);
    }

    console.log(
      `✅ Payment confirmed — Receipt: ${mpesaReceiptNumber} | Amount: ${amount} | Phone: ${phoneNumber} | Date: ${transactionDate}`
    );

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });

  } catch (err: unknown) {
    console.error("Callback handler error:", err);
    // Still return 200 — Safaricom will retry on errors, causing duplicate processing
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
}