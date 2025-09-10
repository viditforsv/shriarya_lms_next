'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components-demo/ui/ui-components/card'
import { Badge } from '@/app/components-demo/ui/ui-components/badge'
import { CompletionDot } from '@/app/components-demo/ui/template-status'

interface TemplateLayoutProps {
  title: string
  description: string
  children: React.ReactNode
  phase?: string
  ready?: boolean
  backHref?: string
  backLabel?: string
}

export function TemplateLayout({ 
  title, 
  description, 
  children, 
  phase = "Phase 1-3",
  ready = true,
  backHref = "/templates",
  backLabel = "Back to Templates"
}: TemplateLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="mb-12">
          <Link 
            href={backHref} 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {backLabel}
          </Link>
        </div>

        {/* Template Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-[#1e293b]">{title}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {phase}
              </Badge>
              <CompletionDot isCompleted={ready} />
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Template Content */}
        <div className="space-y-8">
          {children}
        </div>
      </div>
    </div>
  )
}

// Common template section component
interface TemplateSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function TemplateSection({ title, description, children, className = "" }: TemplateSectionProps) {
  return (
    <section className={`py-12 ${className}`}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1e293b] mb-4">{title}</h2>
        {description && (
          <p className="text-lg text-muted-foreground max-w-3xl">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

// Common template card component
interface TemplateCardProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function TemplateCard({ title, description, children, className = "" }: TemplateCardProps) {
  return (
    <Card className={`border-slate-200 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl text-[#1e293b]">{title}</CardTitle>
        {description && (
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}
