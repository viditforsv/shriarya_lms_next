// Payment configuration and utilities
import Razorpay from "razorpay";

// Razorpay configuration
export const razorpayConfig = {
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_2vCJcOX18SSurY",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "d7EZNglQiGtRMCkibA5r0jSR",
};

// Initialize Razorpay instance (lazy initialization)
let razorpayInstance: Razorpay | null = null;
export const getRazorpayInstance = (): Razorpay => {
  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: razorpayConfig.key_id,
      key_secret: razorpayConfig.key_secret,
    });
  }
  return razorpayInstance;
};

// Payment provider types
export type PaymentProvider = "razorpay";

// Payment currency mapping
export const CURRENCY_MAP = {
  razorpay: "INR",
} as const;

// Supported currencies for each provider
export const SUPPORTED_CURRENCIES = {
  razorpay: ["INR"],
} as const;

// Payment method configuration
export interface PaymentMethod {
  provider: PaymentProvider;
  name: string;
  description: string;
  icon: string;
  supportedCountries: string[];
  supportedCurrencies: string[];
  isAvailable: boolean;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    provider: "razorpay",
    name: "Razorpay",
    description: "Pay with UPI, Cards, Net Banking, Wallets",
    icon: "💳",
    supportedCountries: ["IN"],
    supportedCurrencies: ["INR"],
    isAvailable: true,
  },
];

// Payment amount interface
export interface PaymentAmount {
  amount: number;
  currency: string;
  provider: PaymentProvider;
}

// Payment request interface
export interface PaymentRequest {
  amount: number;
  currency: string;
  courseId: string;
  userId: string;
  userEmail: string;
  userName: string;
  userCountry?: string;
  description?: string;
}

// Payment response interface
export interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  clientSecret?: string;
  publishableKey?: string;
  provider: PaymentProvider;
  amount: PaymentAmount;
  error?: string;
}

// Utility function to determine payment provider based on user location and currency
export function getRecommendedPaymentProvider(): PaymentProvider {
  return "razorpay";
}

// Utility function to get available payment methods for user
export function getAvailablePaymentMethods(
  userCountry?: string,
  currency: string = "INR"
): PaymentMethod[] {
  return PAYMENT_METHODS.filter((method) => {
    // Check if currency is supported
    if (!method.supportedCurrencies.includes(currency)) {
      return false;
    }

    // Check if country is supported (if specified)
    if (userCountry && method.supportedCountries.length > 0) {
      return method.supportedCountries.includes(userCountry);
    }

    return method.isAvailable;
  });
}

// Utility function to convert amount to smallest currency unit
export function convertToSmallestUnit(
  amount: number,
  currency: string
): number {
  // Most currencies use 2 decimal places, except JPY which uses 0
  const decimalPlaces = currency === "JPY" ? 0 : 2;
  return Math.round(amount * Math.pow(10, decimalPlaces));
}

// Utility function to format amount for display
export function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: currency === "JPY" ? 0 : 2,
  }).format(amount);
}
