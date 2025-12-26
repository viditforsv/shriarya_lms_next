"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/design-system/components/ui/button";
import {
  ChevronDown,
  Search,
  User,
  LogOut,
  Settings,
  BookOpen,
  FileText,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { ShoppingCart } from "@/components/ShoppingCart";

export function Header() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  // Use auth context directly
  const authContext = useAuth();
  const user = authContext?.user;
  const profile = authContext?.profile;
  const signOut = authContext?.signOut;

  // Debug logging for signOut function availability
  useEffect(() => {
    if (isMounted && process.env.NODE_ENV === "development") {
      console.log("Header - signOut function available:", !!signOut);
      console.log("Header - authContext available:", !!authContext);
    }
  }, [isMounted, signOut, authContext]);

  // Debug logging - only log when values actually change
  useEffect(() => {
    if (isMounted && process.env.NODE_ENV === "development") {
      console.log("Header - Auth state:", {
        user: user?.email,
        profile: profile?.role,
        loading: authContext?.loading,
        userExists: !!user,
      });
    }
  }, [isMounted, user?.email, profile?.role, authContext?.loading, user]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isUserDropdownOpen && !target.closest(".user-dropdown")) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserDropdownOpen]);

  // Get navigation based on user role
  const getNavigation = () => {
    if (!isMounted) return [];

    if (profile?.role === "admin") {
      return [
        { name: "Home", href: "/", hasDropdown: false },
        {
          name: "Browse Courses",
          href: "/courses/discover",
          hasDropdown: false,
        },
        { name: "Free Tools", href: "/tools", hasDropdown: false },
        { name: "FAQ", href: "/faq", hasDropdown: false },
        { name: "Contact", href: "/contact", hasDropdown: false },
        {
          name: "Site Administration",
          href: "/admin/site-administration",
          hasDropdown: false,
        },
      ];
    } else if (user) {
      // Authenticated users (students)
      return [
        { name: "Home", href: "/", hasDropdown: false },
        {
          name: "Browse Courses",
          href: "/courses/discover",
          hasDropdown: false,
        },
        { name: "Free Tools", href: "/tools", hasDropdown: false },
        { name: "My Courses", href: "/courses/enrolled", hasDropdown: false },
        { name: "FAQ", href: "/faq", hasDropdown: false },
        { name: "Contact", href: "/contact", hasDropdown: false },
      ];
    } else {
      // Public users (not logged in)
      return [
        { name: "Home", href: "/", hasDropdown: false },
        {
          name: "Browse Courses",
          href: "/courses/discover",
          hasDropdown: false,
        },
        { name: "Free Tools", href: "/tools", hasDropdown: false },
        { name: "About", href: "/about", hasDropdown: false },
        { name: "FAQ", href: "/faq", hasDropdown: false },
        { name: "Contact", href: "/contact", hasDropdown: false },
      ];
    }
  };

  const navigation = getNavigation();

  return (
    <header className="bg-primary border-b border-primary sticky top-0 z-50 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/images/preppeo_logo.png"
                alt="Preppeo LMS Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Preppeo</h1>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-4">
            <Link href="/courses/discover" className="relative w-full">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full px-4 py-2 pl-10 pr-4 border border-white/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 bg-white/10 text-white placeholder-white/60 cursor-pointer"
                readOnly
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 text-sm font-medium transition-colors text-white hover:text-accent"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* User Actions */}
            {user ? (
              <>
                {/* Shopping Cart */}
                <ShoppingCart />

                <div className="relative user-dropdown">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white hover:text-accent transition-colors rounded-sm hover:bg-white/10"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                      {profile?.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt={profile?.first_name || user.email || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs font-semibold text-accent">
                          {profile?.first_name && profile?.last_name
                            ? `${profile.first_name[0]}${profile.last_name[0]}`
                            : user.email?.[0].toUpperCase() || "U"}
                        </span>
                      )}
                    </div>
                    <span className="hidden md:block">
                      {profile?.first_name && profile?.last_name
                        ? `${profile.first_name} ${profile.last_name}`
                        : user.email}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-white transition-transform ${
                        isUserDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                      <div className="py-2">
                        <div className="px-4 py-2 border-b border-gray-200">
                          <p className="text-sm font-medium text-foreground">
                            {profile?.first_name && profile?.last_name
                              ? `${profile.first_name} ${profile.last_name}`
                              : user.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {profile?.role === "admin"
                              ? "Administrator"
                              : profile?.role === "content_manager"
                              ? "Content Manager"
                              : "Student"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>

                        <Link
                          href="/courses/enrolled"
                          className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <BookOpen className="w-4 h-4 mr-3 text-primary" />
                          Dashboard
                        </Link>

                        {profile?.role === "admin" && (
                          <Link
                            href="/admin/site-administration"
                            className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <Settings className="w-4 h-4 mr-3 text-primary" />
                            Site Administration
                          </Link>
                        )}

                        {(profile?.role === "admin" ||
                          profile?.role === "content_manager") && (
                          <Link
                            href="/question-bank"
                            className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <FileText className="w-4 h-4 mr-3 text-primary" />
                            Question Bank
                          </Link>
                        )}

                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <User className="w-4 h-4 mr-3 text-primary" />
                          Profile
                        </Link>

                        <div className="border-t border-gray-200 mt-2 pt-2">
                          <button
                            onClick={async (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log("Sign out button clicked");
                              console.log(
                                "signOut function available:",
                                !!signOut
                              );

                              if (!signOut) {
                                console.error(
                                  "signOut function is not available!"
                                );
                                return;
                              }

                              try {
                                setIsUserDropdownOpen(false);
                                console.log("Calling signOut function...");
                                await signOut();
                                console.log("Sign out completed successfully");
                              } catch (error) {
                                console.error("Sign out error:", error);
                              }
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4 mr-3 text-red-600" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth">
                  <Button size="sm" variant="outline">
                    Log In
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Removed mobile menu - web-only app */}
          </div>
        </div>

        {/* Removed mobile navigation - web-only app */}
      </div>
    </header>
  );
}
