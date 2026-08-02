import Container from "@/Components/Container/Container";
import HeroImage from "./assets/screenshot.webp";
import Photo2 from "./assets/photo-2.webp";
import Photo3 from "./assets/photo-3.webp";
import Photo4 from "./assets/photo-4.webp";
import "./page.styles.css";
import { condensedHeadings, monoText, serifText } from "@/assets/fonts";
import { Metadata } from "next";
import ProjectsSelect from "@/Components/ProjectsSelect/ProjectsSelect";
import PhoneFrame from "@/Components/PhoneFrame/PhoneFrame";
import { getProjectAlternates } from "@/i18n/projects";
import { absoluteUrl } from "@/lib/seo/site";

const title = "Muqta";
const description = "Smart shopping companion for Georgian consumers";

export const metadata: Metadata = {
  title,
  description,
  alternates: getProjectAlternates("muqta"),
  openGraph: {
    title,
    description,
    url: absoluteUrl("/project/muqta"),
    siteName: "Dali",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function MuqtaPage() {
  return (
    <Container id="muqta-page" className="overflow-hidden">
      <section
        id="project-header"
        className="flex flex-col gap-36 py-80 uppercase"
      >
        <h1 className={`${condensedHeadings.className} text-page-title`}>
          A smart shopping companion in your pocket.
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
          <div className="flex justify-center md:justify-start">
            <div className="w-full max-w-[260px]">
              <PhoneFrame
                src={HeroImage}
                alt="Muqta app"
                placeholder="blur"
                priority
                sizes="(max-width: 768px) 70vw, 260px"
              />
            </div>
          </div>
          <p className="text-body4 md:text-body1">
            Muqta is a smart shopping companion — comparing prices, tracking promotions, surfacing the best value across stores. Our team handled brand and product end-to-end, shaping a mobile experience that turns everyday shopping into a confident, informed act.
          </p>
        </div>
      </section>

      <section className="py-40 md:py-80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-40 max-w-[1100px] mx-auto">
          <PhoneFrame src={Photo2} alt="Muqta app screen" placeholder="blur" />
          <PhoneFrame src={Photo3} alt="Muqta app screen" placeholder="blur" />
          <PhoneFrame src={Photo4} alt="Muqta app screen" placeholder="blur" />
        </div>
      </section>

      <section className="py-80">
        <h2
          className={`${condensedHeadings.className} mb-24 text-section-title uppercase`}
        >
          OTHER PROJECTS
        </h2>
        <ProjectsSelect excludeProjects={["muqta"]} />
      </section>
    </Container>
  );
}

const projectData = {
  tags: ["mobile", "e-commerce", "lifestyle"],
  client: "Muqta",
  year: "2025",
};
