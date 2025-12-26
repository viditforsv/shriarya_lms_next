#!/usr/bin/env tsx
/**
 * Create Admin User Script
 * 
 * Creates an admin user in Supabase auth and sets up their profile
 */

import { createSupabaseApiClient } from "../src/lib/supabase/api-client";
import { getCurrentEnvironment } from "../src/lib/supabase/env";

const ADMIN_EMAIL = "vidit@shrividhya.in";
const ADMIN_PASSWORD = "Vidit12#$";
const ADMIN_FIRST_NAME = "Vidit";
const ADMIN_LAST_NAME = "";

async function createAdminUser() {
  console.log("🔐 Creating Admin User\n");
  console.log("=".repeat(50));
  
  // Check environment
  const env = getCurrentEnvironment();
  console.log(`Environment: ${env.toUpperCase()}`);
  console.log(`Email: ${ADMIN_EMAIL}`);
  console.log(`Role: admin`);
  console.log("=".repeat(50) + "\n");

  // Check for required env vars
  const requiredEnvVar = env === "prod" 
    ? "SUPABASE_SERVICE_ROLE_KEY_PROD" 
    : "SUPABASE_SERVICE_ROLE_KEY_DEV";
  
  if (!process.env[requiredEnvVar] && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error(`❌ Missing required environment variable: ${requiredEnvVar}`);
    console.error(`   Or set SUPABASE_SERVICE_ROLE_KEY as fallback`);
    console.error(`\n   Please set the environment variable and try again:`);
    console.error(`   export ${requiredEnvVar}=your_service_role_key`);
    process.exit(1);
  }

  const supabase = createSupabaseApiClient();

  try {
    // Check if user already exists
    const { data: existingUsers, error: checkError } = await supabase.auth.admin.listUsers();
    
    if (checkError) {
      console.error("❌ Error checking existing users:", checkError);
      throw checkError;
    }

    const existingUser = existingUsers.users.find((u) => u.email === ADMIN_EMAIL);

    if (existingUser) {
      console.log(`⚠️  User ${ADMIN_EMAIL} already exists with ID: ${existingUser.id}`);
      
      // Update the user's password
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        existingUser.id,
        { password: ADMIN_PASSWORD }
      );

      if (updateError) {
        console.error("❌ Error updating password:", updateError);
        throw updateError;
      }

      console.log("✅ Password updated successfully");

      // Check and update profile
      const { data: existingProfile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", existingUser.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        console.error("❌ Error checking profile:", profileError);
        throw profileError;
      }

      if (existingProfile) {
        // Update existing profile to admin
        const { error: updateProfileError } = await supabase
          .from("profiles")
          .update({
            role: "admin",
            first_name: ADMIN_FIRST_NAME,
            last_name: ADMIN_LAST_NAME || null,
            email: ADMIN_EMAIL,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingUser.id);

        if (updateProfileError) {
          console.error("❌ Error updating profile:", updateProfileError);
          throw updateProfileError;
        }

        console.log("✅ Profile updated to admin role");
      } else {
        // Create profile
        const { error: createProfileError } = await supabase
          .from("profiles")
          .insert({
            id: existingUser.id,
            email: ADMIN_EMAIL,
            first_name: ADMIN_FIRST_NAME,
            last_name: ADMIN_LAST_NAME || null,
            role: "admin",
          });

        if (createProfileError) {
          console.error("❌ Error creating profile:", createProfileError);
          throw createProfileError;
        }

        console.log("✅ Profile created with admin role");
      }

      console.log("\n✅ Admin user setup complete!");
      console.log(`   User ID: ${existingUser.id}`);
      console.log(`   Email: ${ADMIN_EMAIL}`);
      console.log(`   Password: ${ADMIN_PASSWORD}`);
      console.log(`   Role: admin`);
      return;
    }

    // Create new user
    console.log("📝 Creating new user...");
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        first_name: ADMIN_FIRST_NAME,
        last_name: ADMIN_LAST_NAME,
        role: "admin",
      },
    });

    if (createError) {
      console.error("❌ Error creating user:", createError);
      throw createError;
    }

    if (!newUser.user) {
      throw new Error("User creation failed - no user data returned");
    }

    console.log("✅ User created successfully");
    console.log(`   User ID: ${newUser.user.id}`);

    // Create profile with admin role
    console.log("\n📝 Creating profile with admin role...");
    const { error: profileError } = await supabase.from("profiles").insert({
      id: newUser.user.id,
      email: ADMIN_EMAIL,
      first_name: ADMIN_FIRST_NAME,
      last_name: ADMIN_LAST_NAME || null,
      role: "admin",
    });

    if (profileError) {
      // If profile already exists (from trigger), try to update it
      if (profileError.code === "23505") {
        console.log("⚠️  Profile already exists, updating to admin...");
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            role: "admin",
            first_name: ADMIN_FIRST_NAME,
            last_name: ADMIN_LAST_NAME || null,
            email: ADMIN_EMAIL,
            updated_at: new Date().toISOString(),
          })
          .eq("id", newUser.user.id);

        if (updateError) {
          console.error("❌ Error updating profile:", updateError);
          throw updateError;
        }
        console.log("✅ Profile updated to admin role");
      } else {
        console.error("❌ Error creating profile:", profileError);
        throw profileError;
      }
    } else {
      console.log("✅ Profile created with admin role");
    }

    console.log("\n✅ Admin user setup complete!");
    console.log(`   User ID: ${newUser.user.id}`);
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log(`   Role: admin`);
    console.log("\n🎉 You can now sign in with these credentials!");
  } catch (error) {
    console.error("\n❌ Failed to create admin user:", error);
    process.exit(1);
  }
}

createAdminUser();

