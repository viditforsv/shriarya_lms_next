import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Test endpoint to check database connection and table existence
export async function GET() {
  try {
    const supabase = await createClient();

    // Test basic connection
    const { data: testData, error: testError } = await supabase
      .from("profiles")
      .select("id")
      .limit(1);

    if (testError) {
      console.error("Database connection error:", testError);
      return NextResponse.json(
        {
          error: "Database connection failed",
          details: testError.message,
        },
        { status: 500 }
      );
    }

    // Check if RBAC tables exist
    const tablesToCheck = [
      "roles",
      "permissions",
      "role_permissions",
      "user_roles",
      "permission_categories",
    ];

    const tableStatus = {};

    for (const tableName of tablesToCheck) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select("*")
          .limit(1);

        tableStatus[tableName] = {
          exists: !error,
          error: error?.message || null,
          count: data?.length || 0,
        };
      } catch (err) {
        tableStatus[tableName] = {
          exists: false,
          error: err instanceof Error ? err.message : "Unknown error",
        };
      }
    }

    return NextResponse.json({
      connection: "OK",
      tables: tableStatus,
      message: "Database connection successful",
    });
  } catch (error) {
    console.error("Error in test API:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
