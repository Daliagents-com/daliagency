// Purpose: Render Dali's shared solutions index and solution detail landing pages.
// Scope: Server-only UI for public and Upwork route variants.
import Link from "next/link";
import type { CSSProperties } from "react";
import Container from "@/Components/Container/Container";
import {
  condensedHeadings,
  monoText,
  sansText,
  serifText,
} from "@/assets/fonts";
import {
  allSolutions,
  buildPublicContactBody,
  buildPublicContactHref,
  getSolutionHref,
  siteUrl,
  type SolutionContent,
  type SolutionVariant,
} from "./solutionContent";
import {
  englishLabels,
  type SolutionPageLabels,
  type SolutionPageLocale,
} from "./solutionLabels";
import {
  htmlLanguages,
  localizePath,
} from "@/i18n/config";
import CopyBriefButton from "./CopyBriefButton";
import PilotProductPreview from "./visuals/PilotProductPreview";
import AttioTableShowcase from "./visuals/AttioTableShowcase";
import styles from "./SolutionPages.module.css";

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function buildServiceJsonLd(
  solution: SolutionContent,
  locale: SolutionPageLocale,
) {
  const pathname = localizePath(getSolutionHref(solution.slug), locale);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.name,
    description: solution.metadata.description,
    serviceType: solution.name,
    url: `${siteUrl}${pathname}`,
    provider: {
      "@type": "Organization",
      name: "Dali",
      url: siteUrl,
    },
    areaServed: "Worldwide",
    inLanguage: htmlLanguages[locale],
  };
}

function getThemeStyle(solution: SolutionContent): CSSProperties {
  return {
    ["--solution-accent" as string]: solution.accent,
    ["--solution-accent-soft" as string]: solution.accentSoft,
    ["--solution-tint" as string]: solution.tint,
  };
}

function getUpworkWorkflowIntake(solution: SolutionContent) {
  switch (solution.slug) {
    case "lead-response":
      return ["Website form", "Email inbox", "Shared CRM queue"] as const;
    case "client-inbox":
      return ["Customer inbox", "Approved files", "Shared CRM queue"] as const;
    case "operations-docs":
      return ["Email or PDF", "Form or screenshot", "Spreadsheet row"] as const;
    case "knowledge-assistant":
      return ["Docs", "Past answers", "Policy notes"] as const;
    case "voice-agents":
      return ["Call queue", "Scheduling rules", "FAQ docs"] as const;
  }
}

function getUpworkIntegrations(solution: SolutionContent) {
  switch (solution.slug) {
    case "lead-response":
      return [
        "HubSpot, Pipedrive, or a structured Google Sheet",
        "Email inboxes and booking handoff",
        "CRM updates and follow-up queues",
      ] as const;
    case "client-inbox":
      return [
        "Email, website chat, or an existing customer inbox",
        "HubSpot, Bitrix24, Kommo, GoHighLevel, or another case-history system",
        "Approved help articles, policy notes, files, and resolved threads",
        "Human approval queues for sensitive actions or uncertain requests",
      ] as const;
    case "operations-docs":
      return [
        "Gmail, Outlook, Drive, forms, uploads, or watched folders",
        "PDFs, screenshots, spreadsheets, order emails, invoices, or application packets",
        "HubSpot, Salesforce, Odoo, QuickBooks, Buildium, or Google Sheets",
        "Approvals and exception alerts in the team workspace",
      ] as const;
    case "knowledge-assistant":
      return [
        "Notion, Google Drive, Confluence, or an internal docs folder",
        "Internal question intake",
        "Zendesk, Intercom, or a support triage channel",
        "Issue or ticket systems for escalation",
      ] as const;
    case "voice-agents":
      return [
        "Twilio, SIP routing, or an existing cloud telephony provider",
        "Existing booking software or a structured intake sheet",
        "CRM updates and owner alerts after every call outcome",
        "Team notifications for transfer and callback events",
      ] as const;
  }
}

