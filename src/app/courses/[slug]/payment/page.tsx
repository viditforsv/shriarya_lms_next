"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Badge } from "@/design-system/components/ui/badge";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  slug: string;
  thumbnail: string;
  status?: string;
  originalPrice?: number;
  discountPercent?: number;
}

export default function CoursePaymentPage() {
  const params = useParams();
  const router = useRouter();
  const { user, profile } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  // Load Razorpay script
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );

      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(true));
        existingScript.addEventListener("error", () => resolve(false));
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Fetch course data
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

        // Calculate discount for draft (upcoming) courses - 50% off
        const isUpcoming = courseData.status === "draft";
        const originalPrice = courseData.price || 0;
        const discountPercent = isUpcoming ? 50 : 0;
        const discountedPrice = isUpcoming ? originalPrice * 0.5 : originalPrice;
        
        // Update course data with discounted price
        courseData.price = discountedPrice;
        courseData.originalPrice = originalPrice;
        courseData.discountPercent = discountPercent;

        // Check if user is already enrolled
        if (user) {
          const { data: enrollment } = await supabase
            .from("courses_enrollments")
            .select("*")
            .eq("student_id", user.id)
            .eq("course_id", courseData.id)
            .eq("is_active", true)
            .maybeSingle();

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

  const handlePayment = async () => {
    if (!course || !user) return;

    try {
      setIsProcessing(true);
      setError("");
      setStatus("Loading Razorpay...");

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay SDK");
      }

      setStatus("Creating order...");

      // Create Razorpay order (use discounted price if available)
      const finalAmount = course.discountPercent && course.discountPercent > 0 
        ? course.price 
        : course.price;
      
      const createResponse = await fetch("/api/payments/create-razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          currency: course.currency || "INR",
          courseId: course.id,
          courseName: course.title,
          discountPercent: course.discountPercent || 0,
          originalPrice: course.originalPrice || course.price,
        }),
      });

      const createData = await createResponse.json();

      if (!createResponse.ok || !createData.success) {
        // Provide better error messages
        if (createData.error?.includes("not configured")) {
          throw new Error(
            "Payment system is currently being configured. Please try again later or contact support."
          );
        }
        throw new Error(createData.error || "Failed to create order");
      }

      setStatus("Opening Razorpay checkout...");

      // Get Razorpay Key from environment
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        throw new Error("Razorpay key not configured");
      }

      // Get user details
      const userName = profile
        ? `${profile.first_name} ${profile.last_name}`
        : user.email!;
      const userEmail = user.email!;

      // Open Razorpay checkout
      const options = {
        key: razorpayKey,
        amount: course.price * 100, // Convert to paise
        currency: course.currency || "INR",
        name: "ShriArya LMS",
        description: course.title,
        order_id: createData.orderId,
        prefill: {
          name: userName,
          email: userEmail,
        },
        theme: {
          color: "#e27447",
        },
        handler: async function (response: RazorpayResponse) {
          setStatus("Verifying payment...");

          try {
            const verifyResponse = await fetch(
              "/api/payments/verify-razorpay",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                  courseId: course.id,
                }),
              }
            );

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              setStatus("✅ Payment successful! Redirecting...");
              // Redirect to course page after short delay
              setTimeout(() => {
                router.push(`/courses/${course.slug}?enrolled=true`);
              }, 1500);
            } else {
              throw new Error(
                verifyData.error || "Payment verification failed"
              );
            }
          } catch (err) {
            setError(
              err instanceof Error ? err.message : "Verification failed"
            );
            setStatus("");
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setStatus("");
            setError("Payment cancelled");
            setIsProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment error:", err);
      setError(err instanceof Error ? err.message : "Payment failed");
      setStatus("");
      setIsProcessing(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => router.push("/courses")}>
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
          <p className="text-muted-foreground mb-4">
            Please sign in to enroll in this course
          </p>
          <Button onClick={() => router.push("/auth")}>Sign In</Button>
        </div>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </Link>

          {/* Payment Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Complete Your Purchase</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Course Details */}
              <div className="bg-gray-50 rounded-sm p-6 border">
                <div className="flex items-start space-x-4">
                  {course.thumbnail && (
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      width={96}
                      height={96}
                      className="w-24 h-24 object-cover rounded-sm"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                  <div className="text-right">
                    {course.discountPercent && course.discountPercent > 0 ? (
                      <div>
                        <div className="flex items-center gap-2 justify-end mb-1">
                          <span className="text-lg line-through text-muted-foreground">
                            ₹{course.originalPrice?.toLocaleString()}
                          </span>
                          <Badge className="bg-green-600 text-white">
                            {course.discountPercent}% OFF
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          ₹{course.price?.toLocaleString()}
                        </div>
                        <div className="text-xs text-green-600 font-medium">
                          Early Bird Discount
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          ₹{course.price?.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {course.currency || "INR"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Discount Notice for Upcoming Courses */}
              {course.discountPercent && course.discountPercent > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-sm p-4">
                  <h4 className="font-semibold mb-2 text-green-900">
                    🎉 Early Bird Special
                  </h4>
                  <p className="text-sm text-green-800">
                    Enroll now and save {course.discountPercent}%! This course is currently in development and will be available soon. 
                    Early enrollments get lifetime access at a discounted price.
                  </p>
                </div>
              )}

              {/* What's Included */}
              <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
                <h4 className="font-semibold mb-3 text-blue-900">
                  What&apos;s Included
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 mr-2" />
                    Full lifetime access
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 mr-2" />
                    All course materials and resources
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 mr-2" />
                    Certificate of completion
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 mr-2" />
                    Progress tracking
                  </li>
                  {course.discountPercent && course.discountPercent > 0 && (
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      Early access when course launches
                    </li>
                  )}
                </ul>
              </div>

              {/* Status Messages */}
              {status && (
                <div className="bg-green-50 border border-green-200 rounded-sm p-4">
                  <p className="text-green-800 text-sm font-medium">{status}</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-sm p-4">
                  <p className="text-red-800 text-sm font-medium">❌ {error}</p>
                </div>
              )}

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-[#e27447] hover:bg-[#d1653a] text-white text-lg py-6 rounded-sm"
                size="lg"
              >
                {isProcessing
                  ? "Processing..."
                  : course.discountPercent && course.discountPercent > 0
                  ? `Pay ₹${course.price?.toLocaleString()} (${course.discountPercent}% OFF)`
                  : `Pay ₹${course.price?.toLocaleString()}`}
              </Button>

              {/* Security Note */}
              <p className="text-xs text-center text-muted-foreground">
                🔒 Secure payment powered by Razorpay. Your payment information
                is encrypted and secure.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
