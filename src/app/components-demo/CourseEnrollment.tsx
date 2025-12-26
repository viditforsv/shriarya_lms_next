"use client";

import { Button } from "@/design-system/components/ui/button";
import { Badge } from "@/design-system/components/ui/badge";
import {
  useCourseEnrollment,
  useCourseAccess,
} from "@/hooks/useCourseEnrollment";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, CheckCircle, AlertCircle } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description?: string;
}

interface CourseEnrollmentProps {
  course: Course;
  onEnrollmentSuccess?: () => void;
}

export function CourseEnrollment({
  course,
  onEnrollmentSuccess,
}: CourseEnrollmentProps) {
  const { user } = useAuth();
  const { enroll, loading, error } = useCourseEnrollment();

  const handleEnroll = async () => {
    if (!user) {
      // Redirect to login
      window.location.href = "/auth";
      return;
    }

    try {
      const enrollment = await enroll(course.id);
      if (enrollment) {
        // Show success message
        alert("Successfully enrolled! You can now access the course.");
        onEnrollmentSuccess?.();
      }
    } catch (err) {
      console.error("Enrollment error:", err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Course Info */}
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-[#feefea] to-[#fffefd] rounded-sm flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-[#e27447]" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#1e293b] mb-2">
            {course.title}
          </h3>
          {course.description && (
            <p className="text-sm text-muted-foreground mb-3">
              {course.description}
            </p>
          )}
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-500 text-white">Free</Badge>
            <span className="text-sm text-muted-foreground">
              No payment required
            </span>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-sm">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Enrollment Button */}
      <div className="flex items-center justify-between pt-4 border-t border-[#feefea]">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm text-muted-foreground">
            {user ? "Click to enroll immediately" : "Sign in to enroll"}
          </span>
        </div>
        <Button
          onClick={handleEnroll}
          disabled={loading === course.id}
          className="bg-primary hover:bg-primary/90"
        >
          {loading === course.id
            ? "Enrolling..."
            : user
            ? "Enroll Now"
            : "Sign In to Enroll"}
        </Button>
      </div>
    </div>
  );
}

interface CourseAccessProps {
  courseId: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function CourseAccess({
  courseId,
  children,
  fallback,
}: CourseAccessProps) {
  const { hasAccess, loading } = useCourseAccess(courseId);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e27447]"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      fallback || (
        <div className="text-center py-8">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#1e293b] mb-2">
            Course Access Required
          </h3>
          <p className="text-muted-foreground mb-4">
            You need to enroll in this course to access its content.
          </p>
          <Button className="bg-primary hover:bg-primary/90">
            Enroll Now
          </Button>
        </div>
      )
    );
  }

  return <>{children}</>;
}
