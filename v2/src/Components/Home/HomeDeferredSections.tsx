// Purpose: Defer heavy home sections (services) off first-load JS.
// Scope: Client-only mount after idle or near-viewport. Placeholder ids keep anchors.
// AgentSolutions moved to eager SSR in page.tsx (position 01 sells the offer).
"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { Locale } from "@/i18n/config";

const DesignSprints = dynamic(
  () => import("@/Components/Home/DesignSprints"),
  { ssr: false },
);

type HomeDeferredSectionsProps = {
  locale?: Locale;
};

export default function HomeDeferredSections({
  locale = "en",
}: HomeDeferredSectionsProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let io: IntersectionObserver | undefined;

    const enable = () => {
      if (cancelled) return;
      setReady(true);
      io?.disconnect();
      if (idleId != null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) clearTimeout(timeoutId);
    };

    // Near-viewport (user scrolling toward sections).
    if (typeof IntersectionObserver !== "undefined" && anchorRef.current) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) enable();
        },
        { rootMargin: "480px 0px" },
      );
      io.observe(anchorRef.current);
    }

    // Idle / fallback so mid-session and crawlers still get the trees.
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(() => enable(), { timeout: 2200 });
    } else {
      timeoutId = setTimeout(enable, 1200);
    }

    return () => {
      cancelled = true;
      io?.disconnect();
      if (idleId != null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) clearTimeout(timeoutId);
    };
  }, [ready]);

  if (!ready) {
    return (
      <div ref={anchorRef}>
        {/* Anchor target for nav / hash while the chunk is deferred. */}
        <section
          id="services"
          className="relative min-h-[70vh]"
          aria-hidden="true"
        />
      </div>
    );
  }

  return <DesignSprints locale={locale} />;
}
