/**
 * MediaProvider — image transformation / responsive rendition abstraction (DEC-021).
 * Wraps storage; concrete adapters may use a self-hosted pipeline, Vercel/Cloudflare
 * image resizing, etc. Consumers ask for a URL at a size/format and never care how.
 */
export type ImageFormat = "avif" | "webp" | "jpeg" | "png";

export interface ImageTransform {
  width?: number;
  height?: number;
  format?: ImageFormat;
  quality?: number;
  focalPoint?: { x: number; y: number };
}

export interface ResponsiveVariant {
  width: number;
  key: string;
  url: string;
}

export interface MediaProvider {
  readonly name: string;
  /** URL for a transformed rendition of a stored image key. */
  getImageUrl(key: string, transform?: ImageTransform): string;
  /** Named responsive widths generated at upload (docs/17 §6). */
  generateVariants(key: string, widths: number[]): Promise<ResponsiveVariant[]>;
}

/**
 * Development adapter — encodes the transform as query params on the asset URL.
 * A production adapter performs real processing (sharp / edge image resizing).
 */
export class LocalMediaProvider implements MediaProvider {
  readonly name = "local";
  private readonly assetUrl: string;

  constructor(opts: { assetUrl: string }) {
    this.assetUrl = opts.assetUrl.replace(/\/$/, "");
  }

  getImageUrl(key: string, transform: ImageTransform = {}): string {
    const params = new URLSearchParams();
    if (transform.width) params.set("w", String(transform.width));
    if (transform.height) params.set("h", String(transform.height));
    if (transform.format) params.set("f", transform.format);
    if (transform.quality) params.set("q", String(transform.quality));
    const qs = params.toString();
    const base = `${this.assetUrl}/${key.replace(/^\//, "")}`;
    return qs ? `${base}?${qs}` : base;
  }

  async generateVariants(key: string, widths: number[]): Promise<ResponsiveVariant[]> {
    return widths.map((width) => ({
      width,
      key,
      url: this.getImageUrl(key, { width, format: "webp" }),
    }));
  }
}
