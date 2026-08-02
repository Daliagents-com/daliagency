// Purpose: Shared root shell for both root layouts - (en) and [locale].
// The html lang attribute is now server-rendered per tree (no JS bootstrap),
// so non-JS crawlers and AI bots see the correct language on localized paths.
import Navbar from "@/Components/Navbar/Navbar";
import ConsultationShell from "@/Components/Consultation/ConsultationShell";
import DeferredAnalytics from "@/Components/Analytics/DeferredAnalytics";
import "./globals.css";
import { monoText, onestText, syneText } from "@/assets/fonts";
import Footer from "@/Components/Footer/Footer";
import type { Metadata } from "next";
import { DALI_ORG } from "@/lib/seo/organizationIdentity";

const siteUrl = DALI_ORG.url;
const siteTitle = "Dali - AI Agents & Workflow Automation";
const siteDescription =
  "Production AI agents and workflow automation built inside the business tools your team already uses, from intake and operations to support and internal knowledge work.";

export const sharedMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Dali",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: DALI_ORG.name,
      alternateName: ["Dali Agents", "Dali Agency"],
      url: siteUrl,
      description: siteDescription,
      disambiguatingDescription:
        "Dali (Dali Agents) is an AI agent development agency in Tbilisi, Georgia, founded by David Hakobyan; builds production AI agents and workflow automation for businesses. Not related to the academic DALI multi-agent Prolog framework.",
      logo: `${siteUrl}/dali-logo.svg`,
      founders: [
        {
          "@type": "Person",
          "@id": `${siteUrl}/#david-hakobyan`,
          name: "David Hakobyan",
          jobTitle: "Founder",
          url: `${siteUrl}/about`,
          sameAs: ["https://www.linkedin.com/in/davidhakobyan/"],
        },
        {
          "@type": "Person",
          name: "Liana",
          jobTitle: "Co-founder",
        },
      ],
      knowsAbout: [
        "AI agent systems",
        "workflow automation",
        "production AI agents",
        "GEO and SEO for AI companies",
      ],
      sameAs: [...DALI_ORG.sameAs],
      telephone: DALI_ORG.telephone,
      address: {
        "@type": "PostalAddress",
        addressLocality: DALI_ORG.addressLocality,
        addressCountry: DALI_ORG.addressCountry,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Dali",
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: ["en", "ru", "ka", "hy"],
    },
  ],
};

export function AppShell({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${onestText.className} ${onestText.variable} ${syneText.variable} ${monoText.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <ConsultationShell>
          <Navbar />
          {children}
          <Footer />
          <DeferredAnalytics enableVercelFunnel={process.env.VERCEL === "1"} />
        </ConsultationShell>
      </body>
    </html>
  );
}
