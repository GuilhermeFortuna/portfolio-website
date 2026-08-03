import type { Metadata } from "next";
import { LanguageProvider } from "@/components/i18n/language-context";
import { getSiteMetadata } from "@/content/site";
import { isValidLocale, defaultLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }> | Promise<unknown>;
}): Promise<Metadata> {
  const resolvedParams = (await params) as { lang?: string } | undefined;
  const lang = resolvedParams?.lang ?? defaultLocale;
  const locale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const siteMetadata = getSiteMetadata(locale);
  return {
    title: siteMetadata.title,
    description: siteMetadata.description,
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }> | Promise<unknown>;
}) {
  const resolvedParams = (await params) as { lang?: string } | undefined;
  const lang = resolvedParams?.lang ?? defaultLocale;
  const locale: Locale = isValidLocale(lang) ? lang : defaultLocale;

  return <LanguageProvider locale={locale}>{children}</LanguageProvider>;
}
