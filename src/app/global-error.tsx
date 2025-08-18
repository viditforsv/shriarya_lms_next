'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle, Home, RefreshCw, HelpCircle } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-background">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-b border-red-200 py-8">
            <div className="container mx-auto px-4 text-center">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
              <h1 className="text-4xl font-bold text-red-800 mb-4">Something went wrong!</h1>
              <h2 className="text-2xl font-semibold text-red-700 mb-4">An unexpected error occurred</h2>
              <p className="text-lg text-red-600 max-w-2xl mx-auto">
                We apologize for the inconvenience. Our team has been notified and is working to fix this issue.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              {/* Error Details */}
              <Card className="mb-8 border-red-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-4">Error Details</h3>
                  <div className="bg-red-50 p-4 rounded-sm border border-red-200">
                    <p className="text-sm text-red-700 font-mono break-all">
                      {error.message || 'Unknown error occurred'}
                    </p>
                    {error.digest && (
                      <p className="text-xs text-red-600 mt-2">
                        Error ID: {error.digest}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Primary Actions */}
              <div className="text-center mb-16">
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button 
                    onClick={reset}
                    size="lg" 
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Try Again
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/" className="flex items-center space-x-2">
                      <Home className="w-5 h-5" />
                      <span>Go Home</span>
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Help Section */}
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <HelpCircle className="w-10 h-10 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-800 mb-4">Need Help?</h3>
                  <p className="text-red-700 mb-6 max-w-2xl mx-auto">
                    If this error persists, please contact our support team with the error details above.
                    We&apos;ll help you resolve this issue as quickly as possible.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                      <Link href="/contact">Contact Support</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                      <Link href="/help">Help Center</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Navigation */}
              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-4">
                  You can also try navigating to these pages:
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/courses">Courses</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/templates">Templates</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/auth">Login</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
