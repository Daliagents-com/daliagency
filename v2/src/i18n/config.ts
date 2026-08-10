export const locales = ["en", "ru", "ge", "arm"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localizedLocales = ["ru", "ge", "arm"] as const;

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  ge: "GE",
  arm: "ARM",
};

export const htmlLanguages: Record<Locale, string> = {
  en: "en",
  ru: "ru",
  ge: "ka",
  arm: "hy",
};

export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  ru: "ru_RU",
  ge: "ka_GE",
  arm: "hy_AM",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localeFromPathname(pathname?: string | null): Locale {
  const firstSegment = (pathname ?? "/").split("/").filter(Boolean)[0];
  return firstSegment && isLocale(firstSegment) ? firstSegment : defaultLocale;
}

export function stripLocalePrefix(pathname?: string | null) {
  const normalizedPathname = pathname ?? "/";
  const locale = localeFromPathname(pathname);

  if (locale === defaultLocale) {
    return normalizedPathname;
  }

  const stripped = normalizedPathname.replace(
    new RegExp(`^/${locale}(?=/|$)`),
    "",
  );
  return stripped || "/";
}

export function localizePath(path: string, locale: Locale) {
  if (/^(?:[a-z]+:|#)/i.test(path)) {
    return path;
  }

  const [pathname, hash] = path.split("#", 2);
  const normalizedPathname = stripLocalePrefix(pathname || "/");

  if (locale === defaultLocale) {
    return `${normalizedPathname}${hash ? `#${hash}` : ""}`;
  }

  const localizedPathname =
    normalizedPathname === "/"
      ? `/${locale}`
      : `/${locale}${normalizedPathname}`;

  return `${localizedPathname}${hash ? `#${hash}` : ""}`;
}
