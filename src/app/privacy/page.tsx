'use client'

import { Button } from "@/app/components-demo/ui/ui-components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components-demo/ui/ui-components/card"
import { Shield, Eye, Lock, Users, Calendar } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary to-muted mb-20">
          <div className="container mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-[#feefea] rounded-sm flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-[#e27447]" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
            {/* Introduction */}
            <Card className="mb-8 border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e293b] flex items-center space-x-3">
                  <Eye className="w-6 h-6 text-[#e27447]" />
                  <span>Introduction</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  This Privacy Policy describes how ShriArya LMS (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and shares your personal information when you use our learning management platform and related services.
                </p>
                <p>
                  By using our services, you agree to the collection and use of information in accordance with this policy. We are committed to protecting your privacy and ensuring the security of your personal data.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="mb-8 border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e293b] flex items-center space-x-3">
                  <Lock className="w-6 h-6 text-[#e27447]" />
                  <span>Information We Collect</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-[#1e293b] mb-3">Personal Information</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Name and contact information (email, phone number)</li>
                    <li>• Account credentials and profile information</li>
                    <li>• Educational background and preferences</li>
                    <li>• Payment and billing information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#1e293b] mb-3">Usage Information</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Course progress and completion data</li>
                    <li>• Learning preferences and behavior patterns</li>
                    <li>• Device information and IP addresses</li>
                    <li>• Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card className="mb-8 border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e293b]">How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#1e293b]">Service Provision</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Provide and maintain our learning platform</li>
                      <li>• Process course enrollments and payments</li>
                      <li>• Deliver personalized learning experiences</li>
                      <li>• Send important service notifications</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#1e293b]">Improvement & Analytics</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Analyze usage patterns and trends</li>
                      <li>• Improve platform functionality</li>
                      <li>• Develop new features and services</li>
                      <li>• Conduct research and surveys</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card className="mb-8 border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e293b]">Information Sharing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#1e293b]">Service Providers</h4>
                    <p className="text-sm">
                      We work with trusted third-party service providers who assist us in operating our platform, processing payments, and providing customer support.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#1e293b]">Legal Requirements</h4>
                    <p className="text-sm">
                      We may disclose information when required by law, court order, or government request, or to protect our rights and safety.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="mb-8 border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e293b] flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-[#e27447]" />
                  <span>Data Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-[#feefea] rounded-sm">
                    <Lock className="w-8 h-8 text-[#e27447] mx-auto mb-2" />
                    <h5 className="font-semibold text-[#1e293b] mb-1">Encryption</h5>
                    <p className="text-xs">All data is encrypted in transit and at rest</p>
                  </div>
                  <div className="text-center p-4 bg-[#feefea] rounded-sm">
                    <Shield className="w-8 h-8 text-[#e27447] mx-auto mb-2" />
                    <h5 className="font-semibold text-[#1e293b] mb-1">Access Control</h5>
                    <p className="text-xs">Strict access controls and authentication</p>
                  </div>
                  <div className="text-center p-4 bg-[#feefea] rounded-sm">
                    <Eye className="w-8 h-8 text-[#e27447] mx-auto mb-2" />
                    <h5 className="font-semibold text-[#1e293b] mb-1">Monitoring</h5>
                    <p className="text-xs">Continuous security monitoring and audits</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="mb-8 border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e293b]">Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#e27447] rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1e293b]">Access</h4>
                        <p className="text-sm text-muted-foreground">Request access to your personal information</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#e27447] rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1e293b]">Correction</h4>
                        <p className="text-sm text-muted-foreground">Request correction of inaccurate information</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#e27447] rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1e293b]">Deletion</h4>
                        <p className="text-sm text-muted-foreground">Request deletion of your personal data</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#e27447] rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1e293b]">Portability</h4>
                        <p className="text-sm text-muted-foreground">Request data portability in a structured format</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mb-8 border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e293b]">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold text-[#1e293b] mb-2">Email</h4>
                    <p className="text-sm">privacy@shriarya.com</p>
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
                Questions About Privacy?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our privacy team is here to help. Contact us for any concerns about your data.
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-[#e27447] hover:bg-[#e27447]/90">
                  Contact Support
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
