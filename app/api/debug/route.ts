import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(url, key);
  const { data, error } = await supabase.from("transactions").select("id").limit(1);
  return NextResponse.json({
    supabaseUrl: url,
    hasServiceKey: !!key,
    testQuery: error ? error.message : "success",
    data,
  });
}
