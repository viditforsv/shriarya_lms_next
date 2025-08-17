"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import { Testimonial, testimonialsDatabase, getFeaturedTestimonials, getTestimonialsByService } from "@/data/testimonials"

interface Testimonial {
  id: string
  name: string
  content: string
  rating: number
  service: string
  category: string[]
  image?: string
  position?: string
  company?: string
}

interface TestimonialsProps {
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
  showService?: boolean
  className?: string
  filterByService?: string
  filterByCategory?: string
  maxCount?: number
  featuredOnly?: boolean
}

// Mock data for now
const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    content: "Excellent learning experience with practical applications.",
    rating: 5,
    service: "Mathematics",
    category: ["IBDP"],
    position: "Student",
    company: "IBDP School"
  },
  {
    id: "2",
    name: "Michael Chen",
    content: "Great content quality and very user-friendly platform.",
    rating: 5,
    service: "Mathematics",
    category: ["CBSE"],
    position: "Student",
    company: "CBSE School"
  }
]

export function Testimonials({ 
  title = "What Our Clients Say",
  subtitle = "Trusted by innovators and businesses worldwide",
  testimonials = mockTestimonials,
  showService = true,
  className = "",
  filterByService,
  filterByCategory,
  maxCount,
  featuredOnly = false
}: TestimonialsProps) {
  // Get testimonials based on filters
  let displayTestimonials = testimonials

  if (filterByService) {
    displayTestimonials = testimonials.filter(t => t.service === filterByService)
  } else if (filterByCategory) {
    displayTestimonials = testimonials.filter(t => t.category.includes(filterByCategory))
  }

  // Limit count if specified
  if (maxCount && displayTestimonials.length > maxCount) {
    displayTestimonials = displayTestimonials.slice(0, maxCount)
  }
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </div>
    ))
  }

  return (
    <section className={`py-16 ${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4">{title}</h2>
        <p className="text-[#4a6f73] max-w-2xl mx-auto">{subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6">
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="text-sm text-[#8A8A8A] ml-2">
                  {testimonial.rating}.0/5.0
                </span>
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-[#4a6f73] mb-6 italic">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              {/* Service Badge */}
              {showService && (
                <div className="mb-4">
                  <Badge variant="outline" className="text-xs">
                    {testimonial.service}
                  </Badge>
                </div>
              )}

              {/* Author Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#81c3c9]/20 rounded-full flex items-center justify-center mr-4 text-xl">
                  {testimonial.image || "👤"}
                </div>
                <div>
                  <div className="font-semibold text-[#1b4a56]">{testimonial.name}</div>
                  <div className="text-sm text-[#4a6f73]">
                    {testimonial.position}, {testimonial.company}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

// Individual testimonial component for featured testimonials
export function FeaturedTestimonial({ testimonial }: { testimonial: Testimonial }) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </div>
    ))
  }

  return (
    <Card className="max-w-4xl mx-auto bg-gradient-to-r from-[#81c3c9]/20 to-[#4a6f73]/20 border-[#4a6f73]">
      <CardContent className="pt-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-1 mb-4">
            {renderStars(testimonial.rating)}
          </div>
          <Badge variant="secondary" className="mb-4">
            {testimonial.service}
          </Badge>
        </div>
        
        <blockquote className="text-xl text-[#1b4a56] mb-8 text-center italic">
          &ldquo;{testimonial.content}&rdquo;
        </blockquote>
        
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4 text-2xl shadow-sm">
            {testimonial.image || "👤"}
          </div>
          <div className="text-center">
            <div className="font-semibold text-[#1b4a56] text-lg">{testimonial.name}</div>
            <div className="text-[#4a6f73]">
              {testimonial.position}, {testimonial.company}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 