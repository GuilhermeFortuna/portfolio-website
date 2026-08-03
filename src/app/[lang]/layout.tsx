import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/components/i18n/language-context";
import { isPrefixedLocale, prefixedLocales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return prefixedLocales.map((lang) => ({ lang }));
}

function resolvePrefixedLocale(lang: string | undefined): Locale {
  if (!lang || !isPrefixedLocale(lang)) {
    notFound();
  }
  return lang;
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = resolvePrefixedLocale(lang);

  return <LanguageProvider locale={locale}>{children}</LanguageProvider>;
}
