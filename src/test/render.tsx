import { render as rtlRender, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

/**
 * Thin wrapper over React Testing Library's `render`.
 *
 * It intentionally adds no providers: no current component needs one. Add a
 * wrapper here only when a component genuinely depends on shared context.
 */
export function render(ui: ReactElement, options?: RenderOptions) {
  return rtlRender(ui, options);
}

export * from "@testing-library/react";
