// Purpose: Linked engagement card. Hover/focus replays the supporting mock.
"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { syneText } from "@/assets/fonts";
import type { MockHost } from "./motionShared";
import styles from "../DesignSprints.module.css";

export function Card({
  slot,
  title,
  price,
  description,
  href,
  cta,
  children,
}: {
  slot: string;
  title: string;
  price: string;
  description: string;
  href: string;
  cta: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);

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

  const setHover = (hovered: boolean) => {
    if (ref.current) ref.current.dataset.hover = String(hovered);
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={styles.card}
      data-slot={slot}
      aria-label={`${title}. ${price}. ${cta}.`}
      onMouseEnter={() => {
        setHover(true);
        if (canHoverReplay) replay();
      }}
      onMouseLeave={() => setHover(false)}
      onFocus={() => {
        setHover(true);
        replay();
      }}
      onBlur={() => setHover(false)}
    >
      <div className={styles.visual}>{children}</div>
      <div className={styles.copy}>
        <p className={styles.cardPrice}>{price}</p>
        <div className={styles.cardTitleRow}>
          <h3 className={`${syneText.className} ${styles.cardTitle}`}>
            {title}
          </h3>
          <span className={styles.cardArrow} aria-hidden="true">
            ↗
          </span>
        </div>
        <p className={styles.cardDesc}>{description}</p>
        <span className={styles.cardCta}>{cta}</span>
      </div>
    </Link>
  );
}
