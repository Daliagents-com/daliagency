// Purpose: Shared Attio-style product table showcase for solution pages.
// Scope: Visual shell + slug-specific rows; used first for knowledge-assistant.
import type { CSSProperties } from "react";
import { monoText, sansText } from "@/assets/fonts";
import { MockAvatar } from "@/Components/ui/MockAvatar";
import type { SolutionContent, SolutionSlug } from "../solutionContent";
import type { SolutionPageLabels } from "../solutionLabels";
import styles from "./AttioTableShowcase.module.css";

type ShowcaseProps = {
  solution: SolutionContent;
  labels: SolutionPageLabels;
};

type TableRow = {
  /** DiceBear seed for lorelei face (person or record id). */
  seed: string;
  primary: string;
  secondary: string;
  company: string;
  companyTone: "a" | "b" | "c" | "d" | "e" | "f";
  role: string;
  email: string;
  interaction: string;
  active?: boolean;
  flag?: string;
};

type ShowcaseModel = {
  workspace: string;
  collection: string;
  view: string;
  nav: readonly string[];
  activeNav: string;
  columns: readonly string[];
  rows: readonly TableRow[];
  sideCards: readonly {
    index: string;
    title: string;
    body: string;
    tone: "neutral" | "accent" | "warning";
  }[];
  guardLabel: string;
};

function getThemeStyle(solution: SolutionContent): CSSProperties {
  return {
    ["--showcase-accent" as string]: solution.accent,
    ["--showcase-accent-soft" as string]: solution.accentSoft,
  };
}

