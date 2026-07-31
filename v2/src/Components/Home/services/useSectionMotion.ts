// Purpose: Services section enter motion (intro + cards).
// Scope: DesignSprints shell only.
// Engine: CSS classes + IntersectionObserver. No GSAP on shell enter.
// Contract: content is always visible (opacity never animated from 0).
"use client";

import { useEffect } from "react";

/**
 * Marks shell with data-entered when in view so CSS can soft-rise cards.
 * First paint stays fully readable without waiting for JS.
 */
export function useSectionMotion(shellRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      shell.dataset.entered = "true";
      return;
    }

    // Soft rise via CSS; still fully opaque.
    shell.dataset.entered = "false";

    let played = false;
    const enter = () => {
      if (played) return;
      played = true;
      shell.dataset.entered = "true";
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          enter();
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "80px 0px" },
    );
    io.observe(shell);

    const failsafe = window.setTimeout(enter, 1200);

    return () => {
      io.disconnect();
      clearTimeout(failsafe);
      shell.dataset.entered = "true";
    };
  }, [shellRef]);
}
