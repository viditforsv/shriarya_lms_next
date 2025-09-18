"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { UserProfile, UserRole } from "@/types/auth";
import { SessionStorage } from "@/lib/session-storage";

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

interface RolePermissions {
  canViewAllUsers: boolean;
  canManageCourses: boolean;
  canManageUsers: boolean;
  canAccessAnalytics: boolean;
  canCreateContent: boolean;
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
  const logoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Create a single Supabase client instance using useMemo to prevent recreation
  const supabase = useMemo(() => createClient(), []);

  // Load profile from localStorage on mount only (Supabase handles session persistence)
  useEffect(() => {
    if (typeof window !== "undefined" && !profile && !loading) {
      const savedProfile = localStorage.getItem("shriarya-profile");
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile);
          setProfile(parsedProfile);
          console.log("Loaded profile from localStorage:", parsedProfile);
        } catch (error) {
          console.error("Error parsing saved profile:", error);
          localStorage.removeItem("shriarya-profile");
        }
      }
    }
  }, [loading, profile]);

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
        // Get user data from auth.users
        const { data: userData, error: userError } =
          await supabase.auth.getUser();

        if (userError || !userData.user) {
          console.error("Error getting user data:", userError);
          return null;
        }

        const user = userData.user;
        const email = user.email || "";

        // All new users get student role by default
        const role: UserRole = "student";
        console.log("Setting default role student for email:", email);

        // Extract name from user metadata
        const fullName =
          user.user_metadata?.full_name || user.user_metadata?.name || "";
        const firstName =
          user.user_metadata?.first_name || fullName.split(" ")[0] || "";
        const lastName =
          user.user_metadata?.last_name ||
          fullName.split(" ").slice(1).join(" ") ||
          "";

        // Insert new profile
        const { data, error } = await supabase
          .from("profiles")
          .insert({
            id: userId,
            first_name: firstName,
            last_name: lastName,
            email: email,
            role: role,
          })
          .select()
          .single();

        if (error) {
          console.error("Error creating profile:", error);
          console.error("Profile data attempted:", {
            id: userId,
            first_name: firstName,
            last_name: lastName,
            role: role,
          });
          return null;
        }

        console.log(
          "Successfully created profile with role:",
          role,
          "for email:",
          email
        );

        // Remove client-side role update to prevent admin demotion
        // Role should only be managed server-side for security

        return data as UserProfile;
      } catch (error) {
        console.error("Error creating profile:", error);
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
        console.log("Fetching profile for user ID:", userId);

        // Check cache first
        const cachedProfile = profileCache.get(userId);
        if (cachedProfile) {
          console.log("Using cached profile for user:", userId);
          return cachedProfile;
        }

        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Profile fetch timeout")), 5000);
        });

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

        console.log("Profile fetch result:", { data, error });

        if (error) {
          console.error("Error fetching profile:", error);

          // If profile doesn't exist, create it
          if (error.code === "PGRST116") {
            console.log(
              "Profile not found, creating new profile for user:",
              userId
            );
            const newProfile = await createProfile(userId);
            if (newProfile) {
              setProfileCache((prev) => new Map(prev).set(userId, newProfile));
            }
            console.log("Created profile:", newProfile);
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

      const permissions: Record<UserRole, RolePermissions> = {
        student: {
          canViewAllUsers: false,
          canManageCourses: false,
          canManageUsers: false,
          canAccessAnalytics: false,
          canCreateContent: false,
        },
        admin: {
          canViewAllUsers: true,
          canManageCourses: true,
          canManageUsers: true,
          canAccessAnalytics: true,
          canCreateContent: true,
        },
        instructor: {
          canViewAllUsers: false,
          canManageCourses: true,
          canManageUsers: false,
          canAccessAnalytics: false,
          canCreateContent: true,
        },
      };

      return permissions[profile.role]?.[permission] || false;
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
    // Only run auth logic in browser and prevent multiple initializations
    if (typeof window !== "undefined" && !isInitialized) {
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

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        try {
          console.log(
            "Auth state change:",
            event,
            session ? "session exists" : "no session"
          );

          // Set loading to true during state changes
          setLoading(true);

          setSession(session);
          setUser(session?.user ?? null);

          // Enhanced session persistence
          if (session) {
            SessionStorage.saveSession(session);
            SessionStorage.saveUser(session.user);
            console.log("Session saved to persistent storage");
          } else {
            SessionStorage.clearSession();
            console.log("Session cleared from persistent storage");
          }

          // Handle signout event - redirect to login page
          if (event === "SIGNED_OUT") {
            console.log(
              "User signed out, clearing state and redirecting to login page"
            );

            // Clear all auth state
            SessionStorage.clearSession();
            setProfile(null);
            setUser(null);
            setSession(null);

            // Clear profile from localStorage
            if (typeof window !== "undefined") {
              localStorage.removeItem("shriarya-profile");
              console.log("Cleared profile from localStorage");
            }

            // Clear any existing timeout
            if (logoutTimeoutRef.current) {
              clearTimeout(logoutTimeoutRef.current);
            }

            // Small delay to ensure state is cleared before redirect
            logoutTimeoutRef.current = setTimeout(() => {
              if (typeof window !== "undefined") {
                window.location.replace("/auth");
              }
            }, 100);
            setLoading(false);
            return;
          }

          // Handle token refresh
          if (event === "TOKEN_REFRESHED" && session) {
            console.log("Token refreshed, updating persistent storage");
            SessionStorage.saveSession(session);
            SessionStorage.saveUser(session.user);
            setLoading(false);
            return;
          }

          // Fetch profile if user exists
          if (session?.user) {
            try {
              console.log("Fetching profile for user:", session.user.id);
              const userProfile = await fetchProfile(session.user.id);
              setProfile(userProfile);
              console.log("Profile loaded successfully:", userProfile);
            } catch (error) {
              console.error(
                "Error fetching profile during auth state change:",
                error
              );
              // Continue without crashing
            }
          } else {
            setProfile(null);
          }
        } catch (error) {
          console.error("Error in auth state change:", error);
        } finally {
          setLoading(false);
        }
      });

      return () => {
        subscription.unsubscribe();
        // Clear any pending logout timeout
        if (logoutTimeoutRef.current) {
          clearTimeout(logoutTimeoutRef.current);
        }
      };
    } else {
      setLoading(false);
    }
  }, [supabase.auth, fetchProfile, isInitialized]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
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
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });
      if (error) throw error;
    },
    [supabase]
  );

  const signOut = useCallback(async () => {
    console.log("SignOut function called");
    try {
      // Clear profile cache first
      setProfileCache(new Map());
      console.log("Cleared profile cache");

      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("SignOut error:", error);
        throw error;
      }
      console.log("SignOut successful");
      // State clearing and redirect will be handled by auth state change handler
    } catch (error) {
      console.error("SignOut failed:", error);
      throw error;
    }
  }, [supabase, setProfileCache]);

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

  const value = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
