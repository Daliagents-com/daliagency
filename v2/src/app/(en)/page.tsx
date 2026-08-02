import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import Hero from "../../Components/Home/Hero";
import About from "../../Components/Home/About";
import AgentSolutions from "../../Components/Home/AgentSolutions";
import HomeDeferredSections from "../../Components/Home/HomeDeferredSections";
import { absoluteUrl } from "@/lib/seo/site";

// Prerender + CDN-friendly HTML (no headers()/cookies in this tree).
export const dynamic = "force-static";

// Projects still SSR for crawlable case grid; services load after idle/IO.
// AgentSolutions is eager + SSR: it is the selling section, position 01.
const Projects = nextDynamic(() => import("../../Components/Home/Projects"), {
  ssr: true,
});

const homeKeywords = [
  "AI agent systems",
  "production AI agents",
  "workflow automation",
  "agent-first products",
  "AI agent agency",
  "lead response agent",
  "client inbox agent",
  "knowledge assistant",
  "human approval gates",
  "vibe code rescue",
  "GEO SEO for AI agencies",
  "AI visibility systems",
];

const title = "Dali - AI Agent Systems & Agent-First Products";
const description =
  "Dali designs production AI agents, workflow automation, agent-first products, vibe-code rescue, and GEO/SEO visibility systems around real business operations.";

export const metadata: Metadata = {
  title,
  description,
  keywords: homeKeywords,
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ru: "/ru",
      ka: "/ge",
      hy: "/arm",
      "x-default": "/",
    },
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/"),
    siteName: "Dali",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function Home() {
  return (
    <main>
      <Hero locale="en" />
      <AgentSolutions locale="en" />
      <Projects locale="en" />
      <HomeDeferredSections locale="en" />
      <About locale="en" />
    </main>
  );
}
