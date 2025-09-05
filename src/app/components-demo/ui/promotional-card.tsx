import * as React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PromotionalCardProps {
  heading: string
  subtext: string
  buttonText: string
  buttonHref?: string
  className?: string
}

const PromotionalCard = React.forwardRef<HTMLDivElement, PromotionalCardProps>(
  ({ heading, subtext, buttonText, buttonHref = "#", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-sm bg-[#1e3a8a] p-8 text-white",
          className
        )}
        {...props}
      >
        {/* Abstract background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-8 w-32 h-32 rounded-full bg-blue-400 blur-xl"></div>
          <div className="absolute bottom-8 left-12 w-24 h-24 rounded-full bg-blue-300 blur-lg"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-blue-200 blur-md"></div>
        </div>

        {/* Content container */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Left side - Text content */}
          <div className="flex-1 max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-4 font-cardo">
              {heading}
            </h2>
            <p className="text-lg lg:text-xl text-blue-100 leading-relaxed font-dm-sans">
              {subtext}
            </p>
          </div>

          {/* Right side - CTA Button */}
          <div className="flex-shrink-0">
            <a
              href={buttonHref}
              className="inline-flex items-center gap-2 bg-[#E57342] hover:bg-[#D56538] text-white font-semibold px-8 py-4 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {buttonText}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    )
  }
)
PromotionalCard.displayName = "PromotionalCard"

export { PromotionalCard }
