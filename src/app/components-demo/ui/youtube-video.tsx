'use client'

import { useState, useEffect } from 'react'
import { Play, ExternalLink, Download } from 'lucide-react'
import { Button } from '@/app/components-demo/ui/ui-components/button'
import { Card, CardContent } from '@/app/components-demo/ui/ui-components/card'

interface YouTubeVideoProps {
  videoId: string
  title: string
  description?: string
  className?: string
  showControls?: boolean
}

export function YouTubeVideo({ 
  videoId, 
  title, 
  description, 
  className = "",
  showControls = true 
}: YouTubeVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showEmbed, setShowEmbed] = useState(false)

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  const handlePlay = () => {
    setShowEmbed(true)
    setIsLoaded(true)
  }

  const handleOpenYouTube = () => {
    window.open(watchUrl, '_blank', 'noopener,noreferrer')
  }

  if (showEmbed && isLoaded) {
    return (
      <div className={`aspect-video ${className}`}>
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full rounded-sm"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <Card className={className}>
      <CardContent className="p-0">
        <div className="aspect-video bg-gray-100 rounded-sm relative overflow-hidden group">
          {/* Thumbnail */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(${thumbnailUrl})` }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <Button
                onClick={handlePlay}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white rounded-full w-20 h-20 mb-4 shadow-lg"
              >
                <Play className="w-8 h-8 ml-1" />
              </Button>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              {description && (
                <p className="text-sm opacity-90 max-w-md">{description}</p>
              )}
            </div>
          </div>

          {/* YouTube branding */}
          <div className="absolute top-4 right-4">
            <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
              YouTube
            </div>
          </div>

          {/* Controls */}
          {showControls && (
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button
                onClick={handleOpenYouTube}
                size="sm"
                variant="secondary"
                className="bg-white bg-opacity-90 hover:bg-opacity-100"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Open in YouTube
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Component for displaying video resources
interface VideoResourceProps {
  resource: {
    id: string
    type: string
    url: string
    title: string
    description?: string
    duration?: number
    isYouTube?: boolean
    youtubeId?: string
  }
  className?: string
}

export function VideoResource({ resource, className = "" }: VideoResourceProps) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Generate signed URL for Bunny CDN videos
  useEffect(() => {
    const generateSignedUrl = async () => {
      if (!resource.url || resource.isYouTube) return

      // Check if it's a Bunny CDN URL that needs token authentication
      if (resource.url.includes('b-cdn.net')) {
        setIsLoading(true)
        setError(null)
        
        try {
          // Extract filename from URL for signed URL generation
          const fileName = resource.url.split('/').pop() || ''
          
          // Get signed URL for the video
          const response = await fetch(`/api/signed-url?file=/${fileName}`)
          const data = await response.json()

          if (response.ok) {
            setSignedUrl(data.url)
          } else {
            setError(`Error: ${data.error || 'Failed to get video access'}`)
          }
        } catch (err) {
          setError(`Error: ${err instanceof Error ? err.message : 'Failed to access video'}`)
        } finally {
          setIsLoading(false)
        }
      } else {
        // For non-Bunny CDN videos, use the URL directly
        setSignedUrl(resource.url)
      }
    }

    generateSignedUrl()
  }, [resource.url, resource.isYouTube])

  if (resource.isYouTube && resource.youtubeId) {
    return (
      <YouTubeVideo
        videoId={resource.youtubeId}
        title={resource.title}
        description={resource.description}
        className={className}
      />
    )
  }

  // Check if it's a direct video URL
  const isDirectVideo = resource.url && (
    resource.url.includes('.mp4') || 
    resource.url.includes('.webm') || 
    resource.url.includes('.ogg') ||
    resource.url.includes('b-cdn.net') ||
    resource.url.includes('youtube.com') ||
    resource.url.includes('youtu.be')
  )

  if (isDirectVideo && !resource.isYouTube) {
    if (isLoading) {
      return (
        <Card className={className}>
          <CardContent className="p-0">
            <div className="aspect-video bg-gray-100 rounded-sm flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading video...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    if (error) {
      return (
        <Card className={className}>
          <CardContent className="p-0">
            <div className="aspect-video bg-gray-100 rounded-sm flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">{resource.title}</h3>
                <p className="text-red-500 mb-4">{error}</p>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    if (!signedUrl) {
      return (
        <Card className={className}>
          <CardContent className="p-0">
            <div className="aspect-video bg-gray-100 rounded-sm flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">{resource.title}</h3>
                <p className="text-muted-foreground mb-4">Preparing video...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card className={className}>
        <CardContent className="p-0">
          <div className="aspect-video bg-black rounded-sm overflow-hidden">
            <video
              controls
              className="w-full h-full"
              controlsList="nodownload"
              disablePictureInPicture
            >
              <source src={signedUrl} type="video/mp4" />
              <source src={signedUrl} type="video/webm" />
              <source src={signedUrl} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-700 mb-2">{resource.title}</h3>
            {resource.description && (
              <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                {resource.duration && (
                  <span className="flex items-center space-x-1">
                    <Play className="w-4 h-4" />
                    <span>{Math.floor(resource.duration / 60)}:{(resource.duration % 60).toString().padStart(2, '0')}</span>
                  </span>
                )}
                <span className="flex items-center space-x-1">
                  <Download className="w-4 h-4" />
                  <span>HD Quality</span>
                </span>
              </div>
              <div className="text-xs text-green-600 font-medium">
                🔒 Secure Access
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Fallback for regular video files
  return (
    <Card className={className}>
      <CardContent className="p-0">
        <div className="aspect-video bg-gray-100 rounded-sm flex items-center justify-center">
          <div className="text-center">
            <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{resource.title}</h3>
            <p className="text-muted-foreground mb-4">Video content will be displayed here</p>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Video
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
