import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Hero from "@/Components/Home/Hero";
import About from "@/Components/Home/About";
import {
  isLocale,
  localizedLocales,
  type Locale,
} from "@/i18n/config";

// Below-the-fold home sections: keep SSR HTML, split client graphs off hero path.
const Projects = dynamic(() => import("@/Components/Home/Projects"), {
  ssr: true,
});
const AgentSolutions = dynamic(
  () => import("@/Components/Home/AgentSolutions"),
  { ssr: true },
);
const DesignSprints = dynamic(
  () => import("@/Components/Home/DesignSprints"),
  { ssr: true },
);

type LocalizedHomeProps = {
  params: Promise<{
    locale: string;
  }>;
};

const localizedMetadata: Record<
  Exclude<Locale, "en">,
  { title: string; description: string }
> = {
  ru: {
    title: "Dali - агентские ИИ-системы и agent-first продукты",
    description:
      "Dali проектирует кастомные агентские ИИ-системы, agent-first продукты, программы внедрения ИИ и системы AI-видимости вокруг реальных бизнес-процессов.",
  },
  ge: {
    title: "Dali Agency - ციფრული პროდუქტები და AI ავტომატიზაცია",
    description:
      "ვქმნით ვებსაიტებს, აპებს, AI აგენტებს და ბიზნესის ავტომატიზაციას.",
  },
  arm: {
    title: "Dali Agency - թվային արտադրանք և AI ավտոմատացում",
    description:
      "Ստեղծում ենք կայքեր, հավելվածներ, AI գործակալներ և բիզնեսի ավտոմատացում։",
  },
};

export function generateStaticParams() {
  return localizedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalizedHomeProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale) || locale === "en") {
    return {};
  }

  const metadata = localizedMetadata[locale];

  return {
    ...metadata,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/",
        ru: "/ru",
        ka: "/ge",
        hy: "/arm",
      },
    },
  };
}

export default async function LocalizedHome({ params }: LocalizedHomeProps) {
  const { locale } = await params;

  if (!isLocale(locale) || locale === "en") {
    notFound();
  }

  return (
    <main>
      <Hero locale={locale} />
      <Projects locale={locale} />
      <AgentSolutions locale={locale} />
      <DesignSprints locale={locale} />
      <About locale={locale} />
    </main>
  );
}
