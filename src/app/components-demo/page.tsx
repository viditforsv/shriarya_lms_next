"use client";

import { Button } from "@/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Badge } from "@/design-system/components/ui/badge";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
import { Pagination } from "@/design-system/components/pagination";
import {
  Sidebar,
  SidebarItem,
} from "@/design-system/components/layout-components/sidebar";
import { SignInForm } from "@/design-system/components/form-components/SignInForm";
import { SignUpForm } from "@/design-system/components/form-components/SignUpForm";
import { MCQQuestionExample } from "@/design-system/components/course-components/mcq-question";

import { useState, useEffect, useCallback, memo } from "react";

// Separate component for pagination to avoid hooks order issues
const PaginationSection = memo(function PaginationSection() {
  const [currentPage, setCurrentPage] = useState(3);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <section className="mb-20">
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4 font-dm-sans">
          Pagination Components
        </h2>
        <p className="text-slate-600 text-lg">
          Pagination controls and navigation
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h4 className="text-lg font-semibold mb-4">Basic Pagination</h4>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={handlePageChange}
          />
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Navigation Only</h4>
          <Pagination
            currentPage={2}
            totalPages={5}
            onPageChange={() => {}}
            showPageNumbers={false}
          />
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Page Numbers Only</h4>
          <Pagination
            currentPage={1}
            totalPages={3}
            onPageChange={() => {}}
            showNavigation={false}
          />
        </div>
      </div>
    </section>
  );
});

