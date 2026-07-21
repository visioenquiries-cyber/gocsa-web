"use client";
import { type ReactNode } from "react";
import * as RxTooltip from "@radix-ui/react-tooltip";
import { cn } from "../utils/cn";

/** Wrap the app (or a subtree) once so tooltips share timing. */
export function TooltipProvider({ children }: { children: ReactNode }) {
  return <RxTooltip.Provider delayDuration={300}>{children}</RxTooltip.Provider>;
}

export interface TooltipProps {
  /** Trigger element — must be focusable so the tooltip is keyboard-reachable. */
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

/**
 * Tooltip — brief text on hover AND focus (never hover-only). Not for interactive
 * content or essential-only information (docs/11 §Tooltip).
 */
export function Tooltip({ children, content, side = "top", className }: TooltipProps) {
  return (
    <RxTooltip.Root>
      <RxTooltip.Trigger asChild>{children}</RxTooltip.Trigger>
      <RxTooltip.Portal>
        <RxTooltip.Content
          side={side}
          sideOffset={6}
          className={cn(
            "z-tooltip max-w-xs rounded-sm bg-neutral-900 px-3 py-1.5 font-body text-sm text-white shadow-2",
            className,
          )}
        >
          {content}
          <RxTooltip.Arrow className="fill-[var(--color-neutral-900)]" />
        </RxTooltip.Content>
      </RxTooltip.Portal>
    </RxTooltip.Root>
  );
}
