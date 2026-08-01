// Purpose: Real @xyflow agent org graph inside homepage hero product mock.
// Scope: Agents tour view only. Stats + banner + feed shell stay here; other views unchanged.
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Background,
  BackgroundVariant,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { MockAvatar } from "@/Components/ui/MockAvatar";
import { AGENTS_VIEW_MS } from "@/Components/Home/heroTourTiming";
import styles from "./HeroProductMock.module.css";

export { AGENTS_VIEW_MS };

type AgentId = "orch" | "lead" | "know" | "inbox" | "voice" | "ops";
type AgentPhase = "idle" | "receive" | "work" | "pass" | "done";

type AgentNodeData = {
  kind: "agent";
  agentId: AgentId;
  name: string;
  seed: string;
  role: string;
  crown?: boolean;
  phase: AgentPhase;
  task?: string;
};

type AgentFlowNode = Node<AgentNodeData, "agent">;

const EASE_SOFT = [0.33, 0.08, 0.18, 1] as const;

/** Hierarchical layout matching product org chart (screenshot). */
const AGENT_META: Record<
  AgentId,
  { name: string; seed: string; role: string; crown?: boolean; x: number; y: number }
> = {
  orch: {
    name: "Orchestrator",
    seed: "Orchestrator",
    role: "Route · assign · review",
    crown: true,
    x: 268,
    y: 8,
  },
  lead: {
    name: "Lead Response",
    seed: "Lead Response",
    role: "Qualify · draft · book",
    x: 28,
    y: 148,
  },
  inbox: {
    name: "Client Inbox",
    seed: "Client Inbox",
    role: "Replies · handoff",
    x: 268,
    y: 148,
  },
  voice: {
    name: "Voice",
    seed: "Voice Agent",
    role: "Calls · slots",
    x: 508,
    y: 148,
  },
  know: {
    name: "Knowledge",
    seed: "Knowledge Agent",
    role: "SOPs · cite",
    x: 118,
    y: 298,
  },
  ops: {
    name: "Operations",
    seed: "Operations Agent",
    role: "Docs · fields",
    x: 398,
    y: 298,
  },
};

/**
 * Linear handoff baton (story):
 * Orchestrator → Lead → Knowledge → Inbox → Voice → Ops
 */
const HANDOFF_CHAIN: readonly {
  id: AgentId;
  workTask: string;
  passTask: string;
  receiveTask: string;
  bannerWork: string;
  bannerPass: string;
  bannerReceive: string;
  feed: { t: string; agent: string; text: string };
  /** Edge lit during pass from this agent */
  passEdge: string | null;
}[] = [
  {
    id: "orch",
    workTask: "Routing GreenLeaf…",
    passTask: "Sending → Lead",
    receiveTask: "",
    bannerWork: "Orchestrator opens the GreenLeaf run",
    bannerPass: "Command → Lead Response",
    bannerReceive: "",
    feed: { t: "now", agent: "Orch", text: "Routed GreenLeaf → Lead" },
    passEdge: "orch-lead",
  },
  {
    id: "lead",
    workTask: "Scoring ICP · HubSpot",
    passTask: "Requesting cite → Knowledge",
    receiveTask: "Accepted from Orchestrator",
    bannerWork: "Lead Response qualifies the deal",
    bannerPass: "Lead → Knowledge",
    bannerReceive: "Lead Response accepts the command",
    feed: { t: "1m", agent: "Lead", text: "Qualified · score 92" },
    passEdge: "lead-know",
  },
  {
    id: "know",
    workTask: "Citing annual pricing SOP",
    passTask: "Cite ready → Inbox",
    receiveTask: "Accepted from Lead",
    bannerWork: "Knowledge cites pricing SOP",
    bannerPass: "Knowledge → Inbox",
    bannerReceive: "Knowledge accepts the request",
    feed: { t: "2m", agent: "Know", text: "Cited annual pricing SOP" },
    passEdge: "know-inbox",
  },
  {
    id: "inbox",
    workTask: "Drafting Annie reply",
    passTask: "Draft ready → Voice",
    receiveTask: "Accepted from Knowledge",
    bannerWork: "Inbox drafts the client reply",
    bannerPass: "Inbox → Voice",
    bannerReceive: "Inbox accepts the handoff",
    feed: { t: "3m", agent: "Inbox", text: "Draft ready for Annie Zhang" },
    passEdge: "inbox-voice",
  },
  {
    id: "voice",
    workTask: "Holding 2 demo slots",
    passTask: "Slots held → Operations",
    receiveTask: "Accepted from Inbox",
    bannerWork: "Voice holds demo slots",
    bannerPass: "Voice → Operations",
    bannerReceive: "Voice accepts the handoff",
    feed: { t: "5m", agent: "Voice", text: "2 demo slots held this week" },
    passEdge: "voice-ops",
  },
  {
    id: "ops",
    workTask: "Syncing HubSpot fields",
    passTask: "",
    receiveTask: "Accepted from Voice",
    bannerWork: "Operations syncs CRM · run complete",
    bannerPass: "",
    bannerReceive: "Operations accepts the handoff",
    feed: { t: "7m", agent: "Ops", text: "Synced CRM fields · HubSpot" },
    passEdge: null,
  },
] as const;

