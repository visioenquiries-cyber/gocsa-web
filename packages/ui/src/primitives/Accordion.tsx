"use client";
import { type ReactNode } from "react";
import * as RxAccordion from "@radix-ui/react-accordion";
import { cn } from "../utils/cn";

export interface AccordionItem {
  value: string;
  header: string;
  content: ReactNode;
  disabled?: boolean;
}

export type AccordionProps =
  | ({ type: "single"; collapsible?: boolean; defaultValue?: string } & AccordionCommon)
  | ({ type: "multiple"; defaultValue?: string[] } & AccordionCommon);

interface AccordionCommon {
  items: AccordionItem[];
  className?: string;
  /** Heading level for item headers (keeps document outline correct). */
  headingLevel?: 2 | 3 | 4;
}

const CHEVRON = (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    className="h-5 w-5 shrink-0 transition-transform duration-fast group-data-[state=open]:rotate-180"
  >
    <path
      d="M6 8l4 4 4-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Accordion (Radix) — headers are real buttons inside headings with `aria-expanded`,
 * full keyboard support. Reduced-motion collapses the reveal (token durations → 0).
 * Do not hide critical info in collapsed panels (docs/11 §4).
 */
export function Accordion({ items, className, headingLevel = 3, ...rootProps }: AccordionProps) {
  return (
    <RxAccordion.Root
      className={cn(
        "flex flex-col divide-y divide-divider border-y-hair border-divider",
        className,
      )}
      {...(rootProps as RxAccordion.AccordionSingleProps)}
    >
      {items.map((item) => (
        <RxAccordion.Item key={item.value} value={item.value} disabled={item.disabled}>
          <RxAccordion.Header asChild>
            <div role="heading" aria-level={headingLevel}>
              <RxAccordion.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left font-body text-base font-medium text-ink transition-colors duration-fast hover:text-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus disabled:opacity-disabled">
                {item.header}
                {CHEVRON}
              </RxAccordion.Trigger>
            </div>
          </RxAccordion.Header>
          <RxAccordion.Content className="overflow-hidden pb-4 font-body text-base text-ink">
            {item.content}
          </RxAccordion.Content>
        </RxAccordion.Item>
      ))}
    </RxAccordion.Root>
  );
}
