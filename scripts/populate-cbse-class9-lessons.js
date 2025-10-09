#!/usr/bin/env node

/**
 * Script to populate CBSE Class 9 Mathematics lessons in the database
 * This script creates all 15 lessons based on the syllabus structure
 */

// Course ID for CBSE Class 9 Mathematics
const COURSE_ID = "a7b20541-acbf-4406-a1fc-9a030378b608";

// Lesson data based on our syllabus structure
const lessons = [
  {
    title: "Real Numbers",
    slug: "real-numbers",
    lesson_order: 1,
    is_preview: true,
    unit_name: "Number Systems",
    chapter_name: "Real Numbers",
    content:
      "Understanding real numbers, irrational numbers, and their properties. Real numbers form the foundation of mathematics.",
    content_html:
      "<h2>Understanding Real Numbers</h2><p>Real numbers form the foundation of mathematics. In this lesson, we'll explore rational and irrational numbers.</p>",
    key_points: [
      "Real numbers include both rational and irrational numbers",
      "Every real number can be represented on the number line",
    ],
    video_url: "/videos/real-numbers.mp4",
    video_thumbnail: "/images/thumbnails/real-numbers.jpg",
  },
  {
    title: "Polynomials in One Variable",
    slug: "polynomials-intro",
    lesson_order: 2,
    is_preview: false,
    unit_name: "Polynomials",
    chapter_name: "Polynomials in One Variable",
    content:
      "Introduction to polynomials, their types, and basic operations. Polynomials are algebraic expressions with one or more terms.",
    content_html:
      "<h2>Introduction to Polynomials</h2><p>Polynomials are algebraic expressions with one or more terms. We'll learn about degrees and types.</p>",
    key_points: [
      "A polynomial is an algebraic expression with one or more terms",
      "The degree is the highest power of the variable",
    ],
    video_url: "/videos/polynomials.mp4",
    video_thumbnail: "/images/thumbnails/polynomials.jpg",
  },
  {
    title: "Cartesian System",
    slug: "cartesian-system",
    lesson_order: 3,
    is_preview: false,
    unit_name: "Coordinate Geometry",
    chapter_name: "Cartesian System",
    content:
      "Understanding coordinate plane, axes, and plotting points. The Cartesian coordinate system is a fundamental tool in mathematics.",
    content_html:
      "<h2>Understanding the Coordinate Plane</h2><p>The Cartesian coordinate system helps us locate points using coordinates.</p>",
    key_points: [
      "The coordinate plane has two perpendicular axes",
      "Points are represented by ordered pairs (x,y)",
    ],
    video_url: "/videos/cartesian-system.mp4",
    video_thumbnail: "/images/thumbnails/cartesian-system.jpg",
  },
  {
    title: "Linear Equations in Two Variables",
    slug: "linear-equations-intro",
    lesson_order: 4,
    is_preview: false,
    unit_name: "Linear Equations in Two Variables",
    chapter_name: "Linear Equations in Two Variables",
    content:
      "Understanding linear equations and their graphical representation. Linear equations in two variables are fundamental in algebra.",
    content_html:
      "<h2>Understanding Linear Equations</h2><p>Linear equations in two variables have infinitely many solutions and form straight lines when graphed.</p>",
    key_points: [
      "Linear equations have the form ax + by + c = 0",
      "They have infinitely many solutions",
    ],
    video_url: "/videos/linear-equations.mp4",
    video_thumbnail: "/images/thumbnails/linear-equations.jpg",
  },
  {
    title: "Euclid's Definitions, Axioms and Postulates",
    slug: "euclid-definitions",
    lesson_order: 5,
    is_preview: false,
    unit_name: "Introduction to Euclid's Geometry",
    chapter_name: "Euclid's Definitions, Axioms and Postulates",
    content:
      "Introduction to Euclidean geometry and its fundamental concepts. Euclid's geometry forms the basis of modern mathematics.",
    content_html:
      "<h2>Foundations of Euclidean Geometry</h2><p>Euclid's definitions, axioms, and postulates form the foundation of plane geometry.</p>",
    key_points: [
      "Euclid's definitions establish basic geometric terms",
      "Axioms are self-evident truths",
    ],
    video_url: "/videos/euclid-geometry.mp4",
    video_thumbnail: "/images/thumbnails/euclid-geometry.jpg",
  },
  {
    title: "Basic Terms and Definitions",
    slug: "lines-angles-basic",
    lesson_order: 6,
    is_preview: false,
    unit_name: "Lines and Angles",
    chapter_name: "Basic Terms and Definitions",
    content:
      "Understanding types of angles and their properties. Lines and angles are fundamental geometric concepts.",
    content_html:
      "<h2>Understanding Lines and Angles</h2><p>Lines and angles are fundamental geometric concepts with various types and properties.</p>",
    key_points: [
      "Lines can be parallel, perpendicular, or intersecting",
      "Angles are classified by their measure",
    ],
    video_url: "/videos/lines-angles.mp4",
    video_thumbnail: "/images/thumbnails/lines-angles.jpg",
  },
  {
    title: "Congruence of Triangles",
    slug: "triangles-congruence",
    lesson_order: 7,
    is_preview: false,
    unit_name: "Triangles",
    chapter_name: "Congruence of Triangles",
    content:
      "Understanding triangle congruence and its criteria. Triangle congruence is a fundamental concept in geometry.",
    content_html:
      "<h2>Understanding Triangle Congruence</h2><p>Two triangles are congruent if their corresponding sides and angles are equal.</p>",
    key_points: [
      "Congruent triangles have equal corresponding sides and angles",
      "Five criteria: SSS, SAS, ASA, AAS, RHS",
    ],
    video_url: "/videos/triangles.mp4",
    video_thumbnail: "/images/thumbnails/triangles.jpg",
  },
  {
    title: "Properties of Quadrilaterals",
    slug: "quadrilaterals-properties",
    lesson_order: 8,
    is_preview: false,
    unit_name: "Quadrilaterals",
    chapter_name: "Properties of Quadrilaterals",
    content:
      "Understanding different types of quadrilaterals and their properties. Quadrilaterals are four-sided polygons with unique properties.",
    content_html:
      "<h2>Understanding Quadrilaterals</h2><p>Quadrilaterals are four-sided polygons with unique properties and characteristics.</p>",
    key_points: [
      "Quadrilaterals have four sides and four angles",
      "Sum of interior angles is always 360°",
    ],
    video_url: "/videos/quadrilaterals.mp4",
    video_thumbnail: "/images/thumbnails/quadrilaterals.jpg",
  },
  {
    title: "Areas of Parallelograms and Triangles",
    slug: "areas-basic",
    lesson_order: 9,
    is_preview: false,
    unit_name: "Areas of Parallelograms and Triangles",
    chapter_name: "Areas of Parallelograms and Triangles",
    content:
      "Calculating areas of parallelograms and triangles. Understanding area calculations is essential in geometry.",
    content_html:
      "<h2>Calculating Areas</h2><p>Understanding area calculations for parallelograms and triangles is essential in geometry.</p>",
    key_points: [
      "Area of parallelogram = base × height",
      "Area of triangle = ½ × base × height",
    ],
    video_url: "/videos/areas.mp4",
    video_thumbnail: "/images/thumbnails/areas.jpg",
  },
  {
    title: "Circles and its Related Terms",
    slug: "circles-basic",
    lesson_order: 10,
    is_preview: false,
    unit_name: "Circles",
    chapter_name: "Circles and its Related Terms",
    content:
      "Understanding circles, chords, and related geometric properties. Circles are fundamental geometric shapes with unique properties.",
    content_html:
      "<h2>Understanding Circles</h2><p>Circles are fundamental geometric shapes with unique properties and terminology.</p>",
    key_points: [
      "Circle is the set of points equidistant from center",
      "All radii of a circle are equal",
    ],
    video_url: "/videos/circles.mp4",
    video_thumbnail: "/images/thumbnails/circles.jpg",
  },
  {
    title: "Basic Constructions",
    slug: "basic-constructions",
    lesson_order: 11,
    is_preview: false,
    unit_name: "Constructions",
    chapter_name: "Basic Constructions",
    content:
      "Learning geometric constructions using compass and ruler. Constructions are precise geometric drawings using only compass and ruler.",
    content_html:
      "<h2>Geometric Constructions</h2><p>Constructions are precise geometric drawings using only compass and ruler.</p>",
    key_points: [
      "Constructions use only compass and unmarked ruler",
      "Angle bisector divides angle into two equal parts",
    ],
    video_url: "/videos/constructions.mp4",
    video_thumbnail: "/images/thumbnails/constructions.jpg",
  },
  {
    title: "Area of Triangle using Heron's Formula",
    slug: "heron-formula-area",
    lesson_order: 12,
    is_preview: false,
    unit_name: "Heron's Formula",
    chapter_name: "Area of Triangle using Heron's Formula",
    content:
      "Calculating triangle area using Heron's formula. Heron's formula allows us to calculate the area of a triangle when we know all three sides.",
    content_html:
      "<h2>Heron's Formula</h2><p>Heron's formula allows us to calculate the area of a triangle when we know all three sides.</p>",
    key_points: [
      "Heron's formula: Area = √[s(s-a)(s-b)(s-c)]",
      "s = semi-perimeter = (a+b+c)/2",
    ],
    video_url: "/videos/heron-formula.mp4",
    video_thumbnail: "/images/thumbnails/heron-formula.jpg",
  },
  {
    title: "Surface Areas and Volumes",
    slug: "surface-areas-volumes-basic",
    lesson_order: 13,
    is_preview: false,
    unit_name: "Surface Areas and Volumes",
    chapter_name: "Surface Areas and Volumes",
    content:
      "Calculating surface areas and volumes of 3D shapes. Surface areas and volumes are important concepts in 3D geometry.",
    content_html:
      "<h2>Understanding 3D Shapes</h2><p>Surface areas and volumes are important concepts in 3D geometry.</p>",
    key_points: [
      "Surface area is the total area of all faces",
      "Volume is the space occupied by the shape",
    ],
    video_url: "/videos/surface-areas-volumes.mp4",
    video_thumbnail: "/images/thumbnails/surface-areas-volumes.jpg",
  },
  {
    title: "Collection and Presentation of Data",
    slug: "statistics-basic",
    lesson_order: 14,
    is_preview: false,
    unit_name: "Statistics",
    chapter_name: "Collection and Presentation of Data",
    content:
      "Understanding data collection, presentation, and analysis. Statistics is the science of collecting, organizing, and analyzing data.",
    content_html:
      "<h2>Understanding Statistics</h2><p>Statistics is the science of collecting, organizing, and analyzing data.</p>",
    key_points: [
      "Statistics involves collecting, organizing, and analyzing data",
      "Mean, median, and mode are measures of central tendency",
    ],
    video_url: "/videos/statistics.mp4",
    video_thumbnail: "/images/thumbnails/statistics.jpg",
  },
  {
    title: "Probability",
    slug: "probability-basic",
    lesson_order: 15,
    is_preview: false,
    unit_name: "Probability",
    chapter_name: "Probability",
    content:
      "Understanding probability concepts and applications. Probability is the measure of how likely an event is to occur.",
    content_html:
      "<h2>Understanding Probability</h2><p>Probability is the measure of how likely an event is to occur.</p>",
    key_points: [
      "Probability measures likelihood of events",
      "Range is from 0 (impossible) to 1 (certain)",
    ],
    video_url: "/videos/probability.mp4",
    video_thumbnail: "/images/thumbnails/probability.jpg",
  },
];

