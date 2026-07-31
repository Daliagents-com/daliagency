// Purpose: Knowledge assistant mock - search → evidence → cited answer → insert.
// Scope: Internal Q&A with sources; distinct from sales Lead and support Inbox.
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "../../AgentUxPreview.module.css";
import type { Copy } from "../copy";
import { Tag, Toolbar, useLiveStage } from "../shared";

const EASE = [0.16, 1, 0.3, 1] as const;

type PathTone = "cited" | "review" | "abstain";

type Question = {
  id: string;
  question: string;
  audience: string;
  time: string;
  path: PathTone;
  pathLabel: string;
};

type Source = {
  id: string;
  icon: string;
  label: string;
  path: string;
  matches: string;
  snippet: string;
};

const KNOW_STEPS = [
  { id: "ask", label: "Ask" },
  { id: "search", label: "Search" },
  { id: "evidence", label: "Evidence" },
  { id: "cite", label: "Cite answer" },
  { id: "insert", label: "Insert" },
] as const;

const QUESTIONS: readonly Question[] = [
  {
    id: "refund",
    question: "Refund window for annual plans?",
    audience: "Support · recurring",
    time: "2m",
    path: "cited",
    pathLabel: "Cited",
  },
  {
    id: "sla",
    question: "What is the tier-2 SLA?",
    audience: "Ops · handbook",
    time: "11m",
    path: "cited",
    pathLabel: "Cited",
  },
  {
    id: "onboard",
    question: "Can we override onboarding steps?",
    audience: "Enablement",
    time: "24m",
    path: "review",
    pathLabel: "Review",
  },
  {
    id: "export",
    question: "Export customer data to a partner?",
    audience: "Sensitive",
    time: "41m",
    path: "abstain",
    pathLabel: "Abstain",
  },
  {
    id: "admin",
    question: "How do we reset a locked admin?",
    audience: "Internal IT",
    time: "1h",
    path: "cited",
    pathLabel: "Cited",
  },
] as const;

const SOURCES: readonly Source[] = [
  {
    id: "sop",
    icon: "Rs",
    label: "Revenue SOP",
    path: "policy/refunds.md",
    matches: "4 matched",
    snippet:
      "§4.2 Annual plans: full refund within 14 days of purchase if usage stays under the free-trial threshold. After day 14, route to billing lead.",
  },
  {
    id: "handbook",
    icon: "Ph",
    label: "Product handbook",
    path: "handbook/billing-faq.md",
    matches: "5 matched",
    snippet:
      "Billing FAQ: annual plan refunds follow Revenue SOP. Do not invent exceptions for sales-led deals without written approval.",
  },
  {
    id: "past",
    icon: "Pd",
    label: "Past decisions",
    path: "thread-4821",
    matches: "2 matched",
    snippet:
      "Case 4821: agent cited SOP §4.2, support lead approved refund on day 9. Logged as template B-refund-14.",
  },
  {
    id: "notes",
    icon: "Pn",
    label: "Policy notes",
    path: "policy/notes.md",
    matches: "1 matched",
    snippet:
      "Approved source set for support first-pass answers. Outside this set, abstain and escalate.",
  },
] as const;

const ACTIVE = QUESTIONS[0];

const ANSWER_BODY =
  "Annual plans have a 14-day refund window from the purchase date, as long as usage stays under the free-trial threshold. After day 14, refunds need billing lead approval and a logged exception.";

function pathTone(path: PathTone): "green" | "amber" | "neutral" {
  if (path === "cited") return "green";
  if (path === "review") return "amber";
  return "neutral";
}

