/**
 * SearchProvider — site-search abstraction (DEC-021, docs/13 §4, docs/15).
 * Adapters: MemorySearchProvider (dev placeholder), PostgresSearchProvider (Sprint 4/10,
 * FTS with per-locale tsvector), future pgvector/engine. Content model never changes.
 */
import type { Locale, SiteId } from "./types";

export interface SearchDocument {
  id: string;
  type: string;
  locale: Locale;
  siteId: SiteId;
  title: string;
  body: string;
  url: string;
  priority?: number;
}

export interface SearchQuery {
  q: string;
  locale: Locale;
  siteId: SiteId;
  type?: string;
  limit?: number;
  page?: number;
}

export interface SearchResult {
  id: string;
  type: string;
  title: string;
  excerpt: string;
  url: string;
  score: number;
}

export interface SearchProvider {
  readonly name: string;
  index(doc: SearchDocument): Promise<void>;
  remove(id: string): Promise<void>;
  search(query: SearchQuery): Promise<{ results: SearchResult[]; total: number }>;
}

/**
 * Development placeholder — naive in-memory substring match, locale + site scoped.
 * NOT for production; the Postgres FTS adapter replaces it (ranking, stemming, scale).
 */
export class MemorySearchProvider implements SearchProvider {
  readonly name = "memory";
  private readonly docs = new Map<string, SearchDocument>();

  async index(doc: SearchDocument): Promise<void> {
    this.docs.set(doc.id, doc);
  }

  async remove(id: string): Promise<void> {
    this.docs.delete(id);
  }

  async search(query: SearchQuery): Promise<{ results: SearchResult[]; total: number }> {
    const q = query.q.trim().toLowerCase();
    const limit = query.limit ?? 10;
    const page = query.page ?? 1;

    const matched = [...this.docs.values()].filter(
      (d) =>
        d.siteId === query.siteId &&
        d.locale === query.locale &&
        (!query.type || d.type === query.type) &&
        (`${d.title} ${d.body}`.toLowerCase().includes(q) || q === ""),
    );

    const results: SearchResult[] = matched
      .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
      .slice((page - 1) * limit, page * limit)
      .map((d) => ({
        id: d.id,
        type: d.type,
        title: d.title,
        excerpt: d.body.slice(0, 160),
        url: d.url,
        score: d.priority ?? 0,
      }));

    return { results, total: matched.length };
  }
}
