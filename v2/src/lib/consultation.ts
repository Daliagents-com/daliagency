// Purpose: Shared consultation intake types, validation, and delivery helpers.
// Scope: On-site form only - no third-party booking pages.
import { daliContactEmail } from "@/lib/contact";
import type { Locale } from "@/i18n/config";

export type ConsultationInterest =
  | "conversation-control"
  | "ops-knowledge"
  | "voice"
  | "vibe-code-rescue"
  | "custom"
  | "not-sure";

export type ConsultationPayload = {
  name: string;
  email: string;
  company?: string;
  interest: ConsultationInterest;
  message: string;
  locale?: Locale;
  source?: string;
};

export type ConsultationCopy = {
  title: string;
  subtitle: string;
  name: string;
  email: string;
  company: string;
  companyOptional: string;
  interest: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  close: string;
  error: string;
  required: string;
  interests: Record<ConsultationInterest, string>;
};

export const consultationCopy: Record<Locale, ConsultationCopy> = {
  en: {
    title: "Book a free consultation",
    subtitle:
      "Tell us about one workflow. We’ll reply with next steps — no external booking link.",
    name: "Name",
    email: "Work email",
    company: "Company",
    companyOptional: "optional",
    interest: "What do you need help with?",
    message: "Describe the workflow",
    messagePlaceholder:
      "What repeats every week? Which tools? What must stay human-reviewed?",
    submit: "Send request",
    submitting: "Sending…",
    successTitle: "Request received",
    successBody:
      "Thanks — we’ll review your note and get back within one business day.",
    close: "Close",
    error: "Something went wrong. Check the fields and try again.",
    required: "Required",
    interests: {
      "conversation-control": "Conversation Control (leads or support)",
      "ops-knowledge": "Ops & Knowledge (docs or Q&A)",
      voice: "Voice Agent",
      "vibe-code-rescue": "Vibe-code Rescue",
      custom: "Custom agent system",
      "not-sure": "Not sure yet — need advice",
    },
  },
  ru: {
    title: "Бесплатная консультация",
    subtitle:
      "Опишите один процесс. Ответим со следующими шагами — без внешних ссылок.",
    name: "Имя",
    email: "Рабочий email",
    company: "Компания",
    companyOptional: "необязательно",
    interest: "С чем нужна помощь?",
    message: "Опишите процесс",
    messagePlaceholder:
      "Что повторяется каждую неделю? Какие инструменты? Что должно остаться на проверке человека?",
    submit: "Отправить заявку",
    submitting: "Отправляем…",
    successTitle: "Заявка получена",
    successBody:
      "Спасибо — посмотрим и ответим в течение одного рабочего дня.",
    close: "Закрыть",
    error: "Не удалось отправить. Проверьте поля и попробуйте снова.",
    required: "Обязательно",
    interests: {
      "conversation-control": "Управление перепиской (лиды или support)",
      "ops-knowledge": "Ops и знания (docs или Q&A)",
      voice: "Voice Agent",
      "vibe-code-rescue": "Vibe-code Rescue",
      custom: "Кастомная agent-система",
      "not-sure": "Пока не уверен — нужен совет",
    },
  },
  ge: {
    title: "უფასო კონსულტაცია",
    subtitle:
      "აღწერეთ ერთი პროცესი. გიპასუხებთ შემდეგი ნაბიჯებით — გარე ბმულების გარეშე.",
    name: "სახელი",
    email: "სამუშაო email",
    company: "კომპანია",
    companyOptional: "არასავალდებულო",
    interest: "რაში გჭირდებათ დახმარება?",
    message: "აღწერეთ პროცესი",
    messagePlaceholder:
      "რა მეორდება ყოველ კვირას? რომელი ხელსაწყოები? რა უნდა დარჩეს ადამიანის შემოწმებაზე?",
    submit: "გაგზავნა",
    submitting: "იგზავნება…",
    successTitle: "მოთხოვნა მიღებულია",
    successBody:
      "მადლობა — გადავხედავთ და გიპასუხებთ ერთ სამუშაო დღეში.",
    close: "დახურვა",
    error: "ვერ გაიგზავნა. შეამოწმეთ ველები და სცადეთ თავიდან.",
    required: "სავალდებულო",
    interests: {
      "conversation-control": "Conversation Control (leads or support)",
      "ops-knowledge": "Ops & Knowledge (docs or Q&A)",
      voice: "Voice Agent",
      "vibe-code-rescue": "Vibe-code Rescue",
      custom: "მორგებული agent სისტემა",
      "not-sure": "ჯერ არ ვიცი — რჩევა მჭირდება",
    },
  },
  arm: {
    title: "Անվճար խորհրդատվություն",
    subtitle:
      "Նկարագրեք մեկ գործընթաց։ Կպատասխանենք հաջորդ քայլերով՝ առանց արտաքին հղումների։",
    name: "Անուն",
    email: "Աշխատանքային email",
    company: "Ընկերություն",
    companyOptional: "ոչ պարտադիր",
    interest: "Ի՞նչում է օգնություն պետք",
    message: "Նկարագրեք գործընթացը",
    messagePlaceholder:
      "Ի՞նչ է կրկնվում ամեն շաբաթ։ Որ գործիքներն են։ Ի՞նչը պետք է մնա մարդու վերանայմանը։",
    submit: "Ուղարկել",
    submitting: "Ուղարկվում է…",
    successTitle: "Հայտը ստացվել է",
    successBody:
      "Շնորհակալություն — կդիտարկենք և կպատասխանենք մեկ աշխատանքային օրվա ընթացքում։",
    close: "Փակել",
    error: "Չհաջողվեց ուղարկել։ Ստուգեք դաշտերը և կրկին փորձեք։",
    required: "Պարտադիր",
    interests: {
      "conversation-control": "Conversation Control (leads or support)",
      "ops-knowledge": "Ops & Knowledge (docs or Q&A)",
      voice: "Voice Agent",
      "vibe-code-rescue": "Vibe-code Rescue",
      custom: "Անհատական agent համակարգ",
      "not-sure": "Դեռ վստահ չեմ — խորհուրդ է պետք",
    },
  },
};

