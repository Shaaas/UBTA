import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    shortcode: process.env.DARAJA_SHORTCODE,
    baseUrl: process.env.DARAJA_BASE_URL,
    callbackUrl: process.env.DARAJA_CALLBACK_URL,
    hasKey: !!process.env.DARAJA_CONSUMER_KEY,
    hasSecret: !!process.env.DARAJA_CONSUMER_SECRET,
  });
}
