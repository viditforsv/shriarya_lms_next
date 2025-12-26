import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Handle environment variables during build
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },

  // Ensure proper handling of environment variables
  typescript: {
    ignoreBuildErrors: false,
  },

  // Configure image domains for Next.js Image component
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "shrividhyaclasses.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "**.supabase.in",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    // Allow any image source (for development)
    unoptimized: process.env.NODE_ENV === "development",
  },

  // Add headers to fix CSP issues with PDF embedding and CDN content
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://checkout.razorpay.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://*.supabase.co https://shrividhyaclasses.b-cdn.net https://acrobatservices.adobe.com https://api.razorpay.com",
              "frame-src 'self' https: data:",
              "frame-ancestors 'self' https:",
              "object-src 'self' data:",
              "media-src 'self' https: data:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
