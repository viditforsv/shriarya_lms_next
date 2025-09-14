const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createFlexibleQuestionStructure() {
  try {
    console.log("Creating flexible question structure...");

    // SQL commands to add flexible fields
    const sqlCommands = [
      // Add question content structure (JSON)
      `ALTER TABLE public.question_bank ADD COLUMN IF NOT EXISTS question_content jsonb DEFAULT '{}'::jsonb;`,

      // Add media attachments (JSON array)
      `ALTER TABLE public.question_bank ADD COLUMN IF NOT EXISTS media_attachments jsonb DEFAULT '[]'::jsonb;`,

      // Add solution content structure (JSON)
      `ALTER TABLE public.question_bank ADD COLUMN IF NOT EXISTS solution_content jsonb DEFAULT '{}'::jsonb;`,
    ];

    console.log("\n📋 SQL Commands to run in Supabase Dashboard:");
    console.log("===============================================");
    sqlCommands.forEach((sql, index) => {
      console.log(`${index + 1}. ${sql}`);
    });

    console.log("\n📝 Flexible Question Content Structure:");
    console.log("=========================================");
    const questionContentExample = {
      metadata: {
        question_number: "5",
        total_marks: 6,
        title: "Trigonometric Functions",
        description: "Function analysis and graphing",
      },
      sections: [
        {
          type: "text",
          content:
            "The function $f$ is defined by $f(x) = \\sin qx$, where $q > 0$. The following diagram shows part of the graph of $f$ for $0 \\le x \\le 4m$, where $x$ is in radians. There are $x$-intercepts at $x = 0, 2m$ and $4m$.",
          order: 1,
        },
        {
          type: "image",
          media_id: "main_diagram",
          caption: "Graph of f(x) = sin(qx)",
          order: 2,
        },
        {
          type: "sub_questions",
          content: [
            {
              part: "a",
              text: "Find an expression for $m$ in terms of $q$.",
              marks: 2,
              type: "subjective",
            },
            {
              part: "b",
              text: "The function $g$ is defined by $g(x) = 3 \\sin \\frac{2qx}{3}$, for $0 \\le x \\le 6m$. On the axes above, sketch the graph of $g$.",
              marks: 4,
              type: "subjective",
            },
          ],
          order: 3,
        },
      ],
    };
    console.log(JSON.stringify(questionContentExample, null, 2));

    console.log("\n🖼️ Media Attachments Structure:");
    console.log("=================================");
    const mediaAttachmentsExample = [
      {
        id: "main_diagram",
        type: "image",
        url: "https://shrividhyaclasses.b-cdn.net/ibdp_previous_year_questions/AAHL/sample_image_1.png",
        alt_text: "Graph of f(x) = sin(qx)",
        caption: "Main question diagram",
        order: 1,
      },
      {
        id: "solution_step_1",
        type: "image",
        url: "https://shrividhyaclasses.b-cdn.net/solutions/step1.png",
        alt_text: "Solution step 1",
        caption: "Finding the period",
        order: 2,
      },
    ];
    console.log(JSON.stringify(mediaAttachmentsExample, null, 2));

    console.log("\n📚 Solution Content Structure:");
    console.log("===============================");
    const solutionContentExample = {
      metadata: {
        total_steps: 3,
        difficulty: "medium",
      },
      sections: [
        {
          type: "step",
          step_number: 1,
          title: "Find the period",
          content:
            "Since $f(x) = \\sin(qx)$ has $x$-intercepts at $x = 0, 2m, 4m$, the period is $2m$.",
          explanation: "The period of $\\sin(qx)$ is $\\frac{2\\pi}{q}$.",
          order: 1,
        },
        {
          type: "step",
          step_number: 2,
          title: "Relate period to m",
          content:
            "Therefore, $\\frac{2\\pi}{q} = 2m$, so $m = \\frac{\\pi}{q}$.",
          order: 2,
        },
        {
          type: "step",
          step_number: 3,
          title: "Sketch g(x)",
          content:
            "For $g(x) = 3\\sin\\frac{2qx}{3}$, the amplitude is 3 and period is $\\frac{2\\pi}{\\frac{2q}{3}} = \\frac{3\\pi}{q} = 3m$.",
          media_id: "solution_step_1",
          order: 3,
        },
      ],
    };
    console.log(JSON.stringify(solutionContentExample, null, 2));

    console.log("\n✅ Update your sample question with:");
    console.log("====================================");

    const updateData = {
      question_content: questionContentExample,
      media_attachments: mediaAttachmentsExample,
      solution_content: solutionContentExample,
    };

    console.log("UPDATE public.question_bank SET");
    console.log(
      `  question_content = '${JSON.stringify(
        updateData.question_content
      )}'::jsonb,`
    );
    console.log(
      `  media_attachments = '${JSON.stringify(
        updateData.media_attachments
      )}'::jsonb,`
    );
    console.log(
      `  solution_content = '${JSON.stringify(
        updateData.solution_content
      )}'::jsonb`
    );
    console.log(`WHERE id = '6e801973-5373-4f1a-8646-a31157970240';`);

    console.log("\n🎯 Benefits of this approach:");
    console.log("=============================");
    console.log("✅ Flexible number of sub-parts (a, b, c, d, e, f...)");
    console.log("✅ Multiple images per question");
    console.log("✅ Multiple images in solutions");
    console.log("✅ Structured content with ordering");
    console.log("✅ Reusable media attachments");
    console.log("✅ No rigid schema constraints");
    console.log("✅ Easy to extend for new question types");
  } catch (error) {
    console.error("Error:", error);
  }
}

createFlexibleQuestionStructure();
