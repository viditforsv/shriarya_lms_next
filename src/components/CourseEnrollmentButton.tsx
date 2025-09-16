"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { formatAmount } from "@/lib/payments/config";

interface CourseEnrollmentButtonProps {
  courseId: string;
  courseSlug: string;
  price: number;
  currency: string;
  isFree?: boolean;
}

export function CourseEnrollmentButton({
  courseId,
  courseSlug,
  price,
  currency,
  isFree = false,
}: CourseEnrollmentButtonProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleEnrollment = async () => {
    if (!user) {
      router.push("/auth");
      return;
    }

    if (isFree) {
      // Handle free course enrollment
      setIsEnrolling(true);
      try {
        const supabase = createClient();

        const { error } = await supabase.from("enrollments").insert({
          student_id: user.id,
          course_id: courseId,
          is_active: true,
          enrolled_at: new Date().toISOString(),
        });

        if (error) {
          console.error("Enrollment error:", error);
          alert("Failed to enroll. Please try again.");
          return;
        }

        // Redirect to course
        router.push(`/courses/${courseSlug}`);
      } catch (error) {
        console.error("Enrollment error:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setIsEnrolling(false);
      }
    } else {
      // Redirect to payment page for paid courses
      router.push(`/courses/${courseSlug}/payment`);
    }
  };

  if (isFree) {
    return (
      <Button
        onClick={handleEnrollment}
        disabled={isEnrolling}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        {isEnrolling ? "Enrolling..." : "Enroll for Free"}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleEnrollment}
      className="w-full bg-orange-600 hover:bg-orange-700"
    >
      Enroll Now - {formatAmount(price, currency)}
    </Button>
  );
}
