// Purpose: Dali agent product mock - draggable React Flow canvas + agent chat.
// Scope: Inside AgentUxPreview shell only. Other pilot mocks unchanged.
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
import styles from "../../AgentUxPreview.module.css";
import type { Copy } from "../copy";
import { Tag, Toolbar, useLiveStage } from "../shared";

type AgentId = "lead" | "inbox" | "ops" | "knowledge" | "voice";

type AgentNodeData = {
  kind: "agent";
  agentId: AgentId;
  title: string;
  role: string;
  statusLabel: string;
  statusTone: "neutral" | "blue" | "green" | "amber";
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

const STAGE_ORDER: readonly AgentId[] = [
  "lead",
  "voice",
  "inbox",
  "ops",
  "knowledge",
];

/**
 * Mixed clusters (tools next to agents they serve):
 *   Gmail / HubSpot around Lead
 *   Calendar around Voice · Slack around Inbox
 *   Sheets around Ops · Notion around Knowledge
 */
const AGENT_META: Record<
  AgentId,
  { title: string; role: string; x: number; y: number }
> = {
  lead: {
    title: "Lead Response",
    role: "Qualify · first reply",
    x: 250,
    y: 95,
  },
  voice: {
    title: "Voice",
    role: "Call · book",
    x: 140,
    y: 250,
  },
  inbox: {
    title: "Client Inbox",
    role: "Reply · handoff",
    x: 380,
    y: 250,
  },
  ops: {
    title: "Operations",
    role: "Docs · route",
    x: 260,
    y: 400,
  },
  knowledge: {
    title: "Knowledge",
    role: "Cite · ground",
    x: 500,
    y: 385,
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
    x: 70,
    y: 16,
    agents: ["lead", "inbox"],
  },
  {
    id: "crm",
    label: "HubSpot",
    logo: "/integrations/hubspot.svg",
    kind: "system",
    x: 430,
    y: 24,
    agents: ["lead", "voice", "inbox"],
  },
  {
    id: "calendar",
    label: "Calendar",
    logo: "/integrations/calendar.svg",
    kind: "channel",
    x: 16,
    y: 220,
    agents: ["voice", "lead"],
  },
  {
    id: "slack",
    label: "Slack",
    logo: "/integrations/slack.svg",
    kind: "channel",
    x: 560,
    y: 220,
    agents: ["inbox"],
  },
  {
    id: "sheets",
    label: "Sheets",
    logo: "/integrations/sheets.svg",
    kind: "system",
    x: 150,
    y: 470,
    agents: ["ops"],
  },
  {
    id: "notion",
    label: "Notion",
    logo: "/integrations/notion.svg",
    kind: "system",
    x: 620,
    y: 430,
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
  icon: "calendar" | "crm" | "mail";
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

function AgentNodeView({ data }: NodeProps<AgentFlowNode>) {
  if (data.kind !== "agent") return null;
  return (
    <div
      className={`${styles.rfAgent} ${styles.nodeEnter} ${
        data.active ? styles.rfAgentActive : ""
      }`}
      style={{ animationDelay: `${data.enterDelay ?? 0}ms` }}
    >
      <Handle type="target" position={Position.Left} className={styles.rfHandle} />
      <Handle type="target" position={Position.Top} id="t" className={styles.rfHandle} />
      <span className={styles.rfAgentRole}>{data.role}</span>
      <strong className={styles.rfAgentTitle}>{data.title}</strong>
      <Tag tone={data.statusTone}>{data.statusLabel}</Tag>
      <Handle type="source" position={Position.Right} className={styles.rfHandle} />
      <Handle type="source" position={Position.Bottom} id="b" className={styles.rfHandle} />
    </div>
  );
}

function ToolNodeView({ data }: NodeProps<AgentFlowNode>) {
  if (data.kind !== "tool") return null;
  return (
    <div
      className={`${styles.rfTool} ${styles.nodeEnter} ${
        data.active ? styles.rfToolActive : ""
      }`}
      style={{ animationDelay: `${data.enterDelay ?? 0}ms` }}
    >
      <Handle type="source" position={Position.Bottom} className={styles.rfHandle} />
      <Handle type="source" position={Position.Right} id="r" className={styles.rfHandle} />
      <span className={styles.rfToolLogo}>
        <Image
          src={data.logo}
          alt={data.label || "Integration"}
          width={22}
          height={22}
          unoptimized
        />
      </span>
      <span>{data.label}</span>
      <Handle type="target" position={Position.Left} id="l" className={styles.rfHandle} />
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
        enterDelay: 160 + index * 65,
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
      enterDelay: 70 + index * 50,
    },
    draggable: true,
    selectable: true,
  }));

  return [...toolNodes, ...agentNodes];
}

function buildEdges(stage: number): Edge[] {
  const focus = STAGE_ORDER[stage] ?? "lead";

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
              ? "#d5d8e0"
              : "#d0d8d4",
          strokeWidth: hot ? 1.8 : 1.25,
          opacity: hot ? 0.9 : 0.52,
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
        width: 14,
        height: 14,
        color: hot ? "#4c63c9" : "#c4c9d4",
      },
      style: {
        stroke: hot ? "#4c63c9" : "#c4c9d4",
        strokeWidth: hot ? 2 : 1.35,
        strokeDasharray: hot ? "6 4" : "5 6",
        opacity: hot ? 1 : 0.48,
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

  // Stage loop updates data + edges only - keeps user drag positions.
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
    fitView({ padding: 0.12, duration: 0, includeHiddenNodes: true });
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
      nodesDraggable
      nodesConnectable={false}
      elementsSelectable
      panOnDrag
      panOnScroll={false}
      zoomOnScroll
      zoomOnPinch
      zoomOnDoubleClick={false}
      preventScrolling={false}
      selectionOnDrag={false}
      proOptions={{ hideAttribution: true }}
      minZoom={0.45}
      maxZoom={1.35}
      defaultViewport={{ x: 0, y: 0, zoom: 0.85 }}
    >
      <Background
        variant={BackgroundVariant.Dots}
        gap={14}
        size={1}
        color="#d8d8dc"
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
              {index < tools.length - 1 ? (
                <i className={styles.toolLine} />
              ) : null}
            </span>
            <div className={styles.toolBody}>
              <div className={styles.toolCardTop}>
                <span className={styles.toolIcon} aria-hidden="true">
                  <Image
                    src={tool.logo}
                    alt={tool.app || "Tool"}
                    width={14}
                    height={14}
                    unoptimized
                  />
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
    <aside className={styles.chatPane} aria-label={`${shortName} chat`}>
      <header className={styles.chatHead}>
        <h4>{shortName}</h4>
      </header>

      <div ref={listRef} className={styles.chatList}>
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`${styles.chatBlock} ${styles.chatBlockEnter}`}
            style={{ animationDelay: `${100 + index * 80}ms` }}
          >
            <div
              className={
                msg.role === "user"
                  ? styles.chatBubbleUser
                  : msg.role === "agent"
                    ? styles.chatBubbleAgent
                    : styles.chatBubbleSystem
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
        className={styles.chatComposer}
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          pushUser(draft);
        }}
      >
        <input
          className={styles.chatInput}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              pushUser(draft);
            }
          }}
          placeholder="Message agent…"
          aria-label="Message agent"
        />
        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
          {copy.send}
        </button>
      </form>
    </aside>
  );
}

export function DaliUx({
  copy,
  live = false,
}: {
  copy: Copy;
  inputs?: readonly string[];
  live?: boolean;
}) {
  const stage = useLiveStage(live, 5, 1600);
  const focus = STAGE_ORDER[stage] ?? "lead";

  return (
    <div className={styles.dash} data-live={live ? "true" : "false"}>
      <div className={styles.main}>
        <Toolbar
          title="Production map"
          actions={
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`}>
              + Add agent
            </button>
          }
        />

        <div className={styles.viewTabs}>
          <div className={`${styles.viewTab} ${styles.viewTabActive}`}>
            Canvas
            <span className={styles.viewCount}>5</span>
          </div>
          <div className={styles.viewTab}>Chat</div>
          <div className={styles.viewTab}>Runs</div>
        </div>

        <div className={`${styles.body} ${styles.bodyTall}`}>
          <div className={styles.canvasPane}>
            <ReactFlowProvider>
              <FlowCanvas stage={stage} copy={copy} />
            </ReactFlowProvider>
          </div>

          <AgentChat focus={focus} stage={stage} copy={copy} />
        </div>
      </div>
    </div>
  );
}
