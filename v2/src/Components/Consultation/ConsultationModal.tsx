// Purpose: Embedded free-consultation form - stays on-site, no Typeform/Calendly.
"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import FocusLock from "react-focus-lock";
import { usePathname } from "next/navigation";
import { localeFromPathname } from "@/i18n/config";
import {
  consultationCopy,
  type ConsultationInterest,
} from "@/lib/consultation";
import { AnalyticsEvent } from "@/lib/analytics/events";
import { trackClientEvent } from "@/lib/analytics/trackClient";
import { useConsultation } from "./ConsultationContext";
import styles from "./ConsultationModal.module.css";

const INTERESTS: ConsultationInterest[] = [
  "not-sure",
  "conversation-control",
  "ops-knowledge",
  "voice",
  "vibe-code-rescue",
  "custom",
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ConsultationModal() {
  const { isOpen, source, closeConsultation } = useConsultation();
  const pathname = usePathname() ?? "/";
  const locale = localeFromPathname(pathname);
  const copy = consultationCopy[locale];
  const reduce = useReducedMotion();
  const titleId = useId();
  const formId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [interest, setInterest] =
    useState<ConsultationInterest>("not-sure");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setStatus("idle");
    setError("");
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeConsultation();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeConsultation]);

  const resetAndClose = () => {
    closeConsultation();
    // Clear success state after close animation
    window.setTimeout(() => {
      setStatus("idle");
      setName("");
      setEmail("");
      setCompany("");
      setInterest("not-sure");
      setMessage("");
      setError("");
      if (
        window.location.hash === "#consultation" ||
        window.location.hash === "#book"
      ) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }, 280);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          interest,
          message,
          locale,
          source,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error || copy.error);
        trackClientEvent(
          AnalyticsEvent.ConsultationError,
          { interest, stage: "response" },
          { source, locale },
        );
        return;
      }
      setStatus("success");
      // Server already records consultation_submit; client only tracks UX success path noise-free.
    } catch {
      setStatus("error");
      setError(copy.error);
      trackClientEvent(
        AnalyticsEvent.ConsultationError,
        { interest, stage: "network" },
        { source, locale },
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <FocusLock returnFocus>
          <motion.div
            className={styles.overlay}
            role="presentation"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={resetAndClose}
          >
            <motion.div
              className={styles.dialog}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.28, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <header className={styles.header}>
                <div>
                  <h2 id={titleId} className={styles.title}>
                    {copy.title}
                  </h2>
                  <p className={styles.subtitle}>{copy.subtitle}</p>
                </div>
                <button
                  type="button"
                  className={styles.iconClose}
                  onClick={resetAndClose}
                  aria-label={copy.close}
                >
                  ×
                </button>
              </header>

              {status === "success" ? (
                <div className={styles.success}>
                  <p className={styles.successTitle}>{copy.successTitle}</p>
                  <p className={styles.successBody}>{copy.successBody}</p>
                  <button
                    type="button"
                    className={styles.primary}
                    onClick={resetAndClose}
                  >
                    {copy.close}
                  </button>
                </div>
              ) : (
                <form id={formId} className={styles.form} onSubmit={onSubmit}>
                  <label className={styles.field}>
                    <span>
                      {copy.name} <em>{copy.required}</em>
                    </span>
                    <input
                      name="name"
                      autoComplete="name"
                      required
                      minLength={2}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>

                  <label className={styles.field}>
                    <span>
                      {copy.email} <em>{copy.required}</em>
                    </span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>

                  <label className={styles.field}>
                    <span>
                      {copy.company}{" "}
                      <em className={styles.optional}>{copy.companyOptional}</em>
                    </span>
                    <input
                      name="company"
                      autoComplete="organization"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </label>

                  <label className={styles.field}>
                    <span>
                      {copy.interest} <em>{copy.required}</em>
                    </span>
                    <select
                      name="interest"
                      required
                      value={interest}
                      onChange={(e) =>
                        setInterest(e.target.value as ConsultationInterest)
                      }
                    >
                      {INTERESTS.map((id) => (
                        <option key={id} value={id}>
                          {copy.interests[id]}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>
                      {copy.message} <em>{copy.required}</em>
                    </span>
                    <textarea
                      name="message"
                      required
                      minLength={10}
                      rows={4}
                      placeholder={copy.messagePlaceholder}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </label>

                  {status === "error" ? (
                    <p className={styles.error} role="alert">
                      {error || copy.error}
                    </p>
                  ) : null}

                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.secondary}
                      onClick={resetAndClose}
                    >
                      {copy.close}
                    </button>
                    <button
                      type="submit"
                      className={styles.primary}
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? copy.submitting : copy.submit}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        </FocusLock>
      ) : null}
    </AnimatePresence>
  );
}
