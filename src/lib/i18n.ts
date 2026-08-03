export type Locale = "en" | "pt-BR";

export const locales: readonly Locale[] = ["en", "pt-BR"] as const;
export const defaultLocale: Locale = "en";

export function isValidLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}
