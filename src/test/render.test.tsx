import { describe, expect, it } from "vitest";

import { cn } from "@/lib/cn";

import { render, screen } from "./render";

describe("test foundation smoke", () => {
  it("renders through the helper and resolves the @/ alias and jest-dom matchers", () => {
    render(<div className={cn("a", "b")}>foundation</div>);

    const node = screen.getByText("foundation");
    // jest-dom matcher: proves setup registered the custom matchers.
    expect(node).toBeInTheDocument();
    // Proves the `@/` alias resolved to the real utility.
    expect(node).toHaveClass("a", "b");
  });

  it("starts from a clean DOM, proving afterEach cleanup ran", () => {
    // If cleanup did not run, the previous test's node would still be mounted.
    expect(screen.queryByText("foundation")).not.toBeInTheDocument();
    expect(document.body).toBeEmptyDOMElement();
  });
});
