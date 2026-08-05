import type { Metadata } from "next";

import {
  defaultLocale,
  localizePathname,
  locales,
  type Locale,
} from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";

export type SeoImage = {
  url: string;
  width?: number;
  height?: number;
  alt: string;
};

export type PageSeoInput = {
  locale: Locale;
  /** Unprefixed pathname, e.g. `/` or `/work/aegis`. */
  pathname: string;
  title: string;
  description: string;
  images?: readonly SeoImage[];
  /** Defaults to `website`. Use `article` for case studies. */
  type?: "website" | "article";
};

const openGraphLocale: Record<Locale, string> = {
  en: "en_US",
  "pt-BR": "pt_BR",
};

const siteName = "Guilherme";

/** Global OG headline from docs/content.md when a route does not override. */
export const defaultOpenGraphTitle =
  "Guilherme builds ambitious software systems.";

export function buildLanguageAlternates(
  pathname: string,
): NonNullable<NonNullable<Metadata["alternates"]>["languages"]> {
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    languages[locale] = localizePathname(pathname, locale);
  }

  languages["x-default"] = localizePathname(pathname, defaultLocale);
  return languages;
}

export function createPageMetadata({
  locale,
  pathname,
  title,
  description,
  images,
  type = "website",
}: PageSeoInput): Metadata {
  const canonicalPath = localizePathname(pathname, locale);
  const languageAlternates = buildLanguageAlternates(pathname);
  const resolvedImages =
    images && images.length > 0
      ? images.map((image) => ({
          url: image.url,
          width: image.width,
          height: image.height,
          alt: image.alt,
        }))
      : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: languageAlternates,
    },
    openGraph: {
      type,
      locale: openGraphLocale[locale],
      url: canonicalPath,
      siteName,
      title,
      description,
      ...(resolvedImages ? { images: resolvedImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(resolvedImages
        ? { images: resolvedImages.map((image) => image.url) }
        : {}),
    },
  };
}

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, getSiteUrl()).toString();
}

/**
 * Staging previews must not be indexed. Production and local builds stay
 * indexable (Next default). Canonicals still use the configured SITE_URL.
 */
export function deploymentRobotsMetadata(): Pick<Metadata, "robots"> | undefined {
  if (process.env.DEPLOY_ENV?.trim() !== "staging") {
    return undefined;
  }

  return {
    robots: {
      index: false,
      follow: false,
    },
  };
}

/** Indexable routes shared by the sitemap (unprefixed paths). */
export const sitemapPaths = ["/", "/work/aegis", "/work/q"] as const;
