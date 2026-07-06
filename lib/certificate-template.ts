// Certificate HTML template — rendered to PDF via puppeteer
// Matches the UBTA certificate design: landscape, orange/green/white branding

export interface CertificateData {
  memberNumber:    number;
  fullName:        string;
  phoneNumber:     string;
  idNumber:        string;
  membershipType:  string;
  mpesaReceipt:    string;
  dateJoined:      string;
  county:          string;
  bikeReg:         string;
  sigDataUrl:      string;
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

export const CHAIRPERSON_SIG = "data:image/jpeg;base64,..."; // Truncated for readability

export function generateCertificateHTML(data: CertificateData): string {
  const membershipLabel = formatMembershipType(data.membershipType);
  const dateLabel       = formatDate(data.dateJoined);
  const memberId        = `UBTA${data.memberNumber}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>UBTA Certificate - ${data.fullName}</title>
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&amp;family=Montserrat:wght@400;600;700;900&amp;family=Playfair+Display:wght@700&amp;family=Raleway:wght@400;700&amp;display=swap" rel="stylesheet" />
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1122px; height:794px;
    background:#ffffff;
    font-family:'Montserrat',sans-serif;
    overflow:hidden; position:relative;
  }

  /* -- Outer borders -- */
  .border-outer {
    position:absolute; inset:12px;
    border:4px solid #F37121; z-index:1; pointer-events:none;
  }
  .border-inner {
    position:absolute; inset:20px;
    border:1.5px solid #d4a84b; z-index:1; pointer-events:none;
  }

  /* -- Corner accents -- */
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

  /* -- Motorbike silhouette placeholder -- */
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

  /* -- Layout -- */
  .layout {
    position:absolute; inset:36px;
    display:flex; gap:0; z-index:10;
  }

  /* -- Left column -- */
  .left-col {
    width:240px; shrink:0;
    display:flex; flex-direction:column;
    align-items:center; gap:20px; padding-top:10px;
  }
  .logo-wrap {
    width:110px; height:110px; border-radius:50%;
    border:3px solid #F37121;
    display:flex; align-items:center; justify-content:center;
    background:white; overflow:hidden;
    box-shadow:0 4px 16px rgba(243,113,33,0.25);
  }
  .logo-wrap img { width:100px; height:100px; object-fit:contain; border-radius:50%; }

  .meta-box {
    width:100%; background:#f8f8f8;
    border:1px solid #e8e8e8; border-radius:8px;
    padding:18px 14px; display:flex; flex-direction:column; gap:12px;
  }
  .meta-row { display:flex; flex-direction:column; gap:2px; }
  .meta-label {
    font-size:8.5px; font-weight:900; color:#1a5c2e;
    text-transform:uppercase; letter-spacing:0.1em;
  }
  .meta-value { font-size:11.5px; font-weight:700; color:#111; }
  .meta-divider { width:100%; height:1px; background:#e0e0e0; }

  /* -- Right column -- */
  .right-col {
    flex:1; padding-left:30px; padding-right:15px;
    display:flex; flex-direction:column;
  }

  /* Header row */
  .header-row {
    display:flex; align-items:flex-start;
    justify-content:space-between; margin-bottom:15px;
  }
  .ubta-block { display:flex; flex-direction:column; }
  .ubta-letters {
    font-size:58px; font-weight:900;
    letter-spacing:0.06em; line-height:1; color:#111;
  }
  .ubta-letters .u { color:#F37121; }
  .ubta-letters .b { color:#1a5c2e; }
  .ubta-letters .t { color:#F37121; }
  .ubta-letters .a { color:#1a5c2e; }
  .org-name {
    font-size:11px; font-weight:900; color:#1a5c2e;
    text-transform:uppercase; letter-spacing:0.05em;
    line-height:1.4; margin-top:4px;
  }
  .org-tagline {
    font-size:9px; color:#555; margin-top:4px; font-style:italic;
  }
  .org-tagline span { color:#F37121; }

  /* Gold seal */
  .gold-seal {
    width:84px; height:84px;
    background:radial-gradient(circle at 35% 35%,#f5d060,#c8941a,#8b6200);
    border-radius:50%;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    box-shadow:0 3px 12px rgba(200,148,26,0.45);
    border:2px solid #d4a84b;
  }
  .seal-text {
    font-size:7.5px; font-weight:900; color:white;
    text-align:center; text-transform:uppercase;
    letter-spacing:0.05em; line-height:1.35;
    text-shadow:0 1px 2px rgba(0,0,0,0.4);
  }
  .seal-text .seal-stars { font-size:8px; }
  .seal-text .seal-ubta  { font-size:17px; font-weight:900; display:block; }

  /* Certificate title */
  .cert-title-block {
    text-align:center;
    border-top:2px solid #F37121;
    border-bottom:1px solid #d4a84b;
    padding:10px 0; margin:10px 0 14px;
  }
  .cert-title {
    font-family:'Playfair Display',serif;
    font-size:40px; font-weight:700;
    color:#111; letter-spacing:0.14em; text-transform:uppercase;
    line-height:1.1;
  }
  .cert-subtitle {
    font-size:12px; font-weight:900; color:#1a5c2e;
    letter-spacing:0.28em; text-transform:uppercase; margin-top:4px;
  }

  /* Black certify strip */
  .certify-strip {
    background:#111; color:white; text-align:center;
    font-size:10px; font-weight:700;
    letter-spacing:0.22em; text-transform:uppercase;
    padding:6px 0; margin-bottom:18px; border-radius:2px;
  }

  /* Member name */
  .member-name {
    font-family:'Raleway', sans-serif;
    font-size:52px; font-weight:700; color:#111;
    text-align:center; line-height:1.1; margin-bottom:18px;
  }

  /* Body text */
  .cert-body {
    font-size:13px; color:#333; text-align:center;
    line-height:1.7; max-width:640px; margin:0 auto 20px;
  }
  .cert-body strong { color:#F37121; }

  /* Tagline */
  .tagline {
    text-align:center; font-size:9px; font-weight:900;
    color:#1a5c2e; letter-spacing:0.2em; text-transform:uppercase;
    border-top:1px solid #e0e0e0; border-bottom:1px solid #e0e0e0;
    padding:6px 0; margin-bottom:15px;
  }
  .tagline::before,.tagline::after { content:"- "; color:#d4a84b; }

  /* Signature section */
  .sig-section {
    display:flex; align-items:flex-end;
    justify-content:space-between; margin-top:auto; padding-top:10px; padding-bottom:10px;
  }
  .sig-block {
    display:flex; flex-direction:column;
    align-items:center; gap:0; min-width:180px;
  }
  .sig-img-wrap {
    width:180px; height:55px;
    display:flex; align-items:flex-end; justify-content:center;
  }
  .sig-img-wrap img {
    max-height:52px; max-width:170px; object-fit:contain;
  }
  .sig-line { width:180px; height:1px; background:#333; }
  .sig-label {
    font-size:8.5px; font-weight:700; text-transform:uppercase;
    letter-spacing:0.14em; color:#444; margin-top:4px;
  }
  .sig-name { font-size:9px; font-weight:600; color:#111; }

  /* Center seal */
  .center-seal {
    width:76px; height:76px;
    background:radial-gradient(circle at 35% 35%,#f5d060,#c8941a,#8b6200);
    border-radius:50%; display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    box-shadow:0 4px 16px rgba(200,148,26,0.5);
    border:3px solid #d4a84b; margin-bottom:2px;
  }
  .center-seal-text {
    font-size:15px; font-weight:900; color:white;
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

  <div class="moto-area">
    <img src="https://ubta.co.ke/motorbike.png" alt="" onerror="this.style.display='none'" />
  </div>

  <div class="layout">

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

    <div class="right-col">

      <div class="header-row">
        <div class="ubta-block">
          <div class="ubta-letters">
            <span class="u">U</span><span class="b">B</span><span class="t">T</span><span class="a">A</span>
          </div>
          <div class="org-name">CBD United Boda Transport<br/>Co-Operative Society Limited</div>
          <div class="org-tagline">Stronger Together. <span class="safer">Safer Together.</span> Growing Together.</div>
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

      <div class="cert-title-block">
        <div class="cert-title">Certificate</div>
        <div class="cert-subtitle">- Of Membership -</div>
      </div>

      <div class="certify-strip">This is to certify that</div>

      <div class="member-name">${data.fullName}</div>

      <div class="cert-body">
        is a registered member of CBD United Boda Transport Co-Operative Society Limited
        (<strong>UBTA</strong>) and is entitled to all rights and privileges of membership
        in accordance with the Society's by-laws.
      </div>

      <div class="tagline">Together, We Ride for a Better Tomorrow</div>

      <div class="sig-section">
        <div class="sig-block">
          <div class="sig-img-wrap">
            <img src="https://ubta.co.ke/chairperson.jpeg" alt="Chairperson signature" />
          </div>
          <div class="sig-line"></div>
          <div class="sig-label">Chairperson</div>
          <div class="sig-name">John Njeru Kithu</div>
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