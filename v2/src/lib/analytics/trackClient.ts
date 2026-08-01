// Purpose: Browser product analytics helper (Vercel track + ClickHouse via API).
"use client";

import { track } from "@vercel/analytics";
import {
  isValidEventName,
  sanitizeProps,
  type AnalyticsEventName,
  type AnalyticsProps,
} from "./events";

const SESSION_KEY = "dali_analytics_sid";
const VISITOR_KEY = "dali_analytics_vid";
const SESSION_STARTED_KEY = "dali_analytics_session_started";

function randomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replace(/-/g, "");
  }
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
}

export function getVisitorId(): string {
  try {
    const existing = localStorage.getItem(VISITOR_KEY);
    if (existing && /^[a-zA-Z0-9_-]{8,64}$/.test(existing)) {
      return existing;
    }
    const id = randomId();
    localStorage.setItem(VISITOR_KEY, id);
    return id;
  } catch {
    return "";
  }
}

export function getSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing && /^[a-zA-Z0-9_-]{8,64}$/.test(existing)) {
      return existing;
    }
    const id = randomId();
    sessionStorage.setItem(SESSION_KEY, id);
    sessionStorage.removeItem(SESSION_STARTED_KEY);
    return id;
  } catch {
    return "";
  }
}

/** True once per browser tab session - used to emit session_start. */
export function consumeSessionStartFlag(): boolean {
  try {
    if (sessionStorage.getItem(SESSION_STARTED_KEY) === "1") {
      return false;
    }
    sessionStorage.setItem(SESSION_STARTED_KEY, "1");
    return true;
  } catch {
    return true;
  }
}

function currentPath(): string {
  if (typeof window === "undefined") return "";
  return `${window.location.pathname}${window.location.search}`.slice(0, 512);
}

function currentLocaleHint(): string {
  if (typeof document === "undefined") return "";
  return (document.documentElement.lang || "").slice(0, 16);
}

/**
 * Fire-and-forget product / session event.
 * Writes to Vercel Web Analytics (named events) and mirrors into ClickHouse.
 */
export function trackClientEvent(
  name: AnalyticsEventName,
  props?: AnalyticsProps,
  options?: {
    source?: string;
    path?: string;
    locale?: string;
    /** High-volume events skip Vercel custom events (quota / noise). */
    clickhouseOnly?: boolean;
  },
): void {
  if (!isValidEventName(name)) {
    console.error("[analytics] invalid event name", name);
    return;
  }

  const sessionId = getSessionId();
  const visitorId = getVisitorId();
  const path = options?.path ?? currentPath();
  const locale = options?.locale ?? currentLocaleHint();
  const source = options?.source;
  const cleanProps = sanitizeProps({
    ...props,
    ...(visitorId ? { visitor_id: visitorId } : {}),
    ...(source ? { source } : {}),
    ...(path ? { path: path.slice(0, 256) } : {}),
    ...(locale ? { locale } : {}),
  });

  if (!options?.clickhouseOnly) {
    try {
      track(name, cleanProps);
    } catch (error) {
      console.error(
        "[analytics/vercel]",
        error instanceof Error ? error.message : error,
      );
    }
  }

  try {
    const body = JSON.stringify({
      name,
      props: cleanProps,
      path,
      locale,
      source,
      sessionId,
      visitorId,
    });

    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([body], { type: "application/json" });
      const ok = navigator.sendBeacon("/api/analytics/event", blob);
      if (ok) return;
    }

    void fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      // swallow
    });
  } catch {
    // ignore
  }
}
