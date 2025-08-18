interface CourseStatsProps {
  rating?: number
  totalRatings?: number
  lessons?: number
  students?: number
  duration?: string
  lastUpdated?: string
  className?: string
}

export function CourseStats({ 
  rating = 0, 
  totalRatings = 0, 
  lessons = 0, 
  students = 0, 
  duration = '', 
  lastUpdated = '',
  className = '' 
}: CourseStatsProps) {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
      </svg>
    ))
  }

  return (
    <div className={`flex flex-wrap items-center space-x-8 ${className}`}>
      {/* Rating */}
      {rating > 0 && (
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-[#1e293b]">{rating}</span>
          <div className="flex space-x-1">
            {renderStars(rating)}
          </div>
          {totalRatings > 0 && (
            <span className="text-sm text-muted-foreground">({totalRatings.toLocaleString()} ratings)</span>
          )}
        </div>
      )}
      
      {/* Lessons */}
      {lessons > 0 && (
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-[#1e293b]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-muted-foreground">{lessons} Lessons</span>
        </div>
      )}
      
      {/* Students */}
      {students > 0 && (
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-[#1e293b]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span className="text-sm text-muted-foreground">{students.toLocaleString()} Students</span>
        </div>
      )}
      
      {/* Duration */}
      {duration && (
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-[#1e293b]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-muted-foreground">{duration}</span>
        </div>
      )}
      
      {/* Last Updated */}
      {lastUpdated && (
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-[#1e293b]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-muted-foreground">Last updated {lastUpdated}</span>
        </div>
      )}
    </div>
  )
}
