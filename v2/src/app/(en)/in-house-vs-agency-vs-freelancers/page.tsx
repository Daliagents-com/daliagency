// Purpose: BOFU comparison landing - in-house vs agency vs freelancers for AI agents.
// Decision-stage page: honest table, when each option wins, hybrid path.
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/Components/Container/Container";
import ConsultationTrigger from "@/Components/Consultation/ConsultationTrigger";
import { onestText, syneText } from "@/assets/fonts";
import { absoluteUrl } from "@/lib/seo/site";
import { DALI_ORG } from "@/lib/seo/organizationIdentity";

const title = "In-House vs Agency vs Freelancers for AI Agents - Dali";
const description =
  "An honest comparison for buying AI agent work in 2026: time to a working agent, cost shape, ownership, maintenance, and risk - and when each option is the right call.";
const pageUrl = absoluteUrl("/in-house-vs-agency-vs-freelancers");
const siteUrl = DALI_ORG.url;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/in-house-vs-agency-vs-freelancers" },
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

const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: title,
      description,
      inLanguage: "en",
      about: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "In-house vs agency vs freelancers",
          item: pageUrl,
        },
      ],
    },
  ],
};

const sectionHeadingClass = `${syneText.className} text-body6 uppercase tracking-[0.14em] text-[var(--muted)]`;
const bodyTextClass = `${onestText.className} text-body5 text-[var(--muted)] md:text-body4`;

const rows = [
  {
    dimension: "Time to first working agent",
    inHouse: "Months: hiring or re-tasking, then learning production patterns",
    agency: "Weeks: scoped pilot with an acceptance test",
    freelancer: "Days to weeks, depends on the individual",
  },
  {
    dimension: "Cost shape",
    inHouse: "Salaries and ramp-up: highest fixed cost, best long-run unit cost at scale",
    agency: "Fixed price per scoped outcome",
    freelancer: "Lowest entry price, highest variance",
  },
  {
    dimension: "Ownership and handoff",
    inHouse: "Everything stays in-house by definition",
    agency: "Depends on the contract - demand code, prompts, and data ownership",
    freelancer: "Often undocumented; bus factor of one",
  },
  {
    dimension: "Maintenance after launch",
    inHouse: "Your team, if it still exists next quarter",
    agency: "Defined handoff plus optional support scope",
    freelancer: "Weakest link - availability is not guaranteed",
  },
  {
    dimension: "LLM and API costs",
    inHouse: "You watch and optimize them yourself from day one",
    agency: "Should be projected in the quote and handed off transparently - ask",
    freelancer: "Often on the freelancer's keys during the build, surprise at handoff",
  },
  {
    dimension: "Evals, monitoring, on-call",
    inHouse: "Yours to build - usually the part teams underestimate most",
    agency: "Acceptance test plus logging and a stop-switch should be in scope",
    freelancer: "Rarely included; agent quality drifts silently after launch",
  },
  {
    dimension: "Main risk",
    inHouse: "Paying senior salaries while the team learns agent failure modes",
    agency: "Vendor lock-in if ownership is not contractual",
    freelancer: "Unsupervised automation touching real customers",
  },
];

export default function ComparisonPage() {
  return (
    <main className="min-h-[70vh] bg-[var(--page-bg-color)] pb-64 pt-16 md:pb-80 md:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <Container>
        <div className="mx-auto w-full max-w-[48rem]">
          <header className="mb-32">
            <p className={`${sectionHeadingClass} mb-12`}>Decision guide</p>
            <h1
              className={`${syneText.className} text-body1 font-medium tracking-tight text-[var(--text)] md:text-title3`}
            >
              In-house vs agency vs freelancers for AI agents
            </h1>
            <p className={`${bodyTextClass} mt-16`}>
              Direct answer: hire in-house when agents are your core product,
              use an agency when you need a production result on a fixed
              budget without hiring, and use freelancers for low-risk internal
              experiments you can afford to rebuild.
            </p>
          </header>

          <section className="mb-32 overflow-x-auto">
            <table className={`${onestText.className} w-full min-w-[40rem] border-collapse text-body6 md:text-body5`}>
              <thead>
                <tr className="border-b border-black/20 text-left uppercase tracking-[0.06em]">
                  <th className="py-10 pr-12 font-medium"> </th>
                  <th className="py-10 pr-12 font-medium">In-house</th>
                  <th className="py-10 pr-12 font-medium">Agency</th>
                  <th className="py-10 font-medium">Freelancers</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.dimension} className="border-b border-black/10 align-top">
                    <td className={`py-12 pr-12 font-medium text-[var(--text)]`}>
                      {row.dimension}
                    </td>
                    <td className="py-12 pr-12 text-[var(--muted)]">{row.inHouse}</td>
                    <td className="py-12 pr-12 text-[var(--muted)]">{row.agency}</td>
                    <td className="py-12 text-[var(--muted)]">{row.freelancer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="mb-32">
            <h2 className={`${sectionHeadingClass} mb-12`}>The hybrid path most teams end up on</h2>
            <p className={bodyTextClass}>
              Start with an agency pilot that has a fixed scope and an
              acceptance test, demand ownership of code, prompts, and data in
              the contract, then hand the running system to one internal owner.
              You get production speed now and independence later. The deeper
              breakdowns live in{" "}
              <Link
                href="/blog/ai-agent-agency-vs-in-house"
                className="underline underline-offset-4"
              >
                agency vs in-house
              </Link>{" "}
              and{" "}
              <Link
                href="/blog/ai-agent-agency-vs-freelancers"
                className="underline underline-offset-4"
              >
                agency vs freelancers
              </Link>
              .
            </p>
          </section>

          <section className="border border-black/10 bg-white/50 px-20 py-24 md:px-28">
            <h2
              className={`${syneText.className} text-body4 font-medium uppercase tracking-[0.08em]`}
            >
              Want the agency answer for your workflow?
            </h2>
            <p className={`${bodyTextClass} mt-12`}>
              Describe one workflow - we reply within one business day with a
              scoped plan, or tell you honestly that you do not need an agency.
            </p>
            <div className="mt-20 flex flex-wrap gap-12">
              <ConsultationTrigger
                source="comparison-page-consultation"
                className={`${syneText.className} inline-flex cursor-pointer items-center justify-center border border-black/10 bg-primary px-16 py-10 text-body6 uppercase text-white transition-colors hover:bg-primary-700`}
              >
                Start a free audit
              </ConsultationTrigger>
              <Link
                href="/hire"
                className={`${syneText.className} inline-flex items-center justify-center border border-black/15 px-16 py-10 text-body6 uppercase transition-opacity hover:opacity-70`}
              >
                How hiring Dali works
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
