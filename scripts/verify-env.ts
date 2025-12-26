#!/usr/bin/env tsx
/**
 * Environment Verification Script
 * 
 * This script verifies that the environment-based database configuration
 * is working correctly and shows which database will be used.
 */

import {
  getCurrentEnvironment,
  getSupabaseUrl,
  getSupabaseAnonKey,
  getSupabaseServiceRoleKey,
  validateSupabaseConfig,
} from "../src/lib/supabase/env";

console.log("🔍 Environment Configuration Verification\n");
console.log("=" .repeat(50));

try {
  // Get current environment
  const env = getCurrentEnvironment();
  console.log(`✅ Environment: ${env.toUpperCase()}`);

  // Get credentials
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  const serviceKey = getSupabaseServiceRoleKey();

  console.log(`\n📊 Configuration:`);
  console.log(`   URL: ${url ? url.substring(0, 40) + "..." : "❌ MISSING"}`);
  console.log(`   Anon Key: ${anonKey ? anonKey.substring(0, 30) + "..." : "❌ MISSING"}`);
  console.log(`   Service Key: ${serviceKey ? serviceKey.substring(0, 30) + "..." : "❌ MISSING"}`);

  // Validate configuration
  console.log(`\n🔐 Validation:`);
  validateSupabaseConfig();
  console.log("   ✅ All required credentials are present");

  // Show which env vars are being used
  console.log(`\n📝 Environment Variables Used:`);
  if (env === "prod") {
    console.log(`   NEXT_PUBLIC_SUPABASE_URL_PROD: ${process.env.NEXT_PUBLIC_SUPABASE_URL_PROD ? "✅ Set" : "❌ Not set (using fallback)"}`);
    console.log(`   NEXT_PUBLIC_SUPABASE_ANON_KEY_PROD: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_PROD ? "✅ Set" : "❌ Not set (using fallback)"}`);
    console.log(`   SUPABASE_SERVICE_ROLE_KEY_PROD: ${process.env.SUPABASE_SERVICE_ROLE_KEY_PROD ? "✅ Set" : "❌ Not set (using fallback)"}`);
  } else {
    console.log(`   NEXT_PUBLIC_SUPABASE_URL_DEV: ${process.env.NEXT_PUBLIC_SUPABASE_URL_DEV ? "✅ Set" : "❌ Not set (using fallback)"}`);
    console.log(`   NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV ? "✅ Set" : "❌ Not set (using fallback)"}`);
    console.log(`   SUPABASE_SERVICE_ROLE_KEY_DEV: ${process.env.SUPABASE_SERVICE_ROLE_KEY_DEV ? "✅ Set" : "❌ Not set (using fallback)"}`);
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log("✅ Environment configuration is valid!");
  console.log(`\n💡 The application will use the ${env.toUpperCase()} database.`);

} catch (error) {
  console.error("\n❌ Configuration Error:");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

