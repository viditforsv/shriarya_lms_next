'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Github, Chrome, Check } from 'lucide-react'

export default function SignupPageTemplate() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptedTerms) return
    
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Handle signup logic here
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
          <h1 className="text-4xl font-bold text-[#1e293b] mb-4">Signup Page Template</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A professional signup page template featuring multi-step form, social signup options, and comprehensive validation.
          </p>
        </div>

        {/* Main Signup Section */}
        <div className="max-w-lg mx-auto">
          <Card className="shadow-lg border-[#feefea]">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-[#feefea] rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-[#e27447]" />
              </div>
              <CardTitle className="text-2xl text-[#1e293b]">Create Account</CardTitle>
              <CardDescription className="text-[#4a6f73]">
                Join us and start your learning journey today
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Social Signup Buttons */}
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
                  <span className="bg-background px-2 text-[#4a6f73]">Or sign up with email</span>
                </div>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-[#1e293b] mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#4a6f73]" />
                      <input
                        id="firstName"
                        type="text"
                        required
                        className="w-full pl-10 pr-4 py-3 border-2 border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447] transition-all bg-white text-[#1e293b] placeholder-[#4a6f73]"
                        placeholder="First name"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-[#1e293b] mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#4a6f73]" />
                      <input
                        id="lastName"
                        type="text"
                        required
                        className="w-full pl-10 pr-4 py-3 border-2 border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447] transition-all bg-white text-[#1e293b] placeholder-[#4a6f73]"
                        placeholder="Last name"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
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

                {/* Password Field */}
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
                      placeholder="Create a password"
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
                  
                  {/* Password Requirements */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center space-x-2 text-xs text-[#4a6f73]">
                      <Check className="w-3 h-3 text-green-500" />
                      <span>At least 8 characters</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-[#4a6f73]">
                      <Check className="w-3 h-3 text-green-500" />
                      <span>One uppercase letter</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-[#4a6f73]">
                      <Check className="w-3 h-3 text-green-500" />
                      <span>One number</span>
                    </div>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#1e293b] mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#4a6f73]" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      className="w-full pl-10 pr-12 py-3 border-2 border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447] transition-all bg-white text-[#1e293b] placeholder-[#4a6f73]"
                      placeholder="Confirm your password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4a6f73] hover:text-[#1e293b] transition-colors"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-3">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="w-4 h-4 text-[#e27447] border-[#feefea] rounded focus:ring-[#e27447] focus:ring-2 mt-1"
                      disabled={isLoading}
                    />
                    <div className="text-sm text-[#4a6f73]">
                      I agree to the{' '}
                      <Link 
                        href="/terms" 
                        className="text-[#e27447] hover:text-[#e27447]/80 font-medium transition-colors"
                      >
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link 
                        href="/privacy" 
                        className="text-[#e27447] hover:text-[#e27447]/80 font-medium transition-colors"
                      >
                        Privacy Policy
                      </Link>
                    </div>
                  </label>
                  
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#e27447] border-[#feefea] rounded focus:ring-[#e27447] focus:ring-2 mt-1"
                      disabled={isLoading}
                    />
                    <div className="text-sm text-[#4a6f73]">
                      I want to receive updates about new courses and features (optional)
                    </div>
                  </label>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-[#e27447] hover:bg-[#e27447]/90 text-white py-3"
                  disabled={isLoading || !acceptedTerms}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>

              {/* Sign In Link */}
              <div className="text-center pt-4 border-t border-[#feefea]">
                <p className="text-sm text-[#4a6f73]">
                  Already have an account?{' '}
                  <Link 
                    href="/login" 
                    className="text-[#e27447] hover:text-[#e27447]/80 font-medium transition-colors"
                  >
                    Sign in
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
            <p><strong>1. Form Handling:</strong> Connect the form submission to your user registration system (e.g., Supabase, custom backend).</p>
            <p><strong>2. Social Signup:</strong> Implement OAuth providers for Google, GitHub, and other social platforms.</p>
            <p><strong>3. Validation:</strong> Add comprehensive client-side and server-side validation for all fields.</p>
            <p><strong>4. Password Requirements:</strong> Implement actual password strength validation and update the checkmarks accordingly.</p>
            <p><strong>5. Terms & Conditions:</strong> Create actual terms and privacy policy pages and link them properly.</p>
            <p><strong>6. Email Verification:</strong> Add email verification flow after successful signup.</p>
            <p><strong>7. Error Handling:</strong> Display validation errors and network error messages appropriately.</p>
            <p><strong>8. Loading States:</strong> Connect loading states to your actual registration process.</p>
            <p><strong>9. Redirect Logic:</strong> Add proper redirect logic after successful account creation.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
