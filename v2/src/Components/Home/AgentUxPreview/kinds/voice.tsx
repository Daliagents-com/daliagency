// Purpose: Voice agent mock - live call → qualify → book → handoff story.
// Scope: Distinct voice dashboard; no marketing tasks[] as transcript copy.
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MockAvatar } from "@/Components/ui/MockAvatar";
import styles from "../../AgentUxPreview.module.css";
import type { Copy } from "../copy";
import { Tag, Toolbar, useLiveStage } from "../shared";

const EASE = [0.16, 1, 0.3, 1] as const;

const VOICE_STEPS = [
  { id: "answer", label: "Answer" },
  { id: "disclose", label: "Disclose AI" },
  { id: "qualify", label: "Qualify" },
  { id: "book", label: "Book slot" },
  { id: "handoff", label: "Handoff" },
] as const;

const TRANSCRIPT = [
  {
    who: "Caller",
    role: "caller" as const,
    text: "Hi — I filled the form about the annual plan. Can someone walk me through pricing?",
  },
  {
    who: "Dali voice",
    role: "agent" as const,
    text: "Of course. I’m Dali, an AI assistant for the team. I can cover pricing tiers and book a specialist if you want a deeper walkthrough.",
  },
  {
    who: "Caller",
    role: "caller" as const,
    text: "Thursday morning works if you have anything open.",
  },
  {
    who: "Dali voice",
    role: "agent" as const,
    text: "I can hold Thu 10:30 with sales. I’ll send the calendar invite and a short summary to your email.",
  },
] as const;

