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
  if (type === "ubta_only")  return "UBTA Association Member";
  if (type === "sacco_only") return "CBD SACCO Member";
  if (type === "both")       return "UBTA & CBD SACCO Member";
  if (type === "affiliate")  return "SACCO Affiliate";
  return "Ordinary Member";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-KE", {
    day: "2-digit", month: "long", year: "numeric",
  });
}

const CHAIRPERSON_SIG = "data:image/jpeg;base64,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";

export function generateCertificateHTML(data: CertificateData): string {
  const membershipLabel = formatMembershipType(data.membershipType);
  const dateLabel       = formatDate(data.dateJoined);
  const memberId        = `UBTA${data.memberNumber}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>UBTA Certificate — ${data.fullName}</title>
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@400;600;700;900&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1122px; height:794px;
    background:#ffffff;
    font-family:'Montserrat',sans-serif;
    overflow:hidden; position:relative;
  }

  /* ── Outer borders ── */
  .border-outer {
    position:absolute; inset:8px;
    border:3px solid #F37121; z-index:1; pointer-events:none;
  }
  .border-inner {
    position:absolute; inset:14px;
    border:1px solid #d4a84b; z-index:1; pointer-events:none;
  }

  /* ── Corner accents ── */
  .corner-tl {
    position:absolute; top:0; left:0; width:0; height:0;
    border-style:solid; border-width:180px 180px 0 0;
    border-color:#F37121 transparent transparent transparent; z-index:2;
  }
  .corner-tr-green {
    position:absolute; top:0; right:0; width:0; height:0;
    border-style:solid; border-width:0 120px 120px 0;
    border-color:transparent #1a5c2e transparent transparent; z-index:2;
  }
  .corner-tr-orange {
    position:absolute; top:0; right:0; width:0; height:0;
    border-style:solid; border-width:0 60px 60px 0;
    border-color:transparent #F37121 transparent transparent; z-index:3;
  }
  .corner-br {
    position:absolute; bottom:0; right:0; width:0; height:0;
    border-style:solid; border-width:0 0 200px 300px;
    border-color:transparent transparent #1a5c2e transparent; z-index:2;
  }
  .corner-br-orange {
    position:absolute; bottom:0; right:0; width:0; height:0;
    border-style:solid; border-width:0 0 100px 180px;
    border-color:transparent transparent #F37121 transparent; z-index:3;
  }

  /* ── Motorbike silhouette placeholder ── */
  .moto-area {
    position:absolute; bottom:0; right:0;
    width:320px; height:280px;
    z-index:4; overflow:hidden;
    display:flex; align-items:flex-end; justify-content:flex-end;
  }
  .moto-area img {
    width:300px; object-fit:contain;
    filter:drop-shadow(0 0 8px rgba(0,0,0,0.3));
  }

  /* ── Layout ── */
  .layout {
    position:absolute; inset:26px;
    display:flex; gap:0; z-index:10;
  }

  /* ── Left column ── */
  .left-col {
    width:220px; shrink:0;
    display:flex; flex-direction:column;
    align-items:center; gap:16px; padding-top:4px;
  }
  .logo-wrap {
    width:96px; height:96px; border-radius:50%;
    border:3px solid #F37121;
    display:flex; align-items:center; justify-content:center;
    background:white; overflow:hidden;
    box-shadow:0 4px 16px rgba(243,113,33,0.25);
  }
  .logo-wrap img { width:88px; height:88px; object-fit:contain; border-radius:50%; }

  .meta-box {
    width:100%; background:#f8f8f8;
    border:1px solid #e8e8e8; border-radius:8px;
    padding:14px 12px; display:flex; flex-direction:column; gap:10px;
  }
  .meta-row { display:flex; flex-direction:column; gap:1px; }
  .meta-label {
    font-size:7.5px; font-weight:900; color:#1a5c2e;
    text-transform:uppercase; letter-spacing:0.1em;
  }
  .meta-value { font-size:10.5px; font-weight:700; color:#111; }
  .meta-divider { width:100%; height:1px; background:#e0e0e0; }

  /* ── Right column ── */
  .right-col {
    flex:1; padding-left:24px;
    display:flex; flex-direction:column;
  }

  /* Header row */
  .header-row {
    display:flex; align-items:flex-start;
    justify-content:space-between; margin-bottom:6px;
  }
  .ubta-block { display:flex; flex-direction:column; }
  .ubta-letters {
    font-size:54px; font-weight:900;
    letter-spacing:0.06em; line-height:1; color:#111;
  }
  .ubta-letters .u { color:#F37121; }
  .ubta-letters .b { color:#1a5c2e; }
  .ubta-letters .t { color:#F37121; }
  .ubta-letters .a { color:#1a5c2e; }
  .org-name {
    font-size:9px; font-weight:900; color:#1a5c2e;
    text-transform:uppercase; letter-spacing:0.05em;
    line-height:1.4; margin-top:2px;
  }
  .org-tagline {
    font-size:8px; color:#555; margin-top:3px; font-style:italic;
  }
  .org-tagline span { color:#F37121; }

  /* Gold seal */
  .gold-seal {
    width:74px; height:74px;
    background:radial-gradient(circle at 35% 35%,#f5d060,#c8941a,#8b6200);
    border-radius:50%;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    box-shadow:0 3px 12px rgba(200,148,26,0.45);
    border:2px solid #d4a84b;
  }
  .seal-text {
    font-size:6.5px; font-weight:900; color:white;
    text-align:center; text-transform:uppercase;
    letter-spacing:0.05em; line-height:1.35;
    text-shadow:0 1px 2px rgba(0,0,0,0.4);
  }
  .seal-text .seal-stars { font-size:7px; }
  .seal-text .seal-ubta  { font-size:15px; font-weight:900; display:block; }

  /* Certificate title */
  .cert-title-block {
    text-align:center;
    border-top:2px solid #F37121;
    border-bottom:1px solid #d4a84b;
    padding:6px 0; margin:5px 0 6px;
  }
  .cert-title {
    font-family:'Playfair Display',serif;
    font-size:32px; font-weight:700;
    color:#111; letter-spacing:0.14em; text-transform:uppercase;
  }
  .cert-subtitle {
    font-size:10.5px; font-weight:900; color:#1a5c2e;
    letter-spacing:0.28em; text-transform:uppercase; margin-top:1px;
  }

  /* Black certify strip */
  .certify-strip {
    background:#111; color:white; text-align:center;
    font-size:8px; font-weight:700;
    letter-spacing:0.22em; text-transform:uppercase;
    padding:4px 0; margin-bottom:5px; border-radius:2px;
  }

  /* Member name */
  .member-name {
    font-family:'Dancing Script',cursive;
    font-size:46px; font-weight:700; color:#111;
    text-align:center; line-height:1; margin-bottom:7px;
  }

  /* Body text */
  .cert-body {
    font-size:10px; color:#333; text-align:center;
    line-height:1.65; max-width:460px; margin:0 auto 8px;
  }
  .cert-body strong { color:#F37121; }

  /* Tagline */
  .tagline {
    text-align:center; font-size:7.5px; font-weight:900;
    color:#1a5c2e; letter-spacing:0.2em; text-transform:uppercase;
    border-top:1px solid #e0e0e0; border-bottom:1px solid #e0e0e0;
    padding:4px 0; margin-bottom:10px;
  }
  .tagline::before,.tagline::after { content:"— "; color:#d4a84b; }

  /* Signature section */
  .sig-section {
    display:flex; align-items:flex-end;
    justify-content:space-between; margin-top:auto; padding-top:4px;
  }
  .sig-block {
    display:flex; flex-direction:column;
    align-items:center; gap:0; min-width:160px;
  }
  .sig-img-wrap {
    width:160px; height:50px;
    display:flex; align-items:flex-end; justify-content:center;
  }
  .sig-img-wrap img {
    max-height:48px; max-width:150px; object-fit:contain;
  }
  .sig-line { width:160px; height:1px; background:#333; }
  .sig-label {
    font-size:7.5px; font-weight:700; text-transform:uppercase;
    letter-spacing:0.14em; color:#444; margin-top:3px;
  }
  .sig-name { font-size:8px; font-weight:600; color:#111; }

  /* Center seal */
  .center-seal {
    width:66px; height:66px;
    background:radial-gradient(circle at 35% 35%,#f5d060,#c8941a,#8b6200);
    border-radius:50%; display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    box-shadow:0 4px 16px rgba(200,148,26,0.5);
    border:3px solid #d4a84b; margin-bottom:6px;
  }
  .center-seal-text {
    font-size:13px; font-weight:900; color:white;
    text-shadow:0 1px 3px rgba(0,0,0,0.5); letter-spacing:0.05em;
  }
</style>
</head>
<body>

  <div class="border-outer"></div>
  <div class="border-inner"></div>
  <div class="corner-tl"></div>
  <div class="corner-tr-green"></div>
  <div class="corner-tr-orange"></div>
  <div class="corner-br"></div>
  <div class="corner-br-orange"></div>

  <!-- Motorbike image (replace src when you have the image) -->
  <div class="moto-area">
    <img src="https://ubta.co.ke/motorbike.png" alt="" onerror="this.style.display='none'" />
  </div>

  <div class="layout">

    <!-- LEFT -->
    <div class="left-col">
      <div class="logo-wrap">
        <img src="https://ubta.co.ke/logo.jpeg" alt="UBTA" />
      </div>
      <div class="meta-box">
        <div class="meta-row">
          <span class="meta-label">Member ID</span>
          <span class="meta-value">${memberId}</span>
        </div>
        <div class="meta-divider"></div>
        <div class="meta-row">
          <span class="meta-label">Date Joined</span>
          <span class="meta-value">${dateLabel}</span>
        </div>
        <div class="meta-divider"></div>
        <div class="meta-row">
          <span class="meta-label">Membership Type</span>
          <span class="meta-value">${membershipLabel}</span>
        </div>
        <div class="meta-divider"></div>
        <div class="meta-row">
          <span class="meta-label">Phone Number</span>
          <span class="meta-value">${data.phoneNumber}</span>
        </div>
        <div class="meta-divider"></div>
        <div class="meta-row">
          <span class="meta-label">National ID</span>
          <span class="meta-value">${data.idNumber}</span>
        </div>
      </div>
    </div>

    <!-- RIGHT -->
    <div class="right-col">

      <!-- Header -->
      <div class="header-row">
        <div class="ubta-block">
          <div class="ubta-letters">
            <span class="u">U</span><span class="b">B</span><span class="t">T</span><span class="a">A</span>
          </div>
          <div class="org-name">CBD United Boda Transport<br/>Co-Operative Society Limited</div>
          <div class="org-tagline">Stronger Together. <span>Safer Together.</span> Growing Together.</div>
        </div>
        <div class="gold-seal">
          <div class="seal-text">
            <span class="seal-stars">★ ★ ★ ★ ★</span>
            <span class="seal-ubta">UBTA</span>
            <span>Certified</span>
            <span>Member</span>
          </div>
        </div>
      </div>

      <!-- Title -->
      <div class="cert-title-block">
        <div class="cert-title">Certificate</div>
        <div class="cert-subtitle">— Of Membership —</div>
      </div>

      <!-- Certify strip -->
      <div class="certify-strip">This is to certify that</div>

      <!-- Name -->
      <div class="member-name">${data.fullName}</div>

      <!-- Body -->
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
          <div class="sig-img-wrap">
            <img src="${CHAIRPERSON_SIG}" alt="Chairperson signature" />
          </div>
          <div class="sig-line"></div>
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