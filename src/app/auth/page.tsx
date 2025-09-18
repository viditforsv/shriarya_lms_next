"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components-demo/ui/tabs";
import { Card, CardHeader } from "@/app/components-demo/ui/ui-components/card";
import { SignInForm } from "@/app/components-demo/ui/form-components/SignInForm";
import { SignUpForm } from "@/app/components-demo/ui/form-components/SignUpForm";
import { Breadcrumb } from "@/app/components-demo/ui/breadcrumb";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

// Prevent static generation
noStore();

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("signin");
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  const error = searchParams.get("error");
  const tab = searchParams.get("tab");

  // Handle tab parameter from URL
  useEffect(() => {
    if (tab === "signup" || tab === "signin") {
      setActiveTab(tab);
    }
  }, [tab]);

  // Redirect authenticated users to enrolled courses
  useEffect(() => {
    if (!loading && user) {
      router.push(next || "/courses/enrolled");
    }
  }, [user, loading, router, next]);

  // Handle OAuth callback
  useEffect(() => {
    if (code) {
      const handleOAuthCallback = async () => {
        try {
          console.log("Auth page - Handling OAuth callback with code:", code);
          const supabase = createClient();

          const { error } = await supabase.auth.exchangeCodeForSession(code);

          if (error) {
            console.error("Auth page - OAuth callback error:", error);
            router.push("/auth?error=Could not authenticate user");
            return;
          }

          console.log(
            "Auth page - OAuth success, redirecting to:",
            next || "/courses/enrolled"
          );
          router.push(next || "/courses/enrolled");
        } catch (err) {
          console.error("Auth page - OAuth callback exception:", err);
          router.push("/auth?error=Authentication failed");
        }
      };

      handleOAuthCallback();
    }
  }, [code, next, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Authentication", href: "/auth", isActive: true },
            ]}
          />
        </div>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-sm flex items-center justify-center overflow-hidden">
              <Image
                src="/images/main_logo.webp"
                alt="ShriArya LMS Logo"
                width={64}
                height={64}
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">ShriArya</h1>
          <p className="text-muted-foreground">
            Your gateway to knowledge and growth
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-sm">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {code && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-sm">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e27447] mx-auto mb-2"></div>
              <p className="text-blue-600 text-sm">
                Completing authentication...
              </p>
            </div>
          </div>
        )}

        <Card className="w-full">
          <CardHeader className="pb-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 rounded-sm bg-[#feefea] p-1">
                <TabsTrigger
                  value="signin"
                  className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="mt-6">
                <SignInForm />
              </TabsContent>

              <TabsContent value="signup" className="mt-6">
                <SignUpForm />
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
