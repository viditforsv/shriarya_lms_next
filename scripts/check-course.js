const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: "../.env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkCourse() {
  console.log("🔍 Checking for CBSE Mathematics Class 10 course...");

  const { data, error } = await supabase
    .from("courses")
    .select("id, title, slug")
    .eq("slug", "cbse-mathematics-class-10")
    .single();

  if (error) {
    console.error("❌ Error:", error);
    return;
  }

  if (data) {
    console.log("✅ Found course:");
    console.log(`   ID: ${data.id}`);
    console.log(`   Title: ${data.title}`);
    console.log(`   Slug: ${data.slug}`);
  } else {
    console.log("❌ Course not found");
  }
}

checkCourse();
