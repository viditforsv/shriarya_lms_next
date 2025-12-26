#!/usr/bin/env tsx
/**
 * Find CBSE Courses
 * 
 * Lists all CBSE courses in the database
 */

import { config } from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import {
  getSupabaseUrl,
  getSupabaseServiceRoleKey,
} from "../src/lib/supabase/env";

config({ path: resolve(process.cwd(), ".env.local") });

async function main() {
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase credentials");
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  console.log("🔍 Searching for CBSE courses...\n");

  // Find all CBSE courses
  const { data: courses, error } = await supabase
    .from("courses")
    .select("id, title, slug, curriculum, subject, grade, status, created_at")
    .or("curriculum.eq.CBSE,title.ilike.%CBSE%")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }

  if (!courses || courses.length === 0) {
    console.log("No CBSE courses found.");
    return;
  }

  console.log(`Found ${courses.length} CBSE course(s):\n`);
  
  for (const course of courses) {
    console.log(`📚 ${course.title}`);
    console.log(`   ID: ${course.id}`);
    console.log(`   Slug: ${course.slug}`);
    console.log(`   Curriculum: ${course.curriculum || "N/A"}`);
    console.log(`   Subject: ${course.subject || "N/A"}`);
    console.log(`   Grade: ${course.grade || "N/A"}`);
    console.log(`   Status: ${course.status}`);
    console.log(`   Created: ${course.created_at}`);
    console.log("");
  }

  // Check for Class 10 Maths specifically
  const class10Maths = courses.filter(
    c => 
      (c.grade === "10" || c.title?.includes("10")) &&
      (c.subject === "Mathematics" || c.title?.toLowerCase().includes("math"))
  );

  if (class10Maths.length > 0) {
    console.log("\n🎯 Class 10 Mathematics courses found:\n");
    for (const course of class10Maths) {
      console.log(`   ${course.title} (${course.slug})`);
      console.log(`   ID: ${course.id}\n`);
    }
  }
}

if (require.main === module) {
  main().catch(console.error);
}

