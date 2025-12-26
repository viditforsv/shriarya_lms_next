/**
 * Environment-based Supabase configuration
 * Automatically selects dev or prod credentials based on environment
 */

type Environment = "dev" | "prod";

/**
 * Determines the current environment
 * Priority:
 * 1. NEXT_PUBLIC_ENVIRONMENT env var (explicit)
 * 2. NODE_ENV === "production" → prod
 * 3. Default to dev for safety
 */
function getEnvironment(): Environment {
  const explicitEnv = process.env.NEXT_PUBLIC_ENVIRONMENT?.toLowerCase();
  if (explicitEnv === "prod" || explicitEnv === "production") {
    return "prod";
  }
  if (explicitEnv === "dev" || explicitEnv === "development") {
    return "dev";
  }
  
  // Fallback to NODE_ENV
  if (process.env.NODE_ENV === "production") {
    return "prod";
  }
  
  return "dev";
}

/**
 * Gets the Supabase URL for the current environment
 */
export function getSupabaseUrl(): string {
  const env = getEnvironment();
  
  if (env === "prod") {
    return (
      process.env.NEXT_PUBLIC_SUPABASE_URL_PROD ||
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      ""
    );
  }
  
  // Dev environment
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL_DEV ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    ""
  );
}

/**
 * Gets the Supabase anon key for the current environment
 */
export function getSupabaseAnonKey(): string {
  const env = getEnvironment();
  
  if (env === "prod") {
    return (
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_PROD ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      ""
    );
  }
  
  // Dev environment
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    ""
  );
}

/**
 * Gets the Supabase service role key for the current environment
 */
export function getSupabaseServiceRoleKey(): string {
  const env = getEnvironment();
  
  if (env === "prod") {
    return (
      process.env.SUPABASE_SERVICE_ROLE_KEY_PROD ||
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      ""
    );
  }
  
  // Dev environment
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY_DEV ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ""
  );
}

/**
 * Gets the current environment name
 */
export function getCurrentEnvironment(): Environment {
  return getEnvironment();
}

/**
 * Validates that required Supabase credentials are present
 */
export function validateSupabaseConfig(): void {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  const env = getEnvironment();
  
  if (!url || !anonKey) {
    throw new Error(
      `Missing Supabase environment variables for ${env} environment. ` +
      `Required: NEXT_PUBLIC_SUPABASE_URL_${env.toUpperCase()} and NEXT_PUBLIC_SUPABASE_ANON_KEY_${env.toUpperCase()} ` +
      `(or fallback to NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY)`
    );
  }
}

