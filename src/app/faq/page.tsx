"use client";

import { useState, memo } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  BookOpen,
  CreditCard,
  Settings,
  Users,
  HelpCircle,
} from "lucide-react";

// WhatsApp SVG icon component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
  </svg>
);

const FAQPage = memo(function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "courses", name: "Courses & Learning", icon: BookOpen },
    { id: "billing", name: "Billing & Payments", icon: CreditCard },
    { id: "account", name: "Account & Settings", icon: Settings },
    { id: "technical", name: "Technical Support", icon: Settings },
    { id: "general", name: "General", icon: Users },
  ];

  const faqs = [
    {
      id: 1,
      category: "courses",
      question: "How do I enroll in a course?",
      answer:
        "To enroll in a course, simply browse our course catalog, select the course you're interested in, and click the \"Enroll\" button. For paid courses, you'll be redirected to the payment page. Free courses can be accessed immediately after enrollment.",
    },
    {
      id: 2,
      category: "courses",
      question: "Can I access course materials offline?",
      answer:
        "Yes! You can download course materials including PDFs, notes, and some video content for offline viewing. Look for the download icon next to each resource. Note that interactive content like quizzes requires an internet connection.",
    },
    {
      id: 3,
      category: "courses",
      question: "How long do I have access to a course?",
      answer:
        "Once enrolled, you have lifetime access to the course materials. This includes all videos, notes, quizzes, and downloadable resources. You can revisit the content anytime at your own pace.",
    },
    {
      id: 4,
      category: "courses",
      question: "What if I need help with course content?",
      answer:
        "We provide multiple support channels: discussion forums within each course, direct messaging with instructors, and our helpdesk system. You can also join our community Discord server for peer-to-peer support.",
    },
    {
      id: 5,
      category: "billing",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For institutional purchases, we also accept purchase orders and can arrange custom billing terms.",
    },
    {
      id: 6,
      category: "billing",
      question: "Can I get a refund if I'm not satisfied?",
      answer:
        "Yes, we offer a 30-day money-back guarantee for all courses. If you're not satisfied with your purchase, contact our support team within 30 days of enrollment for a full refund, no questions asked.",
    },
    {
      id: 7,
      category: "billing",
      question: "Do you offer student discounts?",
      answer:
        "Yes! We offer a 20% student discount on all courses. To qualify, you need to provide a valid student ID or enrollment verification. Contact our support team to apply for the discount.",
    },
    {
      id: 8,
      category: "account",
      question: "How do I reset my password?",
      answer:
        "Click on \"Forgot Password\" on the login page, enter your email address, and we'll send you a password reset link. The link will be valid for 24 hours. If you don't receive the email, check your spam folder.",
    },
    {
      id: 9,
      category: "account",
      question: "Can I change my email address?",
      answer:
        "Yes, you can update your email address in your account settings. You'll need to verify the new email address before the change takes effect. All course access and certificates will be transferred to the new email.",
    },
    {
      id: 10,
      category: "account",
      question: "How do I update my profile information?",
      answer:
        'Go to your account settings and click on "Edit Profile". You can update your name, profile picture, bio, and other personal information. Changes are saved automatically.',
    },
    {
      id: 11,
      category: "technical",
      question: "The video is not loading properly. What should I do?",
      answer:
        "Try refreshing the page first. If the issue persists, check your internet connection and try switching to a different browser. For mobile users, ensure you're using a recent version of Chrome, Safari, or Firefox.",
    },
    {
      id: 12,
      category: "technical",
      question: "Can I use the platform on mobile devices?",
      answer:
        "Yes! Our platform is fully responsive and works on all mobile devices. We recommend using the latest version of Chrome, Safari, or Firefox for the best experience. You can also download our mobile app for iOS and Android.",
    },
    {
      id: 13,
      category: "technical",
      question: "Why is my certificate not downloading?",
      answer:
        "Make sure you've completed all course requirements including quizzes and assignments. Certificates are generated automatically upon completion. If you're still having issues, try using a different browser or clear your browser cache.",
    },
    {
      id: 14,
      category: "general",
      question: "Do you offer certificates for completed courses?",
      answer:
        "Yes! Upon successful completion of a course (including passing all quizzes and assignments), you'll receive a digital certificate that you can download and share on LinkedIn or print for your records.",
    },
    {
      id: 15,
      category: "general",
      question: "How do I contact customer support?",
      answer:
        "You can reach our support team through multiple channels: email support@shriarya.com, live chat on our website, or submit a ticket through our helpdesk system. We typically respond within 24 hours.",
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#feefea] to-[#fffefd] border-b border-primary py-6 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our platform, courses, and
            services. Can&apos;t find what you&apos;re looking for? Contact our
            support team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 rounded-sm border-gray-200 focus:border-primary focus:ring-[#e27447]"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "primary" : "outline"
                }
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-sm ${
                  selectedCategory === category.id
                    ? "bg-primary hover:bg-primary/90 text-white"
                    : "border-gray-200 hover:border-primary hover:bg-primary/10"
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            );
          })}
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => {
              const isExpanded = expandedItems.includes(faq.id);
              return (
                <Card
                  key={faq.id}
                  className="rounded-sm border-gray-200 hover:border-primary transition-colors"
                >
                  <CardHeader
                    className="cursor-pointer"
                    onClick={() => toggleExpanded(faq.id)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-foreground pr-4">
                        {faq.question}
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-sm"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-primary" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-primary" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  {isExpanded && (
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  )}
                </Card>
              );
            })
          ) : (
            <Card className="rounded-sm text-center py-12">
              <CardContent>
                <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No FAQs Found
                </h3>
                <p className="text-muted-foreground mb-4">
                  We couldn&apos;t find any FAQs matching your search criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="rounded-sm"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact Support Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="bg-primary/10 border-primary rounded-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground mb-2">
                Still Need Help?
              </CardTitle>
              <CardDescription className="text-lg">
                Our support team is here to assist you with any questions or
                issues.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <WhatsAppIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Live Chat
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chat with our support team on WhatsApp
                  </p>
                  <Button
                    className="bg-primary hover:bg-primary/90 rounded-sm"
                    onClick={() =>
                      window.open(
                        "https://wa.me/918130711689?text=Hello! I would like to get support.",
                        "_blank"
                      )
                    }
                  >
                    Start Chat
                  </Button>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Email Support
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Send us an email and we&apos;ll respond within 24 hours
                  </p>
                  <Button
                    variant="outline"
                    className="border-primary hover:bg-primary hover:text-white rounded-sm"
                    onClick={() =>
                      window.open(
                        "mailto:contact@preppeo.com?subject=Support Request",
                        "_blank"
                      )
                    }
                  >
                    Send Email
                  </Button>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Phone Support
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Call us for immediate assistance
                  </p>
                  <Button
                    variant="outline"
                    className="border-primary hover:bg-primary hover:text-white rounded-sm"
                    onClick={() => window.open("tel:+918130711689", "_blank")}
                  >
                    Call Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
});

export default FAQPage;
