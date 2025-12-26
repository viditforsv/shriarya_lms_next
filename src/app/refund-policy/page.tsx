import type { Metadata } from "next";
import { Breadcrumb } from "@/design-system/components/breadcrumb";

export const metadata: Metadata = {
  title: "Refund Policy | Preppeo",
  description:
    "Learn about Preppeo's refund policy. Understand our fair and transparent refund process for our learning services.",
  alternates: {
    canonical: "https://preppeo.com/refund-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Refund Policy", href: "/refund-policy" },
            ]}
          />
        </div>
      </div>

      {/* Refund Policy Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Refund Policy
            </h1>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-lg border-0 p-6 md:p-8 lg:p-12">
            <div className="prose prose-sm md:prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-6 md:mb-8">
                <p className="text-base md:text-lg text-foreground leading-relaxed mb-4 md:mb-6">
                  At{" "}
                  <span className="font-semibold text-primary">
                    Preppeo
                  </span>
                  , operated by <span className="font-semibold">Shrivyapar Private Limited</span>, we are committed to ensuring the satisfaction of our
                  students. Our refund policy is designed to provide a fair and
                  transparent process for requesting refunds on all our content.
                </p>
              </section>

              {/* Eligibility for Refund */}
              <section className="mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4">
                  Refund Policy
                </h2>
                <div className="bg-primary/10 border-l-4 border-primary p-4 md:p-6 rounded-lg mb-4 md:mb-6">
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    <strong className="text-primary">100% Refund:</strong> We
                    offer a full refund on a pro-rated basis within 7 working
                    days of your request. No questions asked. Feedback and
                    reason is appreciated if you are comfortable in sharing.
                  </p>
                </div>
              </section>

              {/* How to Request a Refund */}
              <section className="mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4">
                  How to Request a Refund
                </h2>
                <p className="text-base md:text-lg text-foreground leading-relaxed mb-4 md:mb-6">
                  To request a refund, please contact our support team at{" "}
                  <a
                    href="mailto:contact@preppeo.com"
                    className="text-primary hover:text-primary/80 underline font-semibold"
                  >
                    contact@preppeo.com
                  </a>{" "}
                  with your order details and the reason for the refund request.
                  Our team will review your request and get back to you within 7
                  business days.
                </p>
              </section>

              {/* Contact Information */}
              <section className="mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4">
                  Contact Information
                </h2>
                <p className="text-base md:text-lg text-foreground leading-relaxed mb-4 md:mb-6">
                  For any questions regarding our refund policy, please contact
                  us at{" "}
                  <a
                    href="mailto:contact@preppeo.com"
                    className="text-primary hover:text-primary/80 underline font-semibold"
                  >
                    contact@preppeo.com
                  </a>{" "}
                  or{" "}
                  <a
                    href="tel:+918130711689"
                    className="text-primary hover:text-primary/80 underline font-semibold"
                  >
                    +91-8130711689
                  </a>
                </p>
              </section>

              {/* Important Notes */}
              <section className="mb-6 md:mb-8">
                <div className="bg-primary/10 border-l-4 border-primary p-4 md:p-6 rounded-lg">
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-3">
                    Important Information
                  </h3>
                  <ul className="text-foreground space-y-2">
                    <li>
                      • All refund requests are processed within 7 working days
                    </li>
                    <li>
                      • Refunds are processed to the original payment method
                    </li>
                    <li>• Refunds are calculated on a pro-rated basis</li>
                    <li>
                      • No questions asked - simple and straightforward process
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-8 md:mt-12">
            <div className="bg-gradient-to-br from-primary to-emerald-600 rounded-lg p-6 md:p-8 shadow-xl">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                Need Help with Your Refund?
              </h3>
              <p className="text-white/90 mb-4 md:mb-6 text-sm md:text-base">
                Our support team is here to help you with any refund-related
                questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg"
                >
                  Contact Support
                </a>
                <a
                  href="mailto:contact@preppeo.com"
                  className="inline-flex items-center bg-white/20 text-white hover:bg-white/30 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Email Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
