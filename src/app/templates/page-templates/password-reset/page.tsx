'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { safeApostropheText } from '@/lib/utils'

export default function PasswordResetPage() {
  const [isResetMode, setIsResetMode] = useState(true)
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    
    // Simulate API call
    setTimeout(() => {
      setMessage('Password reset link sent to your email!')
      setIsLoading(false)
    }, 2000)
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match!')
      setIsLoading(false)
      return
    }
    
    // Simulate API call
    setTimeout(() => {
      setMessage('Password updated successfully!')
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link 
            href="/templates/page-templates" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Page Templates
          </Link>
          <h1 className="text-2xl font-bold text-[#1e293b]">Password Reset</h1>
          <p className="text-muted-foreground mt-2">
            Reset your password or verify your email address
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex rounded-sm border border-[#feefea] p-1 bg-muted">
          <button
            onClick={() => setIsResetMode(true)}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-sm transition-colors ${
              isResetMode 
                ? 'bg-white text-[#1e293b] shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Reset Password
          </button>
          <button
            onClick={() => setIsResetMode(false)}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-sm transition-colors ${
              !isResetMode 
                ? 'bg-white text-[#1e293b] shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Email Verification
          </button>
        </div>

        {isResetMode ? (
          /* Password Reset Form */
          <Card className="border-[#feefea]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1e293b] flex items-center">
                <Mail className="w-5 h-5 mr-2 text-[#e27447]" />
                Reset Password
              </CardTitle>
              <CardDescription>
                {safeApostropheText("Enter your email address and we'll send you a link to reset your password.")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-[#1e293b]">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="border-[#feefea] focus:border-[#e27447] focus:ring-[#e27447]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#e27447] hover:bg-[#e27447]/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          /* Password Update Form */
          <Card className="border-[#feefea]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1e293b] flex items-center">
                <Lock className="w-5 h-5 mr-2 text-[#e27447]" />
                Update Password
              </CardTitle>
              <CardDescription>
                Enter your reset token and new password to complete the reset.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="token" className="text-[#1e293b]">Reset Token</Label>
                  <Input
                    id="token"
                    type="text"
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    placeholder="Enter reset token from email"
                    required
                    className="border-[#feefea] focus:border-[#e27447] focus:ring-[#e27447]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="newPassword" className="text-[#1e293b]">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                      className="border-[#feefea] focus:border-[#e27447] focus:ring-[#e27447] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword" className="text-[#1e293b]">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      required
                      className="border-[#feefea] focus:border-[#e27447] focus:ring-[#e27447] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#e27447] hover:bg-[#e27447]/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Message Display */}
        {message && (
          <div className={`p-4 rounded-sm text-sm ${
            message.includes('successfully') || message.includes('sent')
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Additional Links */}
        <div className="text-center space-y-2">
          <Link 
            href="/templates/page-templates/login" 
            className="text-sm text-[#e27447] hover:text-[#e27447]/80 transition-colors"
          >
            Back to Login
          </Link>
          <div className="text-xs text-muted-foreground">
            Need help? Contact support
          </div>
        </div>
      </div>
    </div>
  )
}
