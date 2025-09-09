'use client'
import { memo } from "react"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components-demo/ui/ui-components/card"
import { Button } from "@/app/components-demo/ui/ui-components/button"
import { Badge } from "@/app/components-demo/ui/ui-components/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components-demo/ui/tabs"
import { CompletionDot } from "@/app/components-demo/ui/template-status"
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  FileText,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Shield,
  RefreshCw,
  Download,
  Eye,
  Edit,
  Send,
  User,
  BookOpen,
  Award,
  HelpCircle,
  MessageCircle,
  Star,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'

const RefundTemplate = memo(function RefundTemplate() {
  const [refundReason, setRefundReason] = useState('')
  const [refundAmount, setRefundAmount] = useState('')

  const refundRequests = [
    {
      id: 1,
      orderId: 'ORD-2024-001234',
      courseName: 'Complete Mathematics Course - Class 10',
      amount: 2999,
      requestDate: '2024-01-20',
      status: 'pending',
      reason: 'Course content not as expected',
      description: 'The course content was different from what was advertised. The videos were outdated and the practice questions were too basic.',
      user: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1-234-567-8900'
      }
    },
    {
      id: 2,
      orderId: 'ORD-2024-001156',
      courseName: 'Physics Masterclass - Advanced Level',
      amount: 1999,
      requestDate: '2024-01-18',
      status: 'approved',
      reason: 'Technical issues',
      description: 'Unable to access course materials due to platform technical issues.',
      user: {
        name: 'Michael Chen',
        email: 'michael.chen@email.com',
        phone: '+1-234-567-8901'
      }
    },
    {
      id: 3,
      orderId: 'ORD-2024-001089',
      courseName: 'Premium Support Package',
      amount: 499,
      requestDate: '2024-01-15',
      status: 'rejected',
      reason: 'Changed mind',
      description: 'Decided not to continue with the course after purchasing.',
      user: {
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@email.com',
        phone: '+1-234-567-8902'
      }
    }
  ]

  const refundPolicy = {
    timeLimit: '30 days',
    eligibleReasons: [
      'Course content not as advertised',
      'Technical issues preventing access',
      'Duplicate purchase',
      'Instructor not available',
      'Course quality issues'
    ],
    nonEligibleReasons: [
      'Changed mind after 30 days',
      'Completed more than 50% of course',
      'Downloaded course materials',
      'Used certificate features'
    ],
    processingTime: '5-7 business days',
    refundMethods: ['Original payment method', 'Store credit', 'Bank transfer']
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'approved': return <CheckCircle className="w-4 h-4" />
      case 'rejected': return <XCircle className="w-4 h-4" />
      case 'processing': return <RefreshCw className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#feefea] to-[#fffefd]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e293b] to-[#2d3748] text-white py-8 relative">
        <CompletionDot isCompleted={true} />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-cardo mb-2">Refund Management</h1>
              <p className="text-lg text-gray-300 font-dm-sans">
                Process refund requests and manage refund policies
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{refundRequests.length}</div>
                <div className="text-sm text-gray-300">Total Requests</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">
                  {refundRequests.filter(r => r.status === 'approved').length}
                </div>
                <div className="text-sm text-gray-300">Approved</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-sm bg-white p-1 shadow-sm">
            <TabsTrigger
              value="requests"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <FileText className="w-4 h-4 mr-2" />
              Requests
            </TabsTrigger>
            <TabsTrigger
              value="policy"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Shield className="w-4 h-4 mr-2" />
              Policy
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Award className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-cardo">Refund Requests</h2>
              <div className="flex items-center gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447]">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
                <Button variant="outline" className="rounded-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {refundRequests.map(request => (
                <Card key={request.id} className="rounded-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 font-cardo">
                            {request.courseName}
                          </h3>
                          <Badge className={`rounded-sm ${getStatusColor(request.status)}`}>
                            {getStatusIcon(request.status)}
                            <span className="ml-1">{request.status}</span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Order ID:</strong> {request.orderId}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Amount:</strong> ₹{request.amount.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Request Date:</strong> {new Date(request.requestDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Reason:</strong> {request.reason}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>User:</strong> {request.user.name}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Email:</strong> {request.user.email}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-sm p-4 mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Description:</h4>
                          <p className="text-sm text-gray-600">{request.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {request.status === 'pending' && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 rounded-sm">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-sm text-red-600 hover:text-red-700">
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Policy Tab */}
          <TabsContent value="policy" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#e27447]" />
                    Refund Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Time Limit</span>
                      <Badge className="bg-blue-100 text-blue-800 rounded-sm">
                        {refundPolicy.timeLimit}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Processing Time</span>
                      <Badge className="bg-green-100 text-green-800 rounded-sm">
                        {refundPolicy.processingTime}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Eligible Reasons:</h4>
                    <ul className="space-y-1">
                      {refundPolicy.eligibleReasons.map((reason, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Non-Eligible Reasons:</h4>
                    <ul className="space-y-1">
                      {refundPolicy.nonEligibleReasons.map((reason, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <XCircle className="w-4 h-4 text-red-600" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#e27447]" />
                    Refund Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {refundPolicy.refundMethods.map((method, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-sm">
                        <CreditCard className="w-5 h-5 text-[#e27447]" />
                        <span className="font-medium">{method}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Important Notes:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Refunds are processed within 5-7 business days</li>
                      <li>• Refund amount may be subject to processing fees</li>
                      <li>• Partial refunds are available for partially completed courses</li>
                      <li>• Contact support for urgent refund requests</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Requests</p>
                      <p className="text-2xl font-bold text-gray-900">{refundRequests.length}</p>
                    </div>
                    <FileText className="w-8 h-8 text-[#e27447]" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Approved</p>
                      <p className="text-2xl font-bold text-green-600">
                        {refundRequests.filter(r => r.status === 'approved').length}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {refundRequests.filter(r => r.status === 'pending').length}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Amount</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ₹{refundRequests.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Refund Reasons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Course content not as expected</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-[#e27447] h-2 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Technical issues</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Changed mind</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Other</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Monthly Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[12, 8, 15, 10, 18, 14, 16].map((value, index) => (
                      <div key={index} className="flex flex-col items-center gap-2">
                        <div 
                          className="bg-[#e27447] rounded-t-sm w-8 transition-all duration-500"
                          style={{ height: `${(value / 20) * 200}px` }}
                        ></div>
                        <span className="text-xs text-gray-600">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][index]}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="font-cardo">Refund Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Refund Time Limit (days)
                    </label>
                    <input
                      type="number"
                      defaultValue={30}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Processing Time (days)
                    </label>
                    <input
                      type="number"
                      defaultValue={7}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Auto-approve Refunds
                  </label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded-sm" />
                    <span className="text-sm text-gray-600">Automatically approve refunds under ₹500</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Notifications
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded-sm" defaultChecked />
                      <span className="text-sm">Send email notifications for refund status updates</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded-sm" defaultChecked />
                      <span className="text-sm">Notify admin of new refund requests</span>
                    </label>
                  </div>
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

export default RefundTemplate
