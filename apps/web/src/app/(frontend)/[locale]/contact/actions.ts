"use server";

import { createEmailProvider } from "@gocsa/platform";
import { getEnv, isProduction } from "@gocsa/env";

/** Where enquiries are routed. Overridable per-environment via ENQUIRY_INBOX. */
const DEFAULT_ENQUIRY_INBOX = "admin@gocsacc.org.au";

/** Shown whenever we cannot guarantee the enquiry reached GOCSA. */
const CALL_US_INSTEAD =
  "Sorry — we couldn't send your message just now. Please call us on (08) 7088 0500 or email admin@gocsacc.org.au and we'll help straight away.";

export interface EnquiryState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Handle a contact enquiry. Validates server-side, then routes the message to the GOCSA
 * inbox via the EmailProvider abstraction. In preview (no email credentials) this uses the
 * ConsoleEmailProvider, which logs the enquiry instead of sending — so nothing real is
 * dispatched until a production provider (SMTP/Resend/SES) is configured by env (DEC-021).
 */
export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const firstName = clean(formData.get("firstName"));
  const lastName = clean(formData.get("lastName"));
  const email = clean(formData.get("email"));
  const phone = clean(formData.get("phone"));
  const enquiryType = clean(formData.get("enquiryType")) || "General";
  const message = clean(formData.get("message"));
  const preferredLanguage = clean(formData.get("preferredLanguage")) || "English";
  // Honeypot — bots fill hidden fields; humans don't.
  if (clean(formData.get("company"))) {
    return { status: "success", message: "Thank you — your enquiry has been received." };
  }

  const fieldErrors: Record<string, string> = {};
  if (!firstName) fieldErrors.firstName = "Please tell us your name.";
  if (!email) fieldErrors.email = "Please add an email address.";
  else if (!EMAIL_RE.test(email)) fieldErrors.email = "Please check this email address.";
  if (!phone) fieldErrors.phone = "Please add a phone number.";
  if (!message) fieldErrors.message = "Please add a short message.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const text = [
    `New enquiry from the GOCSA Community Care website`,
    ``,
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Enquiry about: ${enquiryType}`,
    `Preferred language: ${preferredLanguage}`,
    ``,
    `Message:`,
    message,
  ].join("\n");

  const env = getEnv();
  const isGreek = preferredLanguage === "Greek";
  const inbox =
    (isGreek ? env.ENQUIRY_INBOX_EL : env.ENQUIRY_INBOX) ??
    env.ENQUIRY_INBOX ??
    DEFAULT_ENQUIRY_INBOX;

  try {
    const emailProvider = createEmailProvider(env);

    // Never tell someone their enquiry was received when the configured adapter only logs.
    // Someone asking for aged care must not be left waiting for a reply that can't come.
    if (!emailProvider.delivers) {
      if (isProduction(env)) {
        console.error(
          "[enquiry] Email provider cannot deliver (EMAIL_PROVIDER=%s). Enquiry NOT sent.",
          emailProvider.name,
        );
        return { status: "error", message: CALL_US_INSTEAD };
      }
      // Non-production: log it so the form stays testable locally.
      console.warn("[enquiry] Non-production environment — logging instead of sending.");
    }

    await emailProvider.send({
      to: inbox,
      replyTo: email,
      subject: `Website enquiry — ${enquiryType} — ${fullName}`,
      text,
      locale: isGreek ? "el" : "en",
    });
  } catch (err) {
    console.error("[enquiry] Failed to send enquiry:", err);
    return { status: "error", message: CALL_US_INSTEAD };
  }

  return {
    status: "success",
    message: "Thank you — your enquiry has been received. Our team will be in touch soon.",
  };
}
