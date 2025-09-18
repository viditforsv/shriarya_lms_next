import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Get the current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get onboarding data
    const { data: onboardingData, error } = await supabase
      .from("user_onboarding")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      return NextResponse.json(
        { error: "Failed to fetch onboarding data" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: onboardingData || null,
      hasCompletedOnboarding: onboardingData?.is_completed || false,
    });
  } catch (error) {
    console.error("Error in onboarding API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get the current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      currentStep,
      preferences,
      skippedSteps,
      isCompleted,
      educationalBackground,
      selectedCourses,
      profileData,
    } = body;

    // Upsert onboarding data
    const { data, error } = await supabase
      .from("user_onboarding")
      .upsert({
        user_id: user.id,
        current_step: currentStep,
        preferences: preferences || {},
        educational_background: educationalBackground || {},
        selected_courses: selectedCourses || [],
        profile_data: profileData || {},
        skipped_steps: skippedSteps || [],
        is_completed: isCompleted || false,
        completed_at: isCompleted ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to save onboarding data" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error in onboarding API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const supabase = await createClient();

    // Get the current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete onboarding data
    const { error } = await supabase
      .from("user_onboarding")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json(
        { error: "Failed to delete onboarding data" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in onboarding API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
