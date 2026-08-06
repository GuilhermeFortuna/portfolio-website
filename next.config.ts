import type { NextConfig } from "next";

const isExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" as const, trailingSlash: true } : {}),
  experimental: {
    // Required for a document-level 404 when using multiple root layouts.
    globalNotFound: true,
    // Next 16 persists Turbopack's dev graph in .next by default. A corrupted
    // graph reproduced an unbounded Node heap leak in this project, while a
    // cold graph remained stable. Prefer reliable dev starts over warm-cache
    // startup speed until the upstream persistence failure is resolved.
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
