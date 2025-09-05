'use client'

import { Button } from "@/app/components-demo/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components-demo/ui/card"
import { Badge } from "@/app/components-demo/ui/badge"
import { FileText, Scale, Users, Calendar, AlertTriangle } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary to-muted mb-20">
          <div className="container mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-[#feefea] rounded-sm flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-[#e27447]" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Please read these terms carefully before using our learning management platform.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Last updated: January 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Applies to all users</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            {/* Agreement */}
            <Card className="mb-8 border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e293b] flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-[#e27447]" />
                  <span>Agreement to Terms</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  By accessing and using ShriArya LMS (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement.
                </p>
                <p>
                  If you do not agree to abide by the above, please do not use this service. These Terms of Service govern your use of our learning management platform and related services.
                </p>
              </CardContent>
            </Card>

            {/* Service Description */}
            <Card className="mb-8 border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e293b]">Service Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  ShriArya LMS provides an online learning management platform that enables:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Access to educational courses and content</li>
                  <li>• Interactive learning tools and assessments</li>
                  <li>• Progress tracking and certification</li>
                  <li>• Communication between students and instructors</li>
                  <li>• Administrative tools for educational institutions</li>
                </ul>
              </CardContent>
            </Card>

            {/* User Accounts */}
            <Card className="mb-8 border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e293b] flex items-center space-x-3">
                  <Users className="w-6 h-6 text-[#e27447]" />
                  <span>User Accounts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-[#1e293b] mb-3">Account Creation</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• You must provide accurate and complete information</li>
                    <li>• You are responsible for maintaining account security</li>
                    <li>• You must be at least 13 years old to create an account</li>
                    <li>• One account per person is allowed</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#1e293b] mb-3">Account Responsibilities</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Keep your login credentials secure</li>
                    <li>• Notify us immediately of any unauthorized access</li>
                    <li>• You are responsible for all activities under your account</li>
                    <li>• Do not share your account with others</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Acceptable Use */}
            <Card className="mb-8 border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e293b] flex items-center space-x-3">
                  <AlertTriangle className="w-6 h-6 text-[#e27447]" />
                  <span>Acceptable Use Policy</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#1e293b]">Permitted Uses</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Accessing educational content for learning</li>
                      <li>• Participating in course discussions</li>
                      <li>• Submitting assignments and assessments</li>
                      <li>• Communicating with instructors and peers</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#1e293b]">Prohibited Uses</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Sharing copyrighted content without permission</li>
                      <li>• Harassment or bullying of other users</li>
                      <li>• Attempting to hack or disrupt the service</li>
                      <li>• Using the service for commercial purposes</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card className="mb-8 border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e293b]">Intellectual Property Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h4 className="font-semibold text-[#1e293b] mb-2">Our Content</h4>
                  <p className="text-sm">
                    The Service and its original content, features, and functionality are owned by ShriArya LMS and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1e293b] mb-2">Your Content</h4>
                  <p className="text-sm">
                    You retain ownership of content you submit, but grant us a license to use, modify, and distribute it for educational purposes within our platform.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card className="mb-8 border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e293b] flex items-center space-x-3">
                  <Scale className="w-6 h-6 text-[#e27447]" />
                  <span>Payment Terms</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#1e293b]">Subscription Plans</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Monthly and yearly billing options</li>
                      <li>• Automatic renewal unless cancelled</li>
                      <li>• Price changes with 30-day notice</li>
                      <li>• Refunds as per our refund policy</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#1e293b]">Payment Processing</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Secure payment processing</li>
                      <li>• Multiple payment methods accepted</li>
                      <li>• Failed payments may result in service suspension</li>
                      <li>• All fees are non-refundable unless specified</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card className="mb-8 border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e293b]">Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#1e293b]">Grounds for Termination</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Violation of these Terms</li>
                      <li>• Fraudulent or illegal activity</li>
                      <li>• Non-payment of fees</li>
                      <li>• Extended inactivity</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#1e293b]">After Termination</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Access to service will be revoked</li>
                      <li>• Data may be deleted after 30 days</li>
                      <li>• Outstanding fees must be paid</li>
                      <li>• Certain terms survive termination</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card className="mb-8 border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e293b]">Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  In no event shall ShriArya LMS, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.
                </p>
                <p>
                  Our liability is limited to the amount you paid for the service in the 12 months preceding the claim.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mb-8 border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e293b]">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold text-[#1e293b] mb-2">Email</h4>
                    <p className="text-sm">legal@shriarya.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e293b] mb-2">Address</h4>
                    <p className="text-sm">
                      ShriArya LMS<br />
                      123 Learning Street<br />
                      Education City, EC 12345
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="text-center">
          <Card className="max-w-2xl mx-auto border-[#e27447] bg-gradient-to-br from-[#feefea] to-[#fffefd]">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold text-[#1e293b] mb-4">
                Questions About Terms?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our legal team is here to help. Contact us for any questions about these terms.
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-[#e27447] hover:bg-[#e27447]/90">
                  Contact Legal Team
                </Button>
                <Button variant="outline" className="border-[#1e293b] hover:bg-[#1e293b] hover:text-white">
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
