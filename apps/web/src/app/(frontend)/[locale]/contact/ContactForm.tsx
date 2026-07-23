"use client";

import { useActionState } from "react";
import { Button, Input, RadioGroup, Textarea } from "@gocsa/ui";
import { submitEnquiry, type EnquiryState } from "./actions";

const initialState: EnquiryState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-xl border-l-strong border-accent bg-surface-raised p-6 shadow-1 md:p-8">
        <p className="font-display text-lg font-semibold text-ink">Thank you</p>
        <p className="mt-2 font-body text-ink-muted">{state.message}</p>
        <p className="mt-4 font-body text-sm text-ink-muted">
          Prefer to talk now? Call us on{" "}
          <a href="tel:+61870880500" className="font-semibold text-primary hover:underline">
            (08) 7088 0500
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      {state.status === "error" && state.message ? (
        <p role="alert" className="rounded-md bg-error-surface px-4 py-3 font-body text-sm text-error">
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="First name" name="firstName" autoComplete="given-name" required error={state.fieldErrors?.firstName} />
        <Input label="Last name" name="lastName" autoComplete="family-name" />
      </div>
      <Input label="Email" name="email" type="email" autoComplete="email" required error={state.fieldErrors?.email} />
      <Input label="Phone" name="phone" type="tel" autoComplete="tel" required error={state.fieldErrors?.phone} />

      <RadioGroup
        legend="What is your enquiry about?"
        name="enquiryType"
        defaultValue="Support at Home"
        options={[
          { value: "Support at Home", label: "Support at Home" },
          { value: "Aged Care", label: "Aged care" },
          { value: "Private Care", label: "Private care" },
          { value: "Other", label: "Other" },
        ]}
      />

      <RadioGroup
        legend="Preferred language"
        name="preferredLanguage"
        defaultValue="English"
        options={[
          { value: "English", label: "English" },
          { value: "Greek", label: "Greek" },
        ]}
      />

      <Textarea
        label="Your message"
        name="message"
        rows={5}
        required
        description="Tell us a little about what you need — for yourself or someone you love."
        error={state.fieldErrors?.message}
      />

      {/* Honeypot — hidden from people, catches bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div>
        <Button type="submit" variant="accent" size="lg" isLoading={pending}>
          Send enquiry
        </Button>
        <p className="mt-3 font-body text-sm text-ink-muted">
          We'll only use your details to respond to your enquiry.
        </p>
      </div>
    </form>
  );
}
