"use client";
import { type ReactNode } from "react";
import * as RxTabs from "@radix-ui/react-tabs";
import { cn } from "../utils/cn";

export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  /** Accessible name for the tab list. */
  label: string;
  className?: string;
}

/** Tabs (Radix) — roving focus, arrow-key nav, `aria-selected`, labelled panels. */
export function Tabs({ items, defaultValue, value, onValueChange, label, className }: TabsProps) {
  return (
    <RxTabs.Root
      defaultValue={defaultValue ?? items[0]?.value}
      value={value}
      onValueChange={onValueChange}
      className={cn("flex flex-col gap-4", className)}
    >
      <RxTabs.List aria-label={label} className="flex gap-1 border-b-hair border-divider">
        {items.map((item) => (
          <RxTabs.Trigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={cn(
              "-mb-px border-b-strong border-transparent px-4 py-2 font-body text-base font-medium text-ink-muted transition-colors duration-fast",
              "hover:text-ink data-[state=active]:border-primary data-[state=active]:text-primary",
              "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus disabled:opacity-disabled",
            )}
          >
            {item.label}
          </RxTabs.Trigger>
        ))}
      </RxTabs.List>
      {items.map((item) => (
        <RxTabs.Content
          key={item.value}
          value={item.value}
          className="font-body text-base text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
        >
          {item.content}
        </RxTabs.Content>
      ))}
    </RxTabs.Root>
  );
}
