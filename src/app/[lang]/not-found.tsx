import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function PrefixedLocaleNotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 px-6 py-24">
        <h1 className="text-3xl font-semibold tracking-tight">Not found</h1>
        <p className="mt-3 text-[var(--color-text-muted)]">
          The page you requested does not exist.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
