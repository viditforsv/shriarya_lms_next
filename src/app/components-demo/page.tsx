"use client"

import { useState, useEffect } from "react"

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'

export default function ComponentsDemoPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Prevent SSR rendering issues
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded-sm mb-8"></div>
          <div className="h-64 bg-muted rounded-sm"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">Components Demo</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple showcase of our UI components
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-card p-6 rounded-sm border">
            <h2 className="text-2xl font-bold text-foreground mb-4">Basic Components</h2>
            <p className="text-muted-foreground">
              This page demonstrates basic UI components without complex interactions.
            </p>
          </div>

          <div className="bg-card p-6 rounded-sm border">
            <h2 className="text-2xl font-bold text-foreground mb-4">Design System</h2>
            <p className="text-muted-foreground">
              Our components follow a consistent design system with proper spacing and typography.
            </p>
          </div>

          <div className="bg-card p-6 rounded-sm border">
            <h2 className="text-2xl font-bold text-foreground mb-4">Accessibility</h2>
            <p className="text-muted-foreground">
              All components are built with accessibility in mind, following WCAG guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 