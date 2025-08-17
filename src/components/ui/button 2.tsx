import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "teal" | "yellow"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variantClasses = {
      default: "bg-[#ff2768] text-white hover:bg-[#ff2768]/90 shadow-lg hover:shadow-xl",
      destructive: "bg-red-600 text-white hover:bg-red-600/90 shadow-lg hover:shadow-xl",
      outline: "border-2 border-[#4a6f73] bg-white hover:bg-[#4a6f73] hover:text-white transition-all duration-300",
      secondary: "bg-[#81c3c9] text-[#1b4a56] hover:bg-[#81c3c9]/80 shadow-lg hover:shadow-xl",
      ghost: "hover:bg-[#81c3c9] hover:text-[#1b4a56]",
      link: "text-[#ff2768] underline-offset-4 hover:underline",
      teal: "bg-[#1b4a56] text-white hover:bg-[#1b4a56]/90 shadow-lg hover:shadow-xl",
      yellow: "bg-[#E5E518] text-[#17313E] hover:bg-[#E5E518]/90 shadow-lg hover:shadow-xl",

    }
    
    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
      icon: "h-10 w-10",
    }
    
    const classes = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    )
    
    return (
      <Comp
        className={classes}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button } 