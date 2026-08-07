/**
 * Absolute site origin for metadata, sitemap, and robots.
 *
 * Deploy builds (`DEPLOY_ENV=staging|production`) require an explicit HTTPS
 * `SITE_URL` or `NEXT_PUBLIC_SITE_URL`. Local/unlabelled builds keep localhost
 * and Vercel host fallbacks.
 */
export function getSiteUrl(): URL {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim();
  const deployEnv = process.env.DEPLOY_ENV?.trim();
  const isDeployBuild =
    deployEnv === "staging" || deployEnv === "production";

  if (isDeployBuild) {
    if (!configured) {
      throw new Error(
        `DEPLOY_ENV=${deployEnv} requires SITE_URL or NEXT_PUBLIC_SITE_URL to be set to an https origin.`,
      );
    }

    let url: URL;
    try {
      url = new URL(configured.replace(/\/+$/, ""));
    } catch {
      throw new Error(
        `DEPLOY_ENV=${deployEnv} requires SITE_URL or NEXT_PUBLIC_SITE_URL to be a valid https origin (received "${configured}").`,
      );
    }

    if (url.protocol !== "https:") {
      throw new Error(
        `DEPLOY_ENV=${deployEnv} requires SITE_URL or NEXT_PUBLIC_SITE_URL to use https (received "${configured}").`,
      );
    }

    return url;
  }

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
