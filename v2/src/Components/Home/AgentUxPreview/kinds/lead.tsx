// Purpose: Lead Response product mock - chat list | thread | user panel.
// Scope: Same chrome density as Dali mock; GreenLeaf as primary case.
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MockAvatar } from "@/Components/ui/MockAvatar";
import styles from "../../AgentUxPreview.module.css";
import type { Copy } from "../copy";
import { Tag, Toolbar, useLiveStage } from "../shared";

const CHATS = [
  {
    id: "greenleaf",
    company: "GreenLeaf",
    person: "Annie Zhang",
    seed: "Annie Zhang",
    preview: "Interested in annual plan + demo…",
    time: "2m",
    score: "92",
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
    score: "81",
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
    score: "74",
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
    score: "68",
    channel: "WhatsApp",
    role: "Marketing",
    companyMeta: "Bootstrapped",
  },
] as const;

export function LeadUx({
  copy,
  tasks,
  live = false,
}: {
  copy: Copy;
  tasks: readonly string[];
  live?: boolean;
}) {
  const stage = useLiveStage(live, 4, 1400);
  const active = CHATS[0];

  const status =
    stage === 0
      ? copy.review
      : stage === 1
        ? copy.ready
        : stage === 2
          ? copy.sent
          : copy.completed;
  const tone =
    stage === 0 ? "amber" : stage === 1 ? "blue" : stage === 2 ? "green" : "green";

  const inbound =
    tasks[0] ??
    "Hi - we run GreenLeaf and need faster first replies on inbound demos.";
  const draft =
    tasks[1] ??
    "Thanks Annie - happy to help. Two quick questions so I can route you correctly…";
  const followUp =
    tasks[2] ??
    "Qualified. Score 92. CRM stage → Meeting booked. Calendar invite sent.";

  return (
    <div className={styles.dash} data-live={live ? "true" : "false"}>
      <div className={styles.main}>
        <Toolbar
          title={copy.leads}
          actions={
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`}>
              + New reply
            </button>
          }
        />

        <div className={styles.viewTabs}>
          <div className={`${styles.viewTab} ${styles.viewTabActive}`}>
            Inbox
            <span className={styles.viewCount}>12</span>
          </div>
          <div className={styles.viewTab}>Qualified</div>
          <div className={styles.viewTab}>Booked</div>
        </div>

        <div className={styles.leadLayout}>
          {/* Left: chats */}
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
                    <Tag tone={tone as "amber" | "blue" | "green"}>{status}</Tag>
                  ) : (
                    <span className={styles.leadScore}>{chat.score}</span>
                  )}
                </div>
              );
            })}
          </aside>

          {/* Center: conversation */}
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
              <Tag tone={tone as "amber" | "blue" | "green"}>{status}</Tag>
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
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {stage >= 2 ? (
                  <motion.div
                    key="sent"
                    className={`${styles.bubble} ${styles.bubbleAgent}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <span>{copy.sent}</span>
                    {followUp}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {stage === 0 ? (
                <div className={styles.leadTyping} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>Agent drafting…</span>
                </div>
              ) : null}
            </div>

            <footer className={styles.leadComposer}>
              <input
                className={styles.leadInput}
                readOnly
                value={
                  stage === 0
                    ? "Drafting first reply with qualification questions…"
                    : stage === 1
                      ? "Ready to send · CRM will update on send"
                      : "Reply sent · follow-up scheduled"
                }
                aria-label="Composer"
              />
              <button
                type="button"
                className={`${styles.btn} ${styles.btnPrimary} ${
                  stage >= 2 ? styles.btnGreen : ""
                }`}
              >
                {stage >= 2 ? `✓ ${copy.sent}` : copy.send}
              </button>
            </footer>
          </section>

          {/* Right: user / company */}
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

            <p className={styles.sectionLabel}>Lead</p>
            <div className={styles.props}>
              <div className={styles.prop}>
                <span>{copy.score}</span>
                <strong>{active.score}</strong>
              </div>
              <div className={styles.prop}>
                <span>ICP</span>
                <strong>Fit</strong>
              </div>
              <div className={styles.prop}>
                <span>{copy.stage}</span>
                <strong>{status}</strong>
              </div>
              <div className={styles.prop}>
                <span>{copy.owner}</span>
                <strong>Lead agent</strong>
              </div>
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

            <p className={styles.sectionLabel}>Pipeline</p>
            <ul className={styles.checklist}>
              {[
                "Triage form + email",
                "Draft personalized reply",
                "Update CRM + score",
                "Book or follow-up",
              ].map((step, index) => {
                const done = index < stage + 1;
                return (
                  <li key={step} className={done ? styles.stepDone : undefined}>
                    <i aria-hidden="true">{done ? "✓" : ""}</i>
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
