// Purpose: Standalone Agent Care retainer landing - agents kept working, from $390/mo.
// Scope: Shared server renderer for /care across all four locales.
// Deliberately decoupled from Components/Solutions - copy lives in i18n/care.
import Container from "@/Components/Container/Container";
import ConsultationTrigger from "@/Components/Consultation/ConsultationTrigger";
import { htmlLanguages, localizePath, type Locale } from "@/i18n/config";
import { careCopy } from "@/i18n/care";
import { siteUrl } from "@/lib/seo/site";
import styles from "./CarePage.module.css";

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function buildCareJsonLd(locale: Locale) {
  const copy = careCopy[locale];

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agent Care",
    description: copy.metaDescription,
    serviceType: "AI agent monitoring and maintenance retainer",
    url: `${siteUrl}${localizePath("/care", locale)}`,
    provider: {
      "@type": "Organization",
      name: "Dali",
      url: siteUrl,
    },
    areaServed: "Worldwide",
    inLanguage: htmlLanguages[locale],
    offers: copy.tiers.map((tier, index) => ({
      "@type": "Offer",
      name: tier.name,
      price: ["390", "790", "1490"][index],
      priceCurrency: "USD",
      description: tier.summary,
    })),
  };
}

export default function CarePage({ locale = "en" }: { locale?: Locale }) {
  const copy = careCopy[locale];

  return (
    <main className={styles.page} lang={htmlLanguages[locale]}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildCareJsonLd(locale)),
        }}
      />
      <Container>
        <section className={styles.heroSection}>
          <p className={styles.eyebrow}>{copy.heroEyebrow}</p>
          <h1 className={styles.title}>{copy.heroTitle}</h1>
          <p className={styles.lead}>{copy.heroLead}</p>
          <div className={styles.ctaRow}>
            <ConsultationTrigger
              source="care-hero"
              interest="not-sure"
              className={styles.primaryCta}
            >
              {copy.heroCta}
            </ConsultationTrigger>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="care-tiers">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>{copy.tiersEyebrow}</p>
            <h2 id="care-tiers" className={styles.sectionTitle}>
              {copy.tiersTitle}
            </h2>
          </div>
          <div className={styles.cardGrid}>
            {copy.tiers.map((tier, index) => (
              <article key={tier.name} className={styles.card}>
                <p className={styles.cardEyebrow}>
                  {copy.tierIndexPrefix} 0{index + 1}
                </p>
                <h3 className={styles.cardTitle}>{tier.name}</h3>
                <p className={styles.priceLine}>{tier.price}</p>
                <p className={styles.cardSummary}>{tier.summary}</p>
                {tier.includesNote ? (
                  <p className={styles.includesNote}>{tier.includesNote}</p>
                ) : null}
                <ul className={styles.bulletList}>
                  {tier.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="care-coverage">
          <div className={styles.coverageStrip}>
            <p className={styles.eyebrow}>{copy.worksEyebrow}</p>
            <h2 id="care-coverage" className={styles.sectionTitle}>
              {copy.worksTitle}
            </h2>
            <ul className={styles.coverageList}>
              {copy.worksItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.coverageNote}>{copy.worksNote}</p>
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
                source="care-closing"
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