function clip(value: string, max = 42) {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trimEnd()}…`;
}

function buildModel(
  solution: SolutionContent,
  labels: SolutionPageLabels,
): ShowcaseModel {
  const baseNav = [
    "Search",
    "Notifications",
    "Messages",
    solution.integrations.label,
    labels.humanReview,
  ] as const;

  const sharedSide = [
    {
      index: "01",
      title: solution.pilot.includes[0] ?? solution.workflow.intake[0],
      body: solution.guardrails.items[0],
      tone: "neutral" as const,
    },
    {
      index: "02",
      title: solution.workflow.agentLabel,
      body: solution.contrast.outcomePoints[0],
      tone: "accent" as const,
    },
    {
      index: "03",
      title: labels.humanReview,
      body: solution.guardrails.items[1] ?? solution.workflow.review[0],
      tone: "warning" as const,
    },
  ];

  const bySlug: Partial<Record<SolutionSlug, ShowcaseModel>> = {
    "knowledge-assistant": {
      workspace: "Dali",
      collection: "Knowledge assistant",
      view: "All questions",
      nav: [
        "Search",
        "Notifications",
        "Messages",
        "Integrations",
        "Guardrails",
        "Question log",
      ],
      activeNav: "Question log",
      columns: [
        "Question",
        "Source set",
        "Answer path",
        "Citation",
        "Last review",
        "Status",
      ],
      rows: [
        {
          seed: "Riley Foster",
          primary: "Refund window for annual plans?",
          secondary: "Support · recurring",
          company: "Policy notes",
          companyTone: "a",
          role: "Cited answer",
          email: "policy/refunds.md",
          interaction: "Today",
          active: true,
          flag: "1",
        },
        {
          seed: "Sam Lopez",
          primary: "What is the tier-2 SLA?",
          secondary: "Ops · handbook",
          company: "Docs",
          companyTone: "b",
          role: "Cited answer",
          email: "sla-handbook.pdf",
          interaction: "Yesterday",
        },
        {
          seed: "Casey Grant",
          primary: "Can we override onboarding steps?",
          secondary: "Enablement",
          company: "Past answers",
          companyTone: "c",
          role: "Human review",
          email: "thread-4821",
          interaction: "Needs review",
        },
        {
          seed: "Parker Xu",
          primary: "Export customer data to a partner?",
          secondary: "Sensitive",
          company: "Policy notes",
          companyTone: "a",
          role: "Escalation",
          email: "privacy-policy.md",
          interaction: "No interactions",
        },
        {
          seed: "Owen Brooks",
          primary: "How do we reset a locked admin?",
          secondary: "Internal IT",
          company: "Docs",
          companyTone: "b",
          role: "Cited answer",
          email: "admin-runbook.md",
          interaction: "2 days ago",
        },
        {
          seed: "Morgan Singh",
          primary: "Is weekend support covered?",
          secondary: "Coverage",
          company: "Past answers",
          companyTone: "d",
          role: "Suggested next step",
          email: "coverage-faq.md",
          interaction: "No interactions",
        },
      ],
      sideCards: sharedSide,
      guardLabel: solution.guardrails.label,
    },
    "lead-response": {
      workspace: "Dali",
      collection: "Lead response",
      view: "All people",
      nav: [...baseNav, "Pipeline"],
      activeNav: "Pipeline",
      columns: [
        "Person",
        "Company",
        "Job title",
        "Emails",
        "My last interaction",
        "Stage",
      ],
      rows: [
        {
          seed: "Alice Johnson",
          primary: "Alice Johnson",
          secondary: "New inbound",
          company: "Gamma Inc",
          companyTone: "a",
          role: "Account Executive",
          email: "alice.johnson@example.com",
          interaction: "November 19, 2024",
          active: true,
          flag: "1",
        },
        {
          seed: "Jon Smith",
          primary: "Jon Smith",
          secondary: "Qualified",
          company: "Content Mobbin",
          companyTone: "b",
          role: "Product Lead",
          email: "jonsmith@content-mobbin.com",
          interaction: "June 3, 2024",
        },
        {
          seed: "Steve Martin",
          primary: "Steve Martin",
          secondary: "Needs review",
          company: "Xi Innovations",
          companyTone: "c",
          role: "Business Development",
          email: "steve.martin@example.com",
          interaction: "No interactions",
        },
        {
          seed: "Mia Martinez",
          primary: "Mia Martinez",
          secondary: "Replied",
          company: "Rho Industries",
          companyTone: "d",
          role: "Legal Advisor",
          email: "mia.martinez@example.com",
          interaction: "No interactions",
        },
        {
          seed: "Irene Adams",
          primary: "Irene Adams",
          secondary: "Booked",
          company: "Mu Co",
          companyTone: "e",
          role: "Regional Director",
          email: "irene.adams@example.com",
          interaction: "No interactions",
        },
        {
          seed: "Tina Wilson",
          primary: "Tina Wilson",
          secondary: "Follow-up",
          company: "Yi Enterprises",
          companyTone: "f",
          role: "Account Manager",
          email: "tina.wilson@example.com",
          interaction: "No interactions",
        },
      ],
      sideCards: sharedSide,
      guardLabel: solution.guardrails.label,
    },
    "client-inbox": {
      workspace: "Dali",
      collection: "Client inbox",
      view: "All threads",
      nav: [...baseNav, "Open threads"],
      activeNav: "Open threads",
      columns: [
        "Thread",
        "Channel",
        "Intent",
        "Policy",
        "Last update",
        "Status",
      ],
      rows: [
        {
          seed: "Blake Kim",
          primary: "Billing copy of invoice #8841",
          secondary: "Email",
          company: "Customer inbox",
          companyTone: "a",
          role: "Grounded reply",
          email: "policy/billing.md",
          interaction: "Now",
          active: true,
          flag: "1",
        },
        {
          seed: "Finley Lane",
          primary: "Please cancel and refund today",
          secondary: "Chat",
          company: "CRM context",
          companyTone: "b",
          role: "Human review",
          email: "refund-policy",
          interaction: "Needs review",
        },
        {
          seed: "Morgan Dale",
          primary: "Upload signed contract scan",
          secondary: "Email + file",
          company: "Files",
          companyTone: "c",
          role: "Handoff",
          email: "media-gate",
          interaction: "Queued",
        },
        {
          seed: "Skyler Trent",
          primary: "Where is my onboarding link?",
          secondary: "Chat",
          company: "Help articles",
          companyTone: "d",
          role: "Grounded reply",
          email: "onboarding-faq",
          interaction: "2h ago",
        },
      ],
      sideCards: sharedSide,
      guardLabel: solution.guardrails.label,
    },
    "operations-docs": {
      workspace: "Dali",
      collection: "Documents-to-actions",
      view: "Exceptions",
      nav: [...baseNav, "Intake queue", "Exceptions"],
      activeNav: "Exceptions",
      columns: [
        "Packet",
        "Source",
        "Validation",
        "Target system",
        "Last check",
        "Status",
      ],
      rows: [
        {
          seed: "Invoice packet",
          primary: "Invoice_8841.pdf",
          secondary: "Email attachment",
          company: "ERP write",
          companyTone: "a",
          role: "Missing PO",
          email: "amount > $5k",
          interaction: "Needs review",
          active: true,
          flag: "1",
        },
        {
          seed: "Vendor form",
          primary: "Vendor onboarding form",
          secondary: "Form upload",
          company: "Sheets row",
          companyTone: "b",
          role: "Missing fields",
          email: "tax-id",
          interaction: "Needs review",
        },
        {
          seed: "Weekly export",
          primary: "Weekly order export",
          secondary: "Spreadsheet",
          company: "CRM update",
          companyTone: "c",
          role: "Validated",
          email: "dedupe-pass",
          interaction: "Queued",
        },
        {
          seed: "PO scan",
          primary: "PO_scan_2201.png",
          secondary: "Drive upload",
          company: "ERP write",
          companyTone: "d",
          role: "Validated",
          email: "PO-2201",
          interaction: "Completed",
        },
        {
          seed: "Receipt batch",
          primary: "Receipt batch · May 12",
          secondary: "Inbox watch",
          company: "QuickBooks",
          companyTone: "e",
          role: "Validated",
          email: "11 receipts",
          interaction: "Completed",
        },
        {
          seed: "App packet",
          primary: "Application packet.zip",
          secondary: "Upload folder",
          company: "CRM task",
          companyTone: "f",
          role: "Low confidence",
          email: "OCR gate",
          interaction: "Queued",
        },
      ],
      sideCards: sharedSide,
      guardLabel: solution.guardrails.label,
    },
    "voice-agents": {
      workspace: "Dali",
      collection: "Voice design partner",
      view: "Call queue",
      nav: [...baseNav, "Call lane"],
      activeNav: "Call lane",
      columns: [
        "Caller path",
        "Lane",
        "Outcome",
        "Disclosure",
        "Last event",
        "Status",
      ],
      rows: [
        {
          seed: "Booking Quinn",
          primary: "Booking · new patient",
          secondary: "Inbound",
          company: "Scheduling",
          companyTone: "a",
          role: "Booked slot",
          email: "disclosed",
          interaction: "Live",
          active: true,
          flag: "1",
        },
        {
          seed: "Callback Blair",
          primary: "Callback after missed ring",
          secondary: "Overflow",
          company: "Callback queue",
          companyTone: "b",
          role: "Summary ready",
          email: "disclosed",
          interaction: "2m ago",
        },
        {
          seed: "Transfer Reed",
          primary: "Sensitive clinical question",
          secondary: "Transfer",
          company: "Human agent",
          companyTone: "c",
          role: "Escalation",
          email: "takeover",
          interaction: "Needs review",
        },
      ],
      sideCards: sharedSide,
      guardLabel: solution.guardrails.label,
    },
  };

  const fallback: ShowcaseModel = {
    workspace: "Dali",
    collection: solution.name,
    view: "All records",
    nav: [...baseNav, solution.workflow.label],
    activeNav: solution.workflow.label,
    columns: [
      "Record",
      "Source",
      "Path",
      "Owner signal",
      "Last activity",
      "Status",
    ],
    rows: solution.workflow.intake.map((item, index) => ({
      seed: item,
      primary: item,
      secondary: solution.workflow.agentLabel,
      company: solution.workflow.outcomes[index % solution.workflow.outcomes.length],
      companyTone: (["a", "b", "c", "d", "e", "f"] as const)[index % 6],
      role: solution.workflow.review[index % solution.workflow.review.length],
      email: solution.integrations.items[index % solution.integrations.items.length],
      interaction: index === 0 ? "Live" : "Queued",
      active: index === 0,
    })),
    sideCards: sharedSide,
    guardLabel: solution.guardrails.label,
  };

  return bySlug[solution.slug] ?? fallback;
}

export default function AttioTableShowcase({ solution, labels }: ShowcaseProps) {
  const model = buildModel(solution, labels);

  return (
    <figure
      className={styles.showcase}
      style={getThemeStyle(solution)}
      aria-label={`${solution.name} product interface`}
    >
      <div className={styles.frame}>
        <aside className={styles.sidebar} aria-label="Product navigation">
          <div className={styles.workspace}>
            <span className={`${sansText.className} ${styles.workspaceMark}`}>D</span>
            <div>
              <strong className={sansText.className}>{model.workspace}</strong>
              <span className={monoText.className}>{model.collection}</span>
            </div>
          </div>

          <div className={styles.trial}>
            <span className={sansText.className}>Pilot boundary</span>
            <span className={`${sansText.className} ${styles.trialButton}`}>
              Active
            </span>
          </div>

          <nav className={styles.nav}>
            {model.nav.map((item) => (
              <span
                key={item}
                className={`${sansText.className} ${styles.navItem} ${
                  item === model.activeNav ? styles.navActive : ""
                }`}
              >
                {item}
              </span>
            ))}
          </nav>

          <div className={styles.sharedBlock}>
            <p className={`${monoText.className} ${styles.sharedLabel}`}>Shared</p>
            <span className={`${sansText.className} ${styles.navItem} ${styles.navActive}`}>
              {model.view}
            </span>
            {solution.integrations.items.slice(0, 3).map((item) => (
              <span key={item} className={`${sansText.className} ${styles.navItem}`}>
                {clip(item, 28)}
              </span>
            ))}
          </div>
        </aside>

        <section className={styles.main}>
          <header className={styles.topBar}>
            <div className={styles.breadcrumbs}>
              <span className={sansText.className}>{model.collection}</span>
              <span aria-hidden="true">/</span>
              <strong className={sansText.className}>{model.view}</strong>
            </div>
            <div className={styles.topActions}>
              <span className={`${monoText.className} ${styles.guardPill}`}>
                <i aria-hidden="true" />
                {model.guardLabel}
              </span>
              <span className={`${sansText.className} ${styles.shareButton}`}>Share</span>
            </div>
          </header>

          <div className={styles.titleRow}>
            <h3 className={`${sansText.className} ${styles.viewTitle}`}>{model.view}</h3>
            <div className={styles.toolbar}>
              <span className={`${sansText.className} ${styles.toolButton}`}>+ Add</span>
              <span className={`${sansText.className} ${styles.toolButton}`}>Email all</span>
              <span className={`${sansText.className} ${styles.toolButton}`}>Enrich all</span>
            </div>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={monoText.className}>
                    <span className={styles.check} />
                    {model.rows.length} records
                  </th>
                  {model.columns.slice(1).map((column) => (
                    <th key={column} className={monoText.className}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {model.rows.map((row) => (
                  <tr
                    key={row.primary}
                    className={row.active ? styles.rowActive : undefined}
                  >
                    <td>
                      <div className={styles.personCell}>
                        <span className={styles.check} />
                        <MockAvatar
                          seed={row.seed}
                          alt=""
                          className={styles.avatar}
                          size={25}
                        />
                        <div className={styles.personCopy}>
                          <strong className={sansText.className}>
                            {clip(row.primary, 34)}
                          </strong>
                          {row.flag ? (
                            <span className={`${monoText.className} ${styles.flag}`}>
                              {row.flag}
                            </span>
                          ) : null}
                          <span className={`${sansText.className} ${styles.secondary}`}>
                            {row.secondary}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`${sansText.className} ${styles.company} ${
                          styles[`tone${row.companyTone.toUpperCase()}`]
                        }`}
                      >
                        {clip(row.company, 18)}
                      </span>
                    </td>
                    <td className={sansText.className}>{clip(row.role, 22)}</td>
                    <td className={`${sansText.className} ${styles.mutedCell}`}>
                      {clip(row.email, 28)}
                    </td>
                    <td className={`${sansText.className} ${styles.mutedCell}`}>
                      {row.interaction}
                    </td>
                    <td className={`${monoText.className} ${styles.statusCell}`}>
                      {row.active ? "Live" : "Idle"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className={styles.stack} aria-label={solution.pilot.label}>
          {model.sideCards.map((card) => (
            <article
              key={card.index}
              className={`${styles.stackCard} ${styles[`stack${card.tone}`]}`}
            >
              <span className={`${monoText.className} ${styles.stackIndex}`}>
                {card.index}
              </span>
              <strong className={sansText.className}>{clip(card.title, 48)}</strong>
              <p className={sansText.className}>{clip(card.body, 96)}</p>
            </article>
          ))}
        </aside>
      </div>
    </figure>
  );
}
