// Purpose: Merge pilot sources into public product families with fixed lanes.
// Scope: Conversation (lead+inbox), Ops Knowledge (docs+RAG), Rescue & Migration
// (agent rescue + assistants migration + vibe-code); voice passes through.
import type {
  PilotSourceContent,
  PilotSourceSlug,
  SolutionContent,
  SolutionLane,
  SolutionPricing,
  SolutionSlug,
} from "./solutionContent";

/** Approved fixed-price grid per pilot lane. Same numbers in every locale. */
export const pilotPricing: Record<PilotSourceSlug, SolutionPricing> = {
  "lead-response": { from: "$1,900", range: "$1,900-3,500" },
  "client-inbox": { from: "$1,900", range: "$1,900-3,500" },
  "operations-docs": { from: "$2,500", range: "$2,500-4,500" },
  "knowledge-assistant": { from: "$2,500", range: "$2,500-4,500" },
  "voice-agents": { from: "$4,000", range: "$4,000-8,000" },
  "vibe-code-rescue": { from: "$2,500", range: "$2,500-6,000" },
  "agent-rescue": { from: "$3,500", range: "$3,500-9,000" },
  "assistants-migration": { from: "$1,900", range: "$1,900-4,500" },
};

/** Family-page headline pricing: conversation is a two-lane bundle, ops and rescue are per starting lane. */
const familyPricing: Record<
  Extract<
    SolutionSlug,
    "conversation-control" | "ops-knowledge" | "rescue-and-migration"
  >,
  SolutionPricing
> = {
  "conversation-control": {
    from: "$3,500",
    range: "$3,500-6,000",
    note: "bundle",
  },
  "ops-knowledge": {
    from: "$2,500",
    range: "$2,500-4,500",
    note: "lane",
  },
  "rescue-and-migration": {
    from: "$1,900",
    range: "$1,900-9,000",
    note: "lane",
  },
};

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

/**
 * Rescue family carries its own localized boundary and acceptance test because
 * its three lanes are too different to synthesize a family boundary from them.
 */
export type RescueFamilyShellCopy = FamilyShellCopy & {
  boundary: {
    includes: readonly string[];
    excludes: readonly string[];
  };
  acceptanceTest: string;
};

export type FamilyShells = {
  conversation: FamilyShellCopy;
  opsKnowledge: FamilyShellCopy;
  rescue: RescueFamilyShellCopy;
};

/** Old public routes → new family slugs (SEO + Upwork mirrors). */
export const legacySolutionRedirects: Record<string, SolutionSlug> = {
  "lead-response": "conversation-control",
  "client-inbox": "conversation-control",
  "operations-docs": "ops-knowledge",
  "knowledge-assistant": "ops-knowledge",
  "vibe-code-rescue": "rescue-and-migration",
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
    pricing: pilotPricing[pilot.slug],
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
        "Pick one lane. Rehearse 20 real threads for that lane. The package passes only if every event is logged, sensitive cases stop for human review, and the CRM or case history stays accurate.",
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
    pricing: familyPricing["conversation-control"],
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
        "Pick one lane. Rehearse a fixed sample set. The package passes only if outputs are validated, exceptions route to a human, and every write or answer is auditable.",
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
    pricing: familyPricing["ops-knowledge"],
  };
}

function mergeRescue(
  agent: PilotSourceContent,
  migration: PilotSourceContent,
  vibe: PilotSourceContent,
  shell: RescueFamilyShellCopy,
): SolutionContent {
  return {
    slug: "rescue-and-migration",
    name: shell.name,
    summary: shell.summary,
    accent: vibe.accent,
    accentSoft: vibe.accentSoft,
    tint: vibe.tint,
    metadata: shell.metadata,
    hero: shell.hero,
    workflow: {
      label: agent.workflow.label,
      intake: uniqueStrings([
        agent.workflow.intake[0],
        migration.workflow.intake[0],
        vibe.workflow.intake[0],
      ]).slice(0, 3) as readonly string[],
      agentLabel: shell.agentLabel,
      review: uniqueStrings([
        agent.workflow.review[0],
        migration.workflow.review[0],
        vibe.workflow.review[0],
      ]).slice(0, 3) as readonly string[],
      outcomes: uniqueStrings([
        agent.workflow.outcomes[0],
        migration.workflow.outcomes[0],
        vibe.workflow.outcomes[0],
      ]).slice(0, 3) as readonly string[],
    },
    contrast: {
      painTitle: agent.contrast.painTitle,
      painPoints: uniqueStrings([
        agent.contrast.painPoints[0],
        migration.contrast.painPoints[0],
        vibe.contrast.painPoints[0],
      ]).slice(0, 3) as readonly string[],
      outcomeTitle: agent.contrast.outcomeTitle,
      outcomePoints: uniqueStrings([
        agent.contrast.outcomePoints[0],
        migration.contrast.outcomePoints[0],
        vibe.contrast.outcomePoints[0],
      ]).slice(0, 3) as readonly string[],
    },
    pilot: {
      label: shell.pilotLabel,
      fixedOutcome: shell.fixedOutcome,
      includes: shell.boundary.includes,
      excludes: shell.boundary.excludes,
    },
    lanes: [
      pilotToLane(agent, "agent-rescue"),
      pilotToLane(migration, "assistants-migration"),
      pilotToLane(vibe, "vibe-code"),
    ],
    integrations: {
      label: agent.integrations.label,
      intro: shell.summary,
      items: uniqueStrings([
        agent.integrations.items[0],
        migration.integrations.items[0],
        vibe.integrations.items[0],
        agent.integrations.items[1],
        migration.integrations.items[1],
      ]).slice(0, 5),
    },
    guardrails: {
      label: agent.guardrails.label,
      intro: agent.guardrails.intro,
      items: uniqueStrings([
        agent.guardrails.items[0],
        migration.guardrails.items[0],
        vibe.guardrails.items[0],
        agent.guardrails.items[1],
      ]).slice(0, 4),
    },
    validation: {
      acceptanceTest: shell.acceptanceTest,
      measures: uniqueStrings([
        agent.validation.measures[0],
        migration.validation.measures[1] ?? migration.validation.measures[0],
        vibe.validation.measures[0],
        agent.validation.measures[1],
        migration.validation.measures[3] ?? migration.validation.measures[0],
        vibe.validation.measures[2] ?? vibe.validation.measures[0],
      ]).slice(0, 6),
      commercialModel: agent.validation.commercialModel,
    },
    delivery: agent.delivery,
    fit: {
      fit: uniqueStrings([
        agent.fit.fit[0],
        migration.fit.fit[0],
        vibe.fit.fit[0],
        agent.fit.fit[1],
      ]).slice(0, 4),
      notFit: uniqueStrings([
        agent.fit.notFit[0],
        migration.fit.notFit[0],
        vibe.fit.notFit[0],
        agent.fit.notFit[1],
      ]).slice(0, 4),
    },
    faqs: [
      ...agent.faqs.slice(0, 1),
      ...migration.faqs.slice(0, 1),
      ...vibe.faqs.slice(0, 1),
    ],
    cta: shell.cta,
    previewKind: "operations-docs",
    pricing: familyPricing["rescue-and-migration"],
  };
}

