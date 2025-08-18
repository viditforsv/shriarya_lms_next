'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Eye, EyeOff, Mail, Lock, Github, Chrome } from 'lucide-react'

export default function LoginPageTemplate() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Handle login logic here
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="mb-12">
          <Link 
            href="/templates/page-templates" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Page Templates
          </Link>
        </div>

        {/* Template Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1e293b] mb-4">Login Page Template</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A professional login page template featuring clean design, social login options, and responsive layout.
          </p>
        </div>

        {/* Main Login Section */}
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg border-[#feefea]">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-[#feefea] rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#e27447]" />
              </div>
              <CardTitle className="text-2xl text-[#1e293b]">Welcome Back</CardTitle>
              <CardDescription className="text-[#4a6f73]">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Social Login Buttons */}
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full border-[#feefea] hover:bg-[#feefea] hover:border-[#e27447] transition-colors"
                  disabled={isLoading}
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Continue with Google
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-[#feefea] hover:bg-[#feefea] hover:border-[#e27447] transition-colors"
                  disabled={isLoading}
                >
                  <Github className="w-4 h-4 mr-2" />
                  Continue with GitHub
                </Button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#feefea]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-[#4a6f73]">Or continue with</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1e293b] mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#4a6f73]" />
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447] transition-all bg-white text-[#1e293b] placeholder-[#4a6f73]"
                      placeholder="Enter your email"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#1e293b] mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#4a6f73]" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full pl-10 pr-12 py-3 border-2 border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447] transition-all bg-white text-[#1e293b] placeholder-[#4a6f73]"
                      placeholder="Enter your password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4a6f73] hover:text-[#1e293b] transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#e27447] border-[#feefea] rounded focus:ring-[#e27447] focus:ring-2"
                      disabled={isLoading}
                    />
                    <span className="text-sm text-[#4a6f73]">Remember me</span>
                  </label>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-[#e27447] hover:text-[#e27447]/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-[#e27447] hover:bg-[#e27447]/90 text-white py-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center pt-4 border-t border-[#feefea]">
                <p className="text-sm text-[#4a6f73]">
                  Don&apos;t have an account?{' '}
                  <Link 
                    href="/signup" 
                    className="text-[#e27447] hover:text-[#e27447]/80 font-medium transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Template Usage Instructions */}
        <div className="mt-20 bg-[#feefea] rounded-sm border border-[#e27447] p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-[#1e293b] mb-6">Template Usage Instructions</h3>
          <div className="space-y-4 text-[#1e293b]">
            <p><strong>1. Form Handling:</strong> Connect the form submission to your authentication system (e.g., Supabase, Auth0, custom backend).</p>
            <p><strong>2. Social Login:</strong> Implement OAuth providers for Google, GitHub, and other social platforms.</p>
            <p><strong>3. Validation:</strong> Add client-side and server-side form validation for email and password fields.</p>
            <p><strong>4. Error Handling:</strong> Display error messages for invalid credentials or network issues.</p>
            <p><strong>5. Loading States:</strong> The template includes loading states - connect them to your actual authentication process.</p>
            <p><strong>6. Remember Me:</strong> Implement &quot;remember me&quot; functionality using cookies or local storage.</p>
            <p><strong>7. Forgot Password:</strong> Create a forgot password page and link it properly.</p>
            <p><strong>8. Redirect Logic:</strong> Add proper redirect logic after successful login.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
