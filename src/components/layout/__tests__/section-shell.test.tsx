import { describe, expect, it } from "vitest";

import { SectionShell } from "@/components/layout/section-shell";
import { render, screen, within } from "@/test/render";

describe("SectionShell", () => {
  it("creates a named landmark that owns the provided heading and children", () => {
    render(
      <SectionShell id="example" label="EXAMPLE" labelledBy="example-title">
        <h2 id="example-title">Example heading</h2>
        <p>Example body</p>
      </SectionShell>,
    );

    const region = screen.getByRole("region", { name: "Example heading" });
    expect(region).toHaveAttribute("id", "example");
    expect(region).toHaveAttribute("aria-labelledby", "example-title");

    expect(within(region).getByText("EXAMPLE")).toBeInTheDocument();
    expect(
      within(region).getByRole("heading", {
        level: 2,
        name: "Example heading",
      }),
    ).toBeInTheDocument();
    expect(within(region).getByText("Example body")).toBeInTheDocument();
  });

  it("omits the eyebrow when no label is provided", () => {
    render(
      <SectionShell id="plain" labelledBy="plain-title">
        <h2 id="plain-title">Plain heading</h2>
      </SectionShell>,
    );

    const region = screen.getByRole("region", { name: "Plain heading" });
    expect(region).toHaveAttribute("id", "plain");
    expect(region.querySelector("p")).toBeNull();
  });
});
