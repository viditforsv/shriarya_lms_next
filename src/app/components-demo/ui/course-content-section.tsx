import { ChevronDown, Play, FileText, HelpCircle, Lock } from "lucide-react"

interface Lesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'document' | 'question' | 'practice'
  hasPreview: boolean
  isLocked: boolean
}

interface CourseContentSectionProps {
  title: string
  lectures: number
  duration: string
  lessons: Lesson[]
  isExpanded?: boolean
  onToggle?: () => void
  className?: string
}

const lessonIconMap = {
  video: Play,
  document: FileText,
  question: HelpCircle,
  practice: Play
}

export function CourseContentSection({ 
  title, 
  lectures, 
  duration, 
  lessons, 
  isExpanded = false, 
  onToggle,
  className = '' 
}: CourseContentSectionProps) {
  return (
    <div className={`border border-[#feefea] rounded-sm ${className}`}>
      {/* Section Header */}
      <div 
        className={`p-4 cursor-pointer transition-colors ${
          isExpanded ? 'bg-[#feefea]/30 border-b border-[#feefea]' : 'hover:bg-[#feefea]/30'
        }`}
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ChevronDown 
              className={`w-5 h-5 text-[#1e293b] transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`} 
            />
            <span className="font-semibold text-[#1e293b]">{title}</span>
          </div>
          <span className="text-sm text-muted-foreground">{lectures} lectures • {duration}</span>
        </div>
      </div>
      
      {/* Section Content - Expanded */}
      {isExpanded && (
        <div className="p-4 space-y-3">
          {lessons.map((lesson) => {
            const IconComponent = lessonIconMap[lesson.type]
            return (
              <div key={lesson.id} className="flex items-center justify-between pl-8">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-[#1e293b] flex items-center justify-center">
                    <IconComponent className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground">{lesson.title}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                  {lesson.hasPreview && (
                    <button className="px-3 py-1 bg-[#e27447] text-white text-xs rounded-sm hover:bg-[#e27447]/90">
                      Preview
                    </button>
                  )}
                  {lesson.isLocked && (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Convenience component for multiple sections
export function CourseContentSections({ 
  sections, 
  expandedSection, 
  onSectionToggle 
}: {
  sections: Array<{
    id: string
    title: string
    lectures: number
    duration: string
    lessons: Lesson[]
  }>
  expandedSection?: string
  onSectionToggle?: (sectionId: string) => void
}) {
  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <CourseContentSection
          key={section.id}
          title={section.title}
          lectures={section.lectures}
          duration={section.duration}
          lessons={section.lessons}
          isExpanded={expandedSection === section.id}
          onToggle={() => onSectionToggle?.(section.id)}
        />
      ))}
    </div>
  )
}
