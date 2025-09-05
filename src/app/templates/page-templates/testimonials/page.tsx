'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompletionDot } from "@/components/ui/template-status"
import {
  Star,
  Quote,
  Users,
  Award,
  ThumbsUp,
  ThumbsDown,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MessageCircle,
  Calendar,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Heart,
  Share2,
  Flag,
  Shield,
  Zap
} from 'lucide-react'

export default function TestimonialsTemplate() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedRating, setSelectedRating] = useState('all')

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Student',
      course: 'Complete Mathematics Course - Class 10',
      rating: 5,
      content: 'This course completely transformed my understanding of mathematics. The explanations are clear, and the practice problems are perfectly structured. I went from struggling with basic concepts to scoring 95% in my final exam!',
      date: '2024-01-15',
      verified: true,
      category: 'academic',
      likes: 24,
      helpful: true,
      image: null
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      role: 'Parent',
      course: 'Physics Masterclass - Advanced Level',
      rating: 5,
      content: 'As a parent, I was skeptical about online learning, but this platform exceeded all expectations. My son not only improved his grades but also developed a genuine interest in physics. The interactive content and expert instructors make learning engaging.',
      date: '2024-01-12',
      verified: true,
      category: 'parent',
      likes: 18,
      helpful: true,
      image: null
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Working Professional',
      course: 'Statistics & Probability',
      rating: 4,
      content: 'I needed to brush up on statistics for my job, and this course was perfect. The real-world examples and practical applications helped me understand complex concepts quickly. Highly recommended for working professionals.',
      date: '2024-01-10',
      verified: true,
      category: 'professional',
      likes: 15,
      helpful: true,
      image: null
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Teacher',
      course: 'Advanced Teaching Methods',
      rating: 5,
      content: 'This course helped me revolutionize my teaching approach. The innovative methods and techniques I learned have made my classes more engaging and effective. My students are more motivated and performing better than ever.',
      date: '2024-01-08',
      verified: true,
      category: 'teacher',
      likes: 32,
      helpful: true,
      image: null
    },
    {
      id: 5,
      name: 'Lisa Wang',
      role: 'Student',
      course: 'Chemistry Fundamentals',
      rating: 4,
      content: 'The chemistry course is well-structured with excellent visual aids and experiments. The step-by-step approach made complex topics easy to understand. The only minor issue was some technical glitches during live sessions.',
      date: '2024-01-05',
      verified: true,
      category: 'academic',
      likes: 12,
      helpful: false,
      image: null
    }
  ]

  const categories = [
    { id: 'all', name: 'All Categories', count: testimonials.length },
    { id: 'academic', name: 'Academic Success', count: testimonials.filter(t => t.category === 'academic').length },
    { id: 'parent', name: 'Parent Reviews', count: testimonials.filter(t => t.category === 'parent').length },
    { id: 'professional', name: 'Professional Development', count: testimonials.filter(t => t.category === 'professional').length },
    { id: 'teacher', name: 'Teacher Training', count: testimonials.filter(t => t.category === 'teacher').length }
  ]

  const stats = {
    totalTestimonials: testimonials.length,
    averageRating: (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1),
    verifiedReviews: testimonials.filter(t => t.verified).length,
    helpfulReviews: testimonials.filter(t => t.helpful).length
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  const filteredTestimonials = testimonials.filter(testimonial => {
    const categoryMatch = selectedCategory === 'all' || testimonial.category === selectedCategory
    const ratingMatch = selectedRating === 'all' || testimonial.rating.toString() === selectedRating
    return categoryMatch && ratingMatch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#feefea] to-[#fffefd]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e293b] to-[#2d3748] text-white py-8 relative">
        <CompletionDot isCompleted={true} />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-cardo mb-2">Testimonials</h1>
              <p className="text-lg text-gray-300 font-dm-sans">
                Hear what our students and parents say about their learning experience
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{stats.totalTestimonials}</div>
                <div className="text-sm text-gray-300">Reviews</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-400">{stats.averageRating}</div>
                <div className="text-sm text-gray-300">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="testimonials" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-sm bg-white p-1 shadow-sm">
            <TabsTrigger
              value="testimonials"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Quote className="w-4 h-4 mr-2" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Statistics
            </TabsTrigger>
            <TabsTrigger
              value="moderate"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Shield className="w-4 h-4 mr-2" />
              Moderate
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Zap className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6">
            {/* Filters */}
            <Card className="rounded-sm">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search testimonials..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name} ({category.count})
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedRating}
                      onChange={(e) => setSelectedRating(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                    >
                      <option value="all">All Ratings</option>
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTestimonials.map(testimonial => (
                <Card key={testimonial.id} className="rounded-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#e27447] rounded-full flex items-center justify-center text-white font-bold">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 font-dm-sans">
                              {testimonial.name}
                            </h3>
                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                          </div>
                        </div>
                        {testimonial.verified && (
                          <Badge className="bg-green-100 text-green-800 rounded-sm text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>

                      {/* Course */}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BookOpen className="w-4 h-4" />
                        <span className="truncate">{testimonial.course}</span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {renderStars(testimonial.rating)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {testimonial.rating}/5
                        </span>
                      </div>

                      {/* Content */}
                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 w-6 h-6 text-[#e27447] opacity-30" />
                        <p className="text-sm text-gray-700 leading-relaxed pl-4">
                          {testimonial.content}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(testimonial.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {testimonial.likes}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="rounded-sm">
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalTestimonials}</p>
                    </div>
                    <Quote className="w-8 h-8 text-[#e27447]" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Rating</p>
                      <p className="text-2xl font-bold text-yellow-600">{stats.averageRating}</p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Verified Reviews</p>
                      <p className="text-2xl font-bold text-green-600">{stats.verifiedReviews}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Helpful Reviews</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.helpfulReviews}</p>
                    </div>
                    <ThumbsUp className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Rating Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[5, 4, 3, 2, 1].map(rating => {
                      const count = testimonials.filter(t => t.rating === rating).length
                      const percentage = (count / testimonials.length) * 100
                      return (
                        <div key={rating} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{rating}</span>
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-[#e27447] h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{count}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Category Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.slice(1).map(category => {
                      const percentage = (category.count / testimonials.length) * 100
                      return (
                        <div key={category.id} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{category.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{category.count}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Moderate Tab */}
          <TabsContent value="moderate" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-cardo">Review Moderation</h2>
              <div className="flex items-center gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447]">
                  <option>All Reviews</option>
                  <option>Pending Approval</option>
                  <option>Flagged</option>
                  <option>Reported</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4">
              {testimonials.map(testimonial => (
                <Card key={testimonial.id} className="rounded-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 font-cardo">
                            {testimonial.name}
                          </h3>
                          <Badge className="bg-green-100 text-green-800 rounded-sm">
                            Approved
                          </Badge>
                          {testimonial.verified && (
                            <Badge className="bg-blue-100 text-blue-800 rounded-sm">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {testimonial.course}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(testimonial.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {testimonial.likes} likes
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{testimonial.content}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-sm text-red-600 hover:text-red-700">
                          <Flag className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-sm text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="font-cardo">Testimonial Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Auto-approve Reviews</h4>
                      <p className="text-sm text-gray-600">Automatically approve reviews with 4+ stars</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Notify admin of new reviews</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Require Verification</h4>
                      <p className="text-sm text-gray-600">Require email verification for reviews</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Review Length
                  </label>
                  <input
                    type="number"
                    defaultValue={50}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                  />
                </div>
                
                <Button className="bg-[#e27447] hover:bg-[#d65a2b] text-white rounded-sm">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
