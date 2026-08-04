import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Shared header's LanguageSwitcher uses App Router hooks. Page tests render
// SiteHeader under jsdom without a Next router tree, so stub navigation once.
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
  notFound: vi.fn(),
  redirect: vi.fn(),
}));

// No browser API shim is registered yet: jsdom covers everything the current
// smoke test needs. Add a shim here only when a real test requires it, and
// stub it with `vi.stubGlobal` so the reset below tears it down.

afterEach(() => {
  // Unmount React trees and remove their DOM so tests never leak into
  // each other.
  cleanup();
  // Reset any globals/mocks a test stubbed, keeping each test deterministic.
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
