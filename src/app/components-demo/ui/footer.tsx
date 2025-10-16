"use client";

import Link from "next/link";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#fffefd] text-[#1e293b] border-t border-[#feefea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                <Image
                  src="/images/main_logo.webp"
                  alt="ShriArya LMS Logo"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1e293b]">
                Shrividhya Classes
              </h3>
            </div>
            <p className="text-[#1e293b] text-xs sm:text-sm leading-relaxed">
              Ecosystem of Excellence - A modern learning management system
              designed to provide quality education through interactive courses,
              comprehensive learning materials, and expert guidance.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                Modern Learning
              </Badge>
              <Badge
                variant="outline"
                className="text-xs border-[#feefea] text-[#1e293b]"
              >
                Interactive
              </Badge>
            </div>
            <div className="flex items-center space-x-3 mt-2">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e293b] hover:text-[#0f172a] transition-colors"
                aria-label="Follow us on Twitter"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e293b] hover:text-[#0f172a] transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <span className="text-xs sm:text-sm text-[#1e293b]">
                Follow us
              </span>
            </div>
          </div>

          {/* Learning */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-[#1e293b]">
              Learning
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-[#1e293b]">
              <li>
                <Link
                  href="/courses"
                  className="hover:text-[#e27447] transition-colors"
                >
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/learning-paths"
                  className="hover:text-[#e27447] transition-colors"
                >
                  Learning Paths
                </Link>
              </li>
              <li>
                <Link
                  href="/certificates"
                  className="hover:text-[#e27447] transition-colors"
                >
                  Certificates
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="hover:text-[#e27447] transition-colors"
                >
                  Learning Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className="hover:text-[#e27447] transition-colors"
                >
                  Video Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/discover"
                  className="hover:text-[#e27447] transition-colors"
                >
                  Course Discovery
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-[#e27447] transition-colors"
                >
                  My Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-[#1e293b]">
              Support
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-[#1e293b]">
              <li>
                <Link
                  href="/help"
                  className="hover:text-[#e27447] transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-[#e27447] transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#e27447] transition-colors"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="hover:text-[#e27447] transition-colors"
                >
                  Community Forum
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#e27447] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-[#e27447] transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold text-[#1e293b]">
              Contact
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-[#1e293b]">
              <p className="text-[#e27447] font-medium flex items-center space-x-2">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1e293b] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="break-all">contact@shrividhya.in</span>
              </p>
              <p className="text-[#e27447] font-medium">📞 +91 - 8130711689</p>
              <div className="text-[#1e293b]">
                <p className="font-semibold text-[#1e293b]">
                  Shrividhya Classes
                </p>
                <p>2919P, Ground Floor</p>
                <p>Sushant Lok 2, Sector 57</p>
                <p>Gurugram, Haryana 122003, IN</p>
              </div>
            </div>
            <div className="space-y-2">
              <Link href="/auth">
                <Button size="sm" className="w-full rounded-sm">
                  Start Learning
                </Button>
              </Link>
              <Link href="/courses/discover">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-sm border-[#e27447] text-[#e27447] hover:bg-[#e27447] hover:text-white"
                >
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#feefea] mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 gap-4">
            <div className="text-xs sm:text-sm text-[#1e293b] text-center sm:text-left">
              © 2019-2025 Shrivyapar Private Limited. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-xs sm:text-sm text-[#1e293b]">
              <Link
                href="/privacy"
                className="hover:text-[#e27447] transition-colors whitespace-nowrap"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-[#e27447] transition-colors whitespace-nowrap"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
