"use client";

import Link from "next/link";
import { Button } from "@/design-system/components/ui/button";
import { Badge } from "@/design-system/components/ui/badge";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Company Info */}
          <div className="space-y-4 sm:space-y-5 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden flex-shrink-0 shadow-lg p-1">
                <Image
                  src="/images/preppeo_icon.png"
                  alt="Preppeo Icon"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Preppeo
              </h3>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Ecosystem of Excellence - A modern learning management system
              designed to provide quality education through interactive courses,
              comprehensive learning materials, and expert guidance.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="text-xs bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
                Modern Learning
              </Badge>
              <Badge className="text-xs bg-white/10 text-white border-white/20 hover:bg-white/20">
                Interactive
              </Badge>
            </div>
          </div>

          {/* Learning & Boards Combined */}
          <div className="space-y-4 sm:space-y-5">
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Learning
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base text-gray-300">
              <li>
                <Link
                  href="/courses/discover"
                  className="hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/enrolled"
                  className="hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  My Courses
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4 sm:space-y-5">
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Company
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base text-gray-300">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 sm:space-y-5">
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Contact
            </h4>
            <div className="space-y-3 text-sm sm:text-base text-gray-300">
              <p className="text-primary font-medium flex items-center space-x-2 hover:text-primary/80 transition-colors">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0"
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
                <span className="break-all">contact@preppeo.com</span>
              </p>
              <p className="text-primary font-medium hover:text-primary/80 transition-colors">📞 +91 - 8130711689</p>
              <div className="text-gray-300 mt-4 pt-4 border-t border-gray-700">
                <p className="font-semibold text-white mb-2">
                  Preppeo
                </p>
                <p>2919P, Ground Floor</p>
                <p>Sushant Lok 2, Sector 57</p>
                <p>Gurugram, Haryana 122003, IN</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 sm:mt-10 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 gap-4">
            <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              © 2019-2025 Shrivyapar Private Limited. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
              <Link
                href="/privacy-policy"
                className="hover:text-primary transition-colors whitespace-nowrap"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-use"
                className="hover:text-primary transition-colors whitespace-nowrap"
              >
                Terms of Service
              </Link>
              <Link
                href="/refund-policy"
                className="hover:text-primary transition-colors whitespace-nowrap"
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
