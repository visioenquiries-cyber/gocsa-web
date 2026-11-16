import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Transpile our workspace UI/token packages.
  transpilePackages: ["@gocsa/ui", "@gocsa/tokens"],
  // Serves app/global-not-found.tsx for unmatched paths. Needed because this app has no root
  // layout (each route group owns its own <html>), so a plain app/not-found.tsx cannot build.
  experimental: { globalNotFound: true },
};

export default withPayload(nextConfig);
