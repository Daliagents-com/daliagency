import type {
  PilotSourceSlug,
  SolutionContent,
  SolutionSlug,
} from "../solutionContent";
import type { SolutionPageLabels } from "../solutionLabels";

type OverviewCard = {
  title: string;
  summary: string;
  tasks: readonly string[];
};

/** Lane cards under a product family (homepage multi-pilot panel). */
export type LaneCardKey = Extract<
  PilotSourceSlug,
  | "lead-response"
  | "client-inbox"
  | "operations-docs"
  | "knowledge-assistant"
>;

type OverviewStep = {
  title: string;
  body: string;
};

type OverviewProof = {
  title: string;
  body: string;
};

type OverviewFounder = {
  name: string;
  role: string;
  alt: string;
  body: string;
};

type OverviewFaq = {
  question: string;
  answer: string;
};

export type SolutionsOverviewCopy = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    supportLine: string;
  };
  diagram: {
    ariaLabel: string;
    label: string;
    inputs: readonly [string, string, string];
    agent: string;
    reviewTitle: string;
    reviewBody: string;
    actionTitle: string;
    actionBody: string;
  };
  solutions: {
    kicker: string;
    title: string;
    beforeLabel: string;
    before: readonly [string, string, string];
    afterLabel: string;
    after: readonly [string, string, string];
    packagedPilot: string;
    researchLane: string;
    viewPilot: string;
    viewResearch: string;
    /** Homepage #agent-solutions: Conversation family panel chrome. */
    responseLane: {
      title: string;
      summary: string;
      eyebrow: string;
      pilotLabel: string;
    };
    /** Homepage #agent-solutions: Ops & Knowledge family panel chrome. */
    opsKnowledgeLane: {
      title: string;
      summary: string;
      eyebrow: string;
      pilotLabel: string;
    };
    /** Family-level cards (index / grid). */
    cards: Record<SolutionSlug, OverviewCard>;
    /** Fixed lanes inside Conversation + Ops families. */
    laneCards: Record<LaneCardKey, OverviewCard>;
  };
  process: {
    kicker: string;
    title: string;
    steps: readonly [OverviewStep, OverviewStep, OverviewStep];
  };
  proof: {
    kicker: string;
    title: string;
    viewProject: string;
    cards: readonly [OverviewProof, OverviewProof, OverviewProof];
  };
  trust: {
    kicker: string;
    title: string;
    points: readonly [string, string, string, string];
  };
  about: {
    kicker: string;
    title: string;
    founders: readonly [OverviewFounder, OverviewFounder];
  };
  faq: {
    kicker: string;
    title: string;
    items: readonly OverviewFaq[];
  };
  contact: {
    kicker: string;
    title: string;
    body: string;
    cta: string;
  };
};

export type LocalizedSolutionsBundle = {
  overview: SolutionsOverviewCopy;
  details: Record<SolutionSlug, SolutionContent>;
  labels: SolutionPageLabels;
};
