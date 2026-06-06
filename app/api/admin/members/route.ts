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
    return payload as { id: string; role: string; name: string };
  } catch {
    return null;
  }
}

// GET — fetch paginated members with optional search
export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page   = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const search = searchParams.get("search")?.trim() ?? "";
  const limit  = 20;
  const from   = (page - 1) * limit;
  const to     = from + limit - 1;

  let query = supabase
    .from("profiles")
    .select(`
      id, member_number, full_name, phone_number, id_number,
      bike_registration_number, working_county, sub_county,
      current_operating_location, email_address, date_of_birth,
      next_of_kin_name, next_of_kin_contact, next_of_kin_relationship,
      welfare_balance, sacco_balance, status, created_at,
      transactions (
        mpesa_receipt_number, amount, transaction_type,
        payment_status, created_at
      )
    `, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search) {
    query = query.or(
      `full_name.ilike.%${search}%,phone_number.ilike.%${search}%,id_number.ilike.%${search}%,member_number.eq.${parseInt(search) || 0}`
    );
  }

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ members: data ?? [], total: count ?? 0 });
}

// PATCH — update a member (chairman only)
export async function PATCH(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (admin.role !== "chairman") {
    return NextResponse.json({ error: "Forbidden — chairman only" }, { status: 403 });
  }

  try {
    const { id, ...updates } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Member id required" }, { status: 400 });
    }

    // Strip out fields that shouldn't be patched directly
    const {
      transactions, member_number, created_at, ...safeUpdates
    } = updates as Record<string, unknown>;
    void transactions; void member_number; void created_at;

    const { error } = await supabase
      .from("profiles")
      .update(safeUpdates)
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}