'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'

export default function TestAuthPage() {
  const { user, session, loading, signOut } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded-sm mb-8"></div>
            <div className="h-12 bg-muted rounded-sm mb-8"></div>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-64 bg-muted rounded-sm"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumbs */}
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "Test Auth", href: "/test-auth", isActive: true },
          ]} 
          className="mb-8"
        />
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Authentication Test Page
          </h1>
          <p className="text-muted-foreground">
            Use this page to test and debug your authentication setup
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Authentication Status */}
          <Card>
            <CardHeader>
              <CardTitle>Authentication Status</CardTitle>
              <CardDescription>Current user and session information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Status:</span>
                <Badge variant={user ? "default" : "secondary"}>
                  {user ? "Authenticated" : "Not Authenticated"}
                </Badge>
              </div>
              
              {user && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">User ID:</span>
                    <span className="text-sm text-muted-foreground font-dm-sans">
                      {user.id.substring(0, 8)}...
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Email:</span>
                    <span className="text-sm text-muted-foreground">{user.email}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Full Name:</span>
                    <span className="text-sm text-muted-foreground">
                      {user.user_metadata?.full_name || "Not set"}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Provider:</span>
                    <span className="text-sm text-muted-foreground">
                      {user.app_metadata?.provider || "email"}
                    </span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Session Information */}
          <Card>
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
              <CardDescription>Current session information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Session Active:</span>
                <Badge variant={session ? "default" : "secondary"}>
                  {session ? "Yes" : "No"}
                </Badge>
              </div>
              
              {session && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Access Token:</span>
                    <span className="text-sm text-muted-foreground font-dm-sans">
                      {session.access_token.substring(0, 20)}...
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Expires At:</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(session.expires_at! * 1000).toLocaleString()}
                    </span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Test Actions</CardTitle>
            <CardDescription>Actions you can test</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {!user ? (
                <>
                  <Button 
                    onClick={() => router.push('/auth')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Go to Login
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => router.push('/')}
                  >
                    Go to Home
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => router.push('/dashboard')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Go to Dashboard
                  </Button>
                  <Button 
                    onClick={() => router.push('/')}
                    variant="outline"
                  >
                    Go to Home
                  </Button>
                  <Button 
                    onClick={async () => {
                      await signOut()
                      router.push('/')
                    }}
                    variant="destructive"
                  >
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Debug Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
            <CardDescription>Raw authentication data for debugging</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-4 rounded-lg">
              <pre className="text-xs overflow-auto">
                {JSON.stringify({ user, session, loading }, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
