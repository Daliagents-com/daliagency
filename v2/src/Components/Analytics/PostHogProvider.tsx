"use client";

// Purpose: Init PostHog with pageviews + session replay for the public site.
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";

function getKey(): string {
  return (process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "").trim();
}

function getHost(): string {
  return (
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com"
  ).trim();
}

let posthogInitialized = false;

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastUrl = useRef("");

  useEffect(() => {
    if (!getKey()) return;
    if (!pathname) return;

    const url =
      typeof window !== "undefined"
        ? window.location.href
        : `${pathname}${searchParams?.toString() ? `?${searchParams}` : ""}`;

    if (lastUrl.current === url) return;
    lastUrl.current = url;

    posthog.capture("$pageview", {
      $current_url: url,
    });
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogProvider({ children }: { children?: ReactNode }) {
  const key = getKey();
  // Child effects run before parent effects, so PostHogPageView must not mount
  // until init has run - pre-init capture calls are silently dropped.
  const [initialized, setInitialized] = useState(posthogInitialized);

  useEffect(() => {
    if (!key) return;
    if (posthogInitialized) {
      setInitialized(true);
      return;
    }
    posthogInitialized = true;

    posthog.init(key, {
      api_host: getHost(),
      person_profiles: "identified_only",
      capture_pageview: false, // App Router: manual $pageview
      capture_pageleave: true,
      autocapture: true,
      persistence: "localStorage+cookie",
      // Perf: surveys bundle (~170KB gz with replay) never loads on the public site.
      disable_surveys: true,
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: "[data-ph-mask], input, textarea",
      },
      loaded: (ph) => {
        if (process.env.NODE_ENV === "development") {
          ph.debug(false);
        }
      },
    });
    setInitialized(true);
  }, [key]);

  if (!key) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      {initialized ? (
        <Suspense fallback={null}>
          <PostHogPageView />
        </Suspense>
      ) : null}
      {children}
    </PHProvider>
  );
}