// Function to create lessons via API
async function createLessons() {
  console.log("🚀 Starting to create CBSE Class 9 lessons...");
  console.log(`📚 Course ID: ${COURSE_ID}`);
  console.log(`📝 Total lessons to create: ${lessons.length}`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];

    try {
      console.log(
        `\n📖 Creating lesson ${i + 1}/${lessons.length}: ${lesson.title}`
      );

      const response = await fetch("http://localhost:3000/api/lessons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_id: COURSE_ID,
          title: lesson.title,
          slug: lesson.slug,
          lesson_order: lesson.lesson_order,
          is_preview: lesson.is_preview,
          content: lesson.content,
          content_html: lesson.content_html,
          key_points: lesson.key_points,
          video_url: lesson.video_url,
          video_thumbnail: lesson.video_thumbnail,
          unit_name: lesson.unit_name,
          chapter_name: lesson.chapter_name,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Successfully created: ${lesson.title}`);
        console.log(`   📋 Lesson ID: ${result.lesson.id}`);
        successCount++;
      } else {
        const error = await response.text();
        console.log(`❌ Failed to create: ${lesson.title}`);
        console.log(`   Error: ${error}`);
        errorCount++;
      }

      // Add a small delay to avoid overwhelming the API
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.log(`❌ Error creating lesson: ${lesson.title}`);
      console.log(`   Error: ${error.message}`);
      errorCount++;
    }
  }

  console.log("\n📊 Summary:");
  console.log(`✅ Successfully created: ${successCount} lessons`);
  console.log(`❌ Failed to create: ${errorCount} lessons`);
  console.log(`📚 Total processed: ${lessons.length} lessons`);

  if (successCount === lessons.length) {
    console.log("\n🎉 All lessons created successfully!");
    console.log(
      "🔗 You can now visit: http://localhost:3000/courses/cbse-mathematics-class-9"
    );
  } else {
    console.log(
      "\n⚠️  Some lessons failed to create. Please check the errors above."
    );
  }
}

// Function to verify lessons were created
async function verifyLessons() {
  console.log("\n🔍 Verifying lessons in database...");

  try {
    const response = await fetch(
      `http://localhost:3000/api/lessons?course_slug=cbse-mathematics-class-9`
    );

    if (response.ok) {
      const result = await response.json();
      console.log(`📚 Found ${result.lessons.length} lessons in database`);

      if (result.lessons.length > 0) {
        console.log("\n📋 Lesson list:");
        result.lessons.forEach((lesson, index) => {
          console.log(`   ${index + 1}. ${lesson.title} (${lesson.slug})`);
        });
      }
    } else {
      console.log("❌ Failed to verify lessons");
    }
  } catch (error) {
    console.log(`❌ Error verifying lessons: ${error.message}`);
  }
}

// Main execution
async function main() {
  console.log("🎯 CBSE Class 9 Mathematics Lesson Creation Script");
  console.log("==================================================");

  // Check if API is running
  try {
    const healthCheck = await fetch("http://localhost:3000/api/courses");
    if (!healthCheck.ok) {
      throw new Error("API not responding");
    }
    console.log("✅ API is running");
  } catch (error) {
    console.log(
      "❌ API is not running. Please start the development server first:"
    );
    console.log("   npm run dev");
    process.exit(1);
  }

  // Create lessons
  await createLessons();

  // Verify lessons
  await verifyLessons();

  console.log("\n🏁 Script completed!");
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { createLessons, verifyLessons, lessons };
