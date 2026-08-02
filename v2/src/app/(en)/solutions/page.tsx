// Purpose: /solutions is the full Dali multi-agent case page (not AIHome overview).
// Scope: System map + chat + pilot links. Detail routes stay under /solutions/[slug].
import type { Metadata } from "next";
import DaliCasePage from "@/Components/Solutions/DaliCase/DaliCasePage";
import {
  socialPreviewImage,
  twitterPreviewImage,
} from "@/Components/Solutions/solutionContent";
import { englishSolutionsBundle } from "@/Components/Solutions/locales/en";
import { absoluteUrl } from "@/lib/seo/site";

const title = "Dali agent system | Multi-agent production map";
const description =
  "See how Dali runs Conversation Control, Ops & Knowledge, Voice, and Rescue systems inside Gmail, HubSpot, Notion, Slack, and more - with human review and live chat.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/solutions",
    languages: {
      en: "/solutions",
      ru: "/ru/solutions",
      ka: "/ge/solutions",
      hy: "/arm/solutions",
    },
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/solutions"),
    siteName: "Dali",
    type: "website",
    images: [socialPreviewImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [twitterPreviewImage],
  },
};

export default function SolutionsPage() {
  return <DaliCasePage bundle={englishSolutionsBundle} locale="en" />;
}
