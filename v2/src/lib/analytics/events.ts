// Purpose: Shared product event names for PostHog (and optional Vercel track).
// Scope: Funnel + product events only - no PII (no email/name/message body).

export const AnalyticsEvent = {
  ConsultationOpen: "consultation_open",
  ConsultationSubmit: "consultation_submit",
  ConsultationError: "consultation_error",
  ConsultationBooked: "consultation_booked",
  ChecklistRequest: "checklist_request",
  CtaClick: "cta_click",
  PageSectionView: "page_section_view",
} as const;

export type AnalyticsEventName =
  | (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent]
  | (string & {});

/** Scalar props only - PostHog accepts richer objects; keep simple for parity. */
export type AnalyticsProps = Record<
  string,
  string | number | boolean | null | undefined
>;

export function sanitizeProps(
  props: AnalyticsProps | undefined,
): Record<string, string | number | boolean> {
  if (!props) return {};

  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined) continue;
    if (!/^[a-zA-Z_][a-zA-Z0-9_]{0,47}$/.test(key)) continue;
    if (typeof value === "string") {
      out[key] = value.slice(0, 500);
      continue;
    }
    if (typeof value === "number" && Number.isFinite(value)) {
      out[key] = value;
      continue;
    }
    if (typeof value === "boolean") {
      out[key] = value;
    }
  }
  return out;
}
