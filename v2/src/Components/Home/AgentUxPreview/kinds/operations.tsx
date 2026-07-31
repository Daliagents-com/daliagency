// Purpose: Operations / Documents-to-Actions product mock.
// Scope: Packet queue + field inspector + exception path. Matches pilot story.
"use client";

import { AnimatePresence, motion } from "framer-motion";
import styles from "../../AgentUxPreview.module.css";
import type { Copy } from "../copy";
import { Tag, Toolbar, clip, useLiveStage } from "../shared";

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
    checks: [
      "Tax id required",
      "Bank details validated",
      "No open vendor duplicate",
    ],
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
  tasks,
  live = false,
}: {
  copy: Copy;
  tasks: readonly string[];
  live?: boolean;
}) {
  // 0 extract → 1 fields ready → 2 exception (needs review) → 3 approved write
  const stage = useLiveStage(live, 4, 1400);
  const active = PACKETS[0];

  const activeStatus: PacketStatus =
    stage <= 1 ? "live" : stage === 2 ? "review" : "completed";
  const activeTone = statusTone(activeStatus, stage);
  const activeLabel = statusLabel(copy, activeStatus, stage);
  const primaryCta = ctaLabel(copy, stage);

  // Field reveal: stage 0 shows partial, stage 1+ full with missing PO flagged
  const visibleFields = active.fields.map((field, index) => {
    if (stage === 0 && index > 1) {
      return { ...field, value: "…" };
    }
    if (stage >= 3 && field.missing) {
      return { ...field, value: "PO-9914", missing: false };
    }
    return field;
  });

  // Checks complete progressively; stage 2 leaves PO check open; stage 3 closes all
  const checkDoneCount =
    stage === 0 ? 0 : stage === 1 ? 1 : stage === 2 ? 2 : 4;

  const exceptionNote =
    stage < 3
      ? "PO missing for amount over $5k · write blocked until review"
      : "PO-9914 confirmed · ERP write INV-8841 complete";

  const intakeHint = tasks[0]
    ? clip(tasks[0], 64)
    : "Email → extract → validate → ERP";

  return (
    <div className={styles.dash} data-live={live ? "true" : "false"}>
      <div className={styles.main}>
        <Toolbar
          title={copy.operations}
          actions={
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary} ${
                stage >= 3 ? styles.btnGreen : ""
              }`}
            >
              {stage >= 3 ? `✓ ${copy.completed}` : primaryCta}
            </button>
          }
        />

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
              const rowTone = isActive
                ? activeTone
                : statusTone(row.status);
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
                        : isActive && stage >= 3
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
                      field.missing && stage < 3 ? styles.opsMissing : undefined
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
                return (
                  <li key={check} className={done ? styles.stepDone : undefined}>
                    <i aria-hidden="true">{done ? "✓" : ""}</i>
                    {check}
                  </li>
                );
              })}
            </ul>

            <div className={styles.note}>
              <span>Exception path</span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={exceptionNote}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {exceptionNote}
                </motion.p>
              </AnimatePresence>
            </div>

            <p className={styles.sectionLabel}>Intake</p>
            <p className={styles.opsHint}>{intakeHint}</p>

            <div className={styles.inspectorFoot}>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnWide} ${styles.btnPrimary} ${
                  stage >= 3 ? styles.btnGreen : ""
                }`}
              >
                {stage >= 3 ? `✓ Written to ERP` : stage === 2 ? copy.approveRun : primaryCta}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
