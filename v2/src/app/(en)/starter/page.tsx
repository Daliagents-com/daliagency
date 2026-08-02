// Purpose: /starter - standalone Agent Starter landing (EN).
// Scope: Route entrypoint and metadata; rendering lives in Components/Starter.
import type { Metadata } from "next";
import StarterPage from "@/Components/Starter/StarterPage";
import { starterCopy } from "@/i18n/starter";
import { absoluteUrl } from "@/lib/seo/site";

export const dynamic = "force-static";

const copy = starterCopy.en;

export const metadata: Metadata = {
  title: copy.metaTitle,
  description: copy.metaDescription,
  alternates: {
    canonical: "/starter",
    languages: {
      en: "/starter",
      ru: "/ru/starter",
      ka: "/ge/starter",
      hy: "/arm/starter",
    },
  },
  openGraph: {
    title: copy.metaTitle,
    description: copy.metaDescription,
    url: absoluteUrl("/starter"),
    siteName: "Dali",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: copy.metaTitle,
    description: copy.metaDescription,
  },
};

export default function Starter() {
  return <StarterPage locale="en" />;
}
