import { describe, expect, expectTypeOf, it } from "vitest";

import type { Project, Technology } from "@/types/content";

describe("content types", () => {
  it("accepts a compile-time-safe project fixture", () => {
    const project = {
      slug: "example",
      index: "01",
      name: "Example",
      category: "Example category",
      summary: "An authored project summary.",
      href: null,
    } satisfies Project;

    expectTypeOf(project).toMatchTypeOf<Project>();
    expect(project.href).toBeNull();
  });

  it("accepts a compile-time-safe technology fixture", () => {
    const technology = { name: "TypeScript" } satisfies Technology;

    expectTypeOf(technology).toMatchTypeOf<Technology>();
    expect(technology.name).toBe("TypeScript");
  });
});
