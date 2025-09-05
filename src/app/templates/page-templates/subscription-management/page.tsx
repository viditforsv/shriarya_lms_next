'use client'
import { memo } from "react"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components-demo/ui/card"
import { Button } from "@/app/components-demo/ui/button"
import { Badge } from "@/app/components-demo/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components-demo/ui/tabs"
import { CompletionDot } from "@/app/components-demo/ui/template-status"
import {
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Crown,
  Star,
  Zap,
  Users,
  BookOpen,
  Download,
  Settings,
  Bell,
  Shield,
  Lock,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  TrendingUp,
  Award,
  Gift,
  Clock
} from 'lucide-react'

const SubscriptionManagementTemplate = memo(function SubscriptionManagementTemplate() {
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [billingCycle, setBillingCycle] = useState('monthly')

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      features: [
        'Access to basic courses',
        'Community support',
        'Basic progress tracking',
        'Mobile app access'
      ],
      limitations: [
        'Limited to 3 courses',
        'No certificates',
        'Basic analytics'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      period: 'month',
      features: [
        'Unlimited course access',
        'Priority support',
        'Advanced analytics',
        'Certificate generation',
        'Downloadable content',
        'Mobile app access',
        'Progress tracking'
      ],
      limitations: [],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      period: 'month',
      features: [
        'Everything in Pro',
        'Custom branding',
        'API access',
        'White-label solution',
        'Dedicated support',
        'Custom integrations',
        'Advanced reporting',
        'Team management'
      ],
      limitations: [],
      popular: false
    }
  ]

  const currentSubscription = {
    plan: 'Pro',
    status: 'active',
    nextBilling: '2024-02-15',
    amount: 29,
    cycle: 'monthly',
    features: [
      'Unlimited course access',
      'Priority support',
      'Advanced analytics',
      'Certificate generation'
    ]
  }

  const billingHistory = [
    {
      id: 1,
      date: '2024-01-15',
      amount: 29,
      status: 'paid',
      description: 'Pro Plan - Monthly'
    },
    {
      id: 2,
      date: '2023-12-15',
      amount: 29,
      status: 'paid',
      description: 'Pro Plan - Monthly'
    },
    {
      id: 3,
      date: '2023-11-15',
      amount: 29,
      status: 'paid',
      description: 'Pro Plan - Monthly'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'expired': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
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
              <h1 className="text-4xl font-bold font-cardo mb-2">Subscription Management</h1>
              <p className="text-lg text-gray-300 font-dm-sans">
                Manage your subscription plans and billing
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{currentSubscription.plan}</div>
                <div className="text-sm text-gray-300">Current Plan</div>
              </div>
              <Badge className={`rounded-sm ${getStatusColor(currentSubscription.status)}`}>
                {currentSubscription.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="current" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-sm bg-white p-1 shadow-sm">
            <TabsTrigger
              value="current"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Crown className="w-4 h-4 mr-2" />
              Current Plan
            </TabsTrigger>
            <TabsTrigger
              value="plans"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Star className="w-4 h-4 mr-2" />
              Plans
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Billing
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Current Plan Tab */}
          <TabsContent value="current" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo flex items-center gap-2">
                    <Crown className="w-5 h-5 text-[#e27447]" />
                    Current Subscription
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 font-cardo">
                        {currentSubscription.plan} Plan
                      </h3>
                      <p className="text-gray-600">
                        ${currentSubscription.amount}/{currentSubscription.cycle}
                      </p>
                    </div>
                    <Badge className={`rounded-sm ${getStatusColor(currentSubscription.status)}`}>
                      {currentSubscription.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Included Features:</h4>
                    {currentSubscription.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      Next billing: {new Date(currentSubscription.nextBilling).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Modify Plan
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-sm text-red-600 hover:text-red-700">
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#e27447]" />
                    Usage Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#e27447]">12</div>
                      <div className="text-sm text-gray-600">Courses Enrolled</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">8</div>
                      <div className="text-sm text-gray-600">Certificates Earned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">156</div>
                      <div className="text-sm text-gray-600">Hours Learned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">92%</div>
                      <div className="text-sm text-gray-600">Completion Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Plans Tab */}
          <TabsContent value="plans" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-cardo">Choose Your Plan</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant={billingCycle === 'monthly' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setBillingCycle('monthly')}
                  className="rounded-sm"
                >
                  Monthly
                </Button>
                <Button
                  variant={billingCycle === 'yearly' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setBillingCycle('yearly')}
                  className="rounded-sm"
                >
                  Yearly (Save 20%)
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map(plan => (
                <Card 
                  key={plan.id} 
                  className={`rounded-sm relative ${
                    plan.popular ? 'border-[#e27447] shadow-lg' : 'border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-[#e27447] text-white rounded-sm">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="font-cardo text-xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">
                        ${billingCycle === 'yearly' ? Math.round(plan.price * 12 * 0.8) : plan.price}
                      </span>
                      <span className="text-gray-600">
                        /{billingCycle === 'yearly' ? 'year' : plan.period}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {plan.limitations.length > 0 && (
                      <div className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-600" />
                            <span className="text-sm text-gray-500">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <Button 
                      className={`w-full rounded-sm ${
                        plan.id === selectedPlan 
                          ? 'bg-[#e27447] hover:bg-[#d65a2b]' 
                          : 'bg-gray-600 hover:bg-gray-700'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.id === selectedPlan ? 'Current Plan' : 'Select Plan'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-sm">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-[#e27447]" />
                      <div>
                        <p className="font-medium">**** **** **** 4242</p>
                        <p className="text-sm text-gray-600">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full rounded-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Billing Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-sm">
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-gray-600">123 Main Street</p>
                    <p className="text-sm text-gray-600">New York, NY 10001</p>
                    <p className="text-sm text-gray-600">United States</p>
                  </div>
                  <Button variant="outline" className="w-full rounded-sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Update Address
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="font-cardo">Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {billingHistory.map(bill => (
                    <div key={bill.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-sm">
                      <div>
                        <p className="font-medium">{bill.description}</p>
                        <p className="text-sm text-gray-600">{new Date(bill.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">${bill.amount}</span>
                        <Badge className={`rounded-sm ${getStatusColor(bill.status)}`}>
                          {bill.status}
                        </Badge>
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="font-cardo">Subscription Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Auto-renewal</h4>
                      <p className="text-sm text-gray-600">Automatically renew your subscription</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Email notifications</h4>
                      <p className="text-sm text-gray-600">Receive billing and renewal notifications</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Invoice emails</h4>
                      <p className="text-sm text-gray-600">Send invoices to your email</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-4">Danger Zone</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full rounded-sm text-red-600 hover:text-red-700">
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancel Subscription
                    </Button>
                    <Button variant="outline" className="w-full rounded-sm text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
})

export default SubscriptionManagementTemplate
