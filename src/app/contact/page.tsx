'use client'

import { Button } from "@/app/components-demo/ui/ui-components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components-demo/ui/ui-components/card"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // You can integrate with your backend or email service
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary to-muted mb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Get in Touch
            </h1>
                          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Have questions about our courses or need support? We&apos;d love to hear from you. 
                Send us a message and we&apos;ll respond as soon as possible.
              </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-[#1e293b] mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#e27447]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e293b] mb-2">Email</h4>
                    <p className="text-muted-foreground">contact@shrividhya.in</p>
                                         <p className="text-sm text-muted-foreground">We&apos;ll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#e27447]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e293b] mb-2">Phone</h4>
                    <p className="text-muted-foreground">+91 - 8130711689</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri from 9am to 6pm</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#e27447]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e293b] mb-2">Office</h4>
                    <p className="text-muted-foreground">2919P, Ground Floor</p>
                    <p className="text-muted-foreground">Sushant Lok 2, Sector 57</p>
                    <p className="text-sm text-muted-foreground">Gurugram, Haryana 122003, India</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#e27447]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e293b] mb-2">Business Hours</h4>
                    <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
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
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#1e293b] mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
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
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
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
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447] transition-all"
                        placeholder="your-email@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1e293b] mb-2">
                        Subject *
                      </label>
                      <select 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447] transition-all"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="courses">Course Information</option>
                        <option value="enrollment">Enrollment Questions</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1e293b] mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447] transition-all resize-none"
                        placeholder="Tell us how we can help you..."
                        required
                      ></textarea>
                    </div>

                    <Button type="submit" className="w-full bg-[#e27447] hover:bg-[#e27447]/90 text-white py-3">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[#1e293b] mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">What courses do you offer?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We offer comprehensive courses for CBSE, ICSE, IBDP, and IGCSE curricula from Class 9 to 12.
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
                <CardTitle className="text-lg">Do you offer online consultations?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we offer video consultations and online meetings for your convenience.
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
      </div>
    </div>
  )
}
