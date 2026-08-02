import Container from "@/Components/Container/Container";
import Image from "next/image";
import HeroImage from "./assets/screenshot.png";
import "./page.styles.css";
import { condensedHeadings, monoText, serifText } from "@/assets/fonts";
import { Metadata } from "next";
import ProjectsSelect from "@/Components/ProjectsSelect/ProjectsSelect";
import { getProjectAlternates } from "@/i18n/projects";
import { absoluteUrl } from "@/lib/seo/site";

const title = "Kora";
const description =
  "AI co-founder workspace for freelancers and agencies - tasks, marketplaces, and agent runs in one product.";

export const metadata: Metadata = {
  title,
  description,
  alternates: getProjectAlternates("kora"),
  openGraph: {
    title,
    description,
    url: absoluteUrl("/project/kora"),
    siteName: "Dali",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function KoraPage() {
  return (
    <Container id="kora-page" className="overflow-hidden">
      <section
        id="project-header"
        className="flex flex-col gap-36 py-80 uppercase"
      >
        <h1 className={`${condensedHeadings.className} text-page-title`}>
          An AI co-founder for freelancers and agencies.
        </h1>
        <ul className={`${monoText.className} flex gap-36 text-body5 font-normal`}>
          {projectData.tags.map((tag, idx) => (
            <li key={idx}>
              <span className="mb-36">/</span> <span>{tag}</span>
            </li>
          ))}
        </ul>
        <p className={`${monoText.className} flex text-body5 font-normal md:text-body4`}>
          <span
            className="origin-top-left"
            style={{ transform: "rotate(90deg) translate(4px,-100%)" }}
          >
            {projectData.year}
          </span>{" "}
          <span>client &mdash; {projectData.client}</span>
        </p>
      </section>

      <section className={`${serifText.className} py-40 md:py-80`}>
        <h2
          className={`${condensedHeadings.className} mb-24 text-section-title uppercase md:mb-40`}
        >
          The problem
        </h2>
        <div className="grid grid-cols-1 gap-32 md:grid-cols-2 md:gap-48 items-start">
          <Image
            src={HeroImage}
            alt="Kora product interface"
            className="w-full"
            placeholder="blur"
            priority
          />
          <p className="text-body4 md:text-body1">
            Freelancers and agencies run their business across too many tools:
            marketplace intake in one place, tasks scattered in another,
            delivery somewhere else. Handing that work to AI without control is
            risky - an agent that acts with no sign-off can ship mistakes
            straight to clients.
          </p>
        </div>
      </section>

      <section className={`${serifText.className} py-40 md:py-80`}>
        <h2
          className={`${condensedHeadings.className} mb-24 text-section-title uppercase md:mb-40`}
        >
          What the agents do
        </h2>
        <p className="text-body4 md:text-body1">
          Kora agents triage incoming marketplace requests, orchestrate tasks
          across projects, and run supervised jobs with human approval gates.
          Operators see what an agent wants to do and approve before anything
          ships. Control stays with the human; the repetitive work moves to the
          agents.
        </p>
        {/* [DAVID: add real run metrics - tasks/week, approval rate, hours saved] */}
      </section>

      <section className={`${serifText.className} py-40 md:py-80`}>
        <h2
          className={`${condensedHeadings.className} mb-24 text-section-title uppercase md:mb-40`}
        >
          How it is built
        </h2>
        <p className="text-body4 md:text-body1">
          One product surface instead of a tool stack. Every agent run is
          supervised, logged, and reversible. Built end to end in the Dali
          studio - product, brand, and engineering.
        </p>
        <p
          className={`${monoText.className} mt-24 text-body5 uppercase md:text-body4`}
        >
          / Kora is our own product: we design, build, and operate it in
          production.
        </p>
      </section>

      <section className="py-80">
        <h2
          className={`${condensedHeadings.className} mb-24 text-section-title uppercase`}
        >
          OTHER PROJECTS
        </h2>
        <ProjectsSelect excludeProjects={["kora"]} />
      </section>
    </Container>
  );
}

const projectData = {
  tags: ["product", "AI agents", "ops"],
  client: "Kora",
  year: "2025",
};
