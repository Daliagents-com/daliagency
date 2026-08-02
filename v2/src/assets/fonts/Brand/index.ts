import { Onest, Syne } from "next/font/google";

// Body: latin + cyrillic for EN/RU. Keep weight set tight for payload.
// Georgian/Armenian glyphs fall through to the self-hosted Noto subsets
// declared with unicode-range in globals.css.
export const onestText = Onest({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500"],
  style: "normal",
  display: "swap",
  variable: "--font-onest",
  adjustFontFallback: true,
  fallback: ["Noto Sans Georgian", "Noto Sans Armenian"],
});

// Headings / LCP H1: latin only; 700 for font-bold titles without synthesis thrash.
// Syne has no cyrillic/georgian/armenian, so those scripts fall through to
// Unbounded (closest display match) and the Noto subsets from globals.css.
// adjustFontFallback must stay off: the metrics-adjusted Arial it injects
// covers cyrillic and would shadow Unbounded for RU headings.
export const syneText = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: "normal",
  display: "swap",
  variable: "--font-syne",
  adjustFontFallback: false,
  fallback: ["Unbounded", "Noto Sans Georgian", "Noto Sans Armenian", "Arial"],
});
