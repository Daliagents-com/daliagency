// Purpose: Accept on-site consultation form submissions without leaving the site.
// Delivery: webhook / Resend if configured, else FormSubmit AJAX to dali inbox.
import { NextResponse } from "next/server";
import {
  daliContactEmail,
  formatConsultationAutoReply,
  formatConsultationEmail,
  validateConsultationPayload,
  type ConsultationPayload,
} from "@/lib/consultation";
import { AnalyticsEvent } from "@/lib/analytics/events";
import { trackServerEvent } from "@/lib/analytics/trackServer";

export const runtime = "nodejs";

// Channels fall through on failure - a broken or misconfigured channel must
// never cost a lead (e.g. Resend key without a verified sender rejects sends
// to anyone but the account owner; that lead still has to reach the inbox).
async function deliverLead(payload: ConsultationPayload) {
  const mail = formatConsultationEmail(payload);
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
      console.error("[consultation] webhook channel failed", error);
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
      console.error("[consultation] resend channel failed", error);
    }
  }

  // Last-resort path: FormSubmit (first submission may require inbox confirmation).
  const res = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(daliContactEmail)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        company: payload.company ?? "",
        interest: payload.interest,
        message: payload.message,
        source: payload.source ?? "",
        locale: payload.locale ?? "en",
        _subject: mail.subject,
        _template: "table",
        _captcha: "false",
      }),
    },
  );

  if (!res.ok) {
    // Dev / offline fallback: accept lead so UX never dumps users to another site.
    if (process.env.NODE_ENV !== "production") {
      console.info("[consultation] accepted (dev fallback)", mail);
      return "dev" as const;
    }
    const detail = await res.text();
    throw new Error(`Form delivery failed: ${res.status} ${detail}`);
  }

  return "formsubmit" as const;
}

// Confirmation to the lead with 3 intake questions. Requires Resend plus a
// CONSULTATION_FROM_EMAIL on a verified domain (the resend.dev default can
// only deliver to the account owner). Failure never blocks the lead.
async function sendAutoReply(payload: ConsultationPayload) {
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.CONSULTATION_FROM_EMAIL;
  if (!resendKey || !from) return "skipped" as const;

  try {
    const mail = formatConsultationAutoReply(payload);
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
      console.error("[consultation] auto-reply failed", res.status);
      return "failed" as const;
    }
    return "sent" as const;
  } catch (error) {
    console.error("[consultation] auto-reply error", error);
    return "failed" as const;
  }
}

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const parsed = validateConsultationPayload(raw);
    if (!parsed.ok) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
    }

    const channel = await deliverLead(parsed.data);
    const autoReply = await sendAutoReply(parsed.data);

    // Conversion event: no PII - only funnel dims (interest, source, locale, channel).
    await trackServerEvent({
      name: AnalyticsEvent.ConsultationSubmit,
      path: request.headers.get("referer") ?? "",
      locale: parsed.data.locale,
      source: parsed.data.source,
      props: {
        interest: parsed.data.interest,
        channel,
        auto_reply: autoReply,
      },
    });

    return NextResponse.json({ ok: true, channel });
  } catch (error) {
    console.error("[consultation]", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to send right now. Please try again in a moment.",
      },
      { status: 502 },
    );
  }
}
