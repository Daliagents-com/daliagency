import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionLanding } from "@/Components/Solutions/SolutionPages";
import {
  buildLocalizedPublicMetadata,
  solutionSlugs,
  type SolutionSlug,
} from "@/Components/Solutions/solutionContent";
import { solutionsBundles } from "@/Components/Solutions/locales";
import {
  isLocale,
  localizedLocales,
} from "@/i18n/config";

type LocalizedSolutionProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

function isSolutionSlug(slug: string): slug is SolutionSlug {
  return solutionSlugs.includes(slug as SolutionSlug);
}

export function generateStaticParams() {
  return localizedLocales.flatMap((locale) =>
    solutionSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: LocalizedSolutionProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale) || locale === "en" || !isSolutionSlug(slug)) {
    return {};
  }

  return buildLocalizedPublicMetadata(
    solutionsBundles[locale].details[slug],
    locale,
  );
}

export default async function LocalizedSolutionPage({
  params,
}: LocalizedSolutionProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale) || locale === "en" || !isSolutionSlug(slug)) {
    notFound();
  }

  const bundle = solutionsBundles[locale];

  return (
    <SolutionLanding
      solution={bundle.details[slug]}
      variant="public"
      locale={locale}
      labels={bundle.labels}
    />
  );
}
