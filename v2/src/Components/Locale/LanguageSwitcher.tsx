"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  localeFromPathname,
  localeLabels,
  locales,
  localizePath,
  htmlLanguages,
  stripLocalePrefix,
  type Locale,
} from "@/i18n/config";
import { isProjectSlug } from "@/i18n/projects";

type LanguageSwitcherProps = {
  ariaLabel: string;
  className?: string;
  onNavigate?: () => void;
  /** Inline list (mobile drawer) or compact dropdown (desktop header). */
  variant?: "dropdown" | "list";
};

export default function LanguageSwitcher({
  ariaLabel,
  className = "",
  onNavigate,
  variant = "dropdown",
}: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/";
  const currentLocale = localeFromPathname(pathname);
  const normalizedPathname = stripLocalePrefix(pathname);
  const projectSlug = normalizedPathname.match(/^\/project\/([^/]+)$/)?.[1];
  const hasLocalizedEquivalent =
    normalizedPathname === "/" ||
    normalizedPathname === "/solutions" ||
    normalizedPathname === "/design-sprints" ||
    /^\/solutions\/[^/]+$/.test(normalizedPathname) ||
    Boolean(projectSlug && isProjectSlug(projectSlug));
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const getLocaleHref = (locale: Locale) => {
    if (locale === currentLocale) {
      return pathname;
    }

    return localizePath(
      hasLocalizedEquivalent ? normalizedPathname : "/#services",
      locale,
    );
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  if (variant === "list") {
    return (
      <nav
        className={`flex flex-wrap items-center gap-x-8 gap-y-4 text-body6 uppercase ${className}`}
        aria-label={ariaLabel}
      >
        {locales.map((locale: Locale) => (
          <a
            key={locale}
            href={getLocaleHref(locale)}
            hrefLang={htmlLanguages[locale]}
            lang={htmlLanguages[locale]}
            aria-current={currentLocale === locale ? "page" : undefined}
            className={
              currentLocale === locale
                ? "text-primary underline underline-offset-4"
                : "text-current transition-opacity hover:opacity-60"
            }
            onClick={onNavigate}
          >
            {localeLabels[locale]}
          </a>
        ))}
      </nav>
    );
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        className="inline-flex items-center gap-6 border border-black/10 bg-[var(--page-bg-color)] px-12 py-8 text-body6 uppercase transition-colors hover:bg-black/[0.03]"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{localeLabels[currentLocale]}</span>
        <span
          aria-hidden
          className={`text-[10px] leading-none transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {isOpen ? (
        <ul
          id={menuId}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[88px] border border-black/10 bg-[var(--page-bg-color)] py-4 shadow-sm"
        >
          {locales.map((locale: Locale) => {
            const isCurrent = currentLocale === locale;
            return (
              <li key={locale} role="option" aria-selected={isCurrent}>
                <a
                  href={getLocaleHref(locale)}
                  hrefLang={htmlLanguages[locale]}
                  lang={htmlLanguages[locale]}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`block px-14 py-8 text-body6 uppercase transition-colors ${
                    isCurrent
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-current hover:bg-black/[0.04]"
                  }`}
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate?.();
                  }}
                >
                  {localeLabels[locale]}
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
