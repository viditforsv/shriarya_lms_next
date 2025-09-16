import { RazorpayService } from "./razorpay";
import {
  PaymentRequest,
  PaymentResponse,
  PaymentProvider,
  getRecommendedPaymentProvider,
  getAvailablePaymentMethods,
} from "./config";

export class PaymentService {
  /**
   * Create payment based on provider
   */
  static async createPayment(
    paymentRequest: PaymentRequest,
    provider?: PaymentProvider
  ): Promise<PaymentResponse> {
    // Determine provider if not specified
    const selectedProvider =
      provider ||
      getRecommendedPaymentProvider(
        paymentRequest.userCountry,
        paymentRequest.currency
      );

    // Validate provider availability
    const availableMethods = getAvailablePaymentMethods(
      paymentRequest.userCountry,
      paymentRequest.currency
    );

    const isProviderAvailable = availableMethods.some(
      (method) => method.provider === selectedProvider
    );

    if (!isProviderAvailable) {
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
    switch (selectedProvider) {
      case "razorpay":
        return await RazorpayService.createOrder(paymentRequest);

      default:
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
    paymentData: any
  ): Promise<{ success: boolean; error?: string; paymentDetails?: any }> {
    try {
      switch (provider) {
        case "razorpay":
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
                ? paymentDetails.payment
                : null,
            };
          } else {
            return {
              success: false,
              error: "Invalid payment signature",
            };
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
  ): Promise<{ success: boolean; error?: string; refundDetails?: any }> {
    try {
      switch (provider) {
        case "razorpay":
          const razorpayRefund = await RazorpayService.refundPayment(
            paymentId,
            amount,
            reason
          );
          return razorpayRefund;

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
  static getRecommendedProvider(
    userCountry?: string,
    currency: string = "INR"
  ): PaymentProvider {
    return getRecommendedPaymentProvider(userCountry, currency);
  }
}
