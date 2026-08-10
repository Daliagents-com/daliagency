// Purpose: Shared consultation intake types, validation, and delivery helpers.
// Scope: On-site intake plus the embedded Cal.com booking step.
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
  leadId?: string;
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
  calendarLabel: string;
  calendarDescription: string;
  directMessageTitle: string;
  loadingCalendar: string;
  calendarErrorTitle: string;
  calendarErrorBody: string;
  openCalendar: string;
  bookedTitle: string;
  bookedBody: string;
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
    title: "Free workflow audit",
    subtitle:
      "Answer 3 short questions or choose a 30-minute call. Leave with 3 ranked opportunities and a fixed price range.",
    calendarLabel: "Book a video call",
    calendarDescription: "30 minutes · Video call · Free",
    directMessageTitle: "Or message David directly",
    loadingCalendar: "Loading available times…",
    calendarErrorTitle: "The calendar did not load",
    calendarErrorBody: "Open the secure Cal.com booking page to choose a time.",
    openCalendar: "Choose a time",
    bookedTitle: "Your workflow audit is booked",
    bookedBody:
      "The invite is in your inbox. Bring one recurring workflow and the tools it touches.",
    name: "Name",
    email: "Work email",
    company: "Company",
    companyOptional: "optional",
    interest: "What do you need help with?",
    message: "Tell us about the workflow",
    messagePlaceholder:
      "What repeats every week? Which tools? What must stay human-reviewed?",
    submit: "Send 3 answers",
    submitting: "Sending…",
    successTitle: "Request received",
    successBody:
      "Thanks - we’ll review your note within one business day. You can also choose a call time now.",
    close: "Close",
    error: "Something went wrong. Check the fields and try again.",
    required: "Required",
    interests: {
      "conversation-control": "Conversation Control (leads or support)",
      "ops-knowledge": "Ops & Knowledge (docs or Q&A)",
      voice: "Voice Agent",
      "vibe-code-rescue": "Vibe-code Rescue",
      custom: "Custom agent system",
      "not-sure": "Not sure yet - need advice",
    },
  },
  ru: {
    title: "Бесплатный аудит процесса",
    subtitle:
      "Ответьте на 3 коротких вопроса или выберите 30-минутный созвон. Получите 3 приоритетных процесса и фиксированный диапазон цены.",
    calendarLabel: "Записаться на видеозвонок",
    calendarDescription: "30 минут · Видеозвонок · Бесплатно",
    directMessageTitle: "Или напишите Дэвиду напрямую",
    loadingCalendar: "Загружаем доступное время…",
    calendarErrorTitle: "Календарь не загрузился",
    calendarErrorBody:
      "Откройте защищенную страницу Cal.com и выберите удобное время.",
    openCalendar: "Выбрать время",
    bookedTitle: "Аудит процесса забронирован",
    bookedBody:
      "Приглашение уже в почте. Подготовьте один повторяющийся процесс и список связанных инструментов.",
    name: "Имя",
    email: "Рабочий email",
    company: "Компания",
    companyOptional: "необязательно",
    interest: "С чем нужна помощь?",
    message: "Расскажите о процессе",
    messagePlaceholder:
      "Что повторяется каждую неделю? Какие инструменты? Что должно остаться на проверке человека?",
    submit: "Отправить 3 ответа",
    submitting: "Отправляем…",
    successTitle: "Заявка получена",
    successBody:
      "Спасибо - посмотрим и ответим в течение одного рабочего дня. Сейчас можно сразу выбрать время созвона.",
    close: "Закрыть",
    error: "Не удалось отправить. Проверьте поля и попробуйте снова.",
    required: "Обязательно",
    interests: {
      "conversation-control": "Входящие лиды или клиентская поддержка",
      "ops-knowledge": "Операции или база знаний",
      voice: "Голосовой агент",
      "vibe-code-rescue": "Спасение ИИ-продукта",
      custom: "Система под конкретную задачу",
      "not-sure": "Пока не уверен - нужен совет",
    },
  },
  ge: {
    title: "პროცესის უფასო აუდიტი",
    subtitle:
      "30 წუთში: 3 პრიორიტეტული პროცესი, პირველი დანერგვა და ფიქსირებული ფასის დიაპაზონი.",
    calendarLabel: "ვიდეოზარი",
    calendarDescription: "30 წუთი · ვიდეოზარი · უფასო",
    directMessageTitle: "ან პირდაპირ მისწერეთ დავითს",
    loadingCalendar: "ხელმისაწვდომი დრო იტვირთება…",
    calendarErrorTitle: "კალენდარი ვერ ჩაიტვირთა",
    calendarErrorBody:
      "გახსენით Cal.com-ის დაცული გვერდი და აირჩიეთ მოსახერხებელი დრო.",
    openCalendar: "კალენდრის გახსნა",
    bookedTitle: "პროცესის აუდიტი დაჯავშნილია",
    bookedBody:
      "მოწვევა უკვე თქვენს ელფოსტაშია. მოამზადეთ ერთი განმეორებადი პროცესი და მასთან დაკავშირებული ინსტრუმენტები.",
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
    successBody: "მადლობა - გადავხედავთ და გიპასუხებთ ერთ სამუშაო დღეში.",
    close: "დახურვა",
    error: "ვერ გაიგზავნა. შეამოწმეთ ველები და სცადეთ თავიდან.",
    required: "სავალდებულო",
    interests: {
      "conversation-control": "Conversation Control (leads or support)",
      "ops-knowledge": "Ops & Knowledge (docs or Q&A)",
      voice: "Voice Agent",
      "vibe-code-rescue": "Vibe-code Rescue",
      custom: "მორგებული agent სისტემა",
      "not-sure": "ჯერ არ ვიცი - რჩევა მჭირდება",
    },
  },
  arm: {
    title: "Գործընթացի անվճար աուդիտ",
    subtitle:
      "30 րոպեում՝ 3 առաջնահերթ գործընթաց, առաջին ներդրում և ֆիքսված գնի միջակայք։",
    calendarLabel: "Տեսազանգ",
    calendarDescription: "30 րոպե · Տեսազանգ · Անվճար",
    directMessageTitle: "Կամ ուղիղ գրեք Դավիթին",
    loadingCalendar: "Բեռնվում են հասանելի ժամերը…",
    calendarErrorTitle: "Օրացույցը չբեռնվեց",
    calendarErrorBody: "Բացեք Cal.com-ի անվտանգ էջը և ընտրեք հարմար ժամ։",
    openCalendar: "Բացել օրացույցը",
    bookedTitle: "Գործընթացի աուդիտն ամրագրված է",
    bookedBody:
      "Հրավերն արդեն ձեր էլփոստում է։ Պատրաստեք մեկ կրկնվող գործընթաց և դրա հետ կապված գործիքների ցանկը։",
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
      "Շնորհակալություն - կդիտարկենք և կպատասխանենք մեկ աշխատանքային օրվա ընթացքում։",
    close: "Փակել",
    error: "Չհաջողվեց ուղարկել։ Ստուգեք դաշտերը և կրկին փորձեք։",
    required: "Պարտադիր",
    interests: {
      "conversation-control": "Conversation Control (leads or support)",
      "ops-knowledge": "Ops & Knowledge (docs or Q&A)",
      voice: "Voice Agent",
      "vibe-code-rescue": "Vibe-code Rescue",
      custom: "Անհատական agent համակարգ",
      "not-sure": "Դեռ վստահ չեմ - խորհուրդ է պետք",
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

export function validateConsultationPayload(raw: unknown):
  | {
      ok: true;
      data: ConsultationPayload;
    }
  | {
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
      data.leadId ? `Lead ID: ${data.leadId}` : null,
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

type AutoReplyCopy = {
  subject: string;
  greeting: (name: string) => string;
  body: string;
  questionsIntro: string;
  questions: string[];
  signoff: string;
};

const autoReplyCopy: Record<Locale, AutoReplyCopy> = {
  en: {
    subject: "Dali - your request is in",
    greeting: (name) => `Hi ${name},`,
    body: "Thanks for the note. A real person (David) reads every request; you will get a reply within one business day.",
    questionsIntro:
      "To skip a round-trip, reply to this email with three quick facts:",
    questions: [
      "Which tools does this workflow touch today (CRM, inbox, spreadsheets)?",
      "Roughly how many items per week does it handle?",
      "What must always stay human-approved?",
    ],
    signoff: "David Hakobyan\nDali - daliagents.com",
  },
  ru: {
    subject: "Dali - заявка получена",
    greeting: (name) => `Здравствуйте, ${name}!`,
    body: "Спасибо за заявку. Каждый запрос читает живой человек (David); ответим в течение одного рабочего дня.",
    questionsIntro:
      "Чтобы сэкономить круг переписки, ответьте на это письмо тремя фактами:",
    questions: [
      "Какие инструменты сейчас задействованы в процессе (CRM, почта, таблицы)?",
      "Примерно сколько заявок/задач в неделю он обрабатывает?",
      "Что должно всегда оставаться на ручном одобрении?",
    ],
    signoff: "Давид Акопян\nDali - daliagents.com",
  },
  ge: {
    subject: "Dali - მოთხოვნა მიღებულია",
    greeting: (name) => `გამარჯობა, ${name},`,
    body: "მადლობა შეტყობინებისთვის. ყველა მოთხოვნას ნამდვილი ადამიანი (David) კითხულობს; გიპასუხებთ ერთი სამუშაო დღის განმავლობაში.",
    questionsIntro: "დროის დასაზოგად, უპასუხეთ ამ წერილს სამი ფაქტით:",
    questions: [
      "რომელ ინსტრუმენტებს ეხება ეს პროცესი დღეს (CRM, ფოსტა, ცხრილები)?",
      "დაახლოებით რამდენ ერთეულს ამუშავებს კვირაში?",
      "რა უნდა დარჩეს ყოველთვის ადამიანის დასტურზე?",
    ],
    signoff: "David Hakobyan\nDali - daliagents.com",
  },
  arm: {
    subject: "Dali - հայտն ընդունված է",
    greeting: (name) => `Բարև, ${name},`,
    body: "Շնորհակալություն հայտի համար: Յուրաքանչյուր հարցում կարդում է իրական մարդ (David); կպատասխանենք մեկ աշխատանքային օրվա ընթացքում:",
    questionsIntro:
      "Նամակագրության շրջանը խնայելու համար պատասխանեք այս նամակին երեք փաստով.",
    questions: [
      "Այսօր ի՞նչ գործիքների է առնչվում այս գործընթացը (CRM, փոստ, աղյուսակներ):",
      "Մոտավորապես քանի՞ միավոր է այն մշակում շաբաթական:",
      "Ի՞նչը պետք է միշտ մնա մարդու հաստատման ներքո:",
    ],
    signoff: "David Hakobyan\nDali - daliagents.com",
  },
};

export function formatConsultationAutoReply(data: ConsultationPayload) {
  const copy = autoReplyCopy[data.locale ?? "en"] ?? autoReplyCopy.en;
  return {
    subject: copy.subject,
    text: [
      copy.greeting(data.name),
      "",
      copy.body,
      "",
      copy.questionsIntro,
      ...copy.questions.map((q, i) => `${i + 1}. ${q}`),
      "",
      copy.signoff,
    ].join("\n"),
  };
}

export { daliContactEmail };
