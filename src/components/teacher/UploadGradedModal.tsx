"use client";

import { useState } from "react";
import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";
import { Label } from "@/design-system/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/design-system/components/dialog";
import { Textarea } from "@/design-system/components/textarea";
import { Upload, X } from "lucide-react";

interface Submission {
  id: string;
  assignment_id: string;
  file_name: string;
}

interface UploadGradedModalProps {
  submission: Submission;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function UploadGradedModal({
  submission,
  isOpen,
  onClose,
  onSuccess,
}: UploadGradedModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [marksObtained, setMarksObtained] = useState("");
  const [maxMarks, setMaxMarks] = useState("");
  const [comments, setComments] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!file || !marksObtained || !maxMarks) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("submissionId", submission.id);
      formData.append("marksObtained", marksObtained);
      formData.append("maxMarks", maxMarks);
      formData.append("comments", comments);

      const response = await fetch("/api/teacher/upload-graded", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload graded PDF");
      }

      // Reset form
      setFile(null);
      setMarksObtained("");
      setMaxMarks("");
      setComments("");
      onSuccess();
    } catch (err) {
      console.error("Error uploading graded PDF:", err);
      setError(err instanceof Error ? err.message : "Failed to upload");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-sm">
        <DialogHeader>
          <DialogTitle>Upload Graded Assignment</DialogTitle>
          <DialogDescription>
            Upload the marked PDF for {submission.file_name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* File Upload */}
          <div>
            <Label htmlFor="graded-file">Graded PDF File *</Label>
            <div className="mt-2">
              <input
                id="graded-file"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="graded-file">
                <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-sm border-muted-foreground/25 hover:border-[#e27447] cursor-pointer transition-colors">
                  {file ? (
                    <div className="text-center">
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Max size: 5MB
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          setFile(null);
                        }}
                        className="mt-2"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload PDF
                      </p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Marks */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="marks-obtained">Marks Obtained *</Label>
              <Input
                id="marks-obtained"
                type="number"
                value={marksObtained}
                onChange={(e) => setMarksObtained(e.target.value)}
                placeholder="e.g., 85"
                className="rounded-sm mt-2"
              />
            </div>
            <div>
              <Label htmlFor="max-marks">Max Marks *</Label>
              <Input
                id="max-marks"
                type="number"
                value={maxMarks}
                onChange={(e) => setMaxMarks(e.target.value)}
                placeholder="e.g., 100"
                className="rounded-sm mt-2"
              />
            </div>
          </div>

          {/* Comments */}
          <div>
            <Label htmlFor="comments">Teacher Comments</Label>
            <Textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Add feedback for the student..."
              rows={4}
              className="rounded-sm mt-2"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-red-800 text-sm">
              {error}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="rounded-sm">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isUploading || !file || !marksObtained || !maxMarks}
            className="bg-[#e27447] hover:bg-[#d1653a] rounded-sm"
          >
            {isUploading ? "Uploading..." : "Upload Graded"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
