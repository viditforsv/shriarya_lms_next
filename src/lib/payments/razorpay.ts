import crypto from "crypto";
import { getRazorpayInstance } from "./config";
import { PaymentRequest, PaymentResponse } from "./config";

export class RazorpayService {
  /**
   * Create a Razorpay order
   */
  static async createOrder(
    paymentRequest: PaymentRequest
  ): Promise<PaymentResponse> {
    try {
      console.log("RazorpayService.createOrder called with:", paymentRequest);
      const amountInPaise = paymentRequest.amount * 100; // Convert to paise

      const orderOptions = {
        amount: amountInPaise,
        currency: paymentRequest.currency,
        receipt: `course_${paymentRequest.courseId}_${paymentRequest.userId}`,
        notes: {
          courseId: paymentRequest.courseId,
          userId: paymentRequest.userId,
          userEmail: paymentRequest.userEmail,
          userName: paymentRequest.userName,
        },
      };

      console.log("Razorpay order options:", orderOptions);
      const razorpay = getRazorpayInstance();
      console.log("Razorpay instance created successfully");
      const order = await razorpay.orders.create(orderOptions);
      console.log("Razorpay order created:", order);

      console.log("✅ Razorpay order created successfully!");
      return {
        success: true,
        orderId: order.id,
        provider: "razorpay",
        amount: {
          amount: paymentRequest.amount,
          currency: paymentRequest.currency,
          provider: "razorpay",
        },
      };
    } catch (error) {
      console.error("❌ Razorpay order creation failed:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : "No stack trace",
        error: error,
      });
      return {
        success: false,
        provider: "razorpay",
        amount: {
          amount: paymentRequest.amount,
          currency: paymentRequest.currency,
          provider: "razorpay",
        },
        error: error instanceof Error ? error.message : "Order creation failed",
      };
    }
  }

  /**
   * Verify Razorpay payment signature
   */
  static verifyPayment(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): boolean {
    try {
      const hmac = crypto.createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET!
      );
      hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
      const generatedSignature = hmac.digest("hex");

      return generatedSignature === razorpaySignature;
    } catch (error) {
      console.error("Razorpay signature verification failed:", error);
      return false;
    }
  }

  /**
   * Get payment details from Razorpay
   */
  static async getPaymentDetails(paymentId: string) {
    try {
      const razorpay = getRazorpayInstance();
      const payment = await razorpay.payments.fetch(paymentId);
      return {
        success: true,
        payment,
      };
    } catch (error) {
      console.error("Failed to fetch Razorpay payment details:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch payment details",
      };
    }
  }

  /**
   * Refund a Razorpay payment
   */
  static async refundPayment(
    paymentId: string,
    amount?: number,
    notes?: string
  ) {
    try {
      const refundOptions: Record<string, unknown> = {
        payment_id: paymentId,
      };

      if (amount) {
        refundOptions.amount = amount * 100; // Convert to paise
      }

      if (notes) {
        refundOptions.notes = { reason: notes };
      }

      const razorpay = getRazorpayInstance();
      const refund = await razorpay.payments.refund(paymentId, refundOptions);

      return {
        success: true,
        refund,
      };
    } catch (error) {
      console.error("Razorpay refund failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Refund failed",
      };
    }
  }
}
