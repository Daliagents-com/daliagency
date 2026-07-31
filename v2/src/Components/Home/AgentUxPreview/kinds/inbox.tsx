// Purpose: Client Inbox product mock - case list | thread | case panel.
// Scope: Same chrome as LeadUx, different product grammar: intent · cites · policy gate.
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MockAvatar } from "@/Components/ui/MockAvatar";
import styles from "../../AgentUxPreview.module.css";
import type { Copy } from "../copy";
import { Tag, Toolbar, useLiveStage } from "../shared";

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

export function InboxUx({
  copy,
  tasks,
  live = false,
}: {
  copy: Copy;
  tasks: readonly string[];
  live?: boolean;
}) {
  const stage = useLiveStage(live, 4, 1400);
  const active = CASES[0];

  // 0 ground → 1 draft ready → 2 policy gate → 3 sent + CRM
  const status =
    stage === 0
      ? copy.draft
      : stage === 1
        ? copy.ready
        : stage === 2
          ? copy.review
          : copy.sent;
  const tone =
    stage === 0
      ? "neutral"
      : stage === 1
        ? "blue"
        : stage === 2
          ? "amber"
          : "green";

  const inbound =
    "Can you resend invoice #8841 with VAT? Also - can you refund last month?";
  const draft =
    "Here is invoice #8841 and the VAT breakdown from our billing policy.";
  const gate =
    tasks[2] ??
    "Refund is outside auto-policy. Escalated to support lead · CRM note logged.";

  return (
    <div className={styles.dash} data-live={live ? "true" : "false"}>
      <div className={styles.main}>
        <Toolbar
          title={copy.inbox}
          actions={
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`}>
              {copy.approve}
            </button>
          }
        />

        <div className={styles.viewTabs}>
          <div className={`${styles.viewTab} ${styles.viewTabActive}`}>
            Open
            <span className={styles.viewCount}>8</span>
          </div>
          <div className={styles.viewTab}>Review</div>
          <div className={styles.viewTab}>Done</div>
        </div>

        <div className={styles.leadLayout}>
          {/* Left: cases — intent chips, not sales scores */}
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

          {/* Center: grounded draft + policy gate */}
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
                    {active.company} · {active.channel} · {active.intent}
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
                {inbound}
              </div>

              <AnimatePresence mode="wait">
                {stage >= 1 ? (
                  <motion.div
                    key="draft"
                    className={`${styles.bubble} ${styles.bubbleAgent}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <span>{copy.draft}</span>
                    {draft}
                    <div className={styles.threadCites}>
                      <Tag tone="neutral">Billing policy</Tag>
                      <Tag tone="neutral">Template B-12</Tag>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {stage >= 2 ? (
                  <motion.div
                    key="gate"
                    className={`${styles.bubble} ${styles.bubbleAgent} ${styles.bubbleGate}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <span>{copy.review}</span>
                    {gate}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {stage === 0 ? (
                <div className={styles.leadTyping} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>Checking policy + CRM…</span>
                </div>
              ) : null}
            </div>

            <footer className={styles.leadComposer}>
              <input
                className={styles.leadInput}
                readOnly
                value={
                  stage === 0
                    ? "Grounding reply in approved sources…"
                    : stage === 1
                      ? "Draft ready · refund stays blocked"
                      : stage === 2
                        ? "Approve invoice reply · escalate refund"
                        : "Reply sent · case logged in CRM"
                }
                aria-label="Composer"
              />
              <button
                type="button"
                className={`${styles.btn} ${styles.btnPrimary} ${
                  stage >= 3 ? styles.btnGreen : ""
                }`}
              >
                {stage >= 3 ? `✓ ${copy.sent}` : copy.approve}
              </button>
            </footer>
          </section>

          {/* Right: case + sources + policy allow/block */}
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
                <strong>{active.intent}</strong>
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

            <p className={styles.sectionLabel}>Policy</p>
            <ul className={styles.checklist}>
              <li className={stage >= 1 ? styles.stepDone : undefined}>
                <i aria-hidden="true">{stage >= 1 ? "✓" : ""}</i>
                Send invoice copy
              </li>
              <li className={stage >= 1 ? styles.stepDone : undefined}>
                <i aria-hidden="true">{stage >= 1 ? "✓" : ""}</i>
                Log CRM note
              </li>
              <li
                className={
                  stage >= 2 ? styles.stepBlocked : undefined
                }
              >
                <i aria-hidden="true">{stage >= 2 ? "!" : ""}</i>
                Refund / credit
              </li>
              <li className={stage >= 3 ? styles.stepDone : undefined}>
                <i aria-hidden="true">{stage >= 3 ? "✓" : ""}</i>
                Escalate to human
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
