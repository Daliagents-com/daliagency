// Purpose: Shared event names and payload shape for Vercel + ClickHouse analytics.
// Scope: Product + session behavior events - no PII (no email/name/message body).

export const AnalyticsEvent = {
  // Funnel
  ConsultationOpen: "consultation_open",
  ConsultationSubmit: "consultation_submit",
  ConsultationError: "consultation_error",
  CtaClick: "cta_click",
  PageSectionView: "page_section_view",
  // Session / behavior (PostHog-lite)
  PageView: "page_view",
  SessionStart: "session_start",
  SessionHeartbeat: "session_heartbeat",
  ElementClick: "element_click",
} as const;

export type AnalyticsEventName =
  | (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent]
  | (string & {});

/** Scalar props only - Vercel Analytics and our API both reject nested objects. */
export type AnalyticsProps = Record<
  string,
  string | number | boolean | null | undefined
>;

export type AnalyticsEventInput = {
  name: AnalyticsEventName;
  props?: AnalyticsProps;
  /** Client path when known; server may fill from referer. */
  path?: string;
  locale?: string;
  source?: string;
  sessionId?: string;
  visitorId?: string;
};

export const MAX_EVENT_NAME_LENGTH = 64;
export const MAX_PROP_KEYS = 24;
export const MAX_PROP_STRING_LENGTH = 256;
export const MAX_SESSION_ID_LENGTH = 64;

const eventNamePattern = /^[a-z][a-z0-9_]{1,63}$/;

export function isValidEventName(name: string): boolean {
  return eventNamePattern.test(name) && name.length <= MAX_EVENT_NAME_LENGTH;
}

export function sanitizeProps(
  props: AnalyticsProps | undefined,
): Record<string, string | number | boolean> {
  if (!props) return {};

  const out: Record<string, string | number | boolean> = {};
  let count = 0;

  for (const [key, value] of Object.entries(props)) {
    if (count >= MAX_PROP_KEYS) break;
    if (value === null || value === undefined) continue;
    if (!/^[a-zA-Z_][a-zA-Z0-9_]{0,31}$/.test(key)) continue;

    if (typeof value === "string") {
      out[key] = value.slice(0, MAX_PROP_STRING_LENGTH);
      count += 1;
      continue;
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      out[key] = value;
      count += 1;
      continue;
    }

    if (typeof value === "boolean") {
      out[key] = value;
      count += 1;
    }
  }

  return out;
}

export function sanitizeSessionId(sessionId: string | undefined): string {
  if (!sessionId) return "";
  const trimmed = sessionId.trim().slice(0, MAX_SESSION_ID_LENGTH);
  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) return "";
  return trimmed;
}

export function sanitizeVisitorId(visitorId: string | undefined): string {
  return sanitizeSessionId(visitorId);
}
