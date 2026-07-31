// Purpose: Operations product mock - docs → extract → validate → write story.
// Scope: Packet queue + field inspector + exception path. Distinct from sales/support.
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "../../AgentUxPreview.module.css";
import type { Copy } from "../copy";
import { Tag, Toolbar, useLiveStage } from "../shared";

const EASE = [0.16, 1, 0.3, 1] as const;

type PacketStatus = "extracting" | "live" | "review" | "completed" | "queued";
type Tone = "neutral" | "blue" | "green" | "amber";

type Packet = {
  id: string;
  name: string;
  kind: "PDF" | "Form" | "Sheet" | "Email";
  source: string;
  validation: string;
  target: string;
  status: PacketStatus;
  active?: boolean;
  fields: readonly { label: string; value: string; missing?: boolean }[];
  checks: readonly string[];
};

const OPS_STEPS = [
  { id: "intake", label: "Intake" },
  { id: "extract", label: "Extract" },
  { id: "validate", label: "Validate" },
  { id: "exception", label: "Exception" },
  { id: "write", label: "Write ERP" },
] as const;

const PACKETS: readonly Packet[] = [
  {
    id: "inv-8841",
    name: "Invoice_8841.pdf",
    kind: "PDF",
    source: "Email attachment",
    validation: "Missing PO",
    target: "ERP write",
    status: "review",
    active: true,
    fields: [
      { label: "Vendor", value: "Lambda Co" },
      { label: "Amount", value: "$12,400" },
      { label: "PO", value: "—", missing: true },
      { label: "Tax code", value: "US-CA" },
      { label: "Invoice id", value: "INV-8841" },
    ],
    checks: [
      "Required fields present",
      "PO required when amount > $5k",
      "No duplicate invoice id",
      "Write to ERP allowed",
    ],
  },
  {
    id: "vendor",
    name: "Vendor onboarding form",
    kind: "Form",
    source: "Form upload",
    validation: "Missing fields",
    target: "Sheets row",
    status: "review",
    fields: [
      { label: "Vendor", value: "Northline LLC" },
      { label: "Tax id", value: "—", missing: true },
      { label: "Bank", value: "Chase ****4412" },
    ],
    checks: ["Tax id required", "Bank details validated", "No open vendor duplicate"],
  },
  {
    id: "weekly",
    name: "Weekly order export",
    kind: "Sheet",
    source: "Spreadsheet",
    validation: "Validated",
    target: "CRM update",
    status: "queued",
    fields: [
      { label: "Rows", value: "148" },
      { label: "Dedupe", value: "3 dropped" },
      { label: "Owner", value: "Ops queue" },
    ],
    checks: ["Schema matched", "Dedupe pass", "CRM mapping ready"],
  },
  {
    id: "po-scan",
    name: "PO_scan_2201.png",
    kind: "PDF",
    source: "Drive upload",
    validation: "Validated",
    target: "ERP write",
    status: "completed",
    fields: [
      { label: "PO", value: "PO-2201" },
      { label: "Vendor", value: "Rho Supply" },
      { label: "Amount", value: "$3,180" },
    ],
    checks: ["OCR confidence 0.97", "Schema complete", "ERP row written"],
  },
  {
    id: "receipt",
    name: "Receipt batch · May 12",
    kind: "Email",
    source: "Inbox watch",
    validation: "Validated",
    target: "QuickBooks",
    status: "completed",
    fields: [
      { label: "Items", value: "11 receipts" },
      { label: "Total", value: "$2,064" },
    ],
    checks: ["All fields present", "No duplicates", "QB bill created"],
  },
  {
    id: "app-packet",
    name: "Application packet.zip",
    kind: "Form",
    source: "Upload folder",
    validation: "Low confidence",
    target: "CRM task",
    status: "queued",
    fields: [
      { label: "Applicant", value: "Casey Grant" },
      { label: "Docs", value: "4 / 5 parsed" },
    ],
    checks: ["ID page OCR low confidence", "Route to reviewer", "No CRM write"],
  },
] as const;

