import * as React from "react"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn("flex items-center bg-white p-4 rounded-lg border border-gray-200", className)}
        {...props}
      >
        <ol className="flex items-center space-x-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index === 0 ? (
                // Home icon for first item
                <a
                  href={item.href || "#"}
                  className="flex items-center text-[#3A3A3A] hover:text-[#1A1A1A] transition-colors"
                >
                  <Home className="w-4 h-4" />
                </a>
              ) : (
                // Text items
                <a
                  href={item.href || "#"}
                  className="text-[#3A3A3A] hover:text-[#1A1A1A] transition-colors font-medium"
                >
                  {item.label}
                </a>
              )}
              
              {/* Separator (chevron) - don't show after last item */}
              {index < items.length - 1 && (
                <ChevronRight className="w-4 h-4 text-[#3A3A3A] mx-3" />
              )}
            </li>
          ))}
        </ol>
      </nav>
    )
  }
)
Breadcrumb.displayName = "Breadcrumb"

export { Breadcrumb }
