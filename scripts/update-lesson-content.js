const { createClient } = require("@supabase/supabase-js");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config({ path: "../.env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Demo key points for different topics
const demoKeyPoints = {
  "real-numbers": [
    "Real numbers include all rational and irrational numbers",
    "Every real number can be represented on the number line",
    "Real numbers are closed under addition, subtraction, multiplication, and division",
    "The set of real numbers is uncountable and infinite",
  ],
  polynomials: [
    "A polynomial is an expression with variables and coefficients",
    "Degree of a polynomial is the highest power of the variable",
    "Zeros of a polynomial are the values that make it equal to zero",
    "Remainder theorem helps find remainders without long division",
  ],
  "linear-equations": [
    "Linear equations in two variables have infinite solutions",
    "Graphical method helps visualize solutions",
    "Substitution and elimination are algebraic solution methods",
    "Consistent systems have solutions, inconsistent ones don't",
  ],
  "quadratic-equations": [
    "Standard form: ax² + bx + c = 0 where a ≠ 0",
    "Discriminant determines nature of roots",
    "Quadratic formula: x = (-b ± √(b²-4ac))/2a",
    "Factorization method works when roots are integers",
  ],
  "arithmetic-progression": [
    "AP is a sequence where difference between consecutive terms is constant",
    "Common difference 'd' can be positive, negative, or zero",
    "nth term formula: aₙ = a₁ + (n-1)d",
    "Sum of first n terms: Sₙ = n/2[2a₁ + (n-1)d]",
  ],
  "coordinate-geometry": [
    "Cartesian coordinate system uses x and y axes",
    "Distance formula: √[(x₂-x₁)² + (y₂-y₁)²]",
    "Section formula divides line segment in given ratio",
    "Midpoint formula: ((x₁+x₂)/2, (y₁+y₂)/2)",
  ],
  triangles: [
    "Similar triangles have proportional sides and equal angles",
    "Basic Proportionality Theorem (BPT) is fundamental",
    "AAA, SSS, and SAS are similarity criteria",
    "Similar triangles have equal ratios of corresponding sides",
  ],
  circles: [
    "Tangent is perpendicular to radius at point of contact",
    "Two tangents from external point are equal in length",
    "Angle between tangent and chord equals angle in alternate segment",
    "Power of a point theorem relates tangents and chords",
  ],
  trigonometry: [
    "Trigonometric ratios: sin, cos, tan, cosec, sec, cot",
    "Values at special angles: 0°, 30°, 45°, 60°, 90°",
    "Fundamental identity: sin²θ + cos²θ = 1",
    "Trigonometric ratios are defined for acute angles in right triangles",
  ],
  "heights-distances": [
    "Angle of elevation: angle above horizontal line",
    "Angle of depression: angle below horizontal line",
    "Use trigonometric ratios to find heights and distances",
    "Common angles: 30°, 45°, 60° have known trigonometric values",
  ],
  "areas-circles": [
    "Area of sector = (θ/360°) × πr²",
    "Area of segment = Area of sector - Area of triangle",
    "Central angle determines sector area",
    "Common central angles: 60°, 90°, 120°",
  ],
  "surface-areas-volumes": [
    "Surface area of combination = Sum of individual surface areas - Common areas",
    "Volume of combination = Sum of individual volumes",
    "Common shapes: cube, cuboid, sphere, hemisphere, cylinder, cone",
    "Conversion between different units is important",
  ],
  statistics: [
    "Mean is the average of all data points",
    "Median is the middle value when data is arranged in order",
    "Mode is the most frequently occurring value",
    "Grouped data requires different calculation methods",
  ],
  probability: [
    "Probability = Number of favorable outcomes / Total outcomes",
    "Probability ranges from 0 to 1",
    "Complementary events: P(A) + P(A') = 1",
    "Independent events: P(A ∩ B) = P(A) × P(B)",
  ],
};

// Generate demo content HTML
function generateDemoContent(title, topic) {
  const keyPoints = demoKeyPoints[topic] || demoKeyPoints["real-numbers"];

  return `<div class="lesson-content">
  <h2>${title}</h2>
  <div class="lesson-meta">
    <p><strong>Topic:</strong> ${topic.replace("-", " ").toUpperCase()}</p>
    <p><strong>Level:</strong> Class 10 CBSE</p>
  </div>
  
  <div class="lesson-body">
    <h3>Learning Objectives</h3>
    <ul>
      <li>Understand the fundamental concepts of ${title.toLowerCase()}</li>
      <li>Apply problem-solving techniques effectively</li>
      <li>Connect theoretical knowledge with practical applications</li>
      <li>Develop analytical thinking skills</li>
    </ul>
    
    <h3>Key Concepts</h3>
    <div class="concepts-grid">
      ${keyPoints
        .map(
          (point) => `<div class="concept-card">
        <h4>Concept</h4>
        <p>${point}</p>
      </div>`
        )
        .join("")}
    </div>
    
    <h3>Example Problems</h3>
    <div class="example-problem">
      <h4>Example 1: Basic Application</h4>
      <p><strong>Problem:</strong> Solve the following problem related to ${title.toLowerCase()}.</p>
      <div class="solution">
        <p><strong>Solution:</strong></p>
        <ol>
          <li>Identify the given information</li>
          <li>Apply the appropriate formula or method</li>
          <li>Calculate step by step</li>
          <li>Verify your answer</li>
        </ol>
      </div>
    </div>
    
    <h3>Practice Exercises</h3>
    <div class="practice-section">
      <p>Complete the following exercises to reinforce your understanding:</p>
      <ol>
        <li>Basic level problems (5 questions)</li>
        <li>Intermediate level problems (3 questions)</li>
        <li>Advanced level problems (2 questions)</li>
      </ol>
    </div>
    
    <h3>Real-World Applications</h3>
    <div class="applications">
      <p>This topic has applications in:</p>
      <ul>
        <li>Engineering and technology</li>
        <li>Scientific research</li>
        <li>Daily life problem solving</li>
        <li>Advanced mathematics</li>
      </ul>
    </div>
  </div>
</div>`;
}

// Generate demo content text
function generateDemoContentText(title, topic) {
  const keyPoints = demoKeyPoints[topic] || demoKeyPoints["real-numbers"];

  return `# ${title}

## Learning Objectives
- Understand the fundamental concepts of ${title.toLowerCase()}
- Apply problem-solving techniques effectively
- Connect theoretical knowledge with practical applications
- Develop analytical thinking skills

## Key Concepts
${keyPoints.map((point, index) => `${index + 1}. ${point}`).join("\n")}

## Example Problem
**Problem:** Solve the following problem related to ${title.toLowerCase()}.

**Solution:**
1. Identify the given information
2. Apply the appropriate formula or method
3. Calculate step by step
4. Verify your answer

## Practice Exercises
Complete the following exercises to reinforce your understanding:
- Basic level problems (5 questions)
- Intermediate level problems (3 questions)
- Advanced level problems (2 questions)

## Real-World Applications
This topic has applications in:
- Engineering and technology
- Scientific research
- Daily life problem solving
- Advanced mathematics`;
}

// Determine topic from lesson title
function getTopicFromTitle(title) {
  const titleLower = title.toLowerCase();

  if (titleLower.includes("real number")) return "real-numbers";
  if (titleLower.includes("polynomial")) return "polynomials";
  if (titleLower.includes("linear equation")) return "linear-equations";
  if (titleLower.includes("quadratic")) return "quadratic-equations";
  if (
    titleLower.includes("arithmetic progression") ||
    titleLower.includes("ap")
  )
    return "arithmetic-progression";
  if (titleLower.includes("coordinate")) return "coordinate-geometry";
  if (titleLower.includes("triangle")) return "triangles";
  if (titleLower.includes("circle")) return "circles";
  if (titleLower.includes("trigonometric") && !titleLower.includes("height"))
    return "trigonometry";
  if (titleLower.includes("height") || titleLower.includes("distance"))
    return "heights-distances";
  if (titleLower.includes("area") && titleLower.includes("circle"))
    return "areas-circles";
  if (titleLower.includes("surface") || titleLower.includes("volume"))
    return "surface-areas-volumes";
  if (titleLower.includes("statistic")) return "statistics";
  if (titleLower.includes("probability")) return "probability";

  return "real-numbers"; // default
}

async function updateLessonContent() {
  console.log("🚀 Starting lesson content update...");

  try {
    // Get all lessons
    const { data: lessons, error } = await supabase
      .from("lessons")
      .select("id, title, slug, key_points, content_html, content")
      .order("lesson_order");

    if (error) {
      console.error("❌ Error fetching lessons:", error);
      return;
    }

    console.log(`📊 Found ${lessons.length} lessons to update`);

    let updatedCount = 0;

    for (const lesson of lessons) {
      const topic = getTopicFromTitle(lesson.title);
      const keyPoints = demoKeyPoints[topic] || demoKeyPoints["real-numbers"];

      // Update lesson with demo content
      const { error: updateError } = await supabase
        .from("lessons")
        .update({
          key_points: keyPoints,
          content_html: generateDemoContent(lesson.title, topic),
          content: generateDemoContentText(lesson.title, topic),
        })
        .eq("id", lesson.id);

      if (updateError) {
        console.error(`❌ Error updating lesson ${lesson.slug}:`, updateError);
      } else {
        updatedCount++;
        console.log(`✅ Updated: ${lesson.title}`);
      }
    }

    console.log(`\n🎉 Content update completed!`);
    console.log(`✅ Successfully updated: ${updatedCount} lessons`);
  } catch (error) {
    console.error("❌ Update failed:", error);
  }
}

// Run the update
updateLessonContent()
  .then(() => {
    console.log("🏁 Update process completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Update process failed:", error);
    process.exit(1);
  });
