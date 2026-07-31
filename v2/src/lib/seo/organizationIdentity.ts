/**
 * Canonical Organization entity fields for JSON-LD / GEO.
 * Keep NAP + sameAs consistent across layout and homepage.
 */
export const DALI_ORG = {
  name: "Dali",
  url: "https://dali.agents.ge",
  telephone: "+995568863212",
  addressLocality: "Tbilisi",
  addressCountry: "GE",
  /**
   * Public profiles only. Add company X when @ handle is live.
   */
  sameAs: [
    "https://www.linkedin.com/company/dali-agents",
    "https://www.linkedin.com/in/davidhakobyan/",
    "https://clutch.co/profile/dali",
    "https://x.com/larseen66",
    "https://t.me/aisceptic0",
  ],
} as const;

export const REQUIRED_SAME_AS = [
  "https://www.linkedin.com/company/dali-agents",
  "https://clutch.co/profile/dali",
] as const;
