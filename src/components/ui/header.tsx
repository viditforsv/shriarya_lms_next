"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Search } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { user, signOut } = useAuth()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const navigation = [
    { name: "Home", href: "/", hasDropdown: true },
    { name: "Courses", href: "/courses", hasDropdown: true, isActive: true },
    { name: "Pages", href: "/pages", hasDropdown: true },
    { name: "Templates", href: "/templates", hasDropdown: true },
  ]

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
              <Image 
                src="/images/logo.webp" 
                alt="ShriArya LMS Logo" 
                width={40}
                height={40}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ShriArya</h1>
            </div>
          </div>

          {/* Categories Dropdown */}
          <div className="hidden lg:flex items-center">
            <button className="flex items-center space-x-1 text-foreground hover:text-accent px-3 py-2 text-sm font-medium transition-colors">
              <span>Categories</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for anything"
                className="w-full px-4 py-2 pl-10 pr-4 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200 bg-background text-foreground placeholder-muted-foreground"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${
                    item.isActive 
                      ? "text-accent" 
                      : "text-foreground hover:text-accent"
                  }`}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">

            {/* User Actions */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="text-xs">
                  {user.email}
                </Badge>
                <Link href="/dashboard">
                  <Button size="sm">Dashboard</Button>
                </Link>
                <Button size="sm" variant="outline" onClick={signOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth">
                  <Button size="sm" variant="outline">Log In</Button>
                </Link>
                <Link href="/auth">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#1e293b] hover:text-[#e27447] p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMounted && isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              {/* Mobile Search */}
              <div className="px-3 pb-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for anything"
                    className="w-full px-4 py-2 pl-10 pr-4 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200 bg-background text-foreground placeholder-muted-foreground"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              {/* Mobile Categories */}
              <div className="px-3 pb-3">
                <button className="flex items-center space-x-1 text-foreground hover:text-accent px-3 py-2 text-sm font-medium transition-colors">
                  <span>Categories</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Navigation */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 text-base font-medium transition-colors ${
                    item.isActive 
                      ? "text-accent" 
                      : "text-foreground hover:text-accent"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
              ))}

              <div className="pt-4 pb-3 border-t border-[#feefea]">
                {user ? (
                  <div className="space-y-2 px-3">
                    <div className="text-sm text-foreground">{user.email}</div>
                    <Link href="/dashboard">
                      <Button size="sm" className="w-full">Dashboard</Button>
                    </Link>
                    <Button size="sm" variant="outline" className="w-full" onClick={signOut}>
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2 px-3">
                    <Link href="/auth">
                      <Button size="sm" variant="outline" className="w-full">Log In</Button>
                    </Link>
                    <Link href="/auth">
                      <Button size="sm" className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
