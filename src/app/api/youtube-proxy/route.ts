import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const videoId = searchParams.get('videoId')
    
    if (!videoId) {
      return NextResponse.json({ error: 'Video ID required' }, { status: 400 })
    }

    // Extract video ID from YouTube URL if full URL is provided
    const extractedVideoId = extractVideoId(videoId)
    
    if (!extractedVideoId) {
      return NextResponse.json({ error: 'Invalid YouTube video ID' }, { status: 400 })
    }

    // Return video metadata and embed URL
    const videoData = {
      videoId: extractedVideoId,
      embedUrl: `https://www.youtube.com/embed/${extractedVideoId}`,
      watchUrl: `https://www.youtube.com/watch?v=${extractedVideoId}`,
      thumbnail: `https://img.youtube.com/vi/${extractedVideoId}/maxresdefault.jpg`,
      thumbnailHQ: `https://img.youtube.com/vi/${extractedVideoId}/hqdefault.jpg`,
      thumbnailMQ: `https://img.youtube.com/vi/${extractedVideoId}/mqdefault.jpg`,
      thumbnailSD: `https://img.youtube.com/vi/${extractedVideoId}/sddefault.jpg`
    }

    return NextResponse.json({ 
      success: true, 
      video: videoData 
    })

  } catch (error) {
    console.error('YouTube proxy error:', error)
    return NextResponse.json({ 
      error: 'Failed to process YouTube video' 
    }, { status: 500 })
  }
}

function extractVideoId(urlOrId: string): string | null {
  // If it's already just a video ID, return it
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
    return urlOrId
  }

  // Extract from various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/
  ]

  for (const pattern of patterns) {
    const match = urlOrId.match(pattern)
    if (match) {
      return match[1]
    }
  }

  return null
}
