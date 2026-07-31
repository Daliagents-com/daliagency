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
        <Navbar />
        {children}
        <Footer />
        {process.env.VERCEL === "1" ? <FunnelAnalytics /> : null}
      </body>
    </html>
  );
}
