import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { jwtVerify } from "jose";
import { generateCertificateHTML, CertificateData } from "../../../../lib/certificate-template";

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

    // ── 1. Fetch member + latest transaction ──────────────────────────────────
    const { data: member, error: memberError } = await supabase
      .from("profiles")
      .select(`
        id, member_number, full_name, phone_number, id_number,
        bike_registration_number, working_county, created_at,
        transactions (mpesa_receipt_number, transaction_type, created_at)
      `)
      .eq("id", memberId)
      .single();

    if (memberError || !member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    const latestTx = member.transactions?.[0];

    const certData: CertificateData = {
      memberNumber:   member.member_number,
      fullName:       member.full_name,
      phoneNumber:    member.phone_number,
      idNumber:       member.id_number,
      membershipType: latestTx?.transaction_type ?? "member_registration",
      mpesaReceipt:   latestTx?.mpesa_receipt_number ?? "N/A",
      dateJoined:     member.created_at,
      county:         member.working_county,
      bikeReg:        member.bike_registration_number,
    };

    // ── 2. Generate HTML ──────────────────────────────────────────────────────
    const html = generateCertificateHTML(certData);

    // ── 3. Render to PDF using puppeteer ─────────────────────────────────────
    // Dynamic import so it only loads server-side
    const puppeteer = await import("puppeteer-core");
    const chromium  = await import("@sparticuz/chromium");

    const browser = await puppeteer.default.launch({
      args:            chromium.default.args,
      defaultViewport: chromium.default.defaultViewport,
      executablePath:  await chromium.default.executablePath(),
      headless:        true,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      width:           "1122px",
      height:          "794px",
      printBackground: true,
      margin:          { top: "0", right: "0", bottom: "0", left: "0" },
    });

    await browser.close();

    // ── 4. Upload to Supabase Storage ────────────────────────────────────────
    const fileName = `certificates/UBTA${member.member_number}-${member.full_name.replace(/\s+/g, "-")}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from("certificates")
      .upload(fileName, pdfBuffer, {
        contentType: "application/pdf",
        upsert:      true,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError.message);
    }

    // ── 5. Get public URL ─────────────────────────────────────────────────────
    const { data: urlData } = supabase.storage
      .from("certificates")
      .getPublicUrl(fileName);

    const certificateUrl = urlData?.publicUrl ?? null;

    // ── 6. Update member status to verified ──────────────────────────────────
    await supabase
      .from("profiles")
      .update({ status: "verified" })
      .eq("id", memberId);

    // ── 7. Build WhatsApp message link ───────────────────────────────────────
    const waMessage = encodeURIComponent(
      `Hello ${member.full_name},\n\n` +
      `Congratulations! Your UBTA membership has been confirmed.\n\n` +
      `*Member ID:* UBTA${member.member_number}\n` +
      `*Membership Type:* ${certData.membershipType.replace(/_/g, " ")}\n` +
      `*M-Pesa Receipt:* ${certData.mpesaReceipt}\n\n` +
      `Your membership certificate is ready:\n${certificateUrl ?? "Contact office for certificate"}\n\n` +
      `Welcome to the UBTA family! 🏍️\n` +
      `Stronger Together · Safer Together · Growing Together`
    );

    const phone    = member.phone_number.startsWith("254")
      ? member.phone_number
      : "254" + member.phone_number.replace(/^0/, "");
    const waLink   = `https://wa.me/${phone}?text=${waMessage}`;

    return NextResponse.json({
      success:        true,
      certificateUrl,
      whatsappLink:   waLink,
      memberName:     member.full_name,
      memberNumber:   member.member_number,
    });

  } catch (err: unknown) {
    console.error("Certificate generation error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Certificate generation failed" },
      { status: 500 }
    );
  }
}