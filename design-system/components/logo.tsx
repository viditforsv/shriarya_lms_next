import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "color" | "horizontal" | "mascot" | "icon"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showBackground?: boolean
}

const logoVariants = {
  color: {
    sm: { width: 120, height: 40 },
    md: { width: 180, height: 60 },
    lg: { width: 240, height: 80 },
    xl: { width: 300, height: 100 },
  },
  horizontal: {
    sm: { width: 140, height: 40 },
    md: { width: 210, height: 60 },
    lg: { width: 280, height: 80 },
    xl: { width: 350, height: 100 },
  },
  mascot: {
    sm: { width: 120, height: 40 },
    md: { width: 180, height: 60 },
    lg: { width: 240, height: 80 },
    xl: { width: 300, height: 100 },
  },
  icon: {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
    xl: { width: 80, height: 80 },
  },
}

export function Logo({
  variant = "color",
  size = "md",
  className,
  showBackground = true,
}: LogoProps) {
  const dimensions = logoVariants[variant][size]
  
  const getImagePath = () => {
    // Use main_logo for all variants since we have main_logo.png and main_logo.webp
    // For webp support, we can use main_logo.webp, but default to .png for compatibility
    switch (variant) {
      case "horizontal":
      case "mascot":
      case "icon":
      case "color":
      default:
        return `/images/main_logo.png`
    }
  }

  const getAltText = () => {
    switch (variant) {
      case "horizontal":
        return "Shrividhya Classes logo - Test preparation and admissions consulting services"
      case "mascot":
        return "Shrividhya Classes mascot logo - Educational platform for test preparation and admissions consulting"
      case "icon":
        return "Shrividhya Classes icon - Test prep and admissions consulting"
      case "color":
      default:
        return "Shrividhya Classes logo - Test preparation and admissions consulting services"
    }
  }

  return (
    <Image
      src={getImagePath()}
      alt={getAltText()}
      width={dimensions.width}
      height={dimensions.height}
      className={cn("object-contain", className)}
      priority
    />
  )
}