const INTEREST_IDS: ConsultationInterest[] = [
  "conversation-control",
  "ops-knowledge",
  "voice",
  "vibe-code-rescue",
  "custom",
  "not-sure",
];

export function isConsultationInterest(
  value: string,
): value is ConsultationInterest {
  return INTEREST_IDS.includes(value as ConsultationInterest);
}

export function validateConsultationPayload(raw: unknown): {
  ok: true;
  data: ConsultationPayload;
} | {
  ok: false;
  error: string;
} {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Invalid payload" };
  }
  const body = raw as Record<string, unknown>;
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim();
  const message = String(body.message ?? "").trim();
  const interest = String(body.interest ?? "").trim();
  const locale = String(body.locale ?? "en").trim() as Locale;
  const source = String(body.source ?? "").trim();

  if (name.length < 2) return { ok: false, error: "Name is required" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Valid email is required" };
  }
  if (!isConsultationInterest(interest)) {
    return { ok: false, error: "Interest is required" };
  }
  if (message.length < 10) {
    return { ok: false, error: "Please describe the workflow" };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      company: company || undefined,
      interest,
      message,
      locale: ["en", "ru", "ge", "arm"].includes(locale) ? locale : "en",
      source: source || undefined,
    },
  };
}

export function formatConsultationEmail(data: ConsultationPayload) {
  const interestLabel =
    consultationCopy[data.locale ?? "en"].interests[data.interest];
  return {
    subject: `Consultation request · ${data.name}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.company ? `Company: ${data.company}` : null,
      `Interest: ${interestLabel}`,
      data.source ? `Source CTA: ${data.source}` : null,
      "",
      "Workflow / message:",
      data.message,
      "",
      `Reply to: ${data.email}`,
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

export { daliContactEmail };
