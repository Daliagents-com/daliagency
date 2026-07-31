// Purpose: Single config source for pilot hero workflow motion micro-details.
// Scope: Content only - layout and timing live in PilotWorkflowDiagram.

import type { SolutionSlug } from "../solutionContent";

export type SourceCardMotion = {
  kind: "docs" | "messages" | "rules" | "fields" | "signals";
  lines: readonly string[];
  badge?: string;
  highlightIndex?: number;
};

export type ProcessStatus = {
  reading: string;
  comparing: string;
  preparing: string;
};

export type ReviewScene = {
  alert: string;
  status: string;
  highlight?: string;
  assignment: string;
};

export type OutcomeScene = {
  rows: readonly {
    text: string;
    mark: "cite" | "arrow" | "file" | "check";
  }[];
  ready: string;
};

export type PilotWorkflowMotion = {
  sourceCards: readonly [SourceCardMotion, SourceCardMotion, SourceCardMotion];
  processStatuses: ProcessStatus;
  reviewScene: ReviewScene;
  outcomeScene: OutcomeScene;
};

const knowledge: PilotWorkflowMotion = {
  sourceCards: [
    {
      kind: "docs",
      lines: ["Refund policy", "SLA handbook", "Onboarding FAQ"],
      highlightIndex: 0,
    },
    {
      kind: "messages",
      lines: ["Refund window?", "Tier-2 SLA"],
      badge: "Match",
    },
    {
      kind: "rules",
      lines: ["Cite source", "Escalate conflicts", "Refuse if weak"],
      highlightIndex: 0,
    },
  ],
  processStatuses: {
    reading: "Reading context",
    comparing: "Comparing guidance",
    preparing: "Preparing response",
  },
  reviewScene: {
    alert: "Conflicting guidance detected",
    status: "Needs review",
    highlight: "Conflicting guidance",
    assignment: "Assigned to reviewer",
  },
  outcomeScene: {
    rows: [
      { text: "Cited answer ready", mark: "cite" },
      { text: "Next step suggested", mark: "arrow" },
      { text: "Brief attached", mark: "file" },
    ],
    ready: "Ready",
  },
};

const leadResponse: PilotWorkflowMotion = {
  sourceCards: [
    {
      kind: "fields",
      lines: ["Website form", "Budget noted", "Timeline: 2w"],
      highlightIndex: 0,
    },
    {
      kind: "messages",
      lines: ["Maya Chen", "Onboarding portal"],
      badge: "New",
    },
    {
      kind: "signals",
      lines: ["Fit: high", "Region ok", "No DNC"],
      highlightIndex: 0,
    },
  ],
  processStatuses: {
    reading: "Reading inquiry",
    comparing: "Scoring against playbook",
    preparing: "Drafting first reply",
  },
  reviewScene: {
    alert: "Custom pricing requested",
    status: "Needs owner",
    highlight: "Enterprise edge cases",
    assignment: "Assigned to sales lead",
  },
  outcomeScene: {
    rows: [
      { text: "First reply sent", mark: "check" },
      { text: "Qualification notes logged", mark: "cite" },
      { text: "CRM stage updated", mark: "arrow" },
    ],
    ready: "Synced",
  },
};

const clientInbox: PilotWorkflowMotion = {
  sourceCards: [
    {
      kind: "messages",
      lines: ["Thread #4821 · billing", "Customer asked for invoice copy"],
      badge: "Open",
    },
    {
      kind: "docs",
      lines: ["Policy: billing replies", "Approved template B-12"],
      highlightIndex: 1,
    },
    {
      kind: "fields",
      lines: ["CRM: active account", "Plan: Growth", "Last case: resolved"],
      highlightIndex: 0,
    },
  ],
  processStatuses: {
    reading: "Reading thread",
    comparing: "Checking policy",
    preparing: "Drafting reply",
  },
  reviewScene: {
    alert: "Sensitive action blocked",
    status: "Needs review",
    highlight: "Policy exceptions",
    assignment: "Assigned to support lead",
  },
  outcomeScene: {
    rows: [
      { text: "Grounded reply ready", mark: "check" },
      { text: "CRM history updated", mark: "cite" },
      { text: "Handoff package attached", mark: "file" },
    ],
    ready: "Ready",
  },
};

