export const UBTA_CONFIG = {
  // Awaiting official assignment from Safaricom
  PAYBILL_NUMBER: "PENDING (Safaricom Provisioning)",
  
  // Strict fees and assets pulled directly from your flyers
  FEES: {
    REGISTRATION: 1000,     // Non-refundable entry fee
    MANAGEMENT: 200,        // Monthly office deduction
    MIN_SAVINGS: 1000,      // Minimum monthly savings plan
    MOTORBIKE_QR: 500,      // QR code plate asset
    MEMBER_CARD: 300,       // Physical identification card
  },
  
  // Official agent operational hubs
  OFFICIAL_AGENTS: [
    { location: "Githurai 45" },
    { location: "Ngara – Fig Tree" },
    { location: "Njiru – Kangundo Road" },
    { location: "Mlolongo – Mombasa Road" }
  ],
  
  // Mandatory documents for membership onboarding
  REQUIREMENTS: [
    "National ID Copy",
    "KRA PIN Copy",
    "Passport Photo"
  ],
  
  CONTACT_PHONE: "0714 314 342",
  OFFICIAL_FACEBOOK: "UBTA Kenya"
};