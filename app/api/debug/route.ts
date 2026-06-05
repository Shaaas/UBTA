import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data: tx } = await supabase.from("transactions").select("*").limit(1);
  const { error: profileError } = await supabase.from("profiles").insert({
    phone_number: "254708374149",
    full_name: "Test User",
    id_number: "12345678",
    bike_registration_number: "KAA 123B",
    working_county: "Nairobi County",
    sub_county: "Kasarani",
    current_operating_location: "Githurai 45",
    welfare_balance: 0,
    sacco_balance: 0,
  });
  return NextResponse.json({
    transaction: tx,
    profileError: profileError?.message ?? "no error",
  });
}
