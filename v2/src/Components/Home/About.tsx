import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/Components/Container/Container";
import { onestText, syneText } from "@/assets/fonts";
import DavidImage from "@/assets/images/team/david.png";
import LianaImage from "@/assets/images/team/liana.jpeg";
import { homeCopy } from "@/i18n/home";
import type { Locale } from "@/i18n/config";
import { sectionTitle } from "@/lib/sectionTitle";
import styles from "./About.module.css";

/**
 * Unified About section: team identity + SSR GEO summary.
 * Key service phrases stay in plain HTML for crawlers (not client-only trees).
 */
const buildsCopy: Record<
  Locale,
  {
    heading: string;
    body: string;
    services: string[];
    explore: string;
    links: { href: string; label: string }[];
  }
> = {
  en: {
    heading: "What Dali builds",
    body:
      "Dali is an AI agent systems studio. We design production AI agents and workflow automation inside tools teams already use: conversation control for leads and client support, ops and knowledge systems, and voice design-partner tracks. We also harden vibe-coded MVPs and place human approval gates so agents ship to production safely.",
    services: [
      "Custom AI agent systems with tools, rules, and approval boundaries",
      "Agent-first products where agents do core work, not only chat",
      "Vibe-code rescue: secrets, payments, admin, patch vs rewrite",
    ],
    explore: "Explore",
    links: [
      { href: "/solutions", label: "Product families" },
      { href: "/solutions/rescue-and-migration", label: "Rescue & migration" },
      {
        href: "/solutions/conversation-control",
        label: "Conversation control",
      },
      { href: "/blog", label: "Guides and process posts" },
    ],
  },
  ru: {
    heading: "Что делает Dali",
    body:
      "Dali - студия production AI-агентов и автоматизации workflow внутри инструментов, которые команда уже использует: управление перепиской (лиды и support), ops и знания, voice-пакеты. Мы также укрепляем vibe-coded MVP и ставим human approval gates, чтобы агенты безопасно выходили в продакшен.",
    services: [
      "Кастомные AI agent systems: tools, rules, approval boundaries",
      "Agent-first продукты, где агент делает работу, а не только чат",
      "Vibe-code rescue: secrets, payments, admin, patch vs rewrite",
    ],
    explore: "Смотреть",
    links: [
      { href: "/ru/solutions", label: "Продуктовые семейства" },
      { href: "/ru/solutions/rescue-and-migration", label: "Rescue и миграции" },
      {
        href: "/ru/solutions/conversation-control",
        label: "Управление перепиской",
      },
      { href: "/ru/blog", label: "Гайды" },
    ],
  },
  ge: {
    heading: "რას აკეთებს Dali",
    body:
      "Dali არის AI agent systems სტუდია. ვქმნით production AI აგენტებს და workflow ავტომატიზაციას არსებულ ინსტრუმენტებში: conversation control, ops & knowledge და voice პაკეტები. ასევე ვამაგრებთ vibe-coded MVP-ებს და ვაყენებთ human approval gates-ს, რომ აგენტები უსაფრთხოდ გავიდნენ პროდაქშენში.",
    services: [
      "Custom AI agent systems - tools, rules, approvals",
      "Agent-first products",
      "Vibe-code rescue და hardening",
    ],
    explore: "გადასვლა",
    links: [
      { href: "/ge/solutions", label: "პროდუქტის ოჯახები" },
      { href: "/ge/solutions/rescue-and-migration", label: "Rescue & migration" },
      {
        href: "/ge/solutions/conversation-control",
        label: "Conversation control",
      },
      { href: "/ge/blog", label: "ბლოგი" },
    ],
  },
  arm: {
    heading: "Ինչ է անում Dali-ն",
    body:
      "Dali-ն AI agent systems ստուդիա է։ Մենք կառուցում ենք production AI գործակալներ և workflow ավտոմատացում արդեն օգտագործվող գործիքներում՝ conversation control, ops & knowledge և voice փորձնականներ։ Նաև ամրացնում ենք vibe-coded MVP-ները և դնում human approval gates, որ գործակալները անվտանգ դուրս գան արտադրություն։",
    services: [
      "Custom AI agent systems",
      "Agent-first products",
      "Vibe-code rescue",
    ],
    explore: "Բացել",
    links: [
      { href: "/arm/solutions", label: "Արտադրանքի ընտանիքներ" },
      { href: "/arm/solutions/rescue-and-migration", label: "Rescue & migration" },
      {
        href: "/arm/solutions/conversation-control",
        label: "Conversation control",
      },
      { href: "/arm/blog", label: "Բլոգ" },
    ],
  },
};

