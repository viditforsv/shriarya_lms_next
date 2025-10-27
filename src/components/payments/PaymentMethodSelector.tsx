"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import {
  PaymentMethod,
  PaymentProvider,
  formatAmount,
} from "@/lib/payments/config";
import { PaymentService } from "@/lib/payments";

interface PaymentMethodSelectorProps {
  amount: number;
  currency: string;
  courseId: string;
  userCountry?: string;
  onPaymentMethodSelect: (provider: PaymentProvider) => void;
  onPaymentCreate: (paymentData: any) => void;
}

export function PaymentMethodSelector({
  amount,
  currency,
  courseId,
  userCountry,
  onPaymentMethodSelect,
  onPaymentCreate,
}: PaymentMethodSelectorProps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [recommendedProvider, setRecommendedProvider] =
    useState<PaymentProvider>("razorpay");
  const [selectedProvider, setSelectedProvider] =
    useState<PaymentProvider | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get available payment methods
    const methods = PaymentService.getPaymentMethods(userCountry, currency);
    const recommended = PaymentService.getRecommendedProvider(
      userCountry,
      currency
    );

    setPaymentMethods(methods);
    setRecommendedProvider(recommended);
    setSelectedProvider(recommended);
  }, [userCountry, currency]);

  const handlePaymentMethodSelect = (provider: PaymentProvider) => {
    setSelectedProvider(provider);
    onPaymentMethodSelect(provider);
  };

  const testConnection = async () => {
    try {
      console.log("Testing Razorpay connection...");
      const response = await fetch("/api/test-razorpay", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Razorpay test response:", data);
      
      if (data.configured) {
        alert("✅ Razorpay is configured and working!");
      } else {
        alert("⚠️ Razorpay credentials are missing. Please check environment variables.");
      }
    } catch (error) {
      console.error("Connection test failed:", error);
      alert(
        `❌ Connection test failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const handleCreatePayment = async () => {
    if (!selectedProvider) return;

    setIsLoading(true);
    try {
      const requestData = {
        amount,
        currency,
        courseId,
        provider: selectedProvider,
        userCountry: userCountry || null,
      };

      console.log("🚀 Creating payment with data:", requestData);
      console.log("📝 Request data types:", {
        amount: typeof amount,
        currency: typeof currency,
        courseId: typeof courseId,
        provider: typeof selectedProvider,
        userCountry: typeof userCountry,
      });

      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const paymentData = await response.json();
      console.log("Payment API response:", paymentData);

      if (paymentData.success) {
        console.log("Payment created successfully, calling onPaymentCreate");
        onPaymentCreate(paymentData);
      } else {
        console.error("Payment creation failed:", paymentData.error);
        alert("Payment creation failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment creation error:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : "No stack trace",
        error: error,
      });
      alert(
        `An error occurred: ${
          error instanceof Error ? error.message : "Unknown error"
        }. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Select Payment Method</CardTitle>
          <CardDescription>
            Choose your preferred payment method for{" "}
            {formatAmount(amount, currency)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.length === 1 ? (
            // Single payment method - show directly
            <div className="p-4 border border-orange-500 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{paymentMethods[0].icon}</span>
                <div>
                  <h3 className="font-medium">{paymentMethods[0].name}</h3>
                  <p className="text-sm text-gray-600">
                    {paymentMethods[0].description}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Multiple payment methods - show selection
            paymentMethods.map((method) => (
              <div
                key={method.provider}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedProvider === method.provider
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handlePaymentMethodSelect(method.provider)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <h3 className="font-medium">{method.name}</h3>
                      <p className="text-sm text-gray-600">
                        {method.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {method.provider === recommendedProvider && (
                      <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                        Recommended
                      </span>
                    )}
                    <input
                      type="radio"
                      checked={selectedProvider === method.provider}
                      onChange={() =>
                        handlePaymentMethodSelect(method.provider)
                      }
                      className="text-orange-600"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          onClick={testConnection}
          variant="outline"
          className="border-gray-300"
        >
          Test Razorpay
        </Button>
        <Button
          onClick={handleCreatePayment}
          disabled={!selectedProvider || isLoading}
          className="bg-orange-600 hover:bg-orange-700"
        >
          {isLoading
            ? "Processing..."
            : `Pay ${formatAmount(amount, currency)}`}
        </Button>
      </div>
    </div>
  );
}
