// Purpose: Keep customer-visible structural labels consistent across localized solution pages.
// Scope: Shared label shape and English defaults for the public detail-page renderer.
import type { Locale } from "@/i18n/config";

export type SolutionPageLocale = Locale;

export const englishLabels = {
  browseAllPilots: "Browse all pilots",
  copyDetailedBrief: "Copy the detailed brief",
  briefCopied: "Brief copied",
  keepConversationOnPlatform: "Keep the conversation on-platform",
  returnToUpwork: "Return to your Upwork thread and send the details above.",
  humanReview: "Human review",
  liveOutcome: "Live outcome",
  painVersusOutcome: "Pain versus outcome",
  contrastTitle: "Replace drag with one approved operating path.",
  pilotBoundary: "Pilot boundary",
  boundaryTitle: "Fixed scope before expansion.",
  included: "Included",
  excluded: "Deliberately out of scope",
  systemSurfaces: "System surfaces",
  surfacesTitle: "Integrations, examples, and control points.",
  acceptanceTest: "Acceptance test",
  validationTitle: "Know what counts as working.",
  passCondition: "Pilot pass condition",
  measures: "Measures reviewed with the team",
  deliveryEyebrow: "Three-step delivery",
  deliveryTitle: "One practical rollout path.",
  stepPrefix: "Step",
  fitCheck: "Fit check",
  fitTitle: "Strong fit, weak fit, and what not to force.",
  goodFit: "Good fit",
  notFit: "Not a fit yet",
  faq: "FAQ",
  faqTitle: "Practical questions before a pilot starts.",
  ctaEyebrow: "Call to action",
  ctaTitle: "Start with the narrowest useful pilot.",
  sendUpwork: "What to send in Upwork",
  sendDali: "What to send Dali",
  commercialModel: "Commercial model",
  commercialBody:
    "Dali does not ask you to buy a broad automation program upfront. We define one acceptance test, quote one pilot, build after agreement, and widen scope only if the first workflow passes.",
  workflowAriaSuffix: "workflow diagram",
  chooseLane: "Choose a fixed lane",
  lanesTitle: "One system shell. Two pilot scopes.",
  laneAcceptance: "Lane acceptance test",
  startWithLane: "Start with this lane",
};

export type SolutionPageLabels = {
  [Key in keyof typeof englishLabels]: string;
};
