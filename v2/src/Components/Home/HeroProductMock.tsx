// Purpose: Animated light Dali Agents product mock for homepage hero.
// Scope: Replaces static PNG. Attio shell + Paperclip org idea. Framer only.
"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MockAvatar } from "@/Components/ui/MockAvatar";
import styles from "./HeroProductMock.module.css";

type ViewId = "agents" | "home" | "pipeline" | "inbox";

/** Story order: who → how you command → human-in-loop outcome → CRM moves. */
const TOUR: readonly ViewId[] = ["agents", "home", "inbox", "pipeline"];
/** Hold each product page long enough to read the micro-story. Home needs more for chat stream. */
const VIEW_MS: Record<ViewId, number> = {
  agents: 5600,
  home: 8200,
  inbox: 5800,
  pipeline: 5600,
};

type NavIconName =
  | "home"
  | "agents"
  | "pipeline"
  | "inbox"
  | "bell"
  | "tasks"
  | "notes"
  | "calls"
  | "reports"
  | "search"
  | "automations"
  | "workflows"
  | "sequences"
  | "runs"
  | "goals"
  | "chevron";

type NavRow =
  | { kind: "quick" }
  | { kind: "item"; id?: ViewId; label: string; icon: NavIconName; live?: boolean; badge?: string }
  | { kind: "label"; label: string }
  | { kind: "sub"; label: string; icon: NavIconName; live?: boolean }
  | { kind: "agent"; label: string; live?: boolean; color: string };

/** Full product rail - denser than the 4 tour views we animate. */
const SIDEBAR: readonly NavRow[] = [
  { kind: "quick" },
  { kind: "item", id: "home", label: "Home", icon: "home" },
  { kind: "item", label: "Notifications", icon: "bell", badge: "3" },
  { kind: "item", label: "Tasks", icon: "tasks" },
  { kind: "item", label: "Notes", icon: "notes" },
  { kind: "item", label: "Calls", icon: "calls" },
  { kind: "item", label: "Reports", icon: "reports" },
  { kind: "label", label: "Work" },
  { kind: "item", id: "agents", label: "Agents", icon: "agents", live: true },
  { kind: "item", id: "pipeline", label: "Pipeline", icon: "pipeline" },
  { kind: "item", id: "inbox", label: "Inbox", icon: "inbox", badge: "4" },
  { kind: "item", label: "Runs", icon: "runs" },
  { kind: "item", label: "Goals", icon: "goals" },
  { kind: "label", label: "Automations" },
  { kind: "sub", label: "Sequences", icon: "sequences" },
  { kind: "sub", label: "Workflows", icon: "workflows" },
  { kind: "label", label: "Favorites" },
  { kind: "sub", label: "GreenLeaf", icon: "pipeline", live: true },
  { kind: "sub", label: "Lead workflows", icon: "workflows" },
  { kind: "sub", label: "Outreach board", icon: "sequences" },
  { kind: "label", label: "Agents" },
  { kind: "agent", label: "Lead Response", live: true, color: "#1e3a8a" },
  { kind: "agent", label: "Client Inbox", live: true, color: "#0b9f6e" },
  { kind: "agent", label: "Knowledge", color: "#6b7280" },
  { kind: "agent", label: "Voice", color: "#b7791f" },
  { kind: "agent", label: "Operations", color: "#64748b" },
];

const TITLES: Record<ViewId, string> = {
  agents: "Agent company",
  home: "Win deal with GreenLeaf",
  pipeline: "Pipeline",
  inbox: "GreenLeaf · Annie Zhang",
};

const USER_PROMPT = "How do I win my deal with GreenLeaf?";
const REPLY_STREAM =
  "GreenLeaf is ICP-fit (Series A, climate SaaS, ops buying). I would run a supervised plan rather than a single blast:";
const PLAN_ITEMS = [
  "Qualify Annie against ICP and update HubSpot stage",
  "Draft a first reply with annual pricing citations",
  "Offer two demo slots this week via Voice",
] as const;
const TOOL_STEPS = [
  { label: "HubSpot · GreenLeaf record", state: "done" as const },
  { label: "Knowledge · pricing SOP", state: "done" as const },
  { label: "Calendar · open slots", state: "active" as const },
] as const;

const PIPELINE_STAGES = ["Inquiry", "Qualified", "Demo booked"] as const;