/** Tree edges always present (dim). Handoff path edges animate when hot. */
const TREE_EDGES: readonly {
  id: string;
  source: AgentId;
  target: AgentId;
  sourceHandle?: string;
  targetHandle?: string;
}[] = [
  { id: "orch-lead", source: "orch", target: "lead", sourceHandle: "b", targetHandle: "t" },
  { id: "orch-inbox", source: "orch", target: "inbox", sourceHandle: "b", targetHandle: "t" },
  { id: "orch-voice", source: "orch", target: "voice", sourceHandle: "b", targetHandle: "t" },
  { id: "lead-know", source: "lead", target: "know", sourceHandle: "b", targetHandle: "t" },
  // know.r (source) → inbox.l (target) - handoff path after cite
  { id: "know-inbox", source: "know", target: "inbox", sourceHandle: "r", targetHandle: "l" },
  { id: "inbox-voice", source: "inbox", target: "voice", sourceHandle: "r", targetHandle: "l" },
  { id: "voice-ops", source: "voice", target: "ops", sourceHandle: "b", targetHandle: "t" },
];

/**
 * Phase pacing for one readable handoff cycle.
 * Keep Agents tab short so the product tour moves on; still one full chain.
 * receive < pass < work so accept/pass feel crisp and work can be scanned.
 */
const PHASE_MS = {
  receive: 320,
  work: 560,
  pass: 380,
} as const;

/** Brief hold on final frame, then parent tour leaves Agents. */
const SETTLE_MS = 700;

type HandoffBeat = {
  focus: AgentId;
  phase: AgentPhase;
  banner: string;
  focusTask: string;
  doneTasks: Partial<Record<AgentId, string>>;
  live: AgentId[];
  feedCount: number;
  passEdge: string | null;
  runs: number;
  review: number;
};

function buildHandoffTimeline(): HandoffBeat[] {
  const beats: HandoffBeat[] = [];
  const doneTasks: Partial<Record<AgentId, string>> = {};

  HANDOFF_CHAIN.forEach((agent, index) => {
    const live = HANDOFF_CHAIN.slice(0, index + 1).map((a) => a.id);
    const feedBefore = index;
    const feedAfter = index + 1;
    const runs = 8 + index;
    const review = Math.max(2, 6 - Math.floor(index / 2));

    if (index > 0) {
      beats.push({
        focus: agent.id,
        phase: "receive",
        banner: agent.bannerReceive,
        focusTask: agent.receiveTask,
        doneTasks: { ...doneTasks },
        live,
        feedCount: feedBefore,
        passEdge: null,
        runs,
        review,
      });
    }

    beats.push({
      focus: agent.id,
      phase: "work",
      banner: agent.bannerWork,
      focusTask: agent.workTask,
      doneTasks: { ...doneTasks },
      live,
      feedCount: feedAfter,
      passEdge: null,
      runs: runs + (index > 0 ? 0 : 1),
      review,
    });

    const resultLine =
      agent.id === "orch"
        ? "Run open · watching"
        : agent.id === "lead"
          ? "Qualified · score 92"
          : agent.id === "know"
            ? "SOP cited"
            : agent.id === "inbox"
              ? "Draft ready"
              : agent.id === "voice"
                ? "Slots held"
                : "Synced · done";
    doneTasks[agent.id] = resultLine;

    if (agent.passEdge && index < HANDOFF_CHAIN.length - 1) {
      beats.push({
        focus: agent.id,
        phase: "pass",
        banner: agent.bannerPass,
        focusTask: agent.passTask,
        doneTasks: { ...doneTasks },
        live,
        feedCount: feedAfter,
        passEdge: agent.passEdge,
        runs: runs + 1,
        review: Math.max(2, review - 1),
      });
    }
  });

  return beats;
}

