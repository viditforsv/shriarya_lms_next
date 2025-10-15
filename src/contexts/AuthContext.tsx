"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import {
  UserProfile,
  UserRole,
  RolePermissions,
  ROLE_PERMISSIONS,
} from "@/types/auth";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role?: UserRole
  ) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  updateUserRole: (userId: string, newRole: UserRole) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
  hasPermission: (permission: keyof RolePermissions) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileCache, setProfileCache] = useState<Map<string, UserProfile>>(
    new Map()
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  // Create a single Supabase client instance using useMemo to prevent recreation
  const supabase = useMemo(() => createClient(), []);

  // Profile will be loaded from database when user signs in
  // No need to load from localStorage as it can cause stale data issues

  // Persist profile in localStorage when it changes
  useEffect(() => {
    if (profile && typeof window !== "undefined") {
      localStorage.setItem("shriarya-profile", JSON.stringify(profile));
    }
  }, [profile]);

  // Create user profile if it doesn't exist
  const createProfile = useCallback(
    async (userId: string) => {
      try {
        console.log(
          "🔵 createProfile - Starting profile creation for userId:",
          userId
        );

        // Get user data from auth.users
        const { data: userData, error: userError } =
          await supabase.auth.getUser();

        if (userError || !userData.user) {
          console.error(
            "❌ createProfile - Error getting user data:",
            userError
          );
          return null;
        }

        const user = userData.user;
        const email = user.email || "";
        console.log("✅ createProfile - Got user data:", {
          userId: user.id,
          email,
        });

        // All new users get student role by default
        const role: UserRole = "student";
        console.log(
          "🔵 createProfile - Setting default role 'student' for email:",
          email
        );

        // Extract name from user metadata
        const fullName =
          user.user_metadata?.full_name || user.user_metadata?.name || "";
        const firstName =
          user.user_metadata?.first_name || fullName.split(" ")[0] || "";
        const lastName =
          user.user_metadata?.last_name ||
          fullName.split(" ").slice(1).join(" ") ||
          "";

        console.log("🔵 createProfile - Extracted name:", {
          fullName,
          firstName,
          lastName,
        });

        const profileData = {
          id: userId,
          first_name: firstName,
          last_name: lastName,
          email: email,
          role: role,
        };

        console.log(
          "🔵 createProfile - Attempting to insert profile:",
          profileData
        );

        // Insert new profile
        const { data, error } = await supabase
          .from("profiles")
          .insert(profileData)
          .select()
          .single();

        if (error) {
          console.error(
            "❌ createProfile - Database error creating profile:",
            error
          );
          console.error("❌ createProfile - Error code:", error.code);
          console.error("❌ createProfile - Error message:", error.message);
          console.error("❌ createProfile - Error details:", error.details);
          console.error(
            "❌ createProfile - Profile data attempted:",
            profileData
          );
          return null;
        }

        console.log(
          "✅ createProfile - Successfully created profile with role:",
          role,
          "for email:",
          email
        );
        console.log("✅ createProfile - Profile data:", data);

        // Remove client-side role update to prevent admin demotion
        // Role should only be managed server-side for security

        return data as UserProfile;
      } catch (error) {
        console.error("❌ createProfile - Exception caught:", error);
        return null;
      }
    },
    [supabase]
  );

  // Create fallback profile when database is unavailable
  const createFallbackProfile = useCallback(
    async (userId: string) => {
      try {
        console.log("Creating fallback profile for user:", userId);

        // Get user data from auth.users
        const { data: userData, error: userError } =
          await supabase.auth.getUser();

        if (userError || !userData.user) {
          console.error(
            "Error getting user data for fallback profile:",
            userError
          );
          return null;
        }

        const user = userData.user;
        const email = user.email || "";

        // All new users get student role by default
        const role: UserRole = "student";
        console.log(
          "Setting default role student for fallback profile, email:",
          email
        );

        // Extract name from user metadata
        const fullName =
          user.user_metadata?.full_name || user.user_metadata?.name || "";
        const firstName =
          user.user_metadata?.first_name || fullName.split(" ")[0] || "";
        const lastName =
          user.user_metadata?.last_name ||
          fullName.split(" ").slice(1).join(" ") ||
          "";

        // Create fallback profile object
        const fallbackProfile: UserProfile = {
          id: userId,
          full_name: fullName || null,
          first_name: firstName || null,
          last_name: lastName || null,
          email: email || null,
          role: role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        console.log(
          "Successfully created fallback profile with role:",
          role,
          "for email:",
          email
        );

        // Save to localStorage for persistence
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "shriarya-profile",
            JSON.stringify(fallbackProfile)
          );
        }

        return fallbackProfile;
      } catch (error) {
        console.error("Error creating fallback profile:", error);
        return null;
      }
    },
    [supabase]
  );

  // Fetch user profile from database with retry logic
  const fetchProfile = useCallback(
    async (userId: string, retries = 2) => {
      try {
        console.log("🔵 fetchProfile - Fetching profile for user ID:", userId);

        // Check cache first
        const cachedProfile = profileCache.get(userId);
        if (cachedProfile) {
          console.log(
            "✅ fetchProfile - Using cached profile for user:",
            userId
          );
          return cachedProfile;
        }

        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Profile fetch timeout")), 5000);
        });

        console.log("🔵 fetchProfile - Querying profiles table...");
        const fetchPromise = supabase
          .from("profiles")
          .select(
            "id, first_name, last_name, email, role, created_at, updated_at"
          )
          .eq("id", userId)
          .single();

        const { data, error } = (await Promise.race([
          fetchPromise,
          timeoutPromise,
        ])) as {
          data: UserProfile | null;
          error: { code?: string; message?: string } | null;
        };

        console.log("🔵 fetchProfile - Query result:", {
          hasData: !!data,
          errorCode: error?.code,
          errorMessage: error?.message,
        });

        if (error) {
          console.error("❌ fetchProfile - Error:", {
            code: error.code,
            message: error.message,
            fullError: error,
          });

          // Handle RLS policy errors (empty error object)
          if (!error.code && !error.message) {
            console.log(
              "⚠️ fetchProfile - RLS policy error detected, creating fallback profile for user:",
              userId
            );
            const fallbackProfile = await createFallbackProfile(userId);
            if (fallbackProfile) {
              setProfileCache((prev) =>
                new Map(prev).set(userId, fallbackProfile)
              );
            }
            return fallbackProfile;
          }

          // If profile doesn't exist (PGRST116), create it
          if (error.code === "PGRST116") {
            console.log(
              "🔵 fetchProfile - Profile not found (PGRST116), creating new profile for user:",
              userId
            );
            const newProfile = await createProfile(userId);
            if (newProfile) {
              console.log(
                "✅ fetchProfile - Profile created successfully:",
                newProfile
              );
              setProfileCache((prev) => new Map(prev).set(userId, newProfile));
            } else {
              console.error("❌ fetchProfile - createProfile returned null");
            }
            return newProfile;
          }

          // If it's a timeout or network error, create a fallback profile
          if (
            error.message?.includes("timeout") ||
            error.message?.includes("network") ||
            error.message?.includes("fetch")
          ) {
            console.log(
              "Network/timeout error, creating fallback profile for user:",
              userId
            );
            const fallbackProfile = await createFallbackProfile(userId);
            if (fallbackProfile) {
              setProfileCache((prev) =>
                new Map(prev).set(userId, fallbackProfile)
              );
            }
            return fallbackProfile;
          }

          return null;
        }

        console.log("Successfully fetched profile:", data);

        // Cache the profile
        setProfileCache((prev) =>
          new Map(prev).set(userId, data as UserProfile)
        );

        return data as UserProfile;
      } catch (error) {
        console.error("Error fetching profile:", error);

        // Retry logic for timeout errors with exponential backoff
        if (
          retries > 0 &&
          error instanceof Error &&
          error.message.includes("timeout")
        ) {
          const delay = Math.pow(2, 3 - retries) * 1000; // Exponential backoff: 1s, 2s, 4s
          console.log(
            `Retrying profile fetch (${retries} attempts left) after ${delay}ms...`
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
          return fetchProfile(userId, retries - 1);
        }

        // If all retries failed, create a fallback profile
        console.log(
          "All retries failed, creating fallback profile for user:",
          userId
        );
        const fallbackProfile = await createFallbackProfile(userId);
        if (fallbackProfile) {
          setProfileCache((prev) => new Map(prev).set(userId, fallbackProfile));
        }
        return fallbackProfile;
      }
    },
    [supabase, profileCache, createFallbackProfile, createProfile]
  );

  // Check if user has specific permission
  const hasPermission = useCallback(
    (permission: keyof RolePermissions): boolean => {
      if (!profile) return false;
      return ROLE_PERMISSIONS[profile.role][permission];
    },
    [profile]
  );

  // Update user role (admin only)
  const updateUserRole = useCallback(
    async (userId: string, newRole: UserRole): Promise<boolean> => {
      if (!hasPermission("canManageUsers")) {
        throw new Error("Insufficient permissions");
      }

      try {
        // Update the role in the profiles table
        const { data, error } = await supabase
          .from("profiles")
          .update({ role: newRole })
          .eq("id", userId)
          .select()
          .single();

        if (error) {
          console.error("Error updating user role in profiles:", error);
          return false;
        }

        // Update cached role in session metadata (for current user only)
        if (userId === user?.id) {
          try {
            await supabase.auth.updateUser({
              data: { role: newRole },
            });
            console.log(
              "Successfully updated current user metadata with role:",
              newRole
            );
            // Refresh profile to update local state
            const userProfile = await fetchProfile(user.id);
            if (userProfile) {
              setProfile(userProfile);
            }
          } catch (error) {
            console.error("Error updating current user metadata:", error);
          }
        }

        return !!data;
      } catch (error) {
        console.error("Error updating user role:", error);
        return false;
      }
    },
    [hasPermission, supabase, user?.id, fetchProfile, setProfile]
  );

  // Refresh user profile with error handling
  const refreshProfile = useCallback(async () => {
    if (user) {
      try {
        const userProfile = await fetchProfile(user.id);
        setProfile(userProfile);
      } catch (error) {
        console.error("Error refreshing profile:", error);
        // Don't crash the app, just log the error
      }
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    console.log("🔵 AuthContext - useEffect triggered", {
      isBrowser: typeof window !== "undefined",
      isInitialized,
      isSigningOut,
    });

    // Only run auth logic in browser and prevent multiple initializations
    if (typeof window !== "undefined" && !isInitialized) {
      console.log("🔵 AuthContext - Initializing auth context");
      setIsInitialized(true);

      // Optimized session loading with minimal delays
      const getSession = async () => {
        try {
          console.log("Getting initial session...");

          // Fast path: Get session immediately from Supabase
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (session?.user) {
            // Set user state immediately for fast UI response
            setSession(session);
            setUser(session.user);

            // Fetch profile in background to avoid blocking UI
            fetchProfile(session.user.id)
              .then(setProfile)
              .catch((error) => {
                console.error("Error fetching profile:", error);
                // Don't block UI if profile fetch fails
              });
          } else {
            // No session, clear state immediately
            setSession(null);
            setUser(null);
            setProfile(null);
          }
        } catch (error) {
          console.error("Error getting session:", error);
          // Clear state on error
          setSession(null);
          setUser(null);
          setProfile(null);
        } finally {
          setLoading(false);
        }
      };

      getSession();

      // Listen for auth changes - simplified approach
      console.log("🔵 AuthContext - Setting up onAuthStateChange listener");

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        console.log("🔐 AUTH STATE CHANGE LISTENER CALLED!");
        console.log(
          "🔐 Auth state change:",
          event,
          session ? "session exists" : "no session",
          session?.user?.email || "no user"
        );
        
        // Test: Force trigger a manual state update to see if React state works
        console.log("🔐 Testing manual state update...");
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        console.log("🔐 Auth state change - Current state before update:", {
          hasUser: !!user,
          hasSession: !!session,
          hasProfile: !!profile,
          loading: loading,
        });

        console.log(
          "🔐 Auth state change - State updated, triggering re-render"
        );

        // Supabase handles session persistence automatically
        // No need for custom session management

        // Handle specific events
        if (event === "SIGNED_OUT") {
          console.log(
            "🚪 SIGNED_OUT event received, clearing state and redirecting"
          );

          // Reset signing out flag
          setIsSigningOut(false);
          console.log("🔵 SIGNED_OUT - Reset isSigningOut to false");

          // Clear all auth state
          setProfile(null);
          setUser(null);
          setSession(null);
          console.log("🔵 SIGNED_OUT - Cleared all auth state");

          // Clear profile from localStorage
          if (typeof window !== "undefined") {
            localStorage.removeItem("shriarya-profile");
            // Also clear Supabase session storage
            localStorage.removeItem("shriarya-lms-session");
            console.log("✅ Cleared profile and session from localStorage");
          }

          // Use client-side navigation instead of hard reload
          console.log("🔄 Redirecting to /auth");
          router.push("/auth");
          return;
        }

        if (event === "TOKEN_REFRESHED" && session) {
          console.log("🔄 Token refreshed");
          // Supabase handles token refresh automatically
          return;
        }

        // Fetch profile in background for SIGNED_IN events
        if (event === "SIGNED_IN" && session?.user && !isSigningOut) {
          console.log(
            "🔵 Auth state - SIGNED_IN event, fetching profile for user:",
            session.user.id
          );
          console.log("🔵 Auth state - User email:", session.user.email);

          // Add a small delay to ensure state is fully updated
          setTimeout(() => {
            fetchProfile(session.user.id)
              .then((userProfile) => {
                if (userProfile) {
                  setProfile(userProfile);
                  console.log(
                    "✅ Auth state - Profile loaded successfully:",
                    userProfile
                  );
                } else {
                  console.warn("⚠️ Auth state - Profile is null after fetch");
                }
              })
              .catch((error) => {
                console.error("❌ Auth state - Error fetching profile:", error);
              });
          }, 100);
        } else if (!session?.user) {
          console.log("🔵 Auth state - No session user, clearing profile");
          setProfile(null);
        }
      });

      return () => {
        console.log("🔵 AuthContext - Cleaning up onAuthStateChange listener");
        subscription.unsubscribe();
      };
    } else {
      setLoading(false);
    }
  }, [supabase.auth, fetchProfile, isSigningOut, router]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      console.log("🔵 signIn - Starting signin for email:", email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("❌ signIn - Signin failed:", error);
        throw error;
      }

      console.log("✅ signIn - Signin successful:", {
        userId: data.user?.id,
        email: data.user?.email,
        hasSession: !!data.session,
      });

      // The auth state change handler will update the state automatically
      // No need to manually update state here
    },
    [supabase]
  );

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      fullName: string,
      role: UserRole = "student"
    ) => {
      console.log("🔵 signUp - Starting signup for email:", email);
      console.log("🔵 signUp - Full name:", fullName);
      console.log("🔵 signUp - Role:", role);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (error) {
        console.error("❌ signUp - Supabase auth.signUp error:", error);
        throw error;
      }

      console.log("✅ signUp - Auth user created successfully:", {
        userId: data.user?.id,
        email: data.user?.email,
        needsConfirmation: !data.session,
      });
    },
    [supabase]
  );

  const signOut = useCallback(async () => {
    console.log("🔵 signOut - SignOut function called");
    try {
      // Set signing out flag to prevent automatic session restoration
      setIsSigningOut(true);
      console.log("🔵 signOut - Set isSigningOut to true");

      // Clear profile cache first
      setProfileCache(new Map());
      console.log("🔵 signOut - Cleared profile cache");

      // Check if there's an active session before trying to sign out
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(
        "🔵 signOut - Current session before signOut:",
        session ? "exists" : "none"
      );

      if (session) {
        console.log("🔵 signOut - Calling supabase.auth.signOut()");
        // Sign out from Supabase - let the auth state change handler manage state clearing
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error("❌ signOut - SignOut error:", error);
          setIsSigningOut(false); // Reset flag on error
          throw error;
        }
        console.log("✅ signOut - Successfully signed out from Supabase");
      } else {
        console.log(
          "🔵 signOut - No active session found, proceeding with local cleanup"
        );
        // No session to sign out from, just clear local state
        setProfile(null);
        setUser(null);
        setSession(null);

        // Clear profile from localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("shriarya-profile");
          // Also clear Supabase session storage as fallback
          localStorage.removeItem("shriarya-lms-session");
          console.log("✅ Cleared profile and session from localStorage");
        }

        // Use client-side navigation instead of hard reload
        console.log("🔄 Redirecting to /auth");
        router.push("/auth");
      }

      // State clearing and redirect will be handled by auth state change handler
    } catch (error) {
      console.error("SignOut failed:", error);
      setIsSigningOut(false); // Reset flag on error

      // Even if signOut fails, clear local state and redirect
      setProfile(null);
      setUser(null);
      setSession(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("shriarya-profile");
        // Also clear Supabase session storage directly as fallback
        localStorage.removeItem("shriarya-lms-session");
        console.log("✅ Cleared Supabase session storage as fallback");
      }

      // Use client-side navigation instead of hard reload
      console.log("🔄 Redirecting to /auth (fallback)");
      router.push("/auth");
    }
  }, [supabase, setProfileCache, router]);

  const signInWithGoogle = useCallback(async () => {
    // Automatically detect environment and use appropriate URL
    let siteUrl: string;

    if (typeof window !== "undefined") {
      // Client-side: use current origin
      siteUrl = window.location.origin;
    } else {
      // Server-side: use environment variable or fallback
      siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    }

    // Debug logging
    console.log("AuthContext - Site URL:", siteUrl);
    console.log(
      "AuthContext - Environment variable:",
      process.env.NEXT_PUBLIC_SITE_URL
    );
    console.log(
      "AuthContext - Current location:",
      typeof window !== "undefined" ? window.location.origin : "server"
    );

    // Use the newer auth method that handles PKCE automatically
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${siteUrl}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google OAuth error:", error);
      throw error;
    }

    console.log("OAuth data:", data);
  }, [supabase]);

  const resetPassword = useCallback(
    async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
    },
    [supabase]
  );

  const updatePassword = useCallback(
    async (newPassword: string) => {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
    },
    [supabase]
  );

  const value = useMemo(() => {
    const contextValue = {
      user,
      session,
      profile,
      loading,
      signIn,
      signUp,
      signOut,
      signInWithGoogle,
      resetPassword,
      updatePassword,
      updateUserRole,
      refreshProfile,
      hasPermission,
    };

    // Debug logging in development
    if (process.env.NODE_ENV === "development") {
      console.log("AuthContext value updated:", {
        user: !!user,
        session: !!session,
        profile: !!profile,
        loading,
        signOut: !!signOut,
      });
    }

    return contextValue;
  }, [
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    resetPassword,
    updatePassword,
    updateUserRole,
    refreshProfile,
    hasPermission,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
