import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  // Reuse the repository's TypeScript `@/*` path aliases so tests import
  // modules exactly like application code does (native Vite resolution).
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    // `vitest run` (without --passWithNoTests) already exits non-zero when no
    // test files are discovered; the scripts rely on that default.
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      // Measure only first-party TypeScript source under src/.
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        // Test helpers: infrastructure, not code under test.
        "src/test/**",
        // Type-only declarations: no executable statements to cover.
        "src/types/**",
        // Copied/adapted third-party visual-effect implementations. They render
        // WebGL/canvas and cannot run meaningfully under jsdom.
        "src/components/effects/**",
        "src/components/ui/logo-loop.tsx",
        // Next.js App Router entry files (metadata, fonts, page composition).
        // These are framework-owned wiring exercised by the build, not units.
        "src/app/**",
      ],
    },
  },
});
