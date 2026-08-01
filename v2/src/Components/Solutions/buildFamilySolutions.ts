// Purpose: Merge pilot sources into public product families with fixed lanes.
// Scope: Conversation (lead+inbox) and Ops Knowledge (docs+RAG); voice/rescue pass through.
import type {
  PilotSourceContent,
  PilotSourceSlug,
  SolutionContent,
  SolutionLane,
  SolutionSlug,
} from "./solutionContent";

export type FamilyShellCopy = {
  name: string;
  summary: string;
  metadata: {
    title: string;
    description: string;
  };
  hero: SolutionContent["hero"];
  pilotLabel: string;
  fixedOutcome: string;
  agentLabel: string;
  cta: SolutionContent["cta"];
};

export type FamilyShells = {
  conversation: FamilyShellCopy;
  opsKnowledge: FamilyShellCopy;
};

/** Old public routes → new family slugs (SEO + Upwork mirrors). */
export const legacySolutionRedirects: Record<string, SolutionSlug> = {
  "lead-response": "conversation-control",
  "client-inbox": "conversation-control",
  "operations-docs": "ops-knowledge",
  "knowledge-assistant": "ops-knowledge",
};

function uniqueStrings(items: readonly string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    if (seen.has(item)) continue;
    seen.add(item);
    out.push(item);
  }
  return out;
}

function pilotToLane(
  pilot: PilotSourceContent,
  id: string,
): SolutionLane {
  return {
    id,
    name: pilot.name,
    summary: pilot.summary,
    fixedOutcome: pilot.pilot.fixedOutcome,
    includes: pilot.pilot.includes,
    excludes: pilot.pilot.excludes,
    acceptanceTest: pilot.validation.acceptanceTest,
    sourceSlug: pilot.slug,
  };
}

function mergeConversation(
  lead: PilotSourceContent,
  inbox: PilotSourceContent,
  shell: FamilyShellCopy,
): SolutionContent {
  return {
    slug: "conversation-control",
    name: shell.name,
    summary: shell.summary,
    accent: lead.accent,
    accentSoft: lead.accentSoft,
    tint: lead.tint,
    metadata: shell.metadata,
    hero: shell.hero,
    workflow: {
      label: lead.workflow.label,
      intake: uniqueStrings([
        ...lead.workflow.intake,
        ...inbox.workflow.intake,
      ]).slice(0, 3) as [string, string, string] | string[] as readonly string[],
      agentLabel: shell.agentLabel,
      review: uniqueStrings([
        ...lead.workflow.review,
        ...inbox.workflow.review,
      ]).slice(0, 3) as readonly string[],
      outcomes: uniqueStrings([
        ...lead.workflow.outcomes,
        ...inbox.workflow.outcomes,
      ]).slice(0, 3) as readonly string[],
    },
    contrast: {
      painTitle: lead.contrast.painTitle,
      painPoints: uniqueStrings([
        lead.contrast.painPoints[0],
        inbox.contrast.painPoints[0],
        lead.contrast.painPoints[1] ?? inbox.contrast.painPoints[1],
      ]).slice(0, 3) as readonly string[],
      outcomeTitle: lead.contrast.outcomeTitle,
      outcomePoints: uniqueStrings([
        lead.contrast.outcomePoints[0],
        inbox.contrast.outcomePoints[0],
        lead.contrast.outcomePoints[1] ?? inbox.contrast.outcomePoints[1],
      ]).slice(0, 3) as readonly string[],
    },
    pilot: {
      label: shell.pilotLabel,
      fixedOutcome: shell.fixedOutcome,
      includes: [
        "Start with one lane: inbound leads or existing client support",
        "1 channel cluster and 1 CRM or case-history path",
        "1 approved reply playbook or source set",
        "Visible human escalation for sensitive cases",
      ],
      excludes: [
        "Replacing the whole sales or support team on day one",
        "Autonomous pricing, refunds, or irreversible account actions",
        "Open-ended answers outside the approved policy set",
      ],
    },
    lanes: [pilotToLane(lead, "inbound"), pilotToLane(inbox, "support")],
    integrations: {
      label: lead.integrations.label,
      intro: shell.summary,
      items: uniqueStrings([
        ...lead.integrations.items,
        ...inbox.integrations.items,
      ]).slice(0, 5),
    },
    guardrails: {
      label: lead.guardrails.label,
      intro: lead.guardrails.intro,
      items: uniqueStrings([
        ...lead.guardrails.items,
        ...inbox.guardrails.items,
      ]).slice(0, 4),
    },
    validation: {
      acceptanceTest:
        "Pick one lane. Rehearse 20 real threads for that lane. The pilot passes only if every event is logged, sensitive cases stop for human review, and the CRM or case history stays accurate.",
      measures: uniqueStrings([
        ...lead.validation.measures,
        ...inbox.validation.measures,
      ]).slice(0, 6),
      commercialModel: lead.validation.commercialModel,
    },
    delivery: lead.delivery,
    fit: {
      fit: uniqueStrings([...lead.fit.fit, ...inbox.fit.fit]).slice(0, 4),
      notFit: uniqueStrings([...lead.fit.notFit, ...inbox.fit.notFit]).slice(
        0,
        4,
      ),
    },
    faqs: [...lead.faqs.slice(0, 2), ...inbox.faqs.slice(0, 1)],
    cta: shell.cta,
    previewKind: "lead-response",
  };
}

