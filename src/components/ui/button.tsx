import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowUpRight, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-[#1e293b] text-white hover:bg-[#0f172a] focus:ring-[#1e293b] shadow-sm",
        secondary: "bg-white text-[#1e293b] border border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-[#cbd5e1] focus:ring-[#1e293b] shadow-sm",
        loadMore: "bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0] focus:ring-[#475569] border border-[#e2e8f0]",
        outline: "bg-white text-[#1e293b] border border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-[#cbd5e1] focus:ring-[#1e293b] shadow-sm",
        coral: "bg-[#e27447] text-white hover:bg-[#d1653a] focus:ring-[#e27447] shadow-sm",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2",
        lg: "h-14 px-8 py-4",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  showArrow?: boolean
  showChevron?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, showArrow = false, showChevron = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {showArrow && (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
        {showChevron && (
          <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
