import type { Metadata } from "next";

import { RootDocument } from "@/components/layout/root-document";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { deploymentRobotsMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: "Not found",
  ...deploymentRobotsMetadata(),
};

/**
 * Unmatched-URL 404 for split root layouts. Bypasses route layouts, so it owns
 * the document shell and an explicit metadataBase for static export.
 */
export default function GlobalNotFound() {
  return (
    <RootDocument locale="en">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 px-6 py-24">
        <h1 className="text-3xl font-semibold tracking-tight">Not found</h1>
        <p className="mt-3 text-[var(--color-text-muted)]">
          The page you requested does not exist.
        </p>
      </main>
      <SiteFooter />
    </RootDocument>
  );
}
