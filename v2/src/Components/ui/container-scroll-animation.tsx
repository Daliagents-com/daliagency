// Purpose: Flat scroll hero - title fades out, mock rises.
// Scope: Sticky stage; fixed bg settings (no control panel).
// Engine: DOM/rAF scroll progress + CSS entrance (NO framer on this path).
// Brand logo lives in the site header (Navbar + DaliAnimation), not here.
"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  HERO_ENTRANCE_DELAY_MS,
  HERO_ENTRANCE_DURATION_MS,
} from "@/Components/Home/heroEntrance";
import styles from "./container-scroll-animation.module.css";

const PaperDesignBackground = dynamic(
  () =>
    import("@/Components/ui/neon-dither").then((m) => m.PaperDesignBackground),
  { ssr: false },
);

type ContainerScrollProps = {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  homeHref?: string;
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

/** Piecewise-linear map: progress p through stop/value arrays. */
function mapRange(
  p: number,
  stops: readonly number[],
  values: readonly number[],
): number {
  if (p <= stops[0]) return values[0];
  const last = stops.length - 1;
  if (p >= stops[last]) return values[last];
  for (let i = 0; i < last; i += 1) {
    const a = stops[i];
    const b = stops[i + 1];
    if (p >= a && p <= b) {
      const t = (p - a) / (b - a || 1);
      return values[i] + (values[i + 1] - values[i]) * t;
    }
  }
  return values[last];
}

/**
 * Scroll progress for offset ["start start", "end end"] on a tall track:
 * 0 when track top hits viewport top, 1 when track bottom hits viewport bottom.
 */
function trackProgress(el: HTMLElement): number {
  const total = el.offsetHeight - window.innerHeight;
  if (total <= 0) return 0;
  const top = el.getBoundingClientRect().top;
  return clamp01(-top / total);
}

export function ContainerScroll({
  titleComponent,
  children,
  className = "",
  homeHref: _homeHref = "/",
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  // WebGL lines after idle - must not compete with LCP text/fonts.
  const [showPaperBg, setShowPaperBg] = useState(false);
  // Apply scroll transforms only after first paint so LCP title stays static.
  const [scrollFxReady, setScrollFxReady] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const enable = () => setShowPaperBg(true);

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 1800 });
    } else {
      timeoutId = setTimeout(enable, 500);
    }

    return () => {
      if (idleId != null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let raf2 = 0;
    const enable = () => {
      if (!cancelled) setScrollFxReady(true);
    };
    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(enable);
    });
    window.addEventListener("scroll", enable, { passive: true, once: true });
    const t = window.setTimeout(enable, 120);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      window.removeEventListener("scroll", enable);
      window.clearTimeout(t);
    };
  }, []);

  // Scroll-linked title + card - plain DOM, no framer.
  useEffect(() => {
    if (!scrollFxReady) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;

    const container = containerRef.current;
    const title = titleRef.current;
    const card = cardRef.current;
    if (!container || !title || !card) return undefined;

    let raf = 0;
    let lastP = -1;

    const apply = (p: number) => {
      if (Math.abs(p - lastP) < 0.0005) return;
      lastP = p;

      const titleY = mapRange(p, [0, 0.7], [0, -48]);
      const titleOpacity = mapRange(p, [0, 0.35, 0.65], [1, 0.55, 0]);
      title.style.transform = `translate3d(0, ${titleY}px, 0)`;
      title.style.opacity = String(titleOpacity);
      title.style.pointerEvents = p > 0.47 ? "none" : "auto";

      const scaleFrom = isMobile ? 1.06 : 1.08;
      const yFrom = isMobile ? 72 : 96;
      const yTo = isMobile ? -130 : -180;
      const scale = mapRange(p, [0, 1], [scaleFrom, 1]);
      const cardY = mapRange(p, [0, 1], [yFrom, yTo]);
      card.style.transform = `translate3d(0, ${cardY}px, 0) scale(${scale})`;
    };

    const tick = () => {
      raf = 0;
      apply(trackProgress(container));
    };

    const onScrollOrResize = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(tick);
    };

    // Initial bind at current scroll.
    apply(trackProgress(container));
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [scrollFxReady, isMobile]);

  return (
    <div
      ref={containerRef}
      className={`relative h-[160vh] md:h-[170vh] ${className}`}
      data-logo-scroll-track
      style={
        {
          "--hero-entrance-delay": `${HERO_ENTRANCE_DELAY_MS}ms`,
          "--hero-entrance-duration": `${HERO_ENTRANCE_DURATION_MS}ms`,
        } as React.CSSProperties
      }
    >
      <div className="sticky top-0 h-svh min-h-[36rem] overflow-hidden px-2 md:px-10">
        <div className="absolute inset-0 z-0 opacity-[0.64]">
          {showPaperBg ? (
            <PaperDesignBackground
              themeMode="light"
              shape="lines"
              intensity={0.74}
              colorStrength={0.62}
              effectStrength={0.46}
              patternScale={1.2}
              pixelSize={4}
              whiteTop={0.78}
              parallax={false}
            />
          ) : (
            <div
              className="h-full w-full bg-[var(--page-bg-color,#f5f5f5)]"
              aria-hidden="true"
            />
          )}
        </div>

        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center pt-[min(4svh,1.25rem)] md:pt-[min(5svh,1.75rem)]">
          <div ref={titleRef} className={styles.titleLayer}>
            {titleComponent}
          </div>
          <div ref={cardRef} className={styles.cardLayer}>
            <div className={styles.mockEntrance}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
