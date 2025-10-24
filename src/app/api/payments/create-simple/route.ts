import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: NextRequest) {
  try {
    console.log("=== SIMPLIFIED PAYMENT CREATE API ===");

    const body = await request.json();
    console.log("✅ REQUEST BODY:", body);
    console.log("✅ REQUEST BODY TYPES:", {
      amount: typeof body.amount,
      currency: typeof body.currency,
      courseId: typeof body.courseId,
      provider: typeof body.provider,
    });

    console.log("✅ ENV:", {
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET ? "***SET***" : "NOT SET",
    });

    // Create Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: Number(body.amount) * 100, // Convert to paise
      currency: body.currency || "INR",
      receipt: `receipt_${Date.now()}`,
    };

    console.log("✅ ORDER OPTIONS:", options);

    const order = await razorpay.orders.create(options);
    console.log("✅ ORDER CREATED:", order);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      provider: "razorpay",
      amount: {
        amount: body.amount,
        currency: body.currency || "INR",
        provider: "razorpay",
      },
    });
  } catch (error: any) {
    console.error("🔥 Razorpay Error:", error);
    console.error("🔥 Error Response:", error.response);
    console.error("🔥 Error Message:", error.message);
    console.error("🔥 Error Code:", error.code);
    console.error("🔥 Error Description:", error.description);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
        error: error,
        details: error.description || error.message,
      },
      { status: 400 }
    );
  }
}
