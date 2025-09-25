import { SeparatePDFLessonPage } from "@/components/SeparatePDFLessonPage";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
    assignmentId: string;
  }>;
}

export default async function PDFAssignmentPage({ params }: PageProps) {
  const { slug, assignmentId } = await params;

  const sampleAssignments = [
    {
      id: "assignment-1",
      title: "Number Systems - Practice Assignment",
      description:
        "Complete exercises on real numbers, rational and irrational numbers, number line representation",
      pdfUrl: "https://pdfobject.com/pdf/sample.pdf",
      dueDate: "2024-12-31",
      maxMarks: 25,
      instructions: "Solve all questions and upload your solutions as PDF",
    },
    {
      id: "assignment-2",
      title: "Polynomials - Problem Solving",
      description:
        "Practice problems on polynomials, factorization, algebraic identities, and remainder theorem",
      pdfUrl: "https://pdfobject.com/pdf/sample.pdf",
      dueDate: "2024-12-31",
      maxMarks: 30,
      instructions: "Show all working steps clearly",
    },
    {
      id: "assignment-3",
      title: "Coordinate Geometry - Worksheet",
      description:
        "Problems on plotting points, distance formula, section formula, and area of triangle",
      pdfUrl: "https://pdfobject.com/pdf/sample.pdf",
      dueDate: "2024-12-31",
      maxMarks: 20,
      instructions: "Use graph paper for plotting points",
    },
    {
      id: "assignment-4",
      title: "Linear Equations in Two Variables - Exercises",
      description:
        "Exercises on linear equations, solutions of a linear equation, graph of a linear equation in two variables",
      pdfUrl: "https://pdfobject.com/pdf/sample.pdf",
      dueDate: "2024-12-31",
      maxMarks: 25,
      instructions:
        "Solve all questions. Clearly label your graphs. Upload as PDF.",
    },
    {
      id: "assignment-5",
      title: "Introduction to Euclid's Geometry - Assignment",
      description:
        "Questions based on Euclid's definitions, axioms, and postulates. Focus on understanding the fundamental concepts of geometry.",
      pdfUrl: "https://pdfobject.com/pdf/sample.pdf",
      dueDate: "2024-12-31",
      maxMarks: 15,
      instructions:
        "Answer all theoretical questions concisely. Provide examples where appropriate. Upload as PDF.",
    },
  ];

  const assignment = sampleAssignments.find((a) => a.id === assignmentId);
  if (!assignment) {
    notFound();
  }

  return (
    <SeparatePDFLessonPage
      courseSlug={slug}
      assignmentId={assignmentId}
      assignments={sampleAssignments}
    />
  );
}