function mergeOpsKnowledge(
  ops: PilotSourceContent,
  knowledge: PilotSourceContent,
  shell: FamilyShellCopy,
): SolutionContent {
  return {
    slug: "ops-knowledge",
    name: shell.name,
    summary: shell.summary,
    accent: ops.accent,
    accentSoft: ops.accentSoft,
    tint: ops.tint,
    metadata: shell.metadata,
    hero: shell.hero,
    workflow: {
      label: ops.workflow.label,
      intake: uniqueStrings([
        ...ops.workflow.intake,
        ...knowledge.workflow.intake,
      ]).slice(0, 3) as readonly string[],
      agentLabel: shell.agentLabel,
      review: uniqueStrings([
        ...ops.workflow.review,
        ...knowledge.workflow.review,
      ]).slice(0, 3) as readonly string[],
      outcomes: uniqueStrings([
        ...ops.workflow.outcomes,
        ...knowledge.workflow.outcomes,
      ]).slice(0, 3) as readonly string[],
    },
    contrast: {
      painTitle: ops.contrast.painTitle,
      painPoints: uniqueStrings([
        ops.contrast.painPoints[0],
        knowledge.contrast.painPoints[0],
        ops.contrast.painPoints[1] ?? knowledge.contrast.painPoints[1],
      ]).slice(0, 3) as readonly string[],
      outcomeTitle: ops.contrast.outcomeTitle,
      outcomePoints: uniqueStrings([
        ops.contrast.outcomePoints[0],
        knowledge.contrast.outcomePoints[0],
        ops.contrast.outcomePoints[1] ?? knowledge.contrast.outcomePoints[1],
      ]).slice(0, 3) as readonly string[],
    },
    pilot: {
      label: shell.pilotLabel,
      fixedOutcome: shell.fixedOutcome,
      includes: [
        "Start with one lane: documents-to-actions or internal Q&A",
        "1 approved source or input set with clear ownership",
        "1 destination system or answer surface",
        "Human exception path for low-confidence cases",
      ],
      excludes: [
        "Company-wide knowledge platform rebuild as the first step",
        "Autonomous writes without validation or audit trail",
        "Answers without citations or an approved source bundle",
      ],
    },
    lanes: [
      pilotToLane(ops, "docs-actions"),
      pilotToLane(knowledge, "knowledge"),
    ],
    integrations: {
      label: ops.integrations.label,
      intro: shell.summary,
      items: uniqueStrings([
        ...ops.integrations.items,
        ...knowledge.integrations.items,
      ]).slice(0, 5),
    },
    guardrails: {
      label: ops.guardrails.label,
      intro: ops.guardrails.intro,
      items: uniqueStrings([
        ...ops.guardrails.items,
        ...knowledge.guardrails.items,
      ]).slice(0, 4),
    },
    validation: {
      acceptanceTest:
        "Pick one lane. Rehearse a fixed sample set. The pilot passes only if outputs are validated, exceptions route to a human, and every write or answer is auditable.",
      measures: uniqueStrings([
        ...ops.validation.measures,
        ...knowledge.validation.measures,
      ]).slice(0, 6),
      commercialModel: ops.validation.commercialModel,
    },
    delivery: ops.delivery,
    fit: {
      fit: uniqueStrings([...ops.fit.fit, ...knowledge.fit.fit]).slice(0, 4),
      notFit: uniqueStrings([
        ...ops.fit.notFit,
        ...knowledge.fit.notFit,
      ]).slice(0, 4),
    },
    faqs: [...ops.faqs.slice(0, 2), ...knowledge.faqs.slice(0, 1)],
    cta: shell.cta,
    previewKind: "operations-docs",
  };
}

