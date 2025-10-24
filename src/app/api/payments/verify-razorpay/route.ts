import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";
import Razorpay from "razorpay";

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 Verifying Razorpay payment...");

    // Parse request body
    const body = await request.json();
    const { orderId, paymentId, signature, courseId } = body;

    // Validate inputs
    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: orderId, paymentId, signature",
        },
        { status: 400 }
      );
    }

    // Validate Razorpay secret
    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error("❌ Razorpay secret not configured");
      return NextResponse.json(
        {
          success: false,
          error: "Payment verification failed - system not configured",
        },
        { status: 500 }
      );
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature !== signature) {
      console.error("❌ Invalid signature");
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payment signature",
        },
        { status: 400 }
      );
    }

    console.log("✅ Signature verified successfully");

    // Get user
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Fetch payment details from Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const payment = await razorpay.payments.fetch(paymentId);
    const amount = Number(payment.amount) / 100; // Convert from paise to rupees
    const currency = payment.currency;

    console.log("Payment details:", {
      paymentId,
      amount,
      currency,
      status: payment.status,
    });

    // Create enrollment if user is authenticated
    if (user && courseId) {
      console.log(
        "Creating enrollment for user:",
        user.id,
        "course:",
        courseId
      );

      const { error: enrollmentError } = await supabase
        .from("courses_enrollments")
        .insert({
          student_id: user.id,
          course_id: courseId,
          is_active: true,
          enrolled_at: new Date().toISOString(),
        });

      if (enrollmentError) {
        console.error("Enrollment error:", enrollmentError);
        // Don't fail the payment if enrollment fails
      } else {
        console.log("✅ Enrollment created");
      }

      // Save payment record
      const { error: paymentError } = await supabase.from("payments").insert({
        user_id: user.id,
        course_id: courseId,
        amount: amount,
        currency: currency,
        provider: "razorpay",
        payment_id: paymentId,
        order_id: orderId,
        status: "completed",
        metadata: {
          razorpay_payment_id: paymentId,
          razorpay_order_id: orderId,
          razorpay_signature: signature,
        },
      });

      if (paymentError) {
        console.error("Payment record error:", paymentError);
        // Don't fail if payment record creation fails
      } else {
        console.log("✅ Payment record created");
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      paymentId: paymentId,
      orderId: orderId,
      amount: amount,
      currency: currency,
    });
  } catch (error) {
    console.error("❌ Payment verification failed:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Payment verification failed",
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Payment verification endpoint is ready",
  });
}
