'use client'

import { useState, useRef } from 'react'
import { Upload, X, CheckCircle, AlertCircle, File, Video, Image, FileText } from 'lucide-react'
import { Button } from '@/design-system/components/ui/button'
import { Progress } from '@/design-system/components/ui/progress'
import { Badge } from '@/design-system/components/ui/badge'
import { createClient } from '@/lib/supabase/client'

interface FileUploadProps {
  lessonId: string
  onUploadComplete: (resource: UploadedFile) => void
  acceptedTypes?: string[]
  maxSize?: number // in MB
}

interface UploadedFile {
  id: string
  title: string
  kind: string
  url: string
  file_size: number
  mime: string
}

export function FileUpload({ 
  lessonId, 
  onUploadComplete, 
  acceptedTypes = ['*'],
  maxSize = 100 
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File too large. Maximum size is ${maxSize}MB`)
      return
    }

    // Validate file type
    if (acceptedTypes[0] !== '*' && !acceptedTypes.includes(file.type)) {
      setError(`File type not supported. Accepted types: ${acceptedTypes.join(', ')}`)
      return
    }

    await uploadFile(file)
  }

  const uploadFile = async (file: File) => {
    try {
      setUploading(true)
      setProgress(0)
      setError(null)

      // Get session token
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('No active session')
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('lessonId', lessonId)
      formData.append('title', file.name)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 200)

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        },
        body: formData
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const result = await response.json()
      setProgress(100)
      
      const newFile: UploadedFile = {
        id: result.resource.id,
        title: result.resource.title,
        kind: result.resource.kind,
        url: result.resource.url,
        file_size: result.resource.file_size,
        mime: result.resource.mime
      }

      setUploadedFiles(prev => [...prev, newFile])
      onUploadComplete(result.resource)

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

    } catch (error) {
      console.error('Upload error:', error)
      setError(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const getFileIcon = (kind: string) => {
    switch (kind) {
      case 'video':
        return <Video className="w-4 h-4" />
      case 'image':
        return <Image className="w-4 h-4" />
      case 'pdf':
      case 'document':
        return <FileText className="w-4 h-4" />
      default:
        return <File className="w-4 h-4" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        {!uploading ? (
          <div>
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Drag and drop files here, or click to select
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Maximum file size: {maxSize}MB
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedTypes.join(',')}
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button disabled={uploading}>
                Choose File
              </Button>
            </label>
          </div>
        ) : (
          <div>
            <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-pulse" />
            <p className="text-sm text-gray-600 mb-4">Uploading...</p>
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-gray-500 mt-2">{progress}% complete</p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-sm text-red-700">{error}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setError(null)}
            className="ml-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-700">Uploaded Files:</h4>
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="text-gray-500">
                  {getFileIcon(file.kind)}
                </div>
                <div>
                  <p className="text-sm font-medium">{file.title}</p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.file_size)} • {file.kind}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Uploaded
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFile(file.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