export function KnowledgeUx({
  copy,
  live = false,
}: {
  copy: Copy;
  tasks: readonly string[];
  live?: boolean;
}) {
  const reduce = useReducedMotion();
  // 0 ask/search → 1 evidence → 2 cited answer → 3 next step → 4 insert
  const stage = useLiveStage(live, 5, 1100);

  const status =
    stage === 0
      ? "Searching…"
      : stage === 1
        ? copy.evidence
        : stage === 2
          ? copy.ready
          : stage >= 3
            ? copy.approved
            : copy.ready;
  const statusTone =
    stage === 0 ? "neutral" : stage === 1 ? "blue" : ("green" as const);

  const stepState = (i: number): "done" | "current" | "todo" => {
    if (stage > i) return "done";
    if (stage === i) return "current";
    if (stage >= 4) return "done";
    return "todo";
  };

  return (
    <div
      className={`${styles.dash} ${styles.dashKnow}`}
      data-live={live ? "true" : "false"}
      data-agent-story="knowledge"
    >
      <div className={styles.main}>
        <Toolbar
          title={copy.answer}
          crumb="Internal · Knowledge"
          search={copy.search}
          actions={
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary} ${
                stage >= 4 ? styles.btnGreen : ""
              }`}
            >
              {stage >= 4 ? `✓ ${copy.approved}` : stage >= 2 ? "Approve" : "Ask"}
            </button>
          }
        />

        <div className={styles.processRail} aria-label="Knowledge flow">
          {KNOW_STEPS.map((step, i) => {
            const state = stepState(i);
            return (
              <motion.div
                key={step.id}
                className={styles.processStep}
                data-state={state}
                data-variant="know"
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

        <div className={styles.viewTabs}>
          <div className={`${styles.viewTab} ${styles.viewTabActive}`}>
            Question log
            <span className={styles.viewCount}>{QUESTIONS.length}</span>
          </div>
          <div className={styles.viewTab}>Sources</div>
          <div className={styles.viewTab}>Gaps</div>
        </div>

        <div className={styles.knowLayout}>
          <aside className={styles.knowLog} aria-label="Question log">
            <div className={styles.leadListHead}>
              <strong>Questions</strong>
              <span>Today</span>
            </div>
            {QUESTIONS.map((item, index) => {
              const isActive = index === 0;
              return (
                <div
                  key={item.id}
                  className={`${styles.knowLogItem} ${
                    isActive ? styles.knowLogItemActive : ""
                  }`}
                >
                  <div className={styles.knowLogMeta}>
                    <div className={styles.leadChatTop}>
                      <strong>{item.question}</strong>
                      <time>{item.time}</time>
                    </div>
                  </div>
                  <div className={styles.knowLogFoot}>
                    <span className={styles.knowLogAudience}>
                      {item.audience}
                    </span>
                    <Tag
                      tone={
                        isActive && stage < 2
                          ? (statusTone as "neutral" | "blue" | "green" | "amber")
                          : pathTone(item.path)
                      }
                    >
                      {isActive && stage < 2 ? status : item.pathLabel}
                    </Tag>
                  </div>
                </div>
              );
            })}
          </aside>

          <section className={styles.knowThread} aria-label="Cited answer">
            <header className={styles.knowThreadHead}>
              <div className={styles.knowQuery}>
                <span className={styles.sectionLabel}>{copy.request}</span>
                <h4>{ACTIVE.question}</h4>
                <small>{ACTIVE.audience}</small>
              </div>
              <Tag tone={statusTone as "neutral" | "blue" | "green" | "amber"}>
                {stage >= 2 ? "94%" : status}
              </Tag>
            </header>

            <div className={styles.knowMessages}>
              {stage === 0 ? (
                <div className={styles.leadTyping} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>Searching approved SOPs and handbook…</span>
                </div>
              ) : null}

              <AnimatePresence mode="wait">
                {stage >= 1 ? (
                  <motion.div
                    key="retrieval"
                    className={styles.knowRetrieval}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                  >
                    <span className={styles.sectionLabel}>{copy.sources}</span>
                    <div className={styles.knowSourceHits}>
                      {SOURCES.slice(0, 3).map((s, i) => (
                        <motion.div
                          key={s.id}
                          className={`${styles.knowHit} ${
                            i === 0 ? styles.knowHitActive : ""
                          }`}
                          initial={reduce ? false : { opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.22 }}
                        >
                          <span className={styles.iconBox}>{s.icon}</span>
                          <span className={styles.rowCopy}>
                            <strong>{s.label}</strong>
                            <small>{s.matches}</small>
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {stage === 1 ? (
                <motion.div
                  className={styles.knowSnippet}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className={styles.sectionLabel}>Top match</span>
                  <p className={styles.bubbleBody}>{SOURCES[0].snippet}</p>
                </motion.div>
              ) : null}

              <AnimatePresence mode="wait">
                {stage >= 2 ? (
                  <motion.div
                    key="answer"
                    className={`${styles.bubble} ${styles.bubbleAgent} ${styles.knowAnswer}`}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <span className={styles.bubbleLabel}>{copy.answer}</span>
                    <span className={styles.bubbleBody}>{ANSWER_BODY}</span>
                    <div className={styles.threadCites}>
                      <span className={styles.citeChip}>1 · Revenue SOP §4.2</span>
                      <span className={styles.citeChip}>2 · Product handbook</span>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {stage >= 3 ? (
                  <motion.div
                    key="next"
                    className={styles.knowNext}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                  >
                    <span className={styles.bubbleLabel}>{copy.next}</span>
                    <p className={styles.bubbleBody}>
                      If the customer is past day 14, open a billing-lead review
                      with the purchase date and usage snapshot attached.
                    </p>
                    <div className={styles.threadCites}>
                      <span className={styles.citeChip} data-tone="blue">
                        Suggested next step
                      </span>
                      <span className={styles.citeChip}>Human review kept</span>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <footer className={styles.knowComposer}>
              <input
                className={styles.leadInput}
                readOnly
                value={
                  stage === 0
                    ? "Searching SOPs, handbook, past cases…"
                    : stage === 1
                      ? "Evidence found · drafting cited answer…"
                      : stage === 2
                        ? "Cited answer ready · human can insert"
                        : stage === 3
                          ? "Next step attached · ready to insert"
                          : "Answer inserted · logged to question log"
                }
                aria-label="Status"
              />
              <div className={styles.inspectorActions}>
                <button type="button" className={styles.btn}>
                  Copy
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnPrimary} ${
                    stage >= 4 ? styles.btnGreen : ""
                  }`}
                >
                  {stage >= 4 ? "Inserted" : "Insert"}
                </button>
              </div>
            </footer>
          </section>

          <aside className={styles.knowInspector} aria-label="Source inspector">
            <div className={styles.knowInspectorTop}>
              <div>
                <span className={styles.sectionLabel}>{copy.sources}</span>
                <h4>{SOURCES[0].label}</h4>
                <small>{SOURCES[0].path}</small>
              </div>
              <Tag tone={stage >= 1 ? "green" : "neutral"}>
                {stage >= 1 ? SOURCES[0].matches : "—"}
              </Tag>
            </div>

            <div className={styles.knowSnippetCard}>
              <strong>Matched passage</strong>
              <p className={styles.bubbleBody}>
                {stage >= 1
                  ? SOURCES[0].snippet
                  : "Waiting for retrieval against the approved source set…"}
              </p>
            </div>

            <p className={styles.sectionLabel}>{copy.confidence}</p>
            <div className={styles.props}>
              <div className={styles.prop}>
                <span>Score</span>
                <strong>{stage >= 2 ? "94%" : stage >= 1 ? "…" : "—"}</strong>
              </div>
              <div className={styles.prop}>
                <span>Path</span>
                <strong>
                  {stage >= 2
                    ? "Cited answer"
                    : stage >= 1
                      ? "Evidence"
                      : "Search"}
                </strong>
              </div>
              <div className={styles.prop}>
                <span>{copy.owner}</span>
                <strong>Support lead</strong>
              </div>
              <div className={styles.prop}>
                <span>{copy.status}</span>
                <strong>{status}</strong>
              </div>
            </div>

            <p className={styles.sectionLabel}>Guardrails</p>
            <ul className={styles.checklist}>
              <li className={stage >= 1 ? styles.stepDone : undefined}>
                <i aria-hidden="true">{stage >= 1 ? "✓" : ""}</i>
                Source in approved set
              </li>
              <li className={stage >= 2 ? styles.stepDone : undefined}>
                <i aria-hidden="true">{stage >= 2 ? "✓" : ""}</i>
                Citation attached
              </li>
              <li className={stage >= 2 ? styles.stepDone : undefined}>
                <i aria-hidden="true">{stage >= 2 ? "✓" : ""}</i>
                Out-of-scope claims blocked
              </li>
              <li className={stage >= 4 ? styles.stepDone : undefined}>
                <i aria-hidden="true">{stage >= 4 ? "✓" : ""}</i>
                Human can insert or escalate
              </li>
            </ul>

            <div className={styles.knowAbstainNote}>
              <span className={styles.sectionLabel}>Also in log</span>
              <p className={styles.bubbleBody}>
                <strong>Export customer data…</strong> abstained — no approved
                source. Escalated to privacy owner.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
