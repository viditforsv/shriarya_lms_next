import { NextResponse } from "next/server";
import { getCurrentEnvironment, getSupabaseUrl } from "@/lib/supabase/env";

/**
 * Debug endpoint to verify environment configuration
 * 
 * ⚠️ SECURITY: Remove or add authentication before production use
 * This endpoint exposes environment information and should be secured.
 */
export async function GET() {
  try {
    const environment = getCurrentEnvironment();
    const supabaseUrl = getSupabaseUrl();
    
    return NextResponse.json({
      environment,
      supabaseUrl: supabaseUrl ? `${supabaseUrl.substring(0, 40)}...` : "NOT SET",
      nodeEnv: process.env.NODE_ENV,
      explicitEnv: process.env.NEXT_PUBLIC_ENVIRONMENT,
      timestamp: new Date().toISOString(),
      // Don't expose sensitive keys, just verify they exist
      hasDevUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL_DEV,
      hasProdUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL_PROD,
      hasDevAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV,
      hasProdAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_PROD,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to get environment info",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

