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
        className={cn("flex items-center bg-card p-4 rounded-sm", className)}
        {...props}
      >
        <ol className="flex items-center space-x-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index === 0 ? (
                // Home icon for first item
                <a
                  href={item.href || "#"}
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Home className="w-4 h-4" />
                </a>
              ) : (
                // Text items
                <a
                  href={item.href || "#"}
                  className={cn(
                    "transition-colors font-medium",
                    item.isActive 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </a>
              )}
              
              {/* Separator (chevron) - don't show after last item */}
              {index < items.length - 1 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground mx-3" />
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
