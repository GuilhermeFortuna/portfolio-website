import { fireEvent, render, screen } from "@/test/render";
import { describe, expect, it } from "vitest";

import { MagicCard } from "@/components/ui/magic-card";

describe("MagicCard", () => {
  it("renders its children inside a card surface", () => {
    const { container } = render(
      <MagicCard animated={false}>
        <p>Inside</p>
      </MagicCard>,
    );

    const root = container.querySelector("[data-magic-card]");
    expect(root).toBeInTheDocument();
    expect(screen.getByText("Inside")).toBeInTheDocument();
    expect(root?.querySelector("[data-magic-card-content]")).toContainElement(
      screen.getByText("Inside"),
    );
  });

  it("forwards className and data attributes to the root", () => {
    const { container } = render(
      <MagicCard animated={false} className="custom" data-testid="card">
        x
      </MagicCard>,
    );

    const root = container.querySelector("[data-magic-card]");
    expect(root).toHaveClass("magic-card", "custom");
    expect(root).toHaveAttribute("data-testid", "card");
  });

  it("is static without spotlight or beam when not animated", () => {
    const { container } = render(
      <MagicCard animated={false} beam>
        x
      </MagicCard>,
    );

    const root = container.querySelector("[data-magic-card]");
    expect(root).toHaveAttribute("data-magic-card-animated", "false");
    expect(container.querySelector("[data-magic-card-spotlight]")).toBeNull();
    expect(container.querySelector("[data-magic-card-beam]")).toBeNull();
  });

  it("tracks the pointer and shows a decorative beam when animated", () => {
    const { container } = render(
      <MagicCard animated beam>
        x
      </MagicCard>,
    );

    const root = container.querySelector<HTMLElement>("[data-magic-card]")!;
    expect(root).toHaveAttribute("data-magic-card-animated", "true");

    const spotlight = container.querySelector("[data-magic-card-spotlight]");
    expect(spotlight).toHaveAttribute("aria-hidden", "true");

    const beam = container.querySelector("[data-magic-card-beam]");
    expect(beam).toHaveAttribute("aria-hidden", "true");

    root.getBoundingClientRect = () =>
      ({ left: 100, top: 50, width: 300, height: 200 }) as DOMRect;
    fireEvent.pointerMove(root, { clientX: 160, clientY: 90 });
    expect(root.style.getPropertyValue("--magic-card-x")).toBe("60px");
    expect(root.style.getPropertyValue("--magic-card-y")).toBe("40px");
  });

  it("omits the beam when animated but beam is not requested", () => {
    const { container } = render(<MagicCard animated>x</MagicCard>);

    expect(container.querySelector("[data-magic-card-spotlight]")).toBeInTheDocument();
    expect(container.querySelector("[data-magic-card-beam]")).toBeNull();
  });
});
