"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#81c3c9]/20 text-[#1b4a56] border-t border-[#4a6f73]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image 
                src="/images/logo_small.png"
                alt="Singhwal Techlaw Logo"
                width={32} 
                height={32}
                className="w-8 h-8"
              />
              <h3 className="text-xl font-bold text-[#1b4a56]">Singhwal Techlaw</h3>
            </div>
            <p className="text-[#4a6f73] text-sm">
              Premium Intellectual Property Service Provider with scientists and engineers-turned-lawyers. 
              Specializing in patent procurement, prosecution, oppositions and tech-intensive agreements.
            </p>
            <div className="flex space-x-2">
              <Badge variant="secondary" className="text-xs">Premium IP Services</Badge>
              <Badge variant="outline" className="text-xs border-[#4a6f73] text-[#4a6f73]">Since 2016</Badge>
            </div>
            <div className="flex items-center space-x-3 mt-2">
              <a 
                href="https://www.linkedin.com/company/singhwal-techlaw-private-limited" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#ff2768] hover:text-[#ff2768]/80 transition-colors"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <span className="text-sm text-[#8A8A8A]">2,864+ followers</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#1b4a56]">Services</h4>
            <ul className="space-y-2 text-sm text-[#4a6f73]">
              <li><a href="/services/patent-portfolio" className="hover:text-[#1b4a56] transition-colors">Patent Portfolio Development</a></li>
              <li><a href="/services/ip-strategy" className="hover:text-[#1b4a56] transition-colors">IP Strategy Consulting</a></li>
              <li><a href="/services/patent-drafting" className="hover:text-[#1b4a56] transition-colors">Patent Drafting</a></li>
              <li><a href="/services/global-filing" className="hover:text-[#1b4a56] transition-colors">Global Filing</a></li>
              <li><a href="/services/risk-assessment" className="hover:text-[#1b4a56] transition-colors">IP Risk Assessment</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#1b4a56]">Solutions</h4>
            <ul className="space-y-2 text-sm text-[#4a6f73]">
              <li><a href="/solutions/startups" className="hover:text-[#1b4a56] transition-colors">Startup IP Protection</a></li>
              <li><a href="/solutions/enterprise" className="hover:text-[#1b4a56] transition-colors">Enterprise IP Management</a></li>
              <li><a href="/solutions/international" className="hover:text-[#1b4a56] transition-colors">International Expansion</a></li>
              <li><a href="/solutions/outsourcing" className="hover:text-[#1b4a56] transition-colors">IP Outsourcing</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#1b4a56]">Contact</h4>
            <div className="space-y-2 text-sm text-[#4a6f73]">
              <p className="text-[#ff2768] font-medium flex items-center space-x-2">
                <svg className="w-4 h-4 text-[#4a6f73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@singhwal.com</span>
              </p>
              <p className="text-[#ff2768] font-medium">📞 080500 10199</p>
              <div className="text-[#4a6f73]">
                <p className="font-semibold text-[#1b4a56]">Singhwal Techlaw (OPC) Private Limited</p>
                <p>No.11, First Floor, Nandanam Colony</p>
                <p>10th Main, 5th Cross, Horamavu</p>
                <p>Bangalore, Karnataka 560043, IN</p>
              </div>
            </div>
            <div className="space-y-2">
              <Button size="sm" className="w-full">Get Free Consultation</Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#4a6f73] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-[#8A8A8A]">
              © 2017-2025 Singhwal Techlaw OPC Private Limited. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-[#8A8A8A]">
              <a href="/privacy" className="hover:text-[#1b4a56] transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-[#1b4a56] transition-colors">Terms of Service</a>
              <a href="/sitemap" className="hover:text-[#1b4a56] transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 