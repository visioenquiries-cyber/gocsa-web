"use client";
import { forwardRef, useId, type ReactNode } from "react";
import * as RxCheckbox from "@radix-ui/react-checkbox";
import * as RxRadio from "@radix-ui/react-radio-group";
import * as RxSwitch from "@radix-ui/react-switch";
import { cn } from "../utils/cn";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const CHECK_ICON = (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
    <path
      d="M4 10.5l4 4 8-9"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ── Checkbox ─────────────────────────────────────────────────────────────────── */
export interface CheckboxProps extends Omit<RxCheckbox.CheckboxProps, "children"> {
  label: ReactNode;
  description?: string;
}
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ label, description, id, className, ...props }, ref) => {
    const auto = useId();
    const fieldId = id ?? auto;
    const descId = `${fieldId}-description`;
    return (
      <div className="flex items-start gap-3">
        <RxCheckbox.Root
          ref={ref}
          id={fieldId}
          aria-labelledby={`${fieldId}-label`}
          aria-describedby={description ? descId : undefined}
          className={cn(
            "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-sm border-base border-border bg-surface-raised text-on-primary transition-colors duration-fast",
            "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
            "disabled:pointer-events-none disabled:opacity-disabled",
            FOCUS_RING,
            className,
          )}
          {...props}
        >
          <RxCheckbox.Indicator>{CHECK_ICON}</RxCheckbox.Indicator>
        </RxCheckbox.Root>
        <div className="flex flex-col gap-1">
          <label id={`${fieldId}-label`} htmlFor={fieldId} className="font-body text-base text-ink">
            {label}
          </label>
          {description ? (
            <span id={descId} className="font-body text-sm text-ink-muted">
              {description}
            </span>
          ) : null}
        </div>
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";

/* ── Radio group ──────────────────────────────────────────────────────────────── */
export interface RadioOption {
  value: string;
  label: ReactNode;
  description?: string;
  disabled?: boolean;
}
export interface RadioGroupProps extends Omit<RxRadio.RadioGroupProps, "children"> {
  /** Group label — rendered as a fieldset legend for grouped semantics. */
  legend: string;
  options: RadioOption[];
}
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ legend, options, className, ...props }, ref) => (
    <fieldset className="flex flex-col gap-3 border-0 p-0">
      <legend className="mb-1 font-body text-sm font-medium text-ink">{legend}</legend>
      <RxRadio.Root
        ref={ref}
        aria-label={legend}
        className={cn("flex flex-col gap-3", className)}
        {...props}
      >
        {options.map((opt) => {
          const optId = `${props.name ?? legend}-${opt.value}`;
          return (
            <div key={opt.value} className="flex items-start gap-3">
              <RxRadio.Item
                id={optId}
                value={opt.value}
                disabled={opt.disabled}
                className={cn(
                  "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-pill border-base border-border bg-surface-raised transition-colors duration-fast",
                  "data-[state=checked]:border-primary disabled:pointer-events-none disabled:opacity-disabled",
                  FOCUS_RING,
                )}
              >
                <RxRadio.Indicator className="h-2.5 w-2.5 rounded-pill bg-primary" />
              </RxRadio.Item>
              <div className="flex flex-col gap-1">
                <label htmlFor={optId} className="font-body text-base text-ink">
                  {opt.label}
                </label>
                {opt.description ? (
                  <span className="font-body text-sm text-ink-muted">{opt.description}</span>
                ) : null}
              </div>
            </div>
          );
        })}
      </RxRadio.Root>
    </fieldset>
  ),
);
RadioGroup.displayName = "RadioGroup";

/* ── Switch ───────────────────────────────────────────────────────────────────── */
export interface SwitchProps extends Omit<RxSwitch.SwitchProps, "children"> {
  label: string;
}
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ label, id, className, ...props }, ref) => {
    const auto = useId();
    const fieldId = id ?? auto;
    return (
      <div className="flex items-center gap-3">
        <RxSwitch.Root
          ref={ref}
          id={fieldId}
          aria-labelledby={`${fieldId}-label`}
          className={cn(
            "relative h-6 w-11 shrink-0 rounded-pill border-hair border-transparent bg-border transition-colors duration-fast",
            "data-[state=checked]:bg-primary disabled:pointer-events-none disabled:opacity-disabled",
            FOCUS_RING,
            className,
          )}
          {...props}
        >
          <RxSwitch.Thumb className="block h-5 w-5 translate-x-0.5 rounded-pill bg-surface-raised shadow-1 transition-transform duration-fast data-[state=checked]:translate-x-[22px]" />
        </RxSwitch.Root>
        <label id={`${fieldId}-label`} htmlFor={fieldId} className="font-body text-base text-ink">
          {label}
        </label>
      </div>
    );
  },
);
Switch.displayName = "Switch";
