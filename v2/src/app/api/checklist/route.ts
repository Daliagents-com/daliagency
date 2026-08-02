// Purpose: Accept lead-magnet requests (vibe-code checklist pack) on-site.
// Delivery: notify studio inbox via webhook / Resend / FormSubmit cascade;
// email the pack to the lead when Resend + a verified sender are configured.
import { NextResponse } from "next/server";
import { daliContactEmail } from "@/lib/contact";
import {
  formatChecklistDelivery,
  formatChecklistNotification,
  validateChecklistPayload,
  type ChecklistRequestPayload,
} from "@/lib/checklist";
import { AnalyticsEvent } from "@/lib/analytics/events";
import { trackServerEvent } from "@/lib/analytics/trackServer";

export const runtime = "nodejs";

// Channels fall through on failure - mirrors /api/consultation: a broken
// channel must never cost a captured email.
async function notifyStudio(payload: ChecklistRequestPayload) {
  const mail = formatChecklistNotification(payload);
  const webhook = process.env.CONSULTATION_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          subject: mail.subject,
          text: mail.text,
          to: daliContactEmail,
        }),
      });
      if (!res.ok) throw new Error(`Webhook failed: ${res.status}`);
      return "webhook" as const;
    } catch (error) {
      console.error("[checklist] webhook channel failed", error);
    }
  }

  if (resendKey) {
    try {
      const from =
        process.env.CONSULTATION_FROM_EMAIL ?? "Dali <onboarding@resend.dev>";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [daliContactEmail],
          reply_to: payload.email,
          subject: mail.subject,
          text: mail.text,
        }),
      });
      if (!res.ok) {
        const detail = await res.text();
        throw new Error(`Resend failed: ${res.status} ${detail}`);
      }
      return "resend" as const;
    } catch (error) {
      console.error("[checklist] resend channel failed", error);
    }
  }

  // Last-resort path, mirrors /api/consultation.
  const res = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(daliContactEmail)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        source: payload.source ?? "",
        locale: payload.locale ?? "en",
        _subject: mail.subject,
        _template: "table",
        _captcha: "false",
      }),
    },
  );

  if (!res.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[checklist] accepted (dev fallback)", mail);
      return "dev" as const;
    }
    const detail = await res.text();
    throw new Error(`Form delivery failed: ${res.status} ${detail}`);
  }

  return "formsubmit" as const;
}

// Success UX never depends on this: links render on-site immediately.
async function sendPackToLead(payload: ChecklistRequestPayload) {
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.CONSULTATION_FROM_EMAIL;
  if (!resendKey || !from) return "skipped" as const;

  try {
    const mail = formatChecklistDelivery(payload);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [payload.email],
        reply_to: daliContactEmail,
        subject: mail.subject,
        text: mail.text,
      }),
    });
    if (!res.ok) {
      console.error("[checklist] delivery email failed", res.status);
      return "failed" as const;
    }
    return "sent" as const;
  } catch (error) {
    console.error("[checklist] delivery email error", error);
    return "failed" as const;
  }
}

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const parsed = validateChecklistPayload(raw);
    if (!parsed.ok) {
      return NextResponse.json(
        { ok: false, error: parsed.error },
        { status: 400 },
      );
    }

    const channel = await notifyStudio(parsed.data);
    const delivery = await sendPackToLead(parsed.data);

    // Funnel event only - no PII.
    await trackServerEvent({
      name: AnalyticsEvent.ChecklistRequest,
      path: request.headers.get("referer") ?? "",
      locale: parsed.data.locale,
      source: parsed.data.source,
      props: {
        channel,
        delivery,
      },
    });

    return NextResponse.json({ ok: true, channel });
  } catch (error) {
    console.error("[checklist]", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to send right now. Please try again in a moment.",
      },
      { status: 502 },
    );
  }
}
