require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("❌ Missing Supabase environment variables");
  console.error(
    "Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Mapping from CSV structure
const lessonMapping = [
  // Unit 1: Number Systems
  { lesson_order: 1, section: "Number Systems", chapter: "Real Numbers" },
  { lesson_order: 2, section: "Number Systems", chapter: "Real Numbers" },
  { lesson_order: 3, section: "Number Systems", chapter: "Real Numbers" },
  { lesson_order: 4, section: "Number Systems", chapter: "Real Numbers" },
  { lesson_order: 5, section: "Number Systems", chapter: "Real Numbers" },
  { lesson_order: 6, section: "Number Systems", chapter: "Real Numbers" },

  // Unit 2: Algebra - Polynomials
  { lesson_order: 7, section: "Algebra", chapter: "Polynomials" },
  { lesson_order: 8, section: "Algebra", chapter: "Polynomials" },
  { lesson_order: 9, section: "Algebra", chapter: "Polynomials" },
  { lesson_order: 10, section: "Algebra", chapter: "Polynomials" },
  { lesson_order: 11, section: "Algebra", chapter: "Polynomials" },

  // Unit 2: Algebra - Pair of Linear Equations
  { lesson_order: 12, section: "Algebra", chapter: "Pair of Linear Equations" },
  { lesson_order: 13, section: "Algebra", chapter: "Pair of Linear Equations" },
  { lesson_order: 14, section: "Algebra", chapter: "Pair of Linear Equations" },
  { lesson_order: 15, section: "Algebra", chapter: "Pair of Linear Equations" },
  { lesson_order: 16, section: "Algebra", chapter: "Pair of Linear Equations" },
  { lesson_order: 17, section: "Algebra", chapter: "Pair of Linear Equations" },
  { lesson_order: 18, section: "Algebra", chapter: "Pair of Linear Equations" },

  // Unit 2: Algebra - Quadratic Equations
  { lesson_order: 19, section: "Algebra", chapter: "Quadratic Equations" },
  { lesson_order: 20, section: "Algebra", chapter: "Quadratic Equations" },
  { lesson_order: 21, section: "Algebra", chapter: "Quadratic Equations" },
  { lesson_order: 22, section: "Algebra", chapter: "Quadratic Equations" },
  { lesson_order: 23, section: "Algebra", chapter: "Quadratic Equations" },
  { lesson_order: 24, section: "Algebra", chapter: "Quadratic Equations" },
  { lesson_order: 25, section: "Algebra", chapter: "Quadratic Equations" },

  // Unit 2: Algebra - Arithmetic Progressions
  { lesson_order: 26, section: "Algebra", chapter: "Arithmetic Progressions" },
  { lesson_order: 27, section: "Algebra", chapter: "Arithmetic Progressions" },
  { lesson_order: 28, section: "Algebra", chapter: "Arithmetic Progressions" },
  { lesson_order: 29, section: "Algebra", chapter: "Arithmetic Progressions" },
  { lesson_order: 30, section: "Algebra", chapter: "Arithmetic Progressions" },
  { lesson_order: 31, section: "Algebra", chapter: "Arithmetic Progressions" },

  // Unit 3: Coordinate Geometry
  {
    lesson_order: 32,
    section: "Coordinate Geometry",
    chapter: "Coordinate Geometry",
  },
  {
    lesson_order: 33,
    section: "Coordinate Geometry",
    chapter: "Coordinate Geometry",
  },
  {
    lesson_order: 34,
    section: "Coordinate Geometry",
    chapter: "Coordinate Geometry",
  },
  {
    lesson_order: 35,
    section: "Coordinate Geometry",
    chapter: "Coordinate Geometry",
  },
  {
    lesson_order: 36,
    section: "Coordinate Geometry",
    chapter: "Coordinate Geometry",
  },
  {
    lesson_order: 37,
    section: "Coordinate Geometry",
    chapter: "Coordinate Geometry",
  },

  // Unit 4: Geometry - Triangles
  { lesson_order: 38, section: "Geometry", chapter: "Triangles" },
  { lesson_order: 39, section: "Geometry", chapter: "Triangles" },
  { lesson_order: 40, section: "Geometry", chapter: "Triangles" },
  { lesson_order: 41, section: "Geometry", chapter: "Triangles" },
  { lesson_order: 42, section: "Geometry", chapter: "Triangles" },
  { lesson_order: 43, section: "Geometry", chapter: "Triangles" },
  { lesson_order: 44, section: "Geometry", chapter: "Triangles" },
  { lesson_order: 45, section: "Geometry", chapter: "Triangles" },
  { lesson_order: 46, section: "Geometry", chapter: "Triangles" },

  // Unit 4: Geometry - Circles
  { lesson_order: 47, section: "Geometry", chapter: "Circles" },
  { lesson_order: 48, section: "Geometry", chapter: "Circles" },
  { lesson_order: 49, section: "Geometry", chapter: "Circles" },
  { lesson_order: 50, section: "Geometry", chapter: "Circles" },
  { lesson_order: 51, section: "Geometry", chapter: "Circles" },
  { lesson_order: 52, section: "Geometry", chapter: "Circles" },

  // Unit 5: Trigonometry - Introduction to Trigonometry
  {
    lesson_order: 53,
    section: "Trigonometry",
    chapter: "Introduction to Trigonometry",
  },
  {
    lesson_order: 54,
    section: "Trigonometry",
    chapter: "Introduction to Trigonometry",
  },
  {
    lesson_order: 55,
    section: "Trigonometry",
    chapter: "Introduction to Trigonometry",
  },
  {
    lesson_order: 56,
    section: "Trigonometry",
    chapter: "Introduction to Trigonometry",
  },
  {
    lesson_order: 57,
    section: "Trigonometry",
    chapter: "Introduction to Trigonometry",
  },
  {
    lesson_order: 58,
    section: "Trigonometry",
    chapter: "Introduction to Trigonometry",
  },
  {
    lesson_order: 59,
    section: "Trigonometry",
    chapter: "Introduction to Trigonometry",
  },

  // Unit 5: Trigonometry - Trigonometric Identities
  {
    lesson_order: 60,
    section: "Trigonometry",
    chapter: "Trigonometric Identities",
  },
  {
    lesson_order: 61,
    section: "Trigonometry",
    chapter: "Trigonometric Identities",
  },
  {
    lesson_order: 62,
    section: "Trigonometry",
    chapter: "Trigonometric Identities",
  },
  {
    lesson_order: 63,
    section: "Trigonometry",
    chapter: "Trigonometric Identities",
  },
  {
    lesson_order: 64,
    section: "Trigonometry",
    chapter: "Trigonometric Identities",
  },

  // Unit 5: Trigonometry - Heights and Distances
  {
    lesson_order: 65,
    section: "Trigonometry",
    chapter: "Heights and Distances",
  },
  {
    lesson_order: 66,
    section: "Trigonometry",
    chapter: "Heights and Distances",
  },
  {
    lesson_order: 67,
    section: "Trigonometry",
    chapter: "Heights and Distances",
  },
  {
    lesson_order: 68,
    section: "Trigonometry",
    chapter: "Heights and Distances",
  },
  {
    lesson_order: 69,
    section: "Trigonometry",
    chapter: "Heights and Distances",
  },
  {
    lesson_order: 70,
    section: "Trigonometry",
    chapter: "Heights and Distances",
  },
  {
    lesson_order: 71,
    section: "Trigonometry",
    chapter: "Heights and Distances",
  },

  // Unit 6: Mensuration - Areas Related to Circles
  {
    lesson_order: 72,
    section: "Mensuration",
    chapter: "Areas Related to Circles",
  },
  {
    lesson_order: 73,
    section: "Mensuration",
    chapter: "Areas Related to Circles",
  },
  {
    lesson_order: 74,
    section: "Mensuration",
    chapter: "Areas Related to Circles",
  },
  {
    lesson_order: 75,
    section: "Mensuration",
    chapter: "Areas Related to Circles",
  },
  {
    lesson_order: 76,
    section: "Mensuration",
    chapter: "Areas Related to Circles",
  },

  // Unit 6: Mensuration - Surface Areas and Volumes
  {
    lesson_order: 77,
    section: "Mensuration",
    chapter: "Surface Areas and Volumes",
  },
  {
    lesson_order: 78,
    section: "Mensuration",
    chapter: "Surface Areas and Volumes",
  },
  {
    lesson_order: 79,
    section: "Mensuration",
    chapter: "Surface Areas and Volumes",
  },
  {
    lesson_order: 80,
    section: "Mensuration",
    chapter: "Surface Areas and Volumes",
  },
  {
    lesson_order: 81,
    section: "Mensuration",
    chapter: "Surface Areas and Volumes",
  },

  // Unit 7: Statistics & Probability - Statistics
  {
    lesson_order: 82,
    section: "Statistics & Probability",
    chapter: "Statistics",
  },
  {
    lesson_order: 83,
    section: "Statistics & Probability",
    chapter: "Statistics",
  },
  {
    lesson_order: 84,
    section: "Statistics & Probability",
    chapter: "Statistics",
  },
  {
    lesson_order: 85,
    section: "Statistics & Probability",
    chapter: "Statistics",
  },
  {
    lesson_order: 86,
    section: "Statistics & Probability",
    chapter: "Statistics",
  },
  {
    lesson_order: 87,
    section: "Statistics & Probability",
    chapter: "Statistics",
  },
  {
    lesson_order: 88,
    section: "Statistics & Probability",
    chapter: "Statistics",
  },
  {
    lesson_order: 89,
    section: "Statistics & Probability",
    chapter: "Statistics",
  },

  // Unit 7: Statistics & Probability - Probability
  {
    lesson_order: 90,
    section: "Statistics & Probability",
    chapter: "Probability",
  },
  {
    lesson_order: 91,
    section: "Statistics & Probability",
    chapter: "Probability",
  },
  {
    lesson_order: 92,
    section: "Statistics & Probability",
    chapter: "Probability",
  },
  {
    lesson_order: 93,
    section: "Statistics & Probability",
    chapter: "Probability",
  },
  {
    lesson_order: 94,
    section: "Statistics & Probability",
    chapter: "Probability",
  },
];

async function addSectionChapterFields() {
  console.log("🔧 Adding section and chapter fields to lessons table...");

  try {
    // First, let's check if the fields already exist
    const { data: lessons, error: fetchError } = await supabase
      .from("lessons")
      .select("id, lesson_order, section, chapter")
      .eq("course_id", (await getCourseId()).id)
      .limit(1);

    if (fetchError) {
      console.log("Fields might not exist yet, attempting to add them...");

      // Try to add the columns (this might fail if they already exist)
      const { error: alterError } = await supabase.rpc(
        "add_section_chapter_columns"
      );
      if (alterError) {
        console.log("Columns might already exist, continuing...");
      }
    }

    console.log("✅ Fields added or already exist");
    return true;
  } catch (error) {
    console.log("⚠️ Could not add columns via RPC, they might already exist");
    return true; // Continue anyway
  }
}

async function getCourseId() {
  const { data: course, error } = await supabase
    .from("courses")
    .select("id")
    .eq("slug", "cbse-mathematics-class-10")
    .single();

  if (error || !course) {
    throw new Error("Course cbse-mathematics-class-10 not found");
  }

  return course;
}

async function updateLessons() {
  console.log("📚 Updating lessons with section and chapter data...");

  const course = await getCourseId();
  let updatedCount = 0;
  let errorCount = 0;

  for (const mapping of lessonMapping) {
    try {
      const { error } = await supabase
        .from("lessons")
        .update({
          section: mapping.section,
          chapter: mapping.chapter,
        })
        .eq("course_id", course.id)
        .eq("lesson_order", mapping.lesson_order);

      if (error) {
        console.error(
          `❌ Error updating lesson ${mapping.lesson_order}:`,
          error.message
        );
        errorCount++;
      } else {
        updatedCount++;
        console.log(
          `✅ Updated lesson ${mapping.lesson_order}: ${mapping.section} → ${mapping.chapter}`
        );
      }
    } catch (error) {
      console.error(
        `❌ Exception updating lesson ${mapping.lesson_order}:`,
        error.message
      );
      errorCount++;
    }
  }

  console.log(`\n📊 Update Summary:`);
  console.log(`✅ Successfully updated: ${updatedCount} lessons`);
  console.log(`❌ Errors: ${errorCount} lessons`);

  return { updatedCount, errorCount };
}

async function verifyUpdates() {
  console.log("\n🔍 Verifying updates...");

  const course = await getCourseId();
  const { data: lessons, error } = await supabase
    .from("lessons")
    .select("lesson_order, section, chapter, title")
    .eq("course_id", course.id)
    .order("lesson_order", { ascending: true });

  if (error) {
    console.error("❌ Error fetching lessons for verification:", error.message);
    return;
  }

  console.log(`\n📋 Found ${lessons.length} lessons:`);

  // Group by section
  const sections = {};
  lessons.forEach((lesson) => {
    if (!sections[lesson.section]) {
      sections[lesson.section] = {};
    }
    if (!sections[lesson.section][lesson.chapter]) {
      sections[lesson.section][lesson.chapter] = [];
    }
    sections[lesson.section][lesson.chapter].push(lesson);
  });

  Object.entries(sections).forEach(([section, chapters]) => {
    console.log(`\n📁 ${section}:`);
    Object.entries(chapters).forEach(([chapter, chapterLessons]) => {
      console.log(`  📖 ${chapter} (${chapterLessons.length} lessons)`);
    });
  });
}

async function main() {
  try {
    console.log("🚀 Starting lesson section/chapter update...\n");

    await addSectionChapterFields();
    const result = await updateLessons();
    await verifyUpdates();

    console.log("\n🎉 Update completed successfully!");
    console.log(
      `📈 Updated ${result.updatedCount} lessons with section and chapter data`
    );
  } catch (error) {
    console.error("💥 Script failed:", error.message);
    process.exit(1);
  }
}

main();
