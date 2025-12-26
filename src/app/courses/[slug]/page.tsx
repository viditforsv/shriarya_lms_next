import { CoursePageClient } from "./CoursePageClient";
import type { Metadata } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://courses.preppeo.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    // Fetch course data for metadata
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || baseUrl
      }/api/courses/${slug}/with-template`,
      {
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );

    if (!response.ok) {
      return {
        title: "Course Not Found",
        description: "The course you are looking for does not exist.",
      };
    }

    const data = await response.json();
    const course = data.rendered || data.course;

    if (!course) {
      return {
        title: "Course Not Found",
        description: "The course you are looking for does not exist.",
      };
    }

    const title = course.title || "Preppeo LMS Course";
    const description =
      course.description?.substring(0, 160) || "Learn with Preppeo LMS";
    const curriculum = course.curriculum || "";
    const subject = course.subject || "";
    const price = course.price || 0;
    const thumbnail = course.thumbnail || course.thumbnail_url;

    // Build OG image URL with course parameters
    const ogImageParams = new URLSearchParams({
      title: title,
      description: description,
      curriculum: curriculum,
      subject: subject,
      price: price.toString(),
      thumbnail: thumbnail || "",
    });
    // Use absolute URL for OG images to work across all domains
    const ogImageUrl = `${baseUrl}/api/og-image?${ogImageParams.toString()}`;

    return {
      title: title,
      description: description,
      openGraph: {
        title: title,
        description: description,
        url: `${baseUrl}/courses/${slug}`,
        siteName: "Preppeo LMS",
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: [ogImageUrl],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Preppeo LMS Course",
      description: "Learn with Preppeo LMS",
    };
  }
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  console.log("CoursePage component mounted");
  const resolvedParams = await params;
  console.log("Params resolved:", resolvedParams);

  return <CoursePageClient courseParams={resolvedParams} />;
}
