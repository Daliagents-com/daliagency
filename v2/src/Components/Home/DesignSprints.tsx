// Purpose: Ways to work with Dali - five commercial routes with price anchors.
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
import ConsultationTrigger from "@/Components/Consultation/ConsultationTrigger";
import { onestText, syneText } from "@/assets/fonts";
import { homeCopy } from "@/i18n/home";
import { localizePath, type Locale } from "@/i18n/config";
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

  // Fast commit to solid dark while the cards are in view, then a short
  // close as the section leaves. Enter top→bottom, exit close top→bottom.
  const topInset = useTransform(
    scrollYProgress,
    [0, 0.16, 0.24, 0.8, 0.88, 1],
    reduce ? [0, 0, 0, 0, 0, 0] : [0, 0, 0, 0, 50, 100],
  );
  const bottomInset = useTransform(
    scrollYProgress,
    [0, 0.16, 0.24, 0.8, 0.88, 1],
    reduce ? [0, 0, 0, 0, 0, 0] : [100, 42, 0, 0, 0, 0],
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
  const ctaGift = homeCopy[locale].ctaGift;
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
                  {sectionTitle(3, copy.label)}
                </h2>
                <p className={`${syneText.className} ${styles.heading} font-medium`}>
                  {copy.heading}
                </p>
              </div>
            </div>

            <div className={styles.bento}>
              <Card
                slot="a"
                title={c0.title}
                price={c0.price}
                description={c0.description}
                href={localizePath("/starter", locale)}
                cta={c0.cta}
              >
                <MockComposer delay={0.1} />
              </Card>
              <Card
                slot="b"
                title={c1.title}
                price={c1.price}
                description={c1.description}
                href={localizePath("/hire", locale)}
                cta={c1.cta}
              >
                <MockPipeline delay={0.22} />
              </Card>
              <Card
                slot="c"
                title={c2.title}
                price={c2.price}
                description={c2.description}
                href={localizePath("/solutions", locale)}
                cta={c2.cta}
              >
                <MockRoadmap delay={0.34} />
              </Card>
              <Card
                slot="d"
                title={c4.title}
                price={c4.price}
                description={c4.description}
                href={localizePath("/care", locale)}
                cta={c4.cta}
              >
                <MockScores delay={0.46} />
              </Card>
              <Card
                slot="e"
                title={c3.title}
                price={c3.price}
                description={c3.description}
                href={localizePath(
                  "/solutions/rescue-and-migration",
                  locale,
                )}
                cta={c3.cta}
              >
                <MockGate delay={0.58} />
              </Card>
            </div>

            <div className={styles.introCopy}>
              <p className={`${styles.introBody} text-lead font-normal`}>
                {copy.body}
              </p>
              <ConsultationTrigger
                source="services-consultation"
                className={`${styles.contactButton} inline-flex items-center justify-between gap-12 bg-primary-500 px-20 py-12 font-ui text-white transition-colors hover:bg-primary-700`}
              >
                <FileText className="h-[1em] w-[1em]" aria-hidden /> {copy.contact}{" "}
                <ChevronRight className="h-[1em] w-[1em]" aria-hidden />
              </ConsultationTrigger>
              <p className={styles.giftNote}>{ctaGift}</p>
            </div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
