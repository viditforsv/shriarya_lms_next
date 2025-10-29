"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, RefreshCw } from "lucide-react";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Card, CardContent } from "@/app/components-demo/ui/ui-components/card";

interface YouTubeVideoProps {
  videoId: string;
  title: string;
  description?: string;
  className?: string;
  showControls?: boolean;
  thumbnail?: string;
  startTime?: number; // Start time in seconds for resume playback
}

export function YouTubeVideo({
  videoId,
  title,
  description,
  className = "",
  showControls = true,
  thumbnail,
  startTime,
}: YouTubeVideoProps) {
  const [showEmbed, setShowEmbed] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [currentThumbnail, setCurrentThumbnail] = useState<string>("");

  // Build embed URL with improved parameters
  const embedParams = new URLSearchParams({
    autoplay: "1",
    rel: "0", // Don't show related videos
    modestbranding: "1",
    iv_load_policy: "3", // Hide annotations
    cc_load_policy: "1", // Show captions by default if available
    enablejsapi: "1", // Enable JavaScript API for tracking
    origin: typeof window !== "undefined" ? window.location.origin : "",
  });

  // Add start time if provided (for resume playback)
  if (startTime && startTime > 0) {
    embedParams.set("start", startTime.toString());
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?${embedParams.toString()}`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}${
    startTime ? `&t=${startTime}s` : ""
  }`;

  useEffect(() => {
    // Try the first thumbnail option
    const options = [
      thumbnail,
      `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    ].filter(Boolean) as string[];

    if (options.length > 0) {
      setCurrentThumbnail(options[0]);
      setThumbnailError(false);
      setThumbnailLoaded(false);
    }
  }, [videoId, thumbnail]);

  const handlePlay = () => {
    setShowEmbed(true);
  };

  const handleOpenYouTube = () => {
    window.open(watchUrl, "_blank", "noopener,noreferrer");
  };

  const handleThumbnailError = () => {
    const allOptions = [
      thumbnail,
      `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    ].filter(Boolean) as string[];

    const currentIndex = allOptions.indexOf(currentThumbnail);
    if (currentIndex < allOptions.length - 1) {
      // Try next fallback thumbnail
      setCurrentThumbnail(allOptions[currentIndex + 1]);
      setThumbnailError(false);
    } else {
      // All thumbnails failed
      setThumbnailError(true);
    }
  };

  // Show embedded video if user clicked play
  if (showEmbed) {
    return (
      <div className={`flex justify-center ${className}`}>
        <div className="aspect-video w-full max-w-[80%]">
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full rounded-sm"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  // Show thumbnail with play button overlay and preview info
  return (
    <Card className={className}>
      <CardContent className="p-0">
        <div className="space-y-0 flex justify-center">
          {/* Video Preview Area */}
          <div className="aspect-video relative rounded-sm overflow-hidden group bg-gradient-to-br from-gray-900 to-gray-800 w-full max-w-[80%]">
            {/* Thumbnail Image with loading state */}
            {!thumbnailError && currentThumbnail && (
              <>
                {!thumbnailLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                      <p className="text-white/70 text-sm">
                        Loading video preview...
                      </p>
                    </div>
                  </div>
                )}
                <img
                  src={currentThumbnail}
                  alt={`${title} thumbnail`}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    thumbnailLoaded ? "opacity-100" : "opacity-0"
                  } ${showEmbed ? "" : "group-hover:scale-105"}`}
                  onLoad={() => setThumbnailLoaded(true)}
                  onError={handleThumbnailError}
                />
              </>
            )}

            {/* Fallback when thumbnails fail */}
            {thumbnailError && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#e27447] to-[#d1653a] flex flex-col items-center justify-center p-6">
                <div className="text-center">
                  <Play className="w-20 h-20 text-white mx-auto mb-4 opacity-80" />
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {title}
                  </h3>
                  {description && (
                    <p className="text-white/90 text-sm max-w-md line-clamp-3">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Play Button Overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity cursor-pointer"
              onClick={handlePlay}
            >
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlay();
                }}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white rounded-full w-20 h-20 shadow-2xl hover:scale-110 transition-transform duration-200 z-10"
              >
                <Play className="w-10 h-10 ml-1" />
              </Button>
            </div>

            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h3 className="text-white font-bold text-lg mb-2 drop-shadow-lg">
                {title}
              </h3>
              {description && (
                <p className="text-white/95 text-sm line-clamp-2 drop-shadow-md mb-3">
                  {description}
                </p>
              )}
              <div className="flex items-center gap-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlay();
                  }}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white rounded-sm"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play Video
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenYouTube();
                  }}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-sm backdrop-blur-sm"
                >
                  Watch on YouTube
                </Button>
              </div>
            </div>

            {/* YouTube Badge */}
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-red-600 text-white px-3 py-1 rounded-sm text-xs font-semibold shadow-lg">
                YouTube
              </div>
            </div>

            {/* Resume Indicator */}
            {startTime && startTime > 0 && (
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-[#e27447] text-white px-3 py-1 rounded-sm text-xs font-medium shadow-lg">
                  Resume from {Math.floor(startTime / 60)}:
                  {String(Math.floor(startTime % 60)).padStart(2, "0")}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Component for displaying video resources
interface VideoResourceProps {
  resource: {
    id: string;
    type: string;
    url: string;
    title: string;
    description?: string;
    duration?: number;
    isYouTube?: boolean;
    youtubeId?: string;
    thumbnail?: string;
  };
  className?: string;
  lessonId?: string;
  courseSlug?: string;
  onProgressUpdate?: (progress: {
    timeWatched: number;
    percentage: number;
  }) => void;
}

export function VideoResource({
  resource,
  className = "",
  lessonId,
  courseSlug,
  onProgressUpdate,
}: VideoResourceProps) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null
  );
  const [lastPosition, setLastPosition] = useState<number>(0);
  const [hasLoadedPosition, setHasLoadedPosition] = useState(false);
  // Only show preview for Bunny CDN videos that have a thumbnail
  const [showPreview, setShowPreview] = useState(
    () => resource.url?.includes("b-cdn.net") && !!resource.thumbnail
  );
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  // Load saved video position from localStorage
  useEffect(() => {
    if (!lessonId || resource.isYouTube) return;

    const savedPosition = localStorage.getItem(`video-pos-${lessonId}`);
    if (savedPosition) {
      const position = parseFloat(savedPosition);
      if (!isNaN(position) && position > 0) {
        setLastPosition(position);
      }
    }
  }, [lessonId, resource.isYouTube]);

  // Save video position to localStorage
  const saveVideoPosition = useCallback(
    (currentTime: number, duration: number) => {
      if (!lessonId || !duration || duration <= 0) return;

      const percentage = (currentTime / duration) * 100;
      localStorage.setItem(`video-pos-${lessonId}`, currentTime.toString());
      localStorage.setItem(`video-percent-${lessonId}`, percentage.toString());

      // Notify parent component of progress
      if (onProgressUpdate) {
        onProgressUpdate({
          timeWatched: currentTime,
          percentage: percentage,
        });
      }
    },
    [lessonId, onProgressUpdate]
  );

  // Generate signed URL for Bunny CDN videos
  const generateSignedUrl = useCallback(async () => {
    if (!resource.url || resource.isYouTube) return;

    // Check if it's a Bunny CDN URL that needs token authentication
    if (resource.url.includes("b-cdn.net")) {
      setIsLoading(true);
      setError(null);

      try {
        const fileName = resource.url.split("/").pop() || "";
        const response = await fetch(`/api/signed-url?file=/${fileName}`);
        const data = await response.json();

        if (response.ok) {
          setSignedUrl(data.url);
        } else {
          setError(
            data.error || "Failed to get video access. Please try again later."
          );
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? `Network error: ${err.message}`
            : "Failed to access video. Please check your connection."
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setSignedUrl(resource.url);
    }
  }, [resource.url, resource.isYouTube]);

  // Retry handler for error states
  const handleRetry = useCallback(() => {
    setError(null);
    setSignedUrl(null);
    setIsLoading(false);
    generateSignedUrl();
  }, [generateSignedUrl]);

  // Video event handlers - must be defined at top level (Rules of Hooks)
  const handleVideoRef = useCallback(
    (video: HTMLVideoElement | null) => {
      if (!video) return;
      setVideoElement(video);

      // Resume from last position if available
      if (lastPosition > 0 && !hasLoadedPosition) {
        video.currentTime = lastPosition;
        setHasLoadedPosition(true);
      }
    },
    [lastPosition, hasLoadedPosition]
  );

  const handleTimeUpdate = useCallback(() => {
    if (!videoElement) return;
    const currentTime = videoElement.currentTime;
    const duration = videoElement.duration;

    if (duration && currentTime > 0) {
      // Save position every 5 seconds
      if (Math.floor(currentTime) % 5 === 0) {
        saveVideoPosition(currentTime, duration);
      }
    }
  }, [videoElement, saveVideoPosition]);

  const handleVideoEnded = useCallback(() => {
    if (!videoElement || !lessonId) return;
    // Clear saved position when video ends
    localStorage.removeItem(`video-pos-${lessonId}`);
    localStorage.removeItem(`video-percent-${lessonId}`);
    saveVideoPosition(videoElement.duration, videoElement.duration);
  }, [videoElement, lessonId, saveVideoPosition]);

  // Handle YouTube videos with improved embed options
  if (resource.isYouTube && resource.youtubeId) {
    return (
      <YouTubeVideo
        videoId={resource.youtubeId}
        title={resource.title}
        description={resource.description}
        className={className}
        thumbnail={resource.thumbnail}
        startTime={
          lastPosition > 0 && lastPosition < 3600
            ? Math.floor(lastPosition)
            : undefined
        }
      />
    );
  }

  // Handle direct video files (Bunny CDN, etc.)
  if (resource.url && !resource.isYouTube) {
    // Show preview if we have a thumbnail and haven't started loading
    const isBunnyCDN = resource.url.includes("b-cdn.net");
    if (showPreview && resource.thumbnail && isBunnyCDN && !signedUrl) {
      return (
        <Card className={className}>
          <CardContent className="p-0">
            <div className="space-y-0 flex justify-center">
              {/* Video Preview Area */}
              <div className="aspect-video relative rounded-sm overflow-hidden group bg-gradient-to-br from-gray-900 to-gray-800 w-full max-w-[80%]">
                {/* Thumbnail Image */}
                {!thumbnailError && resource.thumbnail && (
                  <>
                    {!thumbnailLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                          <p className="text-white/70 text-sm">
                            Loading preview...
                          </p>
                        </div>
                      </div>
                    )}
                    <img
                      src={resource.thumbnail}
                      alt={`${resource.title} thumbnail`}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        thumbnailLoaded ? "opacity-100" : "opacity-0"
                      } group-hover:scale-105`}
                      onLoad={() => setThumbnailLoaded(true)}
                      onError={() => setThumbnailError(true)}
                    />
                  </>
                )}

                {/* Fallback when thumbnail fails */}
                {thumbnailError && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#e27447] to-[#d1653a] flex flex-col items-center justify-center p-6">
                    <div className="text-center">
                      <Play className="w-20 h-20 text-white mx-auto mb-4 opacity-80" />
                      <h3 className="text-white font-semibold text-lg mb-2">
                        {resource.title}
                      </h3>
                      {resource.description && (
                        <p className="text-white/90 text-sm max-w-md line-clamp-3">
                          {resource.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Play Button Overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-opacity cursor-pointer"
                  onClick={() => {
                    setShowPreview(false);
                    generateSignedUrl();
                  }}
                >
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPreview(false);
                      generateSignedUrl();
                    }}
                    size="lg"
                    className="bg-[#e27447] hover:bg-[#d1653a] text-white rounded-full w-20 h-20 shadow-2xl hover:scale-110 transition-transform duration-200 z-10"
                  >
                    <Play className="w-10 h-10 ml-1" />
                  </Button>
                </div>

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-white font-bold text-lg mb-2 drop-shadow-lg">
                    {resource.title}
                  </h3>
                  {resource.description && (
                    <p className="text-white/95 text-sm line-clamp-2 drop-shadow-md mb-3">
                      {resource.description}
                    </p>
                  )}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPreview(false);
                      generateSignedUrl();
                    }}
                    size="sm"
                    className="bg-[#e27447] hover:bg-[#d1653a] text-white rounded-sm"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play Video
                  </Button>
                </div>

                {/* Resume Indicator */}
                {lastPosition > 0 && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-[#e27447] text-white px-3 py-1 rounded-sm text-xs font-medium shadow-lg">
                      Resume from {Math.floor(lastPosition / 60)}:
                      {String(Math.floor(lastPosition % 60)).padStart(2, "0")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Generate signed URL when preview is dismissed or for non-Bunny CDN videos (or videos without thumbnails)
    if (
      !signedUrl &&
      !isLoading &&
      !error &&
      (!showPreview || !resource.thumbnail || !isBunnyCDN)
    ) {
      generateSignedUrl();
    }

    if (isLoading) {
      return (
        <Card className={className}>
          <CardContent className="p-0">
            <div className="flex justify-center">
              <div className="aspect-video bg-gray-100 rounded-sm flex items-center justify-center w-full max-w-[80%]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading video...</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (error || !signedUrl) {
      return (
        <Card className={className}>
          <CardContent className="p-0">
            <div className="flex justify-center">
              <div className="aspect-video bg-gray-100 rounded-sm flex items-center justify-center w-full max-w-[80%]">
                <div className="text-center">
                  <Play className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {resource.title}
                  </h3>
                  {error && (
                    <p className="text-red-600 dark:text-red-400 mb-4 max-w-md text-sm">
                      {error}
                    </p>
                  )}
                  <Button
                    variant="outline"
                    onClick={handleRetry}
                    className="rounded-sm"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className={className}>
        <CardContent className="p-0">
          <div className="flex justify-center">
            <div className="aspect-video bg-black rounded-sm overflow-hidden relative w-full max-w-[80%]">
              <video
                ref={handleVideoRef}
                controls
                className="w-full h-full"
                controlsList="nodownload noplaybackrate"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                onLoadedMetadata={(e) => {
                  const video = e.currentTarget;
                  if (lastPosition > 0 && !hasLoadedPosition) {
                    video.currentTime = lastPosition;
                    setHasLoadedPosition(true);
                  }
                }}
              >
                <source src={signedUrl || undefined} type="video/mp4" />
                <source src={signedUrl || undefined} type="video/webm" />
                <source src={signedUrl || undefined} type="video/ogg" />
                Your browser does not support the video tag.
              </video>

              {/* Resume indicator */}
              {lastPosition > 0 && hasLoadedPosition && (
                <div className="absolute top-2 left-2 bg-[#e27447] text-white px-3 py-1 rounded-sm text-xs font-medium">
                  Resumed from {Math.floor(lastPosition / 60)}:
                  {String(Math.floor(lastPosition % 60)).padStart(2, "0")}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Fallback
  return (
    <Card className={className}>
      <CardContent className="p-0">
        <div className="flex justify-center">
          <div className="aspect-video bg-gray-100 rounded-sm flex items-center justify-center w-full max-w-[80%]">
            <div className="text-center">
              <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {resource.title}
              </h3>
              <p className="text-muted-foreground">Video content unavailable</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
