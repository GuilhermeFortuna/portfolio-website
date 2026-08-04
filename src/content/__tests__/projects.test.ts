import { describe, expect, it } from "vitest";

import { projects } from "@/content/projects";

const expectedProjects = [
  { slug: "aegis", index: "01", category: "Fraud intelligence" },
  { slug: "q", index: "02", category: "Quantitative systems" },
  {
    slug: "gosigapp",
    index: "03",
    category: "Public-sector automation",
  },
  { slug: "nexo-dental", index: "04", category: "Clinical software" },
] as const;

describe("project content contract", () => {
  it("keeps exactly four stable project records in approved order", () => {
    expect(projects).toHaveLength(4);
    expect(
      projects.map(({ slug, index, category }) => ({
        slug,
        index,
        category,
      })),
    ).toEqual(expectedProjects);
  });

  it("uses unique project slugs and display indexes", () => {
    expect(new Set(projects.map(({ slug }) => slug)).size).toBe(
      projects.length,
    );
    expect(new Set(projects.map(({ index }) => index)).size).toBe(
      projects.length,
    );
  });

  it("provides non-empty authored fields for every project", () => {
    for (const project of projects) {
      expect(project.slug.trim()).not.toBe("");
      expect(project.index.trim()).not.toBe("");
      expect(project.name.trim()).not.toBe("");
      expect(project.category.trim()).not.toBe("");
      expect(project.summary.trim()).not.toBe("");
    }
  });

  it("links only the projects whose case-study route exists", () => {
    // Aegis, Quant, and gosigapp are published. Nexo Dental stays null rather than
    // pointing at a route that would 404.
    expect(
      projects.map(({ slug, href }) => [slug, href]),
    ).toEqual([
      ["aegis", "/work/aegis"],
      ["q", "/work/q"],
      ["gosigapp", "/work/gosigapp"],
      ["nexo-dental", null],
    ]);
  });

  it("uses the public display name Quant for the q slug", () => {
    expect(projects[1].name).toBe("Quant");
  });

  it("keeps every project destination a root-relative route", () => {
    for (const { href } of projects) {
      if (href === null) {
        continue;
      }
      expect(href.startsWith("/work/")).toBe(true);
    }
  });
});
