// Certificate HTML template — rendered to PDF via puppeteer
// Matches the UBTA certificate design: landscape, orange/green/white branding

export interface CertificateData {
  memberNumber:   number;
  fullName:       string;
  phoneNumber:    string;
  idNumber:       string;
  membershipType: string;
  mpesaReceipt:   string;
  dateJoined:     string;
  county:         string;
  bikeReg:        string;
}

function formatMembershipType(type: string): string {
  if (type === "ubta_only")   return "UBTA Association Member";
  if (type === "sacco_only")  return "CBD SACCO Member";
  if (type === "both")        return "UBTA & CBD SACCO Member";
  if (type === "affiliate")   return "SACCO Affiliate";
  return type.replace(/_/g, " ").toUpperCase();
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-KE", {
    day: "2-digit", month: "long", year: "numeric",
  });
}

export function generateCertificateHTML(data: CertificateData): string {
  const membershipLabel = formatMembershipType(data.membershipType);
  const dateLabel       = formatDate(data.dateJoined);
  const memberId        = `UBTA${data.memberNumber}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>UBTA Certificate of Membership — ${data.fullName}</title>
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@400;600;700;900&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    width: 1122px;
    height: 794px;
    background: #ffffff;
    font-family: 'Montserrat', sans-serif;
    overflow: hidden;
    position: relative;
  }

  /* ── Corner triangles ── */
  .corner-tl {
    position: absolute; top: 0; left: 0;
    width: 0; height: 0;
    border-style: solid;
    border-width: 160px 160px 0 0;
    border-color: #F37121 transparent transparent transparent;
    z-index: 1;
  }
  .corner-br {
    position: absolute; bottom: 0; right: 0;
    width: 0; height: 0;
    border-style: solid;
    border-width: 0 0 180px 280px;
    border-color: transparent transparent #1a5c2e transparent;
    z-index: 1;
  }
  .corner-br-orange {
    position: absolute; bottom: 0; right: 0;
    width: 0; height: 0;
    border-style: solid;
    border-width: 0 0 90px 180px;
    border-color: transparent transparent #F37121 transparent;
    z-index: 2;
  }

  /* ── Outer border ── */
  .outer-border {
    position: absolute;
    inset: 10px;
    border: 3px solid #F37121;
    z-index: 0;
    pointer-events: none;
  }
  .inner-border {
    position: absolute;
    inset: 16px;
    border: 1px solid #d4a84b;
    z-index: 0;
    pointer-events: none;
  }

  /* ── Main layout ── */
  .layout {
    position: absolute;
    inset: 28px;
    display: flex;
    z-index: 10;
  }

  /* ── Left column ── */
  .left-col {
    width: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 8px;
    gap: 18px;
    shrink: 0;
  }

  .logo-wrap {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid #F37121;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(243,113,33,0.2);
  }
  .logo-wrap img {
    width: 90px;
    height: 90px;
    object-fit: contain;
    border-radius: 50%;
  }

  .meta-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #f9f9f9;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    padding: 14px 12px;
  }
  .meta-row {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .meta-label {
    font-size: 8px;
    font-weight: 900;
    color: #1a5c2e;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .meta-value {
    font-size: 11px;
    font-weight: 700;
    color: #111;
    font-family: 'Montserrat', sans-serif;
  }

  .divider-h {
    width: 100%;
    height: 1px;
    background: #e0e0e0;
  }

  /* ── Right column ── */
  .right-col {
    flex: 1;
    padding-left: 28px;
    display: flex;
    flex-direction: column;
  }

  /* Header */
  .cert-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .org-name {
    display: flex;
    flex-direction: column;
  }
  .ubta-title {
    font-size: 52px;
    font-weight: 900;
    letter-spacing: 0.05em;
    line-height: 1;
    color: #111;
  }
  .ubta-title span.u { color: #F37121; }
  .ubta-title span.b { color: #1a5c2e; }
  .ubta-title span.t { color: #F37121; }
  .ubta-title span.a { color: #1a5c2e; }

  .org-subtitle {
    font-size: 9.5px;
    font-weight: 700;
    color: #1a5c2e;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-top: 2px;
    line-height: 1.4;
  }
  .org-tagline {
    font-size: 8.5px;
    color: #555;
    margin-top: 3px;
    font-style: italic;
  }
  .org-tagline span { color: #F37121; }

  /* Gold seal badge */
  .seal {
    width: 72px;
    height: 72px;
    background: radial-gradient(circle at 35% 35%, #f5d060, #c8941a, #8b6200);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 12px rgba(200,148,26,0.4);
    border: 2px solid #d4a84b;
  }
  .seal-text {
    font-size: 7px;
    font-weight: 900;
    color: white;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    line-height: 1.3;
    text-shadow: 0 1px 2px rgba(0,0,0,0.4);
  }
  .seal-text .seal-ubta {
    font-size: 14px;
    font-weight: 900;
    display: block;
  }

  /* Certificate title */
  .cert-title-block {
    text-align: center;
    margin: 6px 0 8px;
    border-top: 2px solid #F37121;
    border-bottom: 1px solid #d4a84b;
    padding: 7px 0;
  }
  .cert-title {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 700;
    color: #111;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .cert-subtitle {
    font-size: 11px;
    font-weight: 900;
    color: #1a5c2e;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    margin-top: 1px;
  }

  /* Certify strip */
  .certify-strip {
    background: #111;
    color: white;
    text-align: center;
    font-size: 8.5px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 4px 0;
    margin-bottom: 6px;
    border-radius: 2px;
  }

  /* Member name */
  .member-name {
    font-family: 'Dancing Script', cursive;
    font-size: 44px;
    font-weight: 700;
    color: #111;
    text-align: center;
    line-height: 1;
    margin-bottom: 8px;
  }

  /* Body text */
  .cert-body {
    font-size: 10.5px;
    color: #333;
    text-align: center;
    line-height: 1.6;
    max-width: 480px;
    margin: 0 auto 10px;
  }
  .cert-body strong { color: #F37121; }

  /* Tagline */
  .tagline {
    text-align: center;
    font-size: 8px;
    font-weight: 900;
    color: #1a5c2e;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    padding: 5px 0;
    margin-bottom: 12px;
  }

  /* Signature section */
  .sig-section {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 8px;
  }

  .sig-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    min-width: 160px;
  }
  .sig-line-area {
    width: 160px;
    height: 36px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 4px;
  }
  .sig-placeholder {
    font-family: 'Dancing Script', cursive;
    font-size: 26px;
    color: #222;
    line-height: 1;
  }
  .sig-divider {
    width: 160px;
    height: 1px;
    background: #333;
  }
  .sig-label {
    font-size: 8px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #444;
    margin-top: 3px;
  }
  .sig-name {
    font-size: 8.5px;
    font-weight: 600;
    color: #111;
  }

  /* Center seal */
  .center-seal {
    width: 70px;
    height: 70px;
    background: radial-gradient(circle at 35% 35%, #f5d060, #c8941a, #8b6200);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(200,148,26,0.5);
    border: 3px solid #d4a84b;
    margin-bottom: 8px;
  }
  .center-seal-text {
    font-size: 13px;
    font-weight: 900;
    color: white;
    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
    letter-spacing: 0.05em;
  }

  /* Receipt row in meta */
  .receipt-tag {
    font-size: 9px;
    font-weight: 700;
    color: #F37121;
    font-family: monospace;
    word-break: break-all;
  }
</style>
</head>
<body>

  <!-- Borders -->
  <div class="outer-border"></div>
  <div class="inner-border"></div>

  <!-- Corner accents -->
  <div class="corner-tl"></div>
  <div class="corner-br"></div>
  <div class="corner-br-orange"></div>

  <!-- Main layout -->
  <div class="layout">

    <!-- LEFT COLUMN -->
    <div class="left-col">
      <div class="logo-wrap">
        <img src="https://ubta.co.ke/logo.jpeg" alt="UBTA Logo" />
      </div>

      <div class="meta-block">
        <div class="meta-row">
          <span class="meta-label">Member ID</span>
          <span class="meta-value">${memberId}</span>
        </div>
        <div class="divider-h"></div>
        <div class="meta-row">
          <span class="meta-label">Date Joined</span>
          <span class="meta-value">${dateLabel}</span>
        </div>
        <div class="divider-h"></div>
        <div class="meta-row">
          <span class="meta-label">Membership Type</span>
          <span class="meta-value">${membershipLabel}</span>
        </div>
        <div class="divider-h"></div>
        <div class="meta-row">
          <span class="meta-label">National ID</span>
          <span class="meta-value">${data.idNumber}</span>
        </div>
        <div class="divider-h"></div>
        <div class="meta-row">
          <span class="meta-label">Phone</span>
          <span class="meta-value">${data.phoneNumber}</span>
        </div>
        <div class="divider-h"></div>
        <div class="meta-row">
          <span class="meta-label">M-Pesa Receipt</span>
          <span class="receipt-tag">${data.mpesaReceipt}</span>
        </div>
        <div class="divider-h"></div>
        <div class="meta-row">
          <span class="meta-label">Paybill</span>
          <span class="meta-value">4146697</span>
        </div>
      </div>
    </div>

    <!-- RIGHT COLUMN -->
    <div class="right-col">

      <!-- Header -->
      <div class="cert-header">
        <div class="org-name">
          <div class="ubta-title">
            <span class="u">U</span><span class="b">B</span><span class="t">T</span><span class="a">A</span>
          </div>
          <div class="org-subtitle">CBD United Boda Transport<br/>Co-Operative Society Limited</div>
          <div class="org-tagline">Stronger Together. <span>Safer Together.</span> Growing Together.</div>
        </div>
        <div class="seal">
          <div class="seal-text">
            <span>★ ★ ★ ★ ★</span>
            <span class="seal-ubta">UBTA</span>
            <span>Certified</span>
            <span>Member</span>
          </div>
        </div>
      </div>

      <!-- Certificate title -->
      <div class="cert-title-block">
        <div class="cert-title">Certificate</div>
        <div class="cert-subtitle">— Of Membership —</div>
      </div>

      <!-- Certify strip -->
      <div class="certify-strip">This is to certify that</div>

      <!-- Member name -->
      <div class="member-name">${data.fullName}</div>

      <!-- Body text -->
      <div class="cert-body">
        is a registered member of CBD United Boda Transport Co-Operative Society Limited
        (<strong>UBTA</strong>) and is entitled to all rights and privileges of membership
        in accordance with the Society's by-laws.
      </div>

      <!-- Tagline -->
      <div class="tagline">Together, We Ride for a Better Tomorrow</div>

      <!-- Signatures -->
      <div class="sig-section">
        <div class="sig-block">
          <div class="sig-line-area">
            <span class="sig-placeholder">James M.</span>
          </div>
          <div class="sig-divider"></div>
          <div class="sig-label">Chairperson</div>
          <div class="sig-name">James Muigai</div>
        </div>

        <div class="center-seal">
          <span class="center-seal-text">UBTA</span>
        </div>
      </div>

    </div>
  </div>

</body>
</html>`;
}