const INBOX_STATUSES = [
  { label: "Review", tone: "amber" as const },
  { label: "Ready", tone: "blue" as const },
  { label: "Sent", tone: "green" as const },
];

function NavIcon({ name }: { name: NavIconName }) {
  const common = {
    viewBox: "0 0 16 16",
    fill: "none" as const,
    "aria-hidden": true as const,
  };
  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path
            d="M2.5 7.2 8 2.8l5.5 4.4V13a1 1 0 0 1-1 1H9.2V9.6H6.8V14H3.5a1 1 0 0 1-1-1V7.2Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "agents":
      return (
        <svg {...common}>
          <circle cx="8" cy="4.2" r="1.7" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="3.8" cy="11.2" r="1.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="12.2" cy="11.2" r="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M8 5.9v1.6M8 7.5 4.4 10M8 7.5l3.6 2.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "pipeline":
      return (
        <svg {...common}>
          <path d="M2.5 4h11M2.5 8h11M2.5 12h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="5.5" cy="4" r="1.1" fill="currentColor" />
          <circle cx="9.5" cy="8" r="1.1" fill="currentColor" />
          <circle cx="6.5" cy="12" r="1.1" fill="currentColor" />
        </svg>
      );
    case "inbox":
      return (
        <svg {...common}>
          <path d="M3 4.2h10v7.2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4.2Z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M3 4.2 8 8.1l5-3.9" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path
            d="M4.2 6.4a3.8 3.8 0 0 1 7.6 0c0 2.2.8 3 1.2 3.6H3c.4-.6 1.2-1.4 1.2-3.6Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M6.6 12.4a1.4 1.4 0 0 0 2.8 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "tasks":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M5.2 8.1 7 9.8l3.8-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "notes":
      return (
        <svg {...common}>
          <path d="M4 2.8h6.2L12.5 5v8.2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3.8a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M9.8 2.9V5.4h2.4M5.2 8h5.2M5.2 10.4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "calls":
      return (
        <svg {...common}>
          <path
            d="M4.2 3.5h2.1l.9 2.2-1.2 1.1a8 8 0 0 0 3.2 3.2l1.1-1.2 2.2.9v2.1a1 1 0 0 1-1.1 1A9.5 9.5 0 0 1 3.2 4.6a1 1 0 0 1 1-1.1Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "reports":
      return (
        <svg {...common}>
          <path d="M3.5 12.5V8.2M6.8 12.5V4.5M10.1 12.5V7M13 12.5V5.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="7" cy="7" r="3.4" stroke="currentColor" strokeWidth="1.2" />
          <path d="m9.6 9.6 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "automations":
    case "workflows":
      return (
        <svg {...common}>
          <circle cx="4" cy="4" r="1.4" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="12" cy="8" r="1.4" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="4" cy="12" r="1.4" stroke="currentColor" strokeWidth="1.2" />
          <path d="M5.4 4.6 10.4 7.4M5.4 11.4 10.4 8.6" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "sequences":
      return (
        <svg {...common}>
          <path d="M3 5h10M3 8h10M3 11h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="m11.2 10 1.8 1.4 1.8-1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "runs":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="5.2" stroke="currentColor" strokeWidth="1.2" />
          <path d="M7 5.8v4.4l3.4-2.2L7 5.8Z" fill="currentColor" />
        </svg>
      );
    case "goals":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="5.2" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="8" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="8" cy="8" r="0.7" fill="currentColor" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...common}>
          <path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

function AgentCard({
  seed,
  name,
  role,
  live,
  crown,
}: {
  seed: string;
  name: string;
  role: string;
  live?: boolean;
  crown?: boolean;
}) {
  return (
    <div className={`${styles.agentCard} ${live ? styles.agentCardLive : ""}`}>
      <div className={styles.agentTop}>
        <MockAvatar
          seed={seed}
          alt={name}
          className={`${styles.agentAvatar} ${crown ? styles.agentAvatarCrown : ""}`}
          size={18}
        />
        <span className={styles.agentName}>{name}</span>
      </div>
      <span className={styles.agentRole}>{role}</span>
      <span
        className={`${styles.agentStatus} ${live ? styles.agentStatusLive : ""}`}
      >
        <i className={styles.agentStatusDot} />
        {live ? "Live" : "Idle"}
      </span>
    </div>
  );
}

const ORG_ACTIVITY = [
  { t: "now", agent: "Lead", text: "Qualified GreenLeaf · score 92" },
  { t: "1m", agent: "Inbox", text: "Draft ready for Annie Zhang" },
  { t: "3m", agent: "Knowledge", text: "Cited annual pricing SOP" },
  { t: "6m", agent: "Voice", text: "2 demo slots held this week" },
  { t: "12m", agent: "Ops", text: "Synced CRM fields · HubSpot" },
  { t: "18m", agent: "Lead", text: "Routed Atlas Labs → Voice" },
] as const;

function AgentsView({ beat }: { beat: number }) {
  const leadLive = beat >= 1;
  const inboxLive = beat >= 2;
  const voiceLive = beat >= 3;
  const liveAgents = 1 + (leadLive ? 1 : 0) + (inboxLive ? 1 : 0) + (voiceLive ? 1 : 0);
  const visibleActivity = Math.min(ORG_ACTIVITY.length, 3 + Math.min(beat, 3));

  return (
    <div className={styles.orgCanvas}>
      <div className={styles.orgStats}>
        <div className={styles.orgStat}>
          <strong>{liveAgents}</strong>
          <span>live agents</span>
        </div>
        <div className={styles.orgStat}>
          <strong>12</strong>
          <span>open runs</span>
        </div>
        <div className={styles.orgStat}>
          <strong>4</strong>
          <span>need review</span>
        </div>
        <div className={styles.orgStat}>
          <strong>6</strong>
          <span>integrations</span>
        </div>
      </div>

      <div className={styles.orgBody}>
        <div className={styles.orgTree}>
          <div className={styles.orgRow}>
            <AgentCard
              seed="Orchestrator"
              name="Orchestrator"
              role="Route · assign · review"
              crown
              live={beat >= 0}
            />
          </div>
          <div className={styles.orgStem} data-active={leadLive || inboxLive || voiceLive} />
          <div className={styles.orgRow}>
            <AgentCard
              seed="Lead Response"
              name="Lead Response"
              role="Qualify · draft · book"
              live={leadLive}
            />
            <AgentCard
              seed="Client Inbox"
              name="Client Inbox"
              role="Replies · handoff"
              live={inboxLive}
            />
            <AgentCard
              seed="Voice Agent"
              name="Voice"
              role="Calls · slots"
              live={voiceLive}
            />
          </div>
          <div className={styles.orgStemShort} data-active={leadLive || inboxLive} />
          <div className={styles.orgRow}>
            <AgentCard
              seed="Knowledge Agent"
              name="Knowledge"
              role="SOPs · cite"
              live={beat >= 2}
            />
            <AgentCard seed="Operations Agent" name="Operations" role="Docs · fields" />
          </div>
        </div>

        <aside className={styles.orgFeed}>
          <div className={styles.orgFeedTitle}>Live activity</div>
          {ORG_ACTIVITY.slice(0, visibleActivity).map((row) => (
            <div key={`${row.t}-${row.text}`} className={styles.orgFeedRow}>
              <span className={styles.orgFeedTime}>{row.t}</span>
              <span className={styles.orgFeedAgent}>{row.agent}</span>
              <span className={styles.orgFeedText}>{row.text}</span>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

/**
 * Mission chat timeline (ms from view mount) - feels like a real assistant,
 * not a staged dump of full cards.
 */
const CHAT_T = {
  typeStart: 180,
  typeEnd: 1600,
  sent: 1750,
  thinkStart: 1950,
  toolsStart: 3100,
  streamStart: 3900,
  streamEnd: 5600,
  planStart: 5750,
  runPlan: 7200,
} as const;

function useChatClock(live: boolean) {
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);

  useEffect(() => {
    if (!live || reduce) {
      setT(CHAT_T.runPlan + 200);
      return;
    }
    setT(0);
    const started = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      setT(now - started);
      if (now - started < CHAT_T.runPlan + 400) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [live, reduce]);

  return t;
}

function typeProgress(t: number, start: number, end: number, full: string) {
  if (t < start) return "";
  if (t >= end) return full;
  const p = (t - start) / (end - start);
  // Uneven typing: slightly slower at start, faster mid-string.
  const eased = p < 0.15 ? p * 0.7 : p < 0.85 ? 0.1 + (p - 0.15) * 1.1 : p;
  const n = Math.max(1, Math.floor(full.length * Math.min(1, Math.max(0, eased))));
  return full.slice(0, n);
}

function HomeView({ live }: { live: boolean }) {
  const t = useChatClock(live);
  const typing = t >= CHAT_T.typeStart && t < CHAT_T.sent;
  const typed = typeProgress(t, CHAT_T.typeStart, CHAT_T.typeEnd, USER_PROMPT);
  const sent = t >= CHAT_T.sent;
  const thinking = t >= CHAT_T.thinkStart && t < CHAT_T.streamStart;
  const toolsVisible = t >= CHAT_T.toolsStart;
  const streaming = t >= CHAT_T.streamStart;
  const streamText = typeProgress(t, CHAT_T.streamStart, CHAT_T.streamEnd, REPLY_STREAM);
  const streamDone = t >= CHAT_T.streamEnd;
  const planCount =
    t < CHAT_T.planStart
      ? 0
      : Math.min(PLAN_ITEMS.length, 1 + Math.floor((t - CHAT_T.planStart) / 380));
  const showRun = t >= CHAT_T.runPlan;

  const toolCount = toolsVisible
    ? Math.min(TOOL_STEPS.length, 1 + Math.floor((t - CHAT_T.toolsStart) / 420))
    : 0;

  return (
    <div className={styles.chat}>
      <div className={`${styles.chatThread} ${sent ? styles.chatThreadActive : ""}`}>
        {sent ? (
          <motion.div
            className={styles.userBubble}
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {USER_PROMPT}
          </motion.div>
        ) : null}

        {thinking ? (
          <div className={styles.thinkingRow}>
            <span className={styles.thinkingAvatar} aria-hidden="true">
              <MockAvatar seed="Dali Agent" size={18} />
            </span>
            <div className={styles.thinkingCard}>
              <span className={styles.thinkingLabel}>Thinking</span>
              <span className={styles.thinkingDots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </div>
          </div>
        ) : null}

        {toolsVisible && !streaming ? (
          <div className={styles.toolStack}>
            {TOOL_STEPS.slice(0, toolCount).map((step) => (
              <motion.div
                key={step.label}
                className={styles.toolChip}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className={
                    step.state === "active" ? styles.toolDotActive : styles.toolDotDone
                  }
                />
                {step.label}
              </motion.div>
            ))}
          </div>
        ) : null}

        {streaming ? (
          <motion.div
            className={styles.agentReply}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className={styles.agentReplyHead}>
              <MockAvatar seed="Dali Agent" className={styles.agentReplyAvatar} size={18} />
              <div>
                <strong>Dali</strong>
                <small>Orchestrator · Auto</small>
              </div>
            </div>

            {toolsVisible ? (
              <div className={styles.toolStackInline}>
                {TOOL_STEPS.slice(0, Math.max(toolCount, streamDone ? 3 : 2)).map((step) => (
                  <span key={step.label} className={styles.toolChipSm}>
                    <span className={styles.toolDotDone} />
                    {step.label}
                  </span>
                ))}
              </div>
            ) : null}

            <div className={styles.agentReplyLead}>
              {streamText}
              {!streamDone ? <span className={styles.caret} /> : null}
            </div>

            {planCount > 0 ? (
              <ul className={styles.planList}>
                {PLAN_ITEMS.slice(0, planCount).map((item) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            ) : null}

            {planCount >= PLAN_ITEMS.length ? (
              <div className={styles.assignRow}>
                <span className={`${styles.chip} ${styles.chipLive}`}>Lead Response</span>
                <span className={`${styles.chip} ${styles.chipLive}`}>Knowledge</span>
                <span className={`${styles.chip} ${styles.chipLive}`}>Voice</span>
              </div>
            ) : null}

            {showRun ? (
              <motion.span
                className={styles.runPlan}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Run plan
              </motion.span>
            ) : null}
          </motion.div>
        ) : null}
      </div>

      <div className={`${styles.composer} ${typing ? styles.composerTyping : ""}`}>
        <span className={styles.composerText}>
          {typing ? (
            <>
              {typed}
              <span className={styles.caret} />
            </>
          ) : sent ? (
            "Ask anything…"
          ) : (
            "Ask anything…"
          )}
        </span>
        <span className={styles.composerMeta}>Auto</span>
        <span
          className={`${styles.sendBtn} ${typing || sent ? styles.sendBtnHot : ""}`}
          aria-hidden="true"
        >
          ↑
        </span>
      </div>
    </div>
  );
}

const PIPELINE_ROWS = [
  {
    id: "greenleaf",
    company: "GreenLeaf",
    meta: "Series A · Climate SaaS",
    contact: "Annie Zhang",
    stage: null as string | null, // driven by beat
    owner: "Lead agent",
    action: null as string | null,
    active: true,
  },
  {
    id: "northstar",
    company: "Northstar",
    meta: "Seed · Devtools",
    contact: "Noah Wilson",
    stage: "Inquiry",
    owner: "Lead agent",
    action: "Pricing asked",
    active: false,
  },
  {
    id: "atlas",
    company: "Atlas Labs",
    meta: "Growth · Ops",
    contact: "Ava Turner",
    stage: "Demo booked",
    owner: "Voice agent",
    action: "Call confirmed",
    active: false,
  },
  {
    id: "orbit",
    company: "Orbit Co",
    meta: "Bootstrapped · B2B",
    contact: "Ken Park",
    stage: "Qualified",
    owner: "Lead agent",
    action: "Follow-up drafted",
    active: false,
  },
  {
    id: "lumen",
    company: "Lumen Health",
    meta: "Series B · Healthtech",
    contact: "Priya Shah",
    stage: "Inquiry",
    owner: "Inbox agent",
    action: "Form + PDF received",
    active: false,
  },
  {
    id: "harbor",
    company: "Harbor Freight AI",
    meta: "Growth · Logistics",
    contact: "Marcus Lee",
    stage: "Negotiation",
    owner: "Orchestrator",
    action: "Human review queue",
    active: false,
  },
  {
    id: "pine",
    company: "Pinecone Retail",
    meta: "Seed · Commerce",
    contact: "Sofia Berg",
    stage: "Demo booked",
    owner: "Voice agent",
    action: "Slots offered · 2",
    active: false,
  },
] as const;

const INBOX_THREADS = [
  {
    id: "greenleaf",
    company: "GreenLeaf",
    person: "Annie Zhang",
    preview: "Interested in annual plan + demo…",
    time: "2m",
    unread: true,
    active: true,
  },
  {
    id: "northstar",
    company: "Northstar",
    person: "Noah Wilson",
    preview: "Can you share pricing tiers?",
    time: "8m",
    unread: true,
    active: false,
  },
  {
    id: "atlas",
    company: "Atlas Labs",
    person: "Ava Turner",
    preview: "Booked a call for next week",
    time: "14m",
    unread: false,
    active: false,
  },
  {
    id: "lumen",
    company: "Lumen Health",
    person: "Priya Shah",
    preview: "Attached SOC2 questionnaire",
    time: "22m",
    unread: true,
    active: false,
  },
  {
    id: "orbit",
    company: "Orbit Co",
    person: "Ken Park",
    preview: "Not a fit this quarter",
    time: "41m",
    unread: false,
    active: false,
  },
  {
    id: "harbor",
    company: "Harbor Freight",
    person: "Marcus Lee",
    preview: "Need legal on data processing…",
    time: "1h",
    unread: false,
    active: false,
  },
] as const;

function PipelineView({ beat }: { beat: number }) {
  const stage = PIPELINE_STAGES[Math.min(beat, PIPELINE_STAGES.length - 1)];
  const action =
    beat <= 0
      ? "Form received"
      : beat === 1
        ? "Score 92 · CRM updated"
        : "Demo holds · calendar";

  return (
    <div className={styles.pipeline}>
      <div className={styles.pipelineToolbar}>
        <div className={styles.pipelineTabs}>
          <span className={styles.pipelineTabActive}>All deals · 7</span>
          <span>Agent-owned · 5</span>
          <span>Needs review · 1</span>
        </div>
        <span className={styles.pipelineFilter}>Stage · Owner · Updated</span>
      </div>

      <div className={styles.tableHead}>
        <span>Company</span>
        <span>Contact</span>
        <span>Stage</span>
        <span>Owner</span>
        <span>Last action</span>
      </div>

      <div className={styles.tableBody}>
        {PIPELINE_ROWS.map((row) => {
          const isActive = row.active;
          return (
            <div
              key={row.id}
              className={`${styles.tableRow} ${isActive ? styles.tableRowActive : styles.mutedRow}`}
            >
              <div className={styles.companyCell}>
                <MockAvatar
                  seed={row.company}
                  alt={row.company}
                  className={styles.avatar}
                  size={22}
                />
                <div className={styles.companyCopy}>
                  <strong>{row.company}</strong>
                  <small>{row.meta}</small>
                </div>
              </div>
              <span>{row.contact}</span>
              <span
                className={`${styles.stagePill} ${isActive ? styles.stagePillHot : ""}`}
              >
                {isActive ? stage : row.stage}
              </span>
              <span className={styles.owner}>
                <i className={styles.ownerDot} />
                {row.owner}
              </span>
              <span className={styles.actionMeta}>
                {isActive ? action : row.action}
              </span>
            </div>
          );
        })}
      </div>

      <div className={styles.pipelineFoot}>
        <span>
          <strong>7</strong> open deals · <strong>5</strong> agent-owned
        </span>
        <span>
          <strong>1</strong> needs human review · updated just now
        </span>
      </div>
    </div>
  );
}

function InboxView({ beat }: { beat: number }) {
  const status = INBOX_STATUSES[Math.min(beat, INBOX_STATUSES.length - 1)];
  const tagClass =
    status.tone === "amber"
      ? styles.tagAmber
      : status.tone === "blue"
        ? styles.tagBlue
        : styles.tagGreen;

  return (
    <div className={styles.inbox}>
      <div className={styles.threadList}>
        <div className={styles.threadListHead}>
          <strong>Inbox</strong>
          <span>6 open</span>
        </div>
        {INBOX_THREADS.map((thread) => (
          <div
            key={thread.id}
            className={`${styles.threadItem} ${thread.active ? styles.threadItemActive : ""} ${thread.unread ? styles.threadItemUnread : ""}`}
          >
            <div className={styles.threadItemTop}>
              <strong>{thread.company}</strong>
              <span>{thread.time}</span>
            </div>
            <div className={styles.threadPerson}>{thread.person}</div>
            <div className={styles.threadPreview}>{thread.preview}</div>
          </div>
        ))}
      </div>

      <div className={styles.threadMain}>
        <div className={styles.personRow}>
          <MockAvatar
            seed="Annie Zhang"
            alt="Annie Zhang"
            className={styles.avatar}
            size={22}
          />
          <div>
            <strong>Annie Zhang</strong>
            <small>Product lead · GreenLeaf · Form · Gmail</small>
          </div>
          <span className={`${styles.tag} ${tagClass}`}>{status.label}</span>
        </div>

        <div className={styles.bubble}>
          Interested in an annual plan and a product demo for the ops team this
          quarter. Can you share fit + next steps?
        </div>

        <motion.div
          className={`${styles.bubble} ${styles.bubbleAgent}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
          <span className={styles.bubbleLabel}>Lead Response · draft</span>
          Hi Annie - GreenLeaf looks like a strong fit for the supervised lead
          workflow. I can send ICP notes, pricing for annual, and two demo slots
          this week for your ops team. Want me to book Thu 10:00 or Fri 14:30?
        </motion.div>

        <div className={styles.scoreRow}>
          <span className={styles.metaChip}>Score 92</span>
          <span className={styles.metaChip}>HubSpot synced</span>
          <span className={styles.metaChip}>ICP: yes</span>
          {beat >= 1 ? <span className={styles.metaChip}>Calendar · 2 slots</span> : null}
          {beat >= 2 ? <span className={styles.metaChip}>Sent via Gmail</span> : null}
        </div>

        <div className={styles.inboxSources}>
          <span className={styles.sectionLabelInline}>Grounding</span>
          <div className={styles.sourceRow}>
            <span>Pricing · annual</span>
            <small>Notion · 2d</small>
          </div>
          <div className={styles.sourceRow}>
            <span>ICP rules</span>
            <small>HubSpot · live</small>
          </div>
          <div className={styles.sourceRow}>
            <span>Demo calendar</span>
            <small>Google · open</small>
          </div>
        </div>

        <div className={styles.actions}>
          <span className={styles.btn}>Edit</span>
          <span className={styles.btn}>Regenerate</span>
          <span className={`${styles.btn} ${styles.btnPrimary}`}>
            {beat >= 2 ? "Sent" : "Send"}
          </span>
        </div>
      </div>
    </div>
  );
}

function useInView(ref: RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.2),
      { threshold: [0, 0.2, 0.5, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return inView;
}

function useIsMobile(maxWidth = 768) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [maxWidth]);
  return mobile;
}

function useViewBeat(
  live: boolean,
  steps: number,
  stepMs: number,
  resetKey: string,
) {
  const reduce = useReducedMotion();
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (!live || reduce || steps < 2) {
      setBeat(Math.max(0, steps - 1));
      return;
    }
    setBeat(0);
    const id = window.setInterval(() => {
      setBeat((b) => Math.min(b + 1, steps - 1));
    }, stepMs);
    return () => window.clearInterval(id);
  }, [live, reduce, steps, stepMs, resetKey]);

  return beat;
}

export default function HeroProductMock() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef);
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  const [viewIndex, setViewIndex] = useState(0);

  // Mobile: freeze on Agents org. Reduced motion: freeze on final tour frame.
  const tourLive = inView && !reduce && !mobile;
  const view: ViewId = reduce
    ? "pipeline"
    : mobile
      ? "agents"
      : TOUR[viewIndex % TOUR.length];

  useEffect(() => {
    if (!tourLive) return;
    let cancelled = false;
    let timer = 0;
    let index = 0;
    setViewIndex(0);
    const tick = () => {
      const current = TOUR[index % TOUR.length];
      timer = window.setTimeout(() => {
        if (cancelled) return;
        index = (index + 1) % TOUR.length;
        setViewIndex(index);
        tick();
      }, VIEW_MS[current]);
    };
    tick();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [tourLive]);

  const beat = useViewBeat(inView && !reduce, 4, 1250, view);
  const liveCount =
    view === "agents" ? 1 + Math.min(beat, 2) : view === "home" ? 2 + Math.min(beat, 1) : 3;
  const chatLive = inView && !reduce && view === "home";

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-hero-product-mock=""
      aria-hidden="true"
    >
      <div className={styles.chrome}>
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.chromeTitle}>Dali Agents · GreenLeaf mission</span>
        <span className={styles.liveBadge}>
          <i className={styles.liveDot} />
          {liveCount} live
        </span>
      </div>

      <div className={styles.app}>
        <aside className={styles.sidebar}>
          <div className={styles.workspace}>
            <span className={styles.workspaceMark}>D</span>
            <span className={styles.workspaceName}>Dali Agents</span>
            <span className={styles.workspaceChevron} aria-hidden="true">
              ▾
            </span>
          </div>

          <nav className={styles.nav} aria-label="Product navigation">
            {SIDEBAR.map((row, index) => {
              if (row.kind === "quick") {
                return (
                  <div key="quick" className={styles.quickActions}>
                    <span className={styles.navIcon}>
                      <NavIcon name="search" />
                    </span>
                    <span>Quick Actions</span>
                    <kbd>⌘K</kbd>
                  </div>
                );
              }
              if (row.kind === "label") {
                return (
                  <div key={`label-${row.label}-${index}`} className={styles.sectionLabel}>
                    {row.label}
                  </div>
                );
              }
              if (row.kind === "agent") {
                return (
                  <div key={`agent-${row.label}`} className={styles.agentNavItem}>
                    <i className={styles.agentNavDot} style={{ background: row.color }} />
                    <span>{row.label}</span>
                    {row.live ? <i className={styles.navLive} /> : null}
                  </div>
                );
              }
              if (row.kind === "sub") {
                return (
                  <div key={`sub-${row.label}`} className={styles.navSubItem}>
                    <span className={styles.navIcon}>
                      <NavIcon name={row.icon} />
                    </span>
                    <span>{row.label}</span>
                    {row.live ? <i className={styles.navLive} /> : null}
                  </div>
                );
              }
              const active = row.id != null && row.id === view;
              return (
                <div
                  key={`item-${row.label}`}
                  className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className={styles.navIcon}>
                    <NavIcon name={row.icon} />
                  </span>
                  <span className={styles.navLabel}>{row.label}</span>
                  {row.badge ? <span className={styles.navBadge}>{row.badge}</span> : null}
                  {row.live ? <i className={styles.navLive} /> : null}
                </div>
              );
            })}
          </nav>
        </aside>

        <div className={styles.main}>
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <strong className={styles.pageTitle}>{TITLES[view]}</strong>
              <span className={styles.star} aria-hidden="true">
                ★
              </span>
            </div>
            <div className={styles.toolbarRight}>
              <span>+</span>
            </div>
          </div>

          <div className={styles.viewBody}>
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                className={styles.view}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                {view === "agents" ? <AgentsView beat={beat} /> : null}
                {view === "home" ? <HomeView live={chatLive} /> : null}
                {view === "pipeline" ? <PipelineView beat={beat} /> : null}
                {view === "inbox" ? <InboxView beat={beat} /> : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
