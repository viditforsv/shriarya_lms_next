"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

interface TestResult {
  status?: number
  data?: unknown
  error?: string
}

export default function DebugAuthPage() {
  const { user, profile } = useAuth()
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const testAuth = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test-auth')
      const data = await response.json()
      setTestResult({ status: response.status, data })
    } catch (error) {
      setTestResult({ error: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      setLoading(false)
    }
  }

  const testAuthV2 = async () => {
    setLoading(true)
    try {
      // Get the current session token
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        setTestResult({ error: 'No active session' })
        return
      }

      const response = await fetch('/api/test-auth-v2', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })
      const data = await response.json()
      setTestResult({ status: response.status, data })
    } catch (error) {
      setTestResult({ error: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      setLoading(false)
    }
  }

  const runDiagnostic = async () => {
    setLoading(true)
    try {
      // Get the current session token
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        setTestResult({ error: 'No active session' })
        return
      }

      const response = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })
      const data = await response.json()
      setTestResult({ status: response.status, data })
    } catch (error) {
      setTestResult({ error: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Authentication Debug</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Client-Side Auth State</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-sm overflow-auto">
              {JSON.stringify({ user, profile }, null, 2)}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Server-Side Auth Test</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={testAuth} disabled={loading}>
              {loading ? 'Testing...' : 'Test Server Auth'}
            </Button>
            
            <Button onClick={testAuthV2} disabled={loading} className="ml-2">
              {loading ? 'Testing...' : 'Test Auth V2'}
            </Button>
            
            <Button onClick={runDiagnostic} disabled={loading} className="ml-2">
              {loading ? 'Running...' : 'Run Diagnostic'}
            </Button>
            
            {testResult && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Result:</h3>
                <pre className="bg-gray-100 p-4 rounded-sm overflow-auto">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <strong>NEXT_PUBLIC_SUPABASE_URL:</strong> 
                <span className="ml-2 text-sm text-gray-600">
                  {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set'}
                </span>
              </div>
              <div>
                <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong> 
                <span className="ml-2 text-sm text-gray-600">
                  {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
