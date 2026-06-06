import { createClient } from "@supabase/supabase-js";
import { generateCertificateHTML } from "../../../../lib/certificate-template";

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: member, error } = await supabase
    .from("profiles")
    .select(`
      id, member_number, full_name, phone_number, id_number,
      bike_registration_number, working_county, created_at,
      transactions (mpesa_receipt_number, transaction_type, created_at)
    `)
    .eq("id", memberId)
    .single();

  if (error || !member) {
    return (
      <div style={{ fontFamily: "sans-serif", padding: 40, color: "#fff", background: "#0B1220", minHeight: "100vh" }}>
        <p style={{ color: "#f87171", fontWeight: "bold" }}>Error loading certificate</p>
        <p style={{ color: "#94a3b8", marginTop: 8, fontSize: 14 }}>Member ID: {memberId}</p>
        <p style={{ color: "#94a3b8", marginTop: 4, fontSize: 14 }}>
          Error: {error?.message ?? "Member not found"}
        </p>
        <p style={{ color: "#94a3b8", marginTop: 4, fontSize: 14 }}>
          Code: {error?.code ?? "—"}
        </p>
      </div>
    );
  }

  const latestTx = member.transactions?.[0];

  const html = generateCertificateHTML({
    memberNumber:   member.member_number,
    fullName:       member.full_name,
    phoneNumber:    member.phone_number,
    idNumber:       member.id_number,
    membershipType: latestTx?.transaction_type ?? "member_registration",
    mpesaReceipt:   latestTx?.mpesa_receipt_number ?? "N/A",
    dateJoined:     member.created_at,
    county:         member.working_county,
    bikeReg:        member.bike_registration_number,
  });

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; }
        }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        if (window.location.search.includes('print=true')) {
          window.onload = function() {
            setTimeout(function() { window.print(); }, 800);
          };
        }
      `}} />

      <div
        className="no-print"
        style={{
          position: "fixed", top: 16, right: 16, zIndex: 9999,
        }}
      >
        <button
          onClick={() => window.print()}
          style={{
            background: "#F37121", color: "white", border: "none",
            padding: "10px 24px", borderRadius: 8, fontWeight: 700,
            cursor: "pointer", fontSize: 14,
          }}
        >
          Save as PDF
        </button>
      </div>

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}