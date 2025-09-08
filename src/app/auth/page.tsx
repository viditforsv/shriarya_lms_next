"use client"

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components-demo/ui/tabs"
import { Card, CardHeader } from "@/app/components-demo/ui/card"
import { SignInForm } from "@/app/components-demo/auth/SignInForm"
import { SignUpForm } from "@/app/components-demo/auth/SignUpForm"
import { Breadcrumb } from '@/app/components-demo/ui/breadcrumb'
import { unstable_noStore as noStore } from 'next/cache'
import Image from 'next/image'

// Prevent static generation
noStore()

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>('signin')

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
                src="/images/main_logo.webp" 
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
              <TabsList className="grid w-full grid-cols-2 rounded-sm bg-[#feefea] p-1">
                <TabsTrigger 
                  value="signin" 
                  className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
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
