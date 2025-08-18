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
  // Only use auth context after component mounts (client-side only)
  const authContext = useAuth()
  const user = isMounted ? authContext?.user : null
  const signOut = isMounted ? authContext?.signOut : undefined

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const navigation = [
    { name: "Home", href: "/", hasDropdown: false },
    { 
      name: "Courses", 
      href: "/courses", 
      hasDropdown: true,
      dropdownItems: [
        { name: "CBSE", href: "/courses/cbse", description: "Central Board of Secondary Education" },
        { name: "ICSE/ISC", href: "/courses/icse", description: "Indian Certificate of Secondary Education" },
        { name: "IBDP", href: "/courses/ibdp", description: "International Baccalaureate Diploma Programme" },
        { name: "IGCSE", href: "/courses/igcse", description: "International General Certificate of Secondary Education" }
      ]
    },
    { name: "Pages", href: "/pages", hasDropdown: false },
    { 
      name: "Templates", 
      href: "/templates", 
      hasDropdown: true,
      dropdownItems: [
        { name: "Page Templates", href: "/templates/page-templates", description: "Landing pages, about pages, contact forms" },
        { name: "Course Templates", href: "/templates/course-templates", description: "Course pages, lesson layouts, assessments" },
        { name: "Dashboard Templates", href: "/templates/dashboard-templates", description: "Student, instructor, and admin dashboards" }
      ]
    },
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
                {item.hasDropdown ? (
                  <div className="relative group">
                    <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors text-foreground hover:text-accent cursor-pointer">
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-sm shadow-lg border border-[#feefea] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="p-4">
                        <div className="grid grid-cols-1 gap-3">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="flex flex-col p-3 rounded-sm hover:bg-[#feefea] transition-colors group"
                            >
                              <div className="font-medium text-[#1e293b] group-hover:text-[#e27447] transition-colors">
                                {dropdownItem.name}
                              </div>
                              <div className="text-sm text-[#1e293b] opacity-80">
                                {dropdownItem.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-[#feefea]">
                          <Link
                            href={item.href}
                            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-[#e27447] hover:bg-[#e27447]/10 rounded-sm transition-colors"
                          >
                            {item.name === "Courses" ? "View All Boards" : "View All Templates"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link 
                    href={item.href} 
                    className="flex items-center px-3 py-2 text-sm font-medium transition-colors text-foreground hover:text-accent"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">

            {/* User Actions */}
            {isMounted && user ? (
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="text-xs">
                  {user.email}
                </Badge>
                <Link href="/dashboard">
                  <Button size="sm">Dashboard</Button>
                </Link>
                <Button size="sm" variant="outline" onClick={signOut || (() => {})}>
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
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div className="px-3 py-2">
                      <div className="font-medium text-foreground mb-2">{item.name}</div>
                      <div className="ml-4 space-y-2">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block text-sm text-foreground hover:text-accent transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                        <Link
                          href={item.href}
                          className="block text-sm text-accent hover:text-accent/80 transition-colors font-medium"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name === "Courses" ? "View All Boards" : "View All Templates"}
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center justify-between px-3 py-2 text-base font-medium transition-colors text-foreground hover:text-accent"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-4 pb-3 border-t border-[#feefea]">
                {isMounted && user ? (
                  <div className="space-y-2 px-3">
                    <div className="text-sm text-foreground">{user.email}</div>
                    <Link href="/dashboard">
                      <Button size="sm" className="w-full">Dashboard</Button>
                    </Link>
                    <Button size="sm" variant="outline" className="w-full" onClick={signOut || (() => {})}>
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
