// Purpose: Lead Response product mock - sales qualify story in dashboard chrome.
// Story: inbound form → ICP score → draft reply → CRM stage → meeting booked.
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MockAvatar } from "@/Components/ui/MockAvatar";
import styles from "../../AgentUxPreview.module.css";
import type { Copy } from "../copy";
import { Tag, Toolbar, useLiveStage } from "../shared";

const EASE = [0.16, 1, 0.3, 1] as const;

const CHATS = [
  {
    id: "greenleaf",
    company: "GreenLeaf",
    person: "Annie Zhang",
    seed: "Annie Zhang",
    preview: "Interested in annual plan + demo…",
    time: "2m",
    score: 92,
    channel: "Form · Gmail",
    role: "Product lead",
    companyMeta: "Series A · 28 people",
  },
  {
    id: "northstar",
    company: "Northstar",
    person: "Noah Wilson",
    seed: "Noah Wilson",
    preview: "Can you share pricing tiers?",
    time: "8m",
    score: 81,
    channel: "Email",
    role: "Founder",
    companyMeta: "Seed · 12 people",
  },
  {
    id: "atlas",
    company: "Atlas Labs",
    person: "Ava Turner",
    seed: "Ava Turner",
    preview: "Booked a call for next week",
    time: "14m",
    score: 74,
    channel: "LinkedIn",
    role: "Ops",
    companyMeta: "Growth · 45 people",
  },
  {
    id: "orbit",
    company: "Orbit Co",
    person: "Ken Park",
    seed: "Ken Park",
    preview: "Not a fit this quarter",
    time: "21m",
    score: 68,
    channel: "WhatsApp",
    role: "Marketing",
    companyMeta: "Bootstrapped",
  },
] as const;

/** Visible process strip - client sees sales flow immediately. */
const LEAD_STEPS = [
  { id: "inbound", label: "Inbound" },
  { id: "score", label: "ICP score" },
  { id: "draft", label: "Draft reply" },
  { id: "crm", label: "Update CRM" },
  { id: "book", label: "Book demo" },
] as const;