function asFamilySolution(
  pilot: PilotSourceContent,
  slug: Extract<SolutionSlug, "voice-agents" | "vibe-code-rescue">,
  previewKind: SolutionContent["previewKind"],
): SolutionContent {
  return {
    ...pilot,
    slug,
    lanes: undefined,
    previewKind,
  };
}

export function buildSolutionsCatalog(
  pilots: Record<PilotSourceSlug, PilotSourceContent>,
  shells: FamilyShells,
): Record<SolutionSlug, SolutionContent> {
  return {
    "conversation-control": mergeConversation(
      pilots["lead-response"],
      pilots["client-inbox"],
      shells.conversation,
    ),
    "ops-knowledge": mergeOpsKnowledge(
      pilots["operations-docs"],
      pilots["knowledge-assistant"],
      shells.opsKnowledge,
    ),
    "voice-agents": asFamilySolution(
      pilots["voice-agents"],
      "voice-agents",
      "voice-agents",
    ),
    "vibe-code-rescue": asFamilySolution(
      pilots["vibe-code-rescue"],
      "vibe-code-rescue",
      "operations-docs",
    ),
  };
}

export const englishFamilyShells: FamilyShells = {
  conversation: {
    name: "Conversation Control System",
    summary:
      "One supervised conversation shell for inbound leads and existing client threads, with fixed lanes, CRM write-back, and human gates.",
    metadata: {
      title: "Conversation Control System | Dali",
      description:
        "Packaged product family for inbound lead response and client inbox control: approved replies, qualification or grounding, CRM updates, and human escalation.",
    },
    hero: {
      eyebrow: "Product family · two fixed lanes",
      title: "One conversation system. Two fixed pilot lanes.",
      lead:
        "Dali packages a supervised AI conversation system for the inbox you already run. Start with inbound leads or existing client support, keep approvals visible, and expand only after one lane passes.",
      supportLine:
        "Best fit for service businesses and operators with real message volume who need speed without unsupervised agents.",
    },
    pilotLabel: "Family boundary before you pick a lane",
    fixedOutcome:
      "One product shell, one CRM or case-history path, one approval model, and one starting lane live with logs and escalation.",
    agentLabel: "Conversation control",
    cta: {
      publicLabel: "Start the conversation audit",
      publicBody:
        "Tell us whether the first pain is inbound leads or existing client threads. Dali will reply with the lane boundary, approval map, and pilot outline.",
      intakeFields: [
        "Starting lane: inbound leads or client support",
        "Channels and approximate weekly volume",
        "CRM or case-history system that must stay accurate",
        "Cases that must always wait for human review",
      ],
      upworkLabel: "See what to send in Upwork",
      upworkBody:
        "Reply in Upwork with the starting lane (leads or client support), channels, and CRM. Dali will answer with the fixed pilot boundary for that lane.",
    },
  },
  opsKnowledge: {
    name: "Ops & Knowledge System",
    summary:
      "One control loop for documents-to-actions and internal Q&A: approved sources, validated writes or cited answers, and an exception owner.",
    metadata: {
      title: "Ops & Knowledge System | Dali",
      description:
        "Packaged product family for operations document workflows and internal knowledge assistants with validation, citations, and human exceptions.",
    },
    hero: {
      eyebrow: "Product family · two fixed lanes",
      title: "Turn docs and tribal knowledge into one reliable ops loop.",
      lead:
        "Dali packages a supervised system that either turns recurring documents into validated actions or answers internal questions from an approved source set. Pick one lane first, then connect the loop.",
      supportLine:
        "Best fit for teams drowning in mail, PDFs, SOPs, and repeated internal questions.",
    },
    pilotLabel: "Family boundary before you pick a lane",
    fixedOutcome:
      "One source or input bundle, one destination or answer surface, one exception owner, and one starting lane live with an audit trail.",
    agentLabel: "Ops & knowledge",
    cta: {
      publicLabel: "Start the ops & knowledge audit",
      publicBody:
        "Tell us whether the first pain is documents-to-actions or internal Q&A. Dali will reply with the lane boundary and acceptance test.",
      intakeFields: [
        "Starting lane: documents-to-actions or internal knowledge",
        "Sample inputs or source set the team already trusts",
        "Destination system or answer surface",
        "Owner for exceptions and residual risk",
      ],
      upworkLabel: "See what to send in Upwork",
      upworkBody:
        "Reply in Upwork with the starting lane, sample inputs or docs, and destination system. Dali will answer with the fixed pilot boundary for that lane.",
    },
  },
};
