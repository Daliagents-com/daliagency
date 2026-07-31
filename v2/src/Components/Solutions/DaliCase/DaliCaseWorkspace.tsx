// Purpose: Full-page Dali multi-agent workspace (canvas + chat).
// Scope: Used on /solutions. Nodes draggable; logos real; stage loop live.
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
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
import styles from "./DaliCase.module.css";
import { interfaceCopy, type Copy } from "@/Components/Home/AgentUxPreview/copy";
import { useLiveStage } from "@/Components/Home/AgentUxPreview/shared";
import type { Locale } from "@/i18n/config";

type AgentId = "lead" | "inbox" | "ops" | "knowledge" | "voice";

type AgentNodeData = {
  kind: "agent";
  agentId: AgentId;
  title: string;
  role: string;
  statusLabel: string;
  statusTone: "neutral" | "blue" | "green";
  active: boolean;
  enterDelay: number;
};

type ToolNodeData = {
  kind: "tool";
  label: string;
  logo: string;
  active: boolean;
  enterDelay: number;
};

type FlowNodeData = AgentNodeData | ToolNodeData;
type AgentFlowNode = Node<FlowNodeData, "agent" | "tool">;

type ChatMessage = {
  id: string;
  role: "user" | "agent" | "system";
  body: string;
};

/** Stage loop follows customer journey order. */
const STAGE_ORDER: readonly AgentId[] = [
  "lead",
  "voice",
  "inbox",
  "ops",
  "knowledge",
];

/**
 * Mixed graph: tools sit next to the agents they serve.
 * Read flow still exists (lead → voice → inbox → ops) but layout is clustered, not 3 boring columns.
 *
 *   [Gmail]          [HubSpot]
 *        \            /
 *         [Lead Response]
 *          /           \
 *   [Calendar]—[Voice]  [Client Inbox]—[Slack]
 *                    \    /        \
 *                  [Operations]  [Knowledge]
 *                       |            |
 *                   [Sheets]      [Notion]
 */
const AGENT_META: Record<
  AgentId,
  { title: string; role: string; x: number; y: number }
> = {
  lead: {
    title: "Lead Response",
    role: "Qualify · first reply",
    x: 280,
    y: 110,
  },
  voice: {
    title: "Voice",
    role: "Call · book",
    x: 160,
    y: 280,
  },
  inbox: {
    title: "Client Inbox",
    role: "Reply · handoff",
    x: 420,
    y: 280,
  },
  ops: {
    title: "Operations",
    role: "Docs · route",
    x: 300,
    y: 450,
  },
  knowledge: {
    title: "Knowledge",
    role: "Cite · ground",
    x: 560,
    y: 430,
  },
};

type ToolKind = "channel" | "system";

const TOOLS: readonly {
  id: string;
  label: string;
  logo: string;
  kind: ToolKind;
  x: number;
  y: number;
  agents: readonly AgentId[];
}[] = [
  {
    id: "gmail",
    label: "Gmail",
    logo: "/integrations/gmail.svg",
    kind: "channel",
    x: 90,
    y: 20,
    agents: ["lead", "inbox"],
  },
  {
    id: "crm",
    label: "HubSpot",
    logo: "/integrations/hubspot.svg",
    kind: "system",
    x: 480,
    y: 30,
    agents: ["lead", "voice", "inbox"],
  },
  {
    id: "calendar",
    label: "Calendar",
    logo: "/integrations/calendar.svg",
    kind: "channel",
    x: 20,
    y: 250,
    agents: ["voice", "lead"],
  },
  {
    id: "slack",
    label: "Slack",
    logo: "/integrations/slack.svg",
    kind: "channel",
    x: 620,
    y: 250,
    agents: ["inbox"],
  },
  {
    id: "sheets",
    label: "Sheets",
    logo: "/integrations/sheets.svg",
    kind: "system",
    x: 180,
    y: 520,
    agents: ["ops"],
  },
  {
    id: "notion",
    label: "Notion",
    logo: "/integrations/notion.svg",
    kind: "system",
    x: 700,
    y: 480,
    agents: ["knowledge"],
  },
];

