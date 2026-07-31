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
  LOGO_FLIGHT_SMOOTH,
  LOGO_FLIGHT_START,
} from "./heroEntrance";

export const HERO_SLOT_ID = "dali-logo-hero-slot";
export const NAV_SLOT_ID = "dali-logo-nav-slot";
export const TRACK_ATTR = "data-logo-scroll-track";

/** Beat sticky nav (z-30), frame (z-30), grain (z-31), services (z-10). */
const FLIGHT_Z = 2147483000;

/** Settle threshold for temporal follow (linear progress). */
const SETTLE_EPS = 0.0008;

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

/**
 * Gentle in-out (smootherstep). Applied once to linear progress.
 * Do not ease size/position with different curves - that drifts the center.
 */
function easeFlight(t: number) {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Frame-rate independent exponential approach toward a target. */
function expSmooth(
  current: number,
  target: number,
  dtSec: number,
  rate: number,
) {
  if (dtSec <= 0) return current;
  const k = 1 - Math.exp(-rate * dtSec);
  return current + (target - current) * k;
}

type Phase = "hero" | "flight" | "nav";
type Box = { left: number; top: number; width: number; height: number };
type CenterBox = { cx: number; cy: number; width: number; height: number };

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

function toCenter(box: Box): CenterBox {
  return {
    cx: box.left + box.width / 2,
    cy: box.top + box.height / 2,
    width: box.width,
    height: box.height,
  };
}

function fromCenter(c: CenterBox): Box {
  return {
    left: c.cx - c.width / 2,
    top: c.cy - c.height / 2,
    width: c.width,
    height: c.height,
  };
}

/**
 * Straight-line flight: one t drives center + size.
 * Lerping left/top + width separately (or with different eases) makes the
 * visual center wander left/right mid-path - the "obstacle" look.
 */
function lerpCenterBox(a: CenterBox, b: CenterBox, t: number): Box {
  const width = lerp(a.width, b.width, t);
  const height = lerp(a.height, b.height, t);
  return fromCenter({
    cx: lerp(a.cx, b.cx, t),
    cy: lerp(a.cy, b.cy, t),
    width,
    height,
  });
}

function setFlightBox(el: HTMLElement, box: Box, opacity: number) {
  // Half-pixel snap keeps edges stable while scaling.
  const left = Math.round(box.left * 2) / 2;
  const top = Math.round(box.top * 2) / 2;
  const width = Math.max(1, Math.round(box.width * 2) / 2);
  const height = Math.max(1, Math.round(box.height * 2) / 2);

  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
  el.style.opacity = String(opacity);
  el.style.visibility = opacity > 0.01 ? "visible" : "hidden";
  el.style.filter = "none";
  el.style.transform = "translateZ(0)";
  el.style.zIndex = String(FLIGHT_Z);
  el.style.position = "fixed";
}

function readBox(el: HTMLElement): Box | null {
  const r = el.getBoundingClientRect();
  if (r.width < 2 || r.height < 2) return null;
  return { left: r.left, top: r.top, width: r.width, height: r.height };
}

/**
 * Prefer the real mark metrics; fall back to slot with fixed wordmark aspect.
 * Always center within the slot so flight end is stable even if the img is hidden.
 */
function readNavCenter(
  navSlot: HTMLElement,
  navMark: HTMLElement,
  cachedSize: { width: number; height: number } | null,
): CenterBox {
  const slot = navSlot.getBoundingClientRect();

  let width = 0;
  let height = 0;

  // Prefer frozen size so show/hide of the nav img never bends the path.
  if (cachedSize && cachedSize.width >= 2 && cachedSize.height >= 2) {
    width = cachedSize.width;
    height = cachedSize.height;
  } else {
    const mark = readBox(navMark);
    if (mark) {
      width = mark.width;
      height = mark.height;
    } else {
      height = Math.min(slot.height || 40, 40);
      width = height * (108 / 56);
    }
  }

  // Slot center is the stable landing target (sticky nav, doesn't jitter).
  return {
    cx: slot.left + slot.width / 2,
    cy: slot.top + slot.height / 2,
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
    let looping = false;
    /**
     * Viewport-fixed start of the flight (center+size). Captured on first real
     * flight frame - not at lock end - so the finished hand-draw stays on screen
     * until the user actually scrolls (no post-draw swap to the portal img).
     */
    let start: CenterBox | null = null;
    /** Nav mark pixel size - freeze so hide/show of the img never changes path. */
    let navSize: { width: number; height: number } | null = null;
    /** Smoothed *linear* progress 0-1 (ease applied after). */
    let displayLinear = 0;
    let lastFrame = performance.now();
    const lockUntil = performance.now() + (reduce ? 0 : LOGO_FLIGHT_LOCK_MS);
    const flightSpan = Math.max(0.001, LOGO_FLIGHT_END - LOGO_FLIGHT_START);
    /** Below this, hero keeps the drawn SVG - portal must not take over. */
    const FLIGHT_ENGAGE = 0.004;

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

    const captureNavSize = () => {
      const mark = readBox(navMark);
      if (mark) {
        navSize = { width: mark.width, height: mark.height };
        return;
      }
      // Mark may already be hidden - measure after a brief force-show layout.
      const prev = {
        opacity: navMark.style.opacity,
        visibility: navMark.style.visibility,
      };
      navMark.style.opacity = "0";
      navMark.style.visibility = "hidden";
      // visibility:hidden still lays out; if width is 0, use aspect fallback.
      const again = readBox(navMark);
      if (again) {
        navSize = { width: again.width, height: again.height };
      } else {
        const slot = navSlot.getBoundingClientRect();
        const height = Math.min(slot.height || 40, 40);
        navSize = { width: height * (108 / 56), height };
      }
      navMark.style.opacity = prev.opacity;
      navMark.style.visibility = prev.visibility;
    };

    const linearFromScroll = (p: number) =>
      clamp01((p - LOGO_FLIGHT_START) / flightSpan);

    const stopLoop = () => {
      looping = false;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const schedule = () => {
      if (raf) return;
      looping = true;
      raf = requestAnimationFrame(paint);
    };

    const paint = (frameTime: number) => {
      raf = 0;
      const now = frameTime;
      const dtSec = Math.min(0.048, Math.max(0, (now - lastFrame) / 1000));
      lastFrame = now;

      const liveHero = readBox(heroMark);
      if (!liveHero && !start) {
        stopLoop();
        return;
      }

      if (!navSize) captureNavSize();
      const end = readNavCenter(navSlot, navMark, navSize);
      // Keep size lock in sync if we got a better read.
      if (!navSize && end.width >= 2) {
        navSize = { width: end.width, height: end.height };
      }

      const p = clamp01(scrollProgress.get());

      // 1) Hand-draw lock: hero owns the mark, portal hidden.
      if (now < lockUntil) {
        setPhaseLocal("hero");
        if (liveHero) setFlightBox(flight, liveHero, 0);
        displayLinear = 0;
        start = null;
        schedule();
        return;
      }

      const targetLinear = reduce
        ? p > (LOGO_FLIGHT_START + LOGO_FLIGHT_END) / 2
          ? 1
          : 0
        : linearFromScroll(p);

      if (reduce) {
        displayLinear = targetLinear;
      } else {
        displayLinear = expSmooth(
          displayLinear,
          targetLinear,
          dtSec,
          LOGO_FLIGHT_SMOOTH,
        );
        if (Math.abs(targetLinear - displayLinear) < SETTLE_EPS) {
          displayLinear = targetLinear;
        }
      }

      // Ease once - same t for center and size (straight, stable path).
      const t = reduce ? displayLinear : easeFlight(displayLinear);
      const needsFollow = Math.abs(targetLinear - displayLinear) >= SETTLE_EPS;

      // 2) Still at top after draw: keep the finished SVG. Do NOT hand off to the
      //    portal img (that was the "drew, then pops again as a filled logo" glitch).
      if (t <= FLIGHT_ENGAGE && targetLinear <= FLIGHT_ENGAGE) {
        setPhaseLocal("hero");
        if (liveHero) {
          // Keep start warm for the first real flight frame.
          start = toCenter(liveHero);
          setFlightBox(flight, liveHero, 0);
        }
        if (needsFollow) schedule();
        else stopLoop();
        return;
      }

      // Freeze start on first engaged flight frame (viewport coords).
      if (!start && liveHero) {
        start = toCenter(liveHero);
      }
      if (!start) {
        stopLoop();
        return;
      }

      // 3) Landed in nav.
      if (t >= 0.998 && targetLinear >= 0.998) {
        setFlightBox(flight, fromCenter(end), 0);
        setPhaseLocal("nav");
        if (needsFollow) schedule();
        else stopLoop();
        return;
      }

      // 4) Portal owns the logo only while flying (scroll-driven).
      setPhaseLocal("flight");
      setFlightBox(flight, lerpCenterBox(start, end, t), 1);

      if (needsFollow) schedule();
      else stopLoop();
    };

    const kick = () => {
      if (!raf) lastFrame = performance.now();
      schedule();
    };

    const onResize = () => {
      // Re-measure landing size on resize; keep path geometry honest.
      navSize = null;
      captureNavSize();
      // If still at top / not yet flown, refresh start from live hero.
      if (displayLinear < 0.02) {
        const live = readBox(heroMark);
        if (live) start = toCenter(live);
      }
      kick();
    };

    captureNavSize();
    kick();
    const timers = [40, 160, 400].map((ms) => window.setTimeout(kick, ms));

    const unsubProgress = scrollProgress.on("change", kick);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      stopLoop();
      timers.forEach(clearTimeout);
      unsubProgress();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
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
        willChange: "left, top, width, height, opacity, transform",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/dali-logo.svg"
        alt="Dali"
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
  className = "",
}: {
  homeHref?: string;
  /** Optional layout overrides (e.g. tighter margin on inner pages). */
  className?: string;
}) {
  return (
    <div
      id={HERO_SLOT_ID}
      className={`relative z-20 mx-auto mt-[min(7svh,2.25rem)] flex h-[88px] w-[180px] shrink-0 items-center justify-center md:mt-[min(8svh,2.75rem)] md:h-[118px] md:w-[240px] ${className}`}
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
