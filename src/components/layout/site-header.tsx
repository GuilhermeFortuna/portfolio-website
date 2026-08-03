"use client";

import { useLocale } from "@/components/i18n/language-context";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { getSiteContent, getSiteNavigation } from "@/content/site";

const linkClassName =
  "inline-flex min-h-11 min-w-11 items-center justify-center [font-family:var(--font-geist-mono)] text-[0.6875rem] font-semibold tracking-[0.14em] uppercase";

export function SiteHeader() {
  const locale = useLocale();
  const siteContent = getSiteContent(locale);
  const siteNavigation = getSiteNavigation(locale);

  return (
    <>
      <a
        href="#main-content"
        className="fixed top-4 left-[var(--page-gutter)] z-50 -translate-y-[200%] bg-[var(--color-canvas)] px-4 py-3 text-sm focus:translate-y-0"
      >
        {siteNavigation.skipLink}
      </a>
      <header className="absolute inset-x-0 top-0 z-20 h-[4.5rem]">
        <div className="mx-auto flex h-full max-w-[var(--content-wide)] items-center justify-between px-[var(--page-gutter)]">
          <a href={siteNavigation.wordmarkHref} className={linkClassName}>
            {siteContent.wordmark}
          </a>
          <div className="flex items-center gap-6">
            <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
              {siteNavigation.desktop.map((item) => (
                <a key={item.href} href={item.href} className={linkClassName}>
                  {item.label}
                </a>
              ))}
            </nav>
            <nav aria-label="Primary mobile" className="flex items-center gap-5 lg:hidden">
              {siteNavigation.mobile.map((item) => (
                <a key={item.href} href={item.href} className={linkClassName}>
                  {item.label}
                </a>
              ))}
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </header>
    </>
  );
}
