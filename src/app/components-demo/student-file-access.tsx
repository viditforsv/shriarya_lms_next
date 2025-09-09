'use client'

import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/app/components-demo/ui/ui-components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components-demo/ui/ui-components/card'
import { Badge } from '@/app/components-demo/ui/ui-components/badge'
import { useAuth } from '@/contexts/AuthContext'

interface CourseFile {
  id: string
  title: string
  description: string
  fileType: 'pdf' | 'video' | 'image' | 'document'
  fileSize: string
  uploadedAt: string
  fileName: string
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

  // Mock course files (in real app, this would come from your database)
  const mockFiles: CourseFile[] = useMemo(() => [
    {
      id: '1',
      title: 'Real Numbers - Chapter 1',
      description: 'Introduction to real numbers, rational and irrational numbers',
      fileType: 'pdf',
      fileSize: '2.3 MB',
      uploadedAt: '2024-01-15',
      fileName: 'real-numbers-chapter1.pdf'
    },
    {
      id: '2',
      title: 'Polynomials - Video Lesson',
      description: 'Understanding polynomials and their properties',
      fileType: 'video',
      fileSize: '45.2 MB',
      uploadedAt: '2024-01-16',
      fileName: 'polynomials-lesson.mp4'
    },
    {
      id: '3',
      title: 'Quadratic Equations - Practice Sheet',
      description: 'Practice problems for quadratic equations',
      fileType: 'pdf',
      fileSize: '1.8 MB',
      uploadedAt: '2024-01-17',
      fileName: 'quadratic-equations-practice.pdf'
    }
  ], [])

  useEffect(() => {
    // Simulate loading course files
    setTimeout(() => {
      setFiles(mockFiles)
      setLoading(false)
    }, 1000)
  }, [mockFiles])

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

  const handleViewFile = async (file: CourseFile) => {
    try {
      // Get signed URL for the file
      const response = await fetch(`/api/signed-url?file=/${file.fileName}`)
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => (
            <Card key={file.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getFileIcon(file.fileType)}</span>
                    <div>
                      <CardTitle className="text-lg">{file.title}</CardTitle>
                      <CardDescription>{file.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getFileTypeColor(file.fileType)}>
                    {file.fileType.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Size: {file.fileSize}</span>
                  <span>Added: {file.uploadedAt}</span>
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
                  {getFileIcon(viewingFile.fileType)} {viewingFile.title}
                </CardTitle>
                <CardDescription>
                  {viewingFile.description} • {viewingFile.fileSize}
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
                {viewingFile.fileType === 'pdf' ? (
                  <iframe
                    src={signedUrl}
                    className="w-full h-full border-0"
                    title={viewingFile.title}
                  />
                ) : viewingFile.fileType === 'video' ? (
                  <video
                    src={signedUrl}
                    controls
                    className="w-full h-full"
                    controlsList="nodownload"
                    disablePictureInPicture
                  />
                ) : viewingFile.fileType === 'image' ? (
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
                      <p className="text-sm">File: {viewingFile.fileName}</p>
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
