import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import { toHaveNoViolations } from "jest-axe";

// Register the axe matcher for every test (docs/19 — accessibility is a gate).
expect.extend(toHaveNoViolations);

// jsdom lacks these — Radix uses them for positioning / scroll-lock.
const globalRef = globalThis as unknown as Record<string, unknown>;

if (!globalRef.matchMedia) {
  globalRef.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

if (!globalRef.ResizeObserver) {
  globalRef.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
