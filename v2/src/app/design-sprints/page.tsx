"use client";
import React, { useState } from "react";
import Container from "@/Components/Container/Container";
import { condensedHeadings, monoText, serifText } from "@/assets/fonts";
import Button from "@/Components/Button/Button";
import ConsultationTrigger from "@/Components/Consultation/ConsultationTrigger";
import { ChevronRight } from "lucide-react";
import TrackAndFieldImage from "./assets/track-and-field.svg";
import ClientLogos from "./assets/logos.png";
import Image, { StaticImageData } from "next/image";
import DavidImage from "@/assets/images/team/david.png";
import LianaImage from "@/assets/images/team/liana.jpeg";
import DiagramImage from "./assets/diagram.svg";
import DoodleImage from "./assets/long-term-goals.svg";
import PatentImage from "./assets/patent.svg";
import RedefineSprintImage from "./assets/redefine-sprints.svg";
import type { Locale } from "@/i18n/config";
import {
  designSprintsCopy,
  type DesignSprintService,
  type DesignSprintsCopy,
} from "@/i18n/designSprints";

const sprintDays = ["01", "02", "03", "04", "05", "06", "07", "10"];
const sprintDurationIso = [
  "PT3H",
  "PT3H",
  "PT3H",
  "PT8H",
  "PT8H",
  "PT8H",
  "P2D",
  "",
];

enum Service {
  ProductDesignSprint = "Product Design Sprint",
  VisionSprint = "Vision Sprint",
  BrandSprint = "Brand Sprint",
  DesignSprint = "Design Sprint",
  Branding = "Branding",
  WebsiteDesign = "Website Design",
  DesignContribution = "Design Contribution",
  WebsiteDevelopment = "Website Development",
  Hackathon = "Hackathon",
  Grant = "Grant",
  Design = "Design",
  WebDevelopment = "Web Development",
  ProductDevelopment = "Product Development",
  PitchDeck = "Pitch Deck",
  SmartContractTesting = "Smart Contract Testing",
}

type Client = {
  title: string;
  year: string;
  services: Service[];
  tags: string[];
  status: string;
  exitTo?: string;
  externalLink?: string;
};

const clients: Client[] = [
  {
    title: "THE BITCOIN COMPANY",
    year: "2021-2022",
    services: [
      Service.ProductDesignSprint,
      Service.VisionSprint,
      Service.BrandSprint,
    ],
    tags: ["Bitcoin"],
    status: "Active",
  },
  {
    title: "ALBY",
    year: "2021",
    services: [Service.DesignSprint],
    tags: [],
    status: "Active",
  },
  {
    title: "BITCOIN CONNECT",
    year: "2024",
    services: [Service.DesignSprint],
    tags: ["Bitcoin"],
    status: "Active",
  },
  {
    title: "GALOY",
    year: "2023",
    services: [Service.Branding, Service.WebsiteDesign],
    tags: ["Bitcoin"],
    status: "Active",
  },
  {
    title: "HUB21",
    year: "2022",
    services: [Service.DesignSprint],
    tags: ["Bitcoin"],
    status: "Active",
  },
  {
    title: "FEDI",
    year: "2023",
    services: [Service.DesignSprint],
    tags: ["AI"],
    status: "Active",
    externalLink: "https://bolt.fun/tournaments/ai4all",
  },
  {
    title: "NOSTR.WORLD",
    year: "2023",
    services: [Service.Hackathon],
    tags: ["Bitcoin"],
    status: "Active",
    externalLink: "https://bolt.fun/tournaments/nostr-world",
  },
  {
    title: "OPEN SATS",
    year: "2021",
    services: [Service.DesignContribution],
    tags: ["Bitcoin"],
    status: "Active",
    externalLink: "https://opensats.org",
  },
  {
    title: "HRF",
    year: "2023",
    services: [Service.WebsiteDevelopment, Service.Branding],
    tags: ["CBDC"],
    status: "Active",
  },
  {
    title: "SPIRAL",
    year: "2020",
    services: [Service.Grant],
    tags: ["Bitcoin"],
    status: "Active",
  },
  {
    title: "BOLT.OBSERVER",
    year: "2023",
    services: [Service.DesignSprint],
    tags: [],
    status: "Active",
  },
  {
    title: "PROMOTUS",
    year: "2023",
    services: [Service.WebDevelopment],
    tags: [],
    status: "Active",
  },
  {
    title: "SSUP IMAGE",
    year: "2016",
    services: [Service.Design, Service.Branding, Service.WebDevelopment],
    tags: [],
    status: "Active",
  },
  {
    title: "DIEGO VERGES",
    year: "2016",
    services: [Service.Branding, Service.WebDevelopment],
    tags: [],
    status: "Active",
  },
  {
    title: "LEMARIKU",
    year: "2015",
    services: [Service.Branding, Service.ProductDevelopment, Service.PitchDeck],
    tags: [],
    status: "Active",
  },
  {
    title: "DIGITALES WIEN",
    year: "2019",
    services: [Service.SmartContractTesting],
    tags: [],
    status: "Active",
  },
  {
    title: "RAISE AFRICA",
    year: "2020-2022",
    services: [Service.DesignSprint],
    tags: [],
    status: "Active",
  },
];