function statusLabel(copy: Copy, status: PacketStatus, stage?: number): string {
  if (status === "review") return copy.review;
  if (status === "completed") return copy.completed;
  if (status === "queued") return copy.ready;
  if (status === "extracting") return "Extracting";
  if (status === "live" && stage !== undefined) {
    if (stage === 0) return "Extracting";
    if (stage === 1) return "Validating";
    if (stage === 2) return copy.review;
    return copy.completed;
  }
  return copy.live;
}

function statusTone(status: PacketStatus, stage?: number): Tone {
  if (status === "review") return "amber";
  if (status === "completed") return "green";
  if (status === "queued") return "neutral";
  if (status === "extracting") return "blue";
  if (status === "live" && stage !== undefined) {
    if (stage <= 1) return "blue";
    if (stage === 2) return "amber";
    return "green";
  }
  return "blue";
}

function ctaLabel(copy: Copy, stage: number): string {
  if (stage === 0) return "Extracting…";
  if (stage === 1) return "Validating…";
  if (stage === 2) return copy.approveRun;
  return "Written to ERP";
}

export function OperationsUx({
  copy,
  live = false,
}: {
  copy: Copy;
  tasks: readonly string[];
  live?: boolean;
}) {
  const reduce = useReducedMotion();
  // 0 intake/extract → 1 fields → 2 exception → 3 write complete
  const stage = useLiveStage(live, 5, 1100);
  const active = PACKETS[0];

  // Map 5-step rail onto 4 logical stages
  const flowStage = Math.min(stage, 4);
  const activeStatus: PacketStatus =
    flowStage <= 1 ? "live" : flowStage === 2 || flowStage === 3 ? "review" : "completed";
  // stage 0 extract, 1 validate fields, 2 exception flag, 3 human approve, 4 written
  const logical =
    stage === 0 ? 0 : stage === 1 ? 1 : stage === 2 ? 2 : stage === 3 ? 2 : 3;
  const activeTone = statusTone(activeStatus, logical);
  const activeLabel = statusLabel(copy, activeStatus, logical);
  const primaryCta = ctaLabel(copy, logical);

  const visibleFields = active.fields.map((field, index) => {
    if (stage === 0 && index > 1) {
      return { ...field, value: "…" };
    }
    if (stage >= 4 && field.missing) {
      return { ...field, value: "PO-9914", missing: false };
    }
    return field;
  });

  const checkDoneCount =
    stage === 0 ? 0 : stage === 1 ? 1 : stage === 2 ? 2 : stage >= 4 ? 4 : 2;

  const exceptionNote =
    stage < 4
      ? "PO missing for amount over $5k · ERP write blocked until review"
      : "PO-9914 confirmed · ERP write INV-8841 complete";

  const stepState = (i: number): "done" | "current" | "todo" => {
    // 0 intake, 1 extract, 2 validate, 3 exception, 4 write
    if (stage > i) return "done";
    if (stage === i) return "current";
    if (stage >= 4) return "done";
    return "todo";
  };

  return (
    <div
      className={`${styles.dash} ${styles.dashOps}`}
      data-live={live ? "true" : "false"}
      data-agent-story="operations"
    >
      <div className={styles.main}>
        <Toolbar
          title={copy.operations}
          crumb="Ops · Documents to actions"
          actions={
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary} ${
                stage >= 4 ? styles.btnGreen : ""
              }`}
            >
              {stage >= 4 ? `✓ ${copy.completed}` : primaryCta}
            </button>
          }
        />

        <div className={styles.processRail} aria-label="Operations flow">
          {OPS_STEPS.map((step, i) => {
            const state = stepState(i);
            return (
              <motion.div
                key={step.id}
                className={styles.processStep}
                data-state={state}
                data-variant="ops"
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
            Exceptions
            <span className={styles.viewCount}>2</span>
          </div>
          <div className={styles.viewTab}>
            Validated
            <span className={styles.viewCount}>3</span>
          </div>
          <div className={styles.viewTab}>Queued</div>
        </div>

        <AnimatePresence mode="wait">
          {stage === 2 || stage === 3 ? (
            <motion.div
              key="exception-banner"
              className={styles.storyBanner}
              data-tone="exception"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <div className={styles.opsExceptionBadge}>!</div>
              <div>
                <strong>Exception · missing PO</strong>
                <p>
                  Amount $12,400 exceeds auto-write threshold. Hold ERP write
                  until a human confirms PO-9914.
                </p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className={styles.filters}>
          <span className={`${styles.chip} ${styles.chipOn}`}>Source · All</span>
          <span className={styles.chip}>Target · ERP / Sheets / CRM</span>
          <span className={styles.chip}>Owner · Ops agent</span>
        </div>

        <div className={`${styles.body} ${styles.opsBody}`}>
          <div className={`${styles.tableWrap} ${styles.opsTable}`}>
            <div
              className={styles.tableHead}
              style={{
                gridTemplateColumns: "1.5fr 1fr 0.95fr 0.9fr 0.75fr",
              }}
            >
              <span>Packet</span>
              <span>Source</span>
              <span>Validation</span>
              <span>Target</span>
              <span>{copy.status}</span>
            </div>
            {PACKETS.map((row, index) => {
              const isActive = index === 0;
              const rowStatus = isActive ? activeStatus : row.status;
              const rowTone = isActive ? activeTone : statusTone(row.status);
              const rowLabel = isActive
                ? activeLabel
                : statusLabel(copy, row.status);

              return (
                <div
                  key={row.id}
                  className={`${styles.tableRow} ${
                    isActive ? styles.tableRowActive : ""
                  }`}
                  style={{
                    gridTemplateColumns: "1.5fr 1fr 0.95fr 0.9fr 0.75fr",
                  }}
                >
                  <span className={styles.cellPrimary}>
                    <span className={styles.iconBox} aria-hidden="true">
                      {row.kind.slice(0, 2)}
                    </span>
                    <span className={styles.rowCopy}>
                      <strong>{row.name}</strong>
                      <small>{row.kind}</small>
                    </span>
                  </span>
                  <span className={styles.cellMuted}>{row.source}</span>
                  <span className={styles.cellMuted}>
                    {isActive && stage === 0
                      ? "Parsing…"
                      : isActive && stage === 1
                        ? "Checking schema"
                        : isActive && stage >= 4
                          ? "Validated"
                          : row.validation}
                  </span>
                  <span className={styles.cellMuted}>{row.target}</span>
                  <Tag tone={rowTone}>{rowLabel}</Tag>
                </div>
              );
            })}
          </div>

          <aside className={`${styles.inspector} ${styles.opsInspector}`}>
            <div className={styles.inspectorTop}>
              <div>
                <h4>{active.name}</h4>
                <small>
                  {active.source} · {active.target}
                </small>
              </div>
              <Tag tone={activeTone}>{activeLabel}</Tag>
            </div>

            <p className={styles.sectionLabel}>Extracted fields</p>
            <div className={styles.props}>
              {visibleFields.map((field) => (
                <div key={field.label} className={styles.prop}>
                  <span>{field.label}</span>
                  <strong
                    className={
                      field.missing && stage < 4 ? styles.opsMissing : undefined
                    }
                  >
                    {field.value}
                  </strong>
                </div>
              ))}
            </div>

            <p className={styles.sectionLabel}>Validation</p>
            <ul className={styles.checklist}>
              {active.checks.map((check, index) => {
                const done = index < checkDoneCount;
                const blocked = index === 1 && stage >= 2 && stage < 4;
                return (
                  <li
                    key={check}
                    className={
                      blocked
                        ? styles.stepBlocked
                        : done
                          ? styles.stepDone
                          : undefined
                    }
                  >
                    <i aria-hidden="true">{blocked ? "!" : done ? "✓" : ""}</i>
                    {check}
                  </li>
                );
              })}
            </ul>

            <div className={styles.note}>
              <span className={styles.bubbleLabel}>Exception path</span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={exceptionNote}
                  className={styles.bubbleBody}
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.22, ease: EASE }}
                >
                  {exceptionNote}
                </motion.p>
              </AnimatePresence>
            </div>

            <p className={styles.sectionLabel}>Pipeline</p>
            <p className={styles.opsHint}>
              Email attachment → OCR extract → schema validate → ERP write
            </p>

            <div className={styles.inspectorFoot}>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnWide} ${styles.btnPrimary} ${
                  stage >= 4 ? styles.btnGreen : ""
                }`}
              >
                {stage >= 4
                  ? "✓ Written to ERP"
                  : stage >= 2
                    ? copy.approveRun
                    : primaryCta}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
