import type { Metadata } from "next";
import { Inter, Cardo, DM_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"] });
const cardo = Cardo({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cardo"
});
const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans"
});

export const metadata: Metadata = {
  title: "ShriArya LMS - Learning Management System",
  description: "A modern learning management system built with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${cardo.variable} ${dmSans.variable}`}>
        <AuthProvider>
          <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