const photoMaskStyle = {
  maskImage:
    "radial-gradient(ellipse at center, black 48%, transparent 92%)",
  WebkitMaskImage:
    "radial-gradient(ellipse at center, black 48%, transparent 92%)",
};

function Person({
  image,
  name,
  role,
}: {
  image: typeof DavidImage;
  name: string;
  role: string;
}) {
  return (
    <figure className="flex flex-col items-center text-center">
      <Image
        src={image}
        alt={`${name}, ${role}`}
        className="mx-auto h-[120px] w-[120px] object-cover object-top md:h-[130px] md:w-[130px]"
        width={130}
        height={130}
        sizes="130px"
        style={photoMaskStyle}
      />
      <figcaption className="mt-16 flex flex-col items-center gap-4">
        <div
          className={`${syneText.className} text-body5 font-medium uppercase tracking-[0.08em] text-[var(--text)]`}
        >
          {name}
        </div>
        <div
          className={`${onestText.className} text-body6 font-normal uppercase tracking-[0.12em] text-[var(--muted)]`}
        >
          {role}
        </div>
      </figcaption>
    </figure>
  );
}

function BrandMark() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/dali-logo.svg"
      alt="Dali"
      width={108}
      height={56}
      draggable={false}
      className="mx-[0.18em] inline-block h-[1.2em] w-auto translate-y-[-0.12em] align-baseline"
    />
  );
}

export default function About({ locale = "en" }: { locale?: Locale }) {
  const copy = homeCopy[locale].about;
  // home nav: Projects, Solutions, Blog, About - About is last.
  const aboutLabel = homeCopy[locale].navigation.home[4];
  const builds = buildsCopy[locale] ?? buildsCopy.en;

  return (
    <section
      id="about"
      className={styles.section}
      aria-labelledby="about-title"
    >
      <Container wide>
        <div className={styles.inner}>
          <header className={styles.header}>
            <h2 id="about-title" className="section-label">
              {sectionTitle(4, aboutLabel)}
            </h2>
          </header>

          <div className={styles.people}>
            <p
              className={`${onestText.className} ${styles.identity} text-body3 leading-[1.65] lg:text-body2 lg:leading-[1.6]`}
            >
              {copy.beforeName}
              {copy.beforeName ? " " : null}
              <BrandMark />
              {copy.afterName ? ` ${copy.afterName}` : null}
            </p>

            <div className={styles.founders}>
              <Person image={DavidImage} name="David" role={copy.founder} />
              <Person image={LianaImage} name="Liana" role={copy.coFounder} />
            </div>
          </div>

          <hr className={styles.divider} />

          <div
            id="what-dali-builds"
            className={styles.builds}
            aria-labelledby="what-dali-builds-title"
          >
            <div className={styles.buildsLead}>
              <h3
                id="what-dali-builds-title"
                className={`section-label ${styles.buildsLabel}`}
              >
                {builds.heading}
              </h3>
              <p
                className={`${onestText.className} ${styles.buildsBody} text-body4 leading-[1.65] md:text-body3`}
              >
                {builds.body}
              </p>
            </div>

            <div className={styles.side}>
              <ul className={`${onestText.className} ${styles.list}`}>
                {builds.services.map((item, index) => (
                  <li
                    key={item}
                    className={`${styles.item} text-body5 md:text-body4`}
                  >
                    <span className={styles.index} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.itemText}>{item}</span>
                  </li>
                ))}
              </ul>

              <nav
                aria-label={builds.explore}
                className={`${onestText.className} ${styles.nav}`}
              >
                <span className={styles.navLabel}>{builds.explore}</span>
                <ul className={styles.links}>
                  {builds.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`${styles.link} text-body6`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
