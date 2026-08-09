import type { NextConfig } from "next";

const apiBaseUrl =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;
const apiHostname = apiBaseUrl ? new URL(apiBaseUrl).hostname : undefined;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  async rewrites() {
    if (!apiBaseUrl) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${apiBaseUrl}/:path*`,
      },
      {
        source: "/uploads/:path*",
        destination: `${apiBaseUrl}/uploads/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/uploads/:path*",
        headers: [
          { key: "Content-Disposition", value: "inline" },
        ],
      },
    ];
  },
  images: {
    qualities: [100, 75],
    remotePatterns: [
      ...(apiHostname
        ? [{ protocol: "https" as const, hostname: apiHostname, pathname: "/**" }]
        : []),
      {
        protocol: "https",
        hostname: "api.intonepaltreks.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.growfore.com",
        pathname: "/api/v1/uploads/**",
      },
    ],
  },
};

export default nextConfig;
