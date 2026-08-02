// Purpose: Real product UI preview for solution pilot heroes.
// Scope: Maps each pilot slug into the shared AgentUxPreview shells.
"use client";

import AgentUxPreview, {
  type AgentUxKind,
} from "@/Components/Home/AgentUxPreview";
import type { SolutionContent } from "../solutionContent";
import type { SolutionPageLocale } from "../solutionLabels";
import styles from "./PilotProductPreview.module.css";

type Props = {
  solution: SolutionContent;
  locale?: SolutionPageLocale;
};

function tasksFor(solution: SolutionContent): readonly string[] {
  // Hero copy stays short - motion carries the story.
  switch (solution.slug) {
    case "conversation-control":
      return ["Inbound or support", "Approved draft", "CRM sync"];
    case "ops-knowledge":
      return ["Doc or question", "Validated output", "Audit trail"];
    case "voice-agents":
      return ["Book this week", "Two slots offered", "Handoff"];
    case "rescue-and-migration":
      return ["Triage failure modes", "Eval suite passing", "Cutover with logs"];
    default:
      return solution.workflow.outcomes.map((item) =>
        item.length > 28 ? `${item.slice(0, 26)}…` : item,
      );
  }
}

export default function PilotProductPreview({
  solution,
  locale = "en",
}: Props) {
  const kind = solution.previewKind as AgentUxKind;

  return (
    <div className={styles.frame} data-slug={solution.slug}>
      <div className={styles.chrome} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.url}>
          <img
            className={styles.urlFavicon}
            src="/favicon.svg"
            alt=""
            width={12}
            height={12}
            draggable={false}
          />
          {solution.workflow.agentLabel}
        </span>
        <span className={styles.live}>
          <i />
          Live
        </span>
      </div>
      <div className={styles.viewport}>
        <AgentUxPreview
          kind={kind}
          title={solution.name}
          summary={solution.summary}
          tasks={tasksFor(solution)}
          inputs={solution.workflow.intake}
          locale={locale}
          loop
        />
      </div>
    </div>
  );
}
