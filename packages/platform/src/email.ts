/**
 * EmailProvider — transactional email abstraction (DEC-021).
 * Adapters: ConsoleEmailProvider (dev), SMTP / Resend / SES (deploy).
 * Enquiry routing (docs/09 §16, journey J4) uses this to route EN/EL to the
 * correct inbox. Domain authentication (SPF/DKIM/DMARC) is a deployment concern.
 */
import type { Locale } from "./types";

export interface EmailMessage {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  replyTo?: string;
  locale?: Locale;
}

export interface EmailProvider {
  readonly name: string;
  /**
   * True only when this adapter actually dispatches mail. Callers MUST check this before
   * telling a person their message was received — a development adapter that only logs
   * would otherwise silently swallow real enquiries behind a success message.
   */
  readonly delivers: boolean;
  send(message: EmailMessage): Promise<{ id: string }>;
}

/** Development adapter — logs the message instead of sending. No credentials needed. */
export class ConsoleEmailProvider implements EmailProvider {
  readonly name = "console";
  readonly delivers = false;
  private readonly defaultFrom?: string;

  constructor(opts: { defaultFrom?: string } = {}) {
    this.defaultFrom = opts.defaultFrom;
  }

  async send(message: EmailMessage): Promise<{ id: string }> {
    const id = `console-${Date.now()}`;
    console.info("[email:console]", {
      id,
      to: message.to,
      from: message.from ?? this.defaultFrom,
      subject: message.subject,
      locale: message.locale,
    });
    return { id };
  }
}

/* eslint-disable no-restricted-syntax -- third-party API endpoint, not our own domain. */
const RESEND_ENDPOINT = "https://api.resend.com/emails";
/* eslint-enable no-restricted-syntax */

/**
 * Resend's shared sender, usable with no domain verification. Resend only delivers from it
 * to the address that owns the Resend account, so it works for routing enquiries into a
 * single inbox on day one. Set `EMAIL_FROM` to an address on a verified domain to send
 * properly (better deliverability, and a from-address that looks like GOCSA).
 */
const RESEND_FALLBACK_FROM = "GOCSA Community Care <onboarding@resend.dev>";

/**
 * Resend adapter — sends over Resend's HTTP API, so no SDK dependency is required.
 * Needs `EMAIL_PROVIDER_API_KEY`. `EMAIL_FROM` is optional: without it we fall back to
 * Resend's shared sender so the form works immediately.
 */
export class ResendEmailProvider implements EmailProvider {
  readonly name = "resend";
  readonly delivers = true;
  private readonly apiKey: string;
  private readonly defaultFrom?: string;

  constructor(opts: { apiKey: string; defaultFrom?: string }) {
    if (!opts.apiKey) throw new Error("ResendEmailProvider requires an API key.");
    this.apiKey = opts.apiKey;
    this.defaultFrom = opts.defaultFrom;
  }

  async send(message: EmailMessage): Promise<{ id: string }> {
    const from = message.from ?? this.defaultFrom ?? RESEND_FALLBACK_FROM;

    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(message.to) ? message.to : [message.to],
        subject: message.subject,
        ...(message.text ? { text: message.text } : {}),
        ...(message.html ? { html: message.html } : {}),
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      // Never include the API key or the message body in the error.
      const detail = await res.text().catch(() => "");
      throw new Error(`Resend rejected the send (${res.status}): ${detail.slice(0, 200)}`);
    }

    const data = (await res.json().catch(() => ({}))) as { id?: string };
    return { id: data.id ?? `resend-${Date.now()}` };
  }
}
