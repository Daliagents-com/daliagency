// Purpose: Localized workflow intake with an optional Cal.com booking step.
"use client";

import { type FormEvent, useEffect, useId, useState } from "react";
import Cal, { getCalApi, type EmbedEvent } from "@calcom/embed-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import FocusLock from "react-focus-lock";
import { usePathname } from "next/navigation";
import { localeFromPathname, type Locale } from "@/i18n/config";
import {
  consultationCopy,
  type ConsultationInterest,
} from "@/lib/consultation";
import {
  daliLinkedInUrl,
  daliTelegramUrl,
  daliWhatsAppUrl,
  daliXUrl,
} from "@/lib/contact";
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

const CAL_LINK = "david-hakobyan-ln6x4y/workflow-audit";
const CAL_URL = `https://cal.com/${CAL_LINK}`;
const CAL_NAMESPACE = "workflow-audit";
const EASE = [0.16, 1, 0.3, 1] as const;

const DIRECT_CONTACTS = [
  { id: "x", label: "X", href: daliXUrl },
  { id: "linkedin", label: "LinkedIn", href: daliLinkedInUrl },
  { id: "whatsapp", label: "WhatsApp", href: daliWhatsAppUrl },
  { id: "telegram", label: "Telegram", href: daliTelegramUrl },
] as const;

const CAL_LOCALE: Record<Locale, string> = {
  en: "en",
  ru: "ru",
  ge: "en",
  arm: "en",
};

type View = "intake" | "calendar";
type FormStatus = "idle" | "loading" | "success" | "error";

