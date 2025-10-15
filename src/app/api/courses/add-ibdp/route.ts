import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createClient();

    // Add IBDP course to database
    const { data: course, error } = await supabase
      .from("courses")
      .insert({
        title: "IBDP Mathematics Analysis & Approaches HL",
        description:
          "Advanced Higher Level Mathematics course for IBDP students focusing on analytical approaches, calculus, and mathematical reasoning.",
        slug: "ibdp-mathematics-aa-hl",
        price: 399,
        status: "published",
        template_data: {
          curriculum: "IBDP",
          subject: "Mathematics",
          grade: "Higher Level",
          level: "Analysis & Approaches HL",
          duration: "250 hours",
          lessons: 35,
          thumbnail: "/images/courses/ibdp-math-aa-hl.jpg",
          features: [
            "Complete IBDP AA HL curriculum",
            "Advanced calculus and analysis",
            "Complex numbers and sequences",
          ],
          prerequisites: [
            "Strong foundation in mathematics",
            "Previous IBDP or equivalent experience",
          ],
          learningOutcomes: [
            "Master advanced mathematical concepts",
            "Develop analytical thinking skills",
          ],
          tags: [
            "IBDP",
            "Mathematics",
            "Analysis & Approaches",
            "HL",
            "International",
            "University Prep",
          ],
        },
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      course,
      message: "IBDP course added successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to add IBDP course",
      },
      { status: 500 }
    );
  }
}
