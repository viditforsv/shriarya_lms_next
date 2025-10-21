"use client";

import { useState } from "react";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Card, CardContent } from "@/app/components-demo/ui/ui-components/card";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import { ExternalLink, Download, ZoomIn } from "lucide-react";
import Image from "next/image";

interface ImageDisplayProps {
  src: string;
  alt?: string;
  caption?: string;
  className?: string;
  showControls?: boolean;
  maxWidth?: number;
  maxHeight?: number;
}

export default function ImageDisplay({
  src,
  alt = "Question image",
  caption,
  className = "",
  showControls = true,
  maxWidth = 600,
  maxHeight = 400,
}: ImageDisplayProps) {
  const [imageError, setImageError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!src || imageError) {
    return (
      <Card className={`border border-gray-200 ${className}`}>
        <CardContent className="p-4 text-center">
          <p className="text-sm text-gray-500">No image available</p>
        </CardContent>
      </Card>
    );
  }

  const openInNewTab = () => {
    window.open(src, "_blank");
  };

  const downloadImage = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = src.split("/").pop() || "image";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <Card className={`border border-gray-200 ${className}`}>
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Image */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-sm">
                <Image
                  src={src}
                  alt={alt}
                  width={maxWidth}
                  height={maxHeight}
                  className="w-full h-auto object-contain"
                  onError={() => setImageError(true)}
                  style={{
                    maxWidth: `${maxWidth}px`,
                    maxHeight: `${maxHeight}px`,
                  }}
                />

                {/* Overlay controls */}
                {showControls && (
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={toggleFullscreen}
                        className="bg-white/90 hover:bg-white"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={openInNewTab}
                        className="bg-white/90 hover:bg-white"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={downloadImage}
                        className="bg-white/90 hover:bg-white"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Caption and metadata */}
            <div className="space-y-2">
              {caption && (
                <p className="text-sm text-gray-600 italic">{caption}</p>
              )}

              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  CDN Image
                </Badge>

                {showControls && (
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={openInNewTab}
                      className="text-xs h-6 px-2"
                    >
                      Open
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={downloadImage}
                      className="text-xs h-6 px-2"
                    >
                      Download
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={toggleFullscreen}
        >
          <div className="relative max-w-7xl max-h-full">
            <Button
              size="sm"
              variant="secondary"
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white"
            >
              ✕
            </Button>
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
