"use client";
import { type ReactNode } from "react";
import * as RxDialog from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";
import { VisuallyHidden } from "./VisuallyHidden";

/* Dialog + Drawer share Radix Dialog (focus trap, Esc, restore, scroll lock, aria-modal). */

export const DialogRoot = RxDialog.Root;
export const DialogTrigger = RxDialog.Trigger;
export const DialogClose = RxDialog.Close;

const CLOSE_ICON = (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-5 w-5">
    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const panel = cva("fixed z-modal bg-surface-raised shadow-4 focus:outline-none", {
  variants: {
    variant: {
      dialog:
        "left-1/2 top-1/2 w-[calc(100vw-2rem)] max-w-base -translate-x-1/2 -translate-y-1/2 rounded-lg p-6",
      drawer: "top-0 h-full w-[min(24rem,90vw)] p-6",
    },
    side: { left: "left-0", right: "right-0" },
  },
  defaultVariants: { variant: "dialog" },
});

interface OverlayPanelProps extends VariantProps<typeof panel> {
  title: string;
  description?: string;
  hideTitle?: boolean;
  children: ReactNode;
  className?: string;
}

function OverlayPanel({
  title,
  description,
  hideTitle,
  variant,
  side,
  children,
  className,
}: OverlayPanelProps) {
  return (
    <RxDialog.Portal>
      <RxDialog.Overlay className="fixed inset-0 z-overlay bg-scrim transition-opacity duration-base" />
      <RxDialog.Content className={cn(panel({ variant, side }), className)}>
        <div className="mb-2 flex items-start justify-between gap-4">
          {hideTitle ? (
            <VisuallyHidden>
              <RxDialog.Title>{title}</RxDialog.Title>
            </VisuallyHidden>
          ) : (
            <RxDialog.Title className="font-display text-lg font-semibold text-ink">
              {title}
            </RxDialog.Title>
          )}
          <RxDialog.Close
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-ink-muted hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
          >
            {CLOSE_ICON}
          </RxDialog.Close>
        </div>
        {description ? (
          <RxDialog.Description className="mb-4 font-body text-base text-ink-muted">
            {description}
          </RxDialog.Description>
        ) : null}
        {children}
      </RxDialog.Content>
    </RxDialog.Portal>
  );
}

/* ── Dialog ───────────────────────────────────────────────────────────────────── */
export interface DialogProps {
  trigger?: ReactNode;
  title: string;
  description?: string;
  hideTitle?: boolean;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}
export function Dialog({ trigger, open, onOpenChange, ...panelProps }: DialogProps) {
  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <OverlayPanel variant="dialog" {...panelProps} />
    </DialogRoot>
  );
}

/* ── Drawer ───────────────────────────────────────────────────────────────────── */
export interface DrawerProps extends DialogProps {
  side?: "left" | "right";
}
export function Drawer({
  trigger,
  open,
  onOpenChange,
  side = "right",
  ...panelProps
}: DrawerProps) {
  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <OverlayPanel variant="drawer" side={side} {...panelProps} />
    </DialogRoot>
  );
}