const HANDOFFS: readonly [AgentId, AgentId][] = [
  ["lead", "voice"],
  ["lead", "inbox"],
  ["voice", "inbox"],
  ["inbox", "ops"],
  ["knowledge", "inbox"],
];

/** Multi-turn seed: [user, agent] - keep voice of the product demo. */
const CHAT_SEED: Record<AgentId, readonly [string, string]> = {
  lead: [
    "New form lead from GreenLeaf. Qualify against ICP and draft first reply?",
    "Qualified. Score 92. Draft is ready in Gmail and HubSpot stage updated.",
  ],
  inbox: [
    "Client asked for invoice status + timeline. Pull CRM history?",
    "Grounded reply prepared with CRM history. Media request paused for human review.",
  ],
  ops: [
    "PDF intake arrived. Extract fields into Sheets + route exceptions?",
    "12 rows written to Sheets. 1 missing tax ID flagged for approval.",
  ],
  knowledge: [
    "What is our refund window for annual plans?",
    "Cited SOP-14: 14 days on annual plans. Refusing unsupported edge cases.",
  ],
  voice: [
    "Inbound discovery call transferred. Summarize and book next step?",
    "Booked Thursday 11:00. CRM note + calendar invite sent.",
  ],
};

const CHAT_REPLIES: Record<AgentId, string> = {
  lead: "Logged. I can draft the reply and update HubSpot when you approve.",
  inbox: "Draft ready with CRM context. Sensitive items stay in review.",
  ops: "Queued for extraction. I will write validated fields only.",
  knowledge: "Searching approved sources. I will cite or refuse if evidence is weak.",
  voice: "I will keep disclosure on, book the next step, and send the invite.",
};

type ToolCall = {
  id: string;
  icon: "calendar" | "crm" | "mail" | "check";
  app: string;
  logo: string;
  action: string;
  detail: string;
  status: string;
};

const TOOL_CALLS: Partial<Record<AgentId, readonly ToolCall[]>> = {
  voice: [
    {
      id: "cal",
      icon: "calendar",
      app: "Calendar",
      logo: "/integrations/calendar.svg",
      action: "Book meeting",
      detail: "Thu 11:00 · Discovery follow-up with Annie",
      status: "Invite sent",
    },
    {
      id: "crm",
      icon: "crm",
      app: "HubSpot",
      logo: "/integrations/hubspot.svg",
      action: "Update deal",
      detail: "Stage → Meeting booked",
      status: "Done",
    },
  ],
  lead: [
    {
      id: "mail",
      icon: "mail",
      app: "Gmail",
      logo: "/integrations/gmail.svg",
      action: "Draft reply",
      detail: "Personalized first reply ready for review",
      status: "Ready",
    },
    {
      id: "crm-lead",
      icon: "crm",
      app: "HubSpot",
      logo: "/integrations/hubspot.svg",
      action: "Update contact",
      detail: "Score 92 · owner assigned",
      status: "Done",
    },
  ],
};

function statusFor(
  id: AgentId,
  stage: number,
  copy: Copy,
): { label: string; tone: "neutral" | "blue" | "green" } {
  const order = STAGE_ORDER.indexOf(id);
  if (order < stage) return { label: copy.completed, tone: "green" };
  if (order === stage) return { label: copy.live, tone: "blue" };
  return { label: copy.ready, tone: "neutral" };
}

function StatusTag({
  label,
  tone,
}: {
  label: string;
  tone: "neutral" | "blue" | "green";
}) {
  return (
    <span
      className={`${styles.statusTag} ${
        tone === "blue"
          ? styles.statusBlue
          : tone === "green"
            ? styles.statusGreen
            : styles.statusNeutral
      }`}
    >
      {label}
    </span>
  );
}

