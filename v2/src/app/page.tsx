import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "../Components/Home/Hero";
import About from "../Components/Home/About";
import HomeSeoSummary from "../Components/Home/HomeSeoSummary";

// Below-the-fold home sections: keep SSR HTML, split client graphs off hero path.
const Projects = dynamic(() => import("../Components/Home/Projects"), {
  ssr: true,
});
const AgentSolutions = dynamic(
  () => import("../Components/Home/AgentSolutions"),
  { ssr: true },
);
const DesignSprints = dynamic(
  () => import("../Components/Home/DesignSprints"),
  { ssr: true },
);

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
      <AgentSolutions locale="en" />
      <DesignSprints locale="en" />
      <HomeSeoSummary locale="en" />
      <About locale="en" />
    </main>
  );
}
