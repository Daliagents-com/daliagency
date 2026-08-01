// Purpose: Flat scroll hero - title fades out, mock rises.
// Scope: Sticky stage; fixed bg settings (no control panel).
// Perf: LCP title paints without CSS filter / motion style binding on first frame.
// Brand logo lives in the site header (Navbar + DaliAnimation), not here.
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import dynamic from "next/dynamic";
import {
  HERO_ENTRANCE_DELAY_S,
  HERO_ENTRANCE_DURATION_S,
  HERO_ENTRANCE_EASE,
} from "@/Components/Home/heroEntrance";

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

export function ContainerScroll({
  titleComponent,
  children,
  className = "",
  homeHref: _homeHref = "/",
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  // WebGL lines after idle - must not compete with LCP text/fonts.
  const [showPaperBg, setShowPaperBg] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [1.06, 1] : [1.08, 1],
  );
  const cardY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [72, -130] : [96, -180],
  );

  const titleY = useTransform(scrollYProgress, [0, 0.7], [0, -48]);
  // Opacity-only fade (no CSS filter/blur on the LCP element - that was the render-delay killer).
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65],
    [1, 0.55, 0],
  );
  const titlePointerEvents = useTransform(
    scrollYProgress,
    (p): "auto" | "none" => (p > 0.47 ? "none" : "auto"),
  );

  return (
    <div
      ref={containerRef}
      className={`relative h-[160vh] md:h-[170vh] ${className}`}
      data-logo-scroll-track
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
          <Header
            y={titleY}
            opacity={titleOpacity}
            pointerEvents={titlePointerEvents}
            titleComponent={titleComponent}
          />
          <Card scale={scale} y={cardY}>
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
}

/**
 * LCP shell: no motion style binding on first paint.
 * After paint / first scroll: transform + opacity only (never CSS filter on title).
 */
function Header({
  y,
  opacity,
  pointerEvents,
  titleComponent,
}: {
  y: MotionValue<number>;
  opacity: MotionValue<number>;
  pointerEvents: MotionValue<"auto" | "none">;
  titleComponent: React.ReactNode;
}) {
  const [motionReady, setMotionReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let raf2 = 0;
    const enable = () => {
      if (!cancelled) setMotionReady(true);
    };

    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(enable);
    });

    // If the user scrolls before rAF settles, enable immediately.
    window.addEventListener("scroll", enable, { passive: true, once: true });

    // Fallback so mid-session hydration always gets scroll binding.
    const t = window.setTimeout(enable, 120);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      window.removeEventListener("scroll", enable);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <motion.div
      // Until ready: no style binding so H1 paints without filter/transform work.
      style={
        motionReady
          ? {
              y,
              opacity,
              pointerEvents,
              willChange: "transform, opacity",
            }
          : undefined
      }
      className="relative z-10 mx-auto mt-16 w-full max-w-5xl shrink-0 px-4 text-center md:mt-20"
    >
      {titleComponent}
    </motion.div>
  );
}

function Card({
  scale,
  y,
  children,
}: {
  scale: MotionValue<number>;
  y: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        scale,
        y,
        boxShadow:
          "0 8px 24px rgba(15, 23, 42, 0.08), 0 2px 8px rgba(15, 23, 42, 0.04)",
        willChange: "transform",
      }}
      className="relative z-20 mx-auto mt-12 h-[28rem] w-full max-w-5xl shrink-0 overflow-hidden rounded-[1.75rem] md:mt-14 md:h-[38rem]"
    >
      {/*
        Entrance runs in parallel with the logo stroke draw - same delay/duration/ease
        from heroEntrance.ts so mock and signature resolve together.
      */}
      <motion.div
        className="h-full w-full overflow-hidden bg-[var(--page-bg-color,#f5f5f5)]"
        initial={{ opacity: 0, y: 64, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: HERO_ENTRANCE_DELAY_S,
          duration: HERO_ENTRANCE_DURATION_S,
          ease: HERO_ENTRANCE_EASE,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
