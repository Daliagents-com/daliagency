// Purpose: Home "argument" strips - written acceptance, build-vs-hire
// alternatives, and the pricing ladder line.
// Scope: Server-rendered, copy lives in i18n/home.ts. Editorial brief,
// no dashboard chrome. Visual language matches About / SolutionPages.
import Link from "next/link";
import Container from "@/Components/Container/Container";
import { onestText, syneText } from "@/assets/fonts";
import { homeCopy } from "@/i18n/home";
import { localizePath, type Locale } from "@/i18n/config";
import styles from "./Argument.module.css";

type SectionProps = { locale?: Locale };

/** Written acceptance: claim, then the three exhibits and the invoice fork. */
export function AcceptanceProtocol({ locale = "en" }: SectionProps) {
  const copy = homeCopy[locale].manifesto;
  const path = homeCopy[locale].deliveryPath;

  return (
    <section
      className={styles.manifesto}
      aria-labelledby="acceptance-protocol-title"
    >
      <Container wide>
        <div className={styles.inner}>
          <header className={styles.intro}>
            <p className={`section-label ${styles.kicker}`}>{copy.label}</p>
            <h2
              id="acceptance-protocol-title"
              className={`${syneText.className} ${styles.heading}`}
            >
              {copy.heading}
            </h2>
            <p className={`${onestText.className} ${styles.lede}`}>{copy.body}</p>
          </header>

          <div className={styles.stepsBlock}>
            <h3 className={`section-label ${styles.blockLabel}`}>{path.label}</h3>
            <ol className={`${onestText.className} ${styles.steps}`}>
              {path.steps.map((step, index) => (
                <li key={step.day} className={styles.step}>
                  <article
                    className={styles.exhibit}
                    aria-labelledby={`acceptance-step-${index}`}
                  >
                    <p className={styles.stamp}>{step.stamp}</p>
                    <ul className={styles.lines}>
                      {step.lines.map((line) => (
                        <li key={line.item}>
                          <span>{line.item}</span>
                          <b>{line.state}</b>
                        </li>
                      ))}
                    </ul>
                  </article>
                  <div className={styles.stepCopy}>
                    <strong id={`acceptance-step-${index}`}>{step.day}</strong>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={`${onestText.className} ${styles.decision}`}>
            <h3 className={styles.decisionPrompt}>{copy.decision}</h3>
            <div className={styles.fork}>
              <article className={styles.invoicePass}>
                <p className={styles.invoiceKind}>{copy.invoiceLabel}</p>
                <p className={styles.invoiceVerdict}>{copy.passLabel}</p>
                <p className={styles.invoiceBody}>{copy.passBody}</p>
                <p className={styles.invoiceDue}>
                  <span>{copy.dueLabel}</span>
                  <strong>{copy.dueOpen}</strong>
                </p>
              </article>
              <article className={styles.invoiceFail}>
                <p className={styles.invoiceKind}>{copy.invoiceLabel}</p>
                <p className={styles.invoiceVerdict}>{copy.failLabel}</p>
                <p className={styles.invoiceBody}>{copy.failBody}</p>
                <p className={styles.invoiceDue}>
                  <span>{copy.dueLabel}</span>
                  <strong>{copy.dueClosed}</strong>
                </p>
              </article>
            </div>
          </div>

          <div className={styles.measures}>
            <div className={styles.sheet}>
              <div className={styles.measuresHeader}>
                <h3 className={`section-label ${styles.blockLabel}`}>
                  {copy.checksLabel}
                </h3>
                <p className={`${onestText.className} ${styles.measuresNote}`}>
                  {copy.checksNote}
                </p>
              </div>
              <table className={`${onestText.className} ${styles.table}`}>
                <thead>
                  <tr>
                    <th scope="col">{copy.columns.criterion}</th>
                    <th scope="col">{copy.columns.condition}</th>
                    <th scope="col">{copy.columns.evidence}</th>
                  </tr>
                </thead>
                <tbody>
                  {copy.checks.map((check) => (
                    <tr key={check.criterion}>
                      <th scope="row">{check.criterion}</th>
                      <td data-label={copy.columns.condition}>{check.condition}</td>
                      <td data-label={copy.columns.evidence}>
                        <span className={styles.evidence}>{check.evidence}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className={`${onestText.className} ${styles.rule}`}>
            <span>{copy.statusLabel}</span>
            <strong>{copy.status}</strong>
          </p>
        </div>
      </Container>
    </section>
  );
}

/** Three ways into production; the Dali column carries the accent border. */
export function Alternatives({ locale = "en" }: SectionProps) {
  const copy = homeCopy[locale].alternatives;

  return (
    <section
      className={styles.alternatives}
      aria-labelledby="alternatives-title"
    >
      <Container wide>
        <h2
          id="alternatives-title"
          className={`${onestText.className} ${styles.alternativesTitle}`}
        >
          {copy.heading}
        </h2>
        <div className={styles.alternativesGrid}>
          {copy.options.map((option) => (
            <article
              key={option.title}
              className={`${styles.alternativeCard}${
                option.ours ? ` ${styles.alternativeOurs}` : ""
              }`}
            >
              <h3
                className={`${onestText.className} ${styles.alternativeName} text-body4 md:text-body3`}
              >
                {option.title}
              </h3>
              <p
                className={`${onestText.className} ${styles.alternativeBody} text-body5 md:text-body4`}
              >
                {option.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** One-line pricing ladder with locale-prefixed links into each package. */
export function PricingLadder({ locale = "en" }: SectionProps) {
  const copy = homeCopy[locale].pricing;

  return (
    <aside className={styles.pricing} aria-label={copy.label}>
      <Container wide>
        <p className={`${onestText.className} ${styles.pricingLine} text-body5 md:text-body4`}>
          {copy.parts.map((part, index) =>
            part.href ? (
              <Link
                key={`${part.href}-${index}`}
                href={localizePath(part.href, locale)}
                className={styles.pricingLink}
              >
                {part.text}
              </Link>
            ) : (
              <span key={`text-${index}`}>{part.text}</span>
            ),
          )}
        </p>
      </Container>
    </aside>
  );
}
