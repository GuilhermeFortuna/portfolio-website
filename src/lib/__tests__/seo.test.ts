import { describe, expect, it } from "vitest";

import {
  buildLanguageAlternates,
  createPageMetadata,
  defaultOpenGraphTitle,
  sitemapPaths,
} from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

describe("SEO helpers", () => {
  it("builds hreflang alternates with an English x-default", () => {
    expect(buildLanguageAlternates("/")).toEqual({
      en: "/",
      "pt-BR": "/pt-BR",
      "x-default": "/",
    });
    expect(buildLanguageAlternates("/work/aegis")).toEqual({
      en: "/work/aegis",
      "pt-BR": "/pt-BR/work/aegis",
      "x-default": "/work/aegis",
    });
  });

  it("creates canonical, open graph, and twitter metadata", () => {
    const metadata = createPageMetadata({
      locale: "pt-BR",
      pathname: "/work/q",
      title: "Quant — PT",
      description: "Descricao",
      type: "article",
      images: [
        {
          url: "/work/q/launcher.webp",
          width: 2560,
          height: 1440,
          alt: "Quant launcher",
        },
      ],
    });

    expect(metadata.alternates).toEqual({
      canonical: "/pt-BR/work/q",
      languages: {
        en: "/work/q",
        "pt-BR": "/pt-BR/work/q",
        "x-default": "/work/q",
      },
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      locale: "pt_BR",
      url: "/pt-BR/work/q",
      siteName: "Guilherme",
      title: "Quant — PT",
      description: "Descricao",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Quant — PT",
      description: "Descricao",
      images: ["/work/q/launcher.webp"],
    });
  });

  it("exposes the approved default open graph title and index routes", () => {
    expect(defaultOpenGraphTitle).toBe(
      "Guilherme builds ambitious software systems.",
    );
    expect(sitemapPaths).toEqual(["/", "/work/aegis", "/work/q"]);
  });

  it("resolves the site URL from NEXT_PUBLIC_SITE_URL", () => {
    const previous = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com/";
    expect(getSiteUrl().toString()).toBe("https://example.com/");
    if (previous === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = previous;
    }
  });
});
