import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showPageNumbers?: boolean
  showNavigation?: boolean
  className?: string
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    showPageNumbers = true, 
    showNavigation = true,
    className 
  }, ref) => {
    const getVisiblePages = () => {
      const delta = 2
      const range = []
      const rangeWithDots = []

      for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        range.push(i)
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...')
      } else {
        rangeWithDots.push(1)
      }

      rangeWithDots.push(...range)

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages)
      } else {
        rangeWithDots.push(totalPages)
      }

      return rangeWithDots
    }

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange(page)
      }
    }

    if (totalPages <= 1) return null

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center space-x-2", className)}
        role="navigation"
        aria-label="Pagination"
      >
        {/* Previous Button */}
        {showNavigation && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "inline-flex items-center justify-center h-10 px-3 text-sm font-medium rounded-sm transition-colors",
              "border border-[#e2e8f0] bg-white text-[#1e293b]",
              "hover:bg-[#f8fafc] hover:border-[#cbd5e1] hover:text-[#1e293b]",
              "focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-[#e2e8f0]"
            )}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </button>
        )}

        {/* Page Numbers */}
        {showPageNumbers && (
          <div className="flex items-center space-x-1">
            {getVisiblePages().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="inline-flex items-center justify-center h-10 px-3 text-sm font-medium text-[#6b7280]">
                    <MoreHorizontal className="h-4 w-4" />
                  </span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page as number)}
                    className={cn(
                      "inline-flex items-center justify-center h-10 px-3 text-sm font-medium rounded-sm transition-colors",
                      "border border-[#e2e8f0]",
                      page === currentPage
                        ? "bg-[#1e293b] text-white border-[#1e293b] hover:bg-[#0f172a]"
                        : "bg-white text-[#1e293b] hover:bg-[#f8fafc] hover:border-[#cbd5e1]",
                      "focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:ring-offset-2"
                    )}
                    aria-label={`Go to page ${page}`}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Next Button */}
        {showNavigation && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              "inline-flex items-center justify-center h-10 px-3 text-sm font-medium rounded-sm transition-colors",
              "border border-[#e2e8f0] bg-white text-[#1e293b]",
              "hover:bg-[#f8fafc] hover:border-[#cbd5e1] hover:text-[#1e293b]",
              "focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-[#e2e8f0]"
            )}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </button>
        )}
      </div>
    )
  }
)
Pagination.displayName = "Pagination"

export { Pagination }
