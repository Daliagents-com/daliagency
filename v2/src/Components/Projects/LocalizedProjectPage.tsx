import Image, { type StaticImageData } from "next/image";
import Container from "@/Components/Container/Container";
import ProjectsSelect from "@/Components/ProjectsSelect/ProjectsSelect";
import PhoneFrame from "@/Components/PhoneFrame/PhoneFrame";
import { condensedHeadings, monoText, serifText } from "@/assets/fonts";
import KoraImage from "@/app/(en)/project/kora/assets/screenshot.png";
import MuqtadImage from "@/app/(en)/project/muqtad/assets/screenshot.png";
import DeliverySetupImage from "@/app/(en)/project/deliverysetup/assets/screenshot.png";
import UIMixImage from "@/app/(en)/project/uimix/assets/screenshot.png";
import MasuroImage from "@/app/(en)/project/masuro/assets/screenshot.png";
import AgentsGeImage from "@/app/(en)/project/agentsge/assets/screenshot.png";
import TamariImage from "@/app/(en)/project/tamari/assets/screenshot.jpg";
import MuqtaImage from "@/app/(en)/project/muqta/assets/screenshot.webp";
import MuqtaPhoto2 from "@/app/(en)/project/muqta/assets/photo-2.webp";
import MuqtaPhoto3 from "@/app/(en)/project/muqta/assets/photo-3.webp";
import MuqtaPhoto4 from "@/app/(en)/project/muqta/assets/photo-4.webp";
import type { Locale } from "@/i18n/config";
import { homeCopy } from "@/i18n/home";
import {
  projectCaseCopy,
  projectLabels,
  type ProjectSlug,
} from "@/i18n/projects";

type ProjectVisual = {
  image: StaticImageData;
  client: string;
  year: string;
  phone?: boolean;
};

const projectVisuals: Record<ProjectSlug, ProjectVisual> = {
  kora: {
    image: KoraImage,
    client: "Kora",
    year: "2025",
  },
  muqtad: {
    image: MuqtadImage,
    client: "Muqtad",
    year: "2024",
  },
  deliverysetup: {
    image: DeliverySetupImage,
    client: "Delivery Setup",
    year: "2024",
  },
  uimix: {
    image: UIMixImage,
    client: "UIMix",
    year: "2024",
  },
  masuro: {
    image: MasuroImage,
    client: "Masuro",
    year: "2024",
  },
  agentsge: {
    image: AgentsGeImage,
    client: "agents.ge",
    year: "2025",
  },
  tamari: {
    image: TamariImage,
    client: "LLC Tamari",
    year: "2025",
    phone: true,
  },
  muqta: {
    image: MuqtaImage,
    client: "Muqta",
    year: "2025",
    phone: true,
  },
};

export default function LocalizedProjectPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: ProjectSlug;
}) {
  const copy = projectCaseCopy[locale][slug];
  const labels = projectLabels[locale];
  const visual = projectVisuals[slug];
  const tags = homeCopy[locale].projectCards[slug].tags;

  return (
    <Container id={`${slug}-page`} className="overflow-hidden">
      <section
        id="project-header"
        className="flex flex-col gap-36 py-80 uppercase"
      >
        <h1 className={`${condensedHeadings.className} text-page-title`}>
          {copy.headline}
        </h1>
        <ul className={`${monoText.className} flex flex-wrap gap-16 text-body5 font-normal md:gap-36`}>
          {tags.map((tag) => (
            <li key={tag}>
              <span className="mb-36">/</span> <span>{tag}</span>
            </li>
          ))}
        </ul>
        <p className={`${monoText.className} flex text-body5 font-normal md:text-body4`}>
          <span
            className="origin-top-left"
            style={{ transform: "rotate(90deg) translate(4px,-100%)" }}
          >
            {visual.year}
          </span>{" "}
          <span>
            {labels.client} - {visual.client}
          </span>
        </p>
      </section>

      <section className={`${serifText.className} py-40 md:py-80`}>
        <h2
          className={`${condensedHeadings.className} mb-24 text-section-title uppercase md:mb-40`}
        >
          {labels.about}
        </h2>
        <div className="grid grid-cols-1 items-start gap-32 md:grid-cols-2 md:gap-48">
          {visual.phone ? (
            <div className="flex justify-center md:justify-start">
              <div className="w-full max-w-[260px]">
                <PhoneFrame
                  src={visual.image}
                  alt={copy.imageAlt}
                  placeholder="blur"
                  priority
                  sizes="(max-width: 768px) 70vw, 260px"
                />
              </div>
            </div>
          ) : (
            <Image
              src={visual.image}
              alt={copy.imageAlt}
              className="w-full"
              placeholder="blur"
              priority
            />
          )}
          <p className="text-body4 md:text-body1">{copy.description}</p>
        </div>
      </section>

      {slug === "muqta" ? (
        <section className="py-40 md:py-80">
          <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-24 md:grid-cols-3 md:gap-40">
            {[MuqtaPhoto2, MuqtaPhoto3, MuqtaPhoto4].map((image, index) => (
              <PhoneFrame
                key={image.src}
                src={image}
                alt={`${copy.title} ${labels.screen} ${index + 1}`}
                placeholder="blur"
              />
            ))}
          </div>
        </section>
      ) : (
        <></>
      )}

      <section className="py-80">
        <h2
          className={`${condensedHeadings.className} mb-24 text-section-title uppercase`}
        >
          {labels.otherProjects}
        </h2>
        <ProjectsSelect excludeProjects={[slug]} locale={locale} />
      </section>
    </Container>
  );
}
