// Purpose: Homepage agent solutions - sticky nav + scroll panels.
// Scope: #agent-solutions. Framer useInView for real entrance; product loop lives in AgentUxPreview.
// Structure: one scroll panel = one agent product surface (distinct dashboard demo per kind).
// Copy layout: title + CTA + summary + inline points (no duplicate pilot cards).
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Container from "@/Components/Container/Container";
import { sansText } from "@/assets/fonts";
import { homeCopy } from "@/i18n/home";
import { localizePath, type Locale } from "@/i18n/config";
import type { SolutionsOverviewCopy } from "@/Components/Solutions/locales/types";
import { sectionTitle } from "@/lib/sectionTitle";
import AgentUxPreview, {
  type AgentUxKind,
} from "@/Components/Home/AgentUxPreview";
import styles from "./AgentSolutions.module.css";

const ease = [0.16, 1, 0.3, 1] as const;

type PanelCta = {
  href: string;
  label: string;
};

type Panel = {
  id: string;
  title: string;
  summary: string;
  kind: AgentUxKind;
  tasks: readonly string[];
  eyebrow: string | null;
  cta: PanelCta;
};

function PanelBlock({
  panel,
  locale,
  inputs,
  motionOff,
}: {
  panel: Panel;
  locale: Locale;
  inputs: readonly string[];
  motionOff: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  // Fire when ~25% of the panel is visible - reliable for tall panels.
  const inView = useInView(ref, {
    amount: 0.25,
    margin: "0px 0px -8% 0px",
    once: false,
  });
  // Replay key: remount motion subtree each time panel enters view.
  const [play, setPlay] = useState(0);
  const wasInView = useRef(false);

  useEffect(() => {
    if (inView && !wasInView.current) {
      wasInView.current = true;
      setPlay((n) => n + 1);
    } else if (!inView && wasInView.current) {
      wasInView.current = false;
    }
  }, [inView]);

  return (
    <article
      ref={ref}
      id={panel.id}
      className={styles.panel}
      data-agent-panel
      data-in-view={inView ? "true" : "false"}
    >
      <motion.header
        key={`copy-${panel.id}-${play}`}
        className={styles.panelCopy}
        initial={motionOff ? false : { opacity: 0, y: 36 }}
        animate={
          motionOff || inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0.15, y: 28 }
        }
        transition={{ duration: 0.85, ease, delay: motionOff ? 0 : 0.05 }}
      >
        {panel.eyebrow ? (
          <p className={`${sansText.className} ${styles.panelKicker}`}>
            {panel.eyebrow}
          </p>
        ) : null}
        <div className={styles.panelMeta}>
          <h3 className={`${sansText.className} ${styles.panelHeadline}`}>
            {panel.title}
          </h3>
          <Link
            href={panel.cta.href}
            className={`${sansText.className} ${styles.panelLink}`}
          >
            {panel.cta.label} <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <p className={`${sansText.className} ${styles.panelSummary}`}>
          {panel.summary}
        </p>

        {panel.tasks.length > 0 ? (
          <ul
            className={`${sansText.className} ${styles.overviewPoints}`}
            aria-label={panel.title}
          >
            {panel.tasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        ) : null}
      </motion.header>

      <motion.div
        key={`mock-${panel.id}-${play}`}
        className={styles.visualStage}
        initial={motionOff ? false : { opacity: 0, y: 52, scale: 0.94 }}
        animate={
          motionOff || inView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0.12, y: 40, scale: 0.96 }
        }
        transition={{ duration: 0.95, ease, delay: motionOff ? 0 : 0.12 }}
      >
        <AgentUxPreview
          kind={panel.kind}
          title={panel.title}
          summary={panel.summary}
          tasks={panel.tasks}
          inputs={inputs}
          locale={locale}
          live={inView}
        />
      </motion.div>
    </article>
  );
}