const HANDOFF_TIMELINE = buildHandoffTimeline();

function phaseMs(phase: AgentPhase): number {
  if (phase === "receive") return PHASE_MS.receive;
  if (phase === "pass") return PHASE_MS.pass;
  return PHASE_MS.work;
}

const CYCLE_MS = HANDOFF_TIMELINE.reduce((sum, beat) => sum + phaseMs(beat.phase), 0);

// Guard: heroTourTiming.AGENTS_VIEW_MS must equal cycle + settle (tour dwell).
if (process.env.NODE_ENV !== "production" && CYCLE_MS + SETTLE_MS !== AGENTS_VIEW_MS) {
  console.error(
    `[HeroAgentsOrgFlow] AGENTS_VIEW_MS mismatch: timeline=${CYCLE_MS + SETTLE_MS} constant=${AGENTS_VIEW_MS}`,
  );
}

const ORG_ACTIVITY = HANDOFF_CHAIN.map((a) => ({
  ...a.feed,
  agentId: a.id,
}));

function phaseOf(id: AgentId, beat: HandoffBeat): AgentPhase {
  if (beat.focus === id) return beat.phase;
  if (beat.live.includes(id)) return "done";
  return "idle";
}

function taskFor(id: AgentId, beat: HandoffBeat): string | undefined {
  if (beat.focus === id) return beat.focusTask;
  return beat.doneTasks[id];
}

function statusLabel(phase: AgentPhase): string {
  switch (phase) {
    case "receive":
      return "Accepted";
    case "work":
      return "Working";
    case "pass":
      return "Passing";
    case "done":
      return "Done";
    default:
      return "Idle";
  }
}

function AgentNodeView({ data }: NodeProps<AgentFlowNode>) {
  const phase = data.phase;
  return (
    <div
      className={`${styles.rfNode} ${styles[`rfNode_${phase}`] ?? ""}`}
      data-phase={phase}
      data-crown={data.crown ? "true" : "false"}
    >
      <Handle type="target" position={Position.Top} id="t" className={styles.rfHandle} />
      <Handle type="target" position={Position.Left} id="l" className={styles.rfHandle} />

      <div className={styles.rfNodeTop}>
        <MockAvatar
          seed={data.seed}
          alt={data.name}
          className={`${styles.rfNodeAvatar} ${data.crown ? styles.rfNodeAvatarCrown : ""} ${
            phase === "work" || phase === "receive" || phase === "pass"
              ? styles.rfNodeAvatarActive
              : ""
          }`}
          size={18}
        />
        <span className={styles.rfNodeName}>{data.name}</span>
      </div>
      <span className={styles.rfNodeRole}>{data.role}</span>
      <span className={styles.rfNodeTask} data-empty={data.task ? "false" : "true"}>
        {data.task || "\u00a0"}
      </span>
      <span
        className={`${styles.rfNodeStatus} ${
          phase === "idle" ? "" : styles.rfNodeStatusLive
        } ${
          phase === "work" || phase === "receive" || phase === "pass"
            ? styles.rfNodeStatusActive
            : ""
        }`}
      >
        <i className={styles.rfNodeDot} />
        {statusLabel(phase)}
      </span>

      <Handle type="source" position={Position.Bottom} id="b" className={styles.rfHandle} />
      <Handle type="source" position={Position.Right} id="r" className={styles.rfHandle} />
    </div>
  );
}

