/**
 * Canonical Organization entity fields for JSON-LD / GEO.
 * Keep NAP + sameAs consistent across layout and homepage.
 */
export const DALI_ORG = {
  name: "Dali",
  /** Canonical public host (apex). www redirects here on Vercel. */
  url: "https://daliagents.com",
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
    "https://github.com/Daliagents-com",
  ],
} as const;

/** Retired production host - keep only for 301 cutover / docs. */
export const LEGACY_SITE_URL = "https://dali.agents.ge" as const;

export const REQUIRED_SAME_AS = [
  "https://www.linkedin.com/company/dali-agents",
  "https://clutch.co/profile/dali",
] as const;
