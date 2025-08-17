"use client"

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader } from "@/components/ui/card"
import { SignInForm } from "@/components/auth/SignInForm"
import { SignUpForm } from "@/components/auth/SignUpForm"
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { unstable_noStore as noStore } from 'next/cache'
import Image from 'next/image'

// Prevent static generation
noStore()

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>('signin')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-sm flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/logo.webp" 
                  alt="ShriArya LMS Logo" 
                  width={64}
                  height={64}
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              ShriArya
            </h1>
            <p className="text-muted-foreground">
              Your gateway to knowledge and growth
            </p>
          </div>

          <Card className="w-full">
            <CardHeader className="pb-4">
              <div className="grid w-full grid-cols-2 bg-muted p-1 rounded-sm">
                <div className="flex items-center justify-center h-10 px-3 py-2 text-sm font-medium bg-primary text-primary-foreground shadow-sm rounded-sm">
                  Sign In
                </div>
                <div className="flex items-center justify-center h-10 px-3 py-2 text-sm font-medium">
                  Sign Up
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6">
          <Breadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Authentication", href: "/auth", isActive: true },
            ]} 
          />
        </div>
        
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-sm flex items-center justify-center overflow-hidden">
              <Image 
                src="/images/logo.webp" 
                alt="ShriArya LMS Logo" 
                width={64}
                height={64}
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ShriArya
          </h1>
          <p className="text-muted-foreground">
            Your gateway to knowledge and growth
          </p>
        </div>

        <Card className="w-full">
          <CardHeader className="pb-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted p-1 rounded-sm">
                <TabsTrigger 
                  value="signin" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200"
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
  )
}
