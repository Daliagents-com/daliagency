import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DesignSprints from "@/app/(en)/design-sprints/page";
import {
  isLocale,
  localizedLocales,
} from "@/i18n/config";
import { designSprintsCopy } from "@/i18n/designSprints";

type LocalizedDesignSprintsProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return localizedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalizedDesignSprintsProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale) || locale === "en") {
    return {};
  }

  const copy = designSprintsCopy[locale];

  return {
    title: `${copy.introTitle} | Dali`,
    description: copy.introBody,
    alternates: {
      canonical: `/${locale}/design-sprints`,
      languages: {
        en: "/design-sprints",
        ru: "/ru/design-sprints",
        ka: "/ge/design-sprints",
        hy: "/arm/design-sprints",
      },
    },
  };
}

export default async function LocalizedDesignSprints({
  params,
}: LocalizedDesignSprintsProps) {
  const { locale } = await params;

  if (!isLocale(locale) || locale === "en") {
    notFound();
  }

  return <DesignSprints locale={locale} />;
}
