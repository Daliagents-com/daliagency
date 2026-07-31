// Purpose: Client Inbox product mock - support policy story in dashboard chrome.
// Story: open case → classify intent → ground draft → policy gate → send / escalate.
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MockAvatar } from "@/Components/ui/MockAvatar";
import styles from "../../AgentUxPreview.module.css";
import type { Copy } from "../copy";
import { Tag, Toolbar, useLiveStage } from "../shared";

const EASE = [0.16, 1, 0.3, 1] as const;

const CASES = [
  {
    id: "acme",
    person: "Maya Patel",
    seed: "Maya Patel",
    company: "Acme",
    preview: "Invoice #8841 + refund request…",
    time: "2m",
    plan: "Pro",
    channel: "Email",
    intent: "Billing",
    intentTone: "blue" as const,
    meta: "Growth plan · active",
  },
  {
    id: "north",
    person: "Luis Romero",
    seed: "Luis Romero",
    company: "Northline",
    preview: "Please cancel and refund today",
    time: "11m",
    plan: "Business",
    channel: "Chat",
    intent: "Sensitive",
    intentTone: "amber" as const,
    meta: "Open case · billing",
  },
  {
    id: "orbit",
    person: "Ana Kovacs",
    seed: "Ana Kovacs",
    company: "Orbit Co",
    preview: "Where is my onboarding link?",
    time: "24m",
    plan: "Starter",
    channel: "Email",
    intent: "Routine",
    intentTone: "neutral" as const,
    meta: "New account",
  },
  {
    id: "folio",
    person: "Ben Park",
    seed: "Ben Park",
    company: "Folio",
    preview: "Upload signed contract scan",
    time: "41m",
    plan: "Pro",
    channel: "Email",
    intent: "Media",
    intentTone: "neutral" as const,
    meta: "Contract pending",
  },
] as const;

/** Support-specific process - different grammar from Lead sales pipeline. */
const INBOX_STEPS = [
  { id: "case", label: "Open case" },
  { id: "intent", label: "Classify" },
  { id: "ground", label: "Ground reply" },
  { id: "policy", label: "Policy gate" },
  { id: "resolve", label: "Resolve" },
] as const;