const nodeTypes = { agent: AgentNodeView };

function buildNodes(beat: HandoffBeat): AgentFlowNode[] {
  return (Object.keys(AGENT_META) as AgentId[]).map((id) => {
    const meta = AGENT_META[id];
    return {
      id,
      type: "agent",
      position: { x: meta.x, y: meta.y },
      data: {
        kind: "agent",
        agentId: id,
        name: meta.name,
        seed: meta.seed,
        role: meta.role,
        crown: meta.crown,
        phase: phaseOf(id, beat),
        task: taskFor(id, beat),
      },
      draggable: false,
      selectable: false,
      // Smooth style updates via CSS; RF position fixed for mock.
    };
  });
}

function buildEdges(beat: HandoffBeat): Edge[] {
  const hotEdge = beat.passEdge;
  const live = new Set(beat.live);

  return TREE_EDGES.map((e) => {
    const isPass = hotEdge === e.id;
    // Path lit after both ends have joined the run (or during active pass).
    const pathOn =
      isPass ||
      (live.has(e.source) && live.has(e.target)) ||
      (live.has(e.source) && e.source === beat.focus);
    const stroke = isPass
      ? "#1e3a8a"
      : pathOn
        ? "#6b7eb8"
        : "#c9ced8";

    return {
      id: e.id,
      source: e.source,
      target: e.target,
      sourceHandle: e.sourceHandle,
      targetHandle: e.targetHandle,
      type: "smoothstep",
      animated: isPass || (beat.phase === "work" && beat.focus === e.source),
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 12,
        height: 12,
        color: stroke,
      },
      style: {
        stroke,
        strokeWidth: isPass ? 2.2 : pathOn ? 1.6 : 1.25,
        opacity: isPass ? 1 : pathOn ? 0.85 : 0.42,
        strokeDasharray: isPass ? "5 4" : pathOn ? "6 5" : "4 6",
        transition: "stroke 0.45s ease, opacity 0.45s ease, stroke-width 0.45s ease",
      } satisfies CSSProperties,
    };
  });
}

