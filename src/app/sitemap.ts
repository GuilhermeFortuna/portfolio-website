import type { MetadataRoute } from "next";

import { localizePathname, locales } from "@/lib/i18n";
import { absoluteUrl, sitemapPaths } from "@/lib/seo";

// Resolve the site origin from env on each request so deploy hosts stay accurate.
export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapPaths.flatMap((pathname) =>
    locales.map((locale) => {
      const localizedPath = localizePathname(pathname, locale);
      const languages = Object.fromEntries(
        locales.map((entry) => [
          entry,
          absoluteUrl(localizePathname(pathname, entry)),
        ]),
      );

      return {
        url: absoluteUrl(localizedPath),
        lastModified: new Date(),
        alternates: {
          languages,
        },
      };
    }),
  );
}
