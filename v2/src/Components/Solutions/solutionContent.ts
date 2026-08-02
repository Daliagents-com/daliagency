// Purpose: Define typed content and metadata helpers for Dali's solution landing pages.
// Scope: Shared source of truth for public and Upwork route variants.
import type { Metadata } from "next";
import { buildMailtoHref } from "@/lib/contact";
import {
  htmlLanguages,
  locales,
  localizePath,
  type Locale,
} from "@/i18n/config";
import {
  buildSolutionsCatalog,
  englishFamilyShells,
  legacySolutionRedirects,
} from "./buildFamilySolutions";
import { siteUrl } from "@/lib/seo/site";

export { legacySolutionRedirects };
export { siteUrl };
export const socialPreviewImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Dali AI agent systems for real operations",
};
export const twitterPreviewImage = "/twitter-image";

/** Public product families (catalog + routes). */
export const solutionSlugs = [
  "conversation-control",
  "ops-knowledge",
  "voice-agents",
  "vibe-code-rescue",
] as const;

/** Fixed lanes inside families (source pilots before merge). */
export const pilotSourceSlugs = [
  "lead-response",
  "client-inbox",
  "operations-docs",
  "knowledge-assistant",
  "voice-agents",
  "vibe-code-rescue",
] as const;

export type SolutionSlug = (typeof solutionSlugs)[number];
export type PilotSourceSlug = (typeof pilotSourceSlugs)[number];
export type SolutionVariant = "public" | "upwork";

/** UI shell used by AgentUxPreview / product mocks. */
export type SolutionPreviewKind =
  | "lead-response"
  | "client-inbox"
  | "operations-docs"
  | "knowledge-assistant"
  | "voice-agents";

export type SolutionLane = {
  id: string;
  name: string;
  summary: string;
  fixedOutcome: string;
  includes: readonly string[];
  excludes: readonly string[];
  acceptanceTest: string;
  sourceSlug: PilotSourceSlug;
};

type SolutionMetadata = {
  title: string;
  description: string;
};

type HeroContent = {
  eyebrow: string;
  title: string;
  lead: string;
  supportLine: string;
};

type WorkflowContent = {
  label: string;
  intake: readonly string[];
  agentLabel: string;
  review: readonly string[];
  outcomes: readonly string[];
};

type ContrastContent = {
  painTitle: string;
  painPoints: readonly string[];
  outcomeTitle: string;
  outcomePoints: readonly string[];
};

type PilotBoundaryContent = {
  label: string;
  fixedOutcome: string;
  includes: readonly string[];
  excludes: readonly string[];
};

type IntegrationsContent = {
  label: string;
  intro: string;
  items: readonly string[];
};

type GuardrailContent = {
  label: string;
  intro: string;
  items: readonly string[];
};

type ValidationContent = {
  acceptanceTest: string;
  measures: readonly string[];
  commercialModel: string;
};

type DeliveryStep = {
  title: string;
  body: string;
};

type FitContent = {
  fit: readonly string[];
  notFit: readonly string[];
};

type FaqItem = {
  question: string;
  answer: string;
};

type CtaContent = {
  publicLabel: string;
  publicBody: string;
  intakeFields: readonly string[];
  upworkLabel: string;
  upworkBody: string;
};

type SolutionBody = {
  name: string;
  summary: string;
  accent: string;
  accentSoft: string;
  tint: string;
  metadata: SolutionMetadata;
  hero: HeroContent;
  workflow: WorkflowContent;
  contrast: ContrastContent;
  pilot: PilotBoundaryContent;
  integrations: IntegrationsContent;
  guardrails: GuardrailContent;
  validation: ValidationContent;
  delivery: readonly [DeliveryStep, DeliveryStep, DeliveryStep];
  fit: FitContent;
  faqs: readonly FaqItem[];
  cta: CtaContent;
};

export type SolutionContent = SolutionBody & {
  slug: SolutionSlug;
  /** Fixed lanes for multi-scope families. Single-lane products omit this. */
  lanes?: readonly SolutionLane[];
  /** Product mock shell (AgentUxPreview kind). */
  previewKind: SolutionPreviewKind;
};

export type PilotSourceContent = SolutionBody & {
  slug: PilotSourceSlug;
};

