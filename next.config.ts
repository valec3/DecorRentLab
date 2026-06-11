import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "api.quierolapromocion.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "api.quierolapromocion.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

if (process.env.NODE_ENV === "development") {
  eval("import('@opennextjs/cloudflare')").then((m: unknown) => (m as { initOpenNextCloudflareForDev: () => void }).initOpenNextCloudflareForDev());
}
