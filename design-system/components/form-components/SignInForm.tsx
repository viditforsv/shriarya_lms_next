"use client";

import { useState, useEffect } from "react";
import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Label } from "@/design-system/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {
    signIn,
    signInWithGoogle,
    user,
    profile,
    loading: authLoading,
  } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect when user becomes authenticated - with better logging
  useEffect(() => {
    console.log("🔄 SignInForm - Auth state:", {
      user: user?.email,
      profile: profile?.role,
      authLoading,
    });
    if (user && profile && !authLoading) {
      // Check for redirect parameter first
      const redirectParam = searchParams.get("redirect") || searchParams.get("redirectTo") || searchParams.get("next");
      
      // Redirect based on parameter or role
      let redirectPath = redirectParam || "/courses/enrolled";
      if (!redirectParam) {
      if (profile.role === "student") {
        redirectPath = "/student";
      } else if (profile.role === "teacher") {
        redirectPath = "/teacher/dashboard";
      } else if (profile.role === "admin") {
        redirectPath = "/admin";
        }
      }
      console.log(`✅ SignInForm - Redirecting to ${redirectPath}`);
      router.push(redirectPath);
    }
  }, [user, profile, authLoading, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      console.log("🔐 SignInForm - Attempting login for:", email);
      await signIn(email, password);
      console.log(
        "✅ SignInForm - Login successful, waiting for auth state change"
      );
      // Loading state is managed by AuthContext
    } catch (err) {
      console.error("❌ SignInForm - Login failed:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");

    try {
      await signInWithGoogle();
      // Loading state is managed by AuthContext
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Sign in to your Preppeo account</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Google Sign In - Prominent and First */}
        <Button
          type="button"
          className="w-full bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 font-semibold py-3 rounded-sm transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={handleGoogleSignIn}
          disabled={authLoading}
        >
          <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or sign in with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-[#94a3b8]" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-[#94a3b8]" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <Button type="submit" className="w-full" disabled={authLoading}>
            {authLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="text-center mt-4">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary hover:text-[#d65a2b] hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