export const pilotSourcesBySlug: Record<PilotSourceSlug, PilotSourceContent> = {
  "lead-response": {
    slug: "lead-response",
    name: "Lead Response",
    summary:
      "A packaged solution for teams that lose momentum between inquiry, qualification, and booked next step.",
    accent: "#1E3A8A",
    accentSoft: "#E9EDFF",
    tint: "#fff5ef",
    metadata: {
      title: "Lead Response | Dali",
      description:
        "Packaged solution to qualify inbound leads, send approved first replies, and keep CRM follow-up moving without pretending sales can be fully automated.",
    },
    hero: {
      eyebrow: "Packaged solution",
      title: "Stop losing qualified leads between the first message and the CRM.",
      lead:
        "Dali packages one inbound workflow into a supervised AI system that sends the first reply, qualifies against your rules, updates the pipeline, books the next step or follow-up, and routes sensitive cases to a person with full logs.",
      supportLine:
        "Best fit for service businesses, agencies, and operators with real inbound volume but inconsistent first response.",
    },
    workflow: {
      label: "Workflow diagram",
      intake: ["Forms", "Email", "WhatsApp or Telegram"],
      agentLabel: "Lead response agent",
      review: ["Custom pricing", "Enterprise edge cases", "Low-confidence leads"],
      outcomes: ["First reply", "Qualification notes", "CRM update or booked call"],
    },
    contrast: {
      painTitle: "What it replaces",
      painPoints: [
        "Shared inboxes where warm leads sit until someone notices them.",
        "Founders rewriting the same first reply and qualification questions.",
        "CRM stages that lag behind reality, so follow-up gets guessed instead of managed.",
      ],
      outcomeTitle: "What it creates",
      outcomePoints: [
        "Every inbound lead gets an immediate first-pass response in the approved tone.",
        "Qualification happens against one consistent playbook, not team memory.",
        "Humans step in only for pricing, nuance, or higher-stakes deal motion.",
      ],
    },
    pilot: {
      label: "Exact fixed scope boundary",
      fixedOutcome:
        "One or two inbound channels, one CRM, one qualification policy, one booking or follow-up route, and one human escalation queue, live with deduplication, do-not-contact logic, and logs.",
      includes: [
        "1 lead source cluster, for example website form plus shared inbox",
        "1 approved first-reply playbook in English",
        "1 CRM or calendar action path",
        "Business-hours coverage with visible escalation rules",
      ],
      excludes: [
        "Outbound prospecting or cold outreach",
        "Custom proposal writing",
        "Autonomous pricing, discounts, or contract commitments",
      ],
    },
    integrations: {
      label: "Integrations and examples",
      intro:
        "Typical stack combinations for this package include the tools already used by the sales or founder team.",
      items: [
        "HubSpot, Pipedrive, or a structured Google Sheet",
        "Gmail, Outlook, WhatsApp, or Telegram inboxes",
        "Calendly or a direct booking handoff",
        "Typeform or website contact form intake",
      ],
    },
    guardrails: {
      label: "Guardrails and approval",
      intro:
        "The system is designed to be useful before it is allowed to be bold. Sensitive moments stay human.",
      items: [
        "No promises on pricing, timelines, or scope without explicit approval.",
        "Every outbound message is logged with the source context used to draft it.",
        "Low-confidence leads route to a human instead of being guessed through.",
        "Escalation rules are visible and can be adjusted during rehearsal.",
      ],
    },
    validation: {
      acceptanceTest:
        "Replay 20 representative inbound conversations. Pass only if every event is logged, duplicate CRM writes stay at 0, required CRM fields are at least 90% complete, and every low-confidence or sensitive case stops for human review.",
      measures: [
        "Time to first response",
        "Correct qualification and routing rate",
        "CRM write success and duplicate rate",
        "Qualified-to-booked conversion",
        "Follow-ups completed on schedule",
        "Human review rate by reason",
      ],
      commercialModel:
        "The audit defines the boundary. If it is viable, Dali sends a fixed-scope, fixed-price milestone. Build starts only after approval, and any wider rollout is a separate decision.",
    },
    delivery: [
      {
        title: "Map the response path",
        body:
          "We review the real inbox flow, qualification questions, and CRM handoff so the package is anchored in how leads arrive today, not in a hypothetical funnel.",
      },
      {
        title: "Rehearse on real examples",
        body:
          "We replay recent inbound threads, refine the decision rules, and lock the exact approval points before anything answers live.",
      },
      {
        title: "Launch the packaged solution",
        body:
          "The package goes live on the agreed queue with monitoring, exception handling, and a narrow scope that is practical to own.",
      },
    ],
    fit: {
      fit: [
        "You already get enough inbound to justify process discipline.",
        "The first response follows patterns, even if the closing call stays human.",
        "Someone on your side can approve a qualification playbook quickly.",
      ],
      notFit: [
        "Every lead requires bespoke scoping before any useful reply exists.",
        "Your team wants a fully autonomous closer, not an approved first-pass system.",
        "Inbound volume is too low to produce useful rehearsal data.",
      ],
    },
    faqs: [
      {
        question: "Will this close deals on its own?",
        answer:
          "No. This package is for faster intake, consistent qualification, and cleaner follow-up. Closing judgment stays with the human seller.",
      },
      {
        question: "Can it send replies automatically?",
        answer:
          "Yes, if the message class is low risk and the approval boundary is clear. Otherwise it drafts and routes for review.",
      },
      {
        question: "What if our lead flow changes a lot week to week?",
        answer:
          "That is workable if the first-pass questions are still stable. If every inquiry changes the rules, the package scope should narrow before launch.",
      },
    ],
    cta: {
      publicLabel: "Start the lead response audit",
      publicBody:
        "If this matches the workflow you want fixed first, send the intake details and Dali will reply with a scope outline, approval map, and boundary assumptions.",
      intakeFields: [
        "Lead sources and approximate weekly volume",
        "Current first-response and qualification path",
        "CRM or calendar that should receive the result",
        "Cases that must always wait for human review",
      ],
      upworkLabel: "See what to send in Upwork",
      upworkBody:
        "Reply in Upwork with your lead sources, current response path, and CRM. Dali will answer with the fixed scope boundary for this exact workflow.",
    },
  },
  "client-inbox": {
    slug: "client-inbox",
    name: "Client Inbox",
    summary:
      "A packaged solution for teams that need faster, grounded customer replies without giving an agent permission to improvise sensitive actions.",
    accent: "#1E3A8A",
    accentSoft: "#E9EDFF",
    tint: "#fff6f0",
    metadata: {
      title: "Client Inbox | Dali",
      description:
        "Packaged solution for one customer chat or email workflow with grounded replies, CRM history, approved actions, and human escalation.",
    },
    hero: {
      eyebrow: "Packaged solution",
      title: "Turn the shared inbox into one controlled response path.",
      lead:
        "Dali designs one fixed-scope customer inbox workflow that reads the approved context, drafts or sends routine replies, logs the conversation in CRM, and pauses files, media, or sensitive actions for human review.",
      supportLine:
        "Best fit for support and operations teams that repeat the same answers and actions across chat, email, open lines, or CRM queues.",
    },
    workflow: {
      label: "Workflow diagram",
      intake: ["Chat or email", "Files and media", "CRM context"],
      agentLabel: "Client inbox agent",
      review: ["Sensitive actions", "Unsupported answers", "Policy exceptions"],
      outcomes: ["Grounded reply", "CRM history", "Human handoff"],
    },
    contrast: {
      painTitle: "What it replaces",
      painPoints: [
        "Customer threads waiting because context is scattered across chat, files, and CRM.",
        "Agents rewriting routine answers while sensitive actions follow inconsistent rules.",
        "Conversation history and next steps disappearing when a request changes channel or owner.",
      ],
      outcomeTitle: "What it creates",
      outcomePoints: [
        "Routine replies use one approved source set, tone, and action policy.",
        "Files, media, and uncertain requests stop at a visible approval boundary.",
        "Every reply, action, and escalation is written back to the agreed case history.",
      ],
    },
    pilot: {
      label: "Exact fixed scope boundary",
      fixedOutcome:
        "One customer channel, one answer and action policy, one CRM history path, live with a human escalation queue.",
      includes: [
        "1 customer channel or tightly related channel pair",
        "1 approved answer source set and response tone",
        "1 CRM or case-history destination",
        "Human review for sensitive actions, unsupported answers, files, or media",
      ],
      excludes: [
        "Replacing the whole customer-support team",
        "Open-ended answers outside the approved source set",
        "Autonomous refunds, promises, account changes, or irreversible actions",
      ],
    },
    integrations: {
      label: "Integrations and examples",
      intro:
        "The package connects the channel where customer requests arrive to the context and history the team already trusts.",
      items: [
        "Email, website chat, CRM open lines, WhatsApp, or Telegram",
        "HubSpot, Bitrix24, Kommo, GoHighLevel, or another case-history system",
        "Approved help articles, policy notes, files, and past resolved threads",
        "Human approval for media, account changes, commercial promises, or unclear requests",
      ],
    },
    guardrails: {
      label: "Guardrails and approval",
      intro:
        "The workflow is useful only when it is obvious what the assistant may answer, what it may do, and where a person must take over.",
      items: [
        "Every reply is grounded in the approved context attached to the case.",
        "No pricing, refund, account, or policy commitment happens outside the agreed rules.",
        "Unsupported or conflicting requests route to a named human owner.",
        "Replies, tool actions, approvals, and failures remain visible in the audit log.",
      ],
    },
    validation: {
      acceptanceTest:
        "Replay 20 representative customer threads, including files and edge cases. Pass only if every event is logged, unauthorized actions stay at 0, routing is correct on at least 90% of the approved cases, and every reply without source support stops for human review.",
      measures: [
        "Time to first useful response",
        "Reply acceptance rate on reviewed threads",
        "CRM or case-history write success",
        "Correct escalation and unauthorized-action rate",
      ],
      commercialModel:
        "The audit fixes one channel, source set, action policy, and CRM path. Dali then quotes a fixed-scope, fixed-price package. Build starts only after approval.",
    },
    delivery: [
      {
        title: "Map one conversation path",
        body:
          "We choose the recurring request classes, approved source material, response tone, permitted actions, and the exact moments that require a person.",
      },
      {
        title: "Replay real customer threads",
        body:
          "We test routine questions, files, media, missing context, and sensitive cases until routing and approval behavior are consistent.",
      },
      {
        title: "Launch with visible ownership",
        body:
          "The chosen queue goes live with CRM history, monitoring, and a named handoff path for anything outside the package boundary.",
      },
    ],
    fit: {
      fit: [
        "The same customer questions and actions recur often enough to rehearse.",
        "The team can name the source material and actions that count as approved.",
        "A human owner is available for unsupported or sensitive requests.",
      ],
      notFit: [
        "Every conversation requires bespoke commercial or legal judgment.",
        "The source material is unavailable or too contradictory to support routine replies.",
        "The goal is to hide automation or remove human escalation entirely.",
      ],
    },
    faqs: [
      {
        question: "Can it answer across chat and email?",
        answer:
          "Yes, but the first package stays on one channel or a tightly related pair. Additional channels are a separate expansion after the response and logging path works.",
      },
      {
        question: "Can it send files, media, or perform CRM actions?",
        answer:
          "Only the exact approved actions inside the package boundary. Sensitive media, account changes, promises, and uncertain requests can remain approval-only.",
      },
      {
        question: "What happens when the knowledge is incomplete?",
        answer:
          "The assistant does not invent an answer. It creates a handoff with the conversation context, missing evidence, and the next decision a person needs to make.",
      },
    ],
    cta: {
      publicLabel: "Start the client inbox audit",
      publicBody:
        "Send one representative customer thread, the primary channel, and the CRM or case-history system. Dali will reply with the replay set, approval map, and fixed scope boundary.",
      intakeFields: [
        "Primary customer channel and approximate weekly volume",
        "One representative routine conversation",
        "CRM, case history, and approved knowledge sources",
        "Actions or requests that must always wait for a person",
      ],
      upworkLabel: "See what to send in Upwork",
      upworkBody:
        "Reply in Upwork with the primary customer channel, CRM, and one representative thread. Dali will answer with the fixed scope boundary and approval assumptions.",
    },
  },
  "operations-docs": {
    slug: "operations-docs",
    name: "Documents-to-Actions",
    summary:
      "A packaged solution that turns one recurring email, PDF, form, or spreadsheet flow into validated records and downstream actions.",
    accent: "#1E3A8A",
    accentSoft: "#E9EDFF",
    tint: "#fff8f3",
    metadata: {
      title: "Documents-to-Actions | Dali",
      description:
        "Packaged solution to extract and validate operational data, route exceptions for approval, and update the system your team already uses.",
    },
    hero: {
      eyebrow: "Packaged solution",
      title: "Turn recurring documents into validated actions.",
      lead:
        "Dali designs one fixed-scope intake-to-system workflow that reads emails, PDFs, forms, screenshots, or spreadsheets, validates the required fields, routes exceptions for approval, and writes the approved result into the system your team already uses.",
      supportLine:
        "Best fit for operations teams that repeatedly copy, check, and route the same kind of information between inboxes and business systems.",
    },
    workflow: {
      label: "Workflow diagram",
      intake: ["Email or PDF", "Form or screenshot", "Spreadsheet row"],
      agentLabel: "Operations workflow agent",
      review: ["Missing fields", "Duplicate records", "Rule exceptions"],
      outcomes: ["Validated record", "Routed task", "CRM or ERP update"],
    },
    contrast: {
      painTitle: "What it replaces",
      painPoints: [
        "Operators copying the same fields from attachments and inboxes into trackers or business systems.",
        "Silent duplicates, missing values, and malformed records discovered only after downstream work breaks.",
        "Exceptions getting buried in chat because the happy path and the review path are mixed together.",
      ],
      outcomeTitle: "What it creates",
      outcomePoints: [
        "One auditable path from a recurring input to a validated system update.",
        "A visible exception queue for anything that is incomplete, conflicting, or outside the approved rules.",
        "Retries, deduplication, and an action log so the team can see what happened instead of guessing.",
      ],
    },
    pilot: {
      label: "Exact fixed scope boundary",
      fixedOutcome:
        "One intake source, one extraction schema, one destination system, and one approval rule, live with an exception queue.",
      includes: [
        "1 recurring input type, for example order email, invoice PDF, or intake form",
        "1 required data schema with validation rules",
        "1 CRM, ERP, tracker, or task destination",
        "Deduplication, retries, approval, and an auditable exception path",
      ],
      excludes: [
        "Automating every document and operating process at once",
        "Guessing missing values or approving ambiguous records",
        "Replacing the source or destination system in the first package",
      ],
    },
    integrations: {
      label: "Integrations and examples",
      intro:
        "This package sits between the channel where operational data arrives and the system where a checked record or task needs to exist.",
      items: [
        "Gmail, Outlook, Google Drive, forms, uploads, or watched folders",
        "PDFs, screenshots, spreadsheets, order emails, invoices, or application packets",
        "HubSpot, Salesforce, Odoo, QuickBooks, Buildium, or Google Sheets",
        "Slack, Telegram, ClickUp, or email for approvals and exception alerts",
      ],
    },
    guardrails: {
      label: "Guardrails and approval",
      intro:
        "Operational automation earns trust by making uncertainty and failure visible, not by forcing every input through the happy path.",
      items: [
        "Required fields are validated before any downstream write is allowed.",
        "Duplicate inputs are detected before they create a second record or action.",
        "Low-confidence extraction and business-rule exceptions wait for a named reviewer.",
        "Every retry, approval, failure, and final write stays visible in the audit trail.",
      ],
    },
    validation: {
      acceptanceTest:
        "Replay 20 representative inputs against the agreed schema. Pass only if silent duplicates stay at 0, every event is logged, required fields are at least 90% complete, and every missing, conflicting, or low-confidence value creates an exception record.",
      measures: [
        "Parse rate without correction",
        "Exception rate by reason",
        "Duplicate action rate",
        "Time to approved system update",
      ],
      commercialModel:
        "The audit defines the input, schema, target, and exception rules. Dali then quotes one fixed-scope, fixed-price milestone. Build starts after approval, not before.",
    },
    delivery: [
      {
        title: "Define the acceptance test",
        body:
          "We choose one representative input, define the required output schema, and agree exactly which records may pass automatically versus wait for review.",
      },
      {
        title: "Replay real inputs",
        body:
          "We run recent examples through extraction, validation, deduplication, and the exception queue until the system behavior is observable and repeatable.",
      },
      {
        title: "Launch one auditable path",
        body:
          "The chosen flow goes live with approvals, retries, alerts, and logs before any second document type or destination is added.",
      },
    ],
    fit: {
      fit: [
        "The same type of operational input arrives often enough to rehearse against real examples.",
        "The destination fields and business rules can be written down.",
        "A named operator can review exceptions during the engagement.",
      ],
      notFit: [
        "Every input has a different structure and no stable downstream action.",
        "The team wants to automate all back-office operations in the first milestone.",
        "No one can decide whether an ambiguous record should pass or stop.",
      ],
    },
    faqs: [
      {
        question: "What happens when extraction is uncertain?",
        answer:
          "The record stops in the exception queue with the source attached. The package does not guess through a missing field or low-confidence value.",
      },
      {
        question: "Can it write directly to our CRM or ERP?",
        answer:
          "Yes, after the record passes the agreed validation and approval rules. Higher-risk cases can remain draft-only throughout the engagement.",
      },
      {
        question: "Do we have to replace our current tools?",
        answer:
          "No. The point is to connect one recurring input to the system your team already relies on, then prove the path before expanding it.",
      },
    ],
    cta: {
      publicLabel: "Start the document workflow audit",
      publicBody:
        "Send one representative input, the fields you need extracted, and the destination system. Dali will reply with a narrow acceptance test and the fixed scope boundary.",
      intakeFields: [
        "One representative email, document, form, or row",
        "Fields and validation rules required in the output",
        "CRM, ERP, tracker, or task system to update",
        "Who should review exceptions before a write",
      ],
      upworkLabel: "See what to send in Upwork",
      upworkBody:
        "Reply in Upwork with one representative input, the required output fields, and the target system. Dali will turn those into the acceptance test for the first milestone.",
    },
  },
  "knowledge-assistant": {
    slug: "knowledge-assistant",
    name: "Knowledge Assistant",
    summary:
      "A packaged solution for teams that need a reliable first answer from their internal knowledge, without inventing certainty where the docs are weak.",
    accent: "#1E3A8A",
    accentSoft: "#E9EDFF",
    tint: "#fff6f5",
    metadata: {
      title: "Knowledge Assistant | Dali",
      description:
        "Packaged solution to search internal docs, cite the right source, draft answers, and abstain safely when knowledge is incomplete or conflicting.",
    },
    hero: {
      eyebrow: "Packaged solution",
      title: "Give the team answers it can verify.",
      lead:
        "Dali packages one permission-aware knowledge workflow across the documents and tools the team already trusts, with citations for factual answers and a clear refusal path when the evidence is weak.",
      supportLine:
        "Best fit for support, operations, and internal enablement teams where the same questions keep interrupting the same experts.",
    },
    workflow: {
      label: "Workflow diagram",
      intake: ["Docs", "Past answers", "Policy notes"],
      agentLabel: "Knowledge assistant agent",
      review: ["Missing sources", "Conflicting guidance", "Sensitive requests"],
      outcomes: ["Cited answer", "Suggested next step", "Escalation brief"],
    },
    contrast: {
      painTitle: "What it replaces",
      painPoints: [
        "Teams searching across drives, chats, and old tickets for the same answer again.",
        "Subject-matter experts becoming the default search engine for routine questions.",
        "Answers getting copied forward without anyone knowing whether the source is still valid.",
      ],
      outcomeTitle: "What it creates",
      outcomePoints: [
        "A first-pass answer that points back to the source material used.",
        "A clear abstain path when the knowledge base cannot support a confident answer.",
        "A repeatable pattern for keeping one source set useful without pretending the whole company is now organized.",
      ],
    },
    pilot: {
      label: "Exact fixed scope boundary",
      fixedOutcome:
        "One team or source bundle, one permission model, one answer surface, citations for every factual response, and refusal behavior when evidence is missing.",
      includes: [
        "1 curated document set or folder group",
        "1 user audience, for example internal ops or support staff",
        "Citation-first answers with confidence-aware escalation",
        "Question logging so gaps in the knowledge base stay visible",
      ],
      excludes: [
        "Open-ended research outside the approved source set",
        "Silent guessing when no grounded answer exists",
        "A broad enterprise search replacement",
      ],
    },
    integrations: {
      label: "Integrations and examples",
      intro:
        "The package works best when the source material already exists, even if it is imperfect, and the team knows which repository should count as approved.",
      items: [
        "Notion, Google Drive, Confluence, or an internal docs folder",
        "Slack or chat intake for internal questions",
        "Zendesk, Intercom, or a support triage channel for draft answers",
        "Ticket or issue systems for escalation when docs are incomplete",
      ],
    },
    guardrails: {
      label: "Guardrails and approval",
      intro:
        "The assistant is designed to cite, abstain, and escalate before it is allowed to sound smooth but wrong.",
      items: [
        "Answers include the source used or clearly state that no source was found.",
        "Conflicting documents trigger escalation instead of confidence theater.",
        "Sensitive topics can be forced into review, even when a source exists.",
        "Question logs expose where the knowledge base needs cleanup after launch.",
      ],
    },
    validation: {
      acceptanceTest:
        "Evaluate 30 real questions against the approved source set. Pass only if every factual answer includes a supporting citation or explicit refusal, permission violations stay at 0, and reviewer acceptance reaches at least 90% on questions the source set should answer.",
      measures: [
        "Answers with valid citations",
        "Correct abstention and escalation rate",
        "Permission-boundary test results",
        "Retrieval latency",
        "Recurring unanswered question themes",
      ],
      commercialModel:
        "The audit fixes the source set, audience, and evaluation questions. Dali then quotes one fixed-scope, fixed-price package. Build begins only after the boundary is approved.",
    },
    delivery: [
      {
        title: "Curate the approved source set",
        body:
          "We choose the documents that count, remove obvious noise, and define the audience so the package solves a bounded knowledge problem instead of a vague one.",
      },
      {
        title: "Test grounded answers",
        body:
          "We run real questions against the source set, tighten the retrieval and answer rules, and define where abstention should win over speculation.",
      },
      {
        title: "Launch the first-answer layer",
        body:
          "The assistant goes live for the chosen audience with citations, escalation paths, and logs that show where the source material still fails.",
      },
    ],
    fit: {
      fit: [
        "The same questions recur often enough to create interruption cost.",
        "You can name which documents should be treated as approved sources.",
        "A first answer is useful even if a human still handles the harder cases.",
      ],
      notFit: [
        "Your core knowledge does not exist in usable documents yet.",
        "You want the assistant to improvise across the open internet.",
        "Nobody can own the escalations or source cleanup after launch.",
      ],
    },
    faqs: [
      {
        question: "Can this answer customers directly?",
        answer:
          "It can, but the safer first step is usually an internal or draft-first workflow. Direct customer answers make sense only when the source material is stable and the risk is low.",
      },
      {
        question: "What makes this different from a generic chatbot?",
        answer:
          "The package is scoped around an approved source set, explicit abstention, and operational escalation. It is meant to be dependable, not just conversational.",
      },
      {
        question: "Do we need perfect docs first?",
        answer:
          "No. The source set needs to be good enough for one audience and one use case. The package should expose the remaining gaps instead of hiding them.",
      },
    ],
    cta: {
      publicLabel: "Start the knowledge workflow audit",
      publicBody:
        "If your team keeps losing time to repeat questions, send the source systems and the user group. Dali will reply with the smallest package that can answer safely.",
      intakeFields: [
        "Approved document repository or source set",
        "User group that needs the first-answer layer",
        "Two or three representative questions",
        "Owner for escalations and source cleanup",
      ],
      upworkLabel: "See what to send in Upwork",
      upworkBody:
        "Reply in Upwork with the source repository, audience, and escalation owner. Dali will answer with the fixed scope boundary for the assistant.",
    },
  },
  "voice-agents": {
    slug: "voice-agents",
    name: "Voice Design-Partner",
    summary:
      "A design-partner research package for one repeatable call lane, used to validate disclosure, routing, latency, and human handoff before a broader build.",
    accent: "#1E3A8A",
    accentSoft: "#E9EDFF",
    tint: "#fff7f2",
    metadata: {
      title: "Voice Design-Partner | Dali",
      description:
        "Design-partner research package for one routine call lane with explicit disclosure, routing, latency, summaries, and human takeover tests.",
    },
    hero: {
      eyebrow: "Design-partner research package",
      title: "Test one repeatable call flow before you buy a voice agent.",
      lead:
        "Dali scopes one supervised call lane for a single call type, measures disclosure, routing, summaries, latency, and transfer behavior, and uses that evidence to decide whether a paid voice package is justified.",
      supportLine:
        "Best fit for booking, qualification, status updates, and overflow coverage where speed matters but high-stakes judgment still belongs to people.",
    },
    workflow: {
      label: "Workflow diagram",
      intake: ["Call queue", "Scheduling rules", "FAQ docs"],
      agentLabel: "Voice design-partner test",
      review: ["Escalations", "Sensitive requests", "Callback exceptions"],
      outcomes: ["Answered call", "Booked slot", "Summary and handoff"],
    },
    contrast: {
      painTitle: "What it replaces",
      painPoints: [
        "Routine calls interrupting operators who should be handling complex work.",
        "Missed calls after hours or during busy periods with no consistent follow-up.",
        "Staff repeating the same booking, status, and intake questions all day.",
      ],
      outcomeTitle: "What it creates",
      outcomePoints: [
        "A disclosed first-pass call layer for one well-bounded call type.",
        "Consistent capture of caller details, summaries, and next actions.",
        "Immediate transfer or callback routing when the request exceeds the approved call path.",
      ],
    },
    pilot: {
      label: "Exact research boundary",
      fixedOutcome:
        "One call type, one language, one booking or routing path, rehearsed under supervision with disclosure and human takeover rules.",
      includes: [
        "1 routine inbound call flow, for example booking or status requests",
        "1 language and business-hours or overflow coverage boundary",
        "1 scheduling, routing, or summary handoff path",
        "Disclosure that the caller is speaking with an automated system",
      ],
      excludes: [
        "Payment collection over the phone",
        "Complex sales negotiation or medical, legal, or crisis advice",
        "Multi-language expansion inside the first package",
      ],
    },
    integrations: {
      label: "Integrations and examples",
      intro:
        "This package fits best when the routing path after the call is already defined and the business mainly needs faster coverage and cleaner summaries.",
      items: [
        "Twilio, SIP routing, or an existing cloud telephony provider",
        "Calendly, booking software, or a structured intake sheet",
        "CRM updates and owner alerts after every call outcome",
        "Telegram or Slack notifications for transfer and callback events",
      ],
    },
    guardrails: {
      label: "Guardrails and approval",
      intro:
        "Voice is high trust, so the package starts narrow and explicit. The system should be clear about what it is and where it stops.",
      items: [
        "Callers are told they are speaking with an automated assistant.",
        "Anything outside the approved call path routes to human follow-up.",
        "Summaries and logs are stored for review and operational tuning.",
        "Recording and privacy rules are aligned to the business context before launch.",
      ],
    },
    validation: {
      acceptanceTest:
        "Rehearse 30 scripted and unscripted calls. Pass only if automation is always disclosed, every call summary is logged, unauthorized actions stay at 0, routing is correct on at least 90% of the approved call lane, and every out-of-scope request reaches transfer or callback capture.",
      measures: [
        "Approved call-path completion rate",
        "Booking or routing success",
        "Correct transfer and callback rate",
        "Summary accuracy on reviewed calls",
      ],
      commercialModel:
        "The audit fixes one call lane, provider, handoff, and evaluation set. Dali quotes a build only if the design-partner evidence supports a viable paid package.",
    },
    delivery: [
      {
        title: "Choose the narrow call lane",
        body:
          "We select one call type with enough repetition to matter and enough structure to be handled safely inside a packaged solution.",
      },
      {
        title: "Rehearse transfers and edge cases",
        body:
          "We test the conversation path, booking logic, and takeover rules until it is obvious where the system should continue and where it should stop.",
      },
      {
        title: "Run the supervised test lane",
        body:
          "The chosen lane runs in a limited design-partner setting with disclosure, monitoring, and a clear callback or transfer path for everything outside scope.",
      },
    ],
    fit: {
      fit: [
        "You have repetitive inbound call types that already follow a script or checklist.",
        "Coverage gaps or missed calls are causing real operational loss.",
        "A clean handoff to a human already exists when the call gets complicated.",
      ],
      notFit: [
        "Every call is complex, consultative, or emotionally sensitive.",
        "You need a system that sounds human at any cost.",
        "The business cannot define what the voice agent is allowed to do.",
      ],
    },
    faqs: [
      {
        question: "Will callers know it is automated?",
        answer:
          "Yes. The package assumes explicit disclosure. Hidden automation is the wrong trust model for a voice workflow like this.",
      },
      {
        question: "Can it transfer to a person?",
        answer:
          "That is usually a core requirement. The package is built around a narrow call path plus clean transfer or callback logic for everything else.",
      },
      {
        question: "Is this for full contact-center replacement?",
        answer:
          "No. This is a fixed package for one call lane. If it works, broader expansion should be a separate decision with new boundaries.",
      },
    ],
    cta: {
      publicLabel: "Apply for a voice design-partner audit",
      publicBody:
        "Send one representative call script, current routing path, and required final action. Dali will reply with the audit scope, test matrix, and design-partner package boundary.",
      intakeFields: [
        "One routine inbound call type",
        "Current telephony and routing provider",
        "Booking, status, or intake action to complete",
        "Transfer or callback rule for out-of-scope requests",
      ],
      upworkLabel: "See what to send in Upwork",
      upworkBody:
        "Reply in Upwork with the call type, routing tool, and handoff rules. Dali will answer with the design-partner boundary, test matrix, and approval assumptions.",
    },
  },
  "vibe-code-rescue": {
    slug: "vibe-code-rescue",
    name: "Vibe-code Rescue",
    summary:
      "A fixed-scope package that triages secrets, payments, and admin paths on an AI-built MVP, decides patch vs rewrite per critical path, and leaves gates, a stop-switch, and a clean handoff package.",
    accent: "#0B3A4A",
    accentSoft: "#E4F0F3",
    tint: "#f4f9fa",
    metadata: {
      title: "Vibe-code Rescue | Dali",
      description:
        "Fixed-scope production hardening package for vibe-coded MVPs: triage secrets, payments, and admin, decide patch vs rewrite, add gates and a stop-switch, then hand off a package the team can own.",
    },
    hero: {
      eyebrow: "Packaged solution",
      title: "Harden the AI-built MVP before it costs you trust or money.",
      lead:
        "Dali runs a fixed-scope rescue on one product surface: find the bleeding paths (secrets, payments, admin, outbound actions), stop the worst risks, decide patch vs rewrite for each critical path, and ship gates, monitoring, and a stop-switch with a handoff the team can run.",
      supportLine:
        "Best fit for founders and operators who shipped with Lovable, Cursor, v0, or similar builders and now need production honesty without a shame lecture or a full rewrite of everything.",
    },
    workflow: {
      label: "Workflow diagram",
      intake: ["Repo or preview", "Payment & admin paths", "Secret surfaces"],
      agentLabel: "Rescue and harden package",
      review: ["Critical severity", "Patch vs rewrite", "Owner sign-off"],
      outcomes: ["Risk triage map", "Hardened paths", "Handoff package"],
    },
    contrast: {
      painTitle: "What it replaces",
      painPoints: [
        "A demo that works in preview while tokens, webhooks, or admin routes sit exposed in production.",
        "Endless chat-driven patches with no severity order, no stop-switch, and no clear ownership after the sprint.",
        "A binary choice between 'ship as-is' and 'throw everything away' when only a few paths actually need engineering depth.",
      ],
      outcomeTitle: "What it creates",
      outcomePoints: [
        "A severity-ordered triage of secrets, payments, admin, and outbound action paths.",
        "A written patch vs rewrite decision for each critical path, not a vague rewrite mandate.",
        "Gates, monitoring, and a stop-switch plus a handoff package the team can operate without Dali in the room.",
      ],
    },
    pilot: {
      label: "Exact fixed scope boundary",
      fixedOutcome:
        "One product surface, triage of high-risk paths, patch or rewrite decisions for those paths, production gates and a stop-switch, and a handoff package with owners and residual risks.",
      includes: [
        "1 product surface or deployable app (site, MVP, or admin-backed flow)",
        "Triage of secrets, payments, admin access, and high-impact outbound actions",
        "Patch vs rewrite decision notes for each critical path in scope",
        "Production gates, logging expectations, and an explicit stop-switch",
        "Handoff package: residual risk list, owners, and next engineering steps",
      ],
      excludes: [
        "Full rewrite of every feature or screen",
        "Open-ended product redesign or rebrand",
        "Multi-product portfolio rescue inside one package",
        "Shaming the team for using AI builders",
      ],
    },
    integrations: {
      label: "Integrations and examples",
      intro:
        "The package works on the stack you already shipped. We meet the product where it is: builder output, custom code, payments, and host - then harden the paths that can actually hurt you.",
      items: [
        "Lovable, v0, Cursor, Bolt, or mixed AI-assisted codebases",
        "Vercel, Netlify, Cloudflare, or similar preview-to-prod hosts",
        "Stripe, payment webhooks, promo codes, and checkout callbacks",
        "Supabase, Firebase, custom admin, or shared service-role keys",
        "Related reading on the Dali blog: how-we-rescue-vibe-coded-mvps, vibe-coded-site-hardening-checklist, security-audit-for-vibe-coded-websites, rewrite-vs-patch-vibe-code",
      ],
    },
    guardrails: {
      label: "Guardrails and approval",
      intro:
        "Rescue is not a silent rewrite. Severity, decisions, and residual risk stay visible to the owner before anything is treated as done.",
      items: [
        "Secrets and payment paths are treated as stop-the-bleeding work before cosmetic cleanup.",
        "Every critical path gets an explicit patch or rewrite call with a reason, not a vibe.",
        "A stop-switch and human gate stay in place for high-impact actions after the package.",
        "Residual risks that remain out of scope are written down with owners, not buried in chat.",
      ],
    },
    validation: {
      acceptanceTest:
        "Pass only if high-severity secret and payment findings are closed or explicitly accepted in writing, every in-scope critical path has a patch-or-rewrite decision, a stop-switch exists for high-impact actions, and the handoff package names residual risks plus owners.",
      measures: [
        "High-severity findings closed or owner-accepted",
        "Critical paths with written patch vs rewrite decisions",
        "Stop-switch and gate coverage on high-impact actions",
        "Handoff completeness: residual risks, owners, next steps",
      ],
      commercialModel:
        "The audit fixes the product surface, risk priorities, and acceptance bar. Dali then quotes one fixed-scope, fixed-price rescue package. Broader rewrite or multi-surface work is a separate decision after handoff.",
    },
    delivery: [
      {
        title: "Triage the bleeding paths",
        body:
          "We map secrets, payments, admin, and outbound action surfaces, rank severity, and freeze the package boundary so work starts where damage is real.",
      },
      {
        title: "Patch, rewrite, and gate",
        body:
          "We harden or rewrite each critical path in scope, add production gates and a stop-switch, and keep cosmetic debt out of the first package unless it blocks safety.",
      },
      {
        title: "Hand off ownership",
        body:
          "You get a package with decisions, residual risks, owners, and next engineering steps so the team can run the product without treating Dali as permanent on-call.",
      },
    ],
    fit: {
      fit: [
        "You shipped an MVP with AI builders or heavy AI-assisted coding and real users or payments are close.",
        "You can name one product surface and the paths that touch money, access, or outbound side effects.",
        "You want an honest patch vs rewrite map more than a full rebuild slogan.",
      ],
      notFit: [
        "You need a complete product rewrite of every screen in one engagement.",
        "There is no owner who can accept residual risk or prioritize severity.",
        "The product is still a pure prototype with no production host, users, or payment path.",
      ],
    },
    faqs: [
      {
        question: "Do we have to throw away the vibe-coded app?",
        answer:
          "Usually no. Most rescues keep the working surface and only rewrite paths that are unsafe or unmaintainable. Patch vs rewrite is decided per critical path. See rewrite-vs-patch-vibe-code on the Dali blog for the decision frame.",
      },
      {
        question: "Is this a full security audit?",
        answer:
          "It is a production-hardening package with a security-minded triage, not an enterprise pen-test theater. We focus on secrets, payments, admin, and high-impact actions first. Deeper audit notes live in security-audit-for-vibe-coded-websites and the vibe-coded-site-hardening-checklist on the blog.",
      },
      {
        question: "Will you shame us for shipping with AI tools?",
        answer:
          "No. Speed was rational. The package assumes builders helped you learn; the job now is production honesty. Our process notes are public in how-we-rescue-vibe-coded-mvps.",
      },
      {
        question: "What do we get at the end?",
        answer:
          "A severity-ordered triage, hardened or rewritten critical paths in scope, gates and a stop-switch, plus a handoff package with residual risks, owners, and next steps. Not a vague 'we improved the code' summary.",
      },
    ],
    cta: {
      publicLabel: "Start the vibe-code rescue audit",
      publicBody:
        "If the MVP is live or about to take money, send the product URL or repo context and the paths that worry you most. Dali will reply with the fixed rescue boundary and acceptance bar.",
      intakeFields: [
        "Product URL, preview, or repo context for one surface",
        "Payment, admin, auth, or outbound paths that already exist",
        "Where secrets, webhooks, or service keys currently live",
        "Owner who can accept residual risk and prioritize severity",
      ],
      upworkLabel: "See what to send in Upwork",
      upworkBody:
        "Reply in Upwork with the product surface, payment or admin paths, and the owner for risk decisions. Dali will answer with the fixed rescue package boundary and triage order.",
    },
  },
};

