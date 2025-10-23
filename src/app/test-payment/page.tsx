"use client";

import { useState } from "react";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function TestPaymentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Test payment data
  const testAmount = 10; // ₹10 - LIVE MODE TEST
  const testCourseId = "test-course-123";
  const testCourseName = "Test Course - IBDP Mathematics AA HL";

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check if already loaded
      if (window.Razorpay) {
        console.log("✅ Razorpay SDK already loaded");
        resolve(true);
        return;
      }

      // Check if script tag already exists
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );

      if (existingScript) {
        console.log("⏳ Razorpay SDK script tag exists, waiting...");
        existingScript.addEventListener("load", () => {
          console.log("✅ Razorpay SDK loaded from existing script");
          resolve(true);
        });
        existingScript.addEventListener("error", () => {
          console.error("❌ Razorpay SDK failed to load from existing script");
          resolve(false);
        });
        return;
      }

      console.log("📥 Loading Razorpay SDK...");
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => {
        console.log("✅ Razorpay SDK loaded successfully");
        resolve(true);
      };

      script.onerror = (error) => {
        console.error("❌ Razorpay SDK loading failed:", error);
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setError("");
      setStatus("Loading Razorpay...");

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay SDK");
      }

      setStatus("Creating order...");

      // Create Razorpay order
      const createResponse = await fetch("/api/payments/create-razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: testAmount,
          currency: "INR",
          courseId: testCourseId,
          courseName: testCourseName,
        }),
      });

      const createData = await createResponse.json();

      if (!createResponse.ok || !createData.success) {
        throw new Error(createData.error || "Failed to create order");
      }

      setStatus("Opening Razorpay checkout...");

      // Get Razorpay Key from environment
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        throw new Error("Razorpay key not configured");
      }

      // Open Razorpay checkout
      const options = {
        key: razorpayKey,
        amount: testAmount * 100, // Convert to paise
        currency: "INR",
        name: "ShriArya LMS",
        description: testCourseName,
        order_id: createData.orderId,
        prefill: {
          name: "Test User",
          email: "test@example.com",
        },
        theme: {
          color: "#e27447",
        },
        handler: async function (response: any) {
          setStatus("Verifying payment...");

          // Verify payment
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
                  courseId: testCourseId,
                }),
              }
            );

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              setStatus("✅ Payment successful!");
              alert(
                "Payment successful! Payment ID: " +
                  response.razorpay_payment_id
              );
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
          } finally {
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setStatus("");
            setError("Payment cancelled by user");
            setIsLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment error:", err);
      setError(err instanceof Error ? err.message : "Payment failed");
      setStatus("");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Razorpay Payment Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Payment Details */}
            <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
              <h3 className="font-semibold mb-3 text-blue-900">
                Test Payment Details
              </h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Amount:</dt>
                  <dd className="font-medium">₹{testAmount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Currency:</dt>
                  <dd className="font-medium">INR</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Course:</dt>
                  <dd className="font-medium">{testCourseName}</dd>
                </div>
              </dl>
            </div>

            {/* Live Mode Warning */}
            <div className="bg-red-50 border-2 border-red-300 rounded-sm p-4">
              <h3 className="font-semibold mb-2 text-red-900">
                🔴 LIVE MODE - REAL MONEY
              </h3>
              <p className="text-sm text-red-800 mb-2 font-medium">
                This is a LIVE payment. Use your real card - ₹{testAmount} will
                be charged.
              </p>
              <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                <li>Real card will be charged</li>
                <li>Money will be deducted from your account</li>
                <li>Payment will appear in your Razorpay dashboard</li>
              </ul>
            </div>

            {/* Status Messages */}
            {status && (
              <div className="bg-green-50 border border-green-200 rounded-sm p-4">
                <p className="text-green-800 text-sm">{status}</p>
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
              disabled={isLoading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              size="lg"
            >
              {isLoading ? "Processing..." : "Start Test Payment"}
            </Button>

            <div className="text-center">
              <a href="/" className="text-sm text-gray-500 hover:text-gray-700">
                ← Back to Home
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
