/**
 * Absolute site origin for metadata, sitemap, and robots.
 *
 * Prefer `NEXT_PUBLIC_SITE_URL` (or `SITE_URL`) in production. Falls back to
 * Vercel-provided hosts, then local development.
 */
export function getSiteUrl(): URL {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim();

  if (configured) {
    return new URL(configured.replace(/\/+$/, ""));
  }

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();

  if (vercelHost) {
    const host = vercelHost.replace(/^https?:\/\//, "").replace(/\/+$/, "");
    return new URL(`https://${host}`);
  }

  return new URL("http://localhost:3000");
}
