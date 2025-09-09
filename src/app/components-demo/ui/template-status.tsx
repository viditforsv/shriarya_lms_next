"use client"

import { Badge } from "@/app/components-demo/ui/ui-components/badge"
import { CheckCircle } from "lucide-react"

interface TemplateStatusProps {
  isCompleted?: boolean
  className?: string
}

export function TemplateStatus({ isCompleted = false, className = "" }: TemplateStatusProps) {
  if (!isCompleted) return null
  
  return (
    <Badge 
      variant="secondary" 
      className={`bg-green-100 text-green-800 border-green-200 ${className}`}
    >
      <CheckCircle className="w-3 h-3 mr-1" />
      Completed
    </Badge>
  )
}

// Alternative: Simple green dot indicator
export function CompletionDot({ isCompleted = false }: { isCompleted?: boolean }) {
  if (!isCompleted) return null
  
  return (
    <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />
  )
}
