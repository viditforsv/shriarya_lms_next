"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface RazorpayPaymentProps {
  orderId: string;
  amount: number;
  currency: string;
  userEmail: string;
  userName: string;
  onSuccess: (paymentData: any) => void;
  onError: (error: string) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function RazorpayPayment({
  orderId,
  amount,
  currency,
  userEmail,
  userName,
  onSuccess,
  onError,
}: RazorpayPaymentProps) {
  const router = useRouter();

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const openRazorpay = async () => {
      const isLoaded = await loadRazorpayScript();

      if (!isLoaded) {
        onError("Failed to load Razorpay script");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100, // Convert to paise
        currency: currency,
        name: "ShriArya LMS",
        description: "Course Enrollment",
        order_id: orderId,
        prefill: {
          name: userName,
          email: userEmail,
        },
        theme: {
          color: "#e27447", // Your brand color
        },
        handler: function (response: any) {
          // Payment successful
          onSuccess({
            razorpayOrderId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            courseId: "", // This should be passed from parent
          });
        },
        modal: {
          ondismiss: function () {
            onError("Payment cancelled by user");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };

    openRazorpay();
  }, [orderId, amount, currency, userEmail, userName, onSuccess, onError]);

  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Opening Razorpay checkout...</p>
      </div>
    </div>
  );
}
