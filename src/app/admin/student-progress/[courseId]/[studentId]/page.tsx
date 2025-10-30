import { StudentProgressPageClient } from "./StudentProgressPageClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string; studentId: string }>;
}): Promise<Metadata> {
  const { courseId, studentId } = await params;

  return {
    title: "Student Progress - Admin Dashboard",
    description: "Track student progress and performance",
  };
}

export default async function StudentProgressPage({
  params,
}: {
  params: Promise<{ courseId: string; studentId: string }>;
}) {
  const resolvedParams = await params;

  return <StudentProgressPageClient params={resolvedParams} />;
}
