import { NextResponse } from "next/server";
import { createSupabaseApiClient } from "@/lib/supabase/api-client";

// GET /api/rbac/roles - Get all roles
export async function GET() {
  try {
    // Use service role key to bypass RLS
    const supabase = createSupabaseApiClient();

    const { data: roles, error } = await supabase
      .from("roles")
      .select("id, name, display_name, description, is_system_role")
      .eq("is_active", true)
      .order("display_name");

    if (error) {
      console.error("Error fetching roles:", error);
      return NextResponse.json(
        { error: "Failed to fetch roles" },
        { status: 500 }
      );
    }

    return NextResponse.json({ roles });
  } catch (error) {
    console.error("Error in roles API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
