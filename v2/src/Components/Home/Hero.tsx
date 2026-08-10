// Purpose: Homepage hero - server shell for LCP title/CTAs + client motion island.
// Scope: Localized copy in HTML; scroll/mock live in HeroMotion.
// Brand logo: site header (Navbar + DaliAnimation), not this section.

import { homeCopy } from "@/i18n/home";
import { localizePath, type Locale } from "@/i18n/config";
import { onestText } from "@/assets/fonts";
import ConsultationTrigger from "@/Components/Consultation/ConsultationTrigger";
import HeroMotion from "@/Components/Home/HeroMotion";

// The reference uses one promise, one consequence, and one proof line.
// Per-locale sizing keeps that composition intact at every breakpoint.
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
    <div className="flex flex-col items-center gap-[30px] px-12 md:gap-[24px] md:px-16">
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
        className="mx-auto max-w-[44rem] text-body4 leading-[1.5] text-[var(--muted)] [text-wrap:balance] md:text-lead"
      >
        {copy.lead}
      </p>

      <div className="mb-4 flex w-full max-w-[22rem] flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row md:mb-8">
        <ConsultationTrigger
          source="hero-consultation"
          className="inline-flex min-h-[44px] items-center justify-center rounded-8 border border-black/10 bg-primary px-20 py-12 text-center font-ui text-body5 uppercase text-white transition-colors hover:bg-primary-700"
        >
          {copy.primaryCta}
        </ConsultationTrigger>
        <a
          href="#projects"
          data-cta="hero-see-work"
          className="hidden min-h-[44px] items-center justify-center rounded-8 border border-black/15 bg-[var(--page-bg-color)] px-20 py-12 text-center font-ui text-body5 uppercase text-[var(--text)] transition-colors hover:bg-black hover:text-white sm:inline-flex"
        >
          {copy.secondaryCta}
        </a>
      </div>
    </div>
  );

  return (
    <section
      id="top"
      aria-labelledby="home-hero-title"
      className="relative z-10"
    >
      <HeroMotion homeHref={homeHref} title={title} />
    </section>
  );
}
