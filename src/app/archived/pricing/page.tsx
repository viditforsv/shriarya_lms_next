'use client'

import { Button } from "@/design-system/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/design-system/components/ui/card"
import { Badge } from "@/design-system/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  const toggleBilling = () => {
    setIsYearly(!isYearly)
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary to-muted mb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Choose the plan that&apos;s right for your learning journey. All plans include our core features with no hidden fees.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <span className={`${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={toggleBilling}
                className="relative w-16 h-8 bg-[#e27447] rounded-full cursor-pointer transition-colors duration-200"
              >
                <div 
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                    isYearly ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              <Badge className="bg-[#feefea] text-[#e27447] border-[#e27447]">
                Save 20%
              </Badge>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="relative p-8">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-[#1e293b]">Free</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Perfect for exploring our platform
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-[#1e293b]">₹0</span>
                  <span className="text-muted-foreground">/{isYearly ? 'year' : 'month'}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Access to free courses</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Basic progress tracking</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Community support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Mobile app access</span>
                  </li>
                </ul>
                <Link href="/auth">
                  <Button variant="outline" className="w-full mt-6 border-primary hover:bg-primary hover:text-white">
                    Get Started Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Student Plan */}
            <Card className="relative p-8 border-2 border-[#e27447] transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-[#e27447] text-white border-0 px-4 py-2">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-[#1e293b]">Student</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Ideal for individual students
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-[#1e293b]">
                    ₹{isYearly ? Math.round(999 * 12 * 0.8) : 999}
                  </span>
                  <span className="text-muted-foreground">/{isYearly ? 'year' : 'month'}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">All free courses</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Access to paid courses</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Detailed progress tracking</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Practice tests & assignments</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Email support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Download certificates</span>
                  </li>
                </ul>
                <Link href="/auth">
                  <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                    Start Learning
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative p-8">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-[#1e293b]">Premium</CardTitle>
                <CardDescription className="text-muted-foreground">
                  For serious learners and families
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-[#1e293b]">
                    ₹{isYearly ? Math.round(1999 * 12 * 0.8) : 1999}
                  </span>
                  <span className="text-muted-foreground">/{isYearly ? 'year' : 'month'}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Everything in Student</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">1-on-1 tutoring sessions</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Priority support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Advanced analytics</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Study group access</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Custom study plans</span>
                  </li>
                </ul>
                <Link href="/contact">
                  <Button variant="outline" className="w-full mt-6 border-primary hover:bg-primary hover:text-white">
                    Contact Sales
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[#1e293b] mb-12 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#feefea]">
                  <th className="text-left p-4 font-semibold text-[#1e293b]">Features</th>
                  <th className="text-center p-4 font-semibold text-[#1e293b]">Free</th>
                  <th className="text-center p-4 font-semibold text-[#1e293b]">Student</th>
                  <th className="text-center p-4 font-semibold text-[#1e293b]">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#feefea]">
                  <td className="p-4 text-muted-foreground">Free Courses</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                </tr>
                <tr className="border-b border-[#feefea]">
                  <td className="p-4 text-muted-foreground">Paid Courses</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                </tr>
                <tr className="border-b border-[#feefea]">
                  <td className="p-4 text-muted-foreground">Practice Tests</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                </tr>
                <tr className="border-b border-[#feefea]">
                  <td className="p-4 text-muted-foreground">1-on-1 Tutoring</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">✅</td>
                </tr>
                <tr className="border-b border-[#feefea]">
                  <td className="p-4 text-muted-foreground">Support</td>
                  <td className="p-4 text-center">Community</td>
                  <td className="p-4 text-center">Email</td>
                  <td className="p-4 text-center">Priority</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[#1e293b] mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can start with our free plan and upgrade anytime. No credit card required to start.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We accept all major credit cards, UPI, net banking, and digital wallets.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We offer a 7-day money-back guarantee for all paid plans.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="p-12 bg-gradient-to-br from-[#feefea] to-[#fffefd] border-[#e27447]">
            <CardHeader>
              <CardTitle className="text-3xl text-[#1e293b] mb-4">Ready to Start Learning?</CardTitle>
              <CardDescription className="text-lg">
                Join thousands of students who are already learning with ShriArya LMS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 justify-center">
                <Link href="/auth">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-primary hover:bg-primary hover:text-white">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
