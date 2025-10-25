import type { Metadata } from "next";
import { Breadcrumb } from "@/app/components-demo/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Terms of Use | Shrividhya Institute",
  description:
    "Read our Terms of Use to understand the rules and conditions for using Shrividhya Institute's mathematics coaching services and website.",
  alternates: {
    canonical: "https://shrividhya.in/terms-of-use",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-[#fffefd]">
      {/* Breadcrumb */}
      <div className="bg-white border-[#feefea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Terms of Use", href: "/terms-of-use" },
            ]}
          />
        </div>
      </div>

      {/* Terms of Use Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1e293b] mb-4">
              Terms of Use
            </h1>
            <p className="text-lg text-[#1e293b]/70">
              Effective Date:{" "}
              <span className="font-semibold text-[#e27447]">
                July 14, 2025
              </span>
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-sm shadow-sm border border-[#feefea] p-8 lg:p-12">
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-8">
                <p className="text-lg text-[#1e293b] leading-relaxed text-center mb-6">
                  Welcome to our website. If you continue to browse and use this
                  website, you agree to comply with and be bound by the
                  following terms and conditions of use, which, together with
                  our{" "}
                  <a
                    href="/privacy-policy"
                    className="text-[#e27447] underline hover:text-[#d1653a] transition-colors"
                  >
                    Privacy Policy
                  </a>
                  , govern Shrividhya Classes&apos; relationship with you in
                  relation to this website.
                </p>
              </section>

              {/* Definitions */}
              <section className="mb-8">
                <div className="bg-[#feefea] border-l-4 border-[#e27447] p-6 rounded-sm text-[#1e293b]">
                  <p className="font-semibold mb-2">
                    The term <b>&ldquo;Shrividhya Classes&rdquo;</b> or{" "}
                    <b>&ldquo;we&rdquo;</b> or <b>&ldquo;us&rdquo;</b> refers to
                    the owner of the website whose registered/operational office
                    is:
                  </p>
                  <div className="mt-2 mb-2 text-sm text-[#1e293b]/70">
                    <b>1387, Main Market, Chandni Chowk, Delhi – 110006</b>
                  </div>
                  <p className="font-semibold">
                    The term <b>&ldquo;you&rdquo;</b> refers to the user or
                    viewer of our website.
                  </p>
                </div>
              </section>

              {/* General Use */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#1e293b] mb-4">
                  1. General Use
                </h2>
                <ul className="list-disc pl-6 mb-6 text-[#1e293b] space-y-2">
                  <li>
                    The content on this website is for your general information
                    and use only. It is subject to change without notice.
                  </li>
                  <li>
                    Unauthorized use of this website may give rise to a claim
                    for damages and/or be a criminal offense.
                  </li>
                </ul>
              </section>

              {/* Accuracy of Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#1e293b] mb-4">
                  2. Accuracy of Information
                </h2>
                <ul className="list-disc pl-6 mb-6 text-[#1e293b] space-y-2">
                  <li>
                    Neither we nor any third parties provide any warranty or
                    guarantee as to the accuracy, timeliness, performance,
                    completeness, or suitability of the information and
                    materials found on this website for any particular purpose.
                  </li>
                  <li>
                    You acknowledge that such information and materials may
                    contain inaccuracies or errors, and we expressly exclude
                    liability for any such inaccuracies or errors to the fullest
                    extent permitted by law.
                  </li>
                </ul>
              </section>

              {/* Disclaimer of Liability */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#1e293b] mb-4">
                  3. Disclaimer of Liability
                </h2>
                <ul className="list-disc pl-6 mb-6 text-[#1e293b] space-y-2">
                  <li>
                    Your use of any information or materials on this website is
                    entirely at your own risk.
                  </li>
                  <li>
                    It is your responsibility to ensure that any products,
                    services, or information available through this website meet
                    your specific requirements.
                  </li>
                  <li>
                    We shall not be liable for any damages arising from your use
                    or misuse of the website content.
                  </li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#1e293b] mb-4">
                  4. Intellectual Property
                </h2>
                <ul className="list-disc pl-6 mb-6 text-[#1e293b] space-y-2">
                  <li>
                    This website contains material which is owned by or licensed
                    to us. This includes, but is not limited to, the design,
                    layout, look, appearance, and graphics.
                  </li>
                  <li>
                    Reproduction of any part of this site is prohibited, except
                    in accordance with the copyright notice or with prior
                    written consent.
                  </li>
                </ul>
              </section>

              {/* Trademarks */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#1e293b] mb-4">
                  5. Trademarks
                </h2>
                <ul className="list-disc pl-6 mb-6 text-[#1e293b] space-y-2">
                  <li>
                    All trademarks reproduced on this website which are not the
                    property of, or licensed to, Shrividhya Classes are
                    acknowledged on the website.
                  </li>
                </ul>
              </section>

              {/* External Links */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#1e293b] mb-4">
                  6. External Links
                </h2>
                <ul className="list-disc pl-6 mb-6 text-[#1e293b] space-y-2">
                  <li>
                    This website may contain links to other websites for your
                    convenience and further information.
                  </li>
                  <li>
                    We do not endorse the linked websites and are not
                    responsible for their content or practices.
                  </li>
                </ul>
              </section>

              {/* Linking to Our Website */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#1e293b] mb-4">
                  7. Linking to Our Website
                </h2>
                <ul className="list-disc pl-6 mb-6 text-[#1e293b] space-y-2">
                  <li>
                    You may not create a link to this website from another
                    website or document without our prior written consent.
                  </li>
                </ul>
              </section>

              {/* Governing Law */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#1e293b] mb-4">
                  8. Governing Law
                </h2>
                <ul className="list-disc pl-6 mb-6 text-[#1e293b] space-y-2">
                  <li>
                    Your use of this website and any dispute arising out of such
                    use is subject to the laws of <b>India</b>, under the
                    jurisdiction of <b>Gurugram, Haryana</b>, or other relevant
                    regulatory authorities.
                  </li>
                </ul>
              </section>

              {/* Payment Authorization Disclaimer */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#1e293b] mb-4">
                  9. Payment Authorization Disclaimer
                </h2>
                <ul className="list-disc pl-6 mb-6 text-[#1e293b] space-y-2">
                  <li>
                    We, as a merchant, shall not be liable for any loss or
                    damage arising directly or indirectly due to a decline of
                    authorization for any transaction.
                  </li>
                  <li>
                    This includes cases where the cardholder has exceeded the
                    preset limit mutually agreed upon with our acquiring bank.
                  </li>
                </ul>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#1e293b] mb-4">
                  10. Contact Us
                </h2>
                <p className="mb-2 text-[#1e293b]">
                  If you have any questions about these Terms of Use, you may
                  contact us at:
                </p>
                <p className="font-semibold text-[#e27447] text-lg">
                  📧 support[at]shrividhya[dot]in
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
