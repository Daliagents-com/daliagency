// Purpose: Root layout for localized trees (/ru, /ge, /arm) - server-rendered
// html lang (ru / ka / hy) instead of the old client-side JS bootstrap.
import { notFound } from "next/navigation";
import {
  htmlLanguages,
  isLocale,
  localizedLocales,
} from "@/i18n/config";
import { AppShell, sharedMetadata } from "../shared-layout";

export const metadata = sharedMetadata;

export function generateStaticParams() {
  return localizedLocales.map((locale) => ({ locale }));
}

export default async function LocalizedRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale) || locale === "en") {
    notFound();
  }

  return <AppShell lang={htmlLanguages[locale]}>{children}</AppShell>;
}
