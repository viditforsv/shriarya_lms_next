const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
require("dotenv").config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createQASystem() {
  try {
    console.log("🚀 Creating QA System...");

    // Step 1: Create main QA table
    console.log("📋 Creating question_qa table...");
    const qaTableSQL = `
      CREATE TABLE IF NOT EXISTS public.question_qa (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        question_id UUID NOT NULL REFERENCES public.question_bank(id) ON DELETE CASCADE,
        qa_status TEXT NOT NULL DEFAULT 'pending' CHECK (qa_status IN (
          'pending', 'in_review', 'needs_revision', 'approved', 'rejected', 'archived'
        )),
        reviewer_id UUID REFERENCES auth.users(id),
        review_date TIMESTAMP WITH TIME ZONE,
        review_notes TEXT,
        content_accuracy INTEGER CHECK (content_accuracy BETWEEN 1 AND 5),
        difficulty_appropriateness INTEGER CHECK (difficulty_appropriateness BETWEEN 1 AND 5),
        clarity_rating INTEGER CHECK (clarity_rating BETWEEN 1 AND 5),
        solution_quality INTEGER CHECK (solution_quality BETWEEN 1 AND 5),
        overall_rating DECIMAL(3,2) GENERATED ALWAYS AS (
          (COALESCE(content_accuracy, 0) + 
           COALESCE(difficulty_appropriateness, 0) + 
           COALESCE(clarity_rating, 0) + 
           COALESCE(solution_quality, 0)) / 4.0
        ) STORED,
        revision_count INTEGER DEFAULT 0,
        last_revision_date TIMESTAMP WITH TIME ZONE,
        revision_notes TEXT,
        is_flagged BOOLEAN DEFAULT FALSE,
        flag_reason TEXT,
        priority_level TEXT DEFAULT 'medium' CHECK (priority_level IN ('low', 'medium', 'high', 'urgent')),
        qa_tags TEXT[] DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // Step 2: Create QA comments table
    console.log("💬 Creating qa_comments table...");
    const commentsTableSQL = `
      CREATE TABLE IF NOT EXISTS public.qa_comments (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        qa_id UUID NOT NULL REFERENCES public.question_qa(id) ON DELETE CASCADE,
        commenter_id UUID NOT NULL REFERENCES auth.users(id),
        comment_text TEXT NOT NULL,
        comment_type TEXT DEFAULT 'general' CHECK (comment_type IN (
          'general', 'content', 'solution', 'formatting', 'difficulty', 'other'
        )),
        is_resolved BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // Step 3: Create QA history table
    console.log("📚 Creating qa_history table...");
    const historyTableSQL = `
      CREATE TABLE IF NOT EXISTS public.qa_history (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        qa_id UUID NOT NULL REFERENCES public.question_qa(id) ON DELETE CASCADE,
        action TEXT NOT NULL CHECK (action IN (
          'created', 'status_changed', 'reviewed', 'rated', 'commented', 
          'flagged', 'unflagged', 'revised', 'archived'
        )),
        old_value TEXT,
        new_value TEXT,
        action_by UUID REFERENCES auth.users(id),
        action_reason TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // Execute SQL using direct HTTP request
    const executeSQL = async (sql) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          },
          body: JSON.stringify({ sql }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`SQL execution failed: ${error}`);
      }

      return await response.json();
    };

    // Execute all SQL statements
    await executeSQL(qaTableSQL);
    console.log("✅ question_qa table created");

    await executeSQL(commentsTableSQL);
    console.log("✅ qa_comments table created");

    await executeSQL(historyTableSQL);
    console.log("✅ qa_history table created");

    // Step 4: Enable RLS
    console.log("🔒 Enabling RLS...");
    await executeSQL(
      "ALTER TABLE public.question_qa ENABLE ROW LEVEL SECURITY;"
    );
    await executeSQL(
      "ALTER TABLE public.qa_comments ENABLE ROW LEVEL SECURITY;"
    );
    await executeSQL(
      "ALTER TABLE public.qa_history ENABLE ROW LEVEL SECURITY;"
    );

    // Step 5: Create RLS policies
    console.log("🛡️ Creating RLS policies...");
    await executeSQL(
      'CREATE POLICY "Enable ALL for authenticated users" ON public.question_qa FOR ALL TO authenticated USING (true) WITH CHECK (true);'
    );
    await executeSQL(
      'CREATE POLICY "Enable ALL for authenticated users" ON public.qa_comments FOR ALL TO authenticated USING (true) WITH CHECK (true);'
    );
    await executeSQL(
      'CREATE POLICY "Enable ALL for authenticated users" ON public.qa_history FOR ALL TO authenticated USING (true) WITH CHECK (true);'
    );

    // Step 6: Create indexes
    console.log("📊 Creating indexes...");
    await executeSQL(
      "CREATE INDEX IF NOT EXISTS idx_question_qa_question_id ON public.question_qa(question_id);"
    );
    await executeSQL(
      "CREATE INDEX IF NOT EXISTS idx_question_qa_status ON public.question_qa(qa_status);"
    );
    await executeSQL(
      "CREATE INDEX IF NOT EXISTS idx_question_qa_reviewer ON public.question_qa(reviewer_id);"
    );
    await executeSQL(
      "CREATE INDEX IF NOT EXISTS idx_qa_comments_qa_id ON public.qa_comments(qa_id);"
    );
    await executeSQL(
      "CREATE INDEX IF NOT EXISTS idx_qa_history_qa_id ON public.qa_history(qa_id);"
    );

    // Step 7: Insert initial QA records for existing questions
    console.log("📝 Creating QA records for existing questions...");
    const { data: questions, error: questionsError } = await supabase
      .from("question_bank")
      .select("id");

    if (questionsError) {
      console.error("Error fetching questions:", questionsError);
    } else {
      const qaRecords = questions.map((q) => ({
        question_id: q.id,
        qa_status: "pending",
      }));

      const { error: insertError } = await supabase
        .from("question_qa")
        .insert(qaRecords);

      if (insertError) {
        console.error("Error inserting QA records:", insertError);
      } else {
        console.log(`✅ Created ${qaRecords.length} QA records`);
      }
    }

    console.log("🎉 QA System created successfully!");
  } catch (error) {
    console.error("❌ Error creating QA system:", error.message);
  }
}

createQASystem();
