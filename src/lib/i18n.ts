export type Locale = "en" | "pt-BR";
export type PrefixedLocale = Exclude<Locale, "en">;

export const locales: readonly Locale[] = ["en", "pt-BR"] as const;
export const defaultLocale: Locale = "en";

/** Locales that appear as a URL prefix. Default locale stays unprefixed. */
export const prefixedLocales: readonly PrefixedLocale[] = locales.filter(
  (locale): locale is PrefixedLocale => locale !== defaultLocale,
);

export const localeHeader = "x-locale";

export function isValidLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}

export function isPrefixedLocale(locale: string): locale is PrefixedLocale {
  return isValidLocale(locale) && locale !== defaultLocale;
}

/** BCP 47 language tag for the document `lang` attribute. */
export function getHtmlLang(locale: Locale): string {
  return locale;
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  for (const locale of locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return null;
}

export function stripLocalePrefix(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  if (!locale) return pathname;
  const stripped = pathname.slice(locale.length + 1);
  return stripped.length > 0 ? stripped : "/";
}

export function localizePathname(pathname: string, locale: Locale): string {
  const basePath = stripLocalePrefix(pathname);
  if (locale === defaultLocale) {
    return basePath;
  }
  return basePath === "/" ? `/${locale}` : `/${locale}${basePath}`;
}
