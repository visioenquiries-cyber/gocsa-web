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
  send(message: EmailMessage): Promise<{ id: string }>;
}

/** Development adapter — logs the message instead of sending. No credentials needed. */
export class ConsoleEmailProvider implements EmailProvider {
  readonly name = "console";
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
