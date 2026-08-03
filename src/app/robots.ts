import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

// Resolve the site origin from env on each request so deploy hosts stay accurate.
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
