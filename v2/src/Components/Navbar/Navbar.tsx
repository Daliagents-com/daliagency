// Purpose: Site header - logo slot, nav links, language, consultation CTA.
// Perf: no framer-motion / lucide / focus-lock on first load. Mobile drawer is CSS.
"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import Container from "../Container/Container";
import NavLink from "../NavLink/NavLink";
import LanguageSwitcher from "../Locale/LanguageSwitcher";
import {
  localeFromPathname,
  localizePath,
  stripLocalePrefix,
} from "@/i18n/config";
import { homeCopy } from "@/i18n/home";
import { onestText, syneText } from "@/assets/fonts";
import ConsultationTrigger from "@/Components/Consultation/ConsultationTrigger";

// 271KB replay JSON stays out of the layout first-load graph.
const DaliAnimation = dynamic(
  () => import("@/Components/Home/DaliAnimation"),
  {
    ssr: false,
    loading: () => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/dali-logo.svg"
        alt=""
        width={96}
        height={50}
        className="h-full w-auto max-w-full object-contain"
        draggable={false}
      />
    ),
  },
);

/** Homepage section anchors that match real `id`s on the page. */
const homeHrefs = [
  "/#projects",
  "/#agent-solutions",
  "/blog",
  "/#services",
  "/#about",
] as const;

const solutionHrefs = [
  "/solutions#solutions",
  "/solutions#process",
  "/blog",
  "/solutions#proof",
  "/solutions#about",
] as const;

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const [isOpen, setIsOpen] = useState(false);
  const locale = localeFromPathname(pathname);
  const copy = homeCopy[locale];
  const normalizedPathname = stripLocalePrefix(pathname);
  const isUpworkProof = normalizedPathname.startsWith("/for/upwork");
  const isHome = normalizedPathname === "/";
  const homeHref = localizePath("/", locale);
  const useSolutionNavigation = !isHome;
  const labels = useSolutionNavigation
    ? copy.navigation.solutions
    : copy.navigation.home;
  const hrefs = useSolutionNavigation ? solutionHrefs : homeHrefs;
  const links = labels.map((text, index) => ({
    text,
    href: localizePath(hrefs[index] ?? hrefs[0], locale),
  }));

  const closeNav = useCallback(() => setIsOpen(false), []);
  const toggleNav = () => setIsOpen((v) => !v);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeNav();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, closeNav]);

  // Close drawer on route change.
  useEffect(() => {
    closeNav();
  }, [pathname, closeNav]);

  if (isUpworkProof) return null;

  const ctaClassName = `${syneText.className} inline-flex items-center justify-center border border-black/10 bg-primary px-16 py-10 text-body6 uppercase text-white transition-colors hover:bg-primary-700`;

  const centerLogo = (
    <Link
      id="dali-logo-nav-slot"
      href={homeHref}
      aria-label="Dali home"
      className="pointer-events-auto relative z-10 flex h-32 w-[4.5rem] items-center justify-center md:h-40 md:w-[5.5rem]"
    >
      <span
        data-logo-mark
        className="block h-32 w-full overflow-visible md:h-40"
        style={{ opacity: 1, visibility: "visible" }}
      >
        <DaliAnimation />
      </span>
    </Link>
  );

  return (
    <>
      <nav
        className={`${onestText.className} sticky left-0 top-0 z-30 w-full ${
          isHome
            ? "border-b border-black/10 bg-[var(--page-bg-color)]"
            : "border-b-2 border-gray-500 border-opacity-20 bg-inherit xl:border-b-0"
        }`}
      >
        <Container wide>
          <div className="relative flex items-center gap-16 py-12 md:gap-24 md:py-14">
            {/* xl, not md: the centered signature is positioned out of flow, so
                the links have nothing to stop them running under it. Five
                nowrap links plus language and CTA only clear the logo from
                ~1240px up. Below that the drawer takes over. */}
            <ul className="hidden min-w-0 flex-1 items-center justify-start gap-4 text-body6 xl:flex xl:text-body5 2xl:gap-6">
              {links.map((link) => (
                <li
                  key={link.href}
                  className="shrink-0 border-opacity-10 xl:border-l xl:border-gray-100"
                >
                  <NavLink
                    className="block whitespace-nowrap font-normal uppercase tracking-wide transition-opacity hover:opacity-60 xl:pl-8 xl:pr-4 2xl:pl-12 2xl:pr-8"
                    activeClassName="underline underline-offset-4"
                    href={link.href}
                  >
                    <span aria-hidden>/</span> {link.text}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 flex -translate-x-1/2 items-center">
              {centerLogo}
            </div>

            <div className="ml-auto hidden items-center gap-12 xl:flex">
              <LanguageSwitcher
                ariaLabel={copy.navigation.selectLanguage}
                variant="dropdown"
              />
              <ConsultationTrigger
                source="nav-consultation"
                className={ctaClassName}
              >
                {copy.navigation.startAudit}
              </ConsultationTrigger>
            </div>

            <div className="ml-auto flex items-center gap-12 xl:hidden">
              <LanguageSwitcher
                ariaLabel={copy.navigation.selectLanguage}
                variant="dropdown"
              />
              <button
                type="button"
                className="flex min-w-[40px] aspect-square flex-col items-center justify-center text-body1 transition-transform active:scale-75"
                onClick={toggleNav}
                aria-label={copy.navigation.openMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-nav-drawer"
              >
                /
              </button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Overlay */}
      <button
        type="button"
        aria-label={copy.navigation.closeMenu}
        className={`fixed inset-0 z-20 bg-black/40 transition-opacity duration-300 xl:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        tabIndex={isOpen ? 0 : -1}
        onClick={closeNav}
      />

      {/* Mobile drawer - CSS only */}
      <nav
        id="mobile-nav-drawer"
        aria-hidden={!isOpen}
        className={`${onestText.className} fixed inset-x-0 top-0 z-40 border-b border-gray-200 bg-[var(--page-bg-color)] p-16 pb-42 transition-[transform,opacity] duration-300 ease-out xl:hidden ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <div className="mb-32 flex items-center justify-between gap-16">
          <Link
            href={homeHref}
            aria-label="Dali home"
            onClick={closeNav}
            className="flex items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dali-logo.svg"
              alt="Dali"
              width={96}
              height={50}
              className="h-32 w-auto"
            />
          </Link>
          <button
            type="button"
            className="flex min-w-[40px] aspect-square flex-col items-center justify-center text-body1 transition-transform active:scale-75"
            onClick={closeNav}
            aria-label={copy.navigation.closeMenu}
          >
            <CloseIcon />
          </button>
        </div>
        <ul className="flex flex-col gap-16 text-body4">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink
                className="block font-normal uppercase tracking-wide transition-opacity hover:opacity-60"
                activeClassName="underline underline-offset-4"
                href={link.href}
                onClick={closeNav}
              >
                <span aria-hidden>/</span> {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
        <LanguageSwitcher
          ariaLabel={copy.navigation.selectLanguage}
          className="mt-24 border-t border-black/10 pt-20 text-body4"
          onNavigate={closeNav}
          variant="list"
        />
        <ConsultationTrigger
          source="nav-mobile-consultation"
          className={`${ctaClassName} mt-24 py-12 text-body5`}
          onClick={closeNav}
        >
          {copy.navigation.startAudit}
        </ConsultationTrigger>
      </nav>
    </>
  );
}
