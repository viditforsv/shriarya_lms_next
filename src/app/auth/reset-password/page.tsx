'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/components-demo/ui/ui-components/button'
import { Input } from '@/app/components-demo/ui/ui-components/input'
import { Label } from '@/app/components-demo/ui/ui-components/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components-demo/ui/ui-components/card'
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isValidSession, setIsValidSession] = useState(false)

  const { updatePassword, user } = useAuth()
  const router = useRouter()
  // const searchParams = useSearchParams()

  useEffect(() => {
    // Check if user is authenticated (required for password reset)
    if (user) {
      setIsValidSession(true)
    } else {
      setError('Invalid or expired reset link. Please request a new password reset.')
    }
  }, [user])

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match!')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long!')
      setIsLoading(false)
      return
    }

    try {
      await updatePassword(password)
      setMessage('Password updated successfully! Redirecting to login...')
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/auth')
      }, 2000)
    } catch (error) {
      console.error('Password update error:', error)
      setError(error instanceof Error ? error.message : 'Failed to update password')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isValidSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fef7f0] to-[#feefea] flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-[#feefea]">
          <CardHeader className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-xl text-[#1e293b]">Invalid Reset Link</CardTitle>
            <CardDescription>
              This password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => router.push('/auth')}
              className="w-full bg-[#e27447] hover:bg-[#d65a2b] text-white"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef7f0] to-[#feefea] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-[#feefea]">
        <CardHeader className="text-center">
          <Lock className="w-12 h-12 text-[#e27447] mx-auto mb-4" />
          <CardTitle className="text-xl text-[#1e293b]">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below.
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

          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-[#1e293b]">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  className="border-[#feefea] focus:border-[#e27447] focus:ring-[#e27447] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#e27447] hover:bg-[#d65a2b] text-white disabled:opacity-50"
            >
              {isLoading ? 'Updating Password...' : 'Update Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
