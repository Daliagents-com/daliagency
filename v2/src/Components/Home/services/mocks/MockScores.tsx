// Purpose: Scores mock — arcs draw, then center count, then pills.
// Start frame hides center/pills so first play is visible.
"use client";

import {
  DRAW,
  OUT,
  createMockPlayer,
  useMockLoop,
  type MockPlayer,
} from "../motionShared";
import styles from "../../DesignSprints.module.css";

function buildScores(root: HTMLElement): MockPlayer | null {
  const arcs = Array.from(root.querySelectorAll<SVGCircleElement>("[data-arc]"));
  const center = root.querySelector<HTMLElement>("[data-center]");
  const centerVal = root.querySelector<HTMLElement>("[data-cv]");
  const pills = Array.from(root.querySelectorAll<HTMLElement>("[data-pill]"));
  if (!arcs.length || !center) return null;

  const circ = (r: number) => 2 * Math.PI * r;
  const radii = [42, 34, 26];
  const fills = [0.81, 0.92, 0.74];

  const reset = () => {
    arcs.forEach((arc, i) => {
      const c = circ(radii[i] ?? 30);
      arc.style.strokeDasharray = String(c);
      arc.style.strokeDashoffset = String(c);
      arc.style.opacity = "0.55";
    });
    center.style.opacity = "0";
    if (centerVal) centerVal.textContent = "0";
    pills.forEach((p) => {
      p.style.opacity = "0";
    });
  };

  const finish = () => {
    arcs.forEach((arc, i) => {
      const c = circ(radii[i] ?? 30);
      const target = c * (1 - (fills[i] ?? 0.7));
      arc.style.strokeDasharray = String(c);
      arc.style.strokeDashoffset = String(target);
      arc.style.opacity = "1";
    });
    center.style.opacity = "1";
    if (centerVal) centerVal.textContent = "81";
    pills.forEach((p) => {
      p.style.opacity = "1";
    });
  };

  return createMockPlayer(
    async (ctx) => {
      for (let i = 0; i < arcs.length; i++) {
        const c = circ(radii[i] ?? 30);
        const target = c * (1 - (fills[i] ?? 0.7));
        await ctx.animate(
          arcs[i],
          { strokeDashoffset: target, opacity: 1 },
          { duration: 0.65, ease: DRAW },
        );
      }
      if (centerVal) {
        const score = { n: 0 };
        await Promise.all([
          ctx.animate(
            score,
            { n: 81 },
            {
              duration: 0.8,
              ease: OUT,
              onUpdate: () => {
                centerVal.textContent = String(Math.round(score.n));
              },
            },
          ),
          ctx.animate(center, { opacity: 1 }, { duration: 0.4, ease: OUT }),
        ]);
      } else {
        await ctx.animate(center, { opacity: 1 }, { duration: 0.4, ease: OUT });
      }
      for (const pill of pills) {
        await ctx.animate(pill, { opacity: 1 }, { duration: 0.25, ease: OUT });
      }
    },
    { reset, finish },
  );
}

export function MockScores({ delay }: { delay: number }) {
  const ref = useMockLoop(buildScores, delay);
  const pills = [
    { label: "GEO", v: "92", pos: "tl" },
    { label: "SEO", v: "88", pos: "tr" },
    { label: "Cite", v: "14", pos: "br" },
  ];

  return (
    <div ref={ref} className={styles.mock} data-mock="scores">
      <div className={styles.radarWrap}>
        <svg className={styles.radarSvg} viewBox="0 0 120 120" aria-hidden="true">
          <circle className={styles.radarTrack} cx="60" cy="60" r="42" />
          <circle className={styles.radarTrack} cx="60" cy="60" r="34" />
          <circle className={styles.radarTrack} cx="60" cy="60" r="26" />
          <circle
            data-arc
            className={styles.radarArc}
            data-tone="blue"
            cx="60"
            cy="60"
            r="42"
            transform="rotate(-90 60 60)"
          />
          <circle
            data-arc
            className={styles.radarArc}
            data-tone="blue-mid"
            cx="60"
            cy="60"
            r="34"
            transform="rotate(-90 60 60)"
          />
          <circle
            data-arc
            className={styles.radarArc}
            data-tone="blue-soft"
            cx="60"
            cy="60"
            r="26"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div data-center className={styles.radarCenter}>
          <b data-cv>0</b>
          <small>AI answers</small>
        </div>
        {pills.map((p) => (
          <span
            key={p.label}
            data-pill
            className={styles.radarPill}
            data-pos={p.pos}
          >
            <b>{p.v}</b>
            <small>{p.label}</small>
          </span>
        ))}
      </div>
    </div>
  );
}
