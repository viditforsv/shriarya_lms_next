import { StudentProgressPageClient } from "./StudentProgressPageClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string; studentHash: string }>;
}): Promise<Metadata> {
  const { courseSlug, studentHash } = await params;

  return {
    title: "Student Progress - Admin Dashboard",
    description: "Track student progress and performance",
  };
}

export default async function StudentProgressPage({
  params,
}: {
  params: Promise<{ courseSlug: string; studentHash: string }>;
}) {
  const resolvedParams = await params;

  return <StudentProgressPageClient params={resolvedParams} />;
}