export const solutionsBySlug: Record<SolutionSlug, SolutionContent> =
  buildSolutionsCatalog(pilotSourcesBySlug, englishFamilyShells);

export const allSolutions = solutionSlugs.map((slug) => solutionsBySlug[slug]);

export function getSolutionBySlug(slug: string): SolutionContent | null {
  if (solutionSlugs.includes(slug as SolutionSlug)) {
    return solutionsBySlug[slug as SolutionSlug];
  }

  const redirected = legacySolutionRedirects[slug];
  if (redirected) {
    return solutionsBySlug[redirected];
  }

  return null;
}

export function getSolutionHref(slug: SolutionSlug) {
  return `/solutions/${slug}`;
}

export function getUpworkSolutionHref(slug: SolutionSlug) {
  return `/for/upwork/${slug}`;
}

export function buildPublicContactHref(
  solution: SolutionContent,
  locale: Locale = "en",
) {
  const subject = {
    en: `Dali ${solution.name} brief`,
    ru: `Dali: ${solution.name}`,
    ge: `Dali: ${solution.name}`,
    arm: `Dali: ${solution.name}`,
  }[locale];

  return buildMailtoHref(subject, buildPublicContactBody(solution, locale));
}

export function buildPublicContactBody(
  solution: SolutionContent,
  locale: Locale = "en",
) {
  const copy = {
    en: {
      greeting: "Hi Dali,",
      scope: `I want to scope the ${solution.name}.`,
      extra: "Anything else you should know:",
    },
    ru: {
      greeting: "Здравствуйте, Dali.",
      scope: `Хочу обсудить: ${solution.name}.`,
      extra: "Дополнительный контекст:",
    },
    ge: {
      greeting: "გამარჯობა, Dali.",
      scope: `მსურს განვიხილოთ: ${solution.name}.`,
      extra: "დამატებითი კონტექსტი:",
    },
    arm: {
      greeting: "Բարև, Dali։",
      scope: `Ցանկանում եմ քննարկել՝ ${solution.name}։`,
      extra: "Լրացուցիչ համատեքստ՝",
    },
  }[locale];

  return [
    copy.greeting,
    "",
    copy.scope,
    "",
    ...solution.cta.intakeFields.flatMap((field) => [`${field}:`, ""]),
    copy.extra,
  ].join("\n");
}