function AgentNodeView({ data }: NodeProps<AgentFlowNode>) {
  if (data.kind !== "agent") return null;
  return (
    <div
      className={`${styles.nodeAgent} ${styles.nodeEnter} ${
        data.active ? styles.nodeAgentActive : ""
      }`}
      style={{ animationDelay: `${data.enterDelay ?? 0}ms` }}
    >
      <Handle type="target" position={Position.Left} className={styles.handle} />
      <Handle type="target" position={Position.Top} id="t" className={styles.handle} />
      <span className={styles.nodeRole}>{data.role}</span>
      <strong className={styles.nodeTitle}>{data.title}</strong>
      <StatusTag label={data.statusLabel} tone={data.statusTone} />
      <Handle type="source" position={Position.Right} className={styles.handle} />
      <Handle type="source" position={Position.Bottom} id="b" className={styles.handle} />
    </div>
  );
}

function ToolNodeView({ data }: NodeProps<AgentFlowNode>) {
  if (data.kind !== "tool") return null;
  return (
    <div
      className={`${styles.nodeTool} ${styles.nodeEnter} ${
        data.active ? styles.nodeToolActive : ""
      }`}
      style={{ animationDelay: `${data.enterDelay ?? 0}ms` }}
    >
      <Handle type="source" position={Position.Bottom} className={styles.handle} />
      <Handle type="source" position={Position.Right} id="r" className={styles.handle} />
      <span className={styles.nodeToolLogo}>
        <Image src={data.logo} alt="" width={24} height={24} unoptimized />
      </span>
      <span>{data.label}</span>
      <Handle type="target" position={Position.Left} id="l" className={styles.handle} />
    </div>
  );
}

const nodeTypes = {
  agent: AgentNodeView,
  tool: ToolNodeView,
};

function buildInitialNodes(stage: number, copy: Copy): AgentFlowNode[] {
  const focus = STAGE_ORDER[stage] ?? "lead";
  const agentNodes: AgentFlowNode[] = STAGE_ORDER.map((id, index) => {
    const meta = AGENT_META[id];
    const st = statusFor(id, stage, copy);
    return {
      id,
      type: "agent",
      position: { x: meta.x, y: meta.y },
      data: {
        kind: "agent",
        agentId: id,
        title: meta.title,
        role: meta.role,
        statusLabel: st.label,
        statusTone: st.tone,
        active: id === focus,
        enterDelay: 180 + index * 70,
      },
      draggable: true,
      selectable: true,
    };
  });

  const toolNodes: AgentFlowNode[] = TOOLS.map((tool, index) => ({
    id: tool.id,
    type: "tool",
    position: { x: tool.x, y: tool.y },
    data: {
      kind: "tool",
      label: tool.label,
      logo: tool.logo,
      active: tool.agents.includes(focus),
      enterDelay: 80 + index * 55,
    },
    draggable: true,
    selectable: true,
  }));

  return [...toolNodes, ...agentNodes];
}

