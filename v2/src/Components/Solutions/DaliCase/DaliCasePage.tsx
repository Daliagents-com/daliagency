// Purpose: Full /solutions page = Dali multi-agent case (not AIHome overview).
// Scope: Hero → full workspace → pilot cards → CTA. Framer scroll reveals.
"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Container from "@/Components/Container/Container";
import { monoText, sansText } from "@/assets/fonts";
import ConsultationTrigger from "@/Components/Consultation/ConsultationTrigger";
import {
  htmlLanguages,
  localizePath,
  type Locale,
} from "@/i18n/config";
import { solutionSlugs } from "@/Components/Solutions/solutionContent";
import type { LocalizedSolutionsBundle } from "@/Components/Solutions/locales/types";
import dynamic from "next/dynamic";
import styles from "./DaliCase.module.css";

// xyflow workspace is heavy - load only on the solutions case page client graph.
const DaliCaseWorkspace = dynamic(() => import("./DaliCaseWorkspace"), {
  ssr: false,
  loading: () => (
    <div className={styles.workspaceFallback} aria-hidden="true" />
  ),
});

const ease = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, {
    amount: 0.2,
    margin: "0px 0px -8% 0px",
    once,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={
        reduce || inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y }
      }
      transition={{ duration: 0.7, ease, delay: reduce ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

export default function DaliCasePage({
  bundle,
  locale = "en",
}: {
  bundle: LocalizedSolutionsBundle;
  locale?: Locale;
}) {
  const copy = bundle.overview;
  const cards = copy.solutions.cards;

  return (
    <main className={styles.page} lang={htmlLanguages[locale]}>
      {/* 1. Hero - where to start reading */}
      <section className={styles.hero} aria-labelledby="dali-case-title">
        <Container wide>
          <div className={styles.heroInner}>
            <Reveal delay={0} y={20}>
              <p className={`${monoText.className} ${styles.eyebrow}`}>
                {copy.diagram.agent}
              </p>
            </Reveal>
            <Reveal delay={0.06} y={24}>
              <h1
                id="dali-case-title"
                className={`${sansText.className} ${styles.title}`}
              >
                One multi-agent system inside your stack.
              </h1>
            </Reveal>
            <Reveal delay={0.12} y={22}>
              <p className={`${sansText.className} ${styles.lead}`}>
                {copy.hero.lead}
              </p>
            </Reveal>
            <Reveal delay={0.18} y={18}>
              <div className={styles.ctaRow}>
                <ConsultationTrigger
                  source="dali-case-consultation"
                  className={`${sansText.className} ${styles.primaryCta}`}
                >
                  {copy.hero.primaryCta}
                </ConsultationTrigger>
                <a
                  href="#system-map"
                  className={`${sansText.className} ${styles.secondaryCta}`}
                >
                  Explore the system map
                </a>
              </div>
              <p className={`${sansText.className} ${styles.support}`}>
                {copy.hero.supportLine}
              </p>
              <p className={`${sansText.className} ${styles.lookCue}`}>
                Start below <span aria-hidden="true">↓</span>
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2. Full workspace - the case visual */}
      <section
        id="system-map"
        className={styles.stageSection}
        aria-label={copy.diagram.ariaLabel}
      >
        <Container wide>
          <Reveal delay={0.05} y={20}>
            <ol className={`${sansText.className} ${styles.stageGuide}`}>
              <li>
                <b>1</b> Agents in the middle
              </li>
              <li>
                <b>2</b> Tools around them
              </li>
              <li>
                <b>3</b> Chat + actions
              </li>
            </ol>
          </Reveal>

          <Reveal delay={0.12} y={36}>
            <DaliCaseWorkspace locale={locale} live />
          </Reveal>
        </Container>
      </section>

      {/* 3. Packaged pilots */}
      <section
        id="pilots"
        className={styles.pilots}
        aria-labelledby="dali-pilots-title"
      >
        <Container wide>
          <Reveal>
            <header className={styles.pilotsHead}>
              <p className={`${monoText.className} ${styles.pilotsKicker}`}>
                {copy.solutions.packagedPilot}
              </p>
              <h2
                id="dali-pilots-title"
                className={`${sansText.className} ${styles.pilotsTitle}`}
              >
                {copy.solutions.title}
              </h2>
            </header>
          </Reveal>

          <div className={styles.pilotGrid}>
            {solutionSlugs.map((slug, index) => {
              const card = cards[slug];
              const href = localizePath(`/solutions/${slug}`, locale);
              const isVoice = slug === "voice-agents";
              return (
                <Reveal key={slug} delay={0.05 + index * 0.06} y={24}>
                  <Link href={href} className={styles.pilotCard}>
                    <p className={`${monoText.className} ${styles.pilotEyebrow}`}>
                      {isVoice
                        ? copy.solutions.researchLane
                        : copy.solutions.packagedPilot}
                    </p>
                    <h3 className={`${sansText.className} ${styles.pilotName}`}>
                      {card.title}
                    </h3>
                    <p className={`${sansText.className} ${styles.pilotSummary}`}>
                      {card.summary}
                    </p>
                    <span className={`${sansText.className} ${styles.pilotLink}`}>
                      {isVoice
                        ? copy.solutions.viewResearch
                        : copy.solutions.viewPilot}{" "}
                      ↗
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4. CTA */}
      <section className={styles.ctaBand} aria-labelledby="dali-cta-title">
        <Container wide>
          <Reveal y={20}>
            <div className={styles.ctaInner}>
              <h2
                id="dali-cta-title"
                className={`${sansText.className} ${styles.ctaTitle}`}
              >
                {copy.contact.title}
              </h2>
              <p className={`${sansText.className} ${styles.ctaBody}`}>
                {copy.contact.body}
              </p>
              <ConsultationTrigger
                source="dali-case-footer-consultation"
                className={`${sansText.className} ${styles.primaryCta}`}
              >
                {copy.contact.cta}
              </ConsultationTrigger>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
