// Purpose: Render a complete AI-first homepage variant with Dali's existing art direction.
// Scope: Self-contained server component with semantic sections and no client-side behavior.
import Image from "next/image";
import Link from "next/link";
import Container from "@/Components/Container/Container";
import {
  monoText,
  sansText,
} from "@/assets/fonts";
import DavidImage from "@/assets/images/team/david.png";
import LianaImage from "@/assets/images/team/liana.jpeg";
import { getGeneralAuditHref } from "@/lib/contact";
import {
  htmlLanguages,
  localizePath,
  type Locale,
} from "@/i18n/config";
import { homeCopy } from "@/i18n/home";
import { sectionTitle } from "@/lib/sectionTitle";
import { solutionSlugs } from "@/Components/Solutions/solutionContent";
import type { LocalizedSolutionsBundle } from "@/Components/Solutions/locales/types";
import styles from "./AIHome.module.css";

const proofHrefs = [
  "/project/agentsge",
  "/project/kora",
  "/project/deliverysetup",
] as const;

const founderImages = [DavidImage, LianaImage] as const;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dali",
  url: "https://dali.agents.ge",
  founder: {
    "@type": "Person",
    name: "David Hakobyan",
  },
  sameAs: [
    "https://www.linkedin.com/in/davidhakobyan/",
    "https://t.me/aisceptic0",
    "https://x.com/larseen66",
  ],
};

