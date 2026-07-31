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
 * First paint is intentionally blank (not the finished mark). Showing the full
 * logo first and then replaying the stroke reads as "appear, then draw again".
 * Reduced-motion / safety timeout land on FINAL_PATHS immediately.
 */
export default function DaliAnimation({ className = "" }: Props) {
  // -1 = no ink yet. Never start on LAST_INDEX or the mark pops in complete.
  const [frameIndex, setFrameIndex] = useState(-1);

  useLayoutEffect(() => {
    if (DISPLAY_FRAMES.length === 0) {
      setFrameIndex(LAST_INDEX);
      return;
    }

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
    let settled = false;
    let safety = 0;

    // Stay blank until the entrance delay elapses, then pen-draw from frame 0.
    setFrameIndex(-1);

    /** Land once on the final ink and stop - no second handoff / re-render loop. */
    const settle = (index = LAST_INDEX) => {
      if (cancelled || settled) return;
      settled = true;
      setFrameIndex(index);
      cancelAnimationFrame(rafId);
      rafId = 0;
      if (safety) {
        window.clearTimeout(safety);
        safety = 0;
      }
    };

    const draw = (now: number) => {
      if (cancelled || settled) return;
      if (!startTime) startTime = now;

      const elapsed = now - startTime - HERO_ENTRANCE_DELAY_MS;
      if (elapsed < 0) {
        // Keep empty during delay - do not flash a full wordmark.
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

      // First post-delay tick: if replay clock is still before frame 0 ink, stay blank.
      if (sourceTime < (DISPLAY_FRAMES[0]?.t ?? 0)) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      if (nextIndex >= LAST_INDEX) {
        // Drawn - leave the final frame as-is. No extra transition after this.
        settle(LAST_INDEX);
        return;
      }

      setFrameIndex((current) => (current === nextIndex ? current : nextIndex));
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    // Hard safety: never leave the badge empty if rAF stalls or Strict Mode races.
    const safetyMs = Math.max(
      LOGO_FLIGHT_LOCK_MS + 200,
      HERO_ENTRANCE_DELAY_MS + DALI_HAND_DRAW_MS + 200,
    );
    safety = window.setTimeout(() => settle(LAST_INDEX), safetyMs);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      if (safety) window.clearTimeout(safety);
    };
  }, []);

  const paths =
    frameIndex < 0
      ? []
      : (DISPLAY_FRAMES[frameIndex]?.paths ?? FINAL_PATHS);

  return (
    <span className={`relative block h-full w-full ${className}`}>
      {/*
        No static full-logo img fallback during the blank window.
        That was the "logo appears, then draws" bug: empty paths → full SVG image.
        Decorative only (parent link has the accessible name).
      */}
      <svg
        viewBox={VIEW_BOX}
        xmlns="http://www.w3.org/2000/svg"
        className="relative block h-full w-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
        data-dali-draw="true"
        data-dali-frame={frameIndex}
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
