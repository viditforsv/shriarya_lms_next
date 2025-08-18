'use client'

import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import Link from "next/link"

export default function ContactPageTemplate() {
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
          <h1 className="text-4xl font-bold text-[#1e293b] mb-4">Contact Page Template</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A professional contact page template featuring contact form, company information, and location details.
          </p>
        </div>

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary to-muted mb-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-[#1e293b] mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#e27447]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e293b] mb-2">Email</h4>
                    <p className="text-muted-foreground">[your-email@company.com]</p>
                    <p className="text-sm text-muted-foreground">We&apos;ll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#e27447]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e293b] mb-2">Phone</h4>
                    <p className="text-muted-foreground">[+1 (555) 123-4567]</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri from 8am to 6pm</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#e27447]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e293b] mb-2">Office</h4>
                    <p className="text-muted-foreground">[123 Business Street]</p>
                    <p className="text-muted-foreground">[City, State 12345]</p>
                    <p className="text-sm text-muted-foreground">United States</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#e27447]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e293b] mb-2">Business Hours</h4>
                    <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Saturday: 9:00 AM - 3:00 PM</p>
                    <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#1e293b]">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1e293b] mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447] transition-all"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1e293b] mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447] transition-all"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1e293b] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447] transition-all"
                      placeholder="your-email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1e293b] mb-2">
                      Subject *
                    </label>
                    <select className="w-full px-4 py-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447] transition-all">
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="sales">Sales Question</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1e293b] mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447] transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                  </div>

                  <Button className="w-full bg-[#e27447] hover:bg-[#e27447]/90 text-white py-3">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="mb-20">
          <h3 className="text-3xl font-bold text-[#1e293b] mb-8 text-center">Find Us</h3>
          <div className="bg-gradient-to-br from-[#feefea] to-[#fffefd] rounded-sm p-12 text-center border border-[#feefea]">
            <MapPin className="w-24 h-24 text-[#e27447] mx-auto mb-6" />
            <h4 className="text-xl font-semibold text-[#1e293b] mb-4">[Company Name] Office</h4>
            <p className="text-muted-foreground mb-4">[123 Business Street, City, State 12345]</p>
            <p className="text-sm text-muted-foreground">
              [Map placeholder - Replace with actual Google Maps embed or custom map component]
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h3 className="text-3xl font-bold text-[#1e293b] mb-8 text-center">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">What are your business hours?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We&apos;re open Monday through Friday from 8:00 AM to 6:00 PM, and Saturdays from 9:00 AM to 3:00 PM.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">How quickly do you respond to inquiries?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">Do you offer remote consultations?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we offer video consultations and remote meetings for your convenience.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">What information should I include in my message?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Please include your name, contact information, and a detailed description of your inquiry.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Template Usage Instructions */}
        <div className="mt-20 bg-[#feefea] rounded-sm border border-[#e27447] p-8">
          <h3 className="text-2xl font-bold text-[#1e293b] mb-6">Template Usage Instructions</h3>
          <div className="space-y-4 text-[#1e293b]">
            <p><strong>1. Contact Information:</strong> Replace all placeholder text in [brackets] with your actual company details.</p>
            <p><strong>2. Form Handling:</strong> Connect the contact form to your backend or email service.</p>
            <p><strong>3. Map Integration:</strong> Replace the map placeholder with Google Maps embed or custom map component.</p>
            <p><strong>4. Business Hours:</strong> Update the business hours to match your actual schedule.</p>
            <p><strong>5. FAQ Section:</strong> Customize the FAQ questions and answers for your business.</p>
            <p><strong>6. Styling:</strong> Adjust colors, fonts, and spacing to match your brand guidelines.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
