"use client"

import { useState, memo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components-demo/ui/card'
import { Button } from '@/app/components-demo/ui/button'
import { Input } from '@/app/components-demo/ui/input'
import { 
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Mail,
  Phone,
  BookOpen,
  CreditCard,
  Settings,
  Users,
  HelpCircle
} from 'lucide-react'
import { CompletionDot } from '@/app/components-demo/ui/template-status'
import { TemplateLayout } from "@/app/components-demo/ui/template-layout"
const FAQTemplate = memo(function FAQTemplate() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'courses', name: 'Courses & Learning', icon: BookOpen },
    { id: 'billing', name: 'Billing & Payments', icon: CreditCard },
    { id: 'account', name: 'Account & Settings', icon: Settings },
    { id: 'technical', name: 'Technical Support', icon: Settings },
    { id: 'general', name: 'General', icon: Users }
  ]

  const faqs = [
    {
      id: 1,
      category: 'courses',
      question: 'How do I enroll in a course?',
      answer: 'To enroll in a course, simply browse our course catalog, select the course you\'re interested in, and click the "Enroll" button. For paid courses, you\'ll be redirected to the payment page. Free courses can be accessed immediately after enrollment.'
    },
    {
      id: 2,
      category: 'courses',
      question: 'Can I access course materials offline?',
      answer: 'Yes! You can download course materials including PDFs, notes, and some video content for offline viewing. Look for the download icon next to each resource. Note that interactive content like quizzes requires an internet connection.'
    },
    {
      id: 3,
      category: 'courses',
      question: 'How long do I have access to a course?',
      answer: 'Once enrolled, you have lifetime access to the course materials. This includes all videos, notes, quizzes, and downloadable resources. You can revisit the content anytime at your own pace.'
    },
    {
      id: 4,
      category: 'courses',
      question: 'What if I need help with course content?',
      answer: 'We provide multiple support channels: discussion forums within each course, direct messaging with instructors, and our helpdesk system. You can also join our community Discord server for peer-to-peer support.'
    },
    {
      id: 5,
      category: 'billing',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For institutional purchases, we also accept purchase orders and can arrange custom billing terms.'
    },
    {
      id: 6,
      category: 'billing',
      question: 'Can I get a refund if I\'m not satisfied?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all courses. If you\'re not satisfied with your purchase, contact our support team within 30 days of enrollment for a full refund, no questions asked.'
    },
    {
      id: 7,
      category: 'billing',
      question: 'Do you offer student discounts?',
      answer: 'Yes! We offer a 20% student discount on all courses. To qualify, you need to provide a valid student ID or enrollment verification. Contact our support team to apply for the discount.'
    },
    {
      id: 8,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. The link will be valid for 24 hours. If you don\'t receive the email, check your spam folder.'
    },
    {
      id: 9,
      category: 'account',
      question: 'Can I change my email address?',
      answer: 'Yes, you can update your email address in your account settings. You\'ll need to verify the new email address before the change takes effect. All course access and certificates will be transferred to the new email.'
    },
    {
      id: 10,
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'Go to your account settings and click on "Edit Profile". You can update your name, profile picture, bio, and other personal information. Changes are saved automatically.'
    },
    {
      id: 11,
      category: 'technical',
      question: 'The video is not loading properly. What should I do?',
      answer: 'Try refreshing the page first. If the issue persists, check your internet connection and try switching to a different browser. For mobile users, ensure you\'re using a recent version of Chrome, Safari, or Firefox.'
    },
    {
      id: 12,
      category: 'technical',
      question: 'Can I use the platform on mobile devices?',
      answer: 'Yes! Our platform is fully responsive and works on all mobile devices. We recommend using the latest version of Chrome, Safari, or Firefox for the best experience. You can also download our mobile app for iOS and Android.'
    },
    {
      id: 13,
      category: 'technical',
      question: 'Why is my certificate not downloading?',
      answer: 'Make sure you\'ve completed all course requirements including quizzes and assignments. Certificates are generated automatically upon completion. If you\'re still having issues, try using a different browser or clear your browser cache.'
    },
    {
      id: 14,
      category: 'general',
      question: 'Do you offer certificates for completed courses?',
      answer: 'Yes! Upon successful completion of a course (including passing all quizzes and assignments), you\'ll receive a digital certificate that you can download and share on LinkedIn or print for your records.'
    },
    {
      id: 15,
      category: 'general',
      question: 'How do I contact customer support?',
      answer: 'You can reach our support team through multiple channels: email support@shriarya.com, live chat on our website, or submit a ticket through our helpdesk system. We typically respond within 24 hours.'
    }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#feefea] to-[#fffefd] border-b border-[#e27447] py-6 relative">
        <CompletionDot isCompleted={true} />
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/templates/page-templates" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Page Templates
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1e293b] mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our platform, courses, and services. 
            Can&apos;t find what you&apos;re looking for? Contact our support team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 rounded-sm border-[#feefea] focus:border-[#e27447] focus:ring-[#e27447]"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "primary" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-sm ${
                  selectedCategory === category.id 
                    ? 'bg-[#e27447] hover:bg-[#e27447]/90 text-white' 
                    : 'border-[#feefea] hover:border-[#e27447] hover:bg-[#feefea]'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            )
          })}
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => {
              const isExpanded = expandedItems.includes(faq.id)
              return (
                <Card key={faq.id} className="rounded-sm border-[#feefea] hover:border-[#e27447] transition-colors">
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => toggleExpanded(faq.id)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-[#1e293b] pr-4">
                        {faq.question}
                      </CardTitle>
                      <Button variant="outline" size="sm" className="rounded-sm">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-[#e27447]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#e27447]" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  {isExpanded && (
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  )}
                </Card>
              )
            })
          ) : (
            <Card className="rounded-sm text-center py-12">
              <CardContent>
                <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#1e293b] mb-2">No FAQs Found</h3>
                <p className="text-muted-foreground mb-4">
                  We couldn&apos;t find any FAQs matching your search criteria.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}
                  className="rounded-sm"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact Support Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="bg-[#feefea] border-[#e27447] rounded-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-[#1e293b] mb-2">
                Still Need Help?
              </CardTitle>
              <CardDescription className="text-lg">
                Our support team is here to assist you with any questions or issues.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#e27447] rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#1e293b] mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chat with our support team in real-time
                  </p>
                  <Button className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm">
                    Start Chat
                  </Button>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#e27447] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#1e293b] mb-2">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Send us an email and we&apos;ll respond within 24 hours
                  </p>
                  <Button variant="outline" className="border-[#1e293b] hover:bg-[#1e293b] hover:text-white rounded-sm">
                    Send Email
                  </Button>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#e27447] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#1e293b] mb-2">Phone Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Call us for immediate assistance
                  </p>
                  <Button variant="outline" className="border-[#1e293b] hover:bg-[#1e293b] hover:text-white rounded-sm">
                    Call Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
})

export default FAQTemplate

