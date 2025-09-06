'use client'

import { useState } from 'react'
import { Button } from '@/app/components-demo/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components-demo/ui/card'
import { Badge } from '@/app/components-demo/ui/badge'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function BunnyCDNTest() {
  const [testResult, setTestResult] = useState<{
    success?: boolean
    error?: string
    message?: string
    storageZone?: string
    fileCount?: number | string
    details?: string
    status?: number
    statusText?: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const testConnection = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'test-connection'
        })
      })

      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        error: 'Failed to test connection',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1e293b] mb-4">Bunny CDN Test</h1>
          <p className="text-muted-foreground">
            Test the connection to Bunny CDN and verify configuration.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Connection Test</CardTitle>
            <CardDescription>
              Click the button below to test your Bunny CDN configuration.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testConnection} 
              disabled={isLoading}
              className="bg-[#e27447] hover:bg-[#e27447]/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Testing Connection...
                </>
              ) : (
                'Test Bunny CDN Connection'
              )}
            </Button>
          </CardContent>
        </Card>

        {testResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {testResult.success ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Connection Successful
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    Connection Failed
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testResult.success ? (
                  <div className="space-y-2">
                    <Badge className="bg-green-100 text-green-800">
                      ✓ Bunny CDN Connected
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Storage Zone: <code className="bg-gray-100 px-2 py-1 rounded">{testResult.storageZone}</code>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Files Found: <code className="bg-gray-100 px-2 py-1 rounded">{testResult.fileCount}</code>
                    </p>
                    <p className="text-sm text-green-600">
                      {testResult.message}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Badge variant="destructive">
                      ✗ Connection Failed
                    </Badge>
                    <p className="text-sm text-red-600">
                      Error: {testResult.error}
                    </p>
                    {testResult.details && (
                      <p className="text-sm text-muted-foreground">
                        Details: {testResult.details}
                      </p>
                    )}
                    {testResult.status && (
                      <p className="text-sm text-muted-foreground">
                        Status: {testResult.status} - {testResult.statusText}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Configuration Required</CardTitle>
            <CardDescription>
              Make sure you have the following environment variables set in your .env.local file:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 font-mono text-sm">
              <div className="bg-gray-100 p-3 rounded">
                <code>BUNNY_CDN_API_KEY=your_api_key_here</code>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <code>BUNNY_CDN_STORAGE_ZONE=your_storage_zone_name</code>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <code>BUNNY_CDN_URL=https://your-storage-zone.b-cdn.net</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
