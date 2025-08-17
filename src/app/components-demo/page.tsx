"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pagination } from "@/components/ui/pagination"

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
    { id: "testimonials", label: "Testimonials", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
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
    { id: "contact", label: "Contact", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ) }
  ]

  const renderButtonsSection = () => (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#1b4a56] mb-6">Mathematics Learning Buttons</h2>
        <p className="text-lg text-[#4a6f73] max-w-3xl mx-auto">Interactive buttons for math lessons, exercises, and assessments</p>
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

      {/* Complete Button Color Showcase */}
      <div className="mt-20">
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Complete Button Color Palette</CardTitle>
            <CardDescription className="text-base">All 4 button variants with their exact colors and specifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Primary Button */}
            <div>
              <h4 className="text-lg font-semibold text-[#1b4a56] mb-4">Primary Button</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Button variant="primary" showArrow className="w-full mb-4">
                    Get Started
                  </Button>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#1e293b] rounded-sm"></div>
                      <span className="text-sm text-[#4a6f73]">Background: #1e293b</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-white border border-[#e2e8f0] rounded-sm"></div>
                      <span className="text-sm text-[#4a6f73]">Text: White</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#0f172a] rounded-sm"></div>
                      <span className="text-sm text-[#4a6f73]">Hover: #0f172a</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-[#4a6f73] space-y-2">
                  <p><strong>Usage:</strong> Main call-to-action buttons</p>
                  <p><strong>Examples:</strong> Get Started, Start Learning, Submit</p>
                  <p><strong>Features:</strong> Arrow icon, shadow, focus ring</p>
                </div>
              </div>
            </div>

            {/* Secondary Button */}
            <div className="pt-6 border-t border-[#f3f3f3]">
              <h4 className="text-lg font-semibold text-[#1b4a56] mb-4">Secondary Button</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Button variant="secondary" showArrow className="w-full mb-4">
                    Explore courses
                  </Button>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-white border border-[#e2e8f0] rounded-sm"></div>
                      <span className="text-sm text-[#4a6f73]">Background: White</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#1e293b] rounded-sm"></div>
                      <span className="text-sm text-[#4a6f73]">Text: #1e293b</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#f8fafc] border border-[#cbd5e1] rounded-sm"></div>
                      <span className="text-sm text-[#4a6f73]">Hover: #f8fafc</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-[#4a6f73] space-y-2">
                  <p><strong>Usage:</strong> Secondary actions and alternatives</p>
                  <p><strong>Examples:</strong> Explore, View, Download</p>
                  <p><strong>Features:</strong> Border, arrow icon, subtle hover</p>
                </div>
              </div>
            </div>

            {/* Outline Button */}
            <div className="pt-6 border-t border-[#f3f3f3]">
              <h4 className="text-lg font-semibold text-[#1b4a56] mb-4">Outline Button</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Button variant="outline" showArrow className="w-full mb-4">
                    View Solution
                  </Button>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-white border border-[#e2e8f0] rounded-sm"></div>
                      <span className="text-sm text-[#4a6f73]">Background: White</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#1e293b] rounded-sm"></div>
                      <span className="text-sm text-[#4a6f73]">Text: #1e293b</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#f8fafc] border border-[#cbd5e1] rounded-sm"></div>
                      <span className="text-sm text-[#4a6f73]">Hover: #f8fafc</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-[#4a6f73] space-y-2">
                  <p><strong>Usage:</strong> Tertiary actions and information</p>
                  <p><strong>Examples:</strong> View, Learn More, Details</p>
                  <p><strong>Features:</strong> Clean outline, arrow icon</p>
                </div>
              </div>
            </div>

            {/* Coral Button */}
            <div className="pt-6 border-t border-[#f3f3f3]">
              <h4 className="text-lg font-semibold text-[#1b4a56] mb-4">Coral Button</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Button variant="coral" showArrow className="w-full mb-4">
                    Take Quiz
                  </Button>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#e27447] rounded-sm"></div>
                      <span className="text-sm text-[#4a6f73]">Background: #e27447</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-white rounded-sm"></div>
                      <span className="text-sm text-[#4a6f73]">Text: White</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#d1653a] rounded-sm"></div>
                      <span className="text-sm text-[#4a6f73]">Hover: #d1653a</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-[#4a6f73] space-y-2">
                  <p><strong>Usage:</strong> Important actions and highlights</p>
                  <p><strong>Examples:</strong> Take Quiz, Start Assessment</p>
                  <p><strong>Features:</strong> Warm accent color, arrow icon</p>
                </div>
              </div>
            </div>

            {/* Load More Button */}
            <div className="pt-6 border-t border-[#f3f3f3]">
              <h4 className="text-lg font-semibold text-[#1b4a56] mb-4">Load More Button</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Button variant="loadMore" className="w-full mb-4">
                    Load More
                  </Button>
                  <Button variant="loadMore" showChevron className="w-full mb-4">
                    Show More Options
                  </Button>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#f1f5f9] rounded-sm"></div>
                      <span className="text-sm text-[#4a6f73]">Background: #f1f5f9</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#475569] rounded-sm"></div>
                      <span className="text-sm text-[#4a6f73]">Text: #475569</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#e2e8f0] rounded-sm"></div>
                      <span className="text-sm text-[#4a6f73]">Hover: #e2e8f0</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-[#4a6f73] space-y-2">
                  <p><strong>Usage:</strong> Content loading and pagination</p>
                  <p><strong>Examples:</strong> Load More, Show More, Next Page</p>
                  <p><strong>Features:</strong> Optional chevron, subtle styling</p>
                </div>
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
              <h4 className="text-lg font-semibold text-[#1b4a56] mb-4">Exact Button 2.png Replica</h4>
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
            <div className="pt-4 border-t border-[#f3f3f3]">
              <h4 className="text-sm font-medium text-[#1b4a56] mb-3">Button 2.png Color Specifications:</h4>
              <ul className="text-xs text-[#4a6f73] space-y-2">
                <li>• <strong>Background:</strong> Pure white (#ffffff)</li>
                <li>• <strong>Text:</strong> Dark text (#1e293b)</li>
                <li>• <strong>Border:</strong> Light gray border (#e2e8f0)</li>
                <li>• <strong>Hover Background:</strong> Light gray (#f8fafc)</li>
                <li>• <strong>Hover Border:</strong> Darker gray (#cbd5e1)</li>
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
              <h4 className="text-lg font-semibold text-[#1b4a56] mb-4">Coral Button Examples</h4>
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
            <div className="pt-4 border-t border-[#f3f3f3]">
              <h4 className="text-sm font-medium text-[#1b4a56] mb-3">Coral Button Specifications:</h4>
              <ul className="text-xs text-[#4a6f73] space-y-2">
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
              <h4 className="text-lg font-semibold text-[#1b4a56] mb-4">Primary Learning Actions</h4>
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
              <h4 className="text-lg font-semibold text-[#1b4a56] mb-4">Secondary Actions</h4>
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
              <h4 className="text-lg font-semibold text-[#1b4a56] mb-4">Content Loading</h4>
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
            <div className="pt-4 border-t border-[#f3f3f3]">
              <h4 className="text-sm font-medium text-[#1b4a56] mb-3">State Features:</h4>
              <ul className="text-xs text-[#4a6f73] space-y-2">
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
            <div className="pt-4 border-t border-[#f3f3f3]">
              <h4 className="text-sm font-medium text-[#1b4a56] mb-3">Animation Features:</h4>
              <ul className="text-xs text-[#4a6f73] space-y-2">
                <li>• <strong>Arrow:</strong> Moves up-right on hover</li>
                <li>• <strong>Chevron:</strong> Rotates 180° on hover</li>
                <li>• <strong>Transitions:</strong> Smooth 200ms animations</li>
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
        <h2 className="text-4xl font-bold text-[#1b4a56] mb-6">Mathematics Assessment Forms</h2>
        <p className="text-lg text-[#4a6f73] max-w-3xl mx-auto">Forms for quizzes, homework submission, and student progress tracking using our design system</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Basic Input Fields */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-[#1b4a56]">Input Fields</CardTitle>
            <CardDescription className="text-base text-[#4a6f73]">Different input types and states with our color scheme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1b4a56]">Student Name</label>
              <input 
                type="text" 
                placeholder="Enter student's full name"
                className="w-full px-4 py-3 border border-[#e2e8f0] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] placeholder-[#475569]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1b4a56]">Student Email</label>
              <input 
                type="email" 
                placeholder="student@school.edu"
                className="w-full px-4 py-3 border border-[#e2e8f0] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] placeholder-[#475569]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1b4a56]">Math Grade Level</label>
              <select className="w-full px-4 py-3 border border-[#e2e8f0] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] cursor-pointer">
                <option>Select Grade</option>
                <option>Grade 9 (CBSE/ICSE)</option>
                <option>Grade 10 (CBSE/ICSE)</option>
                <option>Grade 11 (IBDP)</option>
                <option>Grade 12 (IBDP)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1b4a56]">Math Topic</label>
              <textarea 
                placeholder="Describe the math concept you're learning..."
                rows={3}
                className="w-full px-4 py-3 border border-[#e2e8f0] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] placeholder-[#475569] resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Validation States */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-[#1b4a56]">Validation States</CardTitle>
            <CardDescription className="text-base text-[#4a6f73]">Input fields with different validation states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1b4a56]">Valid Input</label>
              <input 
                type="text" 
                defaultValue="Valid input"
                className="w-full px-4 py-3 border border-[#10b981] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-200 bg-[#f0fdf4] text-[#065f46]"
              />
              <p className="text-xs text-[#10b981] font-medium">✓ Input is valid</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1b4a56]">Error Input</label>
              <input 
                type="email" 
                defaultValue="invalid-email"
                className="w-full px-4 py-3 border border-[#ef4444] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#ef4444] focus:border-[#ef4444] transition-all duration-200 bg-[#fef2f2] text-[#991b1b]"
              />
              <p className="text-xs text-[#ef4444] font-medium">✗ Please enter a valid email address</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1b4a56]">Disabled Input</label>
              <input 
                type="text" 
                defaultValue="Disabled field"
                disabled
                className="w-full px-4 py-3 border border-[#e2e8f0] rounded-sm bg-[#f8fafc] text-[#94a3b8] cursor-not-allowed"
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
            <CardTitle className="text-2xl text-[#1b4a56]">Mathematics Assessment Form</CardTitle>
            <CardDescription className="text-base text-[#4a6f73]">Form for submitting math homework and assessments</CardDescription>
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
                <label className="text-sm font-medium text-[#1b4a56]">Class/Grade</label>
                <select className="w-full px-4 py-3 border border-[#e2e8f0] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] cursor-pointer">
                  <option>Select Class</option>
                  <option>Grade 9 CBSE</option>
                  <option>Grade 10 CBSE</option>
                  <option>Grade 11 IBDP</option>
                  <option>Grade 12 IBDP</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1b4a56]">Mathematics Topic</label>
              <select className="w-full px-4 py-3 border border-[#e2e8f0] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] transition-all duration-200 bg-white text-[#1e293b] cursor-pointer">
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
            <div className="w-14 h-14 bg-[#f1f5f9] rounded-lg flex items-center justify-center mb-4 border border-[#e2e8f0]">
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
              <div className="w-16 h-16 bg-[#f1f5f9] rounded-lg flex items-center justify-center mr-4 border border-[#e2e8f0]">
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
        
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-[#1b4a56]">Mathematics Topics</CardTitle>
            <CardDescription className="text-base text-[#4a6f73]">Badges for different math subjects and concepts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary" className="px-4 py-2 text-sm">Algebra</Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm">Geometry</Badge>
                <Badge variant="destructive" className="px-4 py-2 text-sm">Calculus</Badge>
                <Badge className="px-4 py-2 text-sm">Statistics</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Extended Badge Variants */}
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Color Variants */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-[#1b4a56]">Design System Colors</CardTitle>
            <CardDescription className="text-base text-[#4a6f73]">Badges using our color palette</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center px-4 py-2 rounded-sm text-sm font-medium bg-[#1e293b] text-white border border-[#1e293b]">
                  Primary Dark
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-sm text-sm font-medium bg-[#e27447] text-white border border-[#e27447]">
                  Coral Accent
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-sm text-sm font-medium bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
                  Load More
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center px-4 py-2 rounded-sm text-sm font-medium bg-white text-[#1e293b] border border-[#e2e8f0]">
                  Secondary
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-sm text-sm font-medium bg-[#10b981] text-white border border-[#10b981]">
                  Success
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-sm text-sm font-medium bg-[#ef4444] text-white border border-[#ef4444]">
                  Error
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Badges */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-[#1b4a56]">Learning Status</CardTitle>
            <CardDescription className="text-base text-[#4a6f73]">Badges for different learning progress states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center px-4 py-2 rounded-sm text-sm font-medium bg-[#f0fdf4] text-[#065f46] border border-[#10b981]">
                  <div className="w-2 h-2 bg-[#10b981] rounded-full mr-3"></div>
                  Completed
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-sm text-sm font-medium bg-[#fefce8] text-[#92400e] border border-[#f59e0b]">
                  <div className="w-2 h-2 bg-[#f59e0b] rounded-full mr-3"></div>
                  In Progress
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-sm text-sm font-medium bg-[#fef2f2] text-[#991b1b] border border-[#ef4444]">
                  <div className="w-2 h-2 bg-[#ef4444] rounded-full mr-3"></div>
                  Needs Review
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center px-4 py-2 rounded-sm text-sm font-medium bg-[#eff6ff] text-[#1e40af] border border-[#3b82f6]">
                  <div className="w-2 h-2 bg-[#3b82f6] rounded-full mr-3"></div>
                  Under Review
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-sm text-sm font-medium bg-[#f3f4f6] text-[#374151] border border-[#9ca3af]">
                  <div className="w-2 h-2 bg-[#9ca3af] rounded-full mr-3"></div>
                  Draft
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-sm text-sm font-medium bg-[#f8fafc] text-[#475569] border border-[#e2e8f0]">
                  <div className="w-2 h-2 bg-[#94a3b8] rounded-full mr-3"></div>
                  Archived
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Special Badge Types */}
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Icon Badges */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Icon Badges</CardTitle>
            <CardDescription className="text-base">Badges with icons and enhanced styling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#ff2768] text-white">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Premium
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#81c3c9] text-[#1b4a56]">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Verified
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#1b4a56] text-white">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Featured
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#ff2768] to-[#81c3c9] text-white">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                  </svg>
                  Hot
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#1b4a56] to-[#4a6f73] text-white">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                  New
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Size Variants */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Size Variants</CardTitle>
            <CardDescription className="text-base">Badges in different sizes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center px-3 py-1 rounded text-xs font-medium bg-[#ff2768] text-white">
                  Small
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#81c3c9] text-[#1b4a56]">
                  Medium
                </span>
                <span className="inline-flex items-center px-5 py-2.5 rounded-lg text-base font-medium bg-[#1b4a56] text-white">
                  Large
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center px-3 py-1 rounded text-xs font-medium bg-[#4a6f73] text-white">
                  Compact
                </span>
                <span className="inline-flex items-center px-6 py-3 rounded-xl text-lg font-bold bg-gradient-to-r from-[#ff2768] to-[#81c3c9] text-white">
                  Hero
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badge Showcase */}
      <div className="mt-20">
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Badge Showcase</CardTitle>
            <CardDescription className="text-base">Real-world application examples</CardDescription>
          </CardHeader>
          <CardContent className="space-y-12">
            <div className="space-y-8">
              {/* Service Categories */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-[#1b4a56]">Service Categories</h4>
                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#ff2768] text-white">
                    Patent Drafting
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#81c3c9] text-[#1b4a56]">
                    IP Strategy
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#4a6f73] text-white">
                    Global Filing
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#1b4a56] text-white">
                    Risk Assessment
                  </span>
                </div>
              </div>

              {/* Priority Levels */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-[#1b4a56]">Priority Levels</h4>
                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    High Priority
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    Medium Priority
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Low Priority
                  </span>
                </div>
              </div>

              {/* Special Tags */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-[#1b4a56]">Special Tags</h4>
                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#ff2768] to-[#81c3c9] text-white">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                    </svg>
                    Limited Time
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#1b4a56] to-[#4a6f73] text-white">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                    New Service
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                    Urgent
                  </span>
                </div>
              </div>
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
                <div key={i} className="bg-[#81c3c9]/20 p-6 rounded-lg text-center border border-[#4a6f73]">
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
              <div className="flex-1 bg-[#81c3c9]/20 p-6 rounded-lg border border-[#4a6f73]">
                <p className="text-sm font-medium text-[#1b4a56]">Flex Item 1</p>
              </div>
              <div className="flex-1 bg-[#81c3c9]/20 p-6 rounded-lg border border-[#4a6f73]">
                <p className="text-sm font-medium text-[#1b4a56]">Flex Item 2</p>
              </div>
              <div className="flex-1 bg-[#81c3c9]/20 p-6 rounded-lg border border-[#4a6f73]">
                <p className="text-sm font-medium text-[#1b4a56]">Flex Item 3</p>
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
              <h1 className="text-4xl font-bold text-[#1b4a56] mb-2">Heading 1 - Main Title</h1>
              <p className="text-sm text-[#8A8A8A]">Used for page titles and hero sections</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#1b4a56] mb-2">Heading 2 - Section Title</h2>
              <p className="text-sm text-[#8A8A8A]">Used for major section headings</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#1b4a56] mb-2">Heading 3 - Subsection</h3>
              <p className="text-sm text-[#8A8A8A]">Used for subsections and card titles</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-[#1b4a56] mb-2">Heading 4 - Card Title</h4>
              <p className="text-sm text-[#8A8A8A]">Used for card titles and smaller headings</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-lg text-[#1b4a56] mb-1">Body Large</p>
                <p className="text-sm text-[#8A8A8A]">Used for highlighted content</p>
              </div>
              <div>
                <p className="text-base text-[#1b4a56] mb-1">Body Default</p>
                <p className="text-sm text-[#8A8A8A]">Used for regular content</p>
              </div>
              <div>
                <p className="text-sm text-[#4a6f73] mb-1">Body Small</p>
                <p className="text-sm text-[#8A8A8A]">Used for captions and secondary text</p>
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
            <div className="p-4 border border-[#4a6f73] rounded-lg focus-within:ring-2 focus-within:ring-[#ff2768]">
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
              <div className="w-20 h-20 bg-[#81c3c9]/20 rounded-lg flex items-center justify-center border border-[#4a6f73]/20 hover:border-[#ff2768] transition-colors group">
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
                    className="w-full px-4 py-2 border border-[#4a6f73] rounded-lg focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1b4a56] mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-[#4a6f73] rounded-lg focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b4a56] mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-[#4a6f73] rounded-lg focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b4a56] mb-2">Project Type</label>
                <select className="w-full px-4 py-2 border border-[#4a6f73] rounded-lg focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all">
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
                  className="w-full px-4 py-2 border border-[#4a6f73] rounded-lg focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all"
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
                    className="w-full px-4 py-2 border border-[#4a6f73] rounded-lg focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1b4a56] mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-[#4a6f73] rounded-lg focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b4a56] mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-[#4a6f73] rounded-lg focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b4a56] mb-2">Project Type</label>
                <select className="w-full px-4 py-2 border border-[#4a6f73] rounded-lg focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all">
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
                  className="w-full px-4 py-2 border border-[#4a6f73] rounded-lg focus:ring-2 focus:ring-[#ff2768] focus:border-transparent transition-all"
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
          <div className="bg-[#81c3c9]/20 p-6 rounded-lg border border-[#4a6f73]">
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
        <h2 className="text-4xl font-bold text-[#1b4a56] mb-6">Student Success Stories</h2>
        <p className="text-lg text-[#4a6f73] max-w-3xl mx-auto">Mathematics learning testimonials from IBDP, CBSE, and ICSE students</p>
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
                <span className="text-sm text-[#8A8A8A] ml-2">5.0/5.0</span>
              </div>
              
              {/* Content */}
              <blockquote className="text-[#4a6f73] italic">
                &ldquo;ShriArya LMS made calculus so much easier to understand. The step-by-step explanations are perfect!&rdquo;
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#81c3c9]/20 rounded-full flex items-center justify-center mr-4 text-xl">
                  🧮
                </div>
                <div>
                  <div className="font-semibold text-[#1b4a56]">Priya Sharma</div>
                  <div className="text-sm text-[#4a6f73]">Grade 12 IBDP Student</div>
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
                <div className="h-4 w-4 text-gray-300">★</div>
                <span className="text-sm text-[#8A8A8A] ml-2">4.0/5.0</span>
              </div>
              
              {/* Service Badge */}
              <Badge variant="outline" className="text-xs">
                Patent Portfolio Development
              </Badge>
              
              {/* Content */}
              <blockquote className="text-[#4a6f73] italic">
                &ldquo;Excellent service in developing our IP strategy. The team is highly professional and responsive.&rdquo;
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#ff2768]/20 rounded-full flex items-center justify-center mr-4 text-xl">
                  👨‍💼
                </div>
                <div>
                  <div className="font-semibold text-[#1b4a56]">Michael Rodriguez</div>
                  <div className="text-sm text-[#4a6f73]">CEO, Innovation Labs</div>
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
                  role: "CTO, TechStart Inc.",
                  rating: 5,
                  content: "Outstanding patent drafting services. Highly recommend!",
                  service: "Patent Drafting"
                },
                {
                  name: "Michael Rodriguez",
                  role: "CEO, Innovation Labs",
                  rating: 4,
                  content: "Professional team with deep IP expertise.",
                  service: "IP Strategy"
                },
                {
                  name: "Lisa Thompson",
                  role: "Founder, BioTech Solutions",
                  rating: 5,
                  content: "Excellent global filing support for our patents.",
                  service: "Global Filing"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}>
                            ★
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-[#8A8A8A] ml-2">
                        {testimonial.rating}.0/5.0
                      </span>
                    </div>

                    {/* Content */}
                    <blockquote className="text-[#4a6f73] mb-4 italic text-sm">
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
                      <div className="w-10 h-10 bg-[#81c3c9]/20 rounded-full flex items-center justify-center mr-3 text-sm">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-[#1b4a56]">{testimonial.name}</div>
                        <div className="text-xs text-[#4a6f73]">{testimonial.role}</div>
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
        <h2 className="text-4xl font-bold text-[#1b4a56] mb-6">Mathematics Learning Navigation</h2>
        <p className="text-lg text-[#4a6f73] max-w-3xl mx-auto">Navigation for math courses, chapters, and learning paths</p>
      </div>
      
      {/* Header Component */}
      <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 mb-8">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl">Header Component</CardTitle>
          <CardDescription className="text-base">Professional header with navigation and branding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white border border-[#4a6f73] rounded-lg overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#1b4a56] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">SA</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-[#1b4a56]">ShriArya LMS</h1>
                    <p className="text-xs text-[#8A8A8A]">Mathematics Learning Platform</p>
                  </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                  {["Home", "Courses", "Practice", "Assessments", "Progress", "Help"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-[#1b4a56] hover:text-[#ff2768] px-3 py-2 text-sm font-medium transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center space-x-4">
                  <Badge variant="secondary" className="text-xs">
                    IBDP • CBSE • ICSE
                  </Badge>
                  <Button size="sm">Start Learning</Button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button className="text-[#1b4a56] hover:text-[#ff2768] p-2">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Tab Navigation */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Tab Navigation</CardTitle>
            <CardDescription className="text-base">Tab-based navigation for content organization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex space-x-1 bg-[#81c3c9]/20 p-1 rounded-lg">
              {["Overview", "Lessons", "Practice", "Assessments"].map((tab, index) => (
                <button
                  key={tab}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    index === 0 
                      ? "bg-white text-[#1b4a56] shadow-sm" 
                      : "text-[#4a6f73] hover:text-[#1b4a56]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <p className="text-sm text-[#4a6f73]">
              Tab navigation provides clear content organization and improves user experience.
            </p>
          </CardContent>
        </Card>

        {/* Breadcrumb Navigation */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Breadcrumb Navigation</CardTitle>
            <CardDescription className="text-base">Hierarchical navigation showing current location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <nav className="flex items-center space-x-2 text-sm">
              <a href="#" className="text-[#4a6f73] hover:text-[#1b4a56] transition-colors">
                Home
              </a>
              <span className="text-[#8A8A8A]">/</span>
              <a href="#" className="text-[#4a6f73] hover:text-[#1b4a56] transition-colors">
                Courses
              </a>
              <span className="text-[#8A8A8A]">/</span>
              <span className="text-[#1b4a56] font-medium">Calculus Fundamentals</span>
            </nav>
            <p className="text-sm text-[#4a6f73]">
              Breadcrumbs help users understand their current location and navigate back easily.
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

        {/* Pagination Specifications */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Pagination Specifications</CardTitle>
            <CardDescription className="text-base">Technical details and usage guidelines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-[#1b4a56] mb-4">Design Features</h4>
                <ul className="text-sm text-[#4a6f73] space-y-2">
                  <li>• <strong>Design:</strong> Inspired by pagination.png with modern styling</li>
                  <li>• <strong>Colors:</strong> Uses your button color palette (#1e293b, #e2e8f0, #f8fafc)</li>
                  <li>• <strong>Corners:</strong> Consistent rounded-sm (2px) border radius</li>
                  <li>• <strong>Navigation:</strong> Previous/Next buttons with chevron icons</li>
                  <li>• <strong>Page Numbers:</strong> Smart ellipsis for large page counts</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#1b4a56] mb-4">Technical Features</h4>
                <ul className="text-sm text-[#4a6f73] space-y-2">
                  <li>• <strong>Accessibility:</strong> ARIA labels, focus states, and screen reader support</li>
                  <li>• <strong>Responsive:</strong> Adapts to different screen sizes</li>
                  <li>• <strong>Customizable:</strong> Show/hide page numbers and navigation</li>
                  <li>• <strong>Smart Logic:</strong> Intelligent page number display with ellipsis</li>
                  <li>• <strong>TypeScript:</strong> Fully typed with proper interfaces</li>
                </ul>
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
        <h2 className="text-4xl font-bold text-[#1b4a56] mb-6">ShriArya LMS Color System</h2>
        <p className="text-lg text-[#4a6f73] max-w-3xl mx-auto">Complete color palette for mathematics learning platform design</p>
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
              {/* Primary Dark */}
              <div className="text-center">
                <div className="w-24 h-24 bg-[#1e293b] rounded-lg mx-auto mb-4 shadow-lg"></div>
                <h4 className="font-semibold text-[#1b4a56] mb-2">Primary Dark</h4>
                <p className="text-sm text-[#4a6f73] mb-2">#1e293b</p>
                <p className="text-xs text-[#4a6f73]">Main buttons, text, icons</p>
              </div>
              
              {/* Primary Hover */}
              <div className="text-center">
                <div className="w-24 h-24 bg-[#0f172a] rounded-lg mx-auto mb-4 shadow-lg"></div>
                <h4 className="font-semibold text-[#1b4a56] mb-2">Primary Hover</h4>
                <p className="text-sm text-[#4a6f73] mb-2">#0f172a</p>
                <p className="text-xs text-[#4a6f73]">Button hover states</p>
              </div>
              
              {/* Coral Accent */}
              <div className="text-center">
                <div className="w-24 h-24 bg-[#e27447] rounded-lg mx-auto mb-4 shadow-lg"></div>
                <h4 className="font-semibold text-[#1b4a56] mb-2">Coral Accent</h4>
                <p className="text-sm text-[#4a6f73] mb-2">#e27447</p>
                <p className="text-xs text-[#4a6f73]">Call-to-action, highlights</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Neutral Color Palette */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Neutral Color Palette</CardTitle>
            <CardDescription className="text-base">Backgrounds, borders, and subtle elements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pure White */}
              <div className="text-center">
                <div className="w-20 h-20 bg-white border border-[#e2e8f0] rounded-lg mx-auto mb-3 shadow-sm"></div>
                <h4 className="font-semibold text-[#1b4a56] mb-1 text-sm">Pure White</h4>
                <p className="text-xs text-[#4a6f73]">#ffffff</p>
                <p className="text-xs text-[#4a6f73]">Main backgrounds</p>
              </div>
              
              {/* Off White */}
              <div className="text-center">
                <div className="w-20 h-20 bg-[#fefefe] border border-[#e2e8f0] rounded-lg mx-auto mb-3 shadow-sm"></div>
                <h4 className="font-semibold text-[#1b4a56] mb-1 text-sm">Off White</h4>
                <p className="text-xs text-[#4a6f73]">#fefefe</p>
                <p className="text-xs text-[#4a6f73]">Card backgrounds</p>
              </div>
              
              {/* Light Gray */}
              <div className="text-center">
                <div className="w-20 h-20 bg-[#f8f8f9] border border-[#e2e8f0] rounded-lg mx-auto mb-3 shadow-sm"></div>
                <h4 className="font-semibold text-[#1b4a56] mb-1 text-sm">Light Gray</h4>
                <p className="text-xs text-[#4a6f73]">#f8f8f9</p>
                <p className="text-xs text-[#4a6f73]">Subtle backgrounds</p>
              </div>
              
              {/* Border Gray */}
              <div className="text-center">
                <div className="w-20 h-20 bg-[#f3f3f3] border border-[#e2e8f0] rounded-lg mx-auto mb-3 shadow-sm"></div>
                <h4 className="font-semibold text-[#1b4a56] mb-1 text-sm">Border Gray</h4>
                <p className="text-xs text-[#4a6f73]">#f3f3f3</p>
                <p className="text-xs text-[#4a6f73]">Borders, dividers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Secondary Color Palette */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Secondary Color Palette</CardTitle>
            <CardDescription className="text-base">Supporting colors for secondary elements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Load More Background */}
              <div className="text-center">
                <div className="w-24 h-24 bg-[#f1f5f9] rounded-lg mx-auto mb-4 shadow-lg"></div>
                <h4 className="font-semibold text-[#1b4a56] mb-2">Load More BG</h4>
                <p className="text-sm text-[#4a6f73] mb-2">#f1f5f9</p>
                <p className="text-xs text-[#4a6f73]">Load more buttons</p>
              </div>
              
              {/* Load More Text */}
              <div className="text-center">
                <div className="w-24 h-24 bg-[#475569] rounded-lg mx-auto mb-4 shadow-lg"></div>
                <h4 className="font-semibold text-[#1b4a56] mb-2">Load More Text</h4>
                <p className="text-sm text-[#4a6f73] mb-2">#475569</p>
                <p className="text-xs text-[#4a6f73]">Secondary text</p>
              </div>
              
              {/* Hover State */}
              <div className="text-center">
                <div className="w-24 h-24 bg-[#e2e8f0] rounded-lg mx-auto mb-4 shadow-lg"></div>
                <h4 className="font-semibold text-[#1b4a56] mb-2">Hover State</h4>
                <p className="text-sm text-[#4a6f73] mb-2">#e2e8f0</p>
                <p className="text-xs text-[#4a6f73]">Button hover effects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accent Color Palette */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Accent Color Palette</CardTitle>
            <CardDescription className="text-base">Special colors for highlights and emphasis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Very Pale Cream */}
              <div className="text-center">
                <div className="w-24 h-24 bg-[#fffefd] border border-[#e2e8f0] rounded-lg mx-auto mb-4 shadow-lg"></div>
                <h4 className="font-semibold text-[#1b4a56] mb-2">Pale Cream</h4>
                <p className="text-sm text-[#4a6f73] mb-2">#fffefd</p>
                <p className="text-xs text-[#4a6f73]">Background accent</p>
              </div>
              
              {/* Soft Peach */}
              <div className="text-center">
                <div className="w-24 h-24 bg-[#feefea] border border-[#e2e8f0] rounded-lg mx-auto mb-4 shadow-lg"></div>
                <h4 className="font-semibold text-[#1b4a56] mb-2">Soft Peach</h4>
                <p className="text-sm text-[#4a6f73] mb-2">#feefea</p>
                <p className="text-xs text-[#4a6f73]">Highlight sections</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Usage Guidelines */}
        <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Color Usage Guidelines</CardTitle>
            <CardDescription className="text-base">Best practices for using the color system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-[#1b4a56] mb-4">Primary Usage</h4>
                <ul className="text-sm text-[#4a6f73] space-y-2">
                  <li>• <strong>#1e293b:</strong> Main buttons, headings, important text</li>
                  <li>• <strong>#0f172a:</strong> Button hover states, active elements</li>
                  <li>• <strong>#e27447:</strong> Call-to-action buttons, highlights</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#1b4a56] mb-4">Background Usage</h4>
                <ul className="text-sm text-[#4a6f73] space-y-2">
                  <li>• <strong>#ffffff:</strong> Main content backgrounds</li>
                  <li>• <strong>#fefefe:</strong> Card and section backgrounds</li>
                  <li>• <strong>#f8f8f9:</strong> Subtle background variations</li>
                </ul>
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
      case "testimonials":
        return renderTestimonialsSection()
      case "navigation":
        return renderNavigationSection()
      case "utilities":
        return renderUtilitiesSection()
      case "pagination":
        return renderPaginationSection()
      case "contact":
        return renderContactSection()
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
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
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