function buildEdges(stage: number): Edge[] {
  const focus = STAGE_ORDER[stage] ?? "lead";

  // Channels feed agents (left → center). Systems receive from agents (center → right).
  const ioEdges: Edge[] = TOOLS.flatMap((tool) =>
    tool.agents.map((agentId) => {
      const hot = agentId === focus;
      const isChannel = tool.kind === "channel";
      const source = isChannel ? tool.id : agentId;
      const target = isChannel ? agentId : tool.id;
      return {
        id: `${source}->${target}`,
        source,
        target,
        type: "smoothstep",
        animated: hot,
        style: {
          stroke: hot
            ? isChannel
              ? "#8b9bc9"
              : "#6b8f7a"
            : isChannel
              ? "#c9ced8"
              : "#c5d0c9",
          strokeWidth: hot ? 2 : 1.4,
          opacity: hot ? 0.95 : 0.55,
          // Dashed links: channels short dash, systems longer dash
          strokeDasharray: isChannel ? "4 5" : "7 6",
        } satisfies CSSProperties,
      };
    }),
  );

  const handoffEdges: Edge[] = HANDOFFS.map(([a, b]) => {
    const hot = a === focus || b === focus;
    return {
      id: `${a}->${b}`,
      source: a,
      target: b,
      type: "smoothstep",
      animated: hot,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 16,
        height: 16,
        color: hot ? "#4c63c9" : "#c4c9d4",
      },
      style: {
        stroke: hot ? "#4c63c9" : "#c4c9d4",
        strokeWidth: hot ? 2.2 : 1.55,
        opacity: hot ? 1 : 0.55,
        // Soft dashed handoffs so the map feels lighter
        strokeDasharray: hot ? "6 4" : "5 6",
      } satisfies CSSProperties,
    };
  });

  return [...ioEdges, ...handoffEdges];
}

function FlowCanvas({ stage, copy }: { stage: number; copy: Copy }) {
  const { fitView } = useReactFlow();
  const didFit = useRef(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    buildInitialNodes(stage, copy),
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(buildEdges(stage));

  useEffect(() => {
    const focus = STAGE_ORDER[stage] ?? "lead";
    setNodes((current) =>
      current.map((node) => {
        if (node.type === "agent" && node.data.kind === "agent") {
          const st = statusFor(node.data.agentId, stage, copy);
          return {
            ...node,
            data: {
              ...node.data,
              statusLabel: st.label,
              statusTone: st.tone,
              active: node.data.agentId === focus,
            },
          };
        }
        if (node.type === "tool" && node.data.kind === "tool") {
          const tool = TOOLS.find((t) => t.id === node.id);
          return {
            ...node,
            data: {
              ...node.data,
              active: tool ? tool.agents.includes(focus) : false,
            },
          };
        }
        return node;
      }),
    );
    setEdges(buildEdges(stage));
  }, [stage, copy, setNodes, setEdges]);

  const onInit = useCallback(() => {
    if (didFit.current) return;
    didFit.current = true;
    fitView({ padding: 0.14, duration: 0, includeHiddenNodes: true });
  }, [fitView]);

  return (
    <ReactFlow
      className={styles.canvas}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onInit={onInit}
      nodeTypes={nodeTypes}
      nodesDraggable
      nodesConnectable={false}
      elementsSelectable
      panOnDrag
      zoomOnScroll
      zoomOnPinch
      zoomOnDoubleClick={false}
      preventScrolling={false}
      selectionOnDrag={false}
      proOptions={{ hideAttribution: true }}
      minZoom={0.4}
      maxZoom={1.4}
      defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
    >
      <Background
        variant={BackgroundVariant.Dots}
        gap={16}
        size={1.2}
        color="#d4d4d8"
      />
    </ReactFlow>
  );
}

function ToolCallCards({ tools }: { tools: readonly ToolCall[] }) {
  return (
    <div className={styles.toolStack} aria-label="Actions taken">
      <p className={styles.toolStackLabel}>Actions</p>
      <ol className={styles.toolTimeline}>
        {tools.map((tool, index) => (
          <li key={tool.id} className={styles.toolCard}>
            <span className={styles.toolRail} aria-hidden="true">
              <i className={styles.toolDot} />
              {index < tools.length - 1 ? <i className={styles.toolLine} /> : null}
            </span>
            <div className={styles.toolBody}>
              <div className={styles.toolCardTop}>
                <span className={styles.toolIconImg} aria-hidden="true">
                  <Image src={tool.logo} alt="" width={18} height={18} unoptimized />
                </span>
                <div className={styles.toolCopy}>
                  <span className={styles.toolApp}>{tool.app}</span>
                  <strong className={styles.toolAction}>{tool.action}</strong>
                </div>
                <span className={styles.toolStatus}>{tool.status}</span>
              </div>
              <p className={styles.toolDetail}>{tool.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function AgentChat({
  focus,
  copy,
}: {
  focus: AgentId;
  stage: number;
  copy: Copy;
}) {
  const seed = CHAT_SEED[focus];
  const shortName = AGENT_META[focus].title;
  const tools = TOOL_CALLS[focus] ?? [];
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: "u-0", role: "user", body: seed[0] },
    { id: "a-0", role: "agent", body: seed[1] },
  ]);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);
  const prevFocus = useRef(focus);

  useEffect(() => {
    if (prevFocus.current === focus) return;
    prevFocus.current = focus;
    const next = CHAT_SEED[focus];
    setMessages([
      { id: `u-${focus}`, role: "user", body: next[0] },
      { id: `a-${focus}`, role: "agent", body: next[1] },
    ]);
    setDraft("");
  }, [focus]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, tools, focus]);

  const pushUser = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setMessages((prev) => [
        ...prev,
        { id: `u-${Date.now()}`, role: "user", body: trimmed },
        {
          id: `a-${Date.now() + 1}`,
          role: "agent",
          body: CHAT_REPLIES[focus],
        },
      ]);
      setDraft("");
    },
    [focus],
  );

  return (
    <aside className={styles.chat} aria-label={`${shortName} chat`}>
      <header className={styles.chatHead}>
        <h3>{shortName}</h3>
      </header>

      <div ref={listRef} className={styles.chatList}>
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`${styles.chatBlock} ${styles.chatBlockEnter}`}
            style={{ animationDelay: `${120 + index * 90}ms` }}
          >
            <div
              className={
                msg.role === "user"
                  ? styles.bubbleUser
                  : msg.role === "agent"
                    ? styles.bubbleAgent
                    : styles.bubbleSystem
              }
            >
              {msg.role !== "system" ? (
                <span className={styles.chatWho}>
                  {msg.role === "user" ? "You" : shortName}
                </span>
              ) : null}
              <p>{msg.body}</p>
            </div>
            {msg.role === "agent" && tools.length > 0 ? (
              <ToolCallCards tools={tools} />
            ) : null}
          </div>
        ))}
      </div>

      <form
        className={styles.composer}
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          pushUser(draft);
        }}
      >
        <input
          className={styles.input}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              pushUser(draft);
            }
          }}
          placeholder="Message agent…"
          aria-label="Message agent"
        />
        <button type="submit" className={styles.sendBtn}>
          {copy.send}
        </button>
      </form>
    </aside>
  );
}

