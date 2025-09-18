"use client"
import { memo } from "react"
import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components-demo/ui/ui-components/card'
import { Button } from '@/app/components-demo/ui/ui-components/button'
import { Badge } from '@/app/components-demo/ui/ui-components/badge'
import { Input } from '@/app/components-demo/ui/ui-components/input'
import { Textarea } from '@/app/components-demo/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components-demo/ui/tabs'
import { 
  ArrowLeft,
  Plus,
  Search,
  MessageCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Send,
  Filter,
  Star,
  Reply,
  Archive,
  Tag
} from 'lucide-react'
import { CompletionDot } from '@/app/components-demo/ui/template-status'

const HelpdeskTemplate = memo(function HelpdeskTemplate() {
  const [activeTab, setActiveTab] = useState('tickets')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTicket, setSelectedTicket] = useState(0)
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium',
    category: 'technical'
  })

  // Mock data
  const tickets = [
    {
      id: 'TK-001',
      subject: 'Video not loading properly',
      description: 'The lesson videos are not loading on my mobile device. I\'ve tried refreshing and switching browsers.',
      status: 'open',
      priority: 'high',
      category: 'technical',
      created: '2024-01-10',
      updated: '2024-01-10',
      assignee: 'Support Team',
      replies: 2
    },
    {
      id: 'TK-002',
      subject: 'Certificate download issue',
      description: 'I completed the course but cannot download my certificate. The download button is not working.',
      status: 'in_progress',
      priority: 'medium',
      category: 'technical',
      created: '2024-01-08',
      updated: '2024-01-09',
      assignee: 'Sarah Johnson',
      replies: 3
    },
    {
      id: 'TK-003',
      subject: 'Payment refund request',
      description: 'I would like to request a refund for the Advanced Mathematics course. I\'m not satisfied with the content.',
      status: 'resolved',
      priority: 'medium',
      category: 'billing',
      created: '2024-01-05',
      updated: '2024-01-07',
      assignee: 'Mike Chen',
      replies: 4
    },
    {
      id: 'TK-004',
      subject: 'Account access problem',
      description: 'I cannot log into my account. The password reset email is not being sent.',
      status: 'open',
      priority: 'high',
      category: 'account',
      created: '2024-01-12',
      updated: '2024-01-12',
      assignee: 'Support Team',
      replies: 1
    }
  ]

  const categories = [
    { id: 'technical', name: 'Technical Support', color: 'bg-blue-100 text-blue-800' },
    { id: 'billing', name: 'Billing & Payments', color: 'bg-green-100 text-green-800' },
    { id: 'account', name: 'Account Issues', color: 'bg-purple-100 text-purple-800' },
    { id: 'course', name: 'Course Content', color: 'bg-orange-100 text-orange-800' },
    { id: 'general', name: 'General Inquiry', color: 'bg-gray-100 text-gray-800' }
  ]

  const priorities = [
    { id: 'low', name: 'Low', color: 'bg-gray-100 text-gray-800' },
    { id: 'medium', name: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'high', name: 'High', color: 'bg-red-100 text-red-800' },
    { id: 'urgent', name: 'Urgent', color: 'bg-red-200 text-red-900' }
  ]

  const statuses = [
    { id: 'open', name: 'Open', color: 'bg-blue-100 text-blue-800' },
    { id: 'in_progress', name: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'resolved', name: 'Resolved', color: 'bg-green-100 text-green-800' },
    { id: 'closed', name: 'Closed', color: 'bg-gray-100 text-gray-800' }
  ]

  const currentTicket = tickets[selectedTicket]

  const getStatusColor = (status: string) => {
    const statusObj = statuses.find(s => s.id === status)
    return statusObj?.color || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority: string) => {
    const priorityObj = priorities.find(p => p.id === priority)
    return priorityObj?.color || 'bg-gray-100 text-gray-800'
  }

  const getCategoryColor = (category: string) => {
    const categoryObj = categories.find(c => c.id === category)
    return categoryObj?.color || 'bg-gray-100 text-gray-800'
  }

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const createTicket = () => {
    console.log('Creating ticket:', newTicket)
    // Handle ticket creation logic
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Helpdesk</h1>
          <p className="text-muted-foreground">
            Get support for your questions and issues. Create a ticket or browse existing ones.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-sm bg-[#feefea] p-1">
            <TabsTrigger 
              value="tickets" 
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              My Tickets
            </TabsTrigger>
            <TabsTrigger 
              value="create" 
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Ticket
            </TabsTrigger>
          </TabsList>

          {/* Tickets Tab */}
          <TabsContent value="tickets" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Ticket List */}
              <div className="lg:col-span-1">
                <Card className="rounded-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Tickets</CardTitle>
                      <Badge className="bg-[#e27447] text-white rounded-sm">
                        {filteredTickets.length}
                      </Badge>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search tickets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 rounded-sm border-[#feefea] focus:border-[#e27447] focus:ring-[#e27447]"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {filteredTickets.map((ticket, index) => (
                      <div
                        key={ticket.id}
                        className={`p-3 rounded-sm border cursor-pointer transition-colors ${
                          selectedTicket === index 
                            ? 'border-[#e27447] bg-[#feefea]' 
                            : 'border-[#feefea] hover:border-[#e27447] hover:bg-[#feefea]/50'
                        }`}
                        onClick={() => setSelectedTicket(index)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className={`text-sm font-medium ${
                            selectedTicket === index ? 'text-[#1e293b]' : 'text-muted-foreground'
                          }`}>
                            {ticket.subject}
                          </h4>
                          <Badge className={`text-xs ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{ticket.id}</span>
                          <span>{ticket.created}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </Badge>
                          <Badge className={`text-xs ${getCategoryColor(ticket.category)}`}>
                            {ticket.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Ticket Details */}
              <div className="lg:col-span-3">
                <Card className="rounded-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl text-[#1e293b] mb-2">
                          {currentTicket.subject}
                        </CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Ticket ID: {currentTicket.id}</span>
                          <span>Created: {currentTicket.created}</span>
                          <span>Updated: {currentTicket.updated}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getStatusColor(currentTicket.status)}`}>
                          {currentTicket.status}
                        </Badge>
                        <Badge className={`${getPriorityColor(currentTicket.priority)}`}>
                          {currentTicket.priority}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Ticket Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2 p-3 bg-[#feefea] rounded-sm">
                        <Tag className="w-5 h-5 text-[#e27447]" />
                        <div>
                          <p className="text-sm text-muted-foreground">Category</p>
                          <p className="font-medium text-[#1e293b] capitalize">{currentTicket.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-[#feefea] rounded-sm">
                        <MessageCircle className="w-5 h-5 text-[#e27447]" />
                        <div>
                          <p className="text-sm text-muted-foreground">Replies</p>
                          <p className="font-medium text-[#1e293b]">{currentTicket.replies}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-[#feefea] rounded-sm">
                        <Clock className="w-5 h-5 text-[#e27447]" />
                        <div>
                          <p className="text-sm text-muted-foreground">Assignee</p>
                          <p className="font-medium text-[#1e293b]">{currentTicket.assignee}</p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#1e293b] mb-3">Description</h3>
                      <div className="bg-[#feefea] p-4 rounded-sm">
                        <p className="text-[#1e293b]">{currentTicket.description}</p>
                      </div>
                    </div>

                    {/* Conversation */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#1e293b] mb-3">Conversation</h3>
                      <div className="space-y-4">
                        {/* User Message */}
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-[#e27447] rounded-full flex items-center justify-center text-white text-sm font-medium">
                            U
                          </div>
                          <div className="flex-1">
                            <div className="bg-gray-100 p-3 rounded-sm">
                              <p className="text-[#1e293b]">{currentTicket.description}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{currentTicket.created}</p>
                          </div>
                        </div>

                        {/* Support Reply */}
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            S
                          </div>
                          <div className="flex-1">
                            <div className="bg-blue-50 p-3 rounded-sm">
                              <p className="text-[#1e293b]">
                                Thank you for contacting us. We&apos;ve received your ticket and our support team is looking into this issue. 
                                We&apos;ll get back to you within 24 hours with a solution.
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Support Team • {currentTicket.updated}</p>
                          </div>
                        </div>

                        {/* Additional Reply */}
                        {currentTicket.replies > 1 && (
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              S
                            </div>
                            <div className="flex-1">
                              <div className="bg-green-50 p-3 rounded-sm">
                                <p className="text-[#1e293b]">
                                  We&apos;ve identified the issue and implemented a fix. Please try refreshing your browser and clearing your cache. 
                                  The videos should now load properly on mobile devices.
                                </p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">Sarah Johnson • {currentTicket.updated}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Reply Form */}
                    <div className="border-t border-[#feefea] pt-6">
                      <h3 className="text-lg font-semibold text-[#1e293b] mb-3">Add Reply</h3>
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Type your reply here..."
                          className="min-h-[100px] rounded-sm border-[#feefea] focus:border-[#e27447] focus:ring-[#e27447]"
                        />
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            Your reply will be visible to the support team
                          </div>
                          <Button className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm">
                            <Reply className="w-4 h-4 mr-2" />
                            Send Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Create Ticket Tab */}
          <TabsContent value="create" className="mt-6">
            <Card className="max-w-4xl mx-auto rounded-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e293b]">Create New Ticket</CardTitle>
                <CardDescription>
                  Describe your issue or question and we&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-[#1e293b] mb-2">
                    Subject *
                  </label>
                  <Input
                    placeholder="Brief description of your issue..."
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                    className="rounded-sm border-[#feefea] focus:border-[#e27447] focus:ring-[#e27447]"
                  />
                </div>

                {/* Category and Priority */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1e293b] mb-2">
                      Category *
                    </label>
                    <select
                      value={newTicket.category}
                      onChange={(e) => setNewTicket(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447]"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1e293b] mb-2">
                      Priority *
                    </label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full p-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447]"
                    >
                      {priorities.map(priority => (
                        <option key={priority.id} value={priority.id}>
                          {priority.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-[#1e293b] mb-2">
                    Description *
                  </label>
                  <Textarea
                    placeholder="Please provide detailed information about your issue or question..."
                    value={newTicket.description}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                    className="min-h-[200px] rounded-sm border-[#feefea] focus:border-[#e27447] focus:ring-[#e27447]"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-4 border-t border-[#feefea]">
                  <div className="text-sm text-muted-foreground">
                    * Required fields
                  </div>
                  <Button 
                    onClick={createTicket}
                    className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Create Ticket
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
})

export default HelpdeskTemplate

