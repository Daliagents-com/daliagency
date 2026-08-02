import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Hero from "@/Components/Home/Hero";
import About from "@/Components/Home/About";
import AgentSolutions from "@/Components/Home/AgentSolutions";
import {
  isLocale,
  localizedLocales,
  type Locale,
} from "@/i18n/config";

// Prerender locale homes (generateStaticParams). No request-time data.
export const dynamic = "force-static";

// Projects still SSR for crawlable case grid.
const Projects = nextDynamic(() => import("@/Components/Home/Projects"), {
  ssr: true,
});

type LocalizedHomeProps = {
  params: Promise<{
    locale: string;
  }>;
};

const localizedMetadata: Record<
  Exclude<Locale, "en">,
  { title: string; description: string; keywords: string[] }
> = {
  ru: {
    title: "Dali - агентские ИИ-системы и agent-first продукты",
    description:
      "Dali проектирует production AI-агенты, workflow automation, agent-first продукты, vibe-code rescue и GEO/SEO-видимость вокруг реальных бизнес-процессов.",
    keywords: [
      "AI агентские системы",
      "production AI агенты",
      "автоматизация workflow",
      "agent-first продукты",
      "GEO SEO AI агентство",
      "vibe code rescue",
      "human approval gates",
    ],
  },
  ge: {
    title: "Dali - AI agent systems და production ავტომატიზაცია",
    description:
      "Dali ქმნის production AI აგენტებს, workflow ავტომატიზაციას, agent-first პროდუქტებს, vibe-code rescue-ს და GEO/SEO ხილვადობას.",
    keywords: [
      "AI agent systems",
      "production AI agents",
      "workflow automation",
      "GEO SEO",
      "vibe code rescue",
    ],
  },
  arm: {
    title: "Dali - AI agent systems և production ավտոմատացում",
    description:
      "Dali-ն կառուցում է production AI գործակալներ, workflow ավտոմատացում, agent-first արտադրանք, vibe-code rescue և GEO/SEO տեսանելիություն։",
    keywords: [
      "AI agent systems",
      "production AI agents",
      "workflow automation",
      "GEO SEO",
      "vibe code rescue",
    ],
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
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
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
      <AgentSolutions locale={locale} />
      <Projects locale={locale} />
      <About locale={locale} />
    </main>
  );
}
