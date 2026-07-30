import { describe, expect, it } from "vitest";

import { cn } from "@/lib/cn";

describe("cn", () => {
  it("keeps the last conflicting Tailwind class", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("includes only truthy conditional classes", () => {
    expect(
      cn("base", false && "hidden", {
        active: true,
        disabled: false,
      }),
    ).toBe("base active");
  });

  it("concatenates ordinary classes from supported inputs", () => {
    expect(cn("alpha", ["beta", "gamma"])).toBe("alpha beta gamma");
  });
});
