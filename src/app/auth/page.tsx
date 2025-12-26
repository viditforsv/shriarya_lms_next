"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/design-system/components/tabs";
import { Card, CardHeader } from "@/design-system/components/ui/card";
import { SignInForm } from "@/design-system/components/form-components/SignInForm";
import { SignUpForm } from "@/design-system/components/form-components/SignUpForm";
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
  const { user, profile, loading } = useAuth();
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

  // Redirect authenticated users based on role
  useEffect(() => {
    if (!loading && user && profile) {
      // Check for redirect parameter first, then next parameter, then role-based default
      const redirectParam = searchParams.get("redirect") || searchParams.get("redirectTo");
      const roleBasedPath =
        profile.role === "student"
          ? "/student"
          : profile.role === "teacher"
          ? "/teacher/dashboard"
          : profile.role === "admin"
          ? "/admin"
          : "/courses/enrolled";
      const redirectUrl = redirectParam || next || roleBasedPath;
      router.push(redirectUrl);
    }
  }, [user, profile, loading, router, next, searchParams]);

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

          const {
            data: { user: authUser },
          } = await supabase.auth.getUser();
          const { data: userProfile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", authUser?.id)
            .single();

          const roleBasedPath =
            userProfile?.role === "student"
              ? "/student"
              : userProfile?.role === "teacher"
              ? "/teacher/dashboard"
              : userProfile?.role === "admin"
              ? "/admin"
              : "/courses/enrolled";

          console.log(
            "Auth page - OAuth success, redirecting to:",
            roleBasedPath
          );
          // Check for redirect parameter first, then next parameter, then role-based default
          const redirectParam = searchParams.get("redirect") || searchParams.get("redirectTo");
          const redirectUrl = redirectParam || next || roleBasedPath;
          router.push(redirectUrl);
        } catch (err) {
          console.error("Auth page - OAuth callback exception:", err);
          router.push("/auth?error=Authentication failed");
        }
      };

      handleOAuthCallback();
    }
  }, [code, next, router, searchParams]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center overflow-hidden shadow-xl p-2">
              <Image
                src="/images/preppeo_icon.png"
                alt="Preppeo Logo"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Preppeo</h1>
          <p className="text-muted-foreground text-lg">
            Your gateway to knowledge and growth
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        {code && (
          <div className="mb-4 p-4 bg-primary/10 border-l-4 border-primary rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-primary text-sm font-medium">
                Completing authentication...
              </p>
            </div>
          </div>
        )}

        <Card className="w-full shadow-2xl border-0 rounded-xl overflow-hidden">
          <CardHeader className="pb-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 rounded-lg bg-gray-100 p-1">
                <TabsTrigger
                  value="signin"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md font-medium transition-all duration-200"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md font-medium transition-all duration-200"
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
