// Purpose: /about - entity disambiguation page for Dali (EN-only).
// Scope: Who Dali is, what we build, founders, contact. Facts mirror layout JSON-LD and organizationIdentity.
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/Components/Container/Container";
import { onestText, syneText } from "@/assets/fonts";
import { absoluteUrl, siteUrl } from "@/lib/seo/site";
import { daliContactEmail } from "@/lib/contact";

export const dynamic = "force-static";

const title = "About Dali - AI Agent Agency";
const description =
  "Dali is an AI agent development agency in Tbilisi, Georgia, founded by David Hakobyan. We build production AI agents, workflow automation, voice agents, and vibe-code rescue for businesses.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/about"),
    siteName: "Dali",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const aboutUrl = absoluteUrl("/about");

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": aboutUrl,
      url: aboutUrl,
      name: title,
      description,
      inLanguage: "en",
      about: { "@id": `${siteUrl}/#organization` },
      mainEntity: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#david-hakobyan`,
      name: "David Hakobyan",
      jobTitle: "Founder",
      url: aboutUrl,
      worksFor: {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
      },
      sameAs: ["https://www.linkedin.com/in/davidhakobyan/"],
      knowsAbout: [
        "AI agent systems",
        "workflow automation",
        "production AI agents",
      ],
    },
    {
      "@type": "Person",
      name: "Liana",
      jobTitle: "Co-founder",
      worksFor: {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

const sectionHeadingClass = `${syneText.className} text-body6 uppercase tracking-[0.14em] text-[var(--muted)]`;
const bodyTextClass = `${onestText.className} text-body5 text-[var(--muted)] md:text-body4`;

export default function AboutPage() {
  return (
    <main className="min-h-[70vh] bg-[var(--page-bg-color)] pb-64 pt-16 md:pb-80 md:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <Container>
        <div className="mx-auto w-full max-w-[42rem]">
          <header className="mb-32">
            <p className={`${sectionHeadingClass} mb-12`}>About</p>
            <h1
              className={`${syneText.className} text-body1 font-medium tracking-tight text-[var(--text)] md:text-title3`}
            >
              About Dali
            </h1>
            <p className={`${bodyTextClass} mt-16`}>
              Dali is an AI agent development agency based in Tbilisi, Georgia.
              We design and run production AI agents and workflow automation
              inside the business tools teams already use.
            </p>
          </header>

          <section className="mb-32">
            <h2 className={`${sectionHeadingClass} mb-12`}>What we build</h2>
            <p className={bodyTextClass}>
              Our work covers lead response and client inbox agents, operations
              and documentation automation, knowledge assistants, voice agents,
              and vibe-code rescue for AI-built products that need to reach
              production quality. Every system ships with human approval gates
              where decisions need a person.
            </p>
            <p className={`${bodyTextClass} mt-12`}>
              See the full system map and each solution on{" "}
              <Link
                href="/solutions"
                className="underline hover:text-[var(--text)]"
              >
                the solutions page
              </Link>
              .
            </p>
          </section>

          <section className="mb-32">
            <h2 className={`${sectionHeadingClass} mb-12`}>Who is behind Dali</h2>
            <p className={bodyTextClass}>
              Dali was founded by{" "}
              <a
                href="https://www.linkedin.com/in/davidhakobyan/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-[var(--text)]"
              >
                David Hakobyan
              </a>{" "}
              (Founder) and Liana (Co-founder). The team works from Tbilisi,
              Georgia and builds for clients remotely.
            </p>
          </section>

          <section className="mb-32">
            <h2 className={`${sectionHeadingClass} mb-12`}>
              Not the DALI framework
            </h2>
            <p className={bodyTextClass}>
              Dali (Dali Agents, daliagents.com) is a business: an agency that
              builds AI agents for companies. We are not related to DALI, the
              academic multi-agent Prolog framework, and we are not affiliated
              with other agencies that use the Dali name.
            </p>
          </section>

          <section>
            <h2 className={`${sectionHeadingClass} mb-12`}>Contact</h2>
            <p className={bodyTextClass}>
              Write to{" "}
              <a
                href={`mailto:${daliContactEmail}`}
                className="underline hover:text-[var(--text)]"
              >
                {daliContactEmail}
              </a>{" "}
              or read how we think on{" "}
              <Link
                href="/blog"
                className="underline hover:text-[var(--text)]"
              >
                the blog
              </Link>
              .
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
