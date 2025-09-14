const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../../.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addQuestionDisplayIds() {
  try {
    console.log('🔍 Adding human-readable question display IDs...');
    
    console.log('📝 Note: Please run the SQL script manually in Supabase SQL Editor to add the column');
    console.log('   File: add-question-display-ids.sql');
    console.log('   Or add this column manually:');
    console.log('   ALTER TABLE public.question_bank ADD COLUMN IF NOT EXISTS question_display_id VARCHAR(20) UNIQUE;');
    console.log('');

    // Fetch all active questions ordered by creation date
    const { data: questions, error: fetchError } = await supabase
      .from('question_bank')
      .select('id, subject, created_at')
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (fetchError) {
      console.error('❌ Error fetching questions:', fetchError);
      return;
    }

    console.log(`📊 Found ${questions.length} active questions`);

    let updatedCount = 0;
    let skippedCount = 0;

    // Generate display IDs
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const displayId = `Q${String(i + 1).padStart(3, '0')}`; // Q001, Q002, Q003, etc.

      try {
        // Check if this question already has a display ID
        const { data: existing, error: checkError } = await supabase
          .from('question_bank')
          .select('question_display_id')
          .eq('id', question.id)
          .single();

        if (checkError && checkError.code !== 'PGRST116') {
          console.error(`❌ Error checking question ${question.id}:`, checkError);
          continue;
        }

        if (existing && existing.question_display_id) {
          skippedCount++;
          console.log(`⏭️  Skipped question ${question.id} (already has ID: ${existing.question_display_id})`);
          continue;
        }

        // Update the question with display ID
        const { error: updateError } = await supabase
          .from('question_bank')
          .update({ question_display_id: displayId })
          .eq('id', question.id);

        if (updateError) {
          console.error(`❌ Error updating question ${question.id}:`, updateError);
        } else {
          updatedCount++;
          console.log(`✅ Updated question ${question.id} → ${displayId}`);
        }

      } catch (error) {
        console.error(`❌ Error processing question ${question.id}:`, error);
      }
    }

    console.log('\n📈 Summary:');
    console.log(`✅ Updated: ${updatedCount} questions`);
    console.log(`⏭️  Skipped: ${skippedCount} questions`);
    console.log(`📊 Total processed: ${questions.length} questions`);

    // Verify the results
    console.log('\n🔍 Verifying results...');
    const { data: sampleQuestions, error: verifyError } = await supabase
      .from('question_bank')
      .select('id, question_display_id, subject')
      .eq('is_active', true)
      .not('question_display_id', 'is', null)
      .order('question_display_id')
      .limit(10);

    if (!verifyError && sampleQuestions) {
      console.log('📋 Sample results:');
      sampleQuestions.forEach(q => {
        console.log(`   ${q.question_display_id}: ${q.subject} (${q.id})`);
      });
    }

  } catch (error) {
    console.error('❌ Script error:', error);
  }
}

// Alternative function for board-specific IDs
async function addBoardSpecificDisplayIds() {
  try {
    console.log('🔍 Adding board-specific question display IDs...');
    
    // Fetch questions grouped by subject/board
    const { data: questions, error: fetchError } = await supabase
      .from('question_bank')
      .select('id, subject, created_at')
      .eq('is_active', true)
      .order('subject')
      .order('created_at', { ascending: true });

    if (fetchError) {
      console.error('❌ Error fetching questions:', fetchError);
      return;
    }

    // Group by subject/board
    const groupedQuestions = {};
    questions.forEach(q => {
      const board = q.subject.includes('IBDP') ? 'IBDP' : 
                   q.subject.includes('CBSE') ? 'CBSE' : 
                   q.subject.includes('ICSE') ? 'ICSE' : 
                   q.subject.includes('IGCSE') ? 'IGCSE' : 'OTHER';
      
      if (!groupedQuestions[board]) {
        groupedQuestions[board] = [];
      }
      groupedQuestions[board].push(q);
    });

    let updatedCount = 0;

    // Generate board-specific IDs
    for (const [board, boardQuestions] of Object.entries(groupedQuestions)) {
      console.log(`\n📚 Processing ${board} questions (${boardQuestions.length} questions)`);
      
      for (let i = 0; i < boardQuestions.length; i++) {
        const question = boardQuestions[i];
        const displayId = `${board}-${String(i + 1).padStart(3, '0')}`;

        try {
          const { error: updateError } = await supabase
            .from('question_bank')
            .update({ question_display_id: displayId })
            .eq('id', question.id);

          if (updateError) {
            console.error(`❌ Error updating question ${question.id}:`, updateError);
          } else {
            updatedCount++;
            console.log(`✅ Updated question ${question.id} → ${displayId}`);
          }
        } catch (error) {
          console.error(`❌ Error processing question ${question.id}:`, error);
        }
      }
    }

    console.log(`\n📈 Total updated: ${updatedCount} questions`);

  } catch (error) {
    console.error('❌ Script error:', error);
  }
}

// Run the script
const useBoardSpecific = process.argv.includes('--board-specific');
if (useBoardSpecific) {
  addBoardSpecificDisplayIds();
} else {
  addQuestionDisplayIds();
}
