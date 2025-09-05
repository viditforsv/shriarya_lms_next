"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft, Search, BookOpen, FileText, Users, HelpCircle } from "lucide-react"
import { CompletionDot } from "@/components/ui/template-status"

export default function NotFoundTemplate() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#feefea] to-[#fffefd] border-b border-[#e27447] py-8 relative">
        <CompletionDot isCompleted={true} />
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-8xl font-bold text-[#1e293b] mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-[#1e293b] mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Primary Actions */}
          <div className="text-center mb-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/" 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all duration-200 bg-[#e27447] text-white hover:bg-[#e27447]/90 h-14 px-8 py-4"
              >
                <Home className="w-5 h-5" />
                <span>Go Home</span>
              </Link>
              
              <Link 
                href="/courses" 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all duration-200 bg-background text-foreground border border-border hover:bg-muted h-14 px-8 py-4"
              >
                <BookOpen className="w-5 h-5" />
                <span>Browse Courses</span>
              </Link>
              
              <Link 
                href="/templates" 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all duration-200 bg-background text-foreground border border-border hover:bg-muted h-14 px-8 py-4"
              >
                <FileText className="w-5 h-5" />
                <span>View Templates</span>
              </Link>
            </div>
            
            <button 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all duration-200 bg-background text-muted-foreground hover:text-foreground border border-border hover:bg-muted h-10 px-4 py-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#feefea] rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-[#e27447]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Courses</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore our comprehensive course offerings
                </p>
                <Link 
                  href="/courses" 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all duration-200 bg-background text-foreground border border-border hover:bg-muted h-10 px-4 py-2"
                >
                  Browse Courses
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#feefea] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-[#e27447]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Templates</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ready-to-use page and dashboard templates
                </p>
                <Link 
                  href="/templates" 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all duration-200 bg-background text-foreground border border-border hover:bg-muted h-10 px-4 py-2"
                >
                  View Templates
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#feefea] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#e27447]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Dashboard</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Access your learning dashboard
                </p>
                <Link 
                  href="/dashboard" 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all duration-200 bg-background text-foreground border border-border hover:bg-muted h-10 px-4 py-2"
                >
                  Go to Dashboard
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Help Section */}
          <Card className="bg-[#feefea] border-[#e27447]">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-[#e27447] rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1e293b] mb-4">Need Help?</h3>
              <p className="text-[#1e293b] mb-6 max-w-2xl mx-auto">
                If you&apos;re still having trouble finding what you&apos;re looking for, 
                our support team is here to help you navigate the platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all duration-200 bg-background text-foreground border border-[#1e293b] hover:bg-[#1e293b] hover:text-white h-10 px-4 py-2"
                >
                  Contact Support
                </Link>
                <Link 
                  href="/helpdesk" 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all duration-200 bg-background text-foreground border border-[#1e293b] hover:bg-[#1e293b] hover:text-white h-10 px-4 py-2"
                >
                  Help Center
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Search Suggestion */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Try searching for what you&apos;re looking for:
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses, templates, or pages..."
                  className="w-full px-4 py-3 pl-12 pr-4 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447] transition-all bg-white text-[#1e293b] placeholder-[#4a6f73]"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4a6f73]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
