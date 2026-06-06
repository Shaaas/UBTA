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
    return payload as { id: string; email: string; name: string; role: string };
  } catch {
    return null;
  }
}

// GET — fetch members filtered by status
export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? "";
  const page   = parseInt(searchParams.get("page") ?? "1");
  const status = searchParams.get("status") ?? "verified";
  const limit  = 20;
  const offset = (page - 1) * limit;

  let query = supabase
    .from("profiles")
    .select(`
      id, member_number, full_name, phone_number, id_number,
      bike_registration_number, working_county, sub_county,
      current_operating_location, email_address, date_of_birth,
      next_of_kin_name, next_of_kin_contact, next_of_kin_relationship,
      welfare_balance, sacco_balance, created_at, status, certificate_url,
      transactions (
        mpesa_receipt_number, amount, transaction_type, created_at
      )
    `, { count: "exact" })
    .eq("status", status)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (search) {
    query = query.or(
      `full_name.ilike.%${search}%,phone_number.ilike.%${search}%,id_number.ilike.%${search}%,member_number.eq.${parseInt(search) || 0}`
    );
  }

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ members: data, total: count, page, limit });
}

// PATCH — update member details (chairman only)
export async function PATCH(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (admin.role !== "chairman") {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  const { id, ...updates } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Member ID required" }, { status: 400 });
  }

  const allowed = [
    "full_name", "phone_number", "id_number", "bike_registration_number",
    "working_county", "sub_county", "current_operating_location",
    "email_address", "date_of_birth", "next_of_kin_name",
    "next_of_kin_contact", "next_of_kin_relationship",
    "welfare_balance", "sacco_balance", "status",
  ];

  const safeUpdates = Object.fromEntries(
    Object.entries(updates).filter(([k]) => allowed.includes(k))
  );

  const { data, error } = await supabase
    .from("profiles")
    .update(safeUpdates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, member: data });
}