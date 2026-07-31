// Purpose: Services bento pipeline — Read → Decide → Act (brand blue).
// Always starts at stage 0; restart-safe.
"use client";

import {
  MOVE,
  OUT,
  createMockPlayer,
  useMockLoop,
  type MockPlayer,
  type PlayContext,
} from "../motionShared";
import styles from "../../DesignSprints.module.css";

const BLUE = "#1E3A8A";
const BLUE_SOFT = "rgba(30, 58, 138, 0.35)";
const BLUE_BORDER = "rgba(30, 58, 138, 0.75)";
const WHITE = "#F0F0F2";
const MUTED = "rgba(240, 240, 242, 0.35)";
const CARD = "rgba(20, 20, 24, 0.98)";

const STAGES = [
  {
    left: "6%",
    title: "Lead #482",
    meta: "CRM · 2m",
    border: "rgba(255,255,255,0.14)",
    bg: CARD,
  },
  {
    left: "36%",
    title: "Qualify",
    meta: "Rules · tools",
    border: BLUE_BORDER,
    bg: "rgba(30, 58, 138, 0.22)",
  },
  {
    left: "66%",
    title: "Reply sent",
    meta: "Done",
    border: BLUE,
    bg: "rgba(30, 58, 138, 0.35)",
  },
] as const;

function buildPipeline(root: HTMLElement): MockPlayer | null {
  const ticket = root.querySelector<HTMLElement>("[data-ticket]");
  const heads = Array.from(root.querySelectorAll<HTMLElement>("[data-head]"));
  const lanes = Array.from(root.querySelectorAll<HTMLElement>("[data-lane]"));
  if (!ticket || heads.length < 3) return null;

  const titleEl = ticket.querySelector<HTMLElement>("[data-tt]");
  const metaEl = ticket.querySelector<HTMLElement>("[data-tm]");

  const paintStage = (i: number) => {
    const s = STAGES[i];
    ticket.style.left = s.left;
    ticket.style.borderColor = s.border;
    ticket.style.backgroundColor = s.bg;
    ticket.style.opacity = "1";
    ticket.style.transform = "none";
    if (titleEl) {
      titleEl.textContent = s.title;
      titleEl.style.opacity = "1";
      titleEl.style.color = WHITE;
    }
    if (metaEl) {
      metaEl.textContent = s.meta;
      metaEl.style.opacity = "1";
      metaEl.style.color = MUTED;
    }
    heads.forEach((h, idx) => {
      const on = idx === i;
      h.style.opacity = on ? "1" : "0.35";
      h.style.color = on ? WHITE : MUTED;
    });
    lanes.forEach((lane, idx) => {
      const on = idx === i;
      lane.style.borderColor = on ? BLUE_BORDER : "rgba(255,255,255,0.06)";
      lane.style.backgroundColor = on ? BLUE_SOFT : "rgba(255,255,255,0.02)";
    });
  };

  const goTo = async (i: number, ctx: PlayContext) => {
    const s = STAGES[i];
    await ctx.animate(ticket, { left: s.left }, { duration: 0.7, ease: MOVE });
    await Promise.all([
      ...heads.map((h, idx) => {
        const on = idx === i;
        return ctx.animate(
          h,
          { opacity: on ? 1 : 0.35, color: on ? WHITE : MUTED },
          { duration: 0.28, ease: OUT },
        );
      }),
      ...lanes.map((lane, idx) => {
        const on = idx === i;
        return ctx.animate(
          lane,
          {
            borderColor: on ? BLUE_BORDER : "rgba(255,255,255,0.06)",
            backgroundColor: on ? BLUE_SOFT : "rgba(255,255,255,0.02)",
          },
          { duration: 0.28, ease: OUT },
        );
      }),
    ]);
    ticket.style.borderColor = s.border;
    ticket.style.backgroundColor = s.bg;
    if (titleEl) titleEl.textContent = s.title;
    if (metaEl) metaEl.textContent = s.meta;
    await ctx.sleep(0.4);
  };

  return createMockPlayer(
    async (ctx) => {
      // reset() already painted stage 0
      await ctx.sleep(0.4);
      await goTo(1, ctx);
      await goTo(2, ctx);
      await ctx.sleep(0.25);
    },
    {
      reset: () => paintStage(0),
      finish: () => paintStage(2),
    },
  );
}

export function MockPipeline({ delay }: { delay: number }) {
  const ref = useMockLoop(buildPipeline, delay);
  const cols = ["Read", "Decide", "Act"] as const;

  return (
    <div ref={ref} className={styles.mock} data-mock="pipeline">
      <div data-track className={styles.pipeline}>
        {cols.map((label) => (
          <div key={label} data-col className={styles.pipeCol}>
            <span data-head className={styles.pipeHead}>
              {label}
            </span>
            <div data-lane className={styles.pipeLane} />
          </div>
        ))}
        <div data-ticket className={styles.ticket}>
          <strong data-tt>Lead #482</strong>
          <span data-tm>CRM · 2m</span>
        </div>
      </div>
    </div>
  );
}
