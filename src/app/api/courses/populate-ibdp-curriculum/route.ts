import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// IBDP Mathematics AA HL Complete Curriculum Structure
const IBDP_MATH_AA_HL_CURRICULUM = {
  units: [
    {
      unit_name: "Number and Algebra",
      unit_order: 1,
      description:
        "Operations with numbers, arithmetic and geometric sequences and series, financial applications, exponents, logarithms, binomial theorem, and complex numbers.",
      chapters: [
        {
          chapter_name: "Sequences and Series",
          chapter_order: 1,
          description:
            "Arithmetic and geometric sequences, series, and their applications",
        },
        {
          chapter_name: "Exponents and Logarithms",
          chapter_order: 2,
          description:
            "Exponential and logarithmic functions, laws, and applications",
        },
        {
          chapter_name: "Complex Numbers",
          chapter_order: 3,
          description:
            "Complex number arithmetic, polar form, and De Moivre's theorem",
        },
        {
          chapter_name: "Binomial Theorem",
          chapter_order: 4,
          description: "Binomial expansion and applications",
        },
      ],
    },
    {
      unit_name: "Functions",
      unit_order: 2,
      description:
        "Concepts and properties of functions, transformations, inverse functions, composite functions, and modeling with functions.",
      chapters: [
        {
          chapter_name: "Function Concepts",
          chapter_order: 1,
          description: "Domain, range, and function properties",
        },
        {
          chapter_name: "Function Transformations",
          chapter_order: 2,
          description: "Translations, reflections, and scaling of functions",
        },
        {
          chapter_name: "Inverse Functions",
          chapter_order: 3,
          description: "Inverse function concepts and applications",
        },
        {
          chapter_name: "Composite Functions",
          chapter_order: 4,
          description: "Function composition and applications",
        },
      ],
    },
    {
      unit_name: "Geometry and Trigonometry",
      unit_order: 3,
      description:
        "Properties of shapes, trigonometric ratios, sine and cosine rules, radian measure, circular functions, trigonometric identities, and vectors.",
      chapters: [
        {
          chapter_name: "Trigonometric Functions",
          chapter_order: 1,
          description: "Sine, cosine, tangent functions and their properties",
        },
        {
          chapter_name: "Trigonometric Identities",
          chapter_order: 2,
          description: "Fundamental identities and their applications",
        },
        {
          chapter_name: "Sine and Cosine Rules",
          chapter_order: 3,
          description: "Triangle solving using trigonometric rules",
        },
        {
          chapter_name: "Vectors",
          chapter_order: 4,
          description: "Vector operations, dot product, and applications",
        },
        {
          chapter_name: "Circular Functions",
          chapter_order: 5,
          description: "Unit circle and circular function properties",
        },
      ],
    },
    {
      unit_name: "Statistics and Probability",
      unit_order: 4,
      description:
        "Data collection and analysis, measures of central tendency and dispersion, probability concepts, discrete and continuous random variables, binomial and normal distributions.",
      chapters: [
        {
          chapter_name: "Descriptive Statistics",
          chapter_order: 1,
          description: "Measures of central tendency and dispersion",
        },
        {
          chapter_name: "Probability Concepts",
          chapter_order: 2,
          description: "Basic probability theory and applications",
        },
        {
          chapter_name: "Discrete Random Variables",
          chapter_order: 3,
          description: "Binomial distribution and discrete probability",
        },
        {
          chapter_name: "Continuous Random Variables",
          chapter_order: 4,
          description: "Normal distribution and continuous probability",
        },
      ],
    },
    {
      unit_name: "Calculus",
      unit_order: 5,
      description:
        "Limits, differentiation and its applications, integration and its applications, differential equations, and kinematics.",
      chapters: [
        {
          chapter_name: "Limits and Continuity",
          chapter_order: 1,
          description: "Limit concepts and continuity of functions",
        },
        {
          chapter_name: "Differentiation",
          chapter_order: 2,
          description: "Derivatives, rules, and applications",
        },
        {
          chapter_name: "Integration",
          chapter_order: 3,
          description:
            "Antiderivatives, integration techniques, and applications",
        },
        {
          chapter_name: "Differential Equations",
          chapter_order: 4,
          description: "First-order differential equations and applications",
        },
        {
          chapter_name: "Kinematics",
          chapter_order: 5,
          description: "Motion problems using calculus",
        },
      ],
    },
  ],
};

export async function POST() {
  try {
    const supabase = await createClient();

    // Get the IBDP Mathematics AA HL course
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", "ibdp-mathematics-aa-hl")
      .single();

    if (courseError || !course) {
      return NextResponse.json(
        { error: "IBDP Mathematics AA HL course not found" },
        { status: 404 }
      );
    }

    const courseId = course.id;
    const results = {
      unitsCreated: 0,
      chaptersCreated: 0,
      errors: [] as string[],
    };

    // Process each unit
    for (const unitData of IBDP_MATH_AA_HL_CURRICULUM.units) {
      try {
        // Check if unit already exists
        const { data: existingUnit } = await supabase
          .from("courses_units")
          .select("id")
          .eq("course_id", courseId)
          .eq("unit_name", unitData.unit_name)
          .single();

        let unitId: string;

        if (existingUnit) {
          unitId = existingUnit.id;
          console.log(`Unit "${unitData.unit_name}" already exists`);
        } else {
          // Create unit
          const { data: unit, error: unitError } = await supabase
            .from("courses_units")
            .insert({
              course_id: courseId,
              unit_name: unitData.unit_name,
              unit_order: unitData.unit_order,
              description: unitData.description,
              is_locked: false,
            })
            .select("id")
            .single();

          if (unitError) {
            results.errors.push(
              `Failed to create unit "${unitData.unit_name}": ${unitError.message}`
            );
            continue;
          }

          unitId = unit.id;
          results.unitsCreated++;
          console.log(`Created unit: ${unitData.unit_name}`);
        }

        // Process chapters for this unit
        for (const chapterData of unitData.chapters) {
          try {
            // Check if chapter already exists
            const { data: existingChapter } = await supabase
              .from("courses_chapters")
              .select("id")
              .eq("unit_id", unitId)
              .eq("chapter_name", chapterData.chapter_name)
              .single();

            if (existingChapter) {
              console.log(
                `Chapter "${chapterData.chapter_name}" already exists`
              );
              continue;
            }

            // Create chapter
            const { error: chapterError } = await supabase
              .from("courses_chapters")
              .insert({
                unit_id: unitId,
                chapter_name: chapterData.chapter_name,
                chapter_order: chapterData.chapter_order,
                description: chapterData.description,
                is_locked: false,
              });

            if (chapterError) {
              results.errors.push(
                `Failed to create chapter "${chapterData.chapter_name}": ${chapterError.message}`
              );
              continue;
            }

            results.chaptersCreated++;
            console.log(`Created chapter: ${chapterData.chapter_name}`);
          } catch (error) {
            results.errors.push(
              `Error processing chapter "${chapterData.chapter_name}": ${error}`
            );
          }
        }
      } catch (error) {
        results.errors.push(
          `Error processing unit "${unitData.unit_name}": ${error}`
        );
      }
    }

    return NextResponse.json({
      message: "IBDP Mathematics AA HL curriculum populated successfully",
      results,
    });
  } catch (error) {
    console.error("Error populating IBDP curriculum:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to populate curriculum",
      },
      { status: 500 }
    );
  }
}
