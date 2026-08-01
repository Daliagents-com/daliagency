// Purpose: Localized /[locale]/solutions = full Dali multi-agent case page.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DaliCasePage from "@/Components/Solutions/DaliCase/DaliCasePage";
import {
  socialPreviewImage,
  twitterPreviewImage,
} from "@/Components/Solutions/solutionContent";
import { solutionsBundles } from "@/Components/Solutions/locales";
import {
  isLocale,
  localizedLocales,
  localizePath,
} from "@/i18n/config";

type LocalizedSolutionsProps = {
  params: Promise<{
    locale: string;
  }>;
};

const languageAlternates = {
  en: "/solutions",
  ru: "/ru/solutions",
  ka: "/ge/solutions",
  hy: "/arm/solutions",
};

export function generateStaticParams() {
  return localizedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalizedSolutionsProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale) || locale === "en") {
    return {};
  }

  const copy = solutionsBundles[locale].overview.metadata;
  const pathname = localizePath("/solutions", locale);
  const title = `${copy.title} · Dali agent system`;

  return {
    title,
    description: copy.description,
    alternates: {
      canonical: pathname,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description: copy.description,
      url: `https://daliagents.com${pathname}`,
      siteName: "Dali",
      type: "website",
      images: [socialPreviewImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: copy.description,
      images: [twitterPreviewImage],
    },
  };
}

export default async function LocalizedSolutionsPage({
  params,
}: LocalizedSolutionsProps) {
  const { locale } = await params;

  if (!isLocale(locale) || locale === "en") {
    notFound();
  }

  return <DaliCasePage bundle={solutionsBundles[locale]} locale={locale} />;
}
