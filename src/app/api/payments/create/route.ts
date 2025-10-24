import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@/lib/supabase/server";
import { PaymentService, PaymentRequest } from "@/lib/payments";

export async function POST(request: NextRequest) {
  try {
    console.log("=== PAYMENT CREATE API CALLED ===");
    console.log("Request URL:", request.url);
    console.log("Request method:", request.method);

    // Debug environment variables
    console.log("ENV KEY ID:", process.env.RAZORPAY_KEY_ID);
    console.log(
      "ENV KEY SECRET:",
      process.env.RAZORPAY_KEY_SECRET ? "***SET***" : "NOT SET"
    );
    console.log(
      "NEXT_PUBLIC_RAZORPAY_KEY_ID:",
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    );

    const body = await request.json();
    console.log("REQ BODY:", JSON.stringify(body, null, 2));
    const { amount, currency, courseId, provider, userCountry } = body;

    // Validate required fields
    console.log("Validating fields:", {
      amount,
      currency,
      courseId,
      provider,
      userCountry,
    });
    if (!amount || !currency || !courseId) {
      console.log("❌ Missing required fields:", {
        amount,
        currency,
        courseId,
      });
      return NextResponse.json(
        { error: "Missing required fields: amount, currency, courseId" },
        { status: 400 }
      );
    }
    console.log("✅ Field validation passed");

    // Get user from session (optional for testing)
    console.log("Getting user from session...");
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    console.log("User session result:", {
      hasUser: !!user,
      authError: authError?.message,
      userId: user?.id,
    });

    // Use test user data if not authenticated (for testing purposes)
    let userId = "test-user-123";
    let userEmail = "test@example.com";
    let userName = "Test User";

    if (user && !authError) {
      console.log("✅ User authenticated, getting profile...");
      userId = user.id;
      userEmail = user.email!;

      // Get user profile for additional info
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, last_name, email")
        .eq("id", user.id)
        .single();

      userName = profile
        ? `${profile.first_name} ${profile.last_name}`
        : user.email!;
      console.log("Profile data:", profile);
    } else {
      console.log("⚠️ Using test user data (not authenticated)");
    }

    // Create payment request
    const paymentRequest: PaymentRequest = {
      amount: parseFloat(amount),
      currency,
      courseId,
      userId,
      userEmail,
      userName,
      userCountry,
      description: `Course enrollment for course ${courseId}`,
    };

    console.log(
      "📝 Payment request object:",
      JSON.stringify(paymentRequest, null, 2)
    );

    // Create payment directly with Razorpay (bypassing PaymentService)
    console.log("🚀 Creating Razorpay order directly...");

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const orderOptions = {
      amount: parseFloat(amount) * 100, // Convert to paise
      currency: currency,
      receipt: `rcpt_${Date.now()}`, // Short receipt (Razorpay limit: 40 chars)
      notes: {
        courseId: courseId,
        userId: userId,
        userEmail: userEmail,
        userName: userName,
      },
    };

    console.log("✅ ORDER OPTIONS:", orderOptions);
    const order = await razorpay.orders.create(orderOptions);
    console.log("✅ ORDER CREATED:", order);

    const paymentResponse = {
      success: true,
      orderId: order.id,
      provider: "razorpay",
      amount: {
        amount: parseFloat(amount),
        currency: currency,
        provider: "razorpay",
      },
    };

    console.log("✅ Payment created successfully, returning response");
    return NextResponse.json(paymentResponse);
  } catch (error) {
    console.error("💥 Payment creation error:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userCountry = searchParams.get("country");
    const currency = searchParams.get("currency") || "INR";

    // Get available payment methods
    const paymentMethods = PaymentService.getPaymentMethods(
      userCountry || undefined,
      currency
    );

    // Get recommended provider
    const recommendedProvider = PaymentService.getRecommendedProvider(
      userCountry || undefined,
      currency
    );

    return NextResponse.json({
      paymentMethods,
      recommendedProvider,
    });
  } catch (error) {
    console.error("Payment methods fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
