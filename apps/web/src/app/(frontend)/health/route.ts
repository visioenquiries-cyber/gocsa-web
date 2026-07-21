import { NextResponse } from "next/server";
import { getEnv } from "@gocsa/env";

export const dynamic = "force-dynamic";

/** Liveness/readiness — reports environment identity without leaking secrets. */
export function GET() {
  const env = getEnv();
  return NextResponse.json({
    status: "ok",
    appEnv: env.APP_ENV,
    brand: env.NEXT_PUBLIC_BRAND,
    site: env.NEXT_PUBLIC_SITE_ID,
  });
}
