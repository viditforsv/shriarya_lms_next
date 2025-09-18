import { NextRequest, NextResponse } from "next/server";
import { PaymentService } from "@/lib/payments";
import { PaymentRequest } from "@/lib/payments/config";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, courseId, provider, userCountry } = body;

    // Validate required fields
    if (!amount || !currency || !courseId) {
      return NextResponse.json(
        { error: "Missing required fields: amount, currency, courseId" },
        { status: 400 }
      );
    }

    // Get user from session (optional for testing)
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    // Use test user data if not authenticated (for testing purposes)
    let userId = "test-user-123";
    let userEmail = "test@example.com";
    let userName = "Test User";

    if (user && !authError) {
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

    // Create payment
    const paymentResponse = await PaymentService.createPayment(
      paymentRequest,
      provider
    );

    if (!paymentResponse.success) {
      return NextResponse.json(
        { error: paymentResponse.error || "Payment creation failed" },
        { status: 400 }
      );
    }

    return NextResponse.json(paymentResponse);
  } catch (error) {
    console.error("Payment creation error:", error);
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
