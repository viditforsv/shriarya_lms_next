import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "@/design-system/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { Header } from "@/design-system/components/header";
import { Footer } from "@/design-system/components/footer";

// Force dynamic rendering to prevent static generation issues
export const dynamic = "force-dynamic";

// Inter font for the entire application
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "sans-serif",
  ],
});

// Lato font for specific components
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

// Get the base URL for Open Graph images
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://preppeo.com";

export const metadata: Metadata = {
  title: "Preppeo LMS - Learning Management System",
  description:
    "A modern learning management system built with Next.js and Supabase",
  icons: {
    icon: "/images/favicon.ico",
    apple: "/images/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/images/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/images/favicon-16x16.png",
      },
    ],
  },
  openGraph: {
    title: "Preppeo LMS - Learning Management System",
    description:
      "A modern learning management system built with Next.js and Supabase",
    url: baseUrl,
    siteName: "Preppeo LMS",
    images: [
      {
        url: "/images/preppeo_logo.png",
        width: 1200,
        height: 630,
        alt: "Preppeo LMS Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preppeo LMS - Learning Management System",
    description:
      "A modern learning management system built with Next.js and Supabase",
    images: ["/images/preppeo_logo.png"],
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
        className={`${inter.variable} ${lato.variable} ${inter.className}`}
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
