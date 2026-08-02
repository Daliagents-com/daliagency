import Container from "@/Components/Container/Container";
import Image from "next/image";
import HeroImage from "./assets/screenshot.png";
import "./page.styles.css";
import { condensedHeadings, monoText, serifText } from "@/assets/fonts";
import { Metadata } from "next";
import ProjectsSelect from "@/Components/ProjectsSelect/ProjectsSelect";
import { getProjectAlternates } from "@/i18n/projects";
import { absoluteUrl } from "@/lib/seo/site";

const title = "Muqtad";
const description = "Discount aggregator across Georgia's top retailers";

export const metadata: Metadata = {
  title,
  description,
  alternates: getProjectAlternates("muqtad"),
  openGraph: {
    title,
    description,
    url: absoluteUrl("/project/muqtad"),
    siteName: "Dali",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function MuqtadPage() {
  return (
    <Container id="muqtad-page" className="overflow-hidden">
      <section
        id="project-header"
        className="flex flex-col gap-36 py-80 uppercase"
      >
        <h1 className={`${condensedHeadings.className} text-page-title`}>
          One place for the best discounts across Georgia&apos;s retailers.
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
          About the project
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 md:gap-48 items-start">
          <Image
            src={HeroImage}
            alt="Muqtad website"
            className="w-full"
            placeholder="blur"
            priority
          />
          <p className="text-body4 md:text-body1">
            Muqtad pulls discounts from Georgia&apos;s top retailers into one place. We came in to shape the brand identity and deliver the e-commerce platform — from logo and visual system to the way shoppers discover, compare, and act on offers.
          </p>
        </div>
      </section>

      <section className="py-80">
        <h2
          className={`${condensedHeadings.className} mb-24 text-section-title uppercase`}
        >
          OTHER PROJECTS
        </h2>
        <ProjectsSelect excludeProjects={["muqtad"]} />
      </section>
    </Container>
  );
}

const projectData = {
  tags: ["brand", "e-commerce", "platform"],
  client: "Muqtad",
  year: "2024",
};
