"use server";

import { ConsoleEmailProvider } from "@gocsa/platform";

/** Where enquiries are routed (from GOCSA's contact details). */
const ENQUIRY_INBOX = "enquire@gocsacommunitycare.com.au";

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

  try {
    // Production swaps this for the env-selected provider via createProviders() (DEC-021).
    const email_provider = new ConsoleEmailProvider({ defaultFrom: "website@gocsacommunitycare.com.au" });
    await email_provider.send({
      to: ENQUIRY_INBOX,
      replyTo: email,
      subject: `Website enquiry — ${enquiryType} — ${fullName}`,
      text,
      locale: preferredLanguage === "Greek" ? "el" : "en",
    });
  } catch {
    return {
      status: "error",
      message: "Sorry — something went wrong sending your message. Please call us on (08) 7088 0500.",
    };
  }

  return {
    status: "success",
    message: "Thank you — your enquiry has been received. Our team will be in touch soon.",
  };
}