export function InboxUx({
  copy,
  tasks,
  live = false,
}: {
  copy: Copy;
  tasks: readonly string[];
  live?: boolean;
}) {
  const reduce = useReducedMotion();
  // 0 open → 1 classify → 2 draft grounded → 3 policy gate → 4 resolve
  const stage = useLiveStage(live, 5, 1100);
  const active = CASES[0];

  const status =
    stage === 0
      ? "New case"
      : stage === 1
        ? "Classifying"
        : stage === 2
          ? copy.ready
          : stage === 3
            ? copy.review
            : copy.sent;
  const tone =
    stage <= 1
      ? "neutral"
      : stage === 2
        ? "blue"
        : stage === 3
          ? "amber"
          : ("green" as const);

  // Demo conversation only - never use marketing `tasks[]` as chat/gate copy.
  const inbound =
    "Can you resend invoice #8841 with VAT? Also — can you refund last month?";
  const draft =
    "Here is invoice #8841 with the VAT breakdown from our billing policy. Attached for your records.";
  const gate =
    "Refund is outside auto-policy. I can send the invoice now and escalate the refund to a support lead — CRM note already logged.";

  const stepState = (i: number): "done" | "current" | "todo" => {
    if (stage > i) return "done";
    if (stage === i) return "current";
    if (stage >= 4 && i <= 4) return "done";
    return "todo";
  };

  return (
    <div
      className={`${styles.dash} ${styles.dashInbox}`}
      data-live={live ? "true" : "false"}
      data-agent-story="client-inbox"
    >
      <div className={styles.main}>
        <Toolbar
          title={copy.inbox}
          crumb="Support · Client Inbox"
          actions={
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`}>
              {copy.approve}
            </button>
          }
        />

        <div className={styles.processRail} aria-label="Client inbox flow">
          {INBOX_STEPS.map((step, i) => {
            const state = stepState(i);
            return (
              <motion.div
                key={step.id}
                className={styles.processStep}
                data-state={state}
                data-variant="inbox"
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
            Open
            <span className={styles.viewCount}>8</span>
          </div>
          <div className={styles.viewTab}>Review</div>
          <div className={styles.viewTab}>Done</div>
        </div>

        <div className={styles.leadLayout}>
          <aside className={styles.leadChatList} aria-label="Client cases">
            <div className={styles.leadListHead}>
              <strong>Cases</strong>
              <span>Open</span>
            </div>
            {CASES.map((item, index) => {
              const isActive = index === 0;
              return (
                <div
                  key={item.id}
                  className={`${styles.leadChatItem} ${
                    isActive ? styles.leadChatItemActive : ""
                  }`}
                >
                  <MockAvatar
                    seed={item.seed}
                    alt={item.person}
                    className={styles.avatar}
                    size={30}
                  />
                  <div className={styles.leadChatMeta}>
                    <div className={styles.leadChatTop}>
                      <strong>{item.person}</strong>
                      <time>{item.time}</time>
                    </div>
                    <span className={styles.leadChatCompany}>
                      {item.company} · {item.channel}
                    </span>
                    <p>{item.preview}</p>
                  </div>
                  {isActive ? (
                    <Tag tone={tone as "neutral" | "blue" | "amber" | "green"}>
                      {status}
                    </Tag>
                  ) : (
                    <Tag tone={item.intentTone}>{item.intent}</Tag>
                  )}
                </div>
              );
            })}
          </aside>

          <section className={styles.leadThread} aria-label="Active thread">
            <header className={styles.leadThreadHead}>
              <div className={styles.person}>
                <MockAvatar
                  seed={active.seed}
                  alt={active.person}
                  className={styles.avatar}
                  size={30}
                />
                <div>
                  <strong>{active.person}</strong>
                  <small>
                    {active.company} · {active.channel} · Case #3901
                  </small>
                </div>
              </div>
              <Tag tone={tone as "neutral" | "blue" | "amber" | "green"}>
                {status}
              </Tag>
            </header>

            <div className={styles.leadMessages}>
              <div className={styles.bubble}>
                <span className={styles.chatWho}>{active.person}</span>
                <span className={styles.bubbleBody}>{inbound}</span>
              </div>

              <AnimatePresence mode="wait">
                {stage === 1 ? (
                  <motion.div
                    key="intent"
                    className={styles.storyBanner}
                    data-tone="intent"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.28, ease: EASE }}
                  >
                    <div className={styles.intentPills}>
                      <motion.span
                        className={styles.intentPill}
                        data-on="true"
                        initial={reduce ? false : { scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                      >
                        Billing
                      </motion.span>
                      <motion.span
                        className={styles.intentPill}
                        data-warn="true"
                        initial={reduce ? false : { scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.12 }}
                      >
                        Refund · sensitive
                      </motion.span>
                    </div>
                    <div>
                      <strong>Intent classified</strong>
                      <p>Two asks in one message — invoice OK, refund needs gate</p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {stage >= 2 ? (
                  <motion.div
                    key="draft"
                    className={`${styles.bubble} ${styles.bubbleAgent}`}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <span className={styles.bubbleLabel}>{copy.draft}</span>
                    <span className={styles.bubbleBody}>{draft}</span>
                    <div className={styles.threadCites}>
                      <span className={styles.citeChip}>Billing policy</span>
                      <span className={styles.citeChip}>Template B-12</span>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {stage >= 3 ? (
                  <motion.div
                    key="gate"
                    className={`${styles.bubble} ${styles.bubbleAgent} ${styles.bubbleGate}`}
                    initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.32, ease: EASE }}
                  >
                    <span className={styles.bubbleLabel}>
                      {copy.review} · policy gate
                    </span>
                    <span className={styles.bubbleBody}>{gate}</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {stage === 0 ? (
                <div className={styles.leadTyping} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>Reading case + policy sources…</span>
                </div>
              ) : null}
            </div>

            <footer className={styles.leadComposer}>
              <input
                className={styles.leadInput}
                readOnly
                value={
                  stage === 0
                    ? "Open case · load CRM + policies…"
                    : stage === 1
                      ? "Classifying intent…"
                      : stage === 2
                        ? "Draft grounded · refund still blocked"
                        : stage === 3
                          ? "Approve invoice reply · escalate refund"
                          : "Invoice sent · refund escalated"
                }
                aria-label="Composer"
              />
              <button
                type="button"
                className={`${styles.btn} ${styles.btnPrimary} ${
                  stage >= 4 ? styles.btnGreen : ""
                }`}
              >
                {stage >= 4
                  ? `✓ ${copy.sent}`
                  : stage >= 3
                    ? copy.approve
                    : "Working…"}
              </button>
            </footer>
          </section>

          <aside className={styles.leadProfile} aria-label="Case panel">
            <div className={styles.leadProfileTop}>
              <MockAvatar
                seed={active.seed}
                alt={active.person}
                className={`${styles.avatar} ${styles.avatarLg}`}
                size={40}
              />
              <div>
                <h4>{active.person}</h4>
                <small>
                  {active.company} · {active.meta}
                </small>
              </div>
            </div>

            {/* Policy board - the differentiator vs Lead sales score */}
            <div className={styles.policyBoard}>
              <p className={styles.sectionLabel}>Policy board</p>
              <div className={styles.policyCols}>
                <motion.div
                  className={styles.policyCol}
                  data-kind="allow"
                  animate={
                    reduce
                      ? undefined
                      : stage >= 2
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0.55, y: 0 }
                  }
                >
                  <span className={styles.policyColTitle}>Allow</span>
                  <ul>
                    <li data-on={stage >= 2 ? "true" : "false"}>
                      Resend invoice #8841
                    </li>
                    <li data-on={stage >= 2 ? "true" : "false"}>VAT breakdown</li>
                    <li data-on={stage >= 2 ? "true" : "false"}>CRM case note</li>
                  </ul>
                </motion.div>
                <motion.div
                  className={styles.policyCol}
                  data-kind="block"
                  animate={
                    reduce
                      ? undefined
                      : stage >= 3
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0.45, y: 0 }
                  }
                >
                  <span className={styles.policyColTitle}>Block / escalate</span>
                  <ul>
                    <li data-on={stage >= 3 ? "true" : "false"} data-warn="true">
                      Refund last month
                    </li>
                    <li data-on={stage >= 3 ? "true" : "false"} data-warn="true">
                      Auto-credit
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>

            <div className={styles.leadProfileActions}>
              <button type="button" className={styles.btn}>
                Reply
              </button>
              <button type="button" className={styles.btn}>
                CRM
              </button>
              <button type="button" className={styles.btn}>
                Escalate
              </button>
            </div>

            <p className={styles.sectionLabel}>Case</p>
            <div className={styles.props}>
              <div className={styles.prop}>
                <span>Intent</span>
                <strong>
                  {stage >= 1 || reduce ? active.intent : "…"}
                </strong>
              </div>
              <div className={styles.prop}>
                <span>Plan</span>
                <strong>{active.plan}</strong>
              </div>
              <div className={styles.prop}>
                <span>{copy.status}</span>
                <strong>{status}</strong>
              </div>
              <div className={styles.prop}>
                <span>{copy.owner}</span>
                <strong>Inbox agent</strong>
              </div>
            </div>

            <p className={styles.sectionLabel}>{copy.sources}</p>
            <div className={styles.leadCompanyCard}>
              <strong>Billing policy</strong>
              <span>Template B-12 · Case #3901</span>
              <p>Reply uses only the approved source set for this case.</p>
            </div>

            <p className={styles.sectionLabel}>Resolution path</p>
            <ul className={styles.checklist}>
              {[
                "Open case from email",
                "Classify intent",
                "Ground draft in policy",
                "Gate refund request",
                "Send + escalate",
              ].map((step, index) => {
                const isDone = index <= stage;
                return (
                  <li
                    key={step}
                    className={
                      index === 3 && stage >= 3
                        ? styles.stepBlocked
                        : isDone
                          ? styles.stepDone
                          : undefined
                    }
                  >
                    <i aria-hidden="true">
                      {index === 3 && stage >= 3 ? "!" : isDone ? "✓" : ""}
                    </i>
                    {step}
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
