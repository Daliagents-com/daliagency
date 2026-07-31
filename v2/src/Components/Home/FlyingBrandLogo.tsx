// Purpose: Logo draws in hero, then flies into sticky header.
// After draw lock the only visible logo is a body portal (fixed, max z)
// so it always paints ON TOP of the sticky nav - never under it.
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { MotionValue } from "framer-motion";
import DaliAnimation from "./DaliAnimation";
import {
  LOGO_FLIGHT_END,
  LOGO_FLIGHT_LOCK_MS,
  LOGO_FLIGHT_START,
} from "./heroEntrance";

export const HERO_SLOT_ID = "dali-logo-hero-slot";
export const NAV_SLOT_ID = "dali-logo-nav-slot";
export const TRACK_ATTR = "data-logo-scroll-track";

/** Beat sticky nav (z-30), frame (z-30), grain (z-31), services (z-10). */
const FLIGHT_Z = 2147483000;

const MAX_BLUR = 1.8;

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

type Phase = "hero" | "flight" | "nav";
type Box = { left: number; top: number; width: number; height: number };

let warnedMissingContract = false;

function warnLogoContract(missing: string[]) {
  if (warnedMissingContract || process.env.NODE_ENV === "production") return;
  warnedMissingContract = true;
  console.error(
    `[FlyingBrandLogo] logo flight DOM contract incomplete. Missing: ${missing.join(
      ", ",
    )}. See src/Components/Home/MOTION.md.`,
  );
}

function setFlightBox(
  el: HTMLElement,
  box: Box,
  opacity: number,
  filter = "none",
) {
  el.style.left = `${box.left}px`;
  el.style.top = `${box.top}px`;
  el.style.width = `${box.width}px`;
  el.style.height = `${box.height}px`;
  el.style.opacity = String(opacity);
  el.style.visibility = opacity > 0.01 ? "visible" : "hidden";
  el.style.filter = filter;
  // Re-assert stacking every paint (beats sticky nav / any late CSS).
  el.style.zIndex = String(FLIGHT_Z);
  el.style.position = "fixed";
}

function readBox(el: HTMLElement): Box | null {
  const r = el.getBoundingClientRect();
  if (r.width < 2 || r.height < 2) return null;
  return { left: r.left, top: r.top, width: r.width, height: r.height };
}

function readNavBox(navSlot: HTMLElement, navMark: HTMLElement): Box {
  const mark = readBox(navMark);
  if (mark) return mark;
  const slot = navSlot.getBoundingClientRect();
  const height = Math.min(slot.height || 40, 40);
  const width = height * (108 / 56);
  return {
    left: slot.left + (slot.width - width) / 2,
    top: slot.top + (slot.height - height) / 2,
    width,
    height,
  };
}

