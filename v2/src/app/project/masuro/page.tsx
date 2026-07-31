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
  title: "Masuro",
  description: "Localization & video production studio for global brands",
  alternates: getProjectAlternates("masuro"),
};

export default function MasuroPage() {
  return (
    <FadeIn>
      <Container id="masuro-page" className="overflow-hidden">
        <section
          id="project-header"
          className="flex flex-col gap-36 py-80 uppercase"
        >
          <h1 className={`${condensedHeadings.className} text-page-title`}>
            A localization and video studio for global brands.
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
              alt="Masuro website"
              className="w-full"
              placeholder="blur"
            />
            <p className="text-body4 md:text-body1">
              Masuro adapts brands across languages and cultures — voice, subtitles, video. Our role: design an identity that captures translation as both technical precision and creative storytelling, paired with a website that speaks fluently to clients shipping content worldwide.
            </p>
          </div>
        </section>

        <section className="py-80">
          <h2
            className={`${condensedHeadings.className} mb-24 text-section-title uppercase`}
          >
            OTHER PROJECTS
          </h2>
          <ProjectsSelect excludeProjects={["masuro"]} />
        </section>
      </Container>
    </FadeIn>
  );
}

const projectData = {
  tags: ["brand", "studio", "localization"],
  client: "Masuro",
  year: "2024",
};
