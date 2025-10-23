import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 Creating Razorpay order...");

    // Parse request body
    const body = await request.json();
    const { amount, currency, courseId, courseName } = body;

    // Validate inputs
    if (!amount || !currency || !courseId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: amount, currency, courseId",
        },
        { status: 400 }
      );
    }

    // Validate Razorpay credentials
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("❌ Razorpay credentials not configured");
      return NextResponse.json(
        {
          success: false,
          error: "Payment system not configured. Please contact support.",
        },
        { status: 500 }
      );
    }

    // Get user (optional - for test purposes)
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user?.id || "test-user";
    const userEmail = user?.email || "test@example.com";

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create order
    const orderOptions = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: currency,
      receipt: `rcpt_${Date.now()}`,
      notes: {
        courseId: courseId,
        courseName: courseName || "",
        userId: userId,
        userEmail: userEmail,
      },
    };

    console.log("Creating Razorpay order with options:", orderOptions);

    const order = await razorpay.orders.create(orderOptions);

    console.log("✅ Razorpay order created:", order.id);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: amount,
      currency: currency,
    });
  } catch (error) {
    console.error("❌ Razorpay order creation failed:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create payment order",
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  const hasCredentials = !!(
    process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  );

  return NextResponse.json({
    status: "ok",
    configured: hasCredentials,
    message: hasCredentials
      ? "Razorpay is configured"
      : "Razorpay credentials missing",
  });
}
