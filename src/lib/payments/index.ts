import { RazorpayService } from "./razorpay";
import {
  PaymentRequest,
  PaymentResponse,
  PaymentProvider,
  getRecommendedPaymentProvider,
  getAvailablePaymentMethods,
} from "./config";

// Re-export types
export type { PaymentRequest, PaymentResponse, PaymentProvider };

interface RazorpayPaymentData {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

interface PaymentVerificationResult {
  success: boolean;
  error?: string;
  paymentDetails?: Record<string, unknown>;
}

export class PaymentService {
  /**
   * Create payment based on provider
   */
  static async createPayment(
    paymentRequest: PaymentRequest,
    provider?: PaymentProvider
  ): Promise<PaymentResponse> {
    console.log("=== PaymentService.createPayment called ===");
    console.log("Payment request:", JSON.stringify(paymentRequest, null, 2));
    console.log("Provider:", provider);

    // Determine provider if not specified
    const selectedProvider = provider || getRecommendedPaymentProvider();
    console.log("Selected provider:", selectedProvider);

    // Validate provider availability
    console.log("Checking provider availability...");
    const availableMethods = getAvailablePaymentMethods(
      paymentRequest.userCountry,
      paymentRequest.currency
    );
    console.log("Available methods:", availableMethods);

    const isProviderAvailable = availableMethods.some(
      (method) => method.provider === selectedProvider
    );
    console.log("Is provider available:", isProviderAvailable);

    if (!isProviderAvailable) {
      console.log("❌ Provider not available");
      return {
        success: false,
        provider: selectedProvider,
        amount: {
          amount: paymentRequest.amount,
          currency: paymentRequest.currency,
          provider: selectedProvider,
        },
        error: `Payment provider ${selectedProvider} is not available for your location/currency`,
      };
    }

    // Create payment based on provider
    console.log("Creating payment with provider:", selectedProvider);
    switch (selectedProvider) {
      case "razorpay":
        console.log("🚀 Calling RazorpayService.createOrder...");
        return await RazorpayService.createOrder(paymentRequest);

      default:
        console.log("❌ Unsupported provider:", selectedProvider);
        return {
          success: false,
          provider: selectedProvider,
          amount: {
            amount: paymentRequest.amount,
            currency: paymentRequest.currency,
            provider: selectedProvider,
          },
          error: "Unsupported payment provider",
        };
    }
  }

  /**
   * Verify payment based on provider
   */
  static async verifyPayment(
    provider: PaymentProvider,
    paymentData: RazorpayPaymentData
  ): Promise<PaymentVerificationResult> {
    try {
      switch (provider) {
        case "razorpay": {
          const { razorpayOrderId, razorpayPaymentId, razorpaySignature } =
            paymentData;
          const isValid = RazorpayService.verifyPayment(
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature
          );

          if (isValid) {
            const paymentDetails = await RazorpayService.getPaymentDetails(
              razorpayPaymentId
            );
            return {
              success: true,
              paymentDetails: paymentDetails.success
                ? (paymentDetails.payment as unknown as Record<string, unknown>)
                : undefined,
            };
          } else {
            return {
              success: false,
              error: "Invalid payment signature",
            };
          }
        }

        default:
          return {
            success: false,
            error: "Unsupported payment provider",
          };
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Payment verification failed",
      };
    }
  }

  /**
   * Process refund based on provider
   */
  static async processRefund(
    provider: PaymentProvider,
    paymentId: string,
    amount?: number,
    reason?: string
  ): Promise<{
    success: boolean;
    error?: string;
    refundDetails?: Record<string, unknown>;
  }> {
    try {
      switch (provider) {
        case "razorpay": {
          const razorpayRefund = await RazorpayService.refundPayment(
            paymentId,
            amount,
            reason
          );
          return razorpayRefund;
        }

        default:
          return {
            success: false,
            error: "Unsupported payment provider",
          };
      }
    } catch (error) {
      console.error("Refund processing failed:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Refund processing failed",
      };
    }
  }

  /**
   * Get payment methods available for user
   */
  static getPaymentMethods(userCountry?: string, currency: string = "INR") {
    return getAvailablePaymentMethods(userCountry, currency);
  }

  /**
   * Get recommended payment provider for user
   */
  static getRecommendedProvider(): PaymentProvider {
    return getRecommendedPaymentProvider();
  }
}
