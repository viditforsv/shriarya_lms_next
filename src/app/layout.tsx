import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { Header } from "@/app/components-demo/ui/header";
import { Footer } from "@/app/components-demo/ui/footer";

// Force dynamic rendering to prevent static generation issues
export const dynamic = "force-dynamic";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

// Get the base URL for Open Graph images
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://shrividhya.in";

export const metadata: Metadata = {
  title: "ShriArya LMS - Learning Management System",
  description:
    "A modern learning management system built with Next.js and Supabase",
  icons: {
    icon: "/images/favicon.ico",
  },
  openGraph: {
    title: "ShriArya LMS - Learning Management System",
    description:
      "A modern learning management system built with Next.js and Supabase",
    url: baseUrl,
    siteName: "ShriArya LMS",
    images: [
      {
        url: `${baseUrl}/images/main_logo.jpg`,
        width: 1080,
        height: 1080,
        alt: "ShriArya LMS Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShriArya LMS - Learning Management System",
    description:
      "A modern learning management system built with Next.js and Supabase",
    images: [`${baseUrl}/images/main_logo.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.className} ${dmSans.variable}`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-background flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
