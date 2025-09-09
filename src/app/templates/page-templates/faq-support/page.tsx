'use client'
import { memo } from "react"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components-demo/ui/ui-components/card"
import { Button } from "@/app/components-demo/ui/ui-components/button"
import { Badge } from "@/app/components-demo/ui/ui-components/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components-demo/ui/tabs"
import { CompletionDot } from "@/app/components-demo/ui/template-status"
import {
  HelpCircle,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Mail,
  Phone,
  Calendar,
  Filter,
  SortAsc,
  SortDesc,
  Download,
  Upload,
  Settings,
  Zap,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  AlertCircle,
  Info,
  ExternalLink,
  Copy,
  Share2,
  Heart,
  Flag,
  Lock,
  Unlock
} from 'lucide-react'

const FAQSupportTemplate = memo(function FAQSupportTemplate() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const faqCategories = [
    { id: 'all', name: 'All Categories', count: 45 },
    { id: 'account', name: 'Account & Billing', count: 12 },
    { id: 'courses', name: 'Courses & Learning', count: 15 },
    { id: 'technical', name: 'Technical Support', count: 10 },
    { id: 'general', name: 'General Questions', count: 8 }
  ]

  const faqItems = [
    {
      id: 1,
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your email. Make sure to check your spam folder if you don\'t receive the email within a few minutes.',
      category: 'account',
      status: 'published',
      views: 1250,
      helpful: 89,
      notHelpful: 12,
      lastUpdated: '2024-01-15',
      tags: ['password', 'security', 'login'],
      author: 'Support Team',
      priority: 'high'
    },
    {
      id: 2,
      question: 'How can I enroll in a course?',
      answer: 'To enroll in a course, browse our course catalog, select the course you\'re interested in, and click "Enroll Now". You can also search for specific courses using the search bar. Some courses are free while others require payment.',
      category: 'courses',
      status: 'published',
      views: 2100,
      helpful: 156,
      notHelpful: 8,
      lastUpdated: '2024-01-12',
      tags: ['enrollment', 'courses', 'learning'],
      author: 'Support Team',
      priority: 'high'
    },
    {
      id: 3,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, UPI payments, net banking, and digital wallets like Paytm, PhonePe, and Google Pay. All transactions are secure and encrypted.',
      category: 'account',
      status: 'published',
      views: 890,
      helpful: 67,
      notHelpful: 5,
      lastUpdated: '2024-01-10',
      tags: ['payment', 'billing', 'security'],
      author: 'Support Team',
      priority: 'medium'
    },
    {
      id: 4,
      question: 'How do I access my course materials?',
      answer: 'Once enrolled, you can access your course materials by logging into your account and navigating to "My Courses". Click on the course you want to access, and you\'ll find all materials including videos, notes, and assignments.',
      category: 'courses',
      status: 'published',
      views: 1650,
      helpful: 134,
      notHelpful: 15,
      lastUpdated: '2024-01-08',
      tags: ['materials', 'access', 'courses'],
      author: 'Support Team',
      priority: 'high'
    },
    {
      id: 5,
      question: 'Can I get a refund for my course?',
      answer: 'Yes, we offer refunds within 30 days of purchase if you haven\'t completed more than 50% of the course content. To request a refund, contact our support team with your order details and reason for the refund request.',
      category: 'account',
      status: 'published',
      views: 750,
      helpful: 45,
      notHelpful: 12,
      lastUpdated: '2024-01-05',
      tags: ['refund', 'billing', 'policy'],
      author: 'Support Team',
      priority: 'medium'
    },
    {
      id: 6,
      question: 'Why is my video not playing?',
      answer: 'If your video is not playing, try refreshing the page, clearing your browser cache, or checking your internet connection. Make sure you\'re using a supported browser (Chrome, Firefox, Safari, Edge) and that JavaScript is enabled.',
      category: 'technical',
      status: 'published',
      views: 980,
      helpful: 78,
      notHelpful: 22,
      lastUpdated: '2024-01-03',
      tags: ['video', 'technical', 'troubleshooting'],
      author: 'Support Team',
      priority: 'medium'
    }
  ]

  const supportTickets = [
    {
      id: 1,
      subject: 'Unable to access course materials',
      user: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      status: 'open',
      priority: 'high',
      category: 'technical',
      createdAt: '2024-01-20',
      lastActivity: '2024-01-20',
      messages: 3
    },
    {
      id: 2,
      subject: 'Payment issue with course enrollment',
      user: 'Michael Chen',
      email: 'michael.chen@email.com',
      status: 'in-progress',
      priority: 'medium',
      category: 'billing',
      createdAt: '2024-01-19',
      lastActivity: '2024-01-19',
      messages: 5
    },
    {
      id: 3,
      subject: 'Certificate download problem',
      user: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      status: 'resolved',
      priority: 'low',
      category: 'courses',
      createdAt: '2024-01-18',
      lastActivity: '2024-01-18',
      messages: 2
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      case 'open': return 'bg-red-100 text-red-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredFAQs = faqItems.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || faq.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#feefea] to-[#fffefd]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e293b] to-[#2d3748] text-white py-8 relative">
        <CompletionDot isCompleted={true} />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-cardo mb-2">FAQ & Support</h1>
              <p className="text-lg text-gray-300 font-dm-sans">
                Find answers to common questions and get help when you need it
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{faqItems.length}</div>
                <div className="text-sm text-gray-300">FAQ Articles</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">{supportTickets.length}</div>
                <div className="text-sm text-gray-300">Support Tickets</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-sm bg-white p-1 shadow-sm">
            <TabsTrigger
              value="faq"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQ
            </TabsTrigger>
            <TabsTrigger
              value="tickets"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Support Tickets
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            {/* Search and Filters */}
            <Card className="rounded-sm">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search FAQ articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                      {faqCategories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name} ({category.count})
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                    <Button className="bg-[#e27447] hover:bg-[#d65a2b] rounded-sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add FAQ
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ List */}
            <div className="grid gap-4">
              {filteredFAQs.map(faq => (
                <Card key={faq.id} className="rounded-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 font-cardo">
                            {faq.question}
                          </h3>
                          <Badge className={`rounded-sm ${getStatusColor(faq.status)}`}>
                            {faq.status}
                          </Badge>
                          <Badge className={`rounded-sm ${getPriorityColor(faq.priority)}`}>
                            {faq.priority}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {faq.answer.substring(0, 200)}...
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {faq.views} views
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {faq.helpful} helpful
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Updated {new Date(faq.lastUpdated).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {faq.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="rounded-sm text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Copy className="w-4 h-4" />
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

          {/* Support Tickets Tab */}
          <TabsContent value="tickets" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-cardo">Support Tickets</h2>
              <div className="flex items-center gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447]">
                  <option>All Status</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
                <Button className="bg-[#e27447] hover:bg-[#d65a2b] rounded-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Ticket
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {supportTickets.map(ticket => (
                <Card key={ticket.id} className="rounded-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 font-cardo">
                            {ticket.subject}
                          </h3>
                          <Badge className={`rounded-sm ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </Badge>
                          <Badge className={`rounded-sm ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>User:</strong> {ticket.user}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Email:</strong> {ticket.email}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Category:</strong> {ticket.category}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Created:</strong> {new Date(ticket.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Last Activity:</strong> {new Date(ticket.lastActivity).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Messages:</strong> {ticket.messages}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total FAQ Articles</p>
                      <p className="text-2xl font-bold text-gray-900">{faqItems.length}</p>
                    </div>
                    <HelpCircle className="w-8 h-8 text-[#e27447]" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {faqItems.reduce((sum, faq) => sum + faq.views, 0).toLocaleString()}
                      </p>
                    </div>
                    <Eye className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Helpful Votes</p>
                      <p className="text-2xl font-bold text-green-600">
                        {faqItems.reduce((sum, faq) => sum + faq.helpful, 0)}
                      </p>
                    </div>
                    <ThumbsUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Support Tickets</p>
                      <p className="text-2xl font-bold text-purple-600">{supportTickets.length}</p>
                    </div>
                    <MessageCircle className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Most Viewed FAQs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faqItems.slice(0, 5).map((faq, index) => (
                      <div key={faq.id} className="flex items-center justify-between">
                        <span className="text-sm font-medium truncate flex-1">{faq.question}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#e27447] h-2 rounded-full" 
                              style={{ width: `${(faq.views / 2500) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{faq.views}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faqCategories.slice(1).map(category => {
                      const percentage = (category.count / faqItems.length) * 100
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

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">FAQ Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Auto-publish FAQs</h4>
                      <p className="text-sm text-gray-600">Automatically publish approved FAQs</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Notify admin of new FAQ submissions</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Public FAQ</h4>
                      <p className="text-sm text-gray-600">Allow public access to FAQ</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Support Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Auto-assign Tickets</h4>
                      <p className="text-sm text-gray-600">Automatically assign tickets to agents</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Ticket Notifications</h4>
                      <p className="text-sm text-gray-600">Send notifications for new tickets</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">SLA Tracking</h4>
                      <p className="text-sm text-gray-600">Track response time SLAs</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="font-cardo">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Support Email
                    </label>
                    <input
                      type="email"
                      defaultValue="support@shrividhya.in"
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Support Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue="+91-98765-43210"
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Hours
                  </label>
                  <input
                    type="text"
                    defaultValue="Monday - Friday: 9:00 AM - 6:00 PM IST"
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
})

export default FAQSupportTemplate

