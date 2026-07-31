import React from "react";
import Image from "next/image";
import Container from "@/Components/Container/Container";
import { onestText, syneText } from "@/assets/fonts";
import DavidImage from "@/assets/images/team/david.png";
import LianaImage from "@/assets/images/team/liana.jpeg";
import { homeCopy } from "@/i18n/home";
import type { Locale } from "@/i18n/config";
import { sectionTitle } from "@/lib/sectionTitle";

const photoMaskStyle = {
  maskImage:
    "radial-gradient(ellipse at center, black 48%, transparent 92%)",
  WebkitMaskImage:
    "radial-gradient(ellipse at center, black 48%, transparent 92%)",
};

function Person({
  image,
  name,
  role,
}: {
  image: typeof DavidImage;
  name: string;
  role: string;
}) {
  return (
    <figure className="flex flex-col items-center text-center">
      <Image
        src={image}
        alt={`${name}, ${role}`}
        className="mx-auto h-[120px] w-[120px] object-cover object-top md:h-[130px] md:w-[130px]"
        width={130}
        height={130}
        sizes="130px"
        style={photoMaskStyle}
      />
      <figcaption className="mt-16 flex flex-col items-center gap-4">
        <div
          className={`${syneText.className} text-body5 font-medium uppercase tracking-[0.08em] text-[var(--text)]`}
        >
          {name}
        </div>
        <div
          className={`${onestText.className} text-body6 font-normal uppercase tracking-[0.12em] text-[var(--muted)]`}
        >
          {role}
        </div>
      </figcaption>
    </figure>
  );
}

function BrandMark() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/dali-logo.svg"
      alt="Dali"
      width={108}
      height={56}
      draggable={false}
      className="mx-[0.18em] inline-block h-[1.2em] w-auto translate-y-[-0.12em] align-baseline"
    />
  );
}

export default function About({ locale = "en" }: { locale?: Locale }) {
  const copy = homeCopy[locale].about;
  const aboutLabel = homeCopy[locale].navigation.home[3];

  return (
    <section
      id="about"
      className="relative isolate z-[3] scroll-mt-80 bg-[var(--background,#FCFCFA)] py-64 md:scroll-mt-64 md:py-100"
      aria-labelledby="about-title"
    >
      <Container wide>
        <div className="px-[clamp(6px,1vw,16px)]">
          <header className="mb-32 max-w-[680px] md:mb-48">
            <h2 id="about-title" className="section-label">
              {sectionTitle(4, aboutLabel)}
            </h2>
          </header>

          <div className="grid items-center gap-40 md:gap-48 lg:grid-cols-12 lg:gap-64">
            <p
              className={`${onestText.className} max-w-[42rem] text-body3 leading-[1.65] text-[var(--text)] lg:col-span-7 lg:max-w-none lg:text-body2 lg:leading-[1.6]`}
            >
              {copy.beforeName}
              {copy.beforeName ? " " : null}
              <BrandMark />
              {copy.afterName ? ` ${copy.afterName}` : null}
            </p>

            <div className="flex flex-row items-start justify-center gap-32 sm:gap-48 lg:col-span-5">
              <Person image={DavidImage} name="David" role={copy.founder} />
              <Person image={LianaImage} name="Liana" role={copy.coFounder} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
