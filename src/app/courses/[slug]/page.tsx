import { CoursePageClient } from './CoursePageClient'

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  console.log('CoursePage component mounted')
  const resolvedParams = await params
  console.log('Params resolved:', resolvedParams)
  
  return <CoursePageClient courseParams={resolvedParams} />
}

