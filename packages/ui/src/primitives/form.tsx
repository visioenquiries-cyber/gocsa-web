"use client";
import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "../utils/cn";

/* Shared, accessible field scaffolding — one implementation, no duplicated wiring. */

const FIELD_BASE =
  "w-full rounded-sm border-base border-border bg-surface-raised px-3 font-body text-base text-ink " +
  "placeholder:text-ink-muted transition-colors duration-fast ease-standard " +
  "focus-visible:outline-none focus-visible:border-focus focus-visible:ring-[3px] focus-visible:ring-focus " +
  "disabled:pointer-events-none disabled:opacity-disabled " +
  "aria-[invalid=true]:border-error aria-[invalid=true]:focus-visible:ring-error";

interface FieldIds {
  id: string;
  descriptionId: string;
  errorId: string;
}

function useFieldIds(providedId?: string): FieldIds {
  const auto = useId();
  const id = providedId ?? auto;
  return { id, descriptionId: `${id}-description`, errorId: `${id}-error` };
}

interface FieldShellProps {
  ids: FieldIds;
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

/** Label + control + description/error, wired for screen readers. */
function FieldShell({ ids, label, description, error, required, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={ids.id} className="font-body text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-ink-muted"> (required)</span> : null}
      </label>
      {children}
      {description ? (
        <p id={ids.descriptionId} className="font-body text-sm text-ink-muted">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={ids.errorId} className="font-body text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(
  ids: FieldIds,
  hasDescription: boolean,
  hasError: boolean,
): string | undefined {
  const parts: string[] = [];
  if (hasDescription) parts.push(ids.descriptionId);
  if (hasError) parts.push(ids.errorId);
  return parts.length ? parts.join(" ") : undefined;
}

/* ── Input ───────────────────────────────────────────────────────────────────── */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Always-visible label (never placeholder-as-label — docs/09 §16, docs/11 §14). */
  label: string;
  description?: string;
  error?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, description, error, required, id, className, ...props }, ref) => {
    const ids = useFieldIds(id);
    return (
      <FieldShell
        ids={ids}
        label={label}
        description={description}
        error={error}
        required={required}
      >
        <input
          ref={ref}
          id={ids.id}
          className={cn(FIELD_BASE, "h-field", className)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(ids, !!description, !!error)}
          aria-required={required || undefined}
          required={required}
          {...props}
        />
      </FieldShell>
    );
  },
);
Input.displayName = "Input";

/* ── Textarea ────────────────────────────────────────────────────────────────── */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  description?: string;
  error?: string;
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, description, error, required, id, className, rows = 4, ...props }, ref) => {
    const ids = useFieldIds(id);
    return (
      <FieldShell
        ids={ids}
        label={label}
        description={description}
        error={error}
        required={required}
      >
        <textarea
          ref={ref}
          id={ids.id}
          rows={rows}
          className={cn(FIELD_BASE, "min-h-24 py-3", className)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(ids, !!description, !!error)}
          aria-required={required || undefined}
          required={required}
          {...props}
        />
      </FieldShell>
    );
  },
);
Textarea.displayName = "Textarea";

export { FIELD_BASE, useFieldIds, FieldShell, describedBy };
export type { FieldIds };
