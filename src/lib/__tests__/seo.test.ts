import { afterEach, describe, expect, it } from "vitest";

import {
  buildLanguageAlternates,
  createPageMetadata,
  defaultOpenGraphTitle,
  deploymentRobotsMetadata,
  sitemapPaths,
} from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

const ENV_KEYS = [
  "DEPLOY_ENV",
  "SITE_URL",
  "NEXT_PUBLIC_SITE_URL",
  "VERCEL_URL",
  "VERCEL_PROJECT_PRODUCTION_URL",
] as const;

const originalEnv = Object.fromEntries(
  ENV_KEYS.map((key) => [key, process.env[key]]),
);

function restoreEnv() {
  for (const key of ENV_KEYS) {
    const value = originalEnv[key];
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

function clearSiteUrlEnv() {
  for (const key of ENV_KEYS) {
    delete process.env[key];
  }
}

describe("SEO helpers", () => {
  afterEach(() => {
    restoreEnv();
  });

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
    clearSiteUrlEnv();
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com/";
    expect(getSiteUrl().toString()).toBe("https://example.com/");
  });

  it("falls back to localhost for unlabelled local builds", () => {
    clearSiteUrlEnv();
    expect(getSiteUrl().toString()).toBe("http://localhost:3000/");
  });

  it("requires https SITE_URL for staging and production deploy builds", () => {
    clearSiteUrlEnv();
    process.env.DEPLOY_ENV = "staging";
    expect(() => getSiteUrl()).toThrow(/SITE_URL|NEXT_PUBLIC_SITE_URL/);

    process.env.SITE_URL = "http://example.invalid";
    expect(() => getSiteUrl()).toThrow(/https/);

    process.env.SITE_URL = "not-a-url";
    expect(() => getSiteUrl()).toThrow(/valid https origin|https/);

    process.env.SITE_URL = "https://example.invalid/";
    expect(getSiteUrl().toString()).toBe("https://example.invalid/");

    clearSiteUrlEnv();
    process.env.DEPLOY_ENV = "production";
    process.env.NEXT_PUBLIC_SITE_URL = "https://portfolio.example/";
    expect(getSiteUrl().toString()).toBe("https://portfolio.example/");
  });

  it("returns noindex nofollow only for staging deploy builds", () => {
    clearSiteUrlEnv();
    expect(deploymentRobotsMetadata()).toBeUndefined();

    process.env.DEPLOY_ENV = "production";
    expect(deploymentRobotsMetadata()).toBeUndefined();

    process.env.DEPLOY_ENV = "staging";
    expect(deploymentRobotsMetadata()).toEqual({
      robots: {
        index: false,
        follow: false,
      },
    });
  });
});