const operationsDocs: PilotWorkflowMotion = {
  sourceCards: [
    {
      kind: "docs",
      lines: ["Invoice_8841.pdf", "Vendor: Lambda Co", "Amount: 12,400"],
      highlightIndex: 0,
    },
    {
      kind: "fields",
      lines: ["PO missing", "Currency: USD", "Due: 14 days"],
      badge: "Check",
    },
    {
      kind: "rules",
      lines: ["Require PO > 5k", "No duplicate vendor", "Tax code required"],
      highlightIndex: 0,
    },
  ],
  processStatuses: {
    reading: "Extracting fields",
    comparing: "Validating rules",
    preparing: "Writing record",
  },
  reviewScene: {
    alert: "Missing required fields",
    status: "Needs review",
    highlight: "Missing fields",
    assignment: "Assigned to ops reviewer",
  },
  outcomeScene: {
    rows: [
      { text: "Validated record ready", mark: "check" },
      { text: "Task routed", mark: "arrow" },
      { text: "ERP row prepared", mark: "file" },
    ],
    ready: "Queued",
  },
};

const voiceAgents: PilotWorkflowMotion = {
  sourceCards: [
    {
      kind: "signals",
      lines: ["Queue: booking lane", "Language: EN", "Wait: 12s"],
      highlightIndex: 0,
    },
    {
      kind: "rules",
      lines: ["Disclose automation", "Business hours only", "Max 2 reschedules"],
      highlightIndex: 0,
    },
    {
      kind: "docs",
      lines: ["FAQ: hours & services", "Cancellation policy"],
      badge: "FAQ",
    },
  ],
  processStatuses: {
    reading: "Listening for intent",
    comparing: "Matching call path",
    preparing: "Confirming next step",
  },
  reviewScene: {
    alert: "Sensitive request detected",
    status: "Transfer ready",
    highlight: "Escalations",
    assignment: "Transfer to human agent",
  },
  outcomeScene: {
    rows: [
      { text: "Call answered", mark: "check" },
      { text: "Slot booked", mark: "arrow" },
      { text: "Summary attached", mark: "file" },
    ],
    ready: "Complete",
  },
};

const vibeCodeRescue: PilotWorkflowMotion = {
  sourceCards: [
    {
      kind: "docs",
      lines: ["Repo: preview MVP", "Host: Vercel prod", "Stack: AI-assisted"],
      highlightIndex: 0,
    },
    {
      kind: "fields",
      lines: ["Stripe webhook public", "Service key in client", "Admin: no gate"],
      badge: "Risk",
      highlightIndex: 1,
    },
    {
      kind: "rules",
      lines: ["Stop bleeding first", "Patch vs rewrite", "Owner accepts residual"],
      highlightIndex: 0,
    },
  ],
  processStatuses: {
    reading: "Triaging risk surfaces",
    comparing: "Ranking severity",
    preparing: "Choosing patch or rewrite",
  },
  reviewScene: {
    alert: "Secret exposed in client bundle",
    status: "Needs owner",
    highlight: "Critical severity",
    assignment: "Assigned to product owner",
  },
  outcomeScene: {
    rows: [
      { text: "Critical paths hardened", mark: "check" },
      { text: "Patch vs rewrite logged", mark: "cite" },
      { text: "Handoff package ready", mark: "file" },
    ],
    ready: "Owned",
  },
};

export const pilotWorkflowMotion: Record<SolutionSlug, PilotWorkflowMotion> = {
  "knowledge-assistant": knowledge,
  "lead-response": leadResponse,
  "client-inbox": clientInbox,
  "operations-docs": operationsDocs,
  "voice-agents": voiceAgents,
  "vibe-code-rescue": vibeCodeRescue,
};
