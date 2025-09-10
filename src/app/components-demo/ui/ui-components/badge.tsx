import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-sm border px-3 py-2 text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-[#3A3A3A] bg-white text-[#3A3A3A] hover:bg-gray-50",
        secondary:
          "border-[#3A3A3A] bg-white text-[#3A3A3A] hover:bg-gray-50",
        destructive:
          "border-red-400 bg-red-50 text-red-700 hover:bg-red-100",
        outline:
          "border-[#3A3A3A] bg-white text-[#3A3A3A] hover:bg-gray-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
