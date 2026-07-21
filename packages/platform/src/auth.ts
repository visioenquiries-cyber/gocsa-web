/**
 * AuthenticationProvider — session-store & SSO abstraction (DEC-021, docs/14).
 *
 * Authorization logic (roles × site × lane) lives in the CMS access functions;
 * this abstracts the *session store* (so tokens are server-side revocable, docs/14 §6)
 * and the future SSO strategy. Adapters: MemoryAuthenticationProvider (dev),
 * Redis/Database (deploy), plus OIDC/SAML wiring later.
 */
import { randomUUID } from "node:crypto";
import type { SiteId } from "./types";

export interface AuthSession {
  userId: string;
  roles: string[];
  sites: SiteId[];
  expiresAt: number;
}

export interface AuthenticationProvider {
  readonly name: string;
  createSession(input: {
    userId: string;
    roles: string[];
    sites: SiteId[];
    ttlSeconds: number;
  }): Promise<{ token: string }>;
  verifySession(token: string): Promise<AuthSession | null>;
  revokeSession(token: string): Promise<void>;
  revokeAllForUser(userId: string): Promise<void>;
  /** Whether an external SSO IdP is configured (future — docs/14 §7). */
  ssoEnabled(): boolean;
}

/** Development adapter — in-memory revocable sessions. Redis/DB adapter for real deploys. */
export class MemoryAuthenticationProvider implements AuthenticationProvider {
  readonly name = "memory";
  private readonly sessions = new Map<string, AuthSession>();

  async createSession(input: {
    userId: string;
    roles: string[];
    sites: SiteId[];
    ttlSeconds: number;
  }): Promise<{ token: string }> {
    const token = randomUUID();
    this.sessions.set(token, {
      userId: input.userId,
      roles: input.roles,
      sites: input.sites,
      expiresAt: Date.now() + input.ttlSeconds * 1000,
    });
    return { token };
  }

  async verifySession(token: string): Promise<AuthSession | null> {
    const session = this.sessions.get(token);
    if (!session) return null;
    if (session.expiresAt < Date.now()) {
      this.sessions.delete(token);
      return null;
    }
    return session;
  }

  async revokeSession(token: string): Promise<void> {
    this.sessions.delete(token);
  }

  async revokeAllForUser(userId: string): Promise<void> {
    for (const [token, session] of this.sessions) {
      if (session.userId === userId) this.sessions.delete(token);
    }
  }

  ssoEnabled(): boolean {
    return false;
  }
}
