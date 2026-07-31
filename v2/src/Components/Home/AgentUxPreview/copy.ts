// Purpose: Types + localized UI strings for AgentUxPreview product mocks.
import type { Locale } from "@/i18n/config";

export type AgentUxKind =
  | "dali"
  | "lead-response"
  | "client-inbox"
  | "operations-docs"
  | "knowledge-assistant"
  | "voice-agents";

export type AgentUxPreviewProps = {
  kind: AgentUxKind;
  title: string;
  summary: string;
  tasks: readonly string[];
  inputs: readonly string[];
  locale: Locale;
  /** Continuous product micro-motion for hero placements. */
  loop?: boolean;
  /** Parent panel is in viewport - run product stage demo. */
  live?: boolean;
  /** @deprecated use live */
  animateOnView?: boolean;
  /** Shorter dash min-height for scroll-pin / sticky tab stages. */
  compact?: boolean;
};

export type Copy = {
  live: string;
  ready: string;
  review: string;
  approved: string;
  sent: string;
  completed: string;
  workflow: string;
  active: string;
  leads: string;
  inbox: string;
  operations: string;
  search: string;
  answer: string;
  sources: string;
  call: string;
  send: string;
  approve: string;
  approveRun: string;
  run: string;
  transfer: string;
  transferred: string;
  evidence: string;
  confidence: string;
  today: string;
  score: string;
  owner: string;
  status: string;
  request: string;
  draft: string;
  company: string;
  stage: string;
  next: string;
};

export const interfaceCopy: Record<Locale, Copy> = {
  en: {
    live: "Live",
    ready: "Ready",
    review: "Needs review",
    approved: "Approved",
    sent: "Reply sent",
    completed: "Completed",
    workflow: "Workflow",
    active: "Active runs",
    leads: "Inbound leads",
    inbox: "Client inbox",
    operations: "Operations queue",
    search: "Search knowledge",
    answer: "Cited answer",
    sources: "Sources",
    call: "Active call",
    send: "Send reply",
    approve: "Approve reply",
    approveRun: "Approve",
    run: "Run workflow",
    transfer: "Transfer to human",
    transferred: "Transferred",
    evidence: "Evidence checked",
    confidence: "Confidence",
    today: "Today",
    score: "Score",
    owner: "Owner",
    status: "Status",
    request: "Request",
    draft: "AI draft",
    company: "Company",
    stage: "Stage",
    next: "Next",
  },
  ru: {
    live: "В работе",
    ready: "Готово",
    review: "Нужна проверка",
    approved: "Подтверждено",
    sent: "Ответ отправлен",
    completed: "Завершено",
    workflow: "Процессы",
    active: "Активные процессы",
    leads: "Входящие лиды",
    inbox: "Входящие клиентов",
    operations: "Очередь операций",
    search: "Поиск по знаниям",
    answer: "Ответ с источниками",
    sources: "Источники",
    call: "Активный звонок",
    send: "Отправить ответ",
    approve: "Подтвердить ответ",
    approveRun: "Подтвердить",
    run: "Запустить процесс",
    transfer: "Передать человеку",
    transferred: "Передано",
    evidence: "Источники проверены",
    confidence: "Уверенность",
    today: "Сегодня",
    score: "Скор",
    owner: "Владелец",
    status: "Статус",
    request: "Запрос",
    draft: "Черновик ИИ",
    company: "Компания",
    stage: "Этап",
    next: "Далее",
  },
  ge: {
    live: "ცოცხალი",
    ready: "მზადაა",
    review: "საჭიროა შემოწმება",
    approved: "დამტკიცებულია",
    sent: "პასუხი გაგზავნილია",
    completed: "დასრულებულია",
    workflow: "პროცესი",
    active: "აქტიური პროცესები",
    leads: "შემომავალი ლიდები",
    inbox: "კლიენტის ინბოქსი",
    operations: "ოპერაციების რიგი",
    search: "ცოდნაში ძიება",
    answer: "პასუხი წყაროებით",
    sources: "წყაროები",
    call: "აქტიური ზარი",
    send: "პასუხის გაგზავნა",
    approve: "პასუხის დამტკიცება",
    approveRun: "დამტკიცება",
    run: "პროცესის გაშვება",
    transfer: "ადამიანთან გადართვა",
    transferred: "გადაცემულია",
    evidence: "წყაროები შემოწმებულია",
    confidence: "სანდოობა",
    today: "დღეს",
    score: "ქულა",
    owner: "მფლობელი",
    status: "სტატუსი",
    request: "მოთხოვნა",
    draft: "AI დრაფტი",
    company: "კომპანია",
    stage: "ეტაპი",
    next: "შემდეგი",
  },
  arm: {
    live: "Ուղիղ",
    ready: "Պատրաստ է",
    review: "Ստուգում է պետք",
    approved: "Հաստատված է",
    sent: "Պատասխանը ուղարկված է",
    completed: "Ավարտված է",
    workflow: "Գործընթաց",
    active: "Ակտիվ գործընթացներ",
    leads: "Մուտքային լիդեր",
    inbox: "Հաճախորդների մուտքարկղ",
    operations: "Գործառնությունների հերթ",
    search: "Որոնել գիտելիքում",
    answer: "Պատասխան աղբյուրներով",
    sources: "Աղբյուրներ",
    call: "Ակտիվ զանգ",
    send: "Ուղարկել պատասխանը",
    approve: "Հաստատել պատասխանը",
    approveRun: "Հաստատել",
    run: "Գործարկել գործընթացը",
    transfer: "Փոխանցել մարդուն",
    transferred: "Փոխանցված է",
    evidence: "Աղբյուրները ստուգված են",
    confidence: "Վստահություն",
    today: "Այսօր",
    score: "Միավոր",
    owner: "Սեփականատեր",
    status: "Կարգավիճակ",
    request: "Հարցում",
    draft: "AI նախագիծ",
    company: "Ընկերություն",
    stage: "Փուլ",
    next: "Հաջորդ",
  },
};

