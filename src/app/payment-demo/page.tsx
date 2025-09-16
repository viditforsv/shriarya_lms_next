"use client";

import { useState } from "react";
import { PaymentFlow } from "@/components/payments/PaymentFlow";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";

export default function PaymentDemoPage() {
  const [showPayment, setShowPayment] = useState(false);

  if (showPayment) {
    return (
      <div className="min-h-screen bg-background p-8">
        <PaymentFlow
          amount={100}
          currency="INR"
          courseId="demo-course-123"
          courseTitle="Demo Course - Payment Integration"
          userCountry="IN"
          userEmail="demo@example.com"
          userName="Demo User"
        />
        <div className="max-w-2xl mx-auto mt-6 text-center">
          <Button
            onClick={() => setShowPayment(false)}
            variant="outline"
            className="mr-4"
          >
            ← Back to Demo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Payment System Demo</h1>
          <p className="text-gray-600 mb-6">
            This demonstrates the Razorpay payment integration for course
            enrollment.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Demo Course</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">
                This is a demo course to test the payment integration. Click the
                button below to start the payment process.
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">₹100</p>
                  <p className="text-sm text-gray-500">One-time payment</p>
                </div>
                <Button
                  onClick={() => setShowPayment(true)}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Enroll Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Test Information</h3>
          <div className="text-blue-700 text-sm space-y-1">
            <p>
              <strong>Test Card:</strong> 4111 1111 1111 1111
            </p>
            <p>
              <strong>Test UPI:</strong> success@razorpay
            </p>
            <p>
              <strong>Expiry:</strong> Any future date
            </p>
            <p>
              <strong>CVV:</strong> Any 3 digits
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
