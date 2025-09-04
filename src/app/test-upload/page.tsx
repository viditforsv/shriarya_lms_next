'use client'

import { useState, useEffect } from 'react'
import { FileUpload } from '@/components/ui/file-upload'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react'

interface UploadedResource {
  id: string
  title: string
  url: string
  kind: string
  file_size: number
  mime: string
}

interface TestResult {
  supabase?: {
    status: 'success' | 'error'
    message: string
    data?: number
  }
  api?: {
    status: 'success' | 'error'
    message: string
    data?: number
  }
  bunny?: {
    status: 'success' | 'error'
    message: string
    data?: unknown
  }
}

export default function TestUploadPage() {
  const { user } = useAuth()
  const [uploadedResources, setUploadedResources] = useState<UploadedResource[]>([])
  const [connectionStatus, setConnectionStatus] = useState<{
    supabase: 'checking' | 'connected' | 'error'
    bunny: 'checking' | 'connected' | 'error'
    api: 'checking' | 'connected' | 'error'
  }>({
    supabase: 'checking',
    bunny: 'checking',
    api: 'checking'
  })
  const [testResults, setTestResults] = useState<TestResult>({})

  const handleUploadComplete = (resource: UploadedResource) => {
    console.log('Upload completed:', resource)
    setUploadedResources(prev => [...prev, resource])
  }

  // Test Supabase connection
  const testSupabaseConnection = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('courses')
        .select('id')
        .limit(1)
      
      if (error) throw error
      
      setConnectionStatus(prev => ({ ...prev, supabase: 'connected' }))
      setTestResults(prev => ({ 
        ...prev, 
        supabase: { 
          status: 'success', 
          message: 'Successfully connected to Supabase',
          data: data?.length || 0
        }
      }))
    } catch (error) {
      console.error('Supabase connection error:', error)
      setConnectionStatus(prev => ({ ...prev, supabase: 'error' }))
      setTestResults(prev => ({ 
        ...prev, 
        supabase: { 
          status: 'error', 
          message: error instanceof Error ? error.message : 'Unknown error'
        }
      }))
    }
  }

  // Test API connection
  const testApiConnection = async () => {
    try {
      const response = await fetch('/api/upload?lessonId=test-lesson-id', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`)
      }
      
      const data = await response.json()
      setConnectionStatus(prev => ({ ...prev, api: 'connected' }))
      setTestResults(prev => ({ 
        ...prev, 
        api: { 
          status: 'success', 
          message: 'API endpoint is accessible',
          data: data.resources?.length || 0
        }
      }))
    } catch (error) {
      console.error('API connection error:', error)
      setConnectionStatus(prev => ({ ...prev, api: 'error' }))
      setTestResults(prev => ({ 
        ...prev, 
        api: { 
          status: 'error', 
          message: error instanceof Error ? error.message : 'Unknown error'
        }
      }))
    }
  }

  // Test Bunny CDN connection
  const testBunnyConnection = async () => {
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'test-connection',
          filename: 'test.txt',
          contentType: 'text/plain'
        })
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`)
      }
      
      const data = await response.json()
      setConnectionStatus(prev => ({ ...prev, bunny: 'connected' }))
      setTestResults(prev => ({ 
        ...prev, 
        bunny: { 
          status: 'success', 
          message: 'Bunny CDN connection test successful',
          data: data
        }
      }))
    } catch (error) {
      console.error('Bunny CDN connection error:', error)
      setConnectionStatus(prev => ({ ...prev, bunny: 'error' }))
      setTestResults(prev => ({ 
        ...prev, 
        bunny: { 
          status: 'error', 
          message: error instanceof Error ? error.message : 'Unknown error'
        }
      }))
    }
  }

  // Run all connection tests
  const runConnectionTests = async () => {
    setConnectionStatus({
      supabase: 'checking',
      bunny: 'checking',
      api: 'checking'
    })
    
    await Promise.all([
      testSupabaseConnection(),
      testApiConnection(),
      testBunnyConnection()
    ])
  }

  useEffect(() => {
    if (user) {
      runConnectionTests()
    }
  }, [user])

  const getStatusIcon = (status: 'checking' | 'connected' | 'error') => {
    switch (status) {
      case 'checking':
        return <Loader2 className="w-4 h-4 animate-spin" />
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusBadge = (status: 'checking' | 'connected' | 'error') => {
    switch (status) {
      case 'checking':
        return <Badge variant="outline">Checking...</Badge>
      case 'connected':
        return <Badge className="bg-green-500">Connected</Badge>
      case 'error':
        return <Badge className="bg-red-500">Error</Badge>
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to test uploads</h1>
          <Button onClick={() => window.location.href = '/auth'}>
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Bunny CDN Upload Test</h1>
        
        <div className="grid gap-6">
          {/* Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Connection Status
                <Button onClick={runConnectionTests} size="sm" variant="outline">
                  Refresh Tests
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(connectionStatus.supabase)}
                    <span className="font-medium">Supabase</span>
                  </div>
                  {getStatusBadge(connectionStatus.supabase)}
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(connectionStatus.api)}
                    <span className="font-medium">API</span>
                  </div>
                  {getStatusBadge(connectionStatus.api)}
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(connectionStatus.bunny)}
                    <span className="font-medium">Bunny CDN</span>
                  </div>
                  {getStatusBadge(connectionStatus.bunny)}
                </div>
              </div>
              
              {/* Detailed Test Results */}
              <div className="mt-6 space-y-3">
                {Object.entries(testResults).map(([key, result]: [string, TestResult[keyof TestResult]]) => (
                  <div key={key} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium capitalize">{key}</span>
                      <Badge className={result.status === 'success' ? 'bg-green-500' : 'bg-red-500'}>
                        {result.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{result.message}</p>
                    {result.data && (
                      <p className="text-xs text-gray-500 mt-1">
                        Data: {typeof result.data === 'object' ? JSON.stringify(result.data) : result.data}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Test Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Test File Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                lessonId="test-lesson-id"
                onUploadComplete={handleUploadComplete}
                acceptedTypes={['image/*', 'video/*', 'application/pdf']}
                maxSize={50}
              />
            </CardContent>
          </Card>

          {/* Uploaded Files */}
          {uploadedResources.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Files</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {uploadedResources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{resource.title}</p>
                        <p className="text-sm text-gray-600">{resource.kind} • {resource.file_size} bytes</p>
                      </div>
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View File
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Environment Check */}
          <Card>
            <CardHeader>
              <CardTitle>Environment Check</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p><strong>BUNNY_CDN_API_KEY:</strong> {process.env.NEXT_PUBLIC_BUNNY_CDN_API_KEY ? '✅ Set' : '❌ Missing'}</p>
                <p><strong>BUNNY_CDN_STORAGE_ZONE:</strong> {process.env.NEXT_PUBLIC_BUNNY_CDN_STORAGE_ZONE ? '✅ Set' : '❌ Missing'}</p>
                <p><strong>User:</strong> {user?.email}</p>
                <p><strong>User ID:</strong> {user?.id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
