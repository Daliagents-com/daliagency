// Purpose: Rescue console mock - failing agent → triage → stabilize → cutover story.
// Scope: Deadline banner + severity triage queue + health panel + Failing→Stabilized→Live strip.
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "../../AgentUxPreview.module.css";
import type { Copy } from "../copy";
import { Tag, Toolbar, useLiveStage } from "../shared";

const EASE = [0.16, 1, 0.3, 1] as const;

type Severity = "critical" | "high" | "medium";
type SeverityTone = "red" | "amber" | "neutral";

type Issue = {
  id: string;
  name: string;
  detail: string;
  code: string;
  severity: Severity;
  action: "Patch" | "Migrate" | "Rewrite";
};

const SEVERITY_LABEL: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
};

const SEVERITY_TONE: Record<Severity, SeverityTone> = {
  critical: "red",
  high: "amber",
  medium: "neutral",
};

// Illustrative rescue-console UI content, not client claims.
const ISSUES: readonly Issue[] = [
  {
    id: "refund",
    name: "Hallucinated refund promise",
    detail: "Support agent · prod",
    code: "AG",
    severity: "critical",
    action: "Patch",
  },
  {
    id: "threads",
    name: "/v1/threads state (deprecated)",
    detail: "Assistants API",
    code: "API",
    severity: "critical",
    action: "Migrate",
  },
  {
    id: "timeout",
    name: "Silent timeout x200",
    detail: "Webhook worker",
    code: "WH",
    severity: "high",
    action: "Patch",
  },
  {
    id: "prompt",
    name: "Prompt unversioned",
    detail: "No eval baseline",
    code: "PR",
    severity: "medium",
    action: "Rewrite",
  },
] as const;

const TRIAGE_COLUMNS = "1.7fr 0.62fr 0.62fr 0.95fr";

