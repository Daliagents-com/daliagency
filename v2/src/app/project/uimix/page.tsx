import Container from "@/Components/Container/Container";
import Image from "next/image";
import HeroImage from "./assets/screenshot.png";
import "./page.styles.css";
import { condensedHeadings, monoText, serifText } from "@/assets/fonts";
import { Metadata } from "next";
import ProjectsSelect from "@/Components/ProjectsSelect/ProjectsSelect";
import FadeIn from "../Components/FadeIn";
import { getProjectAlternates } from "@/i18n/projects";

export const metadata: Metadata = {
  title: "UIMix",
  description: "Open-source WYSIWYG editor for React components",
  alternates: getProjectAlternates("uimix"),
};

export default function UIMixPage() {
  return (
    <FadeIn>
      <Container id="uimix-page" className="overflow-hidden">
        <section
          id="project-header"
          className="flex flex-col gap-36 py-80 uppercase"
        >
          <h1 className={`${condensedHeadings.className} text-page-title`}>
            A WYSIWYG editor for React components.
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
              alt="UIMix product screenshot"
              className="w-full"
              placeholder="blur"
            />
            <p className="text-body4 md:text-body1">
              UIMix is an open-source WYSIWYG editor for React components — letting designers and developers compose interfaces on a canvas with full code fidelity. From product strategy and UX to engineering the editor itself, the entire tool came out of our studio.
            </p>
          </div>
        </section>

        <section className="py-80">
          <h2
            className={`${condensedHeadings.className} mb-24 text-section-title uppercase`}
          >
            OTHER PROJECTS
          </h2>
          <ProjectsSelect excludeProjects={["uimix"]} />
        </section>
      </Container>
    </FadeIn>
  );
}

const projectData = {
  tags: ["product", "dev tool", "open source"],
  client: "UIMix",
  year: "2024",
};
