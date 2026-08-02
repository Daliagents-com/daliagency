/**
 * Single section-title system for the marketing landing.
 *
 * ONE truth: quiet mono label `NN / {NavLabel}` (class: `.section-label`).
 * Not a display headline. Descriptive copy is body/lead, not a second title.
 *
 * Home:      01 / Projects · 02 / Solutions · 03 / About
 * Solutions: 01 / Solutions · 02 / Process · 03 / Proof · 04 / About
 *            · 05 / FAQ · 06 / Contact
 */
export function sectionTitle(index: number, label: string): string {
  return `${String(index).padStart(2, "0")} / ${label}`;
}

/** @deprecated use sectionTitle */
export const sectionKicker = sectionTitle;
