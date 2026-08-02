// Purpose: Browser product events via PostHog (+ optional Vercel custom events).
// Perf: posthog-js is dynamically imported - never static-linked into layout/CTA graph.
"use client";

import { track } from "@vercel/analytics";
import {
  sanitizeProps,
  type AnalyticsEventName,
  type AnalyticsProps,
} from "./events";

function currentPath(): string {
  if (typeof window === "undefined") return "";
  return `${window.location.pathname}${window.location.search}`.slice(0, 512);
}

/**
 * Fire-and-forget product event (consultation, CTA, etc.).
 * PostHog is primary; Vercel Web Analytics gets a light copy when available.
 */
export function trackClientEvent(
  name: AnalyticsEventName,
  props?: AnalyticsProps,
  options?: {
    source?: string;
    path?: string;
  },
): void {
  const path = options?.path ?? currentPath();
  const clean = sanitizeProps({
    ...props,
    ...(options?.source ? { source: options.source } : {}),
    ...(path ? { path: path.slice(0, 256) } : {}),
  });

  if (typeof window !== "undefined") {
    // Dynamic import keeps posthog-js out of the first-load shell.
    void import("posthog-js")
      .then(({ default: posthog }) => {
        posthog.capture(name, clean);
      })
      .catch((error) => {
        console.error(
          "[analytics/posthog]",
          error instanceof Error ? error.message : error,
        );
      });
  }

  try {
    track(name, clean);
  } catch {
    // Vercel analytics optional / local
  }
}
