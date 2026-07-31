// Purpose: Services bento - product-scene mocks (no icon-slop).
// Scope: Section shell only. Mocks live in services/mocks/*.
// Theme: section-local dark curtain (scroll clip reveal) - no html[data-page-theme].
"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronRight, FileText } from "lucide-react";
import Container from "@/Components/Container/Container";
import Button from "@/Components/Button/Button";
import { onestText, syneText } from "@/assets/fonts";
import { homeCopy } from "@/i18n/home";
import type { Locale } from "@/i18n/config";
import { sectionTitle } from "@/lib/sectionTitle";
import styles from "./DesignSprints.module.css";
import { Card } from "./services/Card";
import { useSectionMotion } from "./services/useSectionMotion";
import type { MockHost } from "./services/motionShared";
import {
  MockPipeline,
  MockComposer,
  MockScores,
  MockRoadmap,
  MockGate,
} from "./services/mocks";

const CONTACT = "https://ch234lt3std.typeform.com/to/OCi31Zif";

/** When #services enters view, kick any mock that has not autoplayed yet. */
function useServicesIntroKick(sectionRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let done = false;
    const kick = () => {
      if (done) return;
      const mocks = section.querySelectorAll<MockHost>("[data-mock]");
      if (mocks.length === 0) return;
      done = true;
      mocks.forEach((host, index) => {
        if (host.dataset.play === "static") return;
        if (host.dataset.played === "true") return;
        const player = host.__tl;
        if (!player) return;
        window.setTimeout(() => {
          host.dataset.played = "true";
          host.dataset.play = "true";
          host.dataset.playReason = "section";
          player.restart();
        }, 80 + index * 120);
      });
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) kick();
      },
      { threshold: 0.12, rootMargin: "40px 0px" },
    );
    io.observe(section);

    // Boot check (already on screen)
    const boot = window.setTimeout(() => {
      const r = section.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) kick();
    }, 200);

    return () => {
      io.disconnect();
      window.clearTimeout(boot);
    };
  }, [sectionRef]);
}

/**
 * Scroll-linked dark curtain for #services only.
 * Enter: reveal top → bottom. Exit: close top → bottom (reverse).
 * Does not flip document theme / navbar.
 */
function useServicesCurtain(sectionRef: React.RefObject<HTMLElement | null>) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });

  // Longer enter/exit so the curtain reads as a deliberate theme wipe.
  // Enter 0→0.32 (top→bottom open), solid mid, exit 0.68→1 (close top→bottom).
  const topInset = useTransform(
    scrollYProgress,
    [0, 0.32, 0.68, 1],
    reduce ? [0, 0, 0, 0] : [0, 0, 0, 100],
  );
  const bottomInset = useTransform(
    scrollYProgress,
    [0, 0.32, 0.68, 1],
    reduce ? [0, 0, 0, 0] : [100, 0, 0, 0],
  );

  const clipPath = useMotionTemplate`inset(${topInset}% 0 ${bottomInset}% 0)`;

  return { clipPath, reduce: !!reduce };
}

export default function DesignSprint({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = homeCopy[locale].services;
  const servicesLabel = homeCopy[locale].navigation.home[2];
  const shellRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  useSectionMotion(shellRef);
  useServicesIntroKick(sectionRef);
  const { clipPath, reduce } = useServicesCurtain(sectionRef);
  const [c0, c1, c2, c3, c4] = copy.cards;

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`${onestText.className} ${styles.section}`}
      data-curtain={reduce ? "static" : "scroll"}
    >
      <motion.div
        className={styles.curtain}
        style={reduce ? undefined : { clipPath }}
      >
        {/* Soft leading edge along the live clip boundary (top + bottom). */}
        <div className={styles.curtainSheen} aria-hidden="true" />
        <Container className={styles.sectionContainer}>
          <div ref={shellRef} className={styles.sectionShell}>
            <div className={styles.intro}>
              <div className={styles.introTitle}>
                <h2 className="section-label" data-on="dark">
                  {sectionTitle(3, servicesLabel)}
                </h2>
                <p className={`${syneText.className} ${styles.heading} font-medium`}>
                  {copy.heading}
                </p>
              </div>
            </div>

            <div className={styles.bento}>
              <Card slot="a" title={c0.title} description={c0.description}>
                <MockPipeline delay={0.1} />
              </Card>
              <Card slot="b" title={c1.title} description={c1.description}>
                <MockComposer delay={0.22} />
              </Card>
              <Card slot="c" title={c3.title} description={c3.description}>
                <MockScores delay={0.34} />
              </Card>
              <Card slot="d" title={c2.title} description={c2.description}>
                <MockRoadmap delay={0.46} />
              </Card>
              <Card slot="e" title={c4.title} description={c4.description}>
                <MockGate delay={0.58} />
              </Card>
            </div>

            <div className={styles.introCopy}>
              <p className={`${styles.introBody} text-lead font-normal`}>
                {copy.body}
              </p>
              <Button className={styles.contactButton} href={CONTACT} target="_blank">
                <FileText className="h-[1em] w-[1em]" aria-hidden /> {copy.contact}{" "}
                <ChevronRight className="h-[1em] w-[1em]" aria-hidden />
              </Button>
            </div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
