"use client";
import { type ReactNode } from "react";
import * as RxPopover from "@radix-ui/react-popover";
import { cn } from "../utils/cn";

export interface PopoverProps {
  /** The trigger element (a Button/IconButton). */
  trigger: ReactNode;
  children: ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Popover — anchored interactive panel (Radix). Focus moves in on open, Esc closes
 * and restores focus, outside-click dismisses, collision-aware positioning.
 */
export function Popover({
  trigger,
  children,
  align = "center",
  side = "bottom",
  className,
  open,
  onOpenChange,
}: PopoverProps) {
  return (
    <RxPopover.Root open={open} onOpenChange={onOpenChange}>
      <RxPopover.Trigger asChild>{trigger}</RxPopover.Trigger>
      <RxPopover.Portal>
        <RxPopover.Content
          align={align}
          side={side}
          sideOffset={8}
          collisionPadding={16}
          className={cn(
            "z-popover w-72 max-w-[calc(100vw-2rem)] rounded-md border-hair border-divider bg-surface-raised p-4 shadow-3 focus:outline-none",
            className,
          )}
        >
          {children}
          <RxPopover.Arrow className="fill-[var(--color-surface-raised)]" />
        </RxPopover.Content>
      </RxPopover.Portal>
    </RxPopover.Root>
  );
}
