// Purpose: Shared shell primitives for AgentUxPreview product mocks.
"use client";

import { useEffect, useState, type ReactNode } from "react";
import { sansText } from "@/assets/fonts";
import { useReducedMotion } from "framer-motion";
import styles from "../AgentUxPreview.module.css";
import type { AgentUxKind } from "./copy";

export function clip(value: string, max = 88) {
  if (value.length <= max) return value;
  return `${value.slice(0, max).trimEnd()}…`;
}

export function Tag({
  children,
  tone = "neutral",
}: {
  children: string;
  tone?: "neutral" | "blue" | "green" | "amber";
}) {
  const toneClass =
    tone === "blue"
      ? styles.tagBlue
      : tone === "green"
        ? styles.tagGreen
        : tone === "amber"
          ? styles.tagAmber
          : styles.tagNeutral;

  return <span className={`${styles.tag} ${toneClass}`}>{children}</span>;
}

export function Shell({
  children,
  kind,
  loop = false,
}: {
  children: ReactNode;
  kind: AgentUxKind;
  loop?: boolean;
}) {
  return (
    <div
      className={`${styles.shell} ${sansText.className}`}
      data-agent-ux={kind}
      data-loop={loop ? "true" : "false"}
    >
      {children}
    </div>
  );
}

export function useLiveStage(live: boolean, steps: number, stepMs = 1300) {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!live || reduce || steps < 2) {
      setStage(Math.max(0, steps - 1));
      return;
    }
    setStage(0);
    const id = window.setInterval(() => {
      setStage((s) => (s + 1) % steps);
    }, stepMs);
    return () => window.clearInterval(id);
  }, [live, reduce, steps, stepMs]);

  return stage;
}

/** Minimal product toolbar: title + optional primary action. Search/crumb optional. */
export function Toolbar({
  crumb,
  title,
  search,
  actions,
}: {
  crumb?: string;
  title: string;
  search?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarLeft}>
        {crumb ? <span className={styles.crumb}>{crumb}</span> : null}
        <strong className={styles.pageTitle}>{title}</strong>
      </div>
      <div className={styles.toolbarRight}>
        {search ? (
          <div className={styles.search}>
            <span aria-hidden="true">⌕</span>
            <b>{search}</b>
          </div>
        ) : null}
        {actions}
      </div>
    </div>
  );
}
