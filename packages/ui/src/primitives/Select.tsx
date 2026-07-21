"use client";
import { forwardRef, useId, type ReactNode } from "react";
import * as RxSelect from "@radix-ui/react-select";
import { cn } from "../utils/cn";

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  description?: string;
  error?: string;
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  onValueChange?: (value: string) => void;
}

const CHEVRON = (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-5 w-5">
    <path
      d="M6 8l4 4 4-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Accessible select (Radix listbox) behind the GOCSA API. Full keyboard + SR support. */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    { label, options, placeholder = "Select…", description, error, id, required, ...props },
    ref,
  ) => {
    const auto = useId();
    const fieldId = id ?? auto;
    const descId = `${fieldId}-description`;
    const errId = `${fieldId}-error`;
    const describedBy =
      [description ? descId : null, error ? errId : null].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex flex-col gap-2">
        <label
          id={`${fieldId}-label`}
          htmlFor={fieldId}
          className="font-body text-sm font-medium text-ink"
        >
          {label}
          {required ? <span className="text-ink-muted"> (required)</span> : null}
        </label>
        <RxSelect.Root {...props}>
          <RxSelect.Trigger
            ref={ref}
            id={fieldId}
            aria-labelledby={`${fieldId}-label`}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              "inline-flex h-field w-full items-center justify-between gap-2 rounded-sm border-base border-border bg-surface-raised px-3 font-body text-base text-ink",
              "transition-colors duration-fast focus-visible:outline-none focus-visible:border-focus focus-visible:ring-[3px] focus-visible:ring-focus",
              "disabled:pointer-events-none disabled:opacity-disabled aria-[invalid=true]:border-error",
            )}
          >
            <RxSelect.Value placeholder={placeholder} />
            <RxSelect.Icon className="text-ink-muted">{CHEVRON}</RxSelect.Icon>
          </RxSelect.Trigger>
          <RxSelect.Portal>
            <RxSelect.Content
              position="popper"
              sideOffset={4}
              className="z-dropdown max-h-64 overflow-hidden rounded-md border-hair border-divider bg-surface-raised shadow-3"
            >
              <RxSelect.Viewport className="p-1">
                {options.map((opt) => (
                  <RxSelect.Item
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className={cn(
                      "flex cursor-pointer select-none items-center rounded-sm px-3 py-2 font-body text-base text-ink outline-none",
                      "data-[highlighted]:bg-surface data-[state=checked]:font-semibold data-[disabled]:opacity-disabled",
                    )}
                  >
                    <RxSelect.ItemText>{opt.label}</RxSelect.ItemText>
                  </RxSelect.Item>
                ))}
              </RxSelect.Viewport>
            </RxSelect.Content>
          </RxSelect.Portal>
        </RxSelect.Root>
        {description ? (
          <p id={descId} className="font-body text-sm text-ink-muted">
            {description}
          </p>
        ) : null}
        {error ? (
          <p id={errId} role="alert" className="font-body text-sm text-error">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
Select.displayName = "Select";
