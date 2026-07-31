import { solutionsBySlug } from "../solutionContent";
import { englishLabels } from "../solutionLabels";
import type { LocalizedSolutionsBundle } from "./types";

export const englishSolutionsBundle = {
  overview: {
    metadata: {
      title: "Dali - AI Agents & Workflow Automation",
      description:
        "Production AI agents and workflow automation built inside the business tools your team already uses, from intake and operations to support and internal knowledge work.",
    },
    hero: {
      eyebrow: "AI agents for real operations",
      title: "Put repetitive work on autopilot.",
      lead:
        "Dali maps one high-cost workflow, builds a production AI agent inside the tools the client already uses, and launches it with human review, monitoring, and full ownership.",
      primaryCta: "Start a workflow audit",
      secondaryCta: "See packaged pilots",
      supportLine:
        "One workflow. One acceptance test. No platform migration.",
    },
    diagram: {
      ariaLabel: "Workflow diagram",
      label: "Existing inputs",
      inputs: ["Inbox", "CRM", "Spreadsheet"],
      agent: "Dali agent",
      reviewTitle: "Human review",
      reviewBody: "Approvals, edge cases, final sign-off",
      actionTitle: "Live action",
      actionBody: "Replies, updates, tasks, routed follow-ups",
    },
    solutions: {
      // Section identity is numbered in AIHome from navigation.solutions.
      // This field is kept for type parity / non-nav references.
      kicker: "Solutions",
      title: "Replace operational drag with one tightly scoped system.",
      beforeLabel: "Before",
      before: [
        "Leads wait in shared inboxes.",
        "Ops work disappears between chat, docs, and sheets.",
        "Staff repeat the same reading, routing, and updating.",
      ],
      afterLabel: "After",
      after: [
        "The agent handles first-pass work instantly.",
        "Humans review only what actually needs judgment.",
        "The workflow becomes visible, measurable, and owned.",
      ],
      packagedPilot: "Packaged pilot",
      researchLane: "Research lane",
      viewPilot: "View pilot",
      viewResearch: "View research lane",
      responseLane: {
        title: "Lead & Client Response",
        summary:
          "One response surface for inbound leads and existing customer threads: draft, ground, gate sensitive actions, and keep CRM moving.",
        eyebrow: "Packaged pilots",
        pilotLabel: "Open pilots",
      },
      cards: {
        "lead-response": {
          title: "Lead Response Agent",
          summary:
            "Reply faster, qualify earlier, and keep every inbound lead moving.",
          tasks: [
            "Triage contact forms, email, WhatsApp, or Telegram inquiries",
            "Draft personalized first replies with qualification questions",
            "Update CRM stages, owners, and follow-up tasks automatically",
          ],
        },
        "client-inbox": {
          title: "Client Inbox Agent",
          summary:
            "Answer routine customer threads with approved context, CRM history, and a visible handoff.",
          tasks: [
            "Ground replies in approved policies, files, and past cases",
            "Log the conversation and next action in the existing CRM",
            "Stop sensitive requests, media, or unsupported answers for review",
          ],
        },
        "operations-docs": {
          title: "Operations Agent",
          summary:
            "Handle routine back-office work before it turns into team drag.",
          tasks: [
            "Turn inbox requests into tracker updates and routed tasks",
            "Reconcile spreadsheets, status fields, and recurring exceptions",
            "Prepare approvals, summaries, and handoff notes for staff",
          ],
        },
        "knowledge-assistant": {
          title: "Internal Knowledge Agent",
          summary:
            "Give the team a reliable first layer for repetitive questions.",
          tasks: [
            "Search SOPs, docs, and past cases before suggesting next steps",
            "Draft support answers and escalation context for human reviewers",
            "Keep internal knowledge organized as products and policies change",
          ],
        },
        "voice-agents": {
          title: "Voice Design-Partner Pilot",
          summary:
            "Prove one repeatable call flow before widening the system.",
          tasks: [
            "Qualify one routine inbound call type",
            "Book the next step and write a structured CRM summary",
            "Transfer hard cases to a person without losing context",
          ],
        },
      },
    },
    process: {
      kicker: "Process",
      title: "Three steps from messy workflow to live system.",
      steps: [
        {
          title: "Audit",
          body:
            "We map one workflow end to end, quantify where time leaks out, and define the exact approval points that must stay human.",
        },
        {
          title: "Build & replay",
          body:
            "We build the agent inside the stack already in use, then replay real cases until outputs are reliable and edge cases are visible.",
        },
        {
          title: "Launch & improve",
          body:
            "The workflow goes live with monitoring, exception handling, and a tight feedback loop so the system keeps getting sharper after launch.",
        },
      ],
    },
    proof: {
      kicker: "Proof",
      title: "Built by a team that already ships real systems.",
      viewProject: "View project",
      cards: [
        {
          title: "agents.ge",
          body:
            "Proof that Dali can scope, design, and ship an AI-native product from concept through production engineering.",
        },
        {
          title: "Stay & Work Georgia",
          body:
            "Proof of structured product execution for a service business with complex operations and trust-sensitive user journeys.",
        },
        {
          title: "Delivery Setup",
          body:
            "Proof of systems thinking for operator-heavy businesses where process clarity and dependable handoffs matter every day.",
        },
      ],
    },
    trust: {
      kicker: "Trust by design",
      title: "Practical constraints are part of the offer.",
      points: [
        "Works inside the tools the team already uses",
        "Human approval stays in the loop where risk is real",
        "Monitoring and exception handling are part of launch, not an afterthought",
        "The client owns the code, data, prompts, and operating IP",
      ],
    },
    about: {
      kicker: "About",
      title: "Engineering and operations in the same room.",
      founders: [
        {
          name: "David",
          role: "Engineering",
          alt: "David, Dali engineering lead",
          body:
            "Designs the workflow logic, integration boundaries, and production agent behavior so automation stays dependable under real operational load.",
        },
        {
          name: "Liana",
          role: "Operations",
          alt: "Liana, Dali operations lead",
          body:
            "Shapes process clarity, exception handling, and rollout discipline so the system fits the way a team actually works day to day.",
        },
      ],
    },
    faq: {
      kicker: "FAQ",
      title: "Clear boundaries before anything gets built.",
      items: [
        {
          question: "Is this a fit for every company?",
          answer:
            "No. The best fit is a team with one repetitive workflow that already happens often enough to justify real operational cleanup and automation.",
        },
        {
          question: "What does the 30-day scope actually cover?",
          answer:
            "One focused workflow. We choose the highest-friction path, build the operational logic around it, and get that system live before considering anything wider.",
        },
        {
          question: "Do we need to change our tools or migrate platforms?",
          answer:
            "Usually not. The default approach is to integrate with the inboxes, CRMs, spreadsheets, docs, and messaging systems already used by the team.",
        },
        {
          question: "How do you handle data and security?",
          answer:
            "We minimize access, define approval boundaries, and keep the workflow observable. Sensitive actions can be routed through explicit human review instead of full autonomy.",
        },
        {
          question: "Do we need an internal AI team to run this?",
          answer:
            "No. The point is to make one workflow usable by the team that already owns it, without requiring a separate internal AI function to keep it alive.",
        },
        {
          question: "What happens after launch?",
          answer:
            "Dali can stay involved for monitoring and iteration, or hand over documentation and ownership so the client team can operate the workflow directly.",
        },
      ],
    },
    contact: {
      kicker: "Contact",
      title: "Start with the workflow that costs the most attention today.",
      body:
        "Dali audits the workflow, proposes the approval model, and shows what can realistically go live in a focused 30-day engagement.",
      cta: "Start a workflow audit",
    },
  },
  details: solutionsBySlug,
  labels: englishLabels,
} satisfies LocalizedSolutionsBundle;