type Props = {
  data: Client[];
  copy: DesignSprintsCopy;
};

const ClientList: React.FC<Props> = ({ data, copy }) => {
  const [filter, setFilter] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const years = Array.from(new Set(data.map((item) => item.year))).filter(
    Boolean
  );

  const filteredData = data.filter((item) => {
    if (!filter && !selectedYear) return true;
    if (filter && selectedYear) {
      return (
        item.services.some((service) =>
          copy.services[service as DesignSprintService]
            .toLocaleLowerCase()
            .includes(filter.toLocaleLowerCase()),
        ) &&
        item.year.includes(selectedYear)
      );
    } else if (filter) {
      return item.services.some((service) =>
        copy.services[service as DesignSprintService]
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase()),
      );
    } else if (selectedYear) {
      return item.year.includes(selectedYear);
    }
    return true;
  });

  return (
    <section className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <h4
        className={`${condensedHeadings.className} text-center text-section-title font-medium`}
      >
        {copy.pastClients} <span className="inline-block amp">&amp;</span>{" "}
        {copy.collaborators}
      </h4>
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <div className="columns-1 sm:columns-2">
          <div>
            <div className="mb-4">
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder={copy.filterPlaceholder}
                aria-label={copy.filterPlaceholder}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="">{copy.allYears}</option>
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <ul>
            {filteredData.map((item, index) => (
              <li key={index} className="flex justify-between py-2">
                <div>
                  <strong>{item.title}</strong>
                  {item.status && (
                    <span className="badge">
                      {item.status === "Active" ? copy.active : item.status}
                    </span>
                  )}
                  {item.services.length > 0 &&
                    item.services.map((service, index) => (
                      <span key={index} className="badge">
                        {copy.services[service as DesignSprintService]}
                      </span>
                    ))}
                  {item.tags.length > 0 &&
                    item.tags.map((tag, index) => (
                      <span key={index} className="badge">
                        {tag}
                      </span>
                    ))}
                </div>
                <div className="text-right">
                  {item.year && <span>{item.year}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

type Sprint = {
  type: String;
  duration: String;
  title: String;
  backgroundColour: "black" | "primary" | "white";
  backgroundImage: any;
  diagramImage: any;
  doodleImage: any;
};

const SprintType: React.FC<Sprint> = ({
  type,
  duration,
  title,
  backgroundColour,
  backgroundImage,
  diagramImage,
  doodleImage,
}) => {
  const textColorClass =
    backgroundColour === "black" || backgroundColour === "primary"
      ? "text-white"
      : "text-black";

  return (
    <section
      className={`w-full bg-${backgroundColour} ${textColorClass} box-border overflow-hidden flex flex-col items-start justify-start pt-[30px] px-[21px] pb-[21px] gap-[275px] tracking-[normal] border-[1px] border-solid border-black mq302:gap-[137px_275px]`}
    >
      <div className={`${condensedHeadings.className} self-stretch flex flex-col items-start justify-start gap-[44px] max-w-full text-left text-card-title mq562:gap-[22px_44px]`}>
        <header className={`${monoText.className} self-stretch h-[13px] relative text-body6 uppercase font-normal text-left flex items-center whitespace-nowrap z-[1]`}>
          {type}
        </header>
        <div className="self-stretch flex flex-row items-start justify-start relative max-w-full">
          <p className="flex-1 relative leading-[110%] uppercase flex items-center max-w-full z-[1]">
            {title}
          </p>
          <div className={`${monoText.className} h-[512px] w-[382px] !m-[0] absolute right-[-12px] bottom-[-373px] flex flex-row items-end justify-end py-5 px-3 box-border text-right text-body6`}>
            <Image
              className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full"
              loading="lazy"
              alt=""
              src={backgroundImage}
            />
            <Image
              className="h-[101.9px] w-[265.2px] absolute !m-[0] top-[163px] left-[-43.6px] z-[1]"
              alt=""
              src={diagramImage}
            />
            <div className="text-right uppercase relative tracking-[0.1em] leading-[150%] font-medium flex items-center shrink-0 z-[1]">
              {duration}
            </div>
          </div>
        </div>
      </div>
      <Image
        className="relative h-auto w-[179px]"
        loading="lazy"
        alt=""
        src={doodleImage}
      />
    </section>
  );
};

export default function DesignSprints({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = designSprintsCopy[locale];

  return (
    <Container id="design-sprints" className="overflow-hidden">
      <header
        className={`min-h-[min(85vh,1440px)] flex flex-col justify-center relative py-16 isolate z-10`}
      >
        <h1
          className={`${condensedHeadings.className} z-10 text-center text-display font-medium text-gray-950`}
        >
          {copy.hero}
        </h1>
        <p className="flex justify-center">
          <ConsultationTrigger
            source="design-sprints-hero-consultation"
            className="mt-40 inline-flex items-center justify-between gap-12 bg-primary-500 px-20 py-12 font-ui uppercase text-white transition-colors hover:bg-primary-700"
          >
            {copy.contact} <ChevronRight className="h-[1em] w-[1em]" aria-hidden />
          </ConsultationTrigger>
        </p>
        <Image
          src={TrackAndFieldImage}
          alt={copy.trackAlt}
          className="mx-auto mt-8 md:absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />
      </header>
      <section className="pt-20 pb-40 sm:py-80">
        <div
          className={`${serifText.className} grid grid-cols-1 md:grid-cols-2 gap-32 mt-24 md:mt-48`}
        >
          <h3 className={`${condensedHeadings.className} text-section-title font-medium`}>
            {copy.introTitle}
          </h3>
          <p className="text-body4 md:text-body1 font-regular">
            {copy.introBody}
          </p>
        </div>
      </section>
      <section className="py-40 sm:py-80">
        <h2
          className={`${condensedHeadings.className} pb-40 text-display font-medium uppercase`}
        >
          <span className="sm:block">{copy.chooseLineOne}&nbsp;</span>
          <span className="sm:block">{copy.chooseLineTwo}</span>
        </h2>
        <header className="grid grid-cols-3 gap-5 pb-40">
          <div className="text-body4 md:text-body1 col-start-2 col-span-2">
            <p className={`${serifText.className} mb-20 font-regular`}>
              {copy.chooseBody}
            </p>
          </div>
        </header>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          <SprintType
            type={copy.sprintCards[0].type}
            duration={copy.sprintCards[0].duration}
            title={copy.sprintCards[0].title}
            backgroundColour="black"
            backgroundImage={PatentImage}
            diagramImage={DiagramImage}
            doodleImage={DoodleImage}
          />
          <SprintType
            type={copy.sprintCards[1].type}
            duration={copy.sprintCards[1].duration}
            title={copy.sprintCards[1].title}
            backgroundColour="primary"
            backgroundImage={PatentImage}
            diagramImage={DiagramImage}
            doodleImage={DoodleImage}
          />
          <SprintType
            type={copy.sprintCards[2].type}
            duration={copy.sprintCards[2].duration}
            title={copy.sprintCards[2].title}
            backgroundColour="primary"
            backgroundImage={PatentImage}
            diagramImage={DiagramImage}
            doodleImage={DoodleImage}
          />
          <SprintType
            type={copy.sprintCards[3].type}
            duration={copy.sprintCards[3].duration}
            title={copy.sprintCards[3].title}
            backgroundColour="white"
            backgroundImage={PatentImage}
            diagramImage={DiagramImage}
            doodleImage={DoodleImage}
          />
          <SprintType
            type={copy.sprintCards[4].type}
            duration={copy.sprintCards[4].duration}
            title={copy.sprintCards[4].title}
            backgroundColour="white"
            backgroundImage={PatentImage}
            diagramImage={DiagramImage}
            doodleImage={DoodleImage}
          />
          <SprintType
            type={copy.sprintCards[5].type}
            duration={copy.sprintCards[5].duration}
            title={copy.sprintCards[5].title}
            backgroundColour="white"
            backgroundImage={PatentImage}
            diagramImage={DiagramImage}
            doodleImage={DoodleImage}
          />
        </div>
        <div className="flex justify-center pt-80 pb-0">
          <Image src={RedefineSprintImage} alt="" className="" />
        </div>
      </section>
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <figure className="mt-10">
            <blockquote className="text-center mb-24">
              <p
                className={`${serifText.className} text-body1 text-gray-900`}
              >
                <span
                  className={`${condensedHeadings.className} text-[var(--primary,#1E3A8A)]`}
                >
                  Dali
                </span>
                {copy.studioQuoteAfterName}
              </p>
            </blockquote>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-24">
              {(
                [
                  {
                    image: DavidImage,
                    name: "David",
                    role: copy.founder,
                  },
                  {
                    image: LianaImage,
                    name: "Liana",
                    role: copy.coFounder,
                  },
                ] as Array<{
                  initial?: string;
                  image?: StaticImageData;
                  name: string;
                  role: string;
                }>
              ).map((p) => (
                <figcaption key={p.name} className="text-center">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={`${p.name}, ${p.role}`}
                      className="mx-auto h-[130px] w-[130px] mb-12 object-cover object-top"
                      width={130}
                      height={130}
                      style={{
                        maskImage:
                          "radial-gradient(ellipse at center, black 50%, transparent 95%)",
                        WebkitMaskImage:
                          "radial-gradient(ellipse at center, black 50%, transparent 95%)",
                      }}
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={`${p.name}, ${p.role}`}
                      className="mx-auto h-[130px] w-[130px] border border-dotted border-black p-0.5 mb-12 flex items-center justify-center bg-[var(--primary,#1E3A8A)] text-white text-h1 font-medium uppercase"
                    >
                      {p.initial}
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-center space-x-3 text-xl">
                    <div className="text-gray-900 uppercase">{p.name}</div>
                    <svg
                      viewBox="0 0 2 2"
                      width="3"
                      height="3"
                      aria-hidden="true"
                      className="fill-gray-900"
                    >
                      <circle cx="1" cy="1" r="1" />
                    </svg>
                    <div className="text-gray-600 uppercase font-normal">
                      {p.role}
                    </div>
                  </div>
                </figcaption>
              ))}
            </div>
          </figure>
        </div>
      </section>
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <div className="text-center mb-24">
            <h4
              className={`${condensedHeadings.className} text-section-title font-medium text-gray-950`}
            >
              {copy.visionTitle}
            </h4>
            <p
              className="text-body3 font-normal uppercase text-gray-900"
            >
              {copy.visionBody}
            </p>
            <p className="flex justify-center">
              <Image src={ClientLogos} alt="" height={120} />
            </p>
            <p className="flex justify-center">
              <ConsultationTrigger
                source="design-sprints-vision-consultation"
                className="mt-40 inline-flex max-lg:w-full items-center justify-between gap-12 bg-primary-500 px-20 py-12 font-ui uppercase text-white transition-colors hover:bg-primary-700"
              >
                {copy.visionCta}{" "}
                <ChevronRight className="h-[1em] w-[1em]" aria-hidden />
              </ConsultationTrigger>
            </p>
          </div>
        </div>
      </section>
      <ClientList data={clients} copy={copy} />
      <section className="pt-80">
        <div
          className={`${serifText.className} grid grid-cols-1 md:grid-cols-2 gap-32 mt-24 md:mt-48`}
        >
          <h3 className={`${condensedHeadings.className} text-section-title uppercase`}>
            {copy.howItWorks}
          </h3>
          <div className="text-body4 md:text-body1">
            <p className="mb-20">
              {copy.howParagraphs[0]}
            </p>
            <p className="mb-20">
              {copy.howParagraphs[1]}
            </p>
            <p className="mb-20">
              {copy.howParagraphs[2]}
            </p>
          </div>
        </div>
      </section>
      <section className="pb-80">
        <article
          itemScope
          itemType="http://schema.org/CreativeWork"
          className={`${serifText.className} grid grid-cols-1 md:grid-cols-2 gap-32 mt-24 md:mt-48`}
        >
          <header className="mb-4">
            <h3
              className={`${condensedHeadings.className} text-section-title uppercase`}
              itemProp="name"
            >
              {copy.timeline}
            </h3>
          </header>
          <div>
            <meta
              itemProp="about"
              content={copy.scheduleMeta}
            />
            <ol className="relative border-l border-gray-200 border-dotted">
              {copy.schedule.map((event, index) => (
                <li
                  key={index}
                  itemProp="event"
                  itemScope
                  itemType="http://schema.org/Event"
                  className="mb-10 ml-4"
                >
                  <span className="flex absolute -left-8 justify-center items-center px-2 bg-white border border-gray-400 rounded text-xs font-mono uppercase">
                    {copy.day} {sprintDays[index]}
                  </span>
                  <div className="ml-12">
                    <h3
                      itemProp="name"
                      className={`${condensedHeadings.className} uppercase text-lg font-normal text-gray-900`}
                    >
                      {event.name}
                    </h3>
                    {event.duration && (
                      <time
                        itemProp="duration"
                        dateTime={sprintDurationIso[index]}
                        className={`${monoText.className} block text-body5 font-normal uppercase text-gray-500`}
                      >
                        {event.duration}
                      </time>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </article>
      </section>
    </Container>
  );
}
