// Purpose: Lead magnet - vibe-code checklist pack gated behind an email.
// Scope: Types, validation, copy, and email formatting. Delivery lives in the API route.
import type { Locale } from "@/i18n/config";

export type ChecklistRequestPayload = {
  email: string;
  locale?: Locale;
  source?: string;
};

// The pack: existing published checklist posts (EN slugs, localized via path prefix).
export const checklistPackSlugs = [
  "vibe-coded-site-hardening-checklist",
  "security-audit-for-vibe-coded-websites",
  "from-vibe-prototype-to-production-checklist",
  "ai-agent-security-checklist-for-buyers",
] as const;

export type ChecklistMagnetCopy = {
  title: string;
  body: string;
  emailLabel: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  error: string;
};

export const checklistMagnetCopy: Record<Locale, ChecklistMagnetCopy> = {
  en: {
    title: "Get the vibe-code hardening pack",
    body: "Four checklists we use on real rescues: site hardening, security audit, prototype-to-production, and the buyer's agent-security list.",
    emailLabel: "Work email",
    submit: "Send me the pack",
    submitting: "Sending...",
    successTitle: "Here is your pack",
    successBody: "Links below are live now; a copy is on its way to your inbox.",
    error: "Could not send right now. Try again in a moment.",
  },
  ru: {
    title: "Пакет чек-листов по vibe-code hardening",
    body: "Четыре чек-листа с реальных rescue-проектов: hardening сайта, security-аудит, из прототипа в продакшен и agent-security для заказчика.",
    emailLabel: "Рабочий email",
    submit: "Прислать пакет",
    submitting: "Отправляем...",
    successTitle: "Ваш пакет готов",
    successBody: "Ссылки ниже уже работают; копия уходит на вашу почту.",
    error: "Не удалось отправить. Попробуйте ещё раз.",
  },
  ge: {
    title: "მიიღეთ vibe-code hardening პაკეტი",
    body: "ოთხი ჩეკლისტი რეალური rescue-პროექტებიდან: საიტის hardening, security აუდიტი, პროტოტიპიდან პროდაქშენამდე და agent-security მყიდველისთვის.",
    emailLabel: "სამუშაო email",
    submit: "გამომიგზავნეთ პაკეტი",
    submitting: "იგზავნება...",
    successTitle: "თქვენი პაკეტი მზადაა",
    successBody: "ბმულები უკვე მუშაობს; ასლი თქვენს ფოსტაზეც მიდის.",
    error: "ვერ გაიგზავნა. სცადეთ თავიდან.",
  },
  arm: {
    title: "Ստացեք vibe-code hardening փաթեթը",
    body: "Չորս չեկ-լիստ իրական rescue նախագծերից՝ կայքի hardening, security աուդիտ, պրոտոտիպից արտադրություն և agent-security գնորդի համար.",
    emailLabel: "Աշխատանքային email",
    submit: "Ուղարկել փաթեթը",
    submitting: "Ուղարկվում է...",
    successTitle: "Ձեր փաթեթը պատրաստ է",
    successBody: "Ստորև հղումներն արդեն աշխատում են; պատճենը գնում է ձեր փոստին.",
    error: "Չհաջողվեց ուղարկել. Փորձեք կրկին.",
  },
};

export function validateChecklistPayload(raw: unknown):
  | { ok: true; data: ChecklistRequestPayload }
  | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Invalid payload" };
  }
  const body = raw as Record<string, unknown>;
  const email = String(body.email ?? "").trim();
  const locale = String(body.locale ?? "en").trim() as Locale;
  const source = String(body.source ?? "").trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Valid email is required" };
  }

  return {
    ok: true,
    data: {
      email,
      locale: ["en", "ru", "ge", "arm"].includes(locale) ? locale : "en",
      source: source || undefined,
    },
  };
}

const localePrefix: Record<Locale, string> = {
  en: "",
  ru: "/ru",
  ge: "/ge",
  arm: "/arm",
};

export function checklistPackUrls(locale: Locale = "en") {
  const prefix = localePrefix[locale] ?? "";
  return checklistPackSlugs.map(
    (slug) => `https://daliagents.com${prefix}/blog/${slug}`,
  );
}

// Notification to the studio inbox: a warm lead who is not ready to talk yet.
export function formatChecklistNotification(data: ChecklistRequestPayload) {
  return {
    subject: `Checklist pack request · ${data.email}`,
    text: [
      `Email: ${data.email}`,
      `Locale: ${data.locale ?? "en"}`,
      data.source ? `Source: ${data.source}` : null,
      "",
      "Requested: vibe-code hardening checklist pack.",
      "Follow up in 2-3 days if they have not booked an audit.",
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

// Delivery email to the lead with the pack links.
export function formatChecklistDelivery(data: ChecklistRequestPayload) {
  const links = checklistPackUrls(data.locale ?? "en");
  return {
    subject: "Dali - your vibe-code hardening pack",
    text: [
      "Here is the pack:",
      "",
      ...links.map((url, i) => `${i + 1}. ${url}`),
      "",
      "If you want a second pair of eyes on a specific product, reply to this email with the URL and what worries you - we answer within one business day.",
      "",
      "David Hakobyan",
      "Dali - daliagents.com",
    ].join("\n"),
  };
}
