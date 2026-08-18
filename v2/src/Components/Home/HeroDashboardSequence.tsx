// Purpose: Hero dashboard card - offer rail + agent visualization.
// Scope: One screen. No starter tab, no console mount, no screen switching.
"use client";

import dynamic from "next/dynamic";
import { localizePath, type Locale } from "@/i18n/config";
import { homeCopy } from "@/i18n/home";
import styles from "./HeroDashboardSequence.module.css";

function ScreenPlaceholder() {
  return (
    <div
      className="h-full w-full bg-[var(--page-bg-color,#f5f5f5)]"
      aria-hidden="true"
    />
  );
}

const HeroProductMock = dynamic(
  () => import("@/Components/Home/HeroProductMock"),
  { ssr: false, loading: ScreenPlaceholder },
);

export default function HeroDashboardSequence({
  locale,
}: {
  locale: Locale;
}) {
  const copy = homeCopy[locale].hero;
  const starterHref = localizePath("/starter", locale);

  return (
    <div className={styles.root} data-hero-dashboard-screen="production">
      <div className={styles.offerRail} data-hero-dashboard-offer>
        <p className={styles.offerCopy}>{copy.dashboardOffer}</p>
        <a
          href={starterHref}
          className={styles.offerCta}
          data-cta="hero-dashboard-starter"
        >
          {copy.dashboardOfferCta}
        </a>
      </div>

      <div className={styles.viewport}>
        <div className={styles.screen}>
          <HeroProductMock />
        </div>
      </div>
    </div>
  );
}