export default function ConsultationModal() {
  const {
    isOpen,
    source,
    interest: prefillInterest,
    closeConsultation,
  } = useConsultation();
  const pathname = usePathname() ?? "/";
  const locale = localeFromPathname(pathname);
  const copy = consultationCopy[locale];
  const intakeMeta =
    locale === "ru"
      ? "3 вопроса · Ответ по email · Бесплатно"
      : locale === "en"
        ? "3 questions · Reply by email · Free"
        : copy.calendarDescription;
  const reduce = useReducedMotion();
  const titleId = useId();

  const [view, setView] = useState<View>("intake");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] =
    useState<ConsultationInterest>("not-sure");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [calendarReady, setCalendarReady] = useState(false);
  const [calendarFailed, setCalendarFailed] = useState(false);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    if (!isOpen || view !== "calendar") return undefined;

    let active = true;
    let calApi: Awaited<ReturnType<typeof getCalApi>> | null = null;
    setCalendarReady(false);
    setCalendarFailed(false);

    const onReady = () => {
      if (active) setCalendarReady(true);
    };
    const onFailed = (event: EmbedEvent<"linkFailed">) => {
      if (!active) return;
      setCalendarFailed(true);
      trackClientEvent(
        AnalyticsEvent.ConsultationError,
        { stage: "calendar_load", code: event.detail.data.code, locale },
        { source },
      );
    };
    const onBooked = (event: EmbedEvent<"bookingSuccessfulV2">) => {
      if (!active) return;
      setBooked(true);
      trackClientEvent(
        AnalyticsEvent.ConsultationBooked,
        {
          locale,
          interest,
          event_type_id: event.detail.data.eventTypeId ?? 0,
          booking_status: event.detail.data.status ?? "unknown",
        },
        { source },
      );
    };

    void getCalApi({ namespace: CAL_NAMESPACE }).then((api) => {
      if (!active) return;
      calApi = api;
      api("ui", {
        theme: "light",
        layout: "month_view",
        hideEventTypeDetails: true,
      });
      api("on", { action: "linkReady", callback: onReady });
      api("on", { action: "linkFailed", callback: onFailed });
      api("on", { action: "bookingSuccessfulV2", callback: onBooked });
    });

    return () => {
      active = false;
      if (!calApi) return;
      calApi("off", { action: "linkReady", callback: onReady });
      calApi("off", { action: "linkFailed", callback: onFailed });
      calApi("off", { action: "bookingSuccessfulV2", callback: onBooked });
    };
  }, [interest, isOpen, locale, source, view]);

  useEffect(() => {
    if (!isOpen) return;
    setView(source === "hash:book" ? "calendar" : "intake");
    setInterest(prefillInterest ?? "not-sure");
    setStatus("idle");
    setError("");
    setBooked(false);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeConsultation();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, prefillInterest, source, closeConsultation]);

  const resetAndClose = () => {
    closeConsultation();
    window.setTimeout(() => {
      setView("intake");
      setName("");
      setEmail("");
      setInterest("not-sure");
      setMessage("");
      setStatus("idle");
      setError("");
      setCalendarReady(false);
      setCalendarFailed(false);
      setBooked(false);
      if (
        window.location.hash === "#consultation" ||
        window.location.hash === "#book"
      ) {
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }
    }, 280);
  };

  const selectView = (nextView: View) => {
    setView(nextView);
    trackClientEvent(
      AnalyticsEvent.CtaClick,
      { action: `consultation_${nextView}`, locale },
      { source },
    );
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          interest,
          message,
          locale,
          source,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setError(data.error || copy.error);
        trackClientEvent(
          AnalyticsEvent.ConsultationError,
          { interest, stage: "response", locale },
          { source },
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setError(copy.error);
      trackClientEvent(
        AnalyticsEvent.ConsultationError,
        { interest, stage: "network", locale },
        { source },
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <div
          className={styles.layer}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) resetAndClose();
          }}
        >
          <FocusLock returnFocus className={styles.focusLock}>
            <motion.div
              className={styles.dialog}
              data-view={view}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={reduce ? false : { opacity: 0, y: 10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 6, scale: 0.985 }}
              transition={{ duration: 0.22, ease: EASE }}
              onPointerDown={(event) => event.stopPropagation()}
            >
              <header className={styles.header}>
                <div>
                  <h2 id={titleId} className={styles.title}>
                    {copy.title}
                  </h2>
                  <p className={styles.subtitle}>{copy.subtitle}</p>
                  <p className={styles.meta}>
                    {view === "intake" ? intakeMeta : copy.calendarDescription}
                  </p>
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

              {!booked && status !== "success" ? (
                <nav className={styles.modeSwitch} aria-label={copy.title}>
                  <button
                    type="button"
                    data-active={view === "intake" ? "true" : undefined}
                    onClick={() => selectView("intake")}
                  >
                    {copy.message}
                  </button>
                  <button
                    type="button"
                    data-active={view === "calendar" ? "true" : undefined}
                    onClick={() => selectView("calendar")}
                  >
                    {copy.calendarLabel}
                  </button>
                </nav>
              ) : null}

              {booked ? (
                <div className={styles.statusPanel}>
                  <span className={styles.statusMark} aria-hidden="true">
                    ✓
                  </span>
                  <p className={styles.statusTitle}>{copy.bookedTitle}</p>
                  <p className={styles.statusBody}>{copy.bookedBody}</p>
                  <button
                    type="button"
                    className={styles.primary}
                    onClick={resetAndClose}
                  >
                    {copy.close}
                  </button>
                </div>
              ) : status === "success" ? (
                <div className={styles.statusPanel}>
                  <span className={styles.statusMark} aria-hidden="true">
                    ✓
                  </span>
                  <p className={styles.statusTitle}>{copy.successTitle}</p>
                  <p className={styles.statusBody}>{copy.successBody}</p>
                  <div className={styles.statusActions}>
                    <button
                      type="button"
                      className={styles.primary}
                      onClick={() => selectView("calendar")}
                    >
                      {copy.openCalendar}
                    </button>
                    <button
                      type="button"
                      className={styles.secondary}
                      onClick={resetAndClose}
                    >
                      {copy.close}
                    </button>
                  </div>
                </div>
              ) : view === "intake" ? (
                <form className={styles.form} onSubmit={onSubmit}>
                  <div className={styles.fieldGrid}>
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
                        onChange={(event) => setName(event.target.value)}
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
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </label>
                  </div>

                  <label className={styles.field}>
                    <span>
                      {copy.interest} <em>{copy.required}</em>
                    </span>
                    <select
                      name="interest"
                      required
                      value={interest}
                      onChange={(event) =>
                        setInterest(event.target.value as ConsultationInterest)
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
                      onChange={(event) => setMessage(event.target.value)}
                    />
                  </label>

                  {status === "error" ? (
                    <p className={styles.error} role="alert">
                      {error}
                    </p>
                  ) : null}

                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.secondary}
                      onClick={() => selectView("calendar")}
                    >
                      {copy.calendarLabel}
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
              ) : (
                <div className={styles.body}>
                  <section
                    className={styles.calendarPanel}
                    aria-label={copy.calendarLabel}
                  >
                    {calendarFailed ? (
                      <div className={styles.calendarError} role="alert">
                        <div>
                          <p className={styles.statusTitle}>
                            {copy.calendarErrorTitle}
                          </p>
                          <p className={styles.statusBody}>
                            {copy.calendarErrorBody}
                          </p>
                        </div>
                        <a
                          className={styles.primary}
                          href={CAL_URL}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {copy.openCalendar}
                        </a>
                      </div>
                    ) : (
                      <div className={styles.calendarShell}>
                        {!calendarReady ? (
                          <div className={styles.loading} role="status">
                            <span
                              className={styles.spinner}
                              aria-hidden="true"
                            />
                            {copy.loadingCalendar}
                          </div>
                        ) : null}
                        <Cal
                          namespace={CAL_NAMESPACE}
                          calLink={CAL_LINK}
                          config={{
                            layout: "month_view",
                            theme: "light",
                            locale: CAL_LOCALE[locale],
                          }}
                          className={styles.calendar}
                        />
                      </div>
                    )}
                  </section>
                </div>
              )}

              <footer className={styles.directContact}>
                <span>{copy.directMessageTitle}</span>
                <nav
                  className={styles.contactLinks}
                  aria-label={copy.directMessageTitle}
                >
                  {DIRECT_CONTACTS.map((contact) => (
                    <a
                      key={contact.id}
                      className={styles.contactLink}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackClientEvent(
                          AnalyticsEvent.CtaClick,
                          {
                            action: `consultation_direct_${contact.id}`,
                            locale,
                          },
                          { source },
                        )
                      }
                    >
                      {contact.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </nav>
              </footer>
            </motion.div>
          </FocusLock>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
