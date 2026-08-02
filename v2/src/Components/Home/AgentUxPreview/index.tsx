// Purpose: Folk/Attio-style product mocks for homepage agent solutions.
// Scope: Visual-only shells; stage loop when parent panel is in view.
// Perf: per-kind dynamic imports so @xyflow only loads for dali panels.
"use client";

import dynamic from "next/dynamic";
import styles from "../AgentUxPreview.module.css";
import {
  interfaceCopy,
  type AgentUxKind,
  type AgentUxPreviewProps,
} from "./copy";
import { Shell } from "./shared";

export type { AgentUxKind } from "./copy";

const KindFallback = () => (
  <div className={styles.kindFallback} aria-hidden="true" />
);

const DaliUx = dynamic(
  () => import("./kinds/dali").then((m) => m.DaliUx),
  { ssr: false, loading: KindFallback },
);
const LeadUx = dynamic(
  () => import("./kinds/lead").then((m) => m.LeadUx),
  { ssr: false, loading: KindFallback },
);
const InboxUx = dynamic(
  () => import("./kinds/inbox").then((m) => m.InboxUx),
  { ssr: false, loading: KindFallback },
);
const OperationsUx = dynamic(
  () => import("./kinds/operations").then((m) => m.OperationsUx),
  { ssr: false, loading: KindFallback },
);
const KnowledgeUx = dynamic(
  () => import("./kinds/knowledge").then((m) => m.KnowledgeUx),
  { ssr: false, loading: KindFallback },
);
const VoiceUx = dynamic(
  () => import("./kinds/voice").then((m) => m.VoiceUx),
  { ssr: false, loading: KindFallback },
);
const RescueUx = dynamic(
  () => import("./kinds/rescue").then((m) => m.RescueUx),
  { ssr: false, loading: KindFallback },
);

export default function AgentUxPreview({
  inputs,
  kind,
  locale,
  tasks,
  loop = false,
  live = false,
  animateOnView = false,
  compact = false,
}: AgentUxPreviewProps) {
  const copy = interfaceCopy[locale];
  const isLive = live || animateOnView || loop;

  return (
    <div
      className={styles.root}
      data-compact={compact ? "true" : undefined}
    >
      <Shell kind={kind} loop={loop}>
        {kind === "dali" ? (
          <DaliUx copy={copy} inputs={inputs} live={isLive} />
        ) : null}
        {kind === "lead-response" ? (
          <LeadUx copy={copy} tasks={tasks} live={isLive} />
        ) : null}
        {kind === "client-inbox" ? (
          <InboxUx copy={copy} tasks={tasks} live={isLive} />
        ) : null}
        {kind === "operations-docs" ? (
          <OperationsUx copy={copy} tasks={tasks} live={isLive} />
        ) : null}
        {kind === "knowledge-assistant" ? (
          <KnowledgeUx copy={copy} tasks={tasks} live={isLive} />
        ) : null}
        {kind === "voice-agents" ? (
          <VoiceUx copy={copy} tasks={tasks} live={isLive} />
        ) : null}
        {kind === "rescue-console" ? (
          <RescueUx copy={copy} tasks={tasks} live={isLive} />
        ) : null}
      </Shell>
    </div>
  );
}
