import Navbar from "@/Components/Navbar/Navbar";
import "./globals.css";
import { monoText, onestText, syneText } from "@/assets/fonts";
import Footer from "@/Components/Footer/Footer";
import FunnelAnalytics from "@/Components/Analytics/FunnelAnalytics";
import type { Metadata } from "next";
import { headers } from "next/headers";

const siteUrl = "https://dali.agents.ge";
const siteTitle = "Dali - AI Agents & Workflow Automation";
const siteDescription =
  "Production AI agents and workflow automation built inside the business tools your team already uses, from intake and operations to support and internal knowledge work.";

export const metadata: Metadata = {
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
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Dali",
      alternateName: ["Dali Agents", "Dali Agency"],
      url: siteUrl,
      description: siteDescription,
      logo: `${siteUrl}/dali-logo.svg`,
      founders: [
        {
          "@type": "Person",
          name: "David Hakobyan",
          jobTitle: "Founder",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = await headers();
  const language = requestHeaders.get("x-dali-language") ?? "en";

  return (
    <html lang={language}>
      <body
        className={`${onestText.className} ${onestText.variable} ${syneText.variable} ${monoText.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <Navbar />
        {children}
        <Footer />
        {process.env.VERCEL === "1" ? <FunnelAnalytics /> : null}
      </body>
    </html>
  );
}
