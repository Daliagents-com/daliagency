// Purpose: Homepage hero - server shell for LCP title/CTAs + client motion island.
// Scope: Localized copy in HTML; scroll/mock live in HeroMotion.
// Brand logo: site header (Navbar + DaliAnimation), not this section.

import { homeCopy } from "@/i18n/home";
import { localizePath, type Locale } from "@/i18n/config";
import { syneText } from "@/assets/fonts";
import ConsultationTrigger from "@/Components/Consultation/ConsultationTrigger";
import HeroMotion from "@/Components/Home/HeroMotion";

// Desktop H1 is a single nowrap line, so the size must fit the longest
// localized string: measured at 3.8vw/1440px the line is 1005px (en),
// 1590px (ru, Unbounded), 1211px (ge), 1460px (arm). Coefficients and
// floors keep every locale inside the viewport down to the md breakpoint.
const desktopTitleSize: Record<Locale, string> = {
  en: "clamp(40px, 3.8vw, 80px)",
  ru: "clamp(24px, 2.9vw, 60px)",
  ge: "clamp(32px, 3.8vw, 80px)",
  arm: "clamp(26px, 3.15vw, 66px)",
};

// Mobile lines are non-breaking as well; widest line at 40px is 322px (en),
// 565px (ru), 423px (ge), 622px (arm) against 358px of content at 390px.
const mobileTitleSize: Record<Locale, string> = {
  en: "clamp(40px, 10vw, 48px)",
  ru: "clamp(20px, 6.4vw, 31px)",
  ge: "clamp(26px, 8.5vw, 41px)",
  arm: "clamp(16px, 5.7vw, 27px)",
};

export default function Hero({ locale = "en" }: { locale?: Locale }) {
  const copy = homeCopy[locale].hero;
  const navigationCopy = homeCopy[locale].navigation;
  const homeHref = localizePath("/", locale);
  const words = copy.lines.flat();

  const title = (
    <div className="flex flex-col items-center gap-12 px-16 md:gap-14">
      <h1
        id="home-hero-title"
        className={`${syneText.className} font-bold uppercase leading-[0.92] tracking-[-0.045em]`}
      >
        <span
          className="hidden whitespace-nowrap md:inline-block"
          style={{ fontSize: desktopTitleSize[locale] }}
        >
          {words.join("\u00a0")}
        </span>
        <span
          className="block leading-[0.94] md:hidden"
          style={{ fontSize: mobileTitleSize[locale] }}
        >
          {copy.lines.map((line, lineIndex) => (
            <span key={`${locale}-m-${lineIndex}`} className="block">
              {line.join("\u00a0")}
            </span>
          ))}
        </span>
      </h1>

      <p className="mx-auto max-w-[28rem] text-body4 text-[var(--muted)] md:text-lead">
        {copy.lead}
      </p>

      <p className="mx-auto max-w-[34rem] text-body5 text-[var(--muted)]">
        {copy.icp}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-12">
        <ConsultationTrigger
          source="hero-consultation"
          className="inline-flex items-center justify-center rounded-8 bg-primary px-20 py-12 text-body5 uppercase text-white transition-colors hover:bg-primary-700"
        >
          {navigationCopy.startAudit}
        </ConsultationTrigger>
        <a
          href={localizePath("/solutions", locale)}
          className="inline-flex items-center justify-center rounded-8 border border-black/15 bg-[var(--page-bg-color)] px-20 py-12 text-body5 uppercase transition-colors hover:bg-black hover:text-white"
        >
          {copy.secondaryCta}
        </a>
      </div>

      <p className="mx-auto max-w-[34rem] text-body6 uppercase tracking-[0.06em] text-[var(--muted)]">
        {copy.promise}
      </p>
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
