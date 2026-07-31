// Purpose: Accept on-site consultation form submissions without leaving the site.
// Delivery: webhook / Resend if configured, else FormSubmit AJAX to dali inbox.
import { NextResponse } from "next/server";
import {
  daliContactEmail,
  formatConsultationEmail,
  validateConsultationPayload,
} from "@/lib/consultation";

export const runtime = "nodejs";

async function deliverLead(payload: {
  name: string;
  email: string;
  company?: string;
  interest: string;
  message: string;
  locale?: string;
  source?: string;
}) {
  const mail = formatConsultationEmail(payload);
  const webhook = process.env.CONSULTATION_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;

  if (webhook) {
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
    if (!res.ok) {
      throw new Error(`Webhook failed: ${res.status}`);
    }
    return "webhook" as const;
  }

  if (resendKey) {
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
  }

  // Zero-config path: FormSubmit (first submission may require inbox confirmation).
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

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const parsed = validateConsultationPayload(raw);
    if (!parsed.ok) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
    }

    const channel = await deliverLead(parsed.data);
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
