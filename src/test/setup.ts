import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

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
