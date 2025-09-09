'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Button } from '@/app/components-demo/ui/ui-components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components-demo/ui/ui-components/card'
import { Badge } from '@/app/components-demo/ui/ui-components/badge'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

interface CourseFile {
  id: string
  title: string
  description: string
  file_type: string
  file_size: number
  url: string
  lesson_id: string
  created_at: string
}

interface SignedUrlResponse {
  url: string
  expires: number
  filePath: string
}

export default function StudentFileAccess() {
  const { user } = useAuth()
  const [files, setFiles] = useState<CourseFile[]>([])
  const [loading, setLoading] = useState(true)
  const [viewingFile, setViewingFile] = useState<CourseFile | null>(null)
  const [signedUrl, setSignedUrl] = useState<string | null>(null)
  const [urlExpires, setUrlExpires] = useState<number | null>(null)

  useEffect(() => {
    if (user) {
      fetchCourseFiles()
    }
  }, [user])

  const fetchCourseFiles = async () => {
    try {
      setLoading(true)
      
      // Get files from Supabase database
      const { data: files, error } = await supabase
        .from('resources')
        .select(`
          id,
          title,
          description,
          file_type,
          file_size,
          url,
          lesson_id,
          created_at
        `)
        .eq('lesson_id', '1') // Class 10 course lesson
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching files:', error)
        return
      }

      setFiles(files || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf': return '📄'
      case 'video': return '🎥'
      case 'image': return '🖼️'
      case 'document': return '📝'
      default: return '📁'
    }
  }

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case 'pdf': return 'bg-red-100 text-red-800'
      case 'video': return 'bg-blue-100 text-blue-800'
      case 'image': return 'bg-green-100 text-green-800'
      case 'document': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleViewFile = async (file: CourseFile) => {
    try {
      // Extract filename from URL for signed URL generation
      const fileName = file.url.split('/').pop() || file.title
      
      // Get signed URL for the file
      const response = await fetch(`/api/signed-url?file=/${fileName}`)
      const data: SignedUrlResponse = await response.json()

      if (response.ok) {
        setViewingFile(file)
        setSignedUrl(data.url)
        setUrlExpires(data.expires)
      } else {
        alert(`Error: ${'Failed to get file access'}`)
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to access file'}`)
    }
  }

  const closeFileViewer = () => {
    setViewingFile(null)
    setSignedUrl(null)
    setUrlExpires(null)
  }

  const formatExpiryTime = (expires: number) => {
    const expiryDate = new Date(expires * 1000)
    const now = new Date()
    const diffMinutes = Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60))
    
    if (diffMinutes < 1) return 'Expires soon'
    if (diffMinutes < 60) return `Expires in ${diffMinutes} minutes`
    return `Expires at ${expiryDate.toLocaleTimeString()}`
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>🔒 Access Required</CardTitle>
            <CardDescription>
              Please sign in to access course materials
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📚 Course Materials
        </h1>
        <p className="text-gray-600">
          Secure access to your course files with token authentication
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Badge variant="outline">Student: {user.email}</Badge>
          <Badge variant="secondary">CBSE Mathematics Class 10</Badge>
        </div>
      </div>

      {/* Files Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : files.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>📁 No Files Available</CardTitle>
            <CardDescription>
              No course materials are currently available. Please check back later.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => (
            <Card key={file.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getFileIcon(file.file_type)}</span>
                    <div>
                      <CardTitle className="text-lg">{file.title}</CardTitle>
                      <CardDescription>{file.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getFileTypeColor(file.file_type)}>
                    {file.file_type.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Size: {formatFileSize(file.file_size)}</span>
                  <span>Added: {new Date(file.created_at).toLocaleDateString()}</span>
                </div>
                <Button 
                  onClick={() => handleViewFile(file)}
                  className="w-full"
                  variant="outline"
                >
                  👁️ View File
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* File Viewer Modal */}
      {viewingFile && signedUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {getFileIcon(viewingFile.file_type)} {viewingFile.title}
                </CardTitle>
                <CardDescription>
                  {viewingFile.description} • {formatFileSize(viewingFile.file_size)}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {urlExpires && (
                  <Badge variant="outline" className="text-xs">
                    {formatExpiryTime(urlExpires)}
                  </Badge>
                )}
                <Button onClick={closeFileViewer} variant="outline" size="sm">
                  ✕ Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[70vh] bg-gray-50">
                {viewingFile.file_type === 'pdf' ? (
                  <iframe
                    src={signedUrl}
                    className="w-full h-full border-0"
                    title={viewingFile.title}
                  />
                ) : viewingFile.file_type === 'video' ? (
                  <video
                    src={signedUrl}
                    controls
                    className="w-full h-full"
                    controlsList="nodownload"
                    disablePictureInPicture
                  />
                ) : viewingFile.file_type === 'image' ? (
                  <Image
                    src={signedUrl}
                    alt={viewingFile.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📄</div>
                      <p>Preview not available for this file type</p>
                      <p className="text-sm">File: {viewingFile.url}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Security Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">🔒 Security Features</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-700 space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-green-600">✅</span>
            <span>Files are accessed via signed URLs with automatic expiry</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✅</span>
            <span>No direct download links - files can only be viewed</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✅</span>
            <span>Token authentication prevents unauthorized access</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✅</span>
            <span>Student authentication required for all file access</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
