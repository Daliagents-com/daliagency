// Purpose: AgentUxPreview product kind mock.
"use client";

import { MockAvatar } from "@/Components/ui/MockAvatar";
import styles from "../../AgentUxPreview.module.css";
import type { Copy } from "../copy";
import { Toolbar, clip } from "../shared";

export function VoiceUx({
  copy,
  tasks,
}: {
  copy: Copy;
  tasks: readonly string[];
}) {
  return (
    <div className={styles.dash}>
      <div className={styles.main}>
        <Toolbar
          title="AI assistant disclosed"
          actions={
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`}>
              {copy.transfer}
            </button>
          }
        />
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
                <small>01:24 · live</small>
              </div>
              <span className={styles.live}>
                <i aria-hidden="true" />
                {copy.live}
              </span>
            </div>
            <div className={styles.wave} aria-hidden="true">
              {Array.from({ length: 28 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <div className={styles.transcript}>
              <article>
                <span>Caller</span>
                <p>{clip(tasks[0] ?? "Caller request", 100)}</p>
              </article>
              <article className={styles.lineAgent}>
                <span>Dali voice</span>
                <p>{clip(tasks[1] ?? "Agent response", 110)}</p>
              </article>
            </div>
            <div className={styles.inspectorActions}>
              <button type="button" className={styles.btn}>
                Mute
              </button>
              <button type="button" className={`${styles.btn} ${styles.btnPrimary}`}>
                {copy.transfer}
              </button>
            </div>
          </div>
          <aside className={styles.inspector}>
            <p className={styles.sectionLabel}>{copy.next}</p>
            <div className={styles.nextCard}>
              <i aria-hidden="true">◷</i>
              <span className={styles.rowCopy}>
                <small>
                  {copy.today} · 10:30
                </small>
                <strong>{clip(tasks[1] ?? "Book follow-up", 48)}</strong>
              </span>
            </div>
            <div className={styles.nextCard}>
              <i aria-hidden="true">◎</i>
              <span className={styles.rowCopy}>
                <small>{copy.review}</small>
                <strong>{clip(tasks[2] ?? tasks[1] ?? "Human handoff", 48)}</strong>
              </span>
            </div>
            <div className={styles.inspectorFoot}>
              <button type="button" className={`${styles.btn} ${styles.btnWide} ${styles.btnPrimary}`}>
                {copy.transfer}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
