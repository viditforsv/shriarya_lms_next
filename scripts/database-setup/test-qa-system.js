const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testQASystem() {
  try {
    console.log("🧪 Testing QA System Functionality...");

    // Test 1: Fetch questions with QA data
    console.log("\n📋 Test 1: Fetching questions with QA data...");
    const { data: questions, error: questionsError } = await supabase
      .from("question_bank")
      .select(
        `
        id,
        question_text,
        difficulty,
        subject,
        question_qa!left(
          qa_status,
          priority_level,
          is_flagged,
          overall_rating
        )
      `
      )
      .eq("is_active", true)
      .limit(3);

    if (questionsError) {
      console.error("❌ Error fetching questions:", questionsError.message);
      return;
    }

    console.log(`✅ Successfully fetched ${questions.length} questions:`);
    questions.forEach((question, index) => {
      console.log(`\n📝 Question ${index + 1}:`);
      console.log(`   ID: ${question.id}`);
      console.log(`   Subject: ${question.subject}`);
      console.log(`   Difficulty: ${question.difficulty}`);

      if (question.question_qa && question.question_qa.length > 0) {
        const qa = question.question_qa[0];
        console.log(`   QA Status: ${qa.qa_status}`);
        console.log(`   Priority: ${qa.priority_level}`);
        console.log(`   Flagged: ${qa.is_flagged}`);
        console.log(`   Rating: ${qa.overall_rating || "Not rated"}`);
      } else {
        console.log("   QA Status: No QA record found");
      }
    });

    // Test 2: Update a QA record
    console.log("\n📝 Test 2: Updating QA record...");
    const firstQuestion = questions[0];
    if (firstQuestion.question_qa && firstQuestion.question_qa.length > 0) {
      const qaId = firstQuestion.question_qa[0].id;

      const { data: updatedQA, error: updateError } = await supabase
        .from("question_qa")
        .update({
          qa_status: "in_review",
          priority_level: "high",
          content_accuracy: 4,
          difficulty_appropriateness: 3,
          clarity_rating: 4,
          solution_quality: 5,
          review_notes: "Test review - looks good overall",
        })
        .eq("id", qaId)
        .select()
        .single();

      if (updateError) {
        console.error("❌ Error updating QA record:", updateError.message);
      } else {
        console.log("✅ Successfully updated QA record:");
        console.log(`   Status: ${updatedQA.qa_status}`);
        console.log(`   Priority: ${updatedQA.priority_level}`);
        console.log(`   Overall Rating: ${updatedQA.overall_rating}`);
        console.log(`   Review Notes: ${updatedQA.review_notes}`);
      }
    }

    // Test 3: Add a QA comment
    console.log("\n💬 Test 3: Adding QA comment...");
    if (firstQuestion.question_qa && firstQuestion.question_qa.length > 0) {
      const qaId = firstQuestion.question_qa[0].id;

      const { data: comment, error: commentError } = await supabase
        .from("qa_comments")
        .insert({
          qa_id: qaId,
          commenter_id: "00000000-0000-0000-0000-000000000000", // Dummy user ID
          comment_text:
            "This question looks good, but the solution could be clearer.",
          comment_type: "solution",
        })
        .select()
        .single();

      if (commentError) {
        console.error("❌ Error adding comment:", commentError.message);
      } else {
        console.log("✅ Successfully added QA comment:");
        console.log(`   Comment: ${comment.comment_text}`);
        console.log(`   Type: ${comment.comment_type}`);
      }
    }

    // Test 4: Check QA history
    console.log("\n📚 Test 4: Checking QA history...");
    if (firstQuestion.question_qa && firstQuestion.question_qa.length > 0) {
      const qaId = firstQuestion.question_qa[0].id;

      const { data: history, error: historyError } = await supabase
        .from("qa_history")
        .select("*")
        .eq("qa_id", qaId)
        .order("created_at", { ascending: false })
        .limit(3);

      if (historyError) {
        console.error("❌ Error fetching QA history:", historyError.message);
      } else {
        console.log(`✅ Found ${history.length} history entries:`);
        history.forEach((entry, index) => {
          console.log(
            `   ${index + 1}. ${entry.action}: ${entry.old_value} → ${
              entry.new_value
            }`
          );
        });
      }
    }

    console.log("\n🎉 QA System functionality test completed successfully!");
  } catch (error) {
    console.error("❌ Error in QA system test:", error.message);
  }
}

testQASystem();
