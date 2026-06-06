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

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { memberId } = await req.json();

    if (!memberId) {
      return NextResponse.json({ error: "memberId required" }, { status: 400 });
    }

    const { data: member, error: memberError } = await supabase
      .from("profiles")
      .select("id, member_number, full_name, phone_number")
      .eq("id", memberId)
      .single();

    if (memberError || !member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Mark as verified
    await supabase
      .from("profiles")
      .update({ status: "verified" })
      .eq("id", memberId);

    const baseUrl        = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ubta.co.ke";
    const certificateUrl = `${baseUrl}/admin/certificate/${memberId}`;

    const phone = member.phone_number.startsWith("254")
      ? member.phone_number
      : "254" + member.phone_number.replace(/^0/, "");

    const waMessage = encodeURIComponent(
      `Hello ${member.full_name},\n\n` +
      `Congratulations! Your UBTA membership has been confirmed. 🎉\n\n` +
      `*Member ID:* UBTA${member.member_number}\n\n` +
      `Tap the link below to view and save your membership certificate:\n` +
      `${certificateUrl}\n\n` +
      `Welcome to the UBTA family! 🏍️\n` +
      `Stronger Together · Safer Together · Growing Together`
    );

    const waLink = `https://wa.me/${phone}?text=${waMessage}`;

    return NextResponse.json({
      success:        true,
      certificateUrl,
      whatsappLink:   waLink,
      memberName:     member.full_name,
      memberNumber:   member.member_number,
    });

  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Certificate generation failed" },
      { status: 500 }
    );
  }
}