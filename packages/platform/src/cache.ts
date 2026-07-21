/**
 * CacheProvider — application cache abstraction (DEC-021, docs/13 §6).
 * Adapters: MemoryCacheProvider (dev / single instance), RedisCacheProvider (deploy /
 * shared). Tag-based invalidation supports event-driven revalidation on publish.
 */
export interface CacheSetOptions {
  ttlSeconds?: number;
  tags?: string[];
}

export interface CacheProvider {
  readonly name: string;
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, opts?: CacheSetOptions): Promise<void>;
  delete(key: string): Promise<void>;
  invalidateTag(tag: string): Promise<void>;
}

interface Entry {
  value: unknown;
  expiresAt: number | null;
  tags: string[];
}

/** Development adapter — in-process Map with TTL + tag invalidation. */
export class MemoryCacheProvider implements CacheProvider {
  readonly name = "memory";
  private readonly store = new Map<string, Entry>();

  async get<T>(key: string): Promise<T | null> {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (entry.expiresAt !== null && entry.expiresAt < Date.now()) {
      this.store.delete(key);
      return null;
    }
    return entry.value as T;
  }

  async set<T>(key: string, value: T, opts: CacheSetOptions = {}): Promise<void> {
    this.store.set(key, {
      value,
      expiresAt: opts.ttlSeconds ? Date.now() + opts.ttlSeconds * 1000 : null,
      tags: opts.tags ?? [],
    });
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async invalidateTag(tag: string): Promise<void> {
    for (const [key, entry] of this.store) {
      if (entry.tags.includes(tag)) this.store.delete(key);
    }
  }
}
