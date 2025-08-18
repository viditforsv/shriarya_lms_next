'use client'

import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Star } from "lucide-react"
import Link from "next/link"

export default function PricingPageTemplate() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="mb-12">
          <Link 
            href="/templates" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Link>
        </div>

        {/* Template Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1e293b] mb-4">Pricing Page Template</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A professional pricing page template featuring multiple pricing tiers, feature comparisons, and call-to-action sections.
          </p>
        </div>

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary to-muted mb-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Choose the plan that&apos;s right for you. All plans include our core features with no hidden fees.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <span className="text-muted-foreground">Monthly</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" id="billing-toggle" />
                <label htmlFor="billing-toggle" className="block w-16 h-8 bg-[#e27447] rounded-full cursor-pointer">
                  <div className="block w-6 h-6 bg-white rounded-full transform transition-transform duration-200 ease-in-out translate-x-1"></div>
                </label>
              </div>
              <span className="text-foreground font-medium">Yearly</span>
              <Badge className="bg-[#feefea] text-[#e27447] border-[#e27447]">
                Save 20%
              </Badge>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <Card className="relative p-8 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-[#1e293b]">Starter</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Perfect for individuals and small projects
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-[#1e293b]">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Up to 5 projects</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Basic analytics</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Email support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Mobile app access</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6 border-[#1e293b] hover:bg-[#1e293b] hover:text-white">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="relative p-8 border-2 border-[#e27447] hover:shadow-lg transition-shadow duration-300 transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-[#e27447] text-white border-0 px-4 py-2">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-[#1e293b]">Professional</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Ideal for growing businesses and teams
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-[#1e293b]">$79</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Up to 25 projects</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Advanced analytics</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Priority support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Team collaboration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">API access</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Custom integrations</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-[#e27447] hover:bg-[#e27447]/90">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative p-8 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-[#1e293b]">Enterprise</CardTitle>
                <CardDescription className="text-muted-foreground">
                  For large organizations with custom needs
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-[#1e293b]">$199</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Unlimited projects</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Enterprise analytics</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">24/7 phone support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Advanced security</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Custom development</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[#e27447] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Dedicated account manager</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6 border-[#1e293b] hover:bg-[#1e293b] hover:text-white">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="mb-20">
          <h3 className="text-3xl font-bold text-[#1e293b] mb-12 text-center">Feature Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#feefea]">
                  <th className="text-left p-4 font-semibold text-[#1e293b]">Features</th>
                  <th className="text-center p-4 font-semibold text-[#1e293b]">Starter</th>
                  <th className="text-center p-4 font-semibold text-[#1e293b]">Professional</th>
                  <th className="text-center p-4 font-semibold text-[#1e293b]">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#feefea]">
                  <td className="p-4 text-muted-foreground">Projects</td>
                  <td className="p-4 text-center">5</td>
                  <td className="p-4 text-center">25</td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b border-[#feefea]">
                  <td className="p-4 text-muted-foreground">Team Members</td>
                  <td className="p-4 text-center">1</td>
                  <td className="p-4 text-center">10</td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b border-[#feefea]">
                  <td className="p-4 text-muted-foreground">Storage</td>
                  <td className="p-4 text-center">10 GB</td>
                  <td className="p-4 text-center">100 GB</td>
                  <td className="p-4 text-center">1 TB</td>
                </tr>
                <tr className="border-b border-[#feefea]">
                  <td className="p-4 text-muted-foreground">Support</td>
                  <td className="p-4 text-center">Email</td>
                  <td className="p-4 text-center">Priority</td>
                  <td className="p-4 text-center">24/7 Phone</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h3 className="text-3xl font-bold text-[#1e293b] mb-8 text-center">Frequently Asked Questions</h3>
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
                  Professional plans come with a 14-day free trial. No credit card required to start.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and bank transfers for annual plans.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee for all paid plans.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="p-12 bg-gradient-to-br from-[#feefea] to-[#fffefd] border-[#e27447]">
            <CardHeader>
              <CardTitle className="text-3xl text-[#1e293b] mb-4">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg">
                Join thousands of satisfied customers who trust our platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-[#e27447] hover:bg-[#e27447]/90">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="border-[#1e293b] hover:bg-[#1e293b] hover:text-white">
                  Schedule Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Template Usage Instructions */}
        <div className="mt-20 bg-[#feefea] rounded-sm border border-[#e27447] p-8">
          <h3 className="text-2xl font-bold text-[#1e293b] mb-6">Template Usage Instructions</h3>
          <div className="space-y-4 text-[#1e293b]">
            <p><strong>1. Pricing Plans:</strong> Update the pricing tiers, features, and descriptions to match your business model.</p>
            <p><strong>2. Feature Comparison:</strong> Customize the comparison table with your actual features and limitations.</p>
            <p><strong>3. Billing Toggle:</strong> Implement the monthly/yearly billing toggle functionality.</p>
            <p><strong>4. FAQ Section:</strong> Replace the FAQ questions and answers with your business-specific information.</p>
            <p><strong>5. CTA Buttons:</strong> Connect the call-to-action buttons to your signup or contact forms.</p>
            <p><strong>6. Styling:</strong> Adjust colors, fonts, and spacing to match your brand guidelines.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
