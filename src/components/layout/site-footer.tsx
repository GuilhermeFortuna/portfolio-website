import { footerContent } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto flex w-full max-w-[var(--content-wide)] items-center justify-between px-[var(--page-gutter)] py-8 text-sm text-[var(--color-text-muted)]">
      <p>{footerContent.copyright}</p>
      <a href="#top" className="inline-flex min-h-11 items-center">
        {footerContent.backToTop}
      </a>
    </footer>
  );
}