export default function FlyingBrandLogo({
  homeHref = "/",
  scrollProgress,
}: {
  homeHref?: string;
  scrollProgress: MotionValue<number>;
}) {
  const flightRef = useRef<HTMLAnchorElement>(null);
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("hero");

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    const flight = flightRef.current;
    const heroSlot = document.getElementById(HERO_SLOT_ID);
    const navSlot = document.getElementById(NAV_SLOT_ID) as HTMLElement | null;
    const track = document.querySelector(
      `[${TRACK_ATTR}]`,
    ) as HTMLElement | null;

    const missing: string[] = [];
    if (!flight) missing.push("[data-logo-flight] ref");
    if (!heroSlot) missing.push(`#${HERO_SLOT_ID}`);
    if (!navSlot) missing.push(`#${NAV_SLOT_ID}`);
    if (!track) missing.push(`[${TRACK_ATTR}]`);
    if (!scrollProgress) missing.push("scrollProgress MotionValue");

    if (!flight || !heroSlot || !navSlot || !track || !scrollProgress) {
      warnLogoContract(missing);
      return;
    }

    const heroMark = heroSlot.querySelector<HTMLElement>("[data-logo-mark]");
    const navMark = navSlot.querySelector<HTMLElement>("[data-logo-mark]");
    if (!heroMark || !navMark) {
      warnLogoContract([
        ...(!heroMark ? [`#${HERO_SLOT_ID} [data-logo-mark]`] : []),
        ...(!navMark ? [`#${NAV_SLOT_ID} [data-logo-mark]`] : []),
      ]);
      return;
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let current: Phase = "hero";
    let raf = 0;
    /** Viewport-fixed start of the flight. Captured once lock ends so sticky
     *  hero stage can slide under the nav without dragging the logo under. */
    let startBox: Box | null = null;
    const lockUntil = performance.now() + (reduce ? 0 : LOGO_FLIGHT_LOCK_MS);

    // Opacity only - keep layout for measurement while still in hero.
    const setMark = (el: HTMLElement, on: boolean) => {
      el.style.opacity = on ? "1" : "0";
      el.style.visibility = on ? "visible" : "hidden";
      el.style.pointerEvents = on ? "auto" : "none";
    };

    const setPhaseLocal = (next: Phase) => {
      if (current === next) return;
      current = next;
      setPhase(next);

      if (next === "hero") {
        setMark(heroMark, true);
        setMark(navMark, false);
      } else if (next === "nav") {
        setMark(heroMark, false);
        setMark(navMark, true);
      } else {
        // Portal is the only visible logo.
        setMark(heroMark, false);
        setMark(navMark, false);
      }
    };

    setMark(heroMark, true);
    setMark(navMark, false);

    const paint = () => {
      const liveHero = readBox(heroMark);
      const navBox = readNavBox(navSlot, navMark);
      if (!liveHero && !startBox) return;

      const p = clamp01(scrollProgress.get());
      const now = performance.now();

      // 1) Draw in hero (in-flow). Portal hidden.
      if (now < lockUntil) {
        setPhaseLocal("hero");
        if (liveHero) setFlightBox(flight, liveHero, 0);
        return;
      }

      // Freeze start in viewport coords the first frame after lock.
      // Do not re-read hero after that - sticky stage would pull it under nav.
      if (!startBox && liveHero) {
        startBox = { ...liveHero };
      }
      if (!startBox) return;

      let t = 0;
      if (reduce) {
        t = p > (LOGO_FLIGHT_START + LOGO_FLIGHT_END) / 2 ? 1 : 0;
      } else {
        t = easeInOutCubic(
          clamp01(
            (p - LOGO_FLIGHT_START) / (LOGO_FLIGHT_END - LOGO_FLIGHT_START),
          ),
        );
      }

      // 2) Landed in nav.
      if (t >= 0.98 || (reduce && t >= 1)) {
        setFlightBox(flight, navBox, 0);
        setPhaseLocal("nav");
        return;
      }

      // 3) Portal owns the logo from the first post-lock frame.
      //    Fixed body layer + max z → always paints over sticky header.
      setPhaseLocal("flight");

      const box: Box = {
        left: lerp(startBox.left, navBox.left, t),
        top: lerp(startBox.top, navBox.top, t),
        width: lerp(startBox.width, navBox.width, t),
        height: lerp(startBox.height, navBox.height, t),
      };

      const blur = Math.sin(t * Math.PI) * MAX_BLUR;
      const filter = blur > 0.12 ? `blur(${blur.toFixed(2)}px)` : "none";
      setFlightBox(flight, box, 1, filter);
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(paint);
    };

    paint();
    const timers = [40, 160, 400].map((ms) => window.setTimeout(paint, ms));

    const unsubProgress = scrollProgress.on("change", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      unsubProgress();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      setMark(heroMark, true);
      setMark(navMark, false);
    };
  }, [mounted, scrollProgress]);

  if (!mounted) return null;

  return createPortal(
    <Link
      ref={flightRef}
      href={homeHref}
      aria-label="Dali home"
      aria-hidden={phase !== "flight"}
      tabIndex={phase === "flight" ? 0 : -1}
      data-logo-flight
      data-logo-phase={phase}
      className="pointer-events-none fixed block overflow-visible"
      style={{
        left: 0,
        top: 0,
        width: 1,
        height: 1,
        opacity: 0,
        visibility: "hidden",
        position: "fixed",
        zIndex: FLIGHT_Z,
        isolation: "isolate",
        willChange: "left, top, width, height, filter, opacity",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/dali-logo.svg"
        alt=""
        width={240}
        height={118}
        className="pointer-events-none h-full w-full select-none object-contain object-center"
        draggable={false}
      />
    </Link>,
    document.body,
  );
}

export function HeroBrandLogoEntrance({
  homeHref = "/",
}: {
  homeHref?: string;
}) {
  return (
    <div
      id={HERO_SLOT_ID}
      className="relative z-20 mx-auto mt-[min(7svh,2.25rem)] flex h-[88px] w-[180px] shrink-0 items-center justify-center md:mt-[min(8svh,2.75rem)] md:h-[118px] md:w-[240px]"
    >
      <Link
        href={homeHref}
        aria-label="Dali home"
        className="block h-full w-full overflow-visible"
      >
        <span
          data-logo-mark
          className="block h-full w-full overflow-visible"
          style={{ opacity: 1, visibility: "visible" }}
        >
          <DaliAnimation />
        </span>
      </Link>
    </div>
  );
}
