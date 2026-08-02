// Purpose: Standalone Agent Starter landing - one agent, one outcome, $199/mo.
// Scope: Shared server renderer for /starter across all four locales.
// Deliberately decoupled from Components/Solutions - copy lives in i18n/starter.
import Container from "@/Components/Container/Container";
import ConsultationTrigger from "@/Components/Consultation/ConsultationTrigger";
import { htmlLanguages, localizePath, type Locale } from "@/i18n/config";
import { starterCopy } from "@/i18n/starter";
import { siteUrl } from "@/lib/seo/site";
import styles from "./StarterPage.module.css";

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function buildStarterJsonLd(locale: Locale) {
  const copy = starterCopy[locale];

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agent Starter",
    description: copy.metaDescription,
    serviceType: "AI agent setup and operation",
    url: `${siteUrl}${localizePath("/starter", locale)}`,
    provider: {
      "@type": "Organization",
      name: "Dali",
      url: siteUrl,
    },
    areaServed: "Worldwide",
    inLanguage: htmlLanguages[locale],
    offers: {
      "@type": "Offer",
      price: "199",
      priceCurrency: "USD",
      description: copy.includedMonthly,
    },
  };
}

export default function StarterPage({ locale = "en" }: { locale?: Locale }) {
  const copy = starterCopy[locale];

  return (
    <main className={styles.page} lang={htmlLanguages[locale]}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildStarterJsonLd(locale)),
        }}
      />
      <Container>
        <section className={styles.heroSection}>
          <p className={styles.eyebrow}>{copy.heroEyebrow}</p>
          <h1 className={styles.title}>{copy.heroTitle}</h1>
          <p className={styles.lead}>{copy.heroLead}</p>
          <div className={styles.ctaRow}>
            <ConsultationTrigger
              source="starter-hero"
              interest="not-sure"
              className={styles.primaryCta}
            >
              {copy.heroCta}
            </ConsultationTrigger>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="starter-skus">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>{copy.skusEyebrow}</p>
            <h2 id="starter-skus" className={styles.sectionTitle}>
              {copy.skusTitle}
            </h2>
          </div>
          <div className={styles.cardGrid}>
            {copy.skus.map((sku, index) => (
              <article key={sku.name} className={styles.card}>
                <p className={styles.cardEyebrow}>
                  {copy.skuIndexPrefix} 0{index + 1}
                </p>
                <h3 className={styles.cardTitle}>{sku.name}</h3>
                <p className={styles.cardSummary}>{sku.summary}</p>
                <ul className={styles.bulletList}>
                  {sku.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className={styles.includedBlock}>
                  <p className={styles.listLabel}>{copy.includedTitle}</p>
                  <ul className={styles.bulletList}>
                    <li>{copy.includedSetup}</li>
                    <li>{copy.includedMonthly}</li>
                  </ul>
                </div>
                <div className={styles.acceptanceBlock}>
                  <p className={styles.listLabel}>{copy.acceptanceTitle}</p>
                  <p className={styles.acceptanceBody}>{sku.acceptanceTest}</p>
                </div>
                <p className={styles.approvalGate}>{copy.approvalGate}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="starter-terms">
          <div className={styles.termsStrip}>
            <p className={styles.eyebrow}>{copy.termsEyebrow}</p>
            <h2 id="starter-terms" className={styles.sectionTitle}>
              {copy.termsTitle}
            </h2>
            <ul className={styles.termsList}>
              {copy.terms.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ul>
            <p className={styles.guaranteeLine}>{copy.guarantee}</p>
          </div>
        </section>

        <section className={styles.closingSection}>
          <div className={styles.ctaCard}>
            <p className={styles.eyebrow}>{copy.ctaEyebrow}</p>
            <h2 className={styles.sectionTitle}>{copy.ctaTitle}</h2>
            <p className={styles.sectionLead}>{copy.ctaLead}</p>
            <div className={styles.ctaRow}>
              <ConsultationTrigger
                source="starter-closing"
                interest="not-sure"
                className={styles.primaryCta}
              >
                {copy.ctaButton}
              </ConsultationTrigger>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
