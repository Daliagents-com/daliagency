// Purpose: Client island for hero scroll pin + ContainerScroll + dashboard.
// Scope: Title is a server child; the card is the agent visualization only.
"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { ContainerScroll } from "@/Components/ui/container-scroll-animation";
import HeroDashboardSequence from "@/Components/Home/HeroDashboardSequence";
import type { Locale } from "@/i18n/config";

type HeroMotionProps = {
  homeHref: string;
  title: ReactNode;
  locale: Locale;
};

export default function HeroMotion({
  homeHref,
  title,
  locale,
}: HeroMotionProps) {
  // Logo draw plays at the top of the hero. Browser scroll restoration often
  // reopens mid-page (logo already in nav, draw never visible) - pin top on load.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    const t0 = window.setTimeout(() => window.scrollTo(0, 0), 0);
    const t1 = window.setTimeout(() => window.scrollTo(0, 0), 50);
    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
    };
  }, []);

  return (
    <ContainerScroll homeHref={homeHref} titleComponent={title}>
      <HeroDashboardSequence locale={locale} />
    </ContainerScroll>
  );
}
