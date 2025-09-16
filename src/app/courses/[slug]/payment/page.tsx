"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PaymentFlow } from "@/components/payments/PaymentFlow";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  slug: string;
}

export default function CoursePaymentPage() {
  const params = useParams();
  const router = useRouter();
  const { user, profile } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const supabase = createClient();

        // Get course by slug
        const { data: courseData, error: courseError } = await supabase
          .from("courses")
          .select("*")
          .eq("slug", params.slug)
          .single();

        if (courseError || !courseData) {
          setError("Course not found");
          return;
        }

        // Check if user is already enrolled
        if (user) {
          const { data: enrollment } = await supabase
            .from("enrollments")
            .select("*")
            .eq("student_id", user.id)
            .eq("course_id", courseData.id)
            .eq("is_active", true)
            .single();

          if (enrollment) {
            // User is already enrolled, redirect to course
            router.push(`/courses/${courseData.slug}`);
            return;
          }
        }

        setCourse(courseData);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.slug) {
      fetchCourse();
    }
  }, [params.slug, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-muted-foreground mb-4">
            {error || "Course not found"}
          </p>
          <button
            onClick={() => router.push("/courses")}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
          <p className="text-muted-foreground mb-4">
            Please sign in to enroll in this course
          </p>
          <button
            onClick={() => router.push("/auth")}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PaymentFlow
        amount={course.price}
        currency={course.currency || "INR"}
        courseId={course.id}
        courseTitle={course.title}
        userCountry={profile?.country}
        userEmail={user.email!}
        userName={
          profile ? `${profile.first_name} ${profile.last_name}` : user.email!
        }
      />
    </div>
  );
}
