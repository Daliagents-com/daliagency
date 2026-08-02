// Purpose: Client island for hero scroll pin + ContainerScroll + product mock.
// Scope: Title/CTAs are server children (LCP). Mock + framer load after idle.
"use client";

import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";
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

function MockPlaceholder() {
  return (
    <div
      className="h-full w-full bg-[var(--page-bg-color,#f5f5f5)]"
      aria-hidden="true"
    />
  );
}

export default function HeroMotion({ homeHref, title }: HeroMotionProps) {
  // Defer product mock (framer tour) until after LCP window.
  const [loadMock, setLoadMock] = useState(false);

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

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const enable = () => setLoadMock(true);

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 1600 });
    } else {
      timeoutId = setTimeout(enable, 400);
    }

    return () => {
      if (idleId != null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <ContainerScroll homeHref={homeHref} titleComponent={title}>
      {loadMock ? <HeroProductMock /> : <MockPlaceholder />}
    </ContainerScroll>
  );
}
