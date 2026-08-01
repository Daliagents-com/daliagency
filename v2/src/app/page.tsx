import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import Hero from "../Components/Home/Hero";
import About from "../Components/Home/About";
import HomeDeferredSections from "../Components/Home/HomeDeferredSections";

// Prerender + CDN-friendly HTML (no headers()/cookies in this tree).
export const dynamic = "force-static";

// Projects still SSR for crawlable case grid; agents/services load after idle/IO.
const Projects = nextDynamic(() => import("../Components/Home/Projects"), {
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

export const metadata: Metadata = {
  title: "Dali - AI Agent Systems & Agent-First Products",
  description:
    "Dali designs production AI agents, workflow automation, agent-first products, vibe-code rescue, and GEO/SEO visibility systems around real business operations.",
  keywords: homeKeywords,
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ru: "/ru",
      ka: "/ge",
      hy: "/arm",
    },
  },
};

export default function Home() {
  return (
    <main>
      <Hero locale="en" />
      <Projects locale="en" />
      <HomeDeferredSections locale="en" />
      <About locale="en" />
    </main>
  );
}