// overview arrives as a server-passed prop so the client chunk does not
// bundle all four locale string files (they are server-only data now).
export default function AgentSolutions({
  locale = "en",
  overview,
}: {
  locale?: Locale;
  overview: SolutionsOverviewCopy;
}) {
  const copy = overview.solutions;
  const solutionsLabel = homeCopy[locale].navigation.home[1];
  const reduce = useReducedMotion();
  const motionOff = !!reduce;
  const sectionRef = useRef<HTMLElement | null>(null);
  const sectionInView = useInView(sectionRef, {
    amount: 0.12,
    margin: "0px 0px -10% 0px",
    once: true,
  });

  const conversation = copy.cards["conversation-control"];
  const opsKnowledge = copy.cards["ops-knowledge"];
  const voice = copy.cards["voice-agents"];
  const rescue = copy.cards["rescue-and-migration"];

  const caseCtaLabel: Record<Locale, string> = {
    en: "Open multi-agent case",
    ru: "Открыть multi-agent кейс",
    ge: "მულტი-აგენტური ქეისის გახსნა",
    arm: "Բացել բազմագործակալային դեպքը",
  };

  // One panel = one product family (fixed lanes live on the solution page).
  const panels: Panel[] = [
    {
      id: "dali-agent",
      title: overview.diagram.agent,
      summary: overview.hero.lead,
      kind: "dali",
      tasks: [
        overview.diagram.reviewBody,
        overview.diagram.actionBody,
        overview.hero.supportLine,
      ],
      eyebrow: null,
      cta: {
        href: localizePath("/solutions", locale),
        label: caseCtaLabel[locale],
      },
    },
    {
      id: "agent-conversation-control",
      title: copy.responseLane.title,
      summary: copy.responseLane.summary,
      kind: "lead-response",
      tasks: conversation.tasks,
      eyebrow: copy.responseLane.eyebrow,
      cta: {
        href: localizePath("/solutions/conversation-control", locale),
        label: copy.viewPilot,
      },
    },
    {
      id: "agent-ops-knowledge",
      title: copy.opsKnowledgeLane.title,
      summary: copy.opsKnowledgeLane.summary,
      kind: "operations-docs",
      tasks: opsKnowledge.tasks,
      eyebrow: copy.opsKnowledgeLane.eyebrow,
      cta: {
        href: localizePath("/solutions/ops-knowledge", locale),
        label: copy.viewPilot,
      },
    },
    {
      id: "agent-voice-agents",
      title: voice.title,
      summary: voice.summary,
      kind: "voice-agents",
      tasks: voice.tasks,
      eyebrow: copy.researchLane,
      cta: {
        href: localizePath("/solutions/voice-agents", locale),
        label: copy.viewResearch,
      },
    },
    {
      id: "agent-rescue-migration",
      title: rescue.title,
      summary: rescue.summary,
      kind: "rescue-console",
      tasks: rescue.tasks,
      // Same "Product family" eyebrow string as the other family panels.
      eyebrow: copy.responseLane.eyebrow,
      cta: {
        href: localizePath("/solutions/rescue-and-migration", locale),
        label: copy.viewPilot,
      },
    },
  ];

  const [activePanelId, setActivePanelId] = useState(panels[0].id);

  useEffect(() => {
    const panelElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-agent-panel]"),
    );
    if (panelElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const best = visible[0];
        if (best?.target.id) setActivePanelId(best.target.id);
      },
      {
        rootMargin: "-38% 0px -48% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75],
      },
    );

    panelElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [locale]);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 720px)").matches) return;
    const activeLink = document.querySelector<HTMLElement>(
      `#agent-solutions .${styles.sidebarLink}[aria-current="location"]`,
    );
    const navigation = activeLink?.closest<HTMLElement>("nav");
    if (!activeLink || !navigation) return;
    navigation.scrollTo({
      left: Math.max(0, activeLink.offsetLeft - 12),
      behavior: reduce ? "auto" : "smooth",
    });
  }, [activePanelId, reduce]);

  return (
    <section
      ref={sectionRef}
      id="agent-solutions"
      className={styles.section}
      aria-labelledby="agent-solutions-title"
      data-section-in-view={sectionInView ? "true" : "false"}
    >
      <Container wide>
        <motion.header
          className={styles.sectionIntro}
          initial={motionOff ? false : { opacity: 0, y: 16 }}
          animate={
            motionOff || sectionInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 16 }
          }
          transition={{ duration: 0.55, ease }}
        >
          <h2 id="agent-solutions-title" className="section-label">
            {sectionTitle(2, solutionsLabel)}
          </h2>
        </motion.header>

        <div className={styles.showcase}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarInner}>
              <motion.p
                className={`${sansText.className} ${styles.sidebarKicker}`}
                initial={motionOff ? false : { opacity: 0, x: -12 }}
                animate={
                  motionOff || sectionInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -12 }
                }
                transition={{ duration: 0.45, ease }}
              >
                {copy.kicker}
              </motion.p>
              <nav aria-label={solutionsLabel}>
                {panels.map((panel, index) => {
                  const isActive = activePanelId === panel.id;
                  return (
                    <motion.a
                      key={panel.id}
                      href={`#${panel.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={`${sansText.className} ${styles.sidebarLink}`}
                      initial={motionOff ? false : { opacity: 0, x: -16 }}
                      animate={
                        motionOff || sectionInView
                          ? { opacity: 1, x: isActive ? 4 : 0 }
                          : { opacity: 0, x: -16 }
                      }
                      transition={{
                        duration: 0.45,
                        ease,
                        delay:
                          motionOff || !sectionInView
                            ? 0
                            : 0.05 + index * 0.05,
                      }}
                    >
                      {panel.title}
                    </motion.a>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className={styles.panels}>
            {panels.map((panel) => (
              <PanelBlock
                key={panel.id}
                panel={panel}
                locale={locale}
                inputs={overview.diagram.inputs}
                motionOff={motionOff}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
