import { Onest, Syne } from "next/font/google";

export const onestText = Onest({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500"],
  style: "normal",
  display: "swap",
  variable: "--font-onest",
});

export const syneText = Syne({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: "normal",
  display: "swap",
  variable: "--font-syne",
});
