// Purpose: Services bento card — hover/click restarts mock animation.
"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";
import { syneText } from "@/assets/fonts";
import type { MockHost } from "./motionShared";
import styles from "../DesignSprints.module.css";

export function Card({
  slot,
  title,
  description,
  children,
}: {
  slot: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);

  const replay = () => {
    const el = ref.current;
    if (!el) return;
    const host = el.querySelector<MockHost>("[data-mock]");
    if (!host) return;
    const tl = host.__tl;
    if (!tl) {
      console.warn("[services-card] no player on", host.dataset.mock);
      return;
    }
    if (host.dataset.play === "static") return;
    host.dataset.played = "true";
    host.dataset.play = "true";
    tl.timeScale(1);
    tl.restart();
  };

  const canHoverReplay =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={styles.card}
      data-slot={slot}
      role="button"
      tabIndex={0}
      aria-label={`${title}. Plays when visible; hover or click to replay.`}
      onMouseEnter={() => {
        const el = ref.current;
        if (el) el.dataset.hover = "true";
        if (canHoverReplay) replay();
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (el) el.dataset.hover = "false";
      }}
      onClick={replay}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          replay();
        }
      }}
    >
      <div className={styles.visual}>{children}</div>
      <div className={styles.copy}>
        <h3 className={`${syneText.className} ${styles.cardTitle}`}>{title}</h3>
        <p className={styles.cardDesc}>{description}</p>
      </div>
    </article>
  );
}
