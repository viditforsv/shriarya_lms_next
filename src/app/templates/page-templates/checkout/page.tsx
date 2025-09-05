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
  Lock,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  BookOpen,
  Star,
  Award,
  Gift,
  Percent,
  Truck,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'

const CheckoutTemplate = memo(function CheckoutTemplate() {
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [billingAddress, setBillingAddress] = useState('same')

  const cartItems = [
    {
      id: 1,
      name: "Complete Mathematics Course - Class 10",
      type: "Course",
      price: 2999,
      originalPrice: 3999,
      discount: 25,
      duration: "6 months",
      instructor: "Dr. Sarah Johnson",
      rating: 4.8,
      students: 1250
    },
    {
      id: 2,
      name: "Physics Masterclass - Advanced Level",
      type: "Course",
      price: 1999,
      originalPrice: 2499,
      discount: 20,
      duration: "4 months",
      instructor: "Prof. Michael Chen",
      rating: 4.9,
      students: 890
    },
    {
      id: 3,
      name: "Premium Support Package",
      type: "Service",
      price: 499,
      originalPrice: 499,
      discount: 0,
      duration: "1 year",
      instructor: "Support Team",
      rating: 4.7,
      students: 450
    }
  ]

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, popular: true },
    { id: 'upi', name: 'UPI Payment', icon: Shield, popular: false },
    { id: 'netbanking', name: 'Net Banking', icon: Lock, popular: false },
    { id: 'wallet', name: 'Digital Wallet', icon: Gift, popular: false }
  ]

  const steps = [
    { id: 1, title: "Review Order", icon: BookOpen },
    { id: 2, title: "Payment Method", icon: CreditCard },
    { id: 3, title: "Billing Info", icon: User },
    { id: 4, title: "Confirmation", icon: CheckCircle }
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const totalDiscount = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0)
  const tax = subtotal * 0.18 // 18% GST
  const total = subtotal + tax

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#feefea] to-[#fffefd]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e293b] to-[#2d3748] text-white py-8 relative">
        <CompletionDot isCompleted={true} />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-cardo mb-2">Checkout</h1>
              <p className="text-lg text-gray-300 font-dm-sans">
                Complete your purchase securely
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{cartItems.length}</div>
                <div className="text-sm text-gray-300">Items</div>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <Card className="rounded-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        currentStep >= step.id 
                          ? 'bg-[#e27447] border-[#e27447] text-white' 
                          : 'border-gray-300 text-gray-500'
                      }`}>
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div className="ml-3">
                        <p className={`text-sm font-medium ${
                          currentStep >= step.id ? 'text-[#e27447]' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </p>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-16 h-0.5 mx-4 ${
                          currentStep > step.id ? 'bg-[#e27447]' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 1: Review Order */}
            {currentStep === 1 && (
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Review Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-sm">
                      <div className="w-16 h-16 bg-[#e27447] rounded-sm flex items-center justify-center text-white font-bold">
                        {item.type === 'Course' ? '📚' : '🛠️'}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 font-dm-sans">{item.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>By {item.instructor}</span>
                          <span>•</span>
                          <span>{item.duration}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{item.rating}</span>
                          </div>
                          <span>•</span>
                          <span>{item.students} students</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          {item.discount > 0 && (
                            <span className="text-sm text-gray-500 line-through">
                              ₹{item.originalPrice.toLocaleString()}
                            </span>
                          )}
                          <span className="text-lg font-bold text-[#e27447]">
                            ₹{item.price.toLocaleString()}
                          </span>
                        </div>
                        {item.discount > 0 && (
                          <Badge className="bg-green-100 text-green-800 rounded-sm text-xs">
                            {item.discount}% OFF
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Choose Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map(method => (
                      <div
                        key={method.id}
                        className={`p-4 border-2 rounded-sm cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? 'border-[#e27447] bg-[#feefea]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <method.icon className="w-6 h-6 text-[#e27447]" />
                            <span className="font-medium">{method.name}</span>
                          </div>
                          {method.popular && (
                            <Badge className="bg-[#e27447] text-white rounded-sm text-xs">
                              Popular
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          UPI ID
                        </label>
                        <input
                          type="text"
                          placeholder="yourname@paytm"
                          className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                        />
                      </div>
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-sm">
                        <p className="text-sm text-blue-800">
                          You&apos;ll be redirected to your UPI app to complete the payment
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                    <span className="text-sm text-gray-600">
                      Save this payment method for future purchases
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Billing Information */}
            {currentStep === 3 && (
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Billing Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="billing"
                      value="same"
                      checked={billingAddress === 'same'}
                      onChange={(e) => setBillingAddress(e.target.value)}
                      className="rounded-sm"
                    />
                    <span className="text-sm">Use same address for billing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="billing"
                      value="different"
                      checked={billingAddress === 'different'}
                      onChange={(e) => setBillingAddress(e.target.value)}
                      className="rounded-sm"
                    />
                    <span className="text-sm">Use different billing address</span>
                  </div>

                  {billingAddress === 'different' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded-sm" />
                    <span className="text-sm text-gray-600">
                      I agree to the Terms of Service and Privacy Policy
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Order Confirmation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 font-cardo mb-2">
                      Payment Successful!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Your order has been confirmed and you&apos;ll receive an email confirmation shortly.
                    </p>
                    <div className="bg-gray-50 rounded-sm p-4 mb-6">
                      <p className="text-sm text-gray-600 mb-2">Order ID: #ORD-2024-001234</p>
                      <p className="text-sm text-gray-600">Payment ID: #PAY-2024-567890</p>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <Button className="bg-[#e27447] hover:bg-[#d65a2b] text-white rounded-sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download Receipt
                      </Button>
                      <Button variant="outline" className="rounded-sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Receipt
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="rounded-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Step {currentStep} of {steps.length}</span>
                {currentStep < steps.length ? (
                  <Button
                    onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                    className="bg-[#e27447] hover:bg-[#d65a2b] text-white rounded-sm"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button className="bg-green-600 hover:bg-green-700 text-white rounded-sm">
                    Complete Order
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <Card className="rounded-sm sticky top-8">
              <CardHeader>
                <CardTitle className="font-cardo">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-gray-600">{item.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{item.price.toLocaleString()}</p>
                        {item.discount > 0 && (
                          <p className="text-xs text-green-600">Save ₹{(item.originalPrice - item.price).toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">-₹{totalDiscount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">GST (18%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-sm p-3">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      You saved ₹{totalDiscount.toLocaleString()}!
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Secure 256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span>Your payment information is safe</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4 text-green-600" />
                    <span>Instant access after payment</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Badges */}
            <Card className="rounded-sm">
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900 mb-3">Payment Security</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">SSL Secured</p>
                  </div>
                  <div className="text-center">
                    <Lock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">PCI Compliant</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
})

export default CheckoutTemplate

