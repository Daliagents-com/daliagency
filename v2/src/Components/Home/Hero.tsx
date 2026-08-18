// Purpose: Homepage hero - server shell for LCP title/CTAs + client motion island.
// Scope: 100× vision + one support line + dashboard. Brand logo flies to nav.

import { homeCopy } from "@/i18n/home";
import { localizePath, type Locale } from "@/i18n/config";
import { onestText } from "@/assets/fonts";
import ConsultationTrigger from "@/Components/Consultation/ConsultationTrigger";
import HeroMotion from "@/Components/Home/HeroMotion";

const titleSize: Record<Locale, string> = {
  en: "clamp(36px, 6.1vw, 88px)",
  ru: "clamp(31px, 5.1vw, 74px)",
  ge: "clamp(29px, 4.7vw, 68px)",
  arm: "clamp(28px, 4.5vw, 65px)",
};

export default function Hero({ locale = "en" }: { locale?: Locale }) {
  const copy = homeCopy[locale].hero;
  const homeHref = localizePath("/", locale);

  const title = (
    <div
      className="flex flex-col items-center gap-12 px-12 max-[360px]:gap-8 max-[360px]:px-8 md:gap-16 md:px-16"
      data-hero-geometry="title-stack"
    >
      <h1
        id="home-hero-title"
        className={`${onestText.className} flex max-w-[72rem] flex-col items-center font-normal leading-[0.98] tracking-[-0.055em]`}
        style={{ fontSize: titleSize[locale] }}
      >
        <span
          className={
            locale === "en"
              ? "block max-w-[18rem] text-balance md:max-w-full"
              : "block max-w-full text-balance"
          }
        >
          {copy.title}
        </span>
        <span className="block max-w-[22rem] text-balance md:max-w-full">
          {copy.bridge}{" "}
          <span className="text-primary">{copy.accent}</span>
        </span>
      </h1>

      <p
        id="home-hero-lead"
        className="mx-auto max-w-[36rem] text-body4 leading-[1.4] text-[var(--muted)] [text-wrap:balance]"
      >
        {copy.visualLine}
      </p>

      <ConsultationTrigger source="hero-consultation" className="sr-only">
        {copy.secondaryCta}
      </ConsultationTrigger>
    </div>
  );

  return (
    <section
      id="top"
      aria-labelledby="home-hero-title"
      className="relative z-10"
    >
      <HeroMotion homeHref={homeHref} title={title} locale={locale} />
    </section>
  );
}
