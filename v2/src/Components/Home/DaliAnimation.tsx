"use client";

import { useEffect, useState } from "react";

import replayFrames from "./daliReplay.json";

type ReplayFrame = {
  t: number;
  paths: string[];
};

const FRAMES = replayFrames as ReplayFrame[];
const DISPLAY_FRAMES = FRAMES
  .filter((frame) => frame.t > 0 && frame.paths.length > 0)
  .map((frame, _, frames) => ({
    ...frame,
    t: frame.t - frames[0].t,
  }));
const VIEW_BOX = "404.961 293.334 384.071 186.273";
const START_DELAY_MS = 950;
const TIME_SCALE = 8;

export default function DaliAnimation() {
  const [frameIndex, setFrameIndex] = useState(-1);

  useEffect(() => {
    let rafId = 0;
    let startTime = 0;

    const draw = (now: number) => {
      if (!startTime) startTime = now;

      const elapsed = now - startTime - START_DELAY_MS;
      if (elapsed < 0) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      const sourceTime = elapsed / TIME_SCALE;
      let nextIndex = DISPLAY_FRAMES.length - 1;

      for (let i = 0; i < DISPLAY_FRAMES.length; i += 1) {
        if (DISPLAY_FRAMES[i].t > sourceTime) {
          nextIndex = Math.max(0, i - 1);
          break;
        }
      }

      setFrameIndex((current) => (current === nextIndex ? current : nextIndex));

      if (nextIndex < DISPLAY_FRAMES.length - 1) {
        rafId = requestAnimationFrame(draw);
      }
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const paths = frameIndex >= 0 ? DISPLAY_FRAMES[frameIndex]?.paths ?? [] : [];

  return (
    <svg
      viewBox={VIEW_BOX}
      xmlns="http://www.w3.org/2000/svg"
      className="lottie-hero block w-full max-w-[680px] h-auto overflow-visible"
      preserveAspectRatio="xMidYMid meet"
      aria-label="Dali"
    >
      {paths.map((d, index) => (
        <path
          key={index}
          d={d}
          fill="var(--primary, #dd1e3e)"
          stroke="var(--primary, #dd1e3e)"
        />
      ))}
    </svg>
  );
}
