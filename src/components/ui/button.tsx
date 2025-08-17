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
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary shadow-sm",
        secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 focus:ring-primary shadow-sm",
        loadMore: "bg-muted text-muted-foreground hover:bg-muted/80 focus:ring-muted-foreground border border-border",
        outline: "bg-background text-foreground border border-border hover:bg-muted focus:ring-primary shadow-sm",
        coral: "bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-accent shadow-sm",
        destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 shadow-sm",
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
