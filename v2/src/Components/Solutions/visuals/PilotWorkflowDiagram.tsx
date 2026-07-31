// Purpose: Premium motion-design hero card for every solution pilot page.
// Scope: Always-complete product mock. Motion only accents a calm 9s loop.
import { monoText, sansText } from "@/assets/fonts";
import { MockAvatar } from "@/Components/ui/MockAvatar";
import type { SolutionContent } from "../solutionContent";
import type { SolutionPageLabels } from "../solutionLabels";
import {
  pilotWorkflowMotion,
  type SourceCardMotion,
} from "./pilotWorkflowMotion";
import styles from "./PilotWorkflowDiagram.module.css";

const MSG_SEEDS = ["Felix", "Aneka", "Jordan", "Riley", "Sam"] as const;

type Props = {
  solution: SolutionContent;
  labels: SolutionPageLabels;
  intake: readonly string[];
  agentLabel: string;
  review: readonly string[];
  outcomes: readonly string[];
  workflowLabel: string;
};

function SourceInterior({ card }: { card: SourceCardMotion }) {
  if (card.kind === "messages") {
    return (
      <div className={styles.interior} aria-hidden="true">
        {card.lines.map((line, index) => (
          <div key={line} className={styles.msgRow}>
            <MockAvatar
              seed={MSG_SEEDS[index % MSG_SEEDS.length]}
              className={styles.avatar}
              size={12}
            />
            <span className={`${sansText.className} ${styles.msgText}`}>{line}</span>
            {card.badge && index === 0 ? (
              <span className={`${monoText.className} ${styles.chip}`}>{card.badge}</span>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  if (card.kind === "rules" || card.kind === "signals") {
    return (
      <div className={styles.interior} aria-hidden="true">
        {card.lines.map((line, index) => (
          <div
            key={line}
            className={`${styles.ruleRow} ${
              card.highlightIndex === index ? styles.ruleOn : ""
            }`}
          >
            <span className={styles.check} />
            <span className={`${sansText.className} ${styles.ruleText}`}>{line}</span>
          </div>
        ))}
      </div>
    );
  }

  // docs | fields
  return (
    <div className={styles.interior} aria-hidden="true">
      {card.lines.map((line, index) => (
        <div
          key={line}
          className={`${styles.docRow} ${
            card.highlightIndex === index ? styles.docOn : ""
          }`}
        >
          <span className={styles.fileIcon} />
          <span className={`${sansText.className} ${styles.docText}`}>{line}</span>
        </div>
      ))}
    </div>
  );
}

function OutcomeMark({ mark }: { mark: "cite" | "arrow" | "file" | "check" }) {
  if (mark === "cite") {
    return <span className={`${monoText.className} ${styles.markCite}`}>cite</span>;
  }
  if (mark === "arrow") {
    return <span className={styles.markArrow} aria-hidden="true" />;
  }
  if (mark === "file") {
    return <span className={styles.markFile} aria-hidden="true" />;
  }
  return <span className={styles.markCheck} aria-hidden="true" />;
}

export default function PilotWorkflowDiagram({
  solution,
  labels,
  intake,
  agentLabel,
  review,
  outcomes,
  workflowLabel,
}: Props) {
  const motion = pilotWorkflowMotion[solution.slug];
  const sources = [
    intake[0] ?? "Source A",
    intake[1] ?? "Source B",
    intake[2] ?? "Source C",
  ] as const;

  return (
    <figure
      className={styles.card}
      data-slug={solution.slug}
      data-pilot-diagram="true"
      aria-label={`${solution.name} ${labels.workflowAriaSuffix}`}
    >
      <header className={styles.header}>
        <p className={`${monoText.className} ${styles.eyebrow}`}>{workflowLabel}</p>
      </header>

      <div className={styles.body}>
        <div className={styles.sources}>
          {sources.map((title, index) => (
            <article
              key={title}
              className={`${styles.source} ${styles[`source${index + 1}` as const]}`}
            >
              <h3 className={`${monoText.className} ${styles.sourceLabel}`}>{title}</h3>
              <SourceInterior card={motion.sourceCards[index]} />
            </article>
          ))}
        </div>

        <div className={styles.connectors} aria-hidden="true">
          {[1, 2, 3].map((n) => (
            <div key={n} className={`${styles.connector} ${styles[`c${n}` as const]}`}>
              <span className={styles.rail} />
              <span className={styles.head} />
              <span className={styles.dot} />
            </div>
          ))}
        </div>

        <div className={styles.agent}>
          <strong className={`${monoText.className} ${styles.agentTitle}`}>
            {agentLabel}
          </strong>
          <div className={styles.agentStatus} aria-hidden="true">
            <span className={`${sansText.className} ${styles.st1}`}>
              {motion.processStatuses.reading}
            </span>
            <span className={`${sansText.className} ${styles.st2}`}>
              {motion.processStatuses.comparing}
            </span>
            <span className={`${sansText.className} ${styles.st3}`}>
              {motion.processStatuses.preparing}
            </span>
          </div>
        </div>

        <div className={styles.outcomes}>
          <article className={`${styles.outcome} ${styles.review}`}>
            <div className={styles.outcomeHead}>
              <h3 className={`${sansText.className} ${styles.outcomeTitle}`}>
                {labels.humanReview}
              </h3>
              <span className={`${monoText.className} ${styles.badge} ${styles.badgeReview}`}>
                {motion.reviewScene.status}
              </span>
            </div>

            {/* Baseline copy - always present, dims during active scene */}
            <p className={`${sansText.className} ${styles.outcomeBase}`}>
              {review.join(", ")}
            </p>

            {/* Active review scene overlays */}
            <div className={styles.reviewScene} aria-hidden="true">
              <p className={`${sansText.className} ${styles.alert}`}>
                {motion.reviewScene.alert}
              </p>
              {motion.reviewScene.highlight ? (
                <span className={`${sansText.className} ${styles.highlight}`}>
                  {motion.reviewScene.highlight}
                </span>
              ) : null}
              <div className={styles.assign}>
                <MockAvatar
                  seed="Review assignee"
                  className={styles.assignAvatar}
                  size={16}
                />
                <span className={`${sansText.className} ${styles.assignText}`}>
                  {motion.reviewScene.assignment}
                </span>
              </div>
            </div>
          </article>

          <article className={`${styles.outcome} ${styles.live}`}>
            <div className={styles.outcomeHead}>
              <h3 className={`${sansText.className} ${styles.outcomeTitle}`}>
                {labels.liveOutcome}
              </h3>
              <span className={`${monoText.className} ${styles.badge} ${styles.badgeReady}`}>
                {motion.outcomeScene.ready}
              </span>
            </div>

            <p className={`${sansText.className} ${styles.outcomeBase}`}>
              {outcomes.join(", ")}
            </p>

            <ul className={styles.liveScene} aria-hidden="true">
              {motion.outcomeScene.rows.map((row, index) => (
                <li
                  key={row.text}
                  className={`${styles.liveRow} ${styles[`live${index + 1}` as const]}`}
                >
                  <OutcomeMark mark={row.mark} />
                  <span className={sansText.className}>{row.text}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </figure>
  );
}
