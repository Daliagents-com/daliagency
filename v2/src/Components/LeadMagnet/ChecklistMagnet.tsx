// Purpose: Email-gated lead magnet - vibe-code checklist pack.
// UX: links unlock on-site immediately; the email copy is a bonus, not the gate's hostage.
"use client";

import { FormEvent, useId, useState } from "react";
import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import {
  checklistMagnetCopy,
  checklistPackSlugs,
} from "@/lib/checklist";
import { onestText, syneText } from "@/assets/fonts";

type ChecklistMagnetProps = {
  locale?: Locale;
  source?: string;
};

const packTitles: Record<(typeof checklistPackSlugs)[number], string> = {
  "vibe-coded-site-hardening-checklist": "Vibe-coded site hardening checklist",
  "security-audit-for-vibe-coded-websites":
    "Security audit for vibe-coded websites",
  "from-vibe-prototype-to-production-checklist":
    "From vibe prototype to production",
  "ai-agent-security-checklist-for-buyers":
    "AI agent security checklist for buyers",
};

export default function ChecklistMagnet({
  locale = "en",
  source = "checklist-magnet",
}: ChecklistMagnetProps) {
  const copy = checklistMagnetCopy[locale] ?? checklistMagnetCopy.en;
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale, source }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <aside
      className="mt-40 border border-black/10 bg-white/50 px-20 py-24 md:px-28"
      data-cta={source}
    >
      <h2
        className={`${syneText.className} text-body4 font-medium uppercase tracking-[0.08em]`}
      >
        {copy.title}
      </h2>

      {status === "success" ? (
        <div className={`${onestText.className} mt-12`}>
          <p className="text-body5 text-[var(--text)]">{copy.successTitle}</p>
          <p className="mt-8 text-body6 text-[var(--muted)]">
            {copy.successBody}
          </p>
          <ul className="mt-14 flex flex-col gap-8">
            {checklistPackSlugs.map((slug) => (
              <li key={slug}>
                <Link
                  href={localizePath(`/blog/${slug}`, locale)}
                  className="text-body6 underline underline-offset-4"
                >
                  {packTitles[slug]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <p
            className={`${onestText.className} mt-12 text-body5 text-[var(--muted)]`}
          >
            {copy.body}
          </p>
          <form
            onSubmit={onSubmit}
            className="mt-16 flex flex-wrap items-center gap-10"
          >
            <label htmlFor={inputId} className="sr-only">
              {copy.emailLabel}
            </label>
            <input
              id={inputId}
              type="email"
              required
              value={email}
              placeholder={copy.emailLabel}
              onChange={(event) => setEmail(event.target.value)}
              className={`${onestText.className} min-w-[14rem] flex-1 border border-black/15 bg-white px-14 py-10 text-body6 outline-none focus:border-black/40`}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className={`${syneText.className} inline-flex cursor-pointer items-center justify-center border border-black/10 bg-primary px-16 py-10 text-body6 uppercase text-white transition-colors hover:bg-primary-700 disabled:opacity-60`}
            >
              {status === "loading" ? copy.submitting : copy.submit}
            </button>
          </form>
          {status === "error" ? (
            <p
              className={`${onestText.className} mt-10 text-body6 text-red-700`}
            >
              {copy.error}
            </p>
          ) : null}
        </>
      )}
    </aside>
  );
}