export default function DaliCaseWorkspace({
  locale = "en",
  live = true,
}: {
  locale?: Locale;
  live?: boolean;
}) {
  const copy = interfaceCopy[locale];
  const stage = useLiveStage(live, 5, 1600);
  const focus = STAGE_ORDER[stage] ?? "lead";

  return (
    <div
      className={`${styles.workspace} ${styles.workspaceEnter}`}
      data-live={live ? "true" : "false"}
    >
      <div className={`${styles.workspaceBar} ${styles.uiEnter}`} style={{ animationDelay: "40ms" }}>
        <div>
          <p className={styles.workspaceKicker}>Production map</p>
          <h2 className={styles.workspaceTitle}>Dali multi-agent system</h2>
        </div>
        <p className={styles.workspaceHint}>
          Drag nodes · chat follows the active agent
        </p>
      </div>

      <div className={styles.workspaceBody}>
        <div
          className={`${styles.canvasShell} ${styles.uiEnter}`}
          style={{ animationDelay: "120ms" }}
        >
          <ReactFlowProvider>
            <FlowCanvas stage={stage} copy={copy} />
          </ReactFlowProvider>
        </div>
        <div className={styles.uiEnter} style={{ animationDelay: "220ms", minHeight: 0, display: "flex" }}>
          <AgentChat focus={focus} stage={stage} copy={copy} />
        </div>
      </div>
    </div>
  );
}