export function RescueUx({
  copy,
  live = false,
}: {
  copy: Copy;
  tasks: readonly string[];
  live?: boolean;
}) {
  const reduce = useReducedMotion();
  // 0 failing → 1 stop-switch armed → 2 stabilized (evals pass) → 3 cost down / migrate done → 4 live
  const stage = useLiveStage(live, 5, 1300);

  const healthTone = stage >= 4 ? "green" : stage >= 2 ? "amber" : "red";
  const healthLabel =
    stage >= 4 ? copy.live : stage >= 2 ? copy.stabilized : copy.failing;

  const issueStatus = (issue: Issue): { label: string; tone: SeverityTone | "green" | "blue" } => {
    if (issue.id === "threads") {
      return stage >= 3
        ? { label: copy.completed, tone: "green" }
        : { label: copy.inProgress, tone: "blue" };
    }
    if (issue.id === "prompt") {
      return { label: copy.queued, tone: "neutral" };
    }
    return { label: copy.completed, tone: "green" };
  };

  const healthNote =
    stage < 2
      ? "Deploy frozen · replaying prod traffic against evals"
      : stage < 4
        ? "Eval gate passed · cutover window approved"
        : "Cutover complete · monitoring stays on";

  const flowSteps = [
    { id: "failing", label: copy.failing, accent: "red", at: 0, doneAt: 2 },
    {
      id: "stabilized",
      label: copy.stabilized,
      accent: "amber",
      at: 2,
      doneAt: 4,
    },
    { id: "live", label: copy.live, accent: "green", at: 4, doneAt: 4 },
  ] as const;

  return (
    <div
      className={`${styles.dash} ${styles.dashRescue}`}
      data-live={live ? "true" : "false"}
      data-agent-story="rescue"
    >
      <div className={styles.main}>
        <Toolbar
          title={copy.rescueConsole}
          crumb="Rescue · Assistants migration"
          actions={
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary} ${
                stage >= 4 ? styles.btnGreen : ""
              }`}
            >
              {stage >= 4
                ? `✓ ${copy.live}`
                : stage >= 2
                  ? "Cutover ready"
                  : "Running evals…"}
            </button>
          }
        />

        <div
          className={`${styles.storyBanner} ${styles.rescueBanner}`}
          data-tone="exception"
        >
          <div className={styles.opsExceptionBadge}>!</div>
          <div>
            <strong>Assistants API shutdown - Aug 26</strong>
            <p>Freeze new threads, export state, migrate before the deadline.</p>
          </div>
        </div>

        <div className={styles.viewTabs}>
          <div className={`${styles.viewTab} ${styles.viewTabActive}`}>
            Triage
            <span className={styles.viewCount}>4</span>
          </div>
          <div className={styles.viewTab}>
            Evals
            <span className={styles.viewCount}>18</span>
          </div>
          <div className={styles.viewTab}>Cutover</div>
        </div>

        <div className={`${styles.body} ${styles.opsBody}`}>
          <div className={`${styles.tableWrap} ${styles.opsTable}`}>
            <div
              className={styles.tableHead}
              style={{ gridTemplateColumns: TRIAGE_COLUMNS }}
            >
              <span>Issue</span>
              <span>Severity</span>
              <span>Action</span>
              <span>{copy.status}</span>
            </div>
            {ISSUES.map((issue, index) => {
              const status = issueStatus(issue);
              return (
                <div
                  key={issue.id}
                  className={`${styles.tableRow} ${
                    index === 1 ? styles.tableRowActive : ""
                  }`}
                  style={{ gridTemplateColumns: TRIAGE_COLUMNS }}
                >
                  <span className={styles.cellPrimary}>
                    <span className={styles.iconBox} aria-hidden="true">
                      {issue.code}
                    </span>
                    <span className={styles.rowCopy}>
                      <strong>{issue.name}</strong>
                      <small>{issue.detail}</small>
                    </span>
                  </span>
                  <Tag tone={SEVERITY_TONE[issue.severity]}>
                    {SEVERITY_LABEL[issue.severity]}
                  </Tag>
                  <span className={styles.cellMuted}>{issue.action}</span>
                  <Tag tone={status.tone}>{status.label}</Tag>
                </div>
              );
            })}
          </div>

          <aside className={`${styles.inspector} ${styles.opsInspector}`}>
            <div className={styles.inspectorTop}>
              <div>
                <h4>Health</h4>
                <small>Evals · prod traffic replay</small>
              </div>
              <Tag tone={healthTone}>{healthLabel}</Tag>
            </div>

            <p className={styles.sectionLabel}>Signals</p>
            <div className={styles.props}>
              <div className={styles.prop}>
                <span>Eval pass rate</span>
                <strong>
                  {stage >= 2 ? (
                    <>
                      <span className={styles.deltaOld}>61%</span>
                      <span className={styles.deltaArrow} aria-hidden="true">
                        →
                      </span>
                      <span className={styles.deltaNew}>94%</span>
                    </>
                  ) : (
                    "61%"
                  )}
                </strong>
              </div>
              <div className={styles.prop}>
                <span>API cost/day</span>
                <strong>
                  {stage >= 3 ? (
                    <>
                      <span className={styles.deltaOld}>$84</span>
                      <span className={styles.deltaArrow} aria-hidden="true">
                        →
                      </span>
                      <span className={styles.deltaNew}>$31</span>
                    </>
                  ) : (
                    "$84"
                  )}
                </strong>
              </div>
              <div className={styles.prop}>
                <span>Stop-switch</span>
                <strong className={styles.switchValue}>
                  <i
                    className={styles.switch}
                    data-on={stage >= 1 ? "true" : "false"}
                    aria-hidden="true"
                  />
                  {stage >= 1 ? "ON" : "…"}
                </strong>
              </div>
              <div className={styles.prop}>
                <span>Approval gate</span>
                <strong>Outbound</strong>
              </div>
            </div>

            <div className={styles.note}>
              <span className={styles.bubbleLabel}>Recovery path</span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={healthNote}
                  className={styles.bubbleBody}
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.22, ease: EASE }}
                >
                  {healthNote}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className={styles.inspectorFoot}>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnWide} ${styles.btnPrimary} ${
                  stage >= 4 ? styles.btnGreen : ""
                }`}
              >
                {stage >= 4
                  ? "✓ Cutover complete"
                  : stage >= 2
                    ? "Approve cutover"
                    : "Stabilizing…"}
              </button>
            </div>
          </aside>
        </div>

        <div
          className={`${styles.processRail} ${styles.railBottom}`}
          aria-label="Rescue status"
        >
          {flowSteps.map((step, i) => {
            const state =
              stage >= step.doneAt
                ? "done"
                : stage >= step.at
                  ? "current"
                  : "todo";
            return (
              <motion.div
                key={step.id}
                className={styles.processStep}
                data-state={state}
                data-variant="rescue"
                data-accent={step.accent}
                animate={
                  reduce
                    ? undefined
                    : state === "current"
                      ? { scale: 1.03 }
                      : { scale: 1 }
                }
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
              >
                <span className={styles.processDot}>
                  {state === "done" ? "✓" : i + 1}
                </span>
                <span className={styles.processLabel}>{step.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