function ScoreRing({
  value,
  active,
  reduce,
}: {
  value: number;
  active: boolean;
  reduce: boolean;
}) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const target = c * (1 - value / 100);

  return (
    <div className={styles.scoreRing} aria-label={`ICP score ${value}`}>
      <svg viewBox="0 0 44 44" className={styles.scoreRingSvg}>
        <circle cx="22" cy="22" r={r} className={styles.scoreRingTrack} />
        <motion.circle
          cx="22"
          cy="22"
          r={r}
          className={styles.scoreRingValue}
          strokeDasharray={c}
          initial={reduce ? false : { strokeDashoffset: c }}
          animate={{
            strokeDashoffset: active || reduce ? target : c * 0.92,
          }}
          transition={{ duration: 0.7, ease: EASE }}
        />
      </svg>
      <motion.strong
        key={active ? value : "low"}
        initial={reduce ? false : { opacity: 0.4, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        {active || reduce ? value : "—"}
      </motion.strong>
    </div>
  );
}

export function LeadUx({
  copy,
  tasks,
  live = false,
}: {
  copy: Copy;
  tasks: readonly string[];
  live?: boolean;
}) {
  const reduce = useReducedMotion();
  // 0 triage → 1 scoring → 2 draft ready → 3 sent + CRM → 4 booked
  const stage = useLiveStage(live, 5, 1100);
  const active = CHATS[0];

  const status =
    stage === 0
      ? "New"
      : stage === 1
        ? "Scoring"
        : stage === 2
          ? copy.ready
          : stage === 3
            ? copy.sent
            : "Booked";
  const tone =
    stage <= 1 ? "amber" : stage === 2 ? "blue" : ("green" as const);

  // Demo conversation only - never use marketing `tasks[]` as chat copy.
  const inbound =
    "Hi - we run GreenLeaf and need faster first replies on inbound demos. Can we talk this week?";
  const draft =
    "Thanks Annie - happy to help. Two quick questions so I can route you correctly: team size, and timeline for the annual plan?";
  const followUp =
    "Qualified · score 92. HubSpot stage → Meeting booked. Calendar invite sent for Thu 10:30.";

  // Map stage → which process steps are complete / current
  const stepState = (i: number): "done" | "current" | "todo" => {
    if (stage > i) return "done";
    if (stage === i) return "current";
    // stage 4 completes all
    if (stage >= 4 && i <= 4) return "done";
    return "todo";
  };

  return (
    <div
      className={`${styles.dash} ${styles.dashLead}`}
      data-live={live ? "true" : "false"}
      data-agent-story="lead-response"
    >
      <div className={styles.main}>
        <Toolbar
          title={copy.leads}
          crumb="Sales · Lead Response"
          actions={
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`}>
              + New reply
            </button>
          }
        />

        {/* Process rail - unique to Lead: sales pipeline verbs */}
        <div className={styles.processRail} aria-label="Lead response flow">
          {LEAD_STEPS.map((step, i) => {
            const state = stepState(i);
            return (
              <motion.div
                key={step.id}
                className={styles.processStep}
                data-state={state}
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
            Inbox
            <span className={styles.viewCount}>12</span>
          </div>
          <div className={styles.viewTab}>Qualified</div>
          <div className={styles.viewTab}>Booked</div>
        </div>

        <div className={styles.leadLayout}>
          <aside className={styles.leadChatList} aria-label="Lead chats">
            <div className={styles.leadListHead}>
              <strong>Leads</strong>
              <span>Open</span>
            </div>
            {CHATS.map((chat, index) => {
              const isActive = index === 0;
              return (
                <div
                  key={chat.id}
                  className={`${styles.leadChatItem} ${
                    isActive ? styles.leadChatItemActive : ""
                  }`}
                >
                  <MockAvatar
                    seed={chat.seed}
                    alt={chat.person}
                    className={styles.avatar}
                    size={30}
                  />
                  <div className={styles.leadChatMeta}>
                    <div className={styles.leadChatTop}>
                      <strong>{chat.person}</strong>
                      <time>{chat.time}</time>
                    </div>
                    <span className={styles.leadChatCompany}>{chat.company}</span>
                    <p>{chat.preview}</p>
                  </div>
                  {isActive ? (
                    <Tag tone={tone}>{status}</Tag>
                  ) : (
                    <span className={styles.leadScore}>{chat.score}</span>
                  )}
                </div>
              );
            })}
          </aside>

          <section className={styles.leadThread} aria-label="Active lead chat">
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
                    {active.company} · {active.channel}
                  </small>
                </div>
              </div>
              <Tag tone={tone}>{status}</Tag>
            </header>

            <div className={styles.leadMessages}>
              <motion.div
                className={styles.bubble}
                initial={false}
                animate={
                  reduce || stage >= 0
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 6 }
                }
              >
                <span className={styles.chatWho}>{active.person}</span>
                <span className={styles.bubbleBody}>{inbound}</span>
              </motion.div>

              <AnimatePresence mode="wait">
                {stage === 1 ? (
                  <motion.div
                    key="scoring"
                    className={styles.storyBanner}
                    data-tone="score"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.28, ease: EASE }}
                  >
                    <ScoreRing value={92} active reduce={!!reduce} />
                    <div>
                      <strong>Scoring ICP fit</strong>
                      <p>Series A · climate SaaS · ops buyer · form + Gmail</p>
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
                      <span className={styles.citeChip} data-tone="blue">
                        ICP 92
                      </span>
                      <span className={styles.citeChip}>HubSpot</span>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {stage >= 3 ? (
                  <motion.div
                    key="sent"
                    className={`${styles.bubble} ${styles.bubbleAgent}`}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <span className={styles.bubbleLabel}>{copy.sent}</span>
                    <span className={styles.bubbleBody}>{followUp}</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {stage === 0 ? (
                <div className={styles.leadTyping} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>Reading form + CRM history…</span>
                </div>
              ) : null}
            </div>

            <footer className={styles.leadComposer}>
              <input
                className={styles.leadInput}
                readOnly
                value={
                  stage === 0
                    ? "Triage inbound · pull CRM context…"
                    : stage === 1
                      ? "Computing ICP score…"
                      : stage === 2
                        ? "Draft ready · send updates HubSpot"
                        : stage === 3
                          ? "Reply sent · booking next step"
                          : "Demo booked · pipeline updated"
                }
                aria-label="Composer"
              />
              <button
                type="button"
                className={`${styles.btn} ${styles.btnPrimary} ${
                  stage >= 3 ? styles.btnGreen : ""
                }`}
              >
                {stage >= 4
                  ? "✓ Booked"
                  : stage >= 3
                    ? `✓ ${copy.sent}`
                    : stage >= 2
                      ? copy.send
                      : "Working…"}
              </button>
            </footer>
          </section>

          <aside className={styles.leadProfile} aria-label="Lead profile">
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
                  {active.role} · {active.company}
                </small>
              </div>
            </div>

            <div className={styles.leadScoreHero}>
              <ScoreRing
                value={active.score}
                active={stage >= 1 || !!reduce}
                reduce={!!reduce}
              />
              <div>
                <span className={styles.sectionLabel}>{copy.score}</span>
                <strong>
                  {stage >= 1 || reduce ? "Strong ICP fit" : "Scoring…"}
                </strong>
                <small>Climate SaaS · ops buyer</small>
              </div>
            </div>

            <div className={styles.leadProfileActions}>
              <button type="button" className={styles.btn}>
                Email
              </button>
              <button type="button" className={styles.btn}>
                CRM
              </button>
              <button type="button" className={styles.btn}>
                Book
              </button>
            </div>

            <p className={styles.sectionLabel}>CRM stage</p>
            <div className={styles.stageTrack}>
              {["New", "Qualified", "Meeting"].map((label, i) => {
                const on =
                  (i === 0 && stage >= 0) ||
                  (i === 1 && stage >= 1) ||
                  (i === 2 && stage >= 4);
                const current =
                  (i === 0 && stage === 0) ||
                  (i === 1 && stage >= 1 && stage < 4) ||
                  (i === 2 && stage >= 4);
                return (
                  <motion.span
                    key={label}
                    className={styles.stageChip}
                    data-on={on ? "true" : "false"}
                    data-current={current ? "true" : "false"}
                    animate={
                      reduce
                        ? undefined
                        : current
                          ? { scale: 1.04 }
                          : { scale: 1 }
                    }
                  >
                    {label}
                  </motion.span>
                );
              })}
            </div>

            <p className={styles.sectionLabel}>{copy.company}</p>
            <div className={styles.leadCompanyCard}>
              <strong>{active.company}</strong>
              <span>{active.companyMeta}</span>
              <p>
                Inbound demo request. Qualify ICP, draft first reply, update
                HubSpot, book next step.
              </p>
            </div>

            <p className={styles.sectionLabel}>Agent checklist</p>
            <ul className={styles.checklist}>
              {[
                "Triage form + email",
                "Score ICP fit",
                "Draft personalized reply",
                "Update CRM + stage",
                "Book demo",
              ].map((step, index) => {
                const isDone = index <= stage;
                return (
                  <li
                    key={step}
                    className={isDone ? styles.stepDone : undefined}
                  >
                    <i aria-hidden="true">{isDone ? "✓" : ""}</i>
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
