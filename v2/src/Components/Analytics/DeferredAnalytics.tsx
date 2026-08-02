"use client";

// Purpose: Client-only deferred analytics mount (layout cannot use dynamic ssr:false).
// Perf: wait for idle / first interaction so PostHog recorder doesn't compete with LCP.

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const FunnelAnalytics = dynamic(
  () => import("@/Components/Analytics/FunnelAnalytics"),
  { ssr: false },
);

const PostHogProvider = dynamic(
  () => import("@/Components/Analytics/PostHogProvider"),
  { ssr: false },
);

export default function DeferredAnalytics({
  enableVercelFunnel = false,
}: {
  enableVercelFunnel?: boolean;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const enable = () => {
      if (!cancelled) setReady(true);
    };

    // Prefer idle; hard cap so analytics still lands for short sessions.
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 4000 });
    } else {
      timeoutId = setTimeout(enable, 2500);
    }

    // Or first real user signal. No "scroll": on mobile it fires instantly
    // and PostHog would compete with the LCP window.
    const opts = { once: true, passive: true } as const;
    window.addEventListener("pointerdown", enable, opts);
    window.addEventListener("keydown", enable, opts);

    return () => {
      cancelled = true;
      if (idleId != null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) clearTimeout(timeoutId);
      window.removeEventListener("pointerdown", enable);
      window.removeEventListener("keydown", enable);
    };
  }, []);

  if (!ready) return null;

  return (
    <PostHogProvider>
      {enableVercelFunnel ? <FunnelAnalytics /> : null}
    </PostHogProvider>
  );
}
