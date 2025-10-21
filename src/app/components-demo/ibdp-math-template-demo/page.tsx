"use client";

import { IBDPMathLessonPage } from "@/components/IBDPMathTemplate";

// Sample data for demo
const sampleUnits = [
  {
    id: "unit-1",
    unit_name: "Algebra",
    unit_order: 1,
    chapters: [
      {
        id: "chapter-1-1",
        chapter_name: "Sequences and Series",
        chapter_order: 1,
        unit_id: "unit-1",
        lessons: [
          {
            id: "lesson-1-1-1",
            title: "Arithmetic Progression",
            slug: "arithmetic-progression",
            lesson_order: 1,
            chapter_id: "chapter-1-1",
          },
          {
            id: "lesson-1-1-2",
            title: "Geometric Progression",
            slug: "geometric-progression",
            lesson_order: 2,
            chapter_id: "chapter-1-1",
          },
          {
            id: "lesson-1-1-3",
            title: "Sum of Series",
            slug: "sum-of-series",
            lesson_order: 3,
            chapter_id: "chapter-1-1",
          },
        ],
      },
      {
        id: "chapter-1-2",
        chapter_name: "Functions",
        chapter_order: 2,
        unit_id: "unit-1",
        lessons: [
          {
            id: "lesson-1-2-1",
            title: "Domain and Range",
            slug: "domain-and-range",
            lesson_order: 1,
            chapter_id: "chapter-1-2",
          },
          {
            id: "lesson-1-2-2",
            title: "Composite Functions",
            slug: "composite-functions",
            lesson_order: 2,
            chapter_id: "chapter-1-2",
          },
        ],
      },
    ],
  },
  {
    id: "unit-2",
    unit_name: "Calculus",
    unit_order: 2,
    chapters: [
      {
        id: "chapter-2-1",
        chapter_name: "Differentiation",
        chapter_order: 1,
        unit_id: "unit-2",
        lessons: [
          {
            id: "lesson-2-1-1",
            title: "Basic Derivatives",
            slug: "basic-derivatives",
            lesson_order: 1,
            chapter_id: "chapter-2-1",
          },
          {
            id: "lesson-2-1-2",
            title: "Chain Rule",
            slug: "chain-rule",
            lesson_order: 2,
            chapter_id: "chapter-2-1",
          },
          {
            id: "lesson-2-1-3",
            title: "Product and Quotient Rules",
            slug: "product-quotient-rules",
            lesson_order: 3,
            chapter_id: "chapter-2-1",
          },
        ],
      },
      {
        id: "chapter-2-2",
        chapter_name: "Integration",
        chapter_order: 2,
        unit_id: "unit-2",
        lessons: [
          {
            id: "lesson-2-2-1",
            title: "Basic Integration",
            slug: "basic-integration",
            lesson_order: 1,
            chapter_id: "chapter-2-2",
          },
        ],
      },
    ],
  },
];

const sampleQuestions = [
  {
    id: "q1",
    question_text:
      "Find the sum of the first 20 terms of the arithmetic progression: $2, 5, 8, 11, ...$",
    tags: ["arithmetic progression", "sum of series", "sequences"],
    marks: 6,
    difficulty: 5,
    solution:
      "The first term $a = 2$ and common difference $d = 3$. Using the formula $S_n = \\frac{n}{2}(2a + (n-1)d)$, we get: $S_{20} = \\frac{20}{2}(2(2) + (20-1)(3)) = 10(4 + 57) = 610$",
  },
  {
    id: "q2",
    question_text:
      "An arithmetic sequence has first term $a_1 = 5$ and common difference $d = 3$. Find the value of $a_{10}$.",
    tags: ["arithmetic progression", "nth term"],
    marks: 4,
    difficulty: 3,
    solution:
      "Using the formula $a_n = a_1 + (n-1)d$, we have: $a_{10} = 5 + (10-1)(3) = 5 + 27 = 32$",
  },
  {
    id: "q3",
    question_text:
      "The sum of the first $n$ terms of an arithmetic series is given by $S_n = 3n^2 + 2n$. Find the first term and the common difference.",
    tags: ["arithmetic progression", "sum formula", "algebra"],
    marks: 8,
    difficulty: 7,
    solution:
      "We know that $S_1 = a_1 = 3(1)^2 + 2(1) = 5$. Also, $S_2 = a_1 + a_2 = 3(2)^2 + 2(2) = 16$. Therefore, $a_2 = 16 - 5 = 11$ and $d = a_2 - a_1 = 11 - 5 = 6$.",
  },
  {
    id: "q4",
    question_text:
      "Prove that the sum of the first $n$ odd numbers is $n^2$. Use mathematical induction.",
    tags: ["mathematical induction", "proof", "odd numbers"],
    marks: 10,
    difficulty: 8,
    solution:
      "**Base case:** For $n=1$, sum = 1 = $1^2$. **Inductive step:** Assume true for $n=k$: $1+3+5+...+(2k-1) = k^2$. For $n=k+1$: $1+3+5+...+(2k-1)+(2k+1) = k^2 + 2k + 1 = (k+1)^2$. By mathematical induction, the statement is true for all positive integers $n$.",
  },
  {
    id: "q5",
    question_text:
      "A sequence is defined by $u_1 = 3$ and $u_{n+1} = 2u_n - 1$. Find $u_2$, $u_3$, and $u_4$.",
    tags: ["recursive sequence", "sequences"],
    marks: 5,
    difficulty: 4,
    solution:
      "$u_2 = 2(3) - 1 = 5$, $u_3 = 2(5) - 1 = 9$, $u_4 = 2(9) - 1 = 17$",
  },
];

const currentLesson = {
  id: "lesson-1-1-1",
  title: "Arithmetic Progression",
  slug: "arithmetic-progression",
  lesson_order: 1,
  chapter_id: "chapter-1-1",
};

export default function IBDPMathTemplateDemoPage() {
  return (
    <div className="w-full h-screen">
      <IBDPMathLessonPage
        courseSlug="ibdp-mathematics-aa-hl"
        currentLessonSlug="arithmetic-progression"
        units={sampleUnits}
        currentLesson={currentLesson}
        questions={sampleQuestions}
        unitName="Algebra"
        chapterName="Sequences and Series"
        courseLinks={{
          subjectGuide:
            "https://shrividhyaclasses.b-cdn.net/misc_files/ibdp/aahl/Mathematics%20-%20Analysis%20and%20Approaches%20Subject%20Guide.pdf",
          formulaBooklet:
            "https://shrividhyaclasses.b-cdn.net/misc_files/ibdp/aahl/Math%20AA%20HL%20formula%20booklet.pdf",
        }}
        onProgressUpdate={(lessonId, progress) => {
          console.log(`Lesson ${lessonId} progress: ${progress}%`);
        }}
      />
    </div>
  );
}
