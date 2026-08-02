// Purpose: /{ru|ge|arm}/care - localized Agent Care retainer landing.
// Scope: Route entrypoint and metadata; rendering lives in Components/Care.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CarePage from "@/Components/Care/CarePage";
import { isLocale, localizedLocales } from "@/i18n/config";
import { careCopy } from "@/i18n/care";
import { absoluteUrl } from "@/lib/seo/site";

type LocalizedCareProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return localizedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalizedCareProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale) || locale === "en") {
    return {};
  }

  const copy = careCopy[locale];

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: `/${locale}/care`,
      languages: {
        en: "/care",
        ru: "/ru/care",
        ka: "/ge/care",
        hy: "/arm/care",
      },
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: absoluteUrl(`/${locale}/care`),
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

export default async function LocalizedCare({ params }: LocalizedCareProps) {
  const { locale } = await params;

  if (!isLocale(locale) || locale === "en") {
    notFound();
  }

  return <CarePage locale={locale} />;
}
