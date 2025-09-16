"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { RazorpayPayment } from "./RazorpayPayment";
import { PaymentProvider } from "@/lib/payments/config";

interface PaymentFlowProps {
  amount: number;
  currency: string;
  courseId: string;
  courseTitle: string;
  userCountry?: string;
  userEmail: string;
  userName: string;
}

export function PaymentFlow({
  amount,
  currency,
  courseId,
  courseTitle,
  userCountry,
  userEmail,
  userName,
}: PaymentFlowProps) {
  const [currentStep, setCurrentStep] = useState<
    "select" | "payment" | "processing"
  >("select");
  const [selectedProvider, setSelectedProvider] =
    useState<PaymentProvider | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handlePaymentMethodSelect = (provider: PaymentProvider) => {
    setSelectedProvider(provider);
  };

  const handlePaymentCreate = (data: any) => {
    setPaymentData(data);
    setCurrentStep("payment");
  };

  const handlePaymentSuccess = async (paymentResponse: any) => {
    setIsProcessing(true);
    setCurrentStep("processing");

    try {
      const response = await fetch("/api/payments/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: selectedProvider,
          paymentData: {
            ...paymentResponse,
            courseId,
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to success page or course
        router.push(`/courses/${courseId}?enrolled=true`);
      } else {
        throw new Error(result.error || "Payment verification failed");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      alert("Payment verification failed. Please contact support.");
      setCurrentStep("select");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error);
    alert(`Payment failed: ${error}`);
    setCurrentStep("select");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "select":
        return (
          <PaymentMethodSelector
            amount={amount}
            currency={currency}
            courseId={courseId}
            userCountry={userCountry}
            onPaymentMethodSelect={handlePaymentMethodSelect}
            onPaymentCreate={handlePaymentCreate}
          />
        );

      case "payment":
        if (!selectedProvider || !paymentData) return null;

        if (selectedProvider === "razorpay") {
          return (
            <RazorpayPayment
              orderId={paymentData.orderId}
              amount={amount}
              currency={currency}
              userEmail={userEmail}
              userName={userName}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          );
        }

        return null;

      case "processing":
        return (
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-medium mb-2">Processing Payment</h3>
              <p className="text-gray-600">
                Please wait while we verify your payment...
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Complete Your Purchase</h1>
        <p className="text-gray-600">
          Enroll in <strong>{courseTitle}</strong>
        </p>
      </div>

      {renderCurrentStep()}

      {currentStep === "select" && (
        <div className="mt-6 text-center">
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back to course
          </button>
        </div>
      )}
    </div>
  );
}
