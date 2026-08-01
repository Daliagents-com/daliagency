"use client";

// Purpose: PostHog-lite session capture - pageviews, time-on-page heartbeats, clicks.
// Writes anonymous visitor/session ids + path context into ClickHouse via trackClientEvent.
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnalyticsEvent } from "@/lib/analytics/events";
import {
  consumeSessionStartFlag,
  trackClientEvent,
} from "@/lib/analytics/trackClient";

const HEARTBEAT_MS = 15_000;
const CLICK_THROTTLE_MS = 400;
const MAX_LABEL = 80;

function scrollPct(): number {
  const doc = document.documentElement;
  const scrollTop = window.scrollY || doc.scrollTop || 0;
  const height = doc.scrollHeight - window.innerHeight;
  if (height <= 0) return 100;
  return Math.max(0, Math.min(100, Math.round((scrollTop / height) * 100)));
}

function clickLabel(el: Element): string {
  const track = el.getAttribute("data-track") || el.getAttribute("data-cta");
  if (track) return track.slice(0, MAX_LABEL);

  const aria = el.getAttribute("aria-label");
  if (aria) return aria.slice(0, MAX_LABEL);

  const text = (el.textContent || "").replace(/\s+/g, " ").trim();
  if (text) return text.slice(0, MAX_LABEL);

  if (el instanceof HTMLAnchorElement && el.href) {
    return el.getAttribute("href")?.slice(0, MAX_LABEL) || "link";
  }

  return el.tagName.toLowerCase();
}

function isTrackableClick(target: EventTarget | null): Element | null {
  if (!(target instanceof Element)) return null;
  const el = target.closest(
    "a, button, [data-track], [data-cta], [role='button'], input[type='submit']",
  );
  return el;
}

/**
 * Mount once in root layout. Safe no-op on internal analytics pages.
 */
export default function ProductSessionAnalytics() {
  const pathname = usePathname() ?? "/";
  const lastPathRef = useRef<string>("");
  const lastClickAt = useRef(0);

  // Session start + page views on route change
  useEffect(() => {
    if (pathname.startsWith("/internal")) return;

    const path =
      typeof window !== "undefined"
        ? `${window.location.pathname}${window.location.search}`.slice(0, 512)
        : pathname;

    if (consumeSessionStartFlag()) {
      trackClientEvent(
        AnalyticsEvent.SessionStart,
        {
          entry_path: path,
          referrer: typeof document !== "undefined" ? document.referrer.slice(0, 256) : "",
          screen_w: typeof window !== "undefined" ? window.innerWidth : 0,
          screen_h: typeof window !== "undefined" ? window.innerHeight : 0,
        },
        { path, clickhouseOnly: true },
      );
    }

    if (lastPathRef.current === path) return;
    lastPathRef.current = path;

    trackClientEvent(
      AnalyticsEvent.PageView,
      {
        title:
          typeof document !== "undefined"
            ? document.title.slice(0, 120)
            : "",
        referrer:
          typeof document !== "undefined" ? document.referrer.slice(0, 256) : "",
      },
      { path, clickhouseOnly: false },
    );
  }, [pathname]);

  // Heartbeat: where they are + how long tab is open (visible only)
  useEffect(() => {
    if (pathname.startsWith("/internal")) return;

    const tick = () => {
      if (typeof document !== "undefined" && document.visibilityState !== "visible") {
        return;
      }
      const path =
        typeof window !== "undefined"
          ? `${window.location.pathname}${window.location.search}`.slice(0, 512)
          : pathname;

      trackClientEvent(
        AnalyticsEvent.SessionHeartbeat,
        {
          tick_s: Math.round(HEARTBEAT_MS / 1000),
          scroll_pct: scrollPct(),
          visible: 1,
        },
        { path, clickhouseOnly: true },
      );
    };

    const id = window.setInterval(tick, HEARTBEAT_MS);
    return () => window.clearInterval(id);
  }, [pathname]);

  // Clicks (links / buttons / marked CTAs)
  useEffect(() => {
    if (pathname.startsWith("/internal")) return;

    const onClick = (event: MouseEvent) => {
      const el = isTrackableClick(event.target);
      if (!el) return;

      const now = Date.now();
      if (now - lastClickAt.current < CLICK_THROTTLE_MS) return;
      lastClickAt.current = now;

      const path =
        typeof window !== "undefined"
          ? `${window.location.pathname}${window.location.search}`.slice(0, 512)
          : pathname;

      const href =
        el instanceof HTMLAnchorElement
          ? el.getAttribute("href")?.slice(0, 256) || ""
          : "";

      trackClientEvent(
        AnalyticsEvent.ElementClick,
        {
          tag: el.tagName.toLowerCase(),
          label: clickLabel(el),
          href,
          cta: el.getAttribute("data-cta")?.slice(0, 64) || "",
          track: el.getAttribute("data-track")?.slice(0, 64) || "",
          scroll_pct: scrollPct(),
        },
        {
          path,
          source: el.getAttribute("data-cta") || el.getAttribute("data-track") || undefined,
          clickhouseOnly: true,
        },
      );
    };

    document.addEventListener("click", onClick, { capture: true, passive: true });
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  return null;
}
