import type { MetadataRoute } from "next";

import { localizePathname, locales } from "@/lib/i18n";
import { absoluteUrl, sitemapPaths } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

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
        lastModified,
        alternates: {
          languages,
        },
      };
    }),
  );
}