export default function AIHome({
  bundle,
  locale = "en",
}: {
  bundle: LocalizedSolutionsBundle;
  locale?: Locale;
}) {
  const copy = bundle.overview;
  const auditHref = getGeneralAuditHref(locale);
  const nav = homeCopy[locale].navigation.solutions;
  // ONE title per section = NN / NavLabel (see src/lib/sectionTitle.ts).
  // Descriptive lines from copy become leads, not second titles.
  const titles = {
    solutions: sectionTitle(1, nav[0]),
    process: sectionTitle(2, nav[1]),
    proof: sectionTitle(3, nav[2]),
    about: sectionTitle(4, nav[3]),
    faq: sectionTitle(5, copy.faq.kicker),
    contact: sectionTitle(6, copy.contact.kicker),
  } as const;

  return (
    <main className={styles.page} lang={htmlLanguages[locale]}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className={styles.hero} aria-labelledby="ai-home-title">
        <Container wide>
          <div className={styles.frame}>
            <div className={styles.heroGrid}>
              <div className={styles.heroContent}>
                <p className={`${monoText.className} ${styles.eyebrow}`}>
                  {copy.hero.eyebrow}
                </p>
                <h1
                  id="ai-home-title"
                  className={`${sansText.className} ${styles.title}`}
                >
                  {copy.hero.title}
                </h1>
                <p className={`${sansText.className} ${styles.lead}`}>
                  {copy.hero.lead}
                </p>
                <div className={styles.ctaRow}>
                  <a
                    href={auditHref}
                    data-cta="hero-audit"
                    className={styles.primaryCta}
                  >
                    {copy.hero.primaryCta}
                  </a>
                  <a href="#solutions" className={styles.secondaryCta}>
                    {copy.hero.secondaryCta}
                  </a>
                </div>
                <p className={`${sansText.className} ${styles.supportLine}`}>
                  {copy.hero.supportLine}
                </p>
              </div>

              <div
                className={styles.diagramPanel}
                aria-label={copy.diagram.ariaLabel}
              >
                <div className={styles.diagramCard}>
                  <p className={`${monoText.className} ${styles.diagramLabel}`}>
                    {copy.diagram.label}
                  </p>
                  <div className={styles.diagramInputs}>
                    {copy.diagram.inputs.map((input) => (
                      <span key={input}>{input}</span>
                    ))}
                  </div>
                  <div className={styles.diagramArrow} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className={styles.diagramAgent}>
                    {copy.diagram.agent}
                  </div>
                  <div className={styles.diagramDivider} aria-hidden="true" />
                  <div className={styles.diagramOutputs}>
                    <div>
                      <strong>{copy.diagram.reviewTitle}</strong>
                      <span>{copy.diagram.reviewBody}</span>
                    </div>
                    <div>
                      <strong>{copy.diagram.actionTitle}</strong>
                      <span>{copy.diagram.actionBody}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="solutions"
        aria-labelledby="solutions-title"
        className={styles.section}
      >
        <Container wide>
          <div className={styles.sectionFrame}>
            <div className={styles.sectionIntro}>
              <h2 id="solutions-title" className="section-label">
                {titles.solutions}
              </h2>
              <p className={`${sansText.className} ${styles.sectionLead}`}>
                {copy.solutions.title}
              </p>
            </div>

            <div className={styles.beforeAfter}>
              <article className={styles.beforeAfterCard}>
                <p className={`${monoText.className} ${styles.cardEyebrow}`}>
                  {copy.solutions.beforeLabel}
                </p>
                <ul className={styles.bulletList}>
                  {copy.solutions.before.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className={styles.beforeAfterCard}>
                <p className={`${monoText.className} ${styles.cardEyebrow}`}>
                  {copy.solutions.afterLabel}
                </p>
                <ul className={styles.bulletList}>
                  {copy.solutions.after.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <div className={`${styles.cardGrid} ${styles.solutionGrid}`}>
              {solutionSlugs.map((slug) => {
                const card = copy.solutions.cards[slug];
                const isResearchLane = slug === "voice-agents";
                const href = localizePath(`/solutions/${slug}`, locale);

                return (
                  <article key={slug} className={styles.solutionCard}>
                    <p className={`${monoText.className} ${styles.cardEyebrow}`}>
                      {isResearchLane
                        ? copy.solutions.researchLane
                        : copy.solutions.packagedPilot}
                    </p>
                    <h3
                      className={`${sansText.className} ${styles.cardTitle}`}
                    >
                      {card.title}
                    </h3>
                    <p className={styles.cardBody}>{card.summary}</p>
                    <ul className={styles.bulletList}>
                      {card.tasks.map((task) => (
                        <li key={task}>{task}</li>
                      ))}
                    </ul>
                    <Link href={href} className={styles.inlineLink}>
                      {isResearchLane
                        ? copy.solutions.viewResearch
                        : copy.solutions.viewPilot}
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section
        id="process"
        aria-labelledby="process-title"
        className={styles.section}
      >
        <Container wide>
          <div className={styles.sectionFrame}>
            <div className={styles.sectionIntro}>
              <h2 id="process-title" className="section-label">
                {titles.process}
              </h2>
              <p className={`${sansText.className} ${styles.sectionLead}`}>
                {copy.process.title}
              </p>
            </div>

            <ol className={styles.processGrid}>
              {copy.process.steps.map((step, index) => (
                <li key={step.title} className={styles.processCard}>
                  <p className={`${monoText.className} ${styles.processIndex}`}>
                    0{index + 1}
                  </p>
                  <h3 className={`${sansText.className} ${styles.cardTitle}`}>
                    {step.title}
                  </h3>
                  <p className={styles.cardBody}>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section id="proof" aria-labelledby="proof-title" className={styles.section}>
        <Container wide>
          <div className={styles.sectionFrame}>
            <div className={styles.sectionIntro}>
              <h2 id="proof-title" className="section-label">
                {titles.proof}
              </h2>
              <p className={`${sansText.className} ${styles.sectionLead}`}>
                {copy.proof.title}
              </p>
            </div>

            <div className={styles.cardGrid}>
              {copy.proof.cards.map((card, index) => (
                <article key={card.title} className={styles.proofCard}>
                  <h3 className={`${sansText.className} ${styles.cardTitle}`}>
                    {card.title}
                  </h3>
                  <p className={styles.cardBody}>{card.body}</p>
                  <Link
                    href={localizePath(proofHrefs[index], locale)}
                    className={styles.inlineLink}
                  >
                    {copy.proof.viewProject}
                  </Link>
                </article>
              ))}
            </div>

            <aside className={styles.trustBlock} aria-labelledby="trust-title">
              <div>
                <h3
                  id="trust-title"
                  className={`${sansText.className} ${styles.trustTitle}`}
                >
                  {copy.trust.kicker}
                </h3>
                <p className={styles.cardBody}>{copy.trust.title}</p>
              </div>
              <ul className={styles.trustList}>
                {copy.trust.points.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      <section id="about" aria-labelledby="about-title" className={styles.section}>
        <Container wide>
          <div className={styles.sectionFrame}>
            <div className={styles.sectionIntro}>
              <h2 id="about-title" className="section-label">
                {titles.about}
              </h2>
              <p className={`${sansText.className} ${styles.sectionLead}`}>
                {copy.about.title}
              </p>
            </div>

            <div className={styles.founderGrid}>
              {copy.about.founders.map((founder, index) => (
                <article key={founder.name} className={styles.founderCard}>
                  <Image
                    src={founderImages[index]}
                    alt={founder.alt}
                    width={144}
                    height={144}
                    className={styles.founderImage}
                  />
                  <div>
                    <h3 className={`${sansText.className} ${styles.cardTitle}`}>
                      {founder.name}
                    </h3>
                    <p className={`${monoText.className} ${styles.founderRole}`}>
                      {founder.role}
                    </p>
                    <p className={styles.cardBody}>{founder.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="faq" aria-labelledby="faq-title" className={styles.section}>
        <Container wide>
          <div className={styles.sectionFrame}>
            <div className={styles.sectionIntro}>
              <h2 id="faq-title" className="section-label">
                {titles.faq}
              </h2>
              <p className={`${sansText.className} ${styles.sectionLead}`}>
                {copy.faq.title}
              </p>
            </div>

            <div className={styles.faqList}>
              {copy.faq.items.map((item) => (
                <details key={item.question} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>{item.question}</summary>
                  <p className={styles.faqAnswer}>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-title"
        className={styles.section}
      >
        <Container wide>
          <div className={`${styles.sectionFrame} ${styles.contactFrame}`}>
            <div className={styles.sectionIntro}>
              <h2 id="contact-title" className="section-label">
                {titles.contact}
              </h2>
              <p className={`${sansText.className} ${styles.sectionLead}`}>
                {copy.contact.title}
              </p>
            </div>
            <p className={`${sansText.className} ${styles.contactLead}`}>
              {copy.contact.body}
            </p>
            <a
              href={auditHref}
              data-cta="final-audit"
              className={styles.primaryCta}
            >
              {copy.contact.cta}
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
