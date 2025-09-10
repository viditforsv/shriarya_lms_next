'use client'

import { CourseSidebarExample } from '@/app/components-demo/ui/layout-components/course-sidebar'

export default function CourseSidebarDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1e293b] mb-4">
            Course Sidebar Navigation Component
          </h1>
          <p className="text-gray-600 mb-4">
            A comprehensive sidebar component combining Moodle&apos;s hierarchical structure with Notion&apos;s clean design.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Features:</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Hierarchical 3-level structure (Units → Chapters → Lessons)</li>
              <li>• Progress tracking with visual indicators</li>
              <li>• Collapsible sections with smooth animations</li>
              <li>• Status icons (completed, active, preview, locked)</li>
              <li>• Responsive design with mobile collapse</li>
              <li>• Clean, modern aesthetic with hover effects</li>
            </ul>
          </div>
        </div>
        
        <CourseSidebarExample />
      </div>
    </div>
  )
}
