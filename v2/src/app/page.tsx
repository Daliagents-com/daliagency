import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "../Components/Home/Hero";
import About from "../Components/Home/About";

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

export const metadata: Metadata = {
  title: "Dali - AI Agent Systems & Agent-First Products",
  description:
    "Dali designs custom AI agent systems, agent-first products, AI adoption programs, and visibility workflows around real business operations.",
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
      <About locale="en" />
    </main>
  );
}
