/**
 * Helper function to create Supabase client with service role key for API routes
 * Automatically uses the correct environment (dev/prod) credentials
 */
import { createClient } from "@supabase/supabase-js";
import {
  getSupabaseUrl,
  getSupabaseServiceRoleKey,
} from "./env";

/**
 * Creates a Supabase client with service role key for API routes
 * This bypasses RLS (Row Level Security) and should only be used server-side
 */
export function createSupabaseApiClient() {
  const url = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();
  
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase service role key. Required: SUPABASE_SERVICE_ROLE_KEY_DEV or SUPABASE_SERVICE_ROLE_KEY_PROD " +
      "(or fallback to SUPABASE_SERVICE_ROLE_KEY)"
    );
  }
  
  return createClient(url, serviceRoleKey);
}