function renderCta(
  solution: SolutionContent,
  variant: SolutionVariant,
  placement: "hero" | "closing",
  labels: SolutionPageLabels,
  locale: SolutionPageLocale,
) {
  if (variant === "upwork") {
    if (placement === "closing") {
      return (
        <div className={`${sansText.className} ${styles.upworkNextStep}`}>
          {labels.returnToUpwork}
        </div>
      );
    }

    return (
      <>
        <a href="#upwork-reply-checklist" className={styles.primaryCta}>
          {solution.cta.upworkLabel}
        </a>
        <span className={`${sansText.className} ${styles.upworkBadge}`}>
          {labels.keepConversationOnPlatform}
        </span>
      </>
    );
  }

  return (
    <>
      <a
        href={buildPublicContactHref(solution, locale)}
        data-cta={`solution-audit-${solution.slug}`}
        className={styles.primaryCta}
      >
        {solution.cta.publicLabel}
      </a>
      <CopyBriefButton
        text={buildPublicContactBody(solution, locale)}
        label={labels.copyDetailedBrief}
        copiedLabel={labels.briefCopied}
        className={styles.secondaryCta}
      />
      {placement === "closing" ? (
        <Link
          href={localizePath("/solutions", locale)}
          className={styles.textCta}
        >
          {labels.browseAllPilots}
        </Link>
      ) : null}
    </>
  );
}

function renderProductShowcase(
  solution: SolutionContent,
  labels: SolutionPageLabels,
) {
  // One shared product shell for every pilot. Edit AttioTableShowcase / buildModel.
  return <AttioTableShowcase solution={solution} labels={labels} />;
}

