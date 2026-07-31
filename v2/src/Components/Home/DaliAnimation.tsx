// Purpose: Hand-draw Dali wordmark on mount from recorded pen frames.
// Scope: Hero logo only. Replay: daliReplay.json. Timing: heroEntrance.ts.
// Engine: rAF frame replay (no GSAP). Final frame is always the safe fallback.
"use client";

import { useLayoutEffect, useState } from "react";
import replayFrames from "./daliReplay.json";
import {
  DALI_HAND_DRAW_MS,
  HERO_ENTRANCE_DELAY_MS,
  LOGO_FLIGHT_LOCK_MS,
} from "./heroEntrance";

type ReplayFrame = {
  t: number;
  paths: string[];
};

const FRAMES = replayFrames as ReplayFrame[];

/** Frames with ink, time-normalized so first painted frame is t=0. */
const DISPLAY_FRAMES = FRAMES.filter(
  (frame) => frame.t > 0 && frame.paths.length > 0,
).map((frame, _, frames) => ({
  ...frame,
  t: frame.t - frames[0].t,
}));

const LAST_INDEX = Math.max(0, DISPLAY_FRAMES.length - 1);
const FINAL_PATHS = DISPLAY_FRAMES[LAST_INDEX]?.paths ?? [];

const VIEW_BOX = "404.961 293.334 384.071 186.273";

/**
 * Map replay source time → wall clock so the full stroke lands in
 * DALI_HAND_DRAW_MS (single timing source: heroEntrance.ts).
 */
const REPLAY_LAST_T = Math.max(DISPLAY_FRAMES[LAST_INDEX]?.t ?? 1, 1);
const TIME_SCALE = DALI_HAND_DRAW_MS / REPLAY_LAST_T;

/** Dark ink - matches filled wordmark / nav logo. */
const INK = "#111312";

type Props = {
  className?: string;
};

/**
 * Progressive path replay: blank → pen strokes → finished wordmark.
 *
 * Critical: first paint / SSR / no-JS / failed effect always shows FINAL_PATHS.
 * Hand-draw only runs on the client when motion is allowed.
 */
export default function DaliAnimation({ className = "" }: Props) {
  // Final frame by default so the mark is never an empty SVG.
  const [frameIndex, setFrameIndex] = useState(LAST_INDEX);

  useLayoutEffect(() => {
    if (DISPLAY_FRAMES.length === 0) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      setFrameIndex(LAST_INDEX);
      return;
    }

    let cancelled = false;
    let rafId = 0;
    let startTime = 0;

    // Restart from blank so the pen-draw is visible on every mount.
    setFrameIndex(-1);

    const finish = () => {
      if (!cancelled) setFrameIndex(LAST_INDEX);
    };

    const draw = (now: number) => {
      if (cancelled) return;
      if (!startTime) startTime = now;

      const elapsed = now - startTime - HERO_ENTRANCE_DELAY_MS;
      if (elapsed < 0) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      const sourceTime = elapsed / TIME_SCALE;
      let nextIndex = LAST_INDEX;

      for (let i = 0; i < DISPLAY_FRAMES.length; i += 1) {
        if (DISPLAY_FRAMES[i].t > sourceTime) {
          nextIndex = Math.max(0, i - 1);
          break;
        }
      }

      setFrameIndex((current) => (current === nextIndex ? current : nextIndex));

      if (nextIndex < LAST_INDEX) {
        rafId = requestAnimationFrame(draw);
      } else {
        finish();
      }
    };

    rafId = requestAnimationFrame(draw);

    // Hard safety: never leave the badge empty if rAF stalls or Strict Mode races.
    const safetyMs = Math.max(
      LOGO_FLIGHT_LOCK_MS + 200,
      HERO_ENTRANCE_DELAY_MS + DALI_HAND_DRAW_MS + 200,
    );
    const safety = window.setTimeout(finish, safetyMs);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.clearTimeout(safety);
    };
  }, []);

  const paths =
    frameIndex < 0
      ? []
      : (DISPLAY_FRAMES[frameIndex]?.paths ?? FINAL_PATHS);

  return (
    <span className={`relative block h-full w-full ${className}`}>
      {/* Static fallback: visible only while replay paths are empty. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/dali-logo.svg"
        alt=""
        width={240}
        height={118}
        draggable={false}
        aria-hidden
        className={`pointer-events-none absolute inset-0 h-full w-full select-none object-contain object-center transition-opacity duration-150 ${
          paths.length === 0 ? "opacity-100" : "opacity-0"
        }`}
      />
      <svg
        viewBox={VIEW_BOX}
        xmlns="http://www.w3.org/2000/svg"
        className={`relative block h-full w-full overflow-visible transition-opacity duration-150 ${
          paths.length === 0 ? "opacity-0" : "opacity-100"
        }`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
        data-dali-draw="true"
      >
        {paths.map((d, index) => (
          <path
            key={index}
            d={d}
            fill={INK}
            stroke={INK}
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </span>
  );
}
