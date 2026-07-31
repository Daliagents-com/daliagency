import { onestText, syneText } from "@/assets/fonts";
import type { Locale } from "@/i18n/config";
import Link from "next/link";

/**
 * Server-rendered plain HTML summary.
 * GEO/AEO note (HTML text for crawlers): key service phrases must exist in raw HTML,
 * not only inside client-only trees or images. This block is always SSR.
 */
const copy: Record<
  Locale,
  {
    heading: string;
    body: string;
    services: string[];
    links: { href: string; label: string }[];
  }
> = {
  en: {
    heading: "What Dali builds",
    body:
      "Dali is an AI agent systems studio. We design production AI agents and workflow automation inside tools teams already use: lead response, client inbox, operations documents, knowledge assistants, and voice design-partner pilots. We also harden vibe-coded MVPs, place human approval gates, and build GEO and SEO visibility systems so the business is findable in classic search and AI answers.",
    services: [
      "Custom AI agent systems with tools, rules, and approval boundaries",
      "Agent-first products where agents do core work, not only chat",
      "AI consulting, workflow mapping, and production rollouts",
      "AI visibility systems: GEO, SEO, citable content, multi-language surfaces",
      "Vibe-code rescue: secrets, payments, admin, patch vs rewrite",
    ],
    links: [
      { href: "/solutions", label: "Packaged pilots" },
      { href: "/blog", label: "Guides and process posts" },
      { href: "/blog/geo-seo-for-ai-agencies", label: "GEO and SEO for AI agencies" },
      {
        href: "/blog/how-we-rescue-vibe-coded-mvps",
        label: "Rescue vibe-coded MVPs",
      },
    ],
  },
  ru: {
    heading: "Что делает Dali",
    body:
      "Dali - студия production AI-агентов и автоматизации workflow внутри инструментов, которые команда уже использует: ответ на лиды, клиентский inbox, операционные документы, knowledge assistant и voice-пилоты. Мы также hardening vibe-coded MVP, ставим human approval gates и строим GEO/SEO-видимость для классического поиска и AI-ответов.",
    services: [
      "Кастомные AI agent systems: tools, rules, approval boundaries",
      "Agent-first продукты, где агент делает работу, а не только чат",
      "AI-консалтинг, карта процессов и production rollout",
      "AI visibility: GEO, SEO, цитируемый контент, мультиязык",
      "Vibe-code rescue: secrets, payments, admin, patch vs rewrite",
    ],
    links: [
      { href: "/ru/solutions", label: "Пилоты" },
      { href: "/ru/blog", label: "Гайды" },
      {
        href: "/ru/blog/geo-seo-for-ai-agencies",
        label: "GEO и SEO для AI-агентств",
      },
      {
        href: "/ru/blog/how-we-rescue-vibe-coded-mvps",
        label: "Rescue vibe-coded MVP",
      },
    ],
  },
  ge: {
    heading: "რას აკეთებს Dali",
    body:
      "Dali არის AI agent systems სტუდია. ვქმნით production AI აგენტებს და workflow ავტომატიზაციას არსებულ ინსტრუმენტებში: lead response, client inbox, operations docs, knowledge assistant და voice პილოტები. ასევე ვამაგრებთ vibe-coded MVP-ებს, ვაყენებთ human approval gates-ს და ვაშენებთ GEO/SEO ხილვადობას.",
    services: [
      "Custom AI agent systems - tools, rules, approvals",
      "Agent-first products",
      "AI consulting და production rollout",
      "GEO / SEO visibility systems",
      "Vibe-code rescue და hardening",
    ],
    links: [
      { href: "/ge/solutions", label: "პილოტები" },
      { href: "/ge/blog", label: "ბლოგი" },
      {
        href: "/ge/blog/geo-seo-for-ai-agencies",
        label: "GEO და SEO",
      },
      {
        href: "/ge/blog/how-we-rescue-vibe-coded-mvps",
        label: "Vibe-coded MVP rescue",
      },
    ],
  },
  arm: {
    heading: "Ինչ է անում Dali-ն",
    body:
      "Dali-ն AI agent systems ստուդիա է։ Մենք կառուցում ենք production AI գործակալներ և workflow ավտոմատացում արդեն օգտագործվող գործիքներում՝ lead response, client inbox, operations docs, knowledge assistant և voice փորձնականներ։ Նաև harden ենք անում vibe-coded MVP-ները, դնում human approval gates և կառուցում GEO/SEO տեսանելիություն։",
    services: [
      "Custom AI agent systems",
      "Agent-first products",
      "AI consulting և production rollout",
      "GEO / SEO visibility",
      "Vibe-code rescue",
    ],
    links: [
      { href: "/arm/solutions", label: "Փորձնականներ" },
      { href: "/arm/blog", label: "Բլոգ" },
      {
        href: "/arm/blog/geo-seo-for-ai-agencies",
        label: "GEO և SEO",
      },
      {
        href: "/arm/blog/how-we-rescue-vibe-coded-mvps",
        label: "Vibe-coded MVP rescue",
      },
    ],
  },
};

type HomeSeoSummaryProps = {
  locale?: Locale;
};

export default function HomeSeoSummary({ locale = "en" }: HomeSeoSummaryProps) {
  const c = copy[locale] ?? copy.en;

  return (
    <section
      id="what-dali-builds"
      aria-labelledby="what-dali-builds-title"
      className="border-t border-black/10 bg-[var(--page-bg-color)] py-40 md:py-56"
    >
      <div className="page-container wide">
        <h2
          id="what-dali-builds-title"
          className={`${syneText.className} text-body3 font-medium tracking-tight text-[var(--text)] md:text-body2`}
        >
          {c.heading}
        </h2>
        <p
          className={`${onestText.className} mt-16 max-w-[48rem] text-body5 leading-relaxed text-[var(--muted)] md:text-body4`}
        >
          {c.body}
        </p>
        <ul
          className={`${onestText.className} mt-20 max-w-[48rem] list-disc space-y-10 pl-20 text-body5 text-[var(--text)] md:text-body4`}
        >
          {c.services.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <nav
          aria-label="Key resources"
          className={`${onestText.className} mt-24 flex flex-wrap gap-12 text-body6 uppercase tracking-[0.08em]`}
        >
          {c.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border border-black/10 px-14 py-10 transition-opacity hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