export function buildPublicMetadata(solution: SolutionContent): Metadata {
  return buildLocalizedPublicMetadata(solution, "en");
}

const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  ru: "ru_RU",
  ge: "ka_GE",
  arm: "hy_AM",
};

export function buildLocalizedPublicMetadata(
  solution: SolutionContent,
  locale: Locale,
): Metadata {
  const pathname = localizePath(getSolutionHref(solution.slug), locale);
  const url = `${siteUrl}${pathname}`;
  const languageAlternates = {
    ...Object.fromEntries(
      locales.map((alternateLocale) => [
        htmlLanguages[alternateLocale],
        localizePath(getSolutionHref(solution.slug), alternateLocale),
      ]),
    ),
    "x-default": getSolutionHref(solution.slug),
  };

  return {
    title: solution.metadata.title,
    description: solution.metadata.description,
    alternates: {
      canonical: pathname,
      languages: languageAlternates,
    },
    openGraph: {
      title: solution.metadata.title,
      description: solution.metadata.description,
      url,
      siteName: "Dali",
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => openGraphLocales[alternateLocale]),
      type: "website",
      images: [socialPreviewImage],
    },
    twitter: {
      card: "summary_large_image",
      title: solution.metadata.title,
      description: solution.metadata.description,
      images: [twitterPreviewImage],
    },
  };
}

export function buildUpworkMetadata(solution: SolutionContent): Metadata {
  const publicPath = getSolutionHref(solution.slug);
  const upworkUrl = `${siteUrl}${getUpworkSolutionHref(solution.slug)}`;

  return {
    title: `${solution.name} | Dali for Upwork`,
    description: solution.metadata.description,
    alternates: {
      canonical: publicPath,
    },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
    openGraph: {
      title: `${solution.name} | Dali for Upwork`,
      description: solution.metadata.description,
      url: upworkUrl,
      siteName: "Dali",
      locale: "en_US",
      type: "website",
      images: [socialPreviewImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${solution.name} | Dali for Upwork`,
      description: solution.metadata.description,
      images: [twitterPreviewImage],
    },
  };
}
