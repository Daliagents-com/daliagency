import { Onest, Syne } from "next/font/google";

// Body: latin + cyrillic for EN/RU. Keep weight set tight for payload.
export const onestText = Onest({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500"],
  style: "normal",
  display: "swap",
  variable: "--font-onest",
  adjustFontFallback: true,
});

// Headings / LCP H1: latin only; 700 for font-bold titles without synthesis thrash.
export const syneText = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: "normal",
  display: "swap",
  variable: "--font-syne",
  adjustFontFallback: true,
  preload: true,
});
