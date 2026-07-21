"use client";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import * as RxToast from "@radix-ui/react-toast";
import { cn } from "../utils/cn";

type ToastTone = "info" | "success" | "warning" | "error";

export interface ToastOptions {
  title: string;
  description?: string;
  tone?: ToastTone;
  duration?: number;
}
interface ToastItem extends ToastOptions {
  id: string;
}
interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

const TONE_BORDER: Record<ToastTone, string> = {
  info: "border-l-info",
  success: "border-l-success",
  warning: "border-l-warning",
  error: "border-l-error",
};

/**
 * ToastProvider — mounts the Radix Toast region and exposes `useToast().toast(...)`.
 * Errors announce assertively (`role=alert`), others politely (`role=status`).
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((current) => [...current, { id, tone: "info", ...options }]);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      <RxToast.Provider swipeDirection="right">
        {children}
        {toasts.map((t) => (
          <RxToast.Root
            key={t.id}
            duration={t.duration ?? 6000}
            type={t.tone === "error" ? "foreground" : "background"}
            onOpenChange={(open) => {
              if (!open) setToasts((cur) => cur.filter((x) => x.id !== t.id));
            }}
            className={cn(
              "flex items-start gap-3 rounded-md border-l-strong bg-surface-raised p-4 shadow-3",
              TONE_BORDER[t.tone ?? "info"],
            )}
          >
            <div className="flex flex-col gap-1">
              <RxToast.Title className="font-body text-base font-semibold text-ink">
                {t.title}
              </RxToast.Title>
              {t.description ? (
                <RxToast.Description className="font-body text-sm text-ink-muted">
                  {t.description}
                </RxToast.Description>
              ) : null}
            </div>
            <RxToast.Close
              aria-label="Dismiss"
              className="ml-auto grid h-8 w-8 place-items-center rounded-md text-ink-muted hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </RxToast.Close>
          </RxToast.Root>
        ))}
        <RxToast.Viewport className="fixed bottom-0 right-0 z-toast flex w-[min(24rem,100vw)] flex-col gap-2 p-4 outline-none" />
      </RxToast.Provider>
    </ToastContext.Provider>
  );
}
