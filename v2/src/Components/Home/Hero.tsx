// Purpose: Homepage hero using framer-motion ContainerScroll (product expand).
// Scope: Localized copy + animated Dali Agents product mock.
// Brand logo: site header (Navbar + DaliAnimation), not this section.
"use client";

import { useLayoutEffect } from "react";
import { homeCopy } from "@/i18n/home";
import { localizePath, type Locale } from "@/i18n/config";
import { syneText } from "@/assets/fonts";
import { ContainerScroll } from "@/Components/ui/container-scroll-animation";
import HeroProductMock from "@/Components/Home/HeroProductMock";
import ConsultationTrigger from "@/Components/Consultation/ConsultationTrigger";

export default function Hero({ locale = "en" }: { locale?: Locale }) {
  const copy = homeCopy[locale].hero;
  const navigationCopy = homeCopy[locale].navigation;
  const homeHref = localizePath("/", locale);
  const words = copy.lines.flat();

  // Logo draw plays at the top of the hero. Browser scroll restoration often
  // reopens mid-page (logo already in nav, draw never visible) - pin top on load.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    // Restoration can fire after the first layout pass - re-pin once more.
    const t0 = window.setTimeout(() => window.scrollTo(0, 0), 0);
    const t1 = window.setTimeout(() => window.scrollTo(0, 0), 50);
    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
    };
  }, []);

  return (
    <section id="top" aria-labelledby="home-hero-title" className="relative z-10">
      <ContainerScroll
        homeHref={homeHref}
        titleComponent={
          <div className="flex flex-col items-center gap-12 px-16 md:gap-14">
            <h1
              id="home-hero-title"
              className={`${syneText.className} font-bold uppercase leading-[0.92] tracking-[-0.045em]`}
            >
              <span
                className="hidden whitespace-nowrap md:inline-block"
                style={{ fontSize: "clamp(40px, 3.8vw, 80px)" }}
              >
                {words.join("\u00a0")}
              </span>
              <span className="block text-[clamp(40px,10vw,48px)] leading-[0.94] md:hidden">
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

            <div className="flex flex-wrap items-center justify-center gap-12">
              <ConsultationTrigger
                source="hero-consultation"
                className="inline-flex items-center justify-center rounded-8 bg-primary px-20 py-12 text-body5 uppercase text-white transition-colors hover:bg-primary-700"
              >
                {navigationCopy.startAudit}
              </ConsultationTrigger>
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-8 border border-black/15 bg-[var(--page-bg-color)] px-20 py-12 text-body5 uppercase transition-colors hover:bg-black hover:text-white"
              >
                {navigationCopy.home[0]}
              </a>
            </div>
          </div>
        }
      >
        <HeroProductMock />
      </ContainerScroll>
    </section>
  );
}
