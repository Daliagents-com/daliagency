// Purpose: /{ru|ge|arm}/starter - localized Agent Starter landing.
// Scope: Route entrypoint and metadata; rendering lives in Components/Starter.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StarterPage from "@/Components/Starter/StarterPage";
import { isLocale, localizedLocales } from "@/i18n/config";
import { starterCopy } from "@/i18n/starter";
import { absoluteUrl } from "@/lib/seo/site";

type LocalizedStarterProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return localizedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalizedStarterProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale) || locale === "en") {
    return {};
  }

  const copy = starterCopy[locale];

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: `/${locale}/starter`,
      languages: {
        en: "/starter",
        ru: "/ru/starter",
        ka: "/ge/starter",
        hy: "/arm/starter",
      },
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: absoluteUrl(`/${locale}/starter`),
      siteName: "Dali",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metaTitle,
      description: copy.metaDescription,
    },
  };
}

export default async function LocalizedStarter({
  params,
}: LocalizedStarterProps) {
  const { locale } = await params;

  if (!isLocale(locale) || locale === "en") {
    notFound();
  }

  return <StarterPage locale={locale} />;
}
