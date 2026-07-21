/**
 * StorageProvider — object storage abstraction (DEC-021).
 * Adapters: LocalStorageProvider (dev), S3/R2 (deploy). No vendor code leaks upward.
 */
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export interface PutOptions {
  contentType?: string;
}

export interface StoredObject {
  key: string;
  /** Public URL (via CDN/asset origin), built from configuration — never hardcoded. */
  url: string;
}

export interface StorageProvider {
  readonly name: string;
  put(key: string, data: Buffer | Uint8Array, opts?: PutOptions): Promise<StoredObject>;
  get(key: string): Promise<Buffer>;
  delete(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;
  /** Public URL for a stored key (CDN/asset origin from env). */
  getUrl(key: string): string;
  /** Time-limited signed URL (private assets). Placeholder returns the public URL. */
  getSignedUrl(key: string, opts?: { expiresIn?: number }): Promise<string>;
}

/** Development adapter — writes to the local filesystem; URLs via the asset origin. */
export class LocalStorageProvider implements StorageProvider {
  readonly name = "local";
  private readonly dir: string;
  private readonly assetUrl: string;

  constructor(opts: { assetUrl: string; dir?: string }) {
    this.assetUrl = opts.assetUrl.replace(/\/$/, "");
    this.dir = opts.dir ?? join(process.cwd(), ".storage");
  }

  private path(key: string): string {
    return join(this.dir, key);
  }

  async put(key: string, data: Buffer | Uint8Array): Promise<StoredObject> {
    const p = this.path(key);
    await mkdir(dirname(p), { recursive: true });
    await writeFile(p, data);
    return { key, url: this.getUrl(key) };
  }

  async get(key: string): Promise<Buffer> {
    return readFile(this.path(key));
  }

  async delete(key: string): Promise<void> {
    await rm(this.path(key), { force: true });
  }

  async exists(key: string): Promise<boolean> {
    try {
      await stat(this.path(key));
      return true;
    } catch {
      return false;
    }
  }

  getUrl(key: string): string {
    return `${this.assetUrl}/${key.replace(/^\//, "")}`;
  }

  async getSignedUrl(key: string): Promise<string> {
    return this.getUrl(key);
  }
}