function asFamilySolution(
  pilot: PilotSourceContent,
  slug: Extract<SolutionSlug, "voice-agents">,
  previewKind: SolutionContent["previewKind"],
): SolutionContent {
  return {
    ...pilot,
    slug,
    lanes: undefined,
    previewKind,
    pricing: pilotPricing[pilot.slug],
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
    "rescue-and-migration": mergeRescue(
      pilots["agent-rescue"],
      pilots["assistants-migration"],
      pilots["vibe-code-rescue"],
      shells.rescue,
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
      title: "One conversation system. Two fixed lanes.",
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
        "Tell us whether the first pain is inbound leads or existing client threads. Dali will reply with the lane boundary, approval map, and scope outline.",
      intakeFields: [
        "Starting lane: inbound leads or client support",
        "Channels and approximate weekly volume",
        "CRM or case-history system that must stay accurate",
        "Cases that must always wait for human review",
      ],
      upworkLabel: "See what to send in Upwork",
      upworkBody:
        "Reply in Upwork with the starting lane (leads or client support), channels, and CRM. Dali will answer with the fixed scope boundary for that lane.",
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
        "Reply in Upwork with the starting lane, sample inputs or docs, and destination system. Dali will answer with the fixed scope boundary for that lane.",
    },
  },
  rescue: {
    name: "Rescue & Migration",
    summary:
      "One recovery shell for AI systems under pressure: rescue an agent that fails in production, migrate off the Assistants API before shutdown, or harden a vibe-coded MVP - each as a fixed lane with its own acceptance bar.",
    metadata: {
      title: "Rescue & Migration | Dali",
      description:
        "Packaged product family for AI systems that need saving, not selling: agent rescue with evals and guardrails, Assistants API migration before the August 26, 2026 shutdown, and vibe-code MVP hardening.",
    },
    hero: {
      eyebrow: "Product family · three fixed lanes",
      title: "For the AI system you already have. Especially when it is failing.",
      lead:
        "Dali packages three recovery lanes: rescue an agent that stalls in production, migrate off the OpenAI Assistants API before the August 26, 2026 shutdown, or harden a vibe-coded MVP before it costs trust or money. Each lane is fixed scope with a written triage and its own acceptance test.",
      supportLine:
        "Best fit for teams that already shipped something with AI - an agent, an integration, an MVP - and need it to survive production, not a pitch to start over.",
    },
    pilotLabel: "Family boundary before you pick a lane",
    fixedOutcome:
      "One system under rescue, one fixed lane, one written triage or call mapping, one acceptance bar, and a handoff the team can own - not an open-ended retainer.",
    agentLabel: "Rescue & migration",
    boundary: {
      includes: [
        "Start with one lane: agent rescue, Assistants API migration, or vibe-code hardening",
        "1 system or integration in scope, whoever built it",
        "A written triage or call mapping before any fix",
        "An agreed acceptance bar and a rollback path",
      ],
      excludes: [
        "Open-ended rebuilds of everything at once",
        "New feature development disguised as rescue",
        "Ongoing retainer work before the first lane passes",
      ],
    },
    acceptanceTest:
      "Pick one lane. Each lane has its own pass condition: an agreed eval pass rate for agent rescue, a matching side-by-side run with zero-downtime cutover for the migration, closed high-severity findings for vibe-code rescue. The family passes when the chosen lane does.",
    cta: {
      publicLabel: "Start the rescue audit",
      publicBody:
        "Tell us which system is under pressure: a failing agent, an Assistants API integration, or a vibe-coded MVP. Dali will reply with the lane boundary, the triage plan, and the acceptance bar.",
      intakeFields: [
        "Starting lane: agent rescue, Assistants API migration, or vibe-code hardening",
        "Who built the system and what stack it runs on",
        "Where it fails or what deadline it faces",
        "Owner who can approve scope and accept residual risk",
      ],
      upworkLabel: "See what to send in Upwork",
      upworkBody:
        "Reply in Upwork with the starting lane, the stack, and where it fails or what deadline applies. Dali will answer with the fixed scope boundary for that lane.",
    },
  },
};
