"use client";

import { useLocale } from "@/components/i18n/language-context";
import { getFooterContent } from "@/content/site";

export function SiteFooter() {
  const locale = useLocale();
  const footerContent = getFooterContent(locale);

  return (
    <footer className="mx-auto flex w-full max-w-[var(--content-wide)] flex-col gap-4 border-t border-[var(--color-line)] px-[var(--page-gutter)] py-8 [font-family:var(--font-geist-mono)] text-[0.6875rem] text-[var(--color-text-muted)] md:flex-row md:items-center md:justify-between">
      <p>{footerContent.copyright}</p>
      <a href="#top" className="inline-flex min-h-11 items-center self-start">
        {footerContent.backToTop}
      </a>
    </footer>
  );
}
