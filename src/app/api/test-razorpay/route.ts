import { NextResponse } from "next/server";
import { getRazorpayInstance } from "@/lib/payments/config";

export async function GET() {
  try {
    console.log("=== RAZORPAY TEST ENDPOINT ===");

    // Check environment variables
    const hasKeyId = !!process.env.RAZORPAY_KEY_ID;
    const hasKeySecret = !!process.env.RAZORPAY_KEY_SECRET;
    const hasPublicKeyId = !!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
    console.log(
      "RAZORPAY_KEY_SECRET:",
      hasKeySecret ? "***SET***" : "NOT SET"
    );
    console.log("NEXT_PUBLIC_RAZORPAY_KEY_ID:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);

    // Quick check if credentials are configured
    if (!hasKeyId || !hasKeySecret) {
      return NextResponse.json({
        success: false,
        configured: false,
        message: "Razorpay credentials are missing",
        envCheck: {
          keyId: hasKeyId,
          keySecret: hasKeySecret,
          publicKeyId: hasPublicKeyId,
        },
      });
    }

    // Try to create Razorpay instance
    try {
      const razorpay = getRazorpayInstance();
      console.log("✅ Razorpay instance created successfully");

      // Test a simple order creation
      const testOrder = {
        amount: 100, // 1 rupee in paise
        currency: "INR",
        receipt: `test_${Date.now()}`,
      };

      console.log("Creating test order:", testOrder);
      const order = await razorpay.orders.create(testOrder);
      console.log("✅ Test order created:", order.id);

      return NextResponse.json({
        success: true,
        configured: true,
        message: "Razorpay integration working!",
        orderId: order.id,
        envCheck: {
          keyId: !!process.env.RAZORPAY_KEY_ID,
          keySecret: !!process.env.RAZORPAY_KEY_SECRET,
          publicKeyId: !!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        },
      });
    } catch (razorpayError) {
      console.error("❌ Razorpay error:", razorpayError);
      return NextResponse.json(
        {
          success: false,
          configured: false,
          error: "Razorpay API error",
          details:
            razorpayError instanceof Error
              ? razorpayError.message
              : "Unknown error",
          envCheck: {
            keyId: !!process.env.RAZORPAY_KEY_ID,
            keySecret: !!process.env.RAZORPAY_KEY_SECRET,
            publicKeyId: !!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          },
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("❌ Test endpoint error:", error);
    return NextResponse.json(
      {
        success: false,
        configured: false,
        error: "Test endpoint failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
