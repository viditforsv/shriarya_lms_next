'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function DebugAuthPage() {
  const { user, profile, loading, session, refreshProfile } = useAuth()
  const [connectionTest, setConnectionTest] = useState<string>('Not tested')

  const testConnection = async () => {
    try {
      setConnectionTest('Testing...')
      const supabase = createClient()
      
      // Simple test query
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)
      
      if (error) {
        setConnectionTest(`Error: ${error.message}`)
      } else {
        setConnectionTest('Connection successful')
      }
    } catch (error) {
      setConnectionTest(`Exception: ${error}`)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Auth Debug Information</h1>
        
        <div className="mb-6 space-x-4">
          <button 
            onClick={() => refreshProfile()}
            className="px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700"
          >
            Refresh Profile
          </button>
          
          <button 
            onClick={testConnection}
            className="px-4 py-2 bg-green-600 text-white rounded-sm hover:bg-green-700"
          >
            Test Database Connection
          </button>
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Connection</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={connectionTest === 'Connection successful' ? "default" : "destructive"}>
                {connectionTest}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loading State</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={loading ? "destructive" : "default"}>
                {loading ? "Loading..." : "Loaded"}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-sm overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-sm overflow-auto">
                {JSON.stringify(profile, null, 2)}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Information</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-sm overflow-auto">
                {JSON.stringify(session, null, 2)}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Check</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <strong>User Role:</strong> {profile?.role || 'No role'}
                </div>
                <div>
                  <strong>Is Admin:</strong> {profile?.role === 'admin' ? 'Yes' : 'No'}
                </div>
                <div>
                  <strong>User Email:</strong> {user?.email || 'No email'}
                </div>
                <div>
                  <strong>Profile Email:</strong> {profile?.email || 'No email in profile'}
                </div>
                <div>
                  <strong>Expected Admin Email:</strong> vidit@shrividhya.in
                </div>
                <div>
                  <strong>Email Match:</strong> {user?.email === 'vidit@shrividhya.in' ? 'Yes' : 'No'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
