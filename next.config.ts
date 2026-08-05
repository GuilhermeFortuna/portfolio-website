import type { NextConfig } from "next";

const isExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" as const, trailingSlash: true } : {}),
  experimental: {
    // Required for a document-level 404 when using multiple root layouts.
    globalNotFound: true,
  },
};

export default nextConfig;
