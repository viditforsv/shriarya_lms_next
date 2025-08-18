import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Home, Search, BookOpen, FileText, Users, HelpCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#feefea] to-[#fffefd] border-b border-[#e27447] py-8">
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
              <Button asChild size="lg" className="bg-[#e27447] hover:bg-[#e27447]/90">
                <Link href="/" className="flex items-center space-x-2">
                  <Home className="w-5 h-5" />
                  <span>Go Home</span>
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/courses" className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Browse Courses</span>
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/templates" className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>View Templates</span>
                </Link>
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </Button>
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
                <Button asChild variant="outline" size="sm">
                  <Link href="/courses">Browse Courses</Link>
                </Button>
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
                <Button asChild variant="outline" size="sm">
                  <Link href="/templates">View Templates</Link>
                </Button>
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
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
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
                <Button asChild variant="outline" className="border-[#1e293b] hover:bg-[#1e293b] hover:text-white">
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button asChild variant="outline" className="border-[#1e293b] hover:bg-[#1e293b] hover:text-white">
                  <Link href="/help">Help Center</Link>
                </Button>
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
