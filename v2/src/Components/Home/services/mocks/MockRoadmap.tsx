// Purpose: Consulting checklist — start empty, fill blue checks in order.
"use client";

import {
  OUT,
  createMockPlayer,
  useMockLoop,
  type MockPlayer,
} from "../motionShared";
import styles from "../../DesignSprints.module.css";

function buildRoadmap(root: HTMLElement): MockPlayer | null {
  const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-row]"));
  const boxes = Array.from(root.querySelectorAll<HTMLElement>("[data-box]"));
  const marks = Array.from(root.querySelectorAll<SVGPathElement>("[data-mark]"));
  const status = root.querySelector<HTMLElement>("[data-st]");
  if (!rows.length || !status) return null;

  const reset = () => {
    marks.forEach((m) => {
      m.style.opacity = "0";
      m.style.stroke = "#FFFFFF";
    });
    boxes.forEach((b) => {
      b.style.borderColor = "rgba(255,255,255,0.14)";
      b.style.backgroundColor = "transparent";
      b.style.transform = "none";
    });
    rows.forEach((row) => {
      row.style.opacity = "0.4";
      row.style.transform = "none";
    });
    status.textContent = "In progress";
    status.style.color = "rgba(255,255,255,0.38)";
  };

  const finish = () => {
    marks.forEach((m) => {
      m.style.opacity = "1";
      m.style.stroke = "#FFFFFF";
    });
    boxes.forEach((b) => {
      b.style.borderColor = "#1E3A8A";
      b.style.backgroundColor = "#1E3A8A";
      b.style.transform = "none";
    });
    rows.forEach((row) => {
      row.style.opacity = "1";
      row.style.transform = "none";
    });
    status.textContent = "Ready";
    status.style.color = "#F0F0F2";
  };

  return createMockPlayer(
    async (ctx) => {
      for (let i = 0; i < rows.length; i++) {
        await ctx.animate(rows[i], { opacity: 1 }, { duration: 0.3, ease: OUT });
        if (boxes[i]) {
          boxes[i].style.borderColor = "#1E3A8A";
          boxes[i].style.backgroundColor = "#1E3A8A";
        }
        if (marks[i]) marks[i].style.opacity = "1";
        await ctx.sleep(0.2);
      }
      status.textContent = "Ready";
      status.style.color = "#F0F0F2";
    },
    { reset, finish },
  );
}

export function MockRoadmap({ delay }: { delay: number }) {
  const ref = useMockLoop(buildRoadmap, delay);
  const rows = ["Discover", "Design", "Train"];

  return (
    <div ref={ref} className={styles.mock} data-mock="roadmap">
      <div className={styles.roadmap}>
        <div className={styles.roadmapMeta}>
          <span data-st className={styles.roadmapStatus}>
            In progress
          </span>
        </div>
        <ul className={styles.pageList}>
          {rows.map((label) => (
            <li key={label} data-row>
              <span data-box className={styles.pageCheck}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    data-mark
                    d="M2 5.2l2 2 4-4.2"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
