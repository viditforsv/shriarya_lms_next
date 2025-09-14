const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../../.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixTagsData() {
  try {
    console.log('🔍 Fetching questions with tag data...');
    
    // Fetch all questions with tags
    const { data: questions, error: fetchError } = await supabase
      .from('question_bank')
      .select('id, tags')
      .not('tags', 'is', null);

    if (fetchError) {
      console.error('❌ Error fetching questions:', fetchError);
      return;
    }

    console.log(`📊 Found ${questions.length} questions with tags`);

    let updatedCount = 0;
    let skippedCount = 0;

    for (const question of questions) {
      try {
        let newTags = [];
        
        // Handle different tag formats
        if (Array.isArray(question.tags)) {
          // Already an array - check if it needs cleaning
          newTags = question.tags
            .map(tag => {
              if (typeof tag === 'string') {
                // Split by newlines and commas, then clean
                return tag.split(/[\n,;|]/)
                  .map(t => t.trim())
                  .filter(t => t.length > 0);
              }
              return tag;
            })
            .flat()
            .filter(tag => tag && tag.length > 0);
        } else if (typeof question.tags === 'string') {
          // String format - parse it
          const tagString = question.tags;
          
          if (tagString.startsWith('[') && tagString.endsWith(']')) {
            // JSON array format
            try {
              const parsed = JSON.parse(tagString);
              if (Array.isArray(parsed)) {
                newTags = parsed
                  .map(tag => {
                    if (typeof tag === 'string') {
                      return tag.split(/[\n,;|]/)
                        .map(t => t.trim())
                        .filter(t => t.length > 0);
                    }
                    return tag;
                  })
                  .flat()
                  .filter(tag => tag && tag.length > 0);
              }
            } catch (e) {
              // If JSON parsing fails, treat as regular string
              newTags = tagString.split(/[\n,;|]/)
                .map(t => t.trim())
                .filter(t => t.length > 0);
            }
          } else {
            // Regular string - split by common separators
            newTags = tagString.split(/[\n,;|]/)
              .map(t => t.trim())
              .filter(t => t.length > 0);
          }
        }

        // Remove duplicates and empty values
        newTags = [...new Set(newTags)].filter(tag => tag && tag.length > 0);

        // Only update if tags have changed
        const originalTags = Array.isArray(question.tags) ? question.tags : [question.tags];
        const tagsChanged = JSON.stringify(originalTags.sort()) !== JSON.stringify(newTags.sort());

        if (tagsChanged && newTags.length > 0) {
          console.log(`🔄 Updating question ${question.id}:`);
          console.log(`   Before: ${JSON.stringify(question.tags)}`);
          console.log(`   After:  ${JSON.stringify(newTags)}`);

          const { error: updateError } = await supabase
            .from('question_bank')
            .update({ tags: newTags })
            .eq('id', question.id);

          if (updateError) {
            console.error(`❌ Error updating question ${question.id}:`, updateError);
          } else {
            updatedCount++;
            console.log(`✅ Updated question ${question.id}`);
          }
        } else {
          skippedCount++;
          console.log(`⏭️  Skipped question ${question.id} (no changes needed)`);
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
      .select('id, tags')
      .not('tags', 'is', null)
      .limit(5);

    if (!verifyError && sampleQuestions) {
      console.log('📋 Sample results:');
      sampleQuestions.forEach(q => {
        console.log(`   ${q.id}: ${JSON.stringify(q.tags)}`);
      });
    }

  } catch (error) {
    console.error('❌ Script error:', error);
  }
}

// Run the script
fixTagsData();
