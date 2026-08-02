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
import { absoluteUrl } from "@/lib/seo/site";
import "@/app/(en)/project/kora/page.styles.css";
import "@/app/(en)/project/muqtad/page.styles.css";
import "@/app/(en)/project/deliverysetup/page.styles.css";
import "@/app/(en)/project/uimix/page.styles.css";
import "@/app/(en)/project/masuro/page.styles.css";
import "@/app/(en)/project/agentsge/page.styles.css";
import "@/app/(en)/project/tamari/page.styles.css";
import "@/app/(en)/project/muqta/page.styles.css";

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
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: absoluteUrl(localizePath(`/project/${slug}`, locale)),
      siteName: "Dali",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
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
