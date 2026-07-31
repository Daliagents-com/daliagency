"use client";
import React, { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import FocusLock from "react-focus-lock";
import { usePathname } from "next/navigation";

import Container from "../Container/Container";
import NavLink from "../NavLink/NavLink";
import LanguageSwitcher from "../Locale/LanguageSwitcher";
import { getGeneralAuditHref } from "@/lib/contact";
import {
  localeFromPathname,
  localizePath,
  stripLocalePrefix,
} from "@/i18n/config";
import { homeCopy } from "@/i18n/home";
import { onestText, syneText } from "@/assets/fonts";

const itemVariants = {
  hide: {
    opacity: 0,
    x: -4,
  },
  show: {
    opacity: 1,
    x: 0,
  },
};

const sideNavVariants = {
  hide: {
    clipPath: "circle(1% at 9% 12%)",
    transitionEnd: {
      display: "none",
    },
  },
  show: {
    display: "block",
    clipPath: "circle(150% at 9% 12%)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const overlayVariants = {
  hide: {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  },
  show: {
    display: "block",
    opacity: 1,
  },
};

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

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const [isOpen, setIsOpen] = useState(false);
  const locale = localeFromPathname(pathname);
  const auditHref = getGeneralAuditHref(locale);
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

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  if (isUpworkProof) return null;

  const ctaClassName = `${syneText.className} inline-flex items-center justify-center border border-black/10 bg-primary px-16 py-10 text-body6 uppercase text-white transition-colors hover:bg-primary-700`;

  // Centered brand mark. On home: hidden until scroll-flight pins here
  // (controller toggles [data-logo-mark] opacity). Off home: always visible.
  const centerLogo = (
    <Link
      id="dali-logo-nav-slot"
      href={homeHref}
      aria-label="Dali home"
      className="pointer-events-auto relative z-10 flex h-32 w-[4.5rem] items-center justify-center md:h-40 md:w-[5.5rem]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-logo-mark
        src="/dali-logo.svg"
        alt="Dali"
        width={108}
        height={56}
        className="h-32 w-auto md:h-40"
        style={
          isHome
            ? { opacity: 0, visibility: "hidden", pointerEvents: "none" }
            : undefined
        }
        draggable={false}
      />
    </Link>
  );

  return (
    <>
      <motion.nav
        className={`${onestText.className} sticky left-0 top-0 z-30 w-full ${
          isHome
            ? "border-b border-black/10 bg-[var(--page-bg-color)]"
            : "border-b-2 border-gray-500 border-opacity-20 bg-inherit md:border-b-0"
        }`}
        initial="hide"
        animate="show"
        variants={{
          hide: {
            opacity: 0,
            x: -4,
          },
          show: {
            opacity: 1,
            x: 0,
          },
        }}
        transition={{ staggerChildren: 0.1, delay: 0, when: "beforeChildren" }}
      >
        <Container wide>
          <div className="relative flex items-center gap-16 py-12 md:gap-24 md:py-14">
            {/* Left: section links (desktop) */}
            <ul className="hidden min-w-0 flex-1 items-center justify-start gap-4 text-body6 md:flex md:gap-6 md:text-body5">
              {links.map((link) => (
                <motion.li
                  key={link.href}
                  className="shrink-0 border-opacity-10 md:border-l md:border-gray-100"
                  variants={itemVariants}
                >
                  <NavLink
                    className="block whitespace-nowrap font-normal uppercase tracking-wide transition-opacity hover:opacity-60 md:pl-12 md:pr-8"
                    activeClassName="underline underline-offset-4"
                    href={link.href}
                  >
                    <span aria-hidden>/</span> {link.text}
                  </NavLink>
                </motion.li>
              ))}
            </ul>

            {/* Center logo - absolute so true optical center of the bar */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 flex -translate-x-1/2 items-center">
              {centerLogo}
            </div>

            {/* Right: language + CTA / mobile controls */}
            <div className="ml-auto hidden items-center gap-12 md:flex">
              <LanguageSwitcher
                ariaLabel={copy.navigation.selectLanguage}
                variant="dropdown"
              />
              <motion.a
                href={auditHref}
                data-cta="nav-audit"
                className={ctaClassName}
                variants={itemVariants}
              >
                {copy.navigation.startAudit}
              </motion.a>
            </div>

            <div className="ml-auto flex items-center gap-12 md:hidden">
              <LanguageSwitcher
                ariaLabel={copy.navigation.selectLanguage}
                variant="dropdown"
              />
              <button
                className="flex min-w-[40px] aspect-square flex-col items-center justify-center text-body1 transition-transform active:scale-75"
                onClick={toggleNav}
                aria-label={copy.navigation.openMenu}
              >
                /
              </button>
            </div>
          </div>
        </Container>
      </motion.nav>

      <motion.div
        className="fixed inset-0 z-20 bg-black bg-opacity-40"
        variants={overlayVariants}
        initial={isOpen ? "show" : "hide"}
        animate={isOpen ? "show" : "hide"}
        onClick={toggleNav}
      ></motion.div>

      <FocusLock disabled={!isOpen}>
        <motion.nav
          variants={sideNavVariants}
          transition={{
            ease: "easeInOut",
            duration: 0.5,
          }}
          initial={isOpen ? "show" : "hide"}
          animate={isOpen ? "show" : "hide"}
          className={`${onestText.className} fixed inset-x-0 top-0 z-40 border-b border-gray-200 bg-[var(--page-bg-color)] p-16 pb-42`}
        >
          <div className="mb-32 flex items-center justify-between gap-16">
            <Link
              href={homeHref}
              aria-label="Dali home"
              onClick={toggleNav}
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
              className="flex min-w-[40px] aspect-square flex-col items-center justify-center text-body1 transition-transform active:scale-75"
              onClick={toggleNav}
              aria-label={copy.navigation.closeMenu}
            >
              <X className="h-[1em] w-[1em]" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
          <ul className="flex flex-col gap-16 text-body4">
            {links.map((link) => (
              <motion.li key={link.href} variants={itemVariants}>
                <NavLink
                  className="block font-normal uppercase tracking-wide transition-opacity hover:opacity-60"
                  activeClassName="underline underline-offset-4"
                  href={link.href}
                  onClick={toggleNav}
                >
                  <span aria-hidden>/</span> {link.text}
                </NavLink>
              </motion.li>
            ))}
          </ul>
          <LanguageSwitcher
            ariaLabel={copy.navigation.selectLanguage}
            className="mt-24 border-t border-black/10 pt-20 text-body4"
            onNavigate={toggleNav}
            variant="list"
          />
          <motion.a
            href={auditHref}
            data-cta="nav-audit"
            onClick={toggleNav}
            className={`${ctaClassName} mt-24 py-12 text-body5`}
            variants={itemVariants}
          >
            {copy.navigation.startAudit}
          </motion.a>
        </motion.nav>
      </FocusLock>
    </>
  );
}
