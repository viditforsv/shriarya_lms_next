"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SA</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">ShriArya LMS</h3>
            </div>
            <p className="text-gray-600 text-sm">
              A modern learning management system designed to provide quality education 
              through interactive courses, comprehensive learning materials, and expert guidance.
            </p>
            <div className="flex space-x-2">
              <Badge variant="secondary" className="text-xs">Modern Learning</Badge>
              <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">Interactive</Badge>
            </div>
            <div className="flex items-center space-x-3 mt-2">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <span className="text-sm text-gray-500">Follow us</span>
            </div>
          </div>

          {/* Learning */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Learning</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/courses" className="hover:text-blue-600 transition-colors">Browse Courses</Link></li>
              <li><Link href="/learning-paths" className="hover:text-blue-600 transition-colors">Learning Paths</Link></li>
              <li><Link href="/certificates" className="hover:text-blue-600 transition-colors">Certificates</Link></li>
              <li><Link href="/resources" className="hover:text-blue-600 transition-colors">Learning Resources</Link></li>
              <li><Link href="/tutorials" className="hover:text-blue-600 transition-colors">Video Tutorials</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/help" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact Support</Link></li>
              <li><Link href="/community" className="hover:text-blue-600 transition-colors">Community Forum</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Contact</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="text-blue-600 font-medium flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@shriarya.com</span>
              </p>
              <p className="text-blue-600 font-medium">📞 +91 98765 43210</p>
              <div className="text-gray-600">
                <p className="font-semibold text-gray-900">ShriArya Learning Solutions</p>
                <p>123 Learning Street</p>
                <p>Education District</p>
                <p>Mumbai, Maharashtra 400001, IN</p>
              </div>
            </div>
            <div className="space-y-2">
              <Link href="/auth">
                <Button size="sm" className="w-full">Start Learning</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © 2024 ShriArya Learning Solutions. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms of Service</Link>
              <Link href="/sitemap" className="hover:text-gray-700 transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 