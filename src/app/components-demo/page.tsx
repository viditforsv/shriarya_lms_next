"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PromotionalCard } from "@/components/ui/promotional-card"
import { Pagination } from "@/components/ui/pagination"
import { ThemeToggle } from "@/components/ui/theme-toggle"

import { useState, useEffect } from "react"

export default function ComponentsDemoPage() {
  const [activeTab, setActiveTab] = useState("buttons")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const tabs = [
    { id: "colors", label: "Colors", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ) },
    { id: "buttons", label: "Buttons", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.122 2.122" />
      </svg>
    ) },
    { id: "forms", label: "Forms", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ) },
    { id: "cards", label: "Cards", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ) },
    { id: "badges", label: "Badges", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ) },
    { id: "breadcrumbs", label: "Breadcrumbs", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    ) },
    { id: "layout", label: "Layout", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ) },
    { id: "typography", label: "Typography", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ) },
    { id: "interactive", label: "Interactive", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ) },

    { id: "responsive", label: "Responsive", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ) },
    { id: "navigation", label: "Navigation", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ) },
    { id: "utilities", label: "Utilities", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ) },
    { id: "pagination", label: "Pagination", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ) },
    { id: "courses", label: "Courses", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ) },
    { id: "contact", label: "Contact", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ) },
    { id: "themes", label: "Themes", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ) }
  ]

  const renderButtonsSection = () => (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#1e293b] mb-6">Mathematics Learning Buttons</h2>
        <p className="text-lg text-[#1e293b] max-w-3xl mx-auto">Interactive buttons for math lessons, exercises, and assessments using our streamlined color palette</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* All Button Variants */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">All Button Variants</CardTitle>
            <CardDescription className="text-base">Complete showcase of all 4 button styles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" showArrow>Primary</Button>
                <Button variant="secondary" showArrow>Secondary</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" showArrow>Outline</Button>
                <Button variant="coral" showArrow>Coral</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="loadMore">Load More</Button>
                <Button variant="loadMore" showChevron>Show Options</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Button Sizes Across Variants */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Button Sizes</CardTitle>
            <CardDescription className="text-base">All variants in different sizes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm" variant="primary">Small</Button>
                <Button size="sm" variant="secondary">Small</Button>
                <Button size="sm" variant="coral">Small</Button>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="default" variant="primary">Default</Button>
                <Button size="default" variant="outline">Default</Button>
                <Button size="default" variant="coral">Default</Button>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" variant="primary">Large</Button>
                <Button size="lg" variant="secondary">Large</Button>
                <Button size="lg" variant="coral">Large</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Button 2.png Style Showcase */}
      <div className="mt-20">
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Button 2.png Style</CardTitle>
            <CardDescription className="text-base">Exact replica of the Button 2.png design with rounded-sm corners</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Button 2.png Exact Match */}
            <div>
              <h4 className="text-lg font-semibold text-[#1e293b] mb-4">Exact Button 2.png Replica</h4>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" showArrow>
                  Explore courses
                </Button>
                <Button variant="outline" showArrow>
                  View Lessons
                </Button>
                <Button variant="outline" showArrow>
                  Download Notes
                </Button>
              </div>
            </div>

            {/* Button 2.png Color Specifications */}
            <div className="pt-4 border-t border-[#feefea]">
              <h4 className="text-sm font-medium text-[#1e293b] mb-3">Button 2.png Color Specifications:</h4>
              <ul className="text-xs text-[#1e293b] space-y-2">
                <li>• <strong>Background:</strong> Pure white (#ffffff)</li>
                <li>• <strong>Text:</strong> Dark text (#1e293b)</li>
                <li>• <strong>Border:</strong> Light cream border (#feefea)</li>
                <li>• <strong>Hover Background:</strong> Very light cream (#fffefd)</li>
                <li>• <strong>Hover Border:</strong> Light cream (#feefea)</li>
                <li>• <strong>Corner Radius:</strong> rounded-sm (2px)</li>
                <li>• <strong>Arrow Icon:</strong> Same color as text (#1e293b)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Coral Button Variant */}
      <div className="mt-20">
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Coral Button Variant</CardTitle>
            <CardDescription className="text-base">New warm orange/coral button with #e27447 color</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Coral Button Examples */}
            <div>
              <h4 className="text-lg font-semibold text-[#1e293b] mb-4">Coral Button Examples</h4>
              <div className="flex flex-wrap gap-4">
                <Button variant="coral" showArrow>
                  Take Quiz
                </Button>
                <Button variant="coral" showArrow>
                  Start Assessment
                </Button>
                <Button variant="coral" showArrow>
                  Submit Assignment
                </Button>
              </div>
            </div>

            {/* Coral Button Specifications */}
            <div className="pt-4 border-t border-[#feefea]">
              <h4 className="text-sm font-medium text-[#1e293b] mb-3">Coral Button Specifications:</h4>
              <ul className="text-xs text-[#1e293b] space-y-2">
                <li>• <strong>Background:</strong> Warm coral (#e27447)</li>
                <li>• <strong>Text:</strong> White text for contrast</li>
                <li>• <strong>Hover Background:</strong> Darker coral (#d1653a)</li>
                <li>• <strong>Focus Ring:</strong> Same coral color (#e27447)</li>
                <li>• <strong>Corner Radius:</strong> rounded-sm (2px)</li>
                <li>• <strong>Usage:</strong> Call-to-action buttons, important actions</li>
                <li>• <strong>Arrow Icon:</strong> White color matching text</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mathematics Learning Action Buttons */}
      <div className="mt-20">
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Mathematics Learning Actions</CardTitle>
            <CardDescription className="text-base">Specialized buttons for math education platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Primary Actions */}
            <div>
              <h4 className="text-lg font-semibold text-[#1e293b] mb-4">Primary Learning Actions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="primary" showArrow className="w-full">
                  Start Learning
                </Button>
                <Button variant="primary" showArrow className="w-full">
                  Take Quiz
                </Button>
                <Button variant="primary" showArrow className="w-full">
                  Submit Assignment
                </Button>
              </div>
            </div>

            {/* Secondary Actions */}
            <div>
              <h4 className="text-lg font-semibold text-[#1e293b] mb-4">Secondary Actions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="secondary" showArrow className="w-full">
                  Practice Problems
                </Button>
                <Button variant="secondary" showArrow className="w-full">
                  View Solutions
                </Button>
                <Button variant="secondary" showArrow className="w-full">
                  Download Notes
                </Button>
              </div>
            </div>

            {/* Load More Actions */}
            <div>
              <h4 className="text-lg font-semibold text-[#1e293b] mb-4">Content Loading</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="loadMore" className="w-full">
                  Load More Lessons
                </Button>
                <Button variant="loadMore" showChevron className="w-full">
                  Show More Topics
                </Button>
                <Button variant="loadMore" className="w-full">
                  Load More Problems
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Button States & Interactions */}
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Button States */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Button States</CardTitle>
            <CardDescription className="text-base">Different states and interactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Button variant="primary" showArrow>Normal State</Button>
              <Button variant="primary" showArrow disabled>Disabled State</Button>
              <Button variant="primary" showArrow className="opacity-75">Loading State</Button>
            </div>
            <div className="pt-4 border-t border-[#feefea]">
              <h4 className="text-sm font-medium text-[#1e293b] mb-3">State Features:</h4>
              <ul className="text-xs text-[#1e293b] space-y-2">
                <li>• <strong>Normal:</strong> Full opacity and functionality</li>
                <li>• <strong>Disabled:</strong> Reduced opacity and no interaction</li>
                <li>• <strong>Loading:</strong> Visual feedback for async operations</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Features */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Interactive Features</CardTitle>
            <CardDescription className="text-base">Hover effects and animations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Button variant="primary" showArrow className="group">
                Hover for Arrow Animation
              </Button>
              <Button variant="secondary" showArrow className="group">
                Hover for Arrow Animation
              </Button>
              <Button variant="loadMore" showChevron className="group">
                Hover for Chevron Rotation
              </Button>
            </div>
            <div className="pt-4 border-t border-[#feefea]">
              <h4 className="text-sm font-medium text-[#1e293b] mb-3">Animation Features:</h4>
              <ul className="text-xs text-[#1e293b] space-y-2">
                <li>• <strong>Arrow:</strong> Moves up-right on hover</li>
                <li>• <strong>Chevron:</strong> Rotates 180° on hover</li>
                <li>• <strong>Transitions:</strong> Smooth 200ms animations</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Our Color Palette Buttons */}
      <div className="mt-20">
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Our Color Palette Buttons</CardTitle>
            <CardDescription className="text-base">Buttons showcasing our streamlined 6-color system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Primary Colors */}
            <div>
              <h4 className="text-lg font-semibold text-[#1e293b] mb-4">Primary Colors</h4>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#1e293b] hover:bg-[#0f172a] text-white border-[#1e293b]">
                  Dark Blue
                </Button>
                <Button className="bg-[#e27447] hover:bg-[#d1653a] text-white border-[#e27447]">
                  Orange
                </Button>
                <Button className="bg-[#ffffff] hover:bg-[#fffefd] text-[#1e293b] border-[#feefea]">
                  White
                </Button>
              </div>
            </div>

            {/* Background Colors */}
            <div>
              <h4 className="text-lg font-semibold text-[#1e293b] mb-4">Background Colors</h4>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#feefea] hover:bg-[#f5e6e0] text-[#1e293b] border-[#feefea]">
                  Light Cream
                </Button>
                <Button className="bg-[#fffefd] hover:bg-[#fef9f6] text-[#1e293b] border-[#feefea]">
                  Very Light Cream
                </Button>
                <Button className="bg-[#d6ebf4] hover:bg-[#c5e0eb] text-[#1e293b] border-[#d6ebf4]">
                  Light Blue
                </Button>
              </div>
            </div>

            {/* Color Specifications */}
            <div className="pt-4 border-t border-[#feefea]">
              <h4 className="text-sm font-medium text-[#1e293b] mb-3">Our Color System:</h4>
              <ul className="text-xs text-[#1e293b] space-y-2">
                <li>• <strong>Primary:</strong> #1e293b (Dark Blue), #e27447 (Orange), #ffffff (White)</li>
                <li>• <strong>Backgrounds:</strong> #feefea (Light Cream), #fffefd (Very Light Cream), #d6ebf4 (Light Blue)</li>
                <li>• <strong>All borders:</strong> Use cream colors instead of grays</li>
                <li>• <strong>Text:</strong> #1e293b for dark text, white for light backgrounds</li>
                <li>• <strong>Hover states:</strong> Slightly darker variations of base colors</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

    </section>
  )

  const renderFormsSection = () => (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#1e293b] mb-6">Mathematics Assessment Forms</h2>
        <p className="text-lg text-[#1e293b] max-w-3xl mx-auto">Forms for quizzes, homework submission, and student progress tracking using our design system</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Basic Input Fields */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-[#1e293b]">Input Fields</CardTitle>
            <CardDescription className="text-base text-[#1e293b]">Different input types and states with our color scheme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1e293b]">Student Name</label>
              <input 
                type="text" 
                placeholder="Enter student's full name"
                className="w-full px-4 py-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] placeholder-[#1e293b]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1e293b]">Student Email</label>
              <input 
                type="email" 
                placeholder="student@school.edu"
                className="w-full px-4 py-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] placeholder-[#1e293b]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1e293b]">Math Grade Level</label>
              <select className="w-full px-4 py-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] cursor-pointer">
                <option>Select Grade</option>
                <option>Grade 9 (CBSE/ICSE)</option>
                <option>Grade 10 (CBSE/ICSE)</option>
                <option>Grade 11 (IBDP)</option>
                <option>Grade 12 (IBDP)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1e293b]">Math Topic</label>
              <textarea 
                placeholder="Describe the math concept you're learning..."
                rows={3}
                className="w-full px-4 py-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] placeholder-[#1e293b] resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Validation States */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-[#1e293b]">Validation States</CardTitle>
            <CardDescription className="text-base text-[#1e293b]">Input fields with different validation states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1e293b]">Valid Input</label>
              <input 
                type="text" 
                defaultValue="Valid input"
                className="w-full px-4 py-3 border border-[#10b981] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-200 bg-[#f0fdf4] text-[#065f46]"
              />
              <p className="text-xs text-[#10b981] font-medium">✓ Input is valid</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1e293b]">Error Input</label>
              <input 
                type="email" 
                defaultValue="invalid-email"
                className="w-full px-4 py-3 border border-[#ef4444] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#ef4444] focus:border-[#ef4444] transition-all duration-200 bg-[#fef2f2] text-[#991b1b]"
              />
              <p className="text-xs text-[#ef4444] font-medium">✗ Please enter a valid email address</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1e293b]">Disabled Input</label>
              <input 
                type="text" 
                defaultValue="Disabled field"
                disabled
                className="w-full px-4 py-3 border border-[#feefea] rounded-sm bg-[#fffefd] text-[#1e293b] opacity-50 cursor-not-allowed"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Layouts */}
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Math Assessment Form */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-[#1e293b]">Mathematics Assessment Form</CardTitle>
            <CardDescription className="text-base text-[#1e293b]">Form for submitting math homework and assessments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1b4a56]">Student Name</label>
                <input 
                  type="text" 
                  placeholder="Student's full name"
                  className="w-full px-4 py-3 border border-[#e2e8f0] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] placeholder-[#475569]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1e293b]">Class/Grade</label>
                <select className="w-full px-4 py-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] cursor-pointer">
                  <option>Select Class</option>
                  <option>Grade 9 CBSE</option>
                  <option>Grade 10 CBSE</option>
                  <option>Grade 11 IBDP</option>
                  <option>Grade 12 IBDP</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1e293b]">Mathematics Topic</label>
              <select className="w-full px-4 py-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] cursor-pointer">
                <option>Select Topic</option>
                <option>Algebra</option>
                <option>Geometry</option>
                <option>Calculus</option>
                <option>Statistics</option>
                <option>Trigonometry</option>
                <option>Number Theory</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1b4a56]">Assignment Type</label>
              <select className="w-full px-4 py-3 border border-[#e2e8f0] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] cursor-pointer">
                <option>Select Type</option>
                <option>Homework</option>
                <option>Quiz</option>
                <option>Project</option>
                <option>Practice Problems</option>
                <option>Assessment</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1b4a56]">Problem Description</label>
              <textarea 
                placeholder="Describe the math problem or concept you're working on..."
                rows={4}
                className="w-full px-4 py-3 border border-[#e2e8f0] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] placeholder-[#475569] resize-none"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                id="help-needed"
                className="w-5 h-5 text-[#e27447] border-[#e2e8f0] rounded-sm focus:ring-2 focus:ring-[#e27447] focus:ring-offset-2 cursor-pointer"
              />
              <label htmlFor="help-needed" className="text-sm text-[#1b4a56] cursor-pointer">
                I need help understanding this concept
              </label>
            </div>
          </CardContent>
          <CardFooter className="pt-6">
            <Button variant="primary" className="w-full" showArrow>Submit Assignment</Button>
          </CardFooter>
        </Card>

        {/* Search & Filter Form */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-[#1b4a56]">Search & Filters</CardTitle>
            <CardDescription className="text-base text-[#4a6f73]">Advanced search with filters and options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1b4a56]">Search</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search math topics, lessons..."
                  className="w-full pl-12 pr-4 py-3 border border-[#e2e8f0] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] placeholder-[#475569]"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-[#475569]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1b4a56]">Subject</label>
                <select className="w-full px-4 py-3 border border-[#e2e8f0] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] cursor-pointer">
                  <option>All Subjects</option>
                  <option>Algebra</option>
                  <option>Geometry</option>
                  <option>Calculus</option>
                  <option>Statistics</option>
                  <option>Trigonometry</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1b4a56]">Difficulty</label>
                <select className="w-full px-4 py-3 border border-[#e2e8f0] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] cursor-pointer">
                  <option>All Levels</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-[#1b4a56]">Date Range</label>
              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="date" 
                  className="px-4 py-3 border border-[#e2e8f0] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] cursor-pointer"
                />
                <input 
                  type="date" 
                  className="px-4 py-3 border border-[#e2e8f0] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] cursor-pointer"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-[#1b4a56]">Filters</label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    id="urgent"
                    className="w-5 h-5 text-[#e27447] border-[#e2e8f0] rounded-sm focus:ring-2 focus:ring-[#e27447] focus:ring-offset-2 cursor-pointer"
                  />
                  <label htmlFor="urgent" className="text-sm text-[#1b4a56] cursor-pointer">Urgent assignments only</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    id="international"
                    className="w-5 h-5 text-[#e27447] border-[#e2e8f0] rounded-sm focus:ring-2 focus:ring-[#e27447] focus:ring-offset-2 cursor-pointer"
                  />
                  <label htmlFor="international" className="text-sm text-[#1b4a56] cursor-pointer">International curriculum</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    id="consultation"
                    className="w-5 h-5 text-[#e27447] border-[#e2e8f0] rounded-sm focus:ring-2 focus:ring-[#e27447] focus:ring-offset-2 cursor-pointer"
                  />
                  <label htmlFor="consultation" className="text-sm text-[#1b4a56] cursor-pointer">Free consultation</label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-3 pt-6">
            <Button variant="secondary" className="flex-1">Clear Filters</Button>
            <Button variant="primary" className="flex-1" showArrow>Apply Filters</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )

  const renderCardsSection = () => (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#1b4a56] mb-6">Mathematics Learning Cards</h2>
        <p className="text-lg text-[#4a6f73] max-w-3xl mx-auto">Cards for lessons, practice problems, and progress tracking using our design system</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Basic Card */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-[#e2e8f0]">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl text-[#1b4a56]">Basic Card</CardTitle>
            <CardDescription className="text-[#4a6f73]">
              A simple card with header, content, and footer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#4a6f73]">
              This is the main content area of the card. It can contain any type of content.
            </p>
          </CardContent>
          <CardFooter className="pt-6">
            <Button variant="secondary" className="w-full">Action</Button>
          </CardFooter>
        </Card>

        {/* Math Lesson Card */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-[#e2e8f0]">
          <CardHeader className="pb-6">
            <div className="w-14 h-14 bg-[#f1f5f9] rounded-sm flex items-center justify-center mb-4 border border-[#e2e8f0]">
              <div className="h-8 w-8 bg-[#e27447] rounded-sm text-white font-bold text-lg">∫</div>
            </div>
            <CardTitle className="text-xl text-[#1b4a56]">Calculus Fundamentals</CardTitle>
            <CardDescription className="text-[#4a6f73]">
              Introduction to derivatives, limits, and basic integration techniques.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center text-sm text-[#4a6f73]">
                <div className="h-3 w-3 bg-[#e27447] rounded-full mr-3"></div>
                Limits & Continuity
              </div>
              <div className="flex items-center text-sm text-[#4a6f73]">
                <div className="h-3 w-3 bg-[#e27447] rounded-full mr-3"></div>
                Derivatives
              </div>
              <div className="flex items-center text-sm text-[#4a6f73]">
                <div className="h-3 w-3 bg-[#e27447] rounded-full mr-3"></div>
                Basic Integration
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-6">
            <Button variant="primary" className="w-full" showArrow>Start Lesson</Button>
          </CardFooter>
        </Card>

        {/* Math Progress Card */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-[#e2e8f0]">
          <CardContent className="pt-6">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-[#f1f5f9] rounded-sm flex items-center justify-center mr-4 border border-[#e2e8f0]">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h4 className="font-semibold text-[#1b4a56]">Progress Tracker</h4>
                <p className="text-sm text-[#4a6f73]">Calculus Module</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#4a6f73]">Limits</span>
                <span className="text-[#1b4a56] font-medium">85%</span>
              </div>
              <div className="w-full bg-[#f1f5f9] rounded-sm h-2 border border-[#e2e8f0]">
                <div className="bg-[#e27447] h-2 rounded-sm" style={{width: '85%'}}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#4a6f73]">Derivatives</span>
                <span className="text-[#1b4a56] font-medium">60%</span>
              </div>
              <div className="w-full bg-[#f1f5f9] rounded-sm h-2 border border-[#e2e8f0]">
                <div className="bg-[#e27447] h-2 rounded-sm" style={{width: '60%'}}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Promotional Card */}
      <div className="mt-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-[#1b4a56] mb-4">Promotional Card</h3>
          <p className="text-lg text-[#4a6f73] max-w-3xl mx-auto">Full-width promotional cards with dark navy background and call-to-action buttons</p>
        </div>
        
        <div className="space-y-6">
          <PromotionalCard
            heading="Join More Than 1 Million Learners Worldwide"
            subtext="Effective learning starts with assessment. Learning a new skill is hard work—Signal makes it easier."
            buttonText="Get Started Now"
            buttonHref="/get-started"
          />
          
          <PromotionalCard
            heading="Master Mathematics with Expert Guidance"
            subtext="From basic arithmetic to advanced calculus, our comprehensive curriculum adapts to your learning pace."
            buttonText="Start Learning"
            buttonHref="/courses"
          />
        </div>
      </div>
    </section>
  )

  const renderBadgesSection = () => (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#1b4a56] mb-6">Mathematics Learning Badges</h2>
        <p className="text-lg text-[#4a6f73] max-w-3xl mx-auto">Small labels for categorization and status using our design system</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-[#e2e8f0]">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-[#1b4a56]">Basic Variants</CardTitle>
            <CardDescription className="text-base text-[#4a6f73]">Standard badge styles and colors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Badge className="px-4 py-2 text-sm">Default</Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">Secondary</Badge>
              <Badge variant="destructive" className="px-4 py-2 text-sm">Destructive</Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm">Outline</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )

  const renderBreadcrumbsSection = () => (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#1b4a56] mb-6">Navigation Breadcrumbs</h2>
        <p className="text-lg text-[#4a6f73] max-w-3xl mx-auto">Hierarchical navigation paths with home icons and chevron separators</p>
      </div>
      
      <div className="space-y-8">
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-[#e2e8f0]">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-[#1b4a56]">Basic Breadcrumbs</CardTitle>
            <CardDescription className="text-base text-[#4a6f73]">Simple navigation paths with home icons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Courses", href: "/courses" }
              ]} />
              
              <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Learning", href: "/learning" },
                { label: "Tutorials", href: "/learning/tutorials" }
              ]} />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-[#e2e8f0]">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-[#1b4a56]">Complex Paths</CardTitle>
            <CardDescription className="text-base text-[#4a6f73]">Longer navigation hierarchies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Development", href: "/development" },
                { label: "Web Development", href: "/development/web" },
                { label: "Frontend", href: "/development/web/frontend" }
              ]} />
              
              <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Mathematics", href: "/mathematics" },
                { label: "Algebra", href: "/mathematics/algebra" },
                { label: "Linear Equations", href: "/mathematics/algebra/linear-equations" },
                { label: "Solving Systems", href: "/mathematics/algebra/linear-equations/systems" }
              ]} />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )

  const renderLayoutSection = () => (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4">Layout Components</h2>
        <p className="text-[#4a6f73]">Grid systems and layout patterns</p>
      </div>
      
      <div className="space-y-12">
        {/* Grid System */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Responsive Grid</CardTitle>
            <CardDescription>Grid system that adapts to different screen sizes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-[#81c3c9]/20 p-6 rounded-sm text-center border border-[#4a6f73]">
                  <p className="text-sm font-medium text-[#1b4a56]">Grid Item {i + 1}</p>
                  <p className="text-xs text-[#4a6f73] mt-1">Responsive</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Flexbox */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Flexbox Layout</CardTitle>
            <CardDescription>Flexible layout patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-[#81c3c9]/20 p-6 rounded-sm border border-[#4a6f73]">
                <p className="text-sm font-medium text-[#1b4a56]">Flex Item 1</p>
              </div>
              <div className="flex-1 bg-[#81c3c9]/20 p-6 rounded-sm border border-[#4a6f73]">
                <p className="text-sm font-medium text-[#1b4a56]">Flex Item 2</p>
              </div>
              <div className="flex-1 bg-[#81c3c9]/20 p-6 rounded-sm border border-[#4a6f73]">
                <p className="text-sm font-medium text-[#1b4a56]">Flex Item 3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Landing Page Stats Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Landing Page Stats Section</CardTitle>
            <CardDescription>Two-column layout with student image and impressive statistics</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-[#fff5f5] to-[#fef2f2] rounded-sm shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Left Side - Student Image */}
                <div className="lg:w-1/2 p-8 lg:p-0">
                  <div className="h-full min-h-[300px] lg:min-h-[400px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-r-sm lg:rounded-r-none flex items-center justify-center">
                    {/* Placeholder for student learning image */}
                    <div className="text-center text-gray-500">
                      <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <p className="text-sm">Student Learning Image</p>
                      <p className="text-xs">(Laptop, headphones, books)</p>
                    </div>
                  </div>
                </div>

                {/* Right Side - Content & Stats */}
                <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
                  {/* Heading */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#1b4a56] mb-4 font-cardo leading-tight">
                    Master Mathematics with Confidence
                  </h3>
                  
                  {/* Subtext */}
                  <p className="text-base text-[#4a6f73] mb-8 font-dm-sans leading-relaxed max-w-lg">
                    Our expert faculty help students succeed in IBDP, ICSE, and beyond with structured lessons and personalized support.
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { number: "10,000+", label: "IBDP & ICSE Students Taught" },
                      { number: "500+", label: "Expert Mathematics Lessons" },
                      { number: "50+", label: "International School Partnerships" },
                      { number: "95%+", label: "Student Success Rate" }
                    ].map((stat, index) => (
                      <div key={index} className="relative">
                        {/* Stat Number */}
                        <div className="text-2xl lg:text-3xl font-bold text-[#1b4a56] mb-2 font-cardo">
                          {stat.number}
                        </div>
                        
                        {/* Stat Label */}
                        <div className="text-xs text-[#4a6f73] font-dm-sans leading-tight">
                          {stat.label}
                        </div>
                        
                        {/* Accent Separator Line */}
                        <div className="absolute -bottom-3 left-0 w-10 h-0.5 bg-[#E57342] rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Study With Us Feature Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Why Study With Us Feature Section</CardTitle>
            <CardDescription>Three-column feature layout with icons, titles, and descriptions</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-[#1b4a56] mb-4 font-cardo leading-tight">
                Why Study Mathematics With Us?
              </h3>
              <p className="text-base text-[#4a6f73] font-dm-sans max-w-3xl mx-auto leading-relaxed">
                Trusted by IBDP and ICSE students worldwide to master math with confidence.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  ),
                  title: "Expert IBDP & ICSE Teachers",
                  description: "Learn directly from experienced faculty specializing in Mathematics AA, AI, and ICSE board prep.",
                  bgColor: "bg-[#e0f2fe]"
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  ),
                  title: "Personalized Learning Roadmaps",
                  description: "Adaptive pathways ensure every student strengthens weak areas and excels in exams.",
                  bgColor: "bg-[#f3e8ff]"
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Proven Track Record",
                  description: "95%+ success rate in board exams and IB assessments with structured practice.",
                  bgColor: "bg-[#ecfdf5]"
                }
              ].map((feature, index) => (
                <div key={index} className="text-center group">
                  {/* Icon with Pastel Background */}
                  <div className={`w-20 h-20 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-[#1b4a56]">
                      {feature.icon}
                    </div>
                  </div>

                  {/* Feature Title */}
                  <h4 className="text-xl font-bold text-[#1b4a56] mb-4 font-dm-sans">
                    {feature.title}
                  </h4>

                  {/* Feature Description */}
                  <p className="text-[#4a6f73] font-dm-sans leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filter Sidebar Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Filter Sidebar Section</CardTitle>
            <CardDescription>Interactive sidebar with collapsible filter sections and expandable options</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex gap-8 p-8">
              {/* Sidebar */}
              <div className="w-80 bg-white rounded-sm shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-[#1b4a56] mb-6 font-dm-sans">Filters</h3>
                
                <div className="space-y-6">
                  {[
                    {
                      id: 'curriculum',
                      title: 'Curriculum',
                      type: 'checkbox',
                      items: [
                        { label: 'IBDP Math AA HL', count: 24 },
                        { label: 'IBDP Math AI SL', count: 18 },
                        { label: 'ICSE Grade 9', count: 12 },
                        { label: 'ICSE Grade 10', count: 15 },
                        { label: 'CBSE Board', count: 20 }
                      ],
                      showMore: true
                    },
                    {
                      id: 'duration',
                      title: 'Duration',
                      type: 'checkbox',
                      items: [
                        { label: 'Short Lessons (0–30 min)', count: 14 },
                        { label: 'Full Classes (1–2 hours)', count: 10 },
                        { label: 'Extended Practice (2–5 hours)', count: 8 }
                      ]
                    },
                    {
                      id: 'features',
                      title: 'Features',
                      type: 'checkbox',
                      items: [
                        { label: 'Step-by-step Solutions', count: 22 },
                        { label: 'Practice Quizzes', count: 18 },
                        { label: 'Past Year Papers', count: 12 },
                        { label: 'Video Explanations', count: 25 }
                      ]
                    },
                    {
                      id: 'difficulty',
                      title: 'Difficulty Level',
                      type: 'checkbox',
                      items: [
                        { label: 'Beginner', count: 15 },
                        { label: 'Intermediate', count: 20 },
                        { label: 'Advanced', count: 12 }
                      ]
                    },
                    {
                      id: 'rating',
                      title: 'Rating',
                      type: 'radio',
                      items: [
                        { label: '★★★★★', count: 40 },
                        { label: '★★★★☆', count: 22 },
                        { label: '★★★☆☆', count: 5 }
                      ]
                    },
                    {
                      id: 'instructor',
                      title: 'Instructor',
                      type: 'checkbox',
                      items: [
                        { label: 'Shrividhya Faculty', count: 12 },
                        { label: 'Guest IB Examiners', count: 6 },
                        { label: 'ICSE Specialists', count: 8 }
                      ],
                      showMore: true
                    }
                  ].map((section) => (
                    <div key={section.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                      {/* Section Header */}
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-[#1b4a56] font-dm-sans">
                          {section.title}
                        </h4>
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      {/* Section Content */}
                      <div className="space-y-3">
                        {section.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            {section.type === 'checkbox' ? (
                              <div className="w-4 h-4 border-2 border-gray-300 rounded">
                                {/* Checkbox placeholder */}
                              </div>
                            ) : (
                              <div className="w-4 h-4 border-2 border-gray-300 rounded-full">
                                {/* Radio button placeholder */}
                              </div>
                            )}
                            <span className="text-sm text-[#4a6f73]">
                              {item.label}
                            </span>
                            <span className="text-xs text-gray-400 ml-auto">
                              ({item.count})
                            </span>
                          </div>
                        ))}
                        
                        {/* Show More Link */}
                        {section.showMore && (
                          <button className="text-sm text-[#E57342] hover:text-[#D56538] font-medium transition-colors">
                            Show More
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Filters Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                                      <button className="w-full bg-[#1b4a56] hover:bg-[#0f2d35] text-white font-medium py-3 px-4 rounded-sm transition-colors font-dm-sans">
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Content Preview */}
              <div className="flex-1">
                <div className="bg-gray-50 border-dashed border-2 border-gray-300 rounded-sm p-12 text-center">
                  <div className="text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.121A1 1 0 013 6.414V4z" />
                    </svg>
                    <h4 className="text-lg font-semibold text-gray-600 mb-2">Filter Sidebar Active</h4>
                    <p className="text-sm text-gray-500">Course content would appear here based on selected filters</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course List View Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Course List View Section</CardTitle>
            <CardDescription>Horizontal course cards with thumbnails, details, and pagination</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-8">
              {/* Header with Sorting */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-[#1b4a56] mb-2 font-dm-sans">Available Courses</h3>
                  <p className="text-[#4a6f73] font-dm-sans">Browse our comprehensive mathematics courses</p>
                </div>
                
                {/* Sorting Dropdown */}
                <div className="relative mt-4 sm:mt-0">
                  <select className="appearance-none bg-white border border-gray-300 rounded-sm px-4 py-2 pr-8 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-[#E57342] focus:border-transparent">
                    <option value="default">Default</option>
                    <option value="popular">Most Popular</option>
                    <option value="highest-rated">Highest Rated</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Course Cards */}
              <div className="space-y-6">
                {[
                  {
                    id: 1,
                    title: "IBDP Math AA HL – Complete Problem Solving",
                    subtitle: "Master advanced calculus, algebra, and problem-solving techniques for IBDP Mathematics AA Higher Level. Comprehensive coverage of all syllabus topics with extensive practice.",
                    instructor: "Shrividhya Faculty",
                    lessons: 24,
                    students: 320,
                    duration: "18 Hours",
                    rating: 4.8,
                    reviews: 230,
                    badge: "IBDP HL Special",
                    price: "₹3,999"
                  },
                  {
                    id: 2,
                    title: "IBDP Math AI SL – Data & Applications Mastery",
                    subtitle: "Explore statistics, modeling, and real-world applications in IBDP Mathematics AI Standard Level. Perfect for students interested in data science and practical mathematics.",
                    instructor: "Shrividhya Faculty",
                    lessons: 18,
                    students: 245,
                    duration: "15 Hours",
                    rating: 4.7,
                    reviews: 189,
                    badge: "Board Exam Prep",
                    price: "₹2,999"
                  },
                  {
                    id: 3,
                    title: "ICSE Grade 10 Math – Final Exam Booster",
                    subtitle: "Intensive preparation for ICSE Grade 10 Mathematics final examinations. Covers all board topics with practice papers and step-by-step solutions.",
                    instructor: "Shrividhya Faculty",
                    lessons: 20,
                    students: 412,
                    duration: "16 Hours",
                    rating: 4.9,
                    reviews: 298,
                    badge: "Featured",
                    price: "₹2,499"
                  }
                ].map((course, index) => (
                  <div key={course.id}>
                    {/* Course Card */}
                    <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200">
                      <CardContent className="p-0">
                        <div className="flex flex-col lg:flex-row">
                          {/* Thumbnail Image */}
                          <div className="lg:w-48 lg:h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-l-sm flex items-center justify-center">
                            <div className="text-center text-gray-500">
                              <svg className="w-16 h-16 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              <p className="text-xs">Course Thumbnail</p>
                            </div>
                          </div>

                          {/* Course Details */}
                          <div className="flex-1 p-6">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between h-full">
                              {/* Left Side - Course Info */}
                              <div className="flex-1 lg:pr-6">
                                {/* Meta Info Row */}
                                <div className="flex items-center gap-6 mb-3 text-sm text-[#4a6f73]">
                                  <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    <span>{course.lessons} Lessons</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span>{course.students} Students</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{course.duration}</span>
                                  </div>
                                </div>

                                {/* Course Title */}
                                <h4 className="text-lg font-bold text-[#1b4a56] mb-2 font-dm-sans leading-tight">
                                  {course.title}
                                </h4>

                                {/* Course Subtitle */}
                                <p className="text-[#4a6f73] mb-3 font-dm-sans line-clamp-2 leading-relaxed text-sm">
                                  {course.subtitle}
                                </p>

                                {/* Instructor */}
                                <p className="text-sm text-[#4a6f73] mb-3 font-dm-sans">
                                  By: {course.instructor}
                                </p>

                                {/* Rating Row */}
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4 text-yellow-500 fill-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    <span className="font-semibold text-sm">{course.rating}</span>
                                  </div>
                                  <span className="text-sm text-gray-500">({course.reviews})</span>
                                </div>

                                {/* Badge */}
                                <Badge className="bg-[#E57342] text-white border-0 font-dm-sans">
                                  {course.badge}
                                </Badge>
                              </div>

                              {/* Right Side - Price */}
                              <div className="mt-4 lg:mt-0 lg:flex-shrink-0">
                                <div className="text-right">
                                  <div className="text-xl font-bold text-[#E57342] font-dm-sans">
                                    {course.price}
                                  </div>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="mt-2 hover:bg-[#1b4a56] hover:text-white transition-colors"
                                  >
                                    Enroll Now
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Divider (except for last item) */}
                    {index < 2 && (
                      <div className="h-px bg-gray-200 my-6"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-[#4a6f73] font-dm-sans mb-4 sm:mb-0">
                    Showing 1–3 of 3 Courses
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Previous</Button>
                    <Button variant="outline" size="sm" className="bg-[#1b4a56] text-white">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )

  const renderTypographySection = () => (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4">Typography</h2>
        <p className="text-[#4a6f73]">Text hierarchy and sizing system</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b4a56] mb-2 font-cardo">Heading 1 - Main Title</h1>
              <p className="text-sm text-[#8A8A8A] font-dm-sans">Used for page titles and hero sections</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#1b4a56] mb-2 font-cardo">Heading 2 - Section Title</h2>
              <p className="text-sm text-[#8A8A8A] font-dm-sans">Used for major section headings</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#1b4a56] mb-2 font-cardo">Heading 3 - Subsection</h3>
              <p className="text-sm text-[#8A8A8A] font-dm-sans">Used for subsections and card titles</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-[#1b4a56] mb-2 font-cardo">Heading 4 - Card Title</h4>
              <p className="text-sm text-[#8A8A8A] font-dm-sans">Used for card titles and smaller headings</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-lg text-[#1b4a56] mb-1 font-dm-sans">Body Large</p>
                <p className="text-sm text-[#8A8A8A] font-dm-sans">Used for highlighted content</p>
              </div>
              <div>
                <p className="text-base text-[#1b4a56] mb-1 font-dm-sans">Body Default</p>
                <p className="text-sm text-[#8A8A8A] font-dm-sans">Used for regular content</p>
              </div>
              <div>
                <p className="text-sm text-[#4a6f73] mb-1 font-dm-sans">Body Small</p>
                <p className="text-sm text-[#8A8A8A] font-dm-sans">Used for captions and secondary text</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )



  const renderInteractiveSection = () => (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4">Interactive Elements</h2>
        <p className="text-[#4a6f73]">Hover effects and focus states</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Hover Effects</CardTitle>
            <CardDescription>Interactive hover states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="hover:scale-105 transition-transform">Hover Scale</Button>
            <Button variant="secondary" className="hover:bg-[#81c3c9]/20 transition-colors">Hover Color</Button>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <p className="text-sm">Hover this card</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Focus States</CardTitle>
            <CardDescription>Accessibility-focused interactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="focus:ring-2 focus:ring-[#ff2768] focus:ring-offset-2">Focus Ring</Button>
            <Button variant="secondary" className="focus:bg-[#81c3c9]/20">Focus Background</Button>
            <div className="p-4 border border-[#4a6f73] rounded-sm focus-within:ring-2 focus-within:ring-[#ff2768]">
              <p className="text-sm">Focus container</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )

  const renderServicesSection = () => (
    <section className="mb-20">
      {/* Project Showcase Cards */}
      <div className="space-y-8 mb-16">
        <h3 className="text-2xl font-bold text-[#1b4a56] text-center">Project Showcase</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-[#ff2768] to-[#81c3c9] relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <Badge variant="secondary" className="mb-2">React.js</Badge>
                <Badge variant="outline" className="ml-2">TypeScript</Badge>
              </div>
            </div>
            <CardContent className="pt-6">
              <h4 className="text-lg font-semibold text-[#1b4a56] mb-2">E-Commerce Platform</h4>
              <p className="text-[#4a6f73] text-sm mb-4">
                Modern e-commerce solution with advanced features and mobile-first design
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#8A8A8A]">Completed 2024</span>
                <button className="text-[#ff2768] hover:text-[#ff2768]/80 text-sm font-medium">
                  View Project →
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-[#1b4a56] to-[#4a6f73] relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <Badge variant="secondary" className="mb-2">Next.js</Badge>
                <Badge variant="outline" className="ml-2">Tailwind CSS</Badge>
              </div>
            </div>
            <CardContent className="pt-6">
              <h4 className="text-lg font-semibold text-[#1b4a56] mb-2">Corporate Website</h4>
              <p className="text-[#4a6f73] text-sm mb-4">
                Professional corporate website with CMS integration and SEO optimization
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#8A8A8A]">Completed 2024</span>
                <button className="text-[#ff2768] hover:text-[#ff2768]/80 text-sm font-medium">
                  View Project →
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-[#81c3c9] to-[#ff2768] relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <Badge variant="secondary" className="mb-2">Vue.js</Badge>
                <Badge variant="outline" className="ml-2">Node.js</Badge>
              </div>
            </div>
            <CardContent className="pt-6">
              <h4 className="text-lg font-semibold text-[#1b4a56] mb-2">SaaS Dashboard</h4>
              <p className="text-[#4a6f73] text-sm mb-4">
                Comprehensive SaaS platform with analytics dashboard and user management
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#8A8A8A]">In Progress</span>
                <button className="text-[#ff2768] hover:text-[#ff2768]/80 text-sm font-medium">
                  View Project →
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Service Cards */}
      <div className="space-y-8 mb-16">
        <h3 className="text-2xl font-bold text-[#1b4a56] text-center">Our Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-[#ff2768]">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 bg-[#ff2768]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#ff2768]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-[#1b4a56] mb-3">Web Development</h4>
              <p className="text-[#4a6f73] mb-6">
                Custom web applications built with modern technologies and best practices
              </p>
              <Badge variant="default">From $5,000</Badge>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-[#81c3c9]">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 bg-[#81c3c9]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#81c3c9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-[#1b4a56] mb-3">Mobile Apps</h4>
              <p className="text-[#4a6f73] mb-6">
                Cross-platform mobile applications for iOS and Android devices
              </p>
              <Badge variant="secondary">From $8,000</Badge>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-[#4a6f73]">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 bg-[#4a6f73]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#4a6f73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-[#1b4a56] mb-3">Analytics & SEO</h4>
              <p className="text-[#4a6f73] mb-6">
                Data-driven insights and search engine optimization for better visibility
              </p>
              <Badge variant="outline">From $2,000</Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Client Logos */}
      <div className="space-y-8 mb-16">
        <h3 className="text-2xl font-bold text-[#1b4a56] text-center">Trusted By</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {[
            { name: "TechCorp", logo: "TC" },
            { name: "InnovateLab", logo: "IL" },
            { name: "StartupHub", logo: "SH" },
            { name: "DigitalFlow", logo: "DF" },
            { name: "CloudTech", logo: "CT" },
            { name: "DataViz", logo: "DV" }
          ].map((client) => (
            <div key={client.name} className="flex items-center justify-center">
              <div className="w-20 h-20 bg-[#81c3c9]/20 rounded-sm flex items-center justify-center border border-[#4a6f73]/20 hover:border-[#ff2768] transition-colors group">
                <span className="text-xl font-bold text-[#1b4a56] group-hover:text-[#ff2768] transition-colors">
                  {client.logo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Table */}
      <div className="space-y-8 mb-16">
        <h3 className="text-2xl font-bold text-[#1b4a56] text-center">Pricing Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="pt-8 pb-8">
              <h4 className="text-xl font-semibold text-[#1b4a56] mb-2">Starter</h4>
              <div className="text-3xl font-bold text-[#ff2768] mb-6">$5,000</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center text-[#4a6f73]">
                  <svg className="w-4 h-4 text-[#ff2768] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Responsive Website
                </li>
                <li className="flex items-center text-[#4a6f73]">
                  <svg className="w-4 h-4 text-[#ff2768] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  SEO Optimization
                </li>
                <li className="flex items-center text-[#4a6f73]">
                  <svg className="w-4 h-4 text-[#ff2768] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  3 Months Support
                </li>
              </ul>
              <Button variant="secondary" className="w-full">Get Started</Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-[#ff2768] relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge variant="default">Most Popular</Badge>
            </div>
            <CardContent className="pt-8 pb-8">
              <h4 className="text-xl font-semibold text-[#1b4a56] mb-2">Professional</h4>
              <div className="text-3xl font-bold text-[#ff2768] mb-6">$12,000</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center text-[#4a6f73]">
                  <svg className="w-4 h-4 text-[#ff2768] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom Web Application
                </li>
                <li className="flex items-center text-[#4a6f73]">
                  <svg className="w-4 h-4 text-[#ff2768] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Database Integration
                </li>
                <li className="flex items-center text-[#4a6f73]">
                  <svg className="w-4 h-4 text-[#ff2768] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  6 Months Support
                </li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="pt-8 pb-8">
              <h4 className="text-xl font-semibold text-[#1b4a56] mb-2">Enterprise</h4>
              <div className="text-3xl font-bold text-[#ff2768] mb-6">$25,000+</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center text-[#4a6f73]">
                  <svg className="w-4 h-4 text-[#ff2768] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Full-Stack Solution
                </li>
                <li className="flex items-center text-[#4a6f73]">
                  <svg className="w-4 h-4 text-[#ff2768] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom Features
                </li>
                <li className="flex items-center text-[#4a6f73]">
                  <svg className="w-4 h-4 text-[#ff2768] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  12 Months Support
                </li>
              </ul>
              <Button variant="secondary" className="w-full">Contact Sales</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Form */}
      
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-[#1b4a56] text-center">Get In Touch</h3>
        <Card className="max-w-2xl mx-auto hover:shadow-xl transition-all duration-300">
          <CardContent className="pt-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1b4a56] mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-[#4a6f73] rounded-sm focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1b4a56] mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-[#4a6f73] rounded-sm focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b4a56] mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-[#4a6f73] rounded-sm focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b4a56] mb-2">Project Type</label>
                <select className="w-full px-4 py-2 border border-[#4a6f73] rounded-sm focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all">
                  <option>Select a project type</option>
                  <option>Website Development</option>
                  <option>Mobile App</option>
                  <option>E-commerce Platform</option>
                  <option>Custom Web Application</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b4a56] mb-2">Project Description</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-[#4a6f73] rounded-sm focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <div className="text-center">
                <Button className="px-8 py-3 text-lg">
                  Send Message
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )

  const renderContactSection = () => (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4">Contact Us</h2>
        <p className="text-[#4a6f73]">Get in touch for custom solutions</p>
      </div>
      
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-[#1b4a56] text-center">Get In Touch</h3>
        <Card className="max-w-2xl mx-auto hover:shadow-xl transition-all duration-300">
          <CardContent className="pt-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1b4a56] mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-[#4a6f73] rounded-sm focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1b4a56] mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-[#4a6f73] rounded-sm focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b4a56] mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-[#4a6f73] rounded-sm focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b4a56] mb-2">Project Type</label>
                <select className="w-full px-4 py-2 border border-[#4a6f73] rounded-sm focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all">
                  <option>Select a project type</option>
                  <option>Website Development</option>
                  <option>Mobile App</option>
                  <option>E-commerce Platform</option>
                  <option>Custom Web Application</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b4a56] mb-2">Project Description</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-[#4a6f73] rounded-sm focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <div className="text-center">
                <Button className="px-8 py-3 text-lg">
                  Send Message
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )

  const renderResponsiveSection = () => (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4">Responsive Design</h2>
        <p className="text-[#4a6f73]">Mobile-first responsive patterns</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Breakpoint Indicators</CardTitle>
          <CardDescription>Current screen size detection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-[#81c3c9]/20 p-6 rounded-sm border border-[#4a6f73]">
            <p className="text-sm font-medium text-[#1b4a56] mb-4">Current Breakpoint:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-[#81c3c9]/40 p-3 rounded text-xs text-[#1b4a56]">
                Mobile: <span className="md:hidden font-bold">✓ Active</span><span className="hidden md:inline">Hidden</span>
              </div>
              <div className="bg-[#81c3c9]/40 p-3 rounded text-xs text-[#1b4a56]">
                Tablet: <span className="hidden md:inline lg:hidden font-bold">✓ Active</span><span className="md:hidden lg:inline">Hidden</span>
              </div>
              <div className="bg-[#81c3c9]/40 p-3 rounded text-xs text-[#1b4a56]">
                Desktop: <span className="hidden lg:inline font-bold">✓ Active</span><span className="lg:hidden">Hidden</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )

  const renderTestimonialsSection = () => (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#1e293b] mb-6">Student Success Stories</h2>
        <p className="text-lg text-[#1e293b] max-w-3xl mx-auto">Mathematics learning testimonials from IBDP, CBSE, and ICSE students</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Basic Testimonial */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Basic Testimonial</CardTitle>
            <CardDescription className="text-base">Simple testimonial with rating and content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Rating */}
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 w-4 text-yellow-400">★</div>
                ))}
                <span className="text-sm text-[#1e293b] ml-2">5.0/5.0</span>
              </div>
              
              {/* Content */}
              <blockquote className="text-[#1e293b] italic">
                &ldquo;ShriArya LMS made calculus so much easier to understand. The step-by-step explanations are perfect!&rdquo;
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#d6ebf4] rounded-sm flex items-center justify-center mr-4 text-xl">
                  🧮
                </div>
                <div>
                  <div className="font-semibold text-[#1e293b]">Priya Sharma</div>
                  <div className="text-sm text-[#1e293b]">Grade 12 IBDP Student</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Badge Testimonial */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">With Service Badge</CardTitle>
            <CardDescription className="text-base">Testimonial showing service category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Rating */}
              <div className="flex items-center space-x-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 w-4 text-yellow-400">★</div>
                ))}
                <div className="h-4 w-4 text-[#feefea]">★</div>
                <span className="text-sm text-[#1e293b] ml-2">4.0/5.0</span>
              </div>
              
              {/* Service Badge */}
              <Badge variant="outline" className="text-xs">
                Mathematics Tutoring
              </Badge>
              
              {/* Content */}
              <blockquote className="text-[#1e293b] italic">
                &ldquo;Excellent mathematics tutoring service. The team is highly professional and responsive.&rdquo;
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#d6ebf4] rounded-sm flex items-center justify-center mr-4 text-xl">
                  👨‍💼
                </div>
                <div>
                  <div className="font-semibold text-[#1e293b]">Michael Rodriguez</div>
                  <div className="text-sm text-[#1e293b]">Grade 11 IBDP Student</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Testimonial Grid */}
      <div className="mt-20">
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Testimonial Grid</CardTitle>
            <CardDescription className="text-base">Multiple testimonials in a responsive grid layout</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Dr. Sarah Chen",
                  role: "Grade 12 IBDP Student",
                  rating: 5,
                  content: "Outstanding mathematics tutoring services. Highly recommend!",
                  service: "IBDP Math AA HL"
                },
                {
                  name: "Michael Rodriguez",
                  role: "Grade 11 IBDP Student",
                  rating: 4,
                  content: "Professional team with deep mathematics expertise.",
                  service: "IBDP Math AI SL"
                },
                {
                  name: "Lisa Thompson",
                  role: "Grade 10 ICSE Student",
                  rating: 5,
                  content: "Excellent support for board exam preparation.",
                  service: "ICSE Grade 10"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400" : "text-[#feefea]"}`}>
                            ★
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-[#1e293b] ml-2">
                        {testimonial.rating}.0/5.0
                      </span>
                    </div>

                    {/* Content */}
                    <blockquote className="text-[#1e293b] mb-4 italic text-sm">
                      &ldquo;{testimonial.content}&rdquo;
                    </blockquote>

                    {/* Service Badge */}
                    <div className="mb-4">
                      <Badge variant="outline" className="text-xs">
                        {testimonial.service}
                      </Badge>
                    </div>

                    {/* Author */}
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#d6ebf4] rounded-sm flex items-center justify-center mr-3 text-sm">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-[#1e293b]">{testimonial.name}</div>
                        <div className="text-xs text-[#1e293b]">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )

  const renderNavigationSection = () => (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#1e293b] mb-6">Mathematics Learning Navigation</h2>
        <p className="text-lg text-[#1e293b] max-w-3xl mx-auto">Navigation for math courses, chapters, and learning paths</p>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex justify-center">
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 max-w-2xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Tab Navigation</CardTitle>
            <CardDescription className="text-base">Tab-based navigation for content organization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex space-x-1 bg-[#feefea] p-1 rounded-sm">
              {["Overview", "Lessons", "Practice", "Assessments"].map((tab, index) => (
                <button
                  key={tab}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-sm transition-colors ${
                    index === 0 
                      ? "bg-white text-[#1e293b] shadow-sm" 
                      : "text-[#1e293b] hover:text-[#e27447]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <p className="text-sm text-[#1e293b]">
              Tab navigation provides clear content organization and improves user experience.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )

  const renderUtilitiesSection = () => (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#1b4a56] mb-6">Mathematics Learning Utilities</h2>
        <p className="text-lg text-[#4a6f73] max-w-3xl mx-auto">Helper components for math education and learning tools using our design system</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Separator */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-[#1b4a56]">Separator</CardTitle>
            <CardDescription className="text-base text-[#4a6f73]">Visual dividers for content organization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm text-[#4a6f73]">Content above separator</p>
              <div className="h-px bg-[#e2e8f0]"></div>
              <p className="text-sm text-[#4a6f73]">Content below separator</p>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-[#4a6f73]">Another section</p>
              <div className="h-px bg-gradient-to-r from-transparent via-[#e27447] to-transparent"></div>
              <p className="text-sm text-[#4a6f73]">Next section</p>
            </div>
          </CardContent>
        </Card>

        {/* Scroll Area */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-[#1b4a56]">Scroll Area</CardTitle>
            <CardDescription className="text-base text-[#4a6f73]">Custom scrollable content areas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="h-32 border border-[#e2e8f0] rounded-sm p-4 overflow-y-auto bg-[#f8fafc]">
              <div className="space-y-2">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="text-sm text-[#4a6f73]">
                    Scrollable content item {i + 1}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-[#4a6f73]">
              Scroll areas provide custom scrolling behavior for content that exceeds container height.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* WhatsApp Float */}
      <div className="mt-20">
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-[#1b4a56]">Math Help Float Button</CardTitle>
            <CardDescription className="text-base text-[#4a6f73]">Floating action button for quick math tutor access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="fixed bottom-6 right-6 z-50">
                <button className="w-16 h-16 bg-[#e27447] hover:bg-[#d1653a] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </button>
              </div>
              <div className="h-32 bg-[#f1f5f9] rounded-sm border border-[#e2e8f0] flex items-center justify-center">
                <p className="text-sm text-[#4a6f73]">
                  Math help button for quick access to tutors and support
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )

  const renderPaginationSection = () => (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#1b4a56] mb-6">Pagination Component</h2>
        <p className="text-lg text-[#4a6f73] max-w-3xl mx-auto">Navigation component for paginated content, inspired by pagination.png</p>
      </div>
      
      <div className="space-y-20">
        {/* Basic Pagination */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Basic Pagination</CardTitle>
            <CardDescription className="text-base">Standard pagination with page numbers and navigation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-[#4a6f73] mb-3">Page 1 of 10:</p>
                <Pagination 
                  currentPage={1} 
                  totalPages={10} 
                  onPageChange={(page) => console.log('Page changed to:', page)} 
                />
              </div>
              <div>
                <p className="text-sm text-[#4a6f73] mb-3">Page 5 of 10:</p>
                <Pagination 
                  currentPage={5} 
                  totalPages={10} 
                  onPageChange={(page) => console.log('Page changed to:', page)} 
                />
              </div>
              <div>
                <p className="text-sm text-[#4a6f73] mb-3">Page 10 of 10:</p>
                <Pagination 
                  currentPage={10} 
                  totalPages={10} 
                  onPageChange={(page) => console.log('Page changed to:', page)} 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pagination Variants */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Pagination Variants</CardTitle>
            <CardDescription className="text-base">Different pagination configurations for various use cases</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-[#4a6f73] mb-3">Navigation Only (No Page Numbers):</p>
                <Pagination 
                  currentPage={3} 
                  totalPages={8} 
                  onPageChange={(page) => console.log('Page changed to:', page)}
                  showPageNumbers={false}
                />
              </div>
              <div>
                <p className="text-sm text-[#4a6f73] mb-3">Page Numbers Only (No Navigation):</p>
                <Pagination 
                  currentPage={4} 
                  totalPages={6} 
                  onPageChange={(page) => console.log('Page changed to:', page)}
                  showNavigation={false}
                />
              </div>
              <div>
                <p className="text-sm text-[#4a6f73] mb-3">Large Page Count (20 pages):</p>
                <Pagination 
                  currentPage={7} 
                  totalPages={20} 
                  onPageChange={(page) => console.log('Page changed to:', page)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )

  const renderColorsSection = () => (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#1e293b] mb-6">ShriArya LMS Color System</h2>
        <p className="text-lg text-[#1e293b] max-w-3xl mx-auto">Streamlined 5-color palette for mathematics learning platform design</p>
      </div>
      
      <div className="space-y-20">
        {/* Primary Color Palette */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Primary Color Palette</CardTitle>
            <CardDescription className="text-base">Core colors for main UI elements and branding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Primary Dark Blue */}
              <div className="text-center">
                <div className="w-24 h-24 bg-[#1e293b] rounded-sm mx-auto mb-4 shadow-lg"></div>
                <h4 className="font-semibold text-[#1e293b] mb-2">Primary Dark Blue</h4>
                <p className="text-sm text-[#1e293b] mb-2">#1e293b</p>
                <p className="text-xs text-[#1e293b]">Main buttons, headings, important text</p>
              </div>
              
              {/* Orange Accent */}
              <div className="text-center">
                <div className="w-24 h-24 bg-[#e27447] rounded-sm mx-auto mb-4 shadow-lg"></div>
                <h4 className="font-semibold text-[#1e293b] mb-2">Orange Accent</h4>
                <p className="text-sm text-[#1e293b] mb-2">#e27447</p>
                <p className="text-xs text-[#1e293b]">Call-to-action, highlights, buttons</p>
              </div>
              
              {/* Pure White */}
              <div className="text-center">
                <div className="w-24 h-24 bg-[#ffffff] border border-[#feefea] rounded-sm mx-auto mb-4 shadow-lg"></div>
                <h4 className="font-semibold text-[#1e293b] mb-2">Pure White</h4>
                <p className="text-sm text-[#1e293b] mb-2">#ffffff</p>
                <p className="text-xs text-[#1e293b]">Main backgrounds, cards, content areas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Background Color Palette */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Background Color Palette</CardTitle>
            <CardDescription className="text-base">Subtle background variations and accent colors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Light Cream */}
              <div className="text-center">
                <div className="w-24 h-24 bg-[#feefea] border border-[#1e293b] rounded-sm mx-auto mb-4 shadow-lg"></div>
                <h4 className="font-semibold text-[#1e293b] mb-2">Light Cream</h4>
                <p className="text-sm text-[#1e293b] mb-2">#feefea</p>
                <p className="text-xs text-[#1e293b]">Background accent, borders, subtle highlights</p>
              </div>
              
              {/* Very Light Cream */}
              <div className="text-center">
                <div className="w-24 h-24 bg-[#fffefd] border border-[#feefea] rounded-sm mx-auto mb-4 shadow-lg"></div>
                <h4 className="font-semibold text-[#1e293b] mb-2">Very Light Cream</h4>
                <p className="text-sm text-[#1e293b] mb-2">#fffefd</p>
                <p className="text-xs text-[#1e293b]">Subtle backgrounds, hover states</p>
              </div>

              {/* Light Blue */}
              <div className="text-center">
                <div className="w-24 h-24 bg-[#d6ebf4] border border-[#1e293b] rounded-sm mx-auto mb-4 shadow-lg"></div>
                <h4 className="font-semibold text-[#1e293b] mb-2">Light Blue</h4>
                <p className="text-sm text-[#1e293b] mb-2">#d6ebf4</p>
                <p className="text-xs text-[#1e293b]">Cool backgrounds, section highlights</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Usage Guidelines */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Color Usage Guidelines</CardTitle>
            <CardDescription className="text-base">Best practices for using the streamlined color system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-[#1e293b] mb-4">Primary Usage</h4>
                <ul className="text-sm text-[#1e293b] space-y-2">
                  <li>• <strong>#1e293b:</strong> Main buttons, headings, important text, borders</li>
                  <li>• <strong>#e27447:</strong> Call-to-action buttons, highlights, accents</li>
                  <li>• <strong>#ffffff:</strong> Main content backgrounds, cards, forms</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#1e293b] mb-4">Background Usage</h4>
                <ul className="text-sm text-[#1e293b] space-y-2">
                  <li>• <strong>#feefea:</strong> Background accents, borders, subtle highlights</li>
                  <li>• <strong>#fffefd:</strong> Hover states, very subtle backgrounds</li>
                  <li>• <strong>#d6ebf4:</strong> Cool backgrounds, section highlights</li>
                  <li>• <strong>#ffffff:</strong> Primary content areas, cards, sections</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Accessibility */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Color Accessibility</CardTitle>
            <CardDescription className="text-base">Ensuring colors meet accessibility standards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-[#1e293b] mb-4">Contrast Ratios</h4>
                <ul className="text-sm text-[#1e293b] space-y-2">
                  <li>• <strong>Dark Blue on White:</strong> Excellent contrast (15.6:1)</li>
                  <li>• <strong>Orange on White:</strong> Good contrast (3.4:1)</li>
                  <li>• <strong>Dark Blue on Cream:</strong> Good contrast (8.2:1)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#1e293b] mb-4">Best Practices</h4>
                <ul className="text-sm text-[#1e293b] space-y-2">
                  <li>• Use orange (#e27447) sparingly for emphasis</li>
                  <li>• Ensure sufficient contrast for text readability</li>
                  <li>• Use cream backgrounds for subtle section separation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )

  const renderCoursesSection = () => (
    <section className="mb-20">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-[#1b4a56] mb-4 font-cardo">Top Courses Section</h2>
        <p className="text-lg text-[#4a6f73] max-w-3xl">Horizontal carousel layout showcasing course cards with thumbnails, ratings, and enrollment options</p>
      </div>

      {/* Top Courses Section */}
      <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h3 className="text-3xl font-bold text-[#1b4a56] mb-2 font-cardo">Browse Our Top Courses</h3>
            <p className="text-base text-[#4a6f73] font-dm-sans">Lorem ipsum dolor sit amet elit</p>
          </div>
          <a 
            href="/courses" 
            className="text-[#E57342] hover:text-[#D56538] font-semibold flex items-center gap-2 mt-4 md:mt-0 font-dm-sans"
          >
            Show More Courses
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>
        </div>

        {/* Course Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-md">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-md">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Course Cards Horizontal Layout */}
          <div className="flex gap-6 overflow-x-auto pb-4 px-4">
            {[
              {
                id: 1,
                title: "Become a Certified Web Developer HTML, CSS and JavaScript Masterclass",
                badge: "Best Seller",
                badgeColor: "bg-[#10b981]",
                lessons: 11,
                duration: "16 hours",
                rating: 4.9,
                reviews: 230,
                instructor: "Carolyn Welborn",
                price: "$89.29"
              },
              {
                id: 2,
                title: "Figma Prototyping A deep dive for UX/UI Designer",
                badge: "",
                badgeColor: "",
                lessons: 11,
                duration: "16 hours",
                rating: 4.9,
                reviews: 230,
                instructor: "Carolyn Welborn",
                price: "$89.29"
              },
              {
                id: 3,
                title: "Figma Prototyping A deep dive for UX/UI Designer",
                badge: "",
                badgeColor: "",
                lessons: 11,
                duration: "16 hours",
                rating: 4.9,
                reviews: 230,
                instructor: "Carolyn Welborn",
                price: "$89.29"
              },
              {
                id: 4,
                title: "Java Swing (GUI) Programming From Beginner to Expert",
                badge: "",
                badgeColor: "",
                lessons: 11,
                duration: "16 hours",
                rating: 4.9,
                reviews: 230,
                instructor: "Carolyn Welborn",
                price: "$89.29"
              },
              {
                id: 5,
                title: "Java Swing (GUI) Programming From Beginner to Expert",
                badge: "",
                badgeColor: "",
                lessons: 11,
                duration: "16 hours",
                rating: 4.9,
                reviews: 230,
                instructor: "Carolyn Welborn",
                price: "$89.29"
              }
            ].map((course) => (
              <Card key={course.id} className="flex-shrink-0 w-80 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 rounded-sm">
                <CardContent className="p-0">
                  {/* Thumbnail Section */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-t-sm">
                    {/* Badge - Only show if exists */}
                    {course.badge && (
                      <Badge className={`absolute top-3 left-3 ${course.badgeColor} text-white border-0`}>
                        {course.badge}
                      </Badge>
                    )}
                    
                    {/* Wishlist Heart - Only show on last card */}
                    {course.id === 5 && (
                      <button className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors">
                        <svg className="w-4 h-4 text-gray-600 hover:text-[#E57342]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    )}
                    
                    {/* Course Metadata Row */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-gray-600 bg-white/90 backdrop-blur-sm rounded-sm px-2 py-1">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>{course.lessons} Lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-4">
                    {/* Course Title */}
                    <h4 className="font-bold text-[#1b4a56] mb-3 line-clamp-2 font-dm-sans text-sm leading-tight">
                      {course.title}
                    </h4>

                    {/* Rating Row */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-semibold text-sm">{course.rating}</span>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star} 
                            className={`w-4 h-4 ${star <= 4 ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({course.reviews})</span>
                    </div>

                    {/* Instructor Row */}
                    <div className="text-sm text-gray-600 mb-4 font-dm-sans">
                      By: {course.instructor}
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between">
                      <div className="text-[#E57342] font-bold font-dm-sans text-lg">
                        {course.price}
                      </div>
                      <button className="text-[#1b4a56] hover:text-[#E57342] font-semibold flex items-center gap-1 transition-colors font-dm-sans">
                        Enroll Course
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-2 h-2 rounded-full transition-colors ${
                page === 1 ? 'bg-[#1b4a56] w-3' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )

  const renderThemesSection = () => (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#1e293b] mb-6">Theme System</h2>
        <p className="text-lg text-[#1e293b] max-w-3xl mx-auto">Switch between light and dark modes with our streamlined color palette</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Theme Toggle Demo */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Theme Toggle</CardTitle>
            <CardDescription className="text-base">Interactive theme switcher with smooth transitions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center">
              <ThemeToggle />
            </div>
            <div className="text-center">
              <p className="text-sm text-[#1e293b] mb-2">Click the button above to switch themes</p>
              <p className="text-xs text-[#1e293b] opacity-75">The entire website will smoothly transition between light and dark modes</p>
            </div>
          </CardContent>
        </Card>

        {/* Theme Features */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Theme Features</CardTitle>
            <CardDescription className="text-base">What you get with our theme system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#e27447] rounded-full"></div>
                <span className="text-sm text-[#1e293b]">Automatic system preference detection</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#e27447] rounded-full"></div>
                <span className="text-sm text-[#1e293b]">Smooth transitions between themes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#e27447] rounded-full"></div>
                <span className="text-sm text-[#1e293b]">Persistent theme selection</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#e27447] rounded-full"></div>
                <span className="text-sm text-[#1e293b]">Optimized for your 6-color palette</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Theme Color Showcase */}
      <div className="mt-20">
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Theme Color Showcase</CardTitle>
            <CardDescription className="text-base">See how our colors adapt in both themes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Light Theme */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-[#1e293b] mb-4">Light Theme</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-white border border-[#feefea] rounded-sm">
                    <p className="text-[#1e293b] font-medium">White Background</p>
                    <p className="text-[#1e293b] text-sm opacity-75">Primary text on white</p>
                  </div>
                  <div className="p-4 bg-[#fffefd] border border-[#feefea] rounded-sm">
                    <p className="text-[#1e293b] font-medium">Light Cream Background</p>
                    <p className="text-[#1e293b] text-sm opacity-75">Subtle background variation</p>
                  </div>
                  <div className="p-4 bg-[#feefea] border border-[#1e293b] rounded-sm">
                    <p className="text-[#1e293b] font-medium">Cream Background</p>
                    <p className="text-[#1e293b] text-sm opacity-75">Accent background</p>
                  </div>
                </div>
              </div>

              {/* Dark Theme */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-[#1e293b] mb-4">Dark Theme</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-[#1e293b] border border-[#feefea] rounded-sm">
                    <p className="text-white font-medium">Dark Blue Background</p>
                    <p className="text-white text-sm opacity-75">White text on dark</p>
                  </div>
                  <div className="p-4 bg-[#fffefd] border border-[#feefea] rounded-sm">
                    <p className="text-[#1e293b] font-medium">Light Cream Background</p>
                    <p className="text-[#1e293b] text-sm opacity-75">Subtle background variation</p>
                  </div>
                  <div className="p-4 bg-[#feefea] border border-[#1e293b] rounded-sm">
                    <p className="text-[#1e293b] font-medium">Cream Background</p>
                    <p className="text-[#1e293b] text-sm opacity-75">Accent background</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "buttons":
        return renderButtonsSection()
      case "forms":
        return renderFormsSection()
      case "cards":
        return renderCardsSection()
      case "badges":
        return renderBadgesSection()
      case "breadcrumbs":
        return renderBreadcrumbsSection()
      case "layout":
        return renderLayoutSection()
      case "typography":
        return renderTypographySection()
      case "colors":
        return renderColorsSection()
      case "interactive":
        return renderInteractiveSection()
      case "responsive":
        return renderResponsiveSection()
      case "navigation":
        return renderNavigationSection()
      case "utilities":
        return renderUtilitiesSection()
      case "pagination":
        return renderPaginationSection()
      case "courses":
        return renderCoursesSection()
      case "contact":
        return renderContactSection()
      case "themes":
        return renderThemesSection()
      default:
        return renderButtonsSection()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#81c3c9]/10 to-[#4a6f73]/10">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-[#4a6f73] min-h-screen">
          <div className="p-6">
            <div className="mb-8">
              <Badge variant="secondary" className="mb-2">ShriArya LMS</Badge>
              <h1 className="text-xl font-bold text-[#1b4a56]">Mathematics Components</h1>
              <p className="text-sm text-[#4a6f73] mt-2">
                IBDP • CBSE • ICSE Math Learning
              </p>
            </div>
            
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-[#81c3c9]/20 text-[#1b4a56] border border-[#4a6f73]"
                      : "text-[#4a6f73] hover:bg-[#81c3c9]/10 hover:text-[#1b4a56]"
                  }`}
                >
                  <span className="flex-shrink-0">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto px-8 py-8">
            {isMounted ? renderContent() : <div className="animate-pulse">Loading...</div>}
          </div>
        </div>
      </div>
    </div>
  )
} 