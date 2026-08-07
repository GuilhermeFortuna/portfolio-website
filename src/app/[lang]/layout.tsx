import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { RootDocument } from "@/components/layout/root-document";
import { getSiteMetadata } from "@/content/site";
import {
  isPrefixedLocale,
  prefixedLocales,
  type Locale,
} from "@/lib/i18n";
import { createPageMetadata, deploymentRobotsMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import "../globals.css";

const portugueseSiteMetadata = getSiteMetadata("pt-BR");

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  ...createPageMetadata({
    locale: "pt-BR",
    pathname: "/",
    title: portugueseSiteMetadata.title,
    description: portugueseSiteMetadata.description,
  }),
  ...deploymentRobotsMetadata(),
};

export function generateStaticParams() {
  return prefixedLocales.map((lang) => ({ lang }));
}

function resolvePrefixedLocale(lang: string | undefined): Locale {
  if (!lang || !isPrefixedLocale(lang)) {
    notFound();
  }
  return lang;
}

export default async function PrefixedLocaleRootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = resolvePrefixedLocale(lang);

  return <RootDocument locale={locale}>{children}</RootDocument>;
}
