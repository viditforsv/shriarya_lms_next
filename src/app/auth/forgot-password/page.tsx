'use client'
import { useState } from 'react'
import { Button } from '@/design-system/components/ui/button'
import { Input } from '@/design-system/components/ui/input'
import { Label } from '@/design-system/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system/components/ui/card'
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const { resetPassword } = useAuth()

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    setError('')

    if (!email) {
      setError('Please enter your email address')
      setIsLoading(false)
      return
    }

    try {
      await resetPassword(email)
      setMessage('Password reset link sent to your email! Check your inbox and spam folder.')
    } catch (error) {
      console.error('Password reset error:', error)
      setError(error instanceof Error ? error.message : 'Failed to send reset email')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef7f0] to-[#feefea] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-[#feefea]">
        <CardHeader className="text-center">
          <Mail className="w-12 h-12 text-[#e27447] mx-auto mb-4" />
          <CardTitle className="text-xl text-[#1e293b]">Forgot Password?</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <div className="mb-4 p-3 border border-green-200 bg-green-50 rounded-md flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-green-800 text-sm">{message}</span>
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-3 border border-red-200 bg-red-50 rounded-md flex items-center">
              <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
              <span className="text-red-800 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-[#1e293b]">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="border-[#feefea] focus:border-[#e27447] focus:ring-[#e27447]"
              />
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#e27447] hover:bg-[#d65a2b] text-white disabled:opacity-50"
            >
              {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              href="/auth"
              className="inline-flex items-center text-[#e27447] hover:text-[#d65a2b] text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
