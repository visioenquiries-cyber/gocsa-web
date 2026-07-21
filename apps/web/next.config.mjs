import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Transpile our workspace UI/token packages.
  transpilePackages: ["@gocsa/ui", "@gocsa/tokens"],
};

export default withPayload(nextConfig);
