import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalizedProjectPage from "@/Components/Projects/LocalizedProjectPage";
import {
  isLocale,
  localizedLocales,
  localizePath,
} from "@/i18n/config";
import {
  isProjectSlug,
  projectCaseCopy,
  projectSlugs,
} from "@/i18n/projects";
import "@/app/project/kora/page.styles.css";
import "@/app/project/muqtad/page.styles.css";
import "@/app/project/deliverysetup/page.styles.css";
import "@/app/project/uimix/page.styles.css";
import "@/app/project/masuro/page.styles.css";
import "@/app/project/agentsge/page.styles.css";
import "@/app/project/tamari/page.styles.css";
import "@/app/project/muqta/page.styles.css";

type LocalizedProjectRouteProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return localizedLocales.flatMap((locale) =>
    projectSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: LocalizedProjectRouteProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale) || locale === "en" || !isProjectSlug(slug)) {
    return {};
  }

  const copy = projectCaseCopy[locale][slug];

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: localizePath(`/project/${slug}`, locale),
      languages: {
        en: `/project/${slug}`,
        ru: `/ru/project/${slug}`,
        ka: `/ge/project/${slug}`,
        hy: `/arm/project/${slug}`,
      },
    },
  };
}

export default async function LocalizedProjectRoute({
  params,
}: LocalizedProjectRouteProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale) || locale === "en" || !isProjectSlug(slug)) {
    notFound();
  }

  return <LocalizedProjectPage locale={locale} slug={slug} />;
}