export function SolutionsIndex() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dali solution pilots",
    itemListElement: allSolutions.map((solution, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: solution.name,
      url: `${siteUrl}${getSolutionHref(solution.slug)}`,
    })),
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(itemListJsonLd),
        }}
      />
      <section className={styles.heroSection} aria-labelledby="solutions-title">
        <Container wide>
          <div className={styles.shell}>
            <div className={styles.indexHero}>
              <div className={styles.indexHeroCopy}>
                <p className={`${monoText.className} ${styles.eyebrow}`}>
                  Solution pilots
                </p>
                <h1
                  id="solutions-title"
                  className={`${condensedHeadings.className} ${styles.title}`}
                >
                  Four packaged pilots. One voice research lane.
                </h1>
                <p className={`${serifText.className} ${styles.lead}`}>
                  These pages are for teams that want a narrow, production-grade
                  starting point, not a vague promise about AI replacing the
                  whole business. Each route has explicit approvals, a clear
                  not-fit line, and a measurable acceptance test.
                </p>
              </div>

              <nav
                className={styles.indexQuickLinks}
                aria-label="Solution shortcuts"
              >
                <p className={`${monoText.className} ${styles.cardEyebrow}`}>
                  Choose by bottleneck
                </p>
                {allSolutions.map((solution, index) => (
                  <Link
                    key={solution.slug}
                    href={getSolutionHref(solution.slug)}
                    className={styles.indexQuickLink}
                  >
                    <span className={monoText.className}>0{index + 1}</span>
                    <strong className={sansText.className}>{solution.name}</strong>
                  </Link>
                ))}
                <p className={`${sansText.className} ${styles.supportLine}`}>
                  Dali scopes one acceptance test before a wider build.
                </p>
              </nav>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="solutions-grid-title">
        <Container wide>
          <div className={styles.panel}>
            <div className={styles.sectionIntro}>
              <p className={`${monoText.className} ${styles.sectionEyebrow}`}>
                Choose the lane
              </p>
              <h2
                id="solutions-grid-title"
                className={`${condensedHeadings.className} ${styles.sectionTitle}`}
              >
                Start where the repetition is already obvious.
              </h2>
              <p className={`${serifText.className} ${styles.sectionLead}`}>
                The best first pilot is the workflow your team already repeats
                often enough to rehearse, approve, and own.
              </p>
            </div>

            <div className={styles.indexGrid}>
              {allSolutions.map((solution) => (
                <article
                  key={solution.slug}
                  className={styles.indexCard}
                  style={getThemeStyle(solution)}
                >
                  <div className={styles.indexCardBody}>
                    <p className={`${monoText.className} ${styles.cardEyebrow}`}>
                      {solution.hero.eyebrow}
                    </p>
                    <h3
                      className={`${condensedHeadings.className} ${styles.cardTitle}`}
                    >
                      {solution.name}
                    </h3>
                    <p className={`${serifText.className} ${styles.indexSummary}`}>
                      {solution.summary}
                    </p>
                    <ul className={`${sansText.className} ${styles.indexList}`}>
                      <li>{solution.pilot.fixedOutcome}</li>
                      <li>{solution.guardrails.items[0]}</li>
                      <li>{solution.fit.fit[0]}</li>
                    </ul>
                  </div>
                  <Link
                    href={getSolutionHref(solution.slug)}
                    className={styles.indexLink}
                  >
                    Open solution page
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export function SolutionLanding({
  solution,
  variant,
  locale = "en",
  labels = englishLabels,
}: {
  solution: SolutionContent;
  variant: SolutionVariant;
  locale?: SolutionPageLocale;
  labels?: SolutionPageLabels;
}) {
  const ctaBody =
    variant === "upwork" ? solution.cta.upworkBody : solution.cta.publicBody;
  const workflow =
    variant === "upwork"
      ? {
          ...solution.workflow,
          intake: getUpworkWorkflowIntake(solution),
        }
      : solution.workflow;
  const integrations =
    variant === "upwork"
      ? {
          ...solution.integrations,
          items: getUpworkIntegrations(solution),
        }
      : solution.integrations;
  return (
    <main
      className={styles.page}
      style={getThemeStyle(solution)}
      lang={htmlLanguages[locale]}
    >
      {variant === "public" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(buildServiceJsonLd(solution, locale)),
          }}
        />
      ) : null}
      <section className={styles.heroSection} aria-labelledby="solution-title">
        <Container wide>
          <div className={styles.shell}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={`${monoText.className} ${styles.eyebrow}`}>
                  {solution.hero.eyebrow}
                </p>
                <h1
                  id="solution-title"
                  className={`${condensedHeadings.className} ${styles.title}`}
                >
                  {solution.hero.title}
                </h1>
                <p className={`${sansText.className} ${styles.lead}`}>
                  {solution.hero.lead}
                </p>
                <div className={styles.ctaRow}>
                  {renderCta(solution, variant, "hero", labels, locale)}
                </div>
                <p className={`${sansText.className} ${styles.supportLine}`}>
                  {solution.hero.supportLine}
                </p>
              </div>

              <PilotProductPreview solution={solution} locale={locale} />
            </div>
          </div>
        </Container>
      </section>

      {variant === "public" ? (
        <section
          className={styles.showcaseSection}
          aria-labelledby={`${solution.slug}-showcase-title`}
        >
          <Container wide>
            <h2
              id={`${solution.slug}-showcase-title`}
              className={styles.visuallyHidden}
            >
              {solution.name} {labels.systemSurfaces}
            </h2>
            {renderProductShowcase(solution, labels)}
          </Container>
        </section>
      ) : null}

      <section className={styles.section} aria-labelledby="contrast-title">
        <Container wide>
          <div className={styles.panel}>
            <div className={styles.sectionIntro}>
              <p className={`${monoText.className} ${styles.sectionEyebrow}`}>
                {labels.painVersusOutcome}
              </p>
              <h2
                id="contrast-title"
                className={`${condensedHeadings.className} ${styles.sectionTitle}`}
              >
                {labels.contrastTitle}
              </h2>
            </div>

            <div className={styles.dualGrid}>
              <article className={styles.contrastCard}>
                <p className={`${monoText.className} ${styles.cardEyebrow}`}>
                  {solution.contrast.painTitle}
                </p>
                <ul className={`${sansText.className} ${styles.bulletList}`}>
                  {solution.contrast.painPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
              <article className={styles.contrastCard}>
                <p className={`${monoText.className} ${styles.cardEyebrow}`}>
                  {solution.contrast.outcomeTitle}
                </p>
                <ul className={`${sansText.className} ${styles.bulletList}`}>
                  {solution.contrast.outcomePoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="boundary-title">
        <Container wide>
          <div className={styles.panel}>
            <div className={styles.sectionIntro}>
              <p className={`${monoText.className} ${styles.sectionEyebrow}`}>
                {labels.pilotBoundary}
              </p>
              <h2
                id="boundary-title"
                className={`${condensedHeadings.className} ${styles.sectionTitle}`}
              >
                {labels.boundaryTitle}
              </h2>
            </div>

            <article className={styles.boundaryCard}>
              <div className={styles.boundaryHeader}>
                <p className={`${monoText.className} ${styles.cardEyebrow}`}>
                  {solution.pilot.label}
                </p>
                <div className={`${serifText.className} ${styles.boundaryOutcome}`}>
                  {solution.pilot.fixedOutcome}
                </div>
              </div>

              <div className={styles.splitGrid}>
                <div>
                  <h3 className={`${monoText.className} ${styles.listTitle}`}>
                    {labels.included}
                  </h3>
                  <ul className={`${sansText.className} ${styles.detailList}`}>
                    {solution.pilot.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className={`${monoText.className} ${styles.listTitle}`}>
                    {labels.excluded}
                  </h3>
                  <ul className={`${sansText.className} ${styles.detailList}`}>
                    {solution.pilot.excludes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="surfaces-title">
        <Container wide>
          <div className={styles.panel}>
            <div className={styles.sectionIntro}>
              <p className={`${monoText.className} ${styles.sectionEyebrow}`}>
                {labels.systemSurfaces}
              </p>
              <h2
                id="surfaces-title"
                className={`${condensedHeadings.className} ${styles.sectionTitle}`}
              >
                {labels.surfacesTitle}
              </h2>
            </div>

            <div className={styles.cardGrid}>
              <article className={styles.surfaceCard}>
                <p className={`${monoText.className} ${styles.surfaceLabel}`}>
                  {integrations.label}
                </p>
                <p className={`${serifText.className} ${styles.sectionLead}`}>
                  {integrations.intro}
                </p>
                <ul className={`${sansText.className} ${styles.detailList}`}>
                  {integrations.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className={styles.surfaceCard}>
                <p className={`${monoText.className} ${styles.surfaceLabel}`}>
                  {solution.guardrails.label}
                </p>
                <p className={`${serifText.className} ${styles.sectionLead}`}>
                  {solution.guardrails.intro}
                </p>
                <ul className={`${sansText.className} ${styles.detailList}`}>
                  {solution.guardrails.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="validation-title">
        <Container wide>
          <div className={styles.panel}>
            <div className={styles.sectionIntro}>
              <p className={`${monoText.className} ${styles.sectionEyebrow}`}>
                {labels.acceptanceTest}
              </p>
              <h2
                id="validation-title"
                className={`${condensedHeadings.className} ${styles.sectionTitle}`}
              >
                {labels.validationTitle}
              </h2>
            </div>

            <div className={styles.dualGrid}>
              <article className={styles.surfaceCard}>
                <p className={`${monoText.className} ${styles.surfaceLabel}`}>
                  {labels.passCondition}
                </p>
                <p className={`${serifText.className} ${styles.sectionLead}`}>
                  {solution.validation.acceptanceTest}
                </p>
                <p className={`${sansText.className} ${styles.commercialModel}`}>
                  {solution.validation.commercialModel}
                </p>
              </article>
              <article className={styles.surfaceCard}>
                <p className={`${monoText.className} ${styles.surfaceLabel}`}>
                  {labels.measures}
                </p>
                <ul className={`${sansText.className} ${styles.detailList}`}>
                  {solution.validation.measures.map((measure) => (
                    <li key={measure}>{measure}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="delivery-title">
        <Container wide>
          <div className={styles.panel}>
            <div className={styles.sectionIntro}>
              <p className={`${monoText.className} ${styles.sectionEyebrow}`}>
                {labels.deliveryEyebrow}
              </p>
              <h2
                id="delivery-title"
                className={`${condensedHeadings.className} ${styles.sectionTitle}`}
              >
                {labels.deliveryTitle}
              </h2>
            </div>

            <div className={styles.threeGrid}>
              {solution.delivery.map((step, index) => (
                <article key={step.title} className={styles.stepCard}>
                  <p className={`${monoText.className} ${styles.stepIndex}`}>
                    {labels.stepPrefix} 0{index + 1}
                  </p>
                  <h3
                    className={`${condensedHeadings.className} ${styles.boxTitle}`}
                  >
                    {step.title}
                  </h3>
                  <p className={`${serifText.className} ${styles.body}`}>
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="fit-title">
        <Container wide>
          <div className={styles.panel}>
            <div className={styles.sectionIntro}>
              <p className={`${monoText.className} ${styles.sectionEyebrow}`}>
                {labels.fitCheck}
              </p>
              <h2
                id="fit-title"
                className={`${condensedHeadings.className} ${styles.sectionTitle}`}
              >
                {labels.fitTitle}
              </h2>
            </div>

            <div className={styles.fitGrid}>
              <article className={styles.fitCard}>
                <h3 className={`${condensedHeadings.className} ${styles.boxTitle}`}>
                  {labels.goodFit}
                </h3>
                <ul className={`${sansText.className} ${styles.fitList}`}>
                  {solution.fit.fit.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className={styles.fitCard}>
                <h3 className={`${condensedHeadings.className} ${styles.boxTitle}`}>
                  {labels.notFit}
                </h3>
                <ul className={`${sansText.className} ${styles.fitList}`}>
                  {solution.fit.notFit.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="faq-title">
        <Container wide>
          <div className={styles.panel}>
            <div className={styles.sectionIntro}>
              <p className={`${monoText.className} ${styles.sectionEyebrow}`}>
                {labels.faq}
              </p>
              <h2
                id="faq-title"
                className={`${condensedHeadings.className} ${styles.sectionTitle}`}
              >
                {labels.faqTitle}
              </h2>
            </div>

            <div className={styles.faqList}>
              {solution.faqs.map((faq) => (
                <details key={faq.question} className={styles.faqItem}>
                  <summary>
                    <span className={`${sansText.className} ${styles.faqQuestion}`}>
                      {faq.question}
                    </span>
                    <span className={styles.faqToggle} aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className={`${serifText.className} ${styles.faqAnswer}`}>
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="cta-title">
        <Container wide>
          <div className={styles.panel}>
            <div className={styles.ctaGrid}>
              <article className={styles.ctaCard}>
                <div className={styles.ctaHeader}>
                  <p className={`${monoText.className} ${styles.cardEyebrow}`}>
                    {labels.ctaEyebrow}
                  </p>
                  <h2
                    id="cta-title"
                    className={`${condensedHeadings.className} ${styles.sectionTitle}`}
                  >
                    {labels.ctaTitle}
                  </h2>
                </div>
                <div
                  id="upwork-reply-checklist"
                  className={`${serifText.className} ${styles.ctaBrief}`}
                >
                  <p className={`${monoText.className} ${styles.surfaceLabel}`}>
                    {variant === "upwork"
                      ? labels.sendUpwork
                      : labels.sendDali}
                  </p>
                  <p className={`${serifText.className} ${styles.replyCopy}`}>
                    {ctaBody}
                  </p>
                </div>
                <ol className={`${sansText.className} ${styles.ctaChecklist}`}>
                  {solution.cta.intakeFields.map((field) => (
                    <li key={field}>{field}</li>
                  ))}
                </ol>
                <div className={styles.ctaRow}>
                  {renderCta(
                    solution,
                    variant,
                    "closing",
                    labels,
                    locale,
                  )}
                </div>
              </article>
              <article className={styles.ctaCard}>
                <p className={`${monoText.className} ${styles.cardEyebrow}`}>
                  {labels.commercialModel}
                </p>
                <p className={`${serifText.className} ${styles.sectionLead}`}>
                  {labels.commercialBody}
                </p>
              </article>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