export function VoiceUx({
  copy,
  live = false,
}: {
  copy: Copy;
  tasks: readonly string[];
  live?: boolean;
}) {
  const reduce = useReducedMotion();
  // 0 ring/answer → 1 disclose → 2 qualify → 3 book → 4 transfer ready
  const stage = useLiveStage(live, 5, 1100);

  const status =
    stage === 0
      ? "Connecting"
      : stage === 1
        ? "Disclosed"
        : stage === 2
          ? "Qualifying"
          : stage === 3
            ? "Slot held"
            : "Handoff ready";
  const tone =
    stage <= 1 ? "blue" : stage === 2 ? "amber" : ("green" as const);

  const linesVisible = Math.min(TRANSCRIPT.length, stage + 1);

  const stepState = (i: number): "done" | "current" | "todo" => {
    if (stage > i) return "done";
    if (stage === i) return "current";
    if (stage >= 4) return "done";
    return "todo";
  };

  return (
    <div
      className={`${styles.dash} ${styles.dashVoice}`}
      data-live={live ? "true" : "false"}
      data-agent-story="voice"
    >
      <div className={styles.main}>
        <Toolbar
          title="Live call · disclosed"
          crumb="Voice · Inbound"
          actions={
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary} ${
                stage >= 4 ? styles.btnGreen : ""
              }`}
            >
              {stage >= 4 ? copy.transferred : copy.transfer}
            </button>
          }
        />

        <div className={styles.processRail} aria-label="Voice agent flow">
          {VOICE_STEPS.map((step, i) => {
            const state = stepState(i);
            return (
              <motion.div
                key={step.id}
                className={styles.processStep}
                data-state={state}
                data-variant="voice"
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

        <div className={styles.voiceBody}>
          <div className={styles.call}>
            <div className={styles.person}>
              <MockAvatar
                seed="Chris Lee"
                alt="Chris Lee"
                className={styles.avatar}
                size={30}
              />
              <div>
                <strong>Chris Lee</strong>
                <small>
                  {stage === 0 ? "00:04 · ringing" : "01:24 · live"}
                </small>
              </div>
              <Tag tone={tone}>{status}</Tag>
              <span className={styles.live}>
                <i aria-hidden="true" />
                {copy.live}
              </span>
            </div>

            <div
              className={styles.wave}
              data-active={stage >= 1 ? "true" : "false"}
              aria-hidden="true"
            >
              {Array.from({ length: 28 }, (_, i) => (
                <i key={i} />
              ))}
            </div>

            <div className={styles.transcript}>
              <AnimatePresence initial={false}>
                {TRANSCRIPT.slice(0, linesVisible).map((line, index) => (
                  <motion.article
                    key={`${line.who}-${index}`}
                    className={
                      line.role === "agent" ? styles.lineAgent : undefined
                    }
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                  >
                    <span className={styles.bubbleLabel}>{line.who}</span>
                    <p className={styles.bubbleBody}>{line.text}</p>
                  </motion.article>
                ))}
              </AnimatePresence>

              {stage < 4 ? (
                <div className={styles.leadTyping} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>
                    {stage === 0
                      ? "Answering inbound…"
                      : stage === 1
                        ? "Disclosing AI assistant…"
                        : stage === 2
                          ? "Checking calendar slots…"
                          : "Holding Thu 10:30…"}
                  </span>
                </div>
              ) : null}
            </div>

            <div className={styles.inspectorActions}>
              <button type="button" className={styles.btn}>
                Mute
              </button>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnPrimary} ${
                  stage >= 4 ? styles.btnGreen : ""
                }`}
              >
                {stage >= 4 ? copy.transferred : copy.transfer}
              </button>
            </div>
          </div>

          <aside className={styles.inspector}>
            <p className={styles.sectionLabel}>Call outcomes</p>

            <motion.div
              className={styles.nextCard}
              data-on={stage >= 3 ? "true" : "false"}
              animate={
                reduce
                  ? undefined
                  : stage >= 3
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0.55, y: 0 }
              }
            >
              <i aria-hidden="true">◷</i>
              <span className={styles.rowCopy}>
                <small>{copy.today} · 10:30</small>
                <strong>
                  {stage >= 3 ? "Thu slot held · invite queued" : "Finding open slot…"}
                </strong>
              </span>
            </motion.div>

            <motion.div
              className={styles.nextCard}
              data-on={stage >= 2 ? "true" : "false"}
              animate={
                reduce
                  ? undefined
                  : stage >= 2
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0.5, y: 0 }
              }
            >
              <i aria-hidden="true">◎</i>
              <span className={styles.rowCopy}>
                <small>CRM note</small>
                <strong>
                  {stage >= 2
                    ? "Interest: annual plan · form lead"
                    : "Waiting for intent…"}
                </strong>
              </span>
            </motion.div>

            <motion.div
              className={styles.nextCard}
              data-on={stage >= 4 ? "true" : "false"}
              animate={
                reduce
                  ? undefined
                  : stage >= 4
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0.45, y: 0 }
              }
            >
              <i aria-hidden="true">↗</i>
              <span className={styles.rowCopy}>
                <small>{copy.review}</small>
                <strong>
                  {stage >= 4
                    ? "Ready for human specialist"
                    : "Handoff when needed"}
                </strong>
              </span>
            </motion.div>

            <p className={styles.sectionLabel}>Guardrails</p>
            <ul className={styles.checklist}>
              <li className={stage >= 1 ? styles.stepDone : undefined}>
                <i aria-hidden="true">{stage >= 1 ? "✓" : ""}</i>
                AI disclosed on call
              </li>
              <li className={stage >= 2 ? styles.stepDone : undefined}>
                <i aria-hidden="true">{stage >= 2 ? "✓" : ""}</i>
                No pricing promises off-script
              </li>
              <li className={stage >= 3 ? styles.stepDone : undefined}>
                <i aria-hidden="true">{stage >= 3 ? "✓" : ""}</i>
                Calendar hold before confirm
              </li>
              <li className={stage >= 4 ? styles.stepDone : undefined}>
                <i aria-hidden="true">{stage >= 4 ? "✓" : ""}</i>
                Human transfer available
              </li>
            </ul>

            <div className={styles.inspectorFoot}>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnWide} ${styles.btnPrimary} ${
                  stage >= 4 ? styles.btnGreen : ""
                }`}
              >
                {stage >= 4 ? copy.transferred : copy.transfer}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