function OrgFlowCanvas({ beat }: { beat: HandoffBeat }) {
  const { fitView } = useReactFlow();
  const didFit = useRef(false);
  const initial = useMemo(() => buildNodes(beat), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [nodes, setNodes, onNodesChange] = useNodesState(initial);
  const [edges, setEdges, onEdgesChange] = useEdgesState(buildEdges(beat));

  useEffect(() => {
    setNodes((current) =>
      current.map((node) => {
        const id = node.id as AgentId;
        return {
          ...node,
          data: {
            ...node.data,
            phase: phaseOf(id, beat),
            task: taskFor(id, beat),
          },
        };
      }),
    );
    setEdges(buildEdges(beat));
  }, [beat, setNodes, setEdges]);

  const onInit = useCallback(() => {
    if (didFit.current) return;
    didFit.current = true;
    // Slight delay so node sizes measure before fit.
    requestAnimationFrame(() => {
      fitView({ padding: 0.18, duration: 0, includeHiddenNodes: true });
    });
  }, [fitView]);

  // Re-fit if container resizes (hero card entrance).
  useEffect(() => {
    const t = window.setTimeout(() => {
      fitView({ padding: 0.18, duration: 280, includeHiddenNodes: true });
    }, 400);
    return () => window.clearTimeout(t);
  }, [fitView]);

  return (
    <ReactFlow
      className={styles.rfCanvas}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onInit={onInit}
      nodeTypes={nodeTypes}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      panOnDrag={false}
      panOnScroll={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      preventScrolling={false}
      selectionOnDrag={false}
      proOptions={{ hideAttribution: true }}
      minZoom={0.55}
      maxZoom={1.2}
      defaultViewport={{ x: 0, y: 0, zoom: 0.9 }}
    >
      <Background
        variant={BackgroundVariant.Dots}
        gap={16}
        size={1}
        color="#d6d8de"
      />
    </ReactFlow>
  );
}

export default function HeroAgentsOrgFlow() {
  const reduce = useReducedMotion();
  const [beatIndex, setBeatIndex] = useState(0);

  // One full chain, then freeze on the last beat (no loop cut mid-handoff).
  useEffect(() => {
    if (reduce) {
      setBeatIndex(HANDOFF_TIMELINE.length - 1);
      return;
    }

    setBeatIndex(0);
    let i = 0;
    let timer = 0;

    const schedule = () => {
      const beat = HANDOFF_TIMELINE[i];
      const ms =
        beat.phase === "receive"
          ? PHASE_MS.receive
          : beat.phase === "pass"
            ? PHASE_MS.pass
            : PHASE_MS.work;
      timer = window.setTimeout(() => {
        if (i >= HANDOFF_TIMELINE.length - 1) return;
        i += 1;
        setBeatIndex(i);
        schedule();
      }, ms);
    };

    schedule();
    return () => window.clearTimeout(timer);
  }, [reduce]);

  const beat = HANDOFF_TIMELINE[beatIndex] ?? HANDOFF_TIMELINE[0];
  const liveAgents = beat.live.length;
  const visibleActivity = Math.min(ORG_ACTIVITY.length, beat.feedCount);

  return (
    <div
      className={styles.orgCanvas}
      data-org-phase={beat.phase}
      data-org-focus={beat.focus}
    >
      <div className={styles.orgStats}>
        <div className={`${styles.orgStat} ${styles.orgStatHot}`}>
          <motion.strong
            key={liveAgents}
            initial={reduce ? false : { opacity: 0.45, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: EASE_SOFT }}
          >
            {liveAgents}
          </motion.strong>
          <span>live agents</span>
        </div>
        <div className={styles.orgStat}>
          <motion.strong
            key={`runs-${beat.runs}`}
            initial={reduce ? false : { opacity: 0.45, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: EASE_SOFT }}
          >
            {beat.runs}
          </motion.strong>
          <span>open runs</span>
        </div>
        <div className={styles.orgStat}>
          <strong>{beat.review}</strong>
          <span>need review</span>
        </div>
        <div className={styles.orgStat}>
          <strong>6</strong>
          <span>integrations</span>
        </div>
      </div>

      <div className={styles.orgBanner}>
        <i className={styles.orgBannerDot} data-phase={beat.phase} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={beat.banner}
            className={styles.orgBannerText}
            initial={reduce ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.36, ease: EASE_SOFT }}
          >
            {beat.banner}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className={styles.orgBody}>
        <div className={styles.orgTree}>
          <ReactFlowProvider>
            <OrgFlowCanvas beat={beat} />
          </ReactFlowProvider>
        </div>

        <aside className={styles.orgFeed}>
          <div className={styles.orgFeedTitle}>Live activity</div>
          <div className={styles.orgFeedList}>
            <AnimatePresence initial={false}>
              {ORG_ACTIVITY.slice(0, visibleActivity).map((row) => {
                const hot = row.agentId === beat.focus;
                return (
                  <motion.div
                    key={`${row.t}-${row.text}`}
                    className={`${styles.orgFeedRow} ${hot ? styles.orgFeedRowHot : ""}`}
                    initial={reduce ? false : { opacity: 0, y: 8, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0, y: -5 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : {
                            duration: 0.4,
                            ease: EASE_SOFT,
                            layout: {
                              type: "spring",
                              stiffness: 140,
                              damping: 24,
                              mass: 0.85,
                            },
                          }
                    }
                    layout={!reduce}
                  >
                    <span className={styles.orgFeedTime}>{row.t}</span>
                    <div className={styles.orgFeedBody}>
                      <span className={styles.orgFeedAgent}>{row.agent}</span>
                      <span className={styles.orgFeedText}>{row.text}</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </aside>
      </div>
    </div>
  );
}