const ComponentsDemoPage = memo(function ComponentsDemoPage() {
  const [activeTab, setActiveTab] = useState("colors");
  const [isMounted, setIsMounted] = useState(false);
  const [cdnUrl, setCdnUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const tabs = [
    {
      id: "colors",
      label: "Colors",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
    },
    {
      id: "buttons",
      label: "Buttons",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.122 2.122"
          />
        </svg>
      ),
    },
    {
      id: "forms",
      label: "Forms",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: "cards",
      label: "Cards",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
    },
    {
      id: "badges",
      label: "Badges",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      ),
    },
    {
      id: "breadcrumbs",
      label: "Breadcrumbs",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      ),
    },
    {
      id: "layout",
      label: "Layout",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
    },
    {
      id: "typography",
      label: "Typography",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      ),
    },
    {
      id: "interactive",
      label: "Interactive",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      id: "mcq",
      label: "MCQ Questions",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: "navigation",
      label: "Navigation",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ),
    },
    {
      id: "utilities",
      label: "Utilities",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
    {
      id: "pagination",
      label: "Pagination",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
    {
      id: "auth",
      label: "Auth Components",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
      ),
    },
    {
      id: "course-specific",
      label: "Course Components",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      id: "content",
      label: "Content Components",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: "cdn-test",
      label: "CDN Link Tester",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      ),
    },
  ];

  const renderColorsSection = () => (
    <section className="mb-20">
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4 font-dm-sans">
          Color Palette
        </h2>
        <p className="text-slate-600 text-lg">Design system colors</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div className="text-center group">
          <div className="w-16 h-16 bg-[#1e293b] rounded-lg mx-auto mb-3 shadow-md group-"></div>
          <p className="text-sm font-medium text-slate-700">#1e293b</p>
        </div>
        <div className="text-center group">
          <div className="w-16 h-16 bg-[#e27447] rounded-lg mx-auto mb-3 shadow-md group-"></div>
          <p className="text-sm font-medium text-slate-700">#e27447</p>
        </div>
        <div className="text-center group">
          <div className="w-16 h-16 bg-[#ffffff] border-2 border-slate-200 rounded-lg mx-auto mb-3 shadow-md group-"></div>
          <p className="text-sm font-medium text-slate-700">#ffffff</p>
        </div>
        <div className="text-center group">
          <div className="w-16 h-16 bg-[#feefea] rounded-lg mx-auto mb-3 shadow-md group-"></div>
          <p className="text-sm font-medium text-slate-700">#feefea</p>
        </div>
        <div className="text-center group">
          <div className="w-16 h-16 bg-[#fffefd] border-2 border-slate-200 rounded-lg mx-auto mb-3 shadow-md group-"></div>
          <p className="text-sm font-medium text-slate-700">#fffefd</p>
        </div>
        <div className="text-center group">
          <div className="w-16 h-16 bg-[#d6ebf4] rounded-lg mx-auto mb-3 shadow-md group-"></div>
          <p className="text-sm font-medium text-slate-700">#d6ebf4</p>
        </div>
      </div>
    </section>
  );

  const renderButtonsSection = () => (
    <section className="mb-20">
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4 font-dm-sans">
          Button Components
        </h2>
        <p className="text-slate-600 text-lg">
          Core button variants and sizes for the LMS
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-slate-200 shadow-sm ">
          <CardHeader className="bg-slate-50/50">
            <CardTitle className="text-xl text-slate-800">
              Button Variants
            </CardTitle>
            <CardDescription className="text-slate-600">
              All available button styles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="coral">Coral</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="loadMore">Load More</Button>
              <Button variant="primary" showArrow>
                With Arrow
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm ">
          <CardHeader className="bg-slate-50/50">
            <CardTitle className="text-xl text-slate-800">
              Button Sizes
            </CardTitle>
            <CardDescription className="text-slate-600">
              Available size options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm" variant="primary">
                Small
              </Button>
              <Button size="default" variant="primary">
                Default
              </Button>
              <Button size="lg" variant="primary">
                Large
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );

  const renderFormsSection = () => (
    <section className="mb-20">
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4 font-dm-sans">
          Form Components
        </h2>
        <p className="text-slate-600 text-lg">Input fields and form elements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-slate-200 shadow-sm ">
          <CardHeader className="bg-slate-50/50">
            <CardTitle className="text-xl text-slate-800">
              Basic Inputs
            </CardTitle>
            <CardDescription className="text-slate-600">
              Standard form fields
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full px-3 py-2 border border-slate-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1b4a56] focus:border-[#1b4a56] transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 border border-slate-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1b4a56] focus:border-[#1b4a56] transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                placeholder="Enter message"
                rows={3}
                className="w-full px-3 py-2 border border-slate-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1b4a56] focus:border-[#1b4a56] transition-colors resize-none"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm ">
          <CardHeader className="bg-slate-50/50">
            <CardTitle className="text-xl text-slate-800">
              Validation States
            </CardTitle>
            <CardDescription className="text-slate-600">
              Input states and validation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-green-700">
                Valid Input
              </label>
              <input
                type="text"
                value="Valid content"
                className="w-full px-3 py-2 border border-green-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-red-700">
                Error Input
              </label>
              <input
                type="text"
                value="Invalid content"
                className="w-full px-3 py-2 border border-red-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Disabled Input
              </label>
              <input
                type="text"
                value="Disabled"
                disabled
                className="w-full px-3 py-2 border border-slate-200 rounded-sm bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );

  const renderCardsSection = () => (
    <section className="mb-20">
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4 font-dm-sans">
          Card Components
        </h2>
        <p className="text-slate-600 text-lg">Card layouts and variations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-slate-200 shadow-sm ">
          <CardHeader className="bg-slate-50/50">
            <CardTitle className="text-xl text-slate-800">Basic Card</CardTitle>
            <CardDescription className="text-slate-600">
              Standard card with header and content
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-slate-600">
              This is a basic card component with header, content, and
              description.
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm ">
          <CardHeader className="bg-slate-50/50">
            <CardTitle className="text-xl text-slate-800">
              Card with Footer
            </CardTitle>
            <CardDescription className="text-slate-600">
              Card including footer section
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-slate-600">Card content goes here.</p>
          </CardContent>
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200">
            <Button size="sm">Action</Button>
          </div>
        </Card>
      </div>
    </section>
  );

  const renderBadgesSection = () => (
    <section className="mb-20">
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4 font-dm-sans">
          Badge Components
        </h2>
        <p className="text-slate-600 text-lg">Status indicators and labels</p>
      </div>

      <div className="bg-slate-50/50 rounded-lg p-6 border border-slate-200">
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge className="bg-green-100 text-green-800">Success</Badge>
          <Badge className="bg-red-100 text-red-800">Error</Badge>
          <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
        </div>
      </div>
    </section>
  );

  const renderBreadcrumbsSection = () => (
    <section className="mb-20">
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4 font-dm-sans">
          Breadcrumb Components
        </h2>
        <p className="text-slate-600 text-lg">Navigation breadcrumbs</p>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-50/50 rounded-lg p-4 border border-slate-200">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Courses", href: "/courses" },
              { label: "Mathematics", href: "/courses/mathematics" },
              {
                label: "Algebra",
                href: "/courses/mathematics/algebra",
                isActive: true,
              },
            ]}
          />
        </div>

        <div className="bg-slate-50/50 rounded-lg p-4 border border-slate-200">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Profile", href: "/profile", isActive: true },
            ]}
          />
        </div>
      </div>
    </section>
  );

  const renderLayoutSection = () => (
    <section className="mb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4 font-dm-sans">
          Layout Components
        </h2>
        <p className="text-gray-600 text-lg">Layout and spacing utilities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 border border-gray-200 rounded-sm">
          <h4 className="font-semibold mb-2">Grid Layout</h4>
          <p className="text-sm text-gray-600">Responsive grid system</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-sm">
          <h4 className="font-semibold mb-2">Flex Layout</h4>
          <p className="text-sm text-gray-600">Flexbox utilities</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-sm">
          <h4 className="font-semibold mb-2">Container</h4>
          <p className="text-sm text-gray-600">Content containers</p>
        </div>
      </div>
    </section>
  );

  const renderTypographySection = () => (
    <section className="mb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4 font-dm-sans">
          Typography
        </h2>
        <p className="text-gray-600 text-lg">Text styles and fonts</p>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Heading 1</h1>
        <h2 className="text-3xl font-bold">Heading 2</h2>
        <h3 className="text-2xl font-semibold">Heading 3</h3>
        <h4 className="text-xl font-semibold">Heading 4</h4>
        <p className="text-base">
          Body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <p className="text-sm text-gray-600">
          Small text - Secondary information
        </p>
      </div>
    </section>
  );

  const renderInteractiveSection = () => (
    <section className="mb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4 font-dm-sans">
          Interactive Components
        </h2>
        <p className="text-gray-600 text-lg">
          Interactive elements and controls
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Toggles & Switches</CardTitle>
            <CardDescription>Interactive toggle elements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Enable notifications</span>
              <input type="checkbox" className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <span>Dark mode</span>
              <input type="checkbox" className="w-4 h-4" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Progress Indicators</CardTitle>
            <CardDescription>Loading and progress states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full bg-gray-200 rounded-sm h-2">
              <div
                className="bg-[#1b4a56] h-2 rounded-sm"
                style={{ width: "60%" }}
              ></div>
            </div>
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1b4a56] mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );

  const renderNavigationSection = () => (
    <section className="mb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4 font-dm-sans">
          Navigation Components
        </h2>
        <p className="text-gray-600 text-lg">Navigation elements and menus</p>
      </div>

      <div className="space-y-6">
        <div className="flex space-x-4">
          <a
            href="#"
            className="text-[#1b4a56] hover:text-[#1b4a56]/80 font-medium"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-[#1b4a56] font-medium"
          >
            Courses
          </a>
          <a
            href="/student-access"
            className="text-gray-600 hover:text-[#1b4a56] font-medium"
          >
            📚 Student File Access
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-[#1b4a56] font-medium"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-[#1b4a56] font-medium"
          >
            Contact
          </a>
        </div>

        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            Previous
          </Button>
          <Button size="sm" variant="outline">
            Next
          </Button>
        </div>
      </div>
    </section>
  );

  const renderUtilitiesSection = () => (
    <section className="mb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4 font-dm-sans">
          Utility Components
        </h2>
        <p className="text-gray-600 text-lg">Helper components and utilities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 border border-gray-200 rounded-sm">
          <h4 className="font-semibold mb-2">Separator</h4>
          <div className="w-full h-px bg-gray-200 my-2"></div>
          <p className="text-sm text-gray-600">Visual separators</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-sm">
          <h4 className="font-semibold mb-2">Spacer</h4>
          <div className="h-4"></div>
          <p className="text-sm text-gray-600">Spacing utilities</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-sm">
          <h4 className="font-semibold mb-2">Divider</h4>
          <div className="border-t border-gray-200 my-2"></div>
          <p className="text-sm text-gray-600">Section dividers</p>
        </div>
      </div>
    </section>
  );

  const renderAuthSection = () => (
    <section className="mb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4 font-dm-sans">
          Authentication Components
        </h2>
        <p className="text-gray-600 text-lg">
          Complete authentication system components
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Sign In Form</CardTitle>
            <CardDescription>
              Complete sign-in form with email/password and Google OAuth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-sm">
              <SignInForm />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Sign Up Form</CardTitle>
            <CardDescription>
              User registration form with role selection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-sm">
              <SignUpForm />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );

  const renderCourseSpecificSection = () => (
    <section className="mb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4 font-dm-sans">
          Course-Specific Components
        </h2>
        <p className="text-gray-600 text-lg">
          Components designed for course management and enrollment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Course Enrollment</CardTitle>
            <CardDescription>
              Component for handling course enrollment with access control
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-sm">
              <div className="bg-gray-900 text-green-400 p-4 rounded-sm text-sm font-mono">
                <pre>{`<CourseEnrollment 
  course={course} 
  onEnrollmentSuccess={() => console.log('Enrolled!')} 
/>`}</pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Course Access Badge</CardTitle>
            <CardDescription>
              Visual indicator for course access status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-sm">
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-800">Enrolled</Badge>
                <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                <Badge className="bg-red-100 text-red-800">Locked</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );

  const renderMCQSection = () => (
    <section className="mb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4 font-dm-sans">
          MCQ Questions
        </h2>
        <p className="text-gray-600 text-lg">
          Interactive multiple choice questions with feedback
        </p>
      </div>

      <div className="space-y-8">
        <MCQQuestionExample />
      </div>
    </section>
  );

  const renderContentSection = () => (
    <section className="mb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1b4a56] mb-4 font-dm-sans">
          Content Management Components
        </h2>
        <p className="text-gray-600 text-lg">
          Components for creating and editing educational content
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Section Editor</CardTitle>
            <CardDescription>
              Rich text editor for creating course content sections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-sm">
              <div className="bg-gray-900 text-green-400 p-4 rounded-sm text-sm font-mono">
                <pre>{`<SectionEditor
  content={sectionContent}
  onChange={(content) => setSectionContent(content)}
  placeholder="Enter your content here..."
/>`}</pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Course Content Section</CardTitle>
            <CardDescription>
              Component for displaying structured course content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-sm">
              <div className="bg-gray-900 text-green-400 p-4 rounded-sm text-sm font-mono">
                <pre>{`<CourseContentSection 
  title="Introduction to Algebra"
  content={content}
  type="lesson"
  duration="45 minutes"
/>`}</pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );

  const handleUrlChange = (url: string) => {
    setCdnUrl(url);
    setError("");
    setLoading(false);
    // Basic URL validation
    const urlPattern = /^https?:\/\/.+/;
    setIsValidUrl(urlPattern.test(url));
  };

  const handleLoadContent = () => {
    if (isValidUrl && cdnUrl) {
      // Content will be displayed inline in the component
      return;
    }
  };

  const clearCdnUrl = () => {
    setCdnUrl("");
    setIsValidUrl(false);
    setError("");
    setLoading(false);
  };

  const testProxyUrl = async () => {
    if (!isValidUrl || !cdnUrl) return;

    setLoading(true);
    setError("");

    try {
      const proxyUrl = `/api/cdn-proxy?url=${encodeURIComponent(cdnUrl)}`;
      const response = await fetch(proxyUrl);

      if (!response.ok) {
        throw new Error(
          `Proxy failed: ${response.status} ${response.statusText}`
        );
      }

      console.log("✅ Proxy URL working:", proxyUrl);
      setLoading(false);
    } catch (err) {
      console.error("❌ Proxy URL failed:", err);
      setError(err instanceof Error ? err.message : "Failed to test proxy URL");
      setLoading(false);
    }
  };

  const renderCDNTestSection = () => {
    const proxyUrl = `/api/cdn-proxy?url=${encodeURIComponent(cdnUrl)}`;

    return (
      <section className="mb-20">
        <div className="mb-8 pb-6 border-b border-slate-200">
          <h2 className="text-3xl font-bold text-[#1b4a56] mb-4 font-dm-sans">
            CDN Link Tester
          </h2>
          <p className="text-slate-600 text-lg">
            Test CDN links by embedding content directly on the page
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-slate-200 shadow-sm ">
            <CardHeader className="bg-slate-50/50">
              <CardTitle className="text-xl text-slate-800">CDN URL</CardTitle>
              <CardDescription className="text-slate-600">
                Enter your Bunny CDN file URL
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  CDN URL
                </label>
                <input
                  type="url"
                  placeholder="https://shrividhyaclasses.b-cdn.net/..."
                  value={cdnUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1b4a56] focus:border-[#1b4a56] transition-colors"
                />
                {cdnUrl && !isValidUrl && (
                  <p className="text-sm text-red-600">
                    Please enter a valid URL starting with http:// or https://
                  </p>
                )}
              </div>

              {cdnUrl && isValidUrl && (
                <div className="space-y-3">
                  <div className="p-3 bg-gray-100 rounded-sm">
                    <p className="text-sm font-medium mb-2">Proxy URL:</p>
                    <code className="text-sm break-all">{proxyUrl}</code>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={testProxyUrl}
                      disabled={loading}
                    >
                      {loading ? "Testing..." : "Test Proxy"}
                    </Button>
                    <Button size="sm" variant="outline" onClick={clearCdnUrl}>
                      Clear
                    </Button>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-sm">
                      <p className="text-sm text-red-800">❌ {error}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Live Preview */}
          {cdnUrl && isValidUrl && (
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50/50">
                <CardTitle className="text-xl text-slate-800">
                  Preview
                </CardTitle>
                <CardDescription className="text-slate-600">
                  File preview using the proxy
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-sm">
                    <p className="text-sm text-blue-800">
                      <strong>Direct Link:</strong>{" "}
                      <a href={proxyUrl} target="_blank" className="underline">
                        Open in new tab
                      </a>
                    </p>
                  </div>

                  <div className="h-96 border border-slate-200 rounded-sm overflow-hidden">
                    {cdnUrl.includes(".pdf") ? (
                      <object
                        data={proxyUrl}
                        type="application/pdf"
                        className="w-full h-full"
                      >
                        <iframe
                          src={proxyUrl}
                          className="w-full h-full"
                          title="PDF Fallback"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups"
                        />
                      </object>
                    ) : (
                      <iframe
                        src={proxyUrl}
                        className="w-full h-full"
                        title="File Preview"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups"
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Quick Test Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-sm">
                <h4 className="font-medium text-slate-700 mb-2">Sample PDF</h4>
                <p className="text-sm text-slate-600 mb-3">
                  Test with a sample PDF link
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleUrlChange(
                      "https://shrividhyaclasses.b-cdn.net/cbse10_maths/applications_of_trigonometry/sv_cbse10_cha_09.some_applications_of_trigonometry_l1_1.pdf"
                    )
                  }
                >
                  Use Sample Link
                </Button>
              </div>

              <div className="p-4 border border-slate-200 rounded-sm">
                <h4 className="font-medium text-slate-700 mb-2">
                  Sample Video
                </h4>
                <p className="text-sm text-slate-600 mb-3">
                  Test with a sample video link
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleUrlChange(
                      "https://shrividhyaclasses.b-cdn.net/AI%20Enabled%20QPG.mp4"
                    )
                  }
                >
                  Use Video Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "colors":
        return renderColorsSection();
      case "buttons":
        return renderButtonsSection();
      case "forms":
        return renderFormsSection();
      case "cards":
        return renderCardsSection();
      case "badges":
        return renderBadgesSection();
      case "breadcrumbs":
        return renderBreadcrumbsSection();
      case "layout":
        return renderLayoutSection();
      case "typography":
        return renderTypographySection();
      case "interactive":
        return renderInteractiveSection();
      case "mcq":
        return renderMCQSection();
      case "navigation":
        return renderNavigationSection();
      case "utilities":
        return renderUtilitiesSection();
      case "pagination":
        return <PaginationSection />;
      case "auth":
        return renderAuthSection();
      case "course-specific":
        return renderCourseSpecificSection();
      case "content":
        return renderContentSection();
      case "cdn-test":
        return renderCDNTestSection();
      default:
        return renderColorsSection();
    }
  };

  const sidebarItems: SidebarItem[] = tabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    icon: tab.icon,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex">
        <Sidebar
          title="Component Library"
          subtitle="Preppeo LMS Components"
          items={sidebarItems}
          activeItem={activeTab}
          onItemClick={(item) => setActiveTab(item.id)}
          showNumbers={true}
          collapsible={true}
          defaultCollapsed={false}
        />

        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-8 py-12">
            {/* Header Section */}
            <div className="mb-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1b4a56] to-[#4a6f73] rounded-xl mb-6 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1b4a56] to-[#4a6f73] bg-clip-text text-transparent mb-4">
                Component Library
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Comprehensive collection of reusable UI components for the
                Preppeo LMS platform
              </p>
            </div>

            {/* Content with enhanced styling */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              {isMounted ? (
                renderContent()
              ) : (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1b4a56]"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ComponentsDemoPage;
