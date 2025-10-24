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
          </div>

          {/* Learning & Boards Combined */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-[#1e293b]">
              Learning
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-[#1e293b]">
              <li>
                <Link
                  href="/courses/discover"
                  className="hover:text-[#e27447] transition-colors"
                >
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/enrolled"
                  className="hover:text-[#e27447] transition-colors"
                >
                  My Courses
                </Link>
              </li>
            </ul>

            <div className="mt-4">
              <h5 className="text-sm font-medium text-[#1e293b] mb-2">
                Boards
              </h5>
              <div className="grid grid-cols-2 gap-1 text-xs text-[#1e293b]">
                <Link
                  href="/courses/discover?curriculum=CBSE"
                  className="hover:text-[#e27447] transition-colors"
                >
                  CBSE
                </Link>
                <Link
                  href="/courses/discover?curriculum=ICSE"
                  className="hover:text-[#e27447] transition-colors"
                >
                  ICSE
                </Link>
                <Link
                  href="/courses/discover?curriculum=IBDP"
                  className="hover:text-[#e27447] transition-colors"
                >
                  IBDP
                </Link>
                <Link
                  href="/courses/discover?curriculum=IGCSE"
                  className="hover:text-[#e27447] transition-colors"
                >
                  IGCSE
                </Link>
                <Link
                  href="/courses/discover?curriculum=GMAT"
                  className="hover:text-[#e27447] transition-colors"
                >
                  GMAT
                </Link>
                <Link
                  href="/courses/discover?curriculum=SAT"
                  className="hover:text-[#e27447] transition-colors"
                >
                  SAT
                </Link>
              </div>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-[#1e293b]">
              Company
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-[#1e293b]">
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
                  href="/contact"
                  className="hover:text-[#e27447] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3 sm:space-y-4">
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
                href="https://shrividhya.in/privacy-policy/"
                className="hover:text-[#e27447] transition-colors whitespace-nowrap"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
              <Link
                href="https://shrividhya.in/terms-of-use/"
                className="hover:text-[#e27447] transition-colors whitespace-nowrap"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </Link>
              <Link
                href="https://shrividhya.in/refund-policy/"
                className="hover:text-[#e27447] transition-colors whitespace-nowrap"
                target="_blank"
                rel="noopener noreferrer"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
