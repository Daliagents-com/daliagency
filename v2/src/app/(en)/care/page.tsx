// Purpose: /care - standalone Agent Care retainer landing (EN).
// Scope: Route entrypoint and metadata; rendering lives in Components/Care.
import type { Metadata } from "next";
import CarePage from "@/Components/Care/CarePage";
import { careCopy } from "@/i18n/care";
import { absoluteUrl } from "@/lib/seo/site";

export const dynamic = "force-static";

const copy = careCopy.en;

export const metadata: Metadata = {
  title: copy.metaTitle,
  description: copy.metaDescription,
  alternates: {
    canonical: "/care",
    languages: {
      en: "/care",
      ru: "/ru/care",
      ka: "/ge/care",
      hy: "/arm/care",
    },
  },
  openGraph: {
    title: copy.metaTitle,
    description: copy.metaDescription,
    url: absoluteUrl("/care"),
    siteName: "Dali",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: copy.metaTitle,
    description: copy.metaDescription,
  },
};

export default function Care() {
  return <CarePage locale="en" />;
}
