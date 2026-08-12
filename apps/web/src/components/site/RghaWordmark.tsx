import Image from "next/image";

/**
 * Ridleyton Greek Home for the Aged (RGHA) wordmark (PREVIEW). Uses the shared Greek
 * Orthodox Community laurel-and-stars emblem (as on the GOCSA site) beside the home's name.
 * `mix-blend-multiply` drops the emblem's white background into the light header surface.
 */
export function RghaWordmark() {
  return (
    <span className="flex items-center gap-3">
      <Image
        src="/brand/gocsa-emblem.jpg"
        alt=""
        width={120}
        height={114}
        priority
        className="h-11 w-auto object-contain mix-blend-multiply md:h-12"
      />
      <span className="flex flex-col leading-tight">
        <span data-wordmark className="font-display text-base font-semibold text-primary md:text-lg">
          Ridleyton Greek Home
        </span>
        <span data-wordmark className="font-display text-sm text-ink-muted md:text-base">
          for the Aged
        </span>
      </span>
    </span>
  );
}
