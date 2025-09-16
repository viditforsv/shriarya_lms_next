"use client";

import { useState, useRef } from "react";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Input } from "@/app/components-demo/ui/ui-components/input";
import { Label } from "@/app/components-demo/ui/ui-components/label";
import { Upload, X, Image as ImageIcon, Check } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

interface CourseThumbnailUploadProps {
  courseId: string;
  currentThumbnail?: string;
  onThumbnailUpdate?: (thumbnailUrl: string) => void;
}

export function CourseThumbnailUpload({
  courseId,
  currentThumbnail,
  onThumbnailUpdate,
}: CourseThumbnailUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedThumbnail, setUploadedThumbnail] = useState<string | null>(
    currentThumbnail || null
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    await uploadThumbnail(file);
  };

  const uploadThumbnail = async (file: File) => {
    try {
      setIsUploading(true);
      setError(null);
      setSuccess(false);

      // Get session token
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("No active session");
      }

      // Create form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("courseId", courseId);
      formData.append("title", `Course thumbnail for ${courseId}`);

      // Upload to Bunny CDN
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const result = await response.json();
      const thumbnailUrl = result.url;

      // Update course thumbnail in database
      const { error: updateError } = await supabase
        .from("courses")
        .update({ thumbnail: thumbnailUrl })
        .eq("id", courseId);

      if (updateError) {
        throw new Error("Failed to update course thumbnail");
      }

      setUploadedThumbnail(thumbnailUrl);
      setSuccess(true);
      onThumbnailUpdate?.(thumbnailUrl);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const removeThumbnail = async () => {
    try {
      setError(null);

      // Update course to remove thumbnail
      const { error: updateError } = await supabase
        .from("courses")
        .update({ thumbnail: null })
        .eq("id", courseId);

      if (updateError) {
        throw new Error("Failed to remove thumbnail");
      }

      setUploadedThumbnail(null);
      onThumbnailUpdate?.("");
    } catch (error) {
      console.error("Remove error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to remove thumbnail"
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Course Thumbnail
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Thumbnail Display */}
        {uploadedThumbnail && (
          <div className="relative">
            <div className="w-full h-48 rounded-lg overflow-hidden border">
              <Image
                src={uploadedThumbnail}
                alt="Course thumbnail"
                width={400}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={removeThumbnail}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Upload Section */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="thumbnail-upload">Upload New Thumbnail</Label>
            <Input
              id="thumbnail-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              ref={fileInputRef}
              disabled={isUploading}
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Recommended size: 400x300px. Max file size: 5MB
            </p>
          </div>

          {/* Upload Button */}
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Choose Thumbnail
              </>
            )}
          </Button>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <p className="text-green-600 text-sm">
                Thumbnail updated successfully!
              </p>
            </div>
          </div>
        )}

        {/* Default Thumbnails */}
        <div className="pt-4 border-t">
          <Label className="text-sm font-medium">Quick Options</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { name: "Mathematics", url: "/images/courses/math-default.jpg" },
              { name: "Science", url: "/images/courses/science-default.jpg" },
              { name: "CBSE", url: "/images/courses/cbse-default.jpg" },
              { name: "IBDP", url: "/images/courses/ibdp-default.jpg" },
            ].map((option) => (
              <Button
                key={option.name}
                variant="outline"
                size="sm"
                onClick={() => {
                  // For now, just show the option - you can implement default thumbnail selection
                  console.log(`Selected default thumbnail: ${option.name}`);
                }}
                className="text-xs"
              >
                {option.name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
