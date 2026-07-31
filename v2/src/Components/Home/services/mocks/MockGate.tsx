// Purpose: Production controls — Request → Approve → Unlock (brand blue).
"use client";

import {
  IN_OUT,
  OUT,
  createMockPlayer,
  useMockLoop,
  type MockPlayer,
} from "../motionShared";
import styles from "../../DesignSprints.module.css";

const BLUE = "#1E3A8A";
const BLUE_SOFT = "rgba(30, 58, 138, 0.28)";
const BLUE_BORDER = "rgba(30, 58, 138, 0.7)";
const IDLE_BORDER = "rgba(255,255,255,0.08)";
const IDLE_BG = "rgba(255,255,255,0.025)";

function buildGate(root: HTMLElement): MockPlayer | null {
  const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
  const fills = Array.from(root.querySelectorAll<HTMLElement>("[data-fill]"));
  const check = root.querySelector<HTMLElement>("[data-check]");
  if (steps.length < 3) return null;

  const setActive = (active: number) => {
    steps.forEach((s, i) => {
      const on = i === active;
      const done = i < active;
      s.dataset.state = done ? "done" : on ? "active" : "idle";
      s.style.opacity = done || on ? "1" : "0.45";
      s.style.borderColor = done || on ? BLUE_BORDER : IDLE_BORDER;
      s.style.backgroundColor = done || on ? BLUE_SOFT : IDLE_BG;
      s.style.transform = "none";
    });
    fills.forEach((f, i) => {
      f.style.transform = i < active ? "scaleX(1)" : "scaleX(0)";
      f.style.transformOrigin = "left center";
      f.style.backgroundColor = BLUE;
    });
    if (check) check.style.opacity = active >= 1 ? "1" : "0";
  };

  const reset = () => {
    fills.forEach((f) => {
      f.style.transform = "scaleX(0)";
      f.style.transformOrigin = "left center";
      f.style.backgroundColor = BLUE;
    });
    if (check) check.style.opacity = "0";
    setActive(0);
  };

  const finish = () => {
    fills.forEach((f) => {
      f.style.transform = "scaleX(1)";
      f.style.transformOrigin = "left center";
      f.style.backgroundColor = BLUE;
    });
    if (check) check.style.opacity = "1";
    steps.forEach((s) => {
      s.dataset.state = "done";
      s.style.opacity = "1";
      s.style.borderColor = BLUE_BORDER;
      s.style.backgroundColor = BLUE_SOFT;
      s.style.transform = "none";
    });
  };

  return createMockPlayer(
    async (ctx) => {
      await ctx.sleep(0.3);
      setActive(1);
      if (fills[0]) {
        await ctx.animate(
          fills[0],
          { scaleX: 1 },
          { duration: 0.5, ease: IN_OUT },
        );
      }
      if (check) {
        await ctx.animate(check, { opacity: 1 }, { duration: 0.25, ease: OUT });
      }
      await ctx.sleep(0.35);
      setActive(2);
      if (fills[1]) {
        await ctx.animate(
          fills[1],
          { scaleX: 1 },
          { duration: 0.5, ease: IN_OUT },
        );
      }
      await ctx.sleep(0.35);
      finish();
    },
    { reset, finish },
  );
}

export function MockGate({ delay }: { delay: number }) {
  const ref = useMockLoop(buildGate, delay);

  return (
    <div ref={ref} className={styles.mock} data-mock="gate">
      <div className={styles.ctrlTrack}>
        <div data-step className={styles.ctrlStep} data-state="idle">
          <span className={styles.ctrlNum}>01</span>
          <div className={styles.ctrlCopy}>
            <strong>Request</strong>
            <small>Agent drafts reply</small>
          </div>
        </div>

        <div className={styles.ctrlLink} aria-hidden="true">
          <i data-fill />
        </div>

        <div data-step className={styles.ctrlStep} data-state="idle">
          <span className={styles.ctrlCheck} data-check aria-hidden="true">
            ✓
          </span>
          <div className={styles.ctrlCopy}>
            <strong>Approve</strong>
            <small>Human review</small>
          </div>
        </div>

        <div className={styles.ctrlLink} aria-hidden="true">
          <i data-fill />
        </div>

        <div data-step className={styles.ctrlStep} data-state="idle">
          <span className={styles.ctrlNum}>03</span>
          <div className={styles.ctrlCopy}>
            <strong>Unlock</strong>
            <small>Gmail · HubSpot · Slack</small>
          </div>
        </div>
      </div>
    </div>
  );
}
