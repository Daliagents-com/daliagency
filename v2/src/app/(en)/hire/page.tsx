// Purpose: BOFU landing - "hire an AI agent agency" commercial intent.
// Honest offer page: process, ownership, pricing model. No invented numbers.
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/Components/Container/Container";
import ConsultationTrigger from "@/Components/Consultation/ConsultationTrigger";
import { onestText, syneText } from "@/assets/fonts";
import { absoluteUrl } from "@/lib/seo/site";
import { DALI_ORG } from "@/lib/seo/organizationIdentity";
import { allSolutions } from "@/Components/Solutions/solutionContent";

const title = "Hire an AI Agent Agency - Dali";
const description =
  "How hiring Dali works: a free workflow audit, one fixed-scope 30-day pilot with a single acceptance test, and a production handoff where you own the code, prompts, and data.";
const pageUrl = absoluteUrl("/hire");
const siteUrl = DALI_ORG.url;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/hire" },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: "Dali",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const hireJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "AI agent development and workflow automation",
      serviceType: "AI agent agency engagement",
      url: pageUrl,
      description,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "Worldwide",
    },
    {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: title,
      inLanguage: "en",
      about: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Hire", item: pageUrl },
      ],
    },
  ],
};

const sectionHeadingClass = `${syneText.className} text-body6 uppercase tracking-[0.14em] text-[var(--muted)]`;
const bodyTextClass = `${onestText.className} text-body5 text-[var(--muted)] md:text-body4`;

const steps = [
  {
    name: "Free workflow audit",
    text: "You describe one workflow in the form. We map the channel, tools, volume, and what must stay human-approved, then send back a scoped plan. No call required, no external booking link.",
  },
  {
    name: "One fixed-scope pilot",
    text: "A 30-day build with a fixed price quoted after the audit and one acceptance test agreed before work starts. If the test does not pass, you do not roll it out.",
  },
  {
    name: "Production and handoff",
    text: "The agent runs in your tools with human approval gates, logging, and a stop-switch. You own the code, prompts, data, and operating IP. Wider rollout is a separate decision, not scope creep.",
  },
];

const fit = [
  "Service businesses with real inbound volume: leads, client inboxes, bookings, intake documents",
  "Teams that want agents inside existing tools (CRM, inbox, spreadsheets) - not a platform migration",
  "Founders with AI-built MVPs that need security and production hardening",
];

const notFit = [
  "Full autonomy with no human review on risky actions",
  "Replacing a whole department in one project",
  "Open-ended retainers without a defined workflow",
];

export default function HirePage() {
  return (
    <main className="min-h-[70vh] bg-[var(--page-bg-color)] pb-64 pt-16 md:pb-80 md:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hireJsonLd) }}
      />
      <Container>
        <div className="mx-auto w-full max-w-[42rem]">
          <header className="mb-32">
            <p className={`${sectionHeadingClass} mb-12`}>Hire Dali</p>
            <h1
              className={`${syneText.className} text-body1 font-medium tracking-tight text-[var(--text)] md:text-title3`}
            >
              Hire an AI agent agency without betting the quarter on it
            </h1>
            <p className={`${bodyTextClass} mt-16`}>
              Dali builds production AI agents inside the tools your team
              already uses. One workflow at a time, one acceptance test, a
              fixed price, and you own everything we ship.
            </p>
          </header>

          <section className="mb-32">
            <h2 className={`${sectionHeadingClass} mb-12`}>
              How the engagement works
            </h2>
            <ol className="flex flex-col gap-16">
              {steps.map((step, index) => (
                <li key={step.name}>
                  <p
                    className={`${syneText.className} text-body5 font-medium uppercase tracking-[0.06em] text-[var(--text)]`}
                  >
                    {String(index + 1).padStart(2, "0")} · {step.name}
                  </p>
                  <p className={`${bodyTextClass} mt-6`}>{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-32">
            <h2 className={`${sectionHeadingClass} mb-12`}>Pricing model</h2>
            <p className={bodyTextClass}>
              Every pilot is fixed-scope and fixed-price, quoted after the free
              audit - the audit defines the boundary, so the quote does not
              move later. Current package anchors:
            </p>
            <ul className="mt-12 flex flex-col gap-8">
              {allSolutions.map((solution) => (
                <li key={solution.slug} className={bodyTextClass}>
                  / {solution.name} - from {solution.pricing.from}
                </li>
              ))}
            </ul>
            <p className={`${bodyTextClass} mt-12`}>
              For typical market ranges and what drives them, see{" "}
              <Link
                href="/blog/ai-agent-agency-pricing-what-to-expect"
                className="underline underline-offset-4"
              >
                AI agent agency pricing: what to expect
              </Link>
              .
            </p>
          </section>

          <section className="mb-32">
            <h2 className={`${sectionHeadingClass} mb-12`}>Good fit</h2>
            <ul className="flex flex-col gap-8">
              {fit.map((item) => (
                <li key={item} className={bodyTextClass}>
                  / {item}
                </li>
              ))}
            </ul>
            <h2 className={`${sectionHeadingClass} mb-12 mt-24`}>
              Not a fit
            </h2>
            <ul className="flex flex-col gap-8">
              {notFit.map((item) => (
                <li key={item} className={bodyTextClass}>
                  / {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="border border-black/10 bg-white/50 px-20 py-24 md:px-28">
            <h2
              className={`${syneText.className} text-body4 font-medium uppercase tracking-[0.08em]`}
            >
              Start with the free audit
            </h2>
            <p className={`${bodyTextClass} mt-12`}>
              Describe one workflow. We reply within one business day with next
              steps - or an honest &quot;agents are not the right tool here&quot;.
            </p>
            <div className="mt-20 flex flex-wrap gap-12">
              <ConsultationTrigger
                source="hire-page-consultation"
                className={`${syneText.className} inline-flex cursor-pointer items-center justify-center border border-black/10 bg-primary px-16 py-10 text-body6 uppercase text-white transition-colors hover:bg-primary-700`}
              >
                Start a free audit
              </ConsultationTrigger>
              <Link
                href="/solutions"
                className={`${syneText.className} inline-flex items-center justify-center border border-black/15 px-16 py-10 text-body6 uppercase transition-opacity hover:opacity-70`}
              >
                Browse solutions
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
