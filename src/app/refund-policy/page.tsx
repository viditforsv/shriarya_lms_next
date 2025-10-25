import type { Metadata } from "next";
import { Breadcrumb } from "@/app/components-demo/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Refund Policy | Shrividhya Institute",
  description:
    "Learn about Shrividhya Institute's refund policy. Understand our fair and transparent refund process for mathematics coaching services.",
  alternates: {
    canonical: "https://shrividhya.in/refund-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#fffefd]">
      {/* Breadcrumb */}
      <div className="bg-white border-[#feefea]">
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1e293b] mb-4">
              Refund Policy
            </h1>
          </div>

          {/* Content */}
          <div className="bg-white rounded-sm shadow-sm border border-[#feefea] p-8 lg:p-12">
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-8">
                <p className="text-lg text-[#1e293b] leading-relaxed mb-6">
                  At{" "}
                  <span className="font-semibold text-[#e27447]">
                    Shrividhya Institute
                  </span>
                  , we are committed to ensuring the satisfaction of our
                  students. Our refund policy is designed to provide a fair and
                  transparent process for requesting refunds on all our content.
                </p>
              </section>

              {/* Eligibility for Refund */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#1e293b] mb-4">
                  Refund Policy
                </h2>
                <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-sm mb-6">
                  <p className="text-lg text-[#1e293b] leading-relaxed">
                    <strong className="text-[#e27447]">100% Refund:</strong> We
                    offer a full refund on a pro-rated basis within 7 working
                    days of your request. No questions asked. Feedback and
                    reason is appreciated if you are comfortable in sharing.
                  </p>
                </div>
              </section>

              {/* How to Request a Refund */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#1e293b] mb-4">
                  How to Request a Refund
                </h2>
                <p className="text-[#1e293b] leading-relaxed mb-6">
                  To request a refund, please contact our support team at{" "}
                  <a
                    href="mailto:contact@shrividhya.in"
                    className="text-[#e27447] hover:text-[#d1653a] underline"
                  >
                    contact@shrividhya.in
                  </a>{" "}
                  with your order details and the reason for the refund request.
                  Our team will review your request and get back to you within 7
                  business days.
                </p>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#1e293b] mb-4">
                  Contact Information
                </h2>
                <p className="text-[#1e293b] leading-relaxed mb-6">
                  For any questions regarding our refund policy, please contact
                  us at{" "}
                  <a
                    href="mailto:contact@shrividhya.in"
                    className="text-[#e27447] hover:text-[#d1653a] underline"
                  >
                    contact@shrividhya.in
                  </a>{" "}
                  or{" "}
                  <a
                    href="tel:+918130711689"
                    className="text-[#e27447] hover:text-[#d1653a] underline"
                  >
                    +91-8130711689
                  </a>
                </p>
              </section>

              {/* Important Notes */}
              <section className="mb-8">
                <div className="bg-blue-50 border-l-4 border-[#feefea]lue-400 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    Important Information
                  </h3>
                  <ul className="text-blue-800 space-y-2">
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
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-[#e27447] to-[#d1653a] rounded-sm p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Need Help with Your Refund?
              </h3>
              <p className="text-white/90 mb-6">
                Our support team is here to help you with any refund-related
                questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center bg-white text-[#e27447] hover:bg-gray-100 font-semibold py-3 px-6 rounded-sm transition-colors duration-200"
                >
                  Contact Support
                </a>
                <a
                  href="mailto:contact@shrividhya.in"
                  className="inline-flex items-center bg-white/20 text-white hover:bg-white/30 font-semibold py-3 px-6 rounded-sm transition-colors duration-200"
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
