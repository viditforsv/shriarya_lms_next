"use client";

import { useState, useRef } from "react";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Input } from "@/app/components-demo/ui/ui-components/input";
import { Label } from "@/app/components-demo/ui/ui-components/label";
import { Card, CardContent } from "@/app/components-demo/ui/ui-components/card";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import { Upload, X, Image as ImageIcon, ExternalLink } from "lucide-react";

interface ImageUploadProps {
  label: string;
  value: string; // CDN URL
  onChange: (url: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function ImageUpload({
  label,
  value,
  onChange,
  placeholder = "No image uploaded",
  disabled = false,
  className = "",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert("Image size must be less than 10MB");
      return;
    }

    setUploading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "question-image"); // Special type for question images
      formData.append("title", `Question Image - ${file.name}`);

      // Upload to Bunny CDN
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("supabase.auth.token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const result = await response.json();
      
      if (result.success && result.url) {
        onChange(result.url);
        console.log("✅ Image uploaded successfully:", result.url);
      } else {
        throw new Error("Upload response missing URL");
      }
    } catch (error) {
      console.error("❌ Upload error:", error);
      alert(`Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeImage = () => {
    onChange("");
  };

  const openImageInNewTab = () => {
    if (value) {
      window.open(value, "_blank");
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      
      {value ? (
        // Image Preview
        <Card className="border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <ImageIcon className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Image uploaded</p>
                  <p className="text-xs text-gray-500 truncate max-w-xs">
                    {value.split("/").pop()}
                  </p>
                  <Badge variant="outline" className="text-xs mt-1">
                    CDN URL
                  </Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={openImageInNewTab}
                  disabled={disabled}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={removeImage}
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Upload Area
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">
            {uploading ? "Uploading..." : "Click to upload or drag and drop"}
          </p>
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* Manual URL input */}
      <div className="space-y-1">
        <Label className="text-xs text-gray-500">Or enter CDN URL manually:</Label>
        <Input
          type="url"
          placeholder="https://your-cdn.com/image.png"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="text-sm"
        />
      </div>
    </div>
  );
}
