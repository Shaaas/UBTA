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
  } catch { return null; }
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const date = formData.get("date") as string;
  const location = formData.get("location") as string;

  if (!file || !title || !category || !date || !location) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  // Upload to Supabase Storage
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(fileName, file, { contentType: file.type, upsert: false });

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

  const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);

  // Save to gallery table
  const { error: dbError } = await supabase.from("gallery").insert({
    title, category, date, location, image_url: urlData.publicUrl,
  });

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

export async function GET() {
  const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
  return NextResponse.json({ items: data ?? [] });
}
