// Purpose: Client island for hero scroll pin + ContainerScroll + product mock.
// Scope: Title/CTAs are server children (LCP). Mock loads client-only to cut first JS.
"use client";

import { useLayoutEffect, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { ContainerScroll } from "@/Components/ui/container-scroll-animation";

const HeroProductMock = dynamic(
  () => import("@/Components/Home/HeroProductMock"),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-full w-full bg-[var(--page-bg-color,#f5f5f5)]"
        aria-hidden="true"
      />
    ),
  },
);

type HeroMotionProps = {
  homeHref: string;
  title: ReactNode;
};

export default function HeroMotion({ homeHref, title }: HeroMotionProps) {
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
      <HeroProductMock />
    </ContainerScroll>
  );
}
