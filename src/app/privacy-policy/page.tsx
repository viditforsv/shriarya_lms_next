import type { Metadata } from "next";
import { Breadcrumb } from "@/design-system/components/breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy | Preppeo",
  description:
    "Read our Privacy Policy to understand how Preppeo collects, uses, and protects your personal information. Learn about your privacy rights and data protection.",
  alternates: {
    canonical: "https://preppeo.com/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Privacy Policy", href: "/privacy-policy" },
            ]}
          />
        </div>
      </div>

      {/* Privacy Policy Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Effective Date:{" "}
              <span className="font-semibold text-primary">January 1, 2025</span>
            </p>
          </div>

          {/* Content Sections */}
          <div className="bg-white rounded-lg shadow-lg border-0 p-8 lg:p-12">
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-8">
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  At{" "}
                  <span className="font-semibold text-primary">
                    Preppeo
                  </span>
                  , operated by <span className="font-semibold">Shrivyapar Private Limited</span>, we are committed to protecting the privacy of our users.
                  This Privacy Policy explains how we collect, use, and disclose
                  personal information from users of our website{" "}
                  <a
                    href="https://www.preppeo.com"
                    className="text-primary underline hover:text-primary/80 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.preppeo.com
                  </a>{" "}
                  (the &ldquo;Site&rdquo;), including all subpages and services.
                  Please read this Privacy Policy carefully before using the
                  Site. By using the Site, you agree to this Privacy Policy. If
                  you do not agree, please do not use the Site.
                </p>
              </section>

              {/* Definitions */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Definitions and Key Terms
                </h2>
                <ul className="list-disc pl-6 mb-6 text-foreground space-y-2">
                  <li>
                    <b>&ldquo;Personal information&rdquo;</b> means information
                    that can be used to identify you, such as your name, email
                    address, phone number, and other contact details.
                  </li>
                  <li>
                    <b>&ldquo;Usage information&rdquo;</b> means information
                    about how you use the Site, such as the pages you visit, the
                    frequency of your visits, and the length of your visits.
                  </li>
                  <li>
                    <b>&ldquo;Device information&rdquo;</b> means information
                    about the device you use to access the Site, such as the
                    device type, operating system, and internet browser.
                  </li>
                </ul>
              </section>

              {/* Governance */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Governance and Law
                </h2>
                <p className="text-foreground">
                  This Privacy Policy is governed by the laws of Gurugram,
                  Haryana, India.
                </p>
              </section>

              {/* Information Collection */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Information Collection and Use
                </h2>
                <p className="mb-4 text-foreground">
                  We may collect the following types of information from you:
                </p>
                <ul className="list-disc pl-6 mb-6 text-foreground space-y-2">
                  <li>
                    <b>Personal information</b> – such as your name, email
                    address, phone number, and contact details.
                  </li>
                  <li>
                    <b>Usage information</b> – such as pages viewed, time spent,
                    and interactions on the Site.
                  </li>
                  <li>
                    <b>Device information</b> – such as browser type, operating
                    system, and device model.
                  </li>
                  <li>
                    <b>Location information</b> – such as your approximate
                    location for city-specific content (only with your consent).
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-primary mt-6 mb-2">
                  We collect this information through:
                </h3>
                <ul className="list-disc pl-6 mb-6 text-foreground space-y-2">
                  <li>
                    <b>Direct input</b> – e.g., when you fill out a contact or
                    inquiry form.
                  </li>
                  <li>
                    <b>Automatic tracking</b> – via cookies, analytics tools,
                    and similar technologies.
                  </li>
                  <li>
                    <b>Location detection</b> – via browser geolocation API
                    (with permission) or IP-based location services.
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-primary mt-6 mb-2">
                  We use this information to:
                </h3>
                <ul className="list-disc pl-6 mb-6 text-foreground space-y-2">
                  <li>Provide, improve, and maintain the Site</li>
                  <li>Respond to your inquiries and requests</li>
                  <li>Communicate news, updates, and promotional offers</li>
                  <li>Monitor and secure the Site</li>
                  <li>Analyze traffic and user behavior</li>
                  <li>Process payments, when applicable</li>
                  <li>Provide location-specific content and services</li>
                </ul>

                <div className="bg-primary/5 border-l-4 border-primary p-4 mb-6 rounded-lg">
                  <b>Note:</b> By using the Site, you consent to the collection
                  and use of your information in accordance with this Privacy
                  Policy.
                </div>
              </section>

              {/* Location Detection */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Location Detection and Privacy
                </h2>
                <p className="mb-4 text-foreground">
                  Our website may request access to your location to provide you
                  with city-specific content and services. Here&apos;s how we
                  handle location information:
                </p>
                <ul className="list-disc pl-6 mb-4 text-foreground space-y-2">
                  <li>
                    <b>Browser Permission Required</b> – We only access your
                    precise location with your explicit consent through your
                    browser&apos;s permission system.
                  </li>
                  <li>
                    <b>IP-Based Fallback</b> – If you decline location access,
                    we may use your IP address to determine your approximate
                    location for content personalization.
                  </li>
                  <li>
                    <b>City-Level Only</b> – We only determine your city/region,
                    not your exact address or coordinates.
                  </li>
                  <li>
                    <b>No Storage</b> – We do not store your precise location
                    coordinates or IP address in our databases.
                  </li>
                  <li>
                    <b>User Control</b> – You can manually select your preferred
                    city at any time, overriding any auto-detected location.
                  </li>
                  <li>
                    <b>Browser Settings</b> – You can disable location access
                    through your browser settings at any time.
                  </li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-sm">
                  <b>Location Privacy:</b>
                  <br />
                  Your location is used solely to enhance your experience by
                  showing relevant city-specific content. We do not track,
                  store, or share your precise location data with third parties.
                </div>
              </section>

              {/* Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Cookies and Tracking Technologies
                </h2>
                <p className="mb-6 text-foreground">
                  We use cookies and similar technologies to enhance your
                  experience, analyze usage, and deliver personalized content.
                  You can manage your cookie preferences via your browser
                  settings. Continued use of the Site implies consent to our use
                  of cookies.
                </p>
              </section>

              {/* Information Sharing */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Information Sharing and Disclosure
                </h2>
                <p className="mb-4 text-foreground">
                  We may share your information in the following situations:
                </p>
                <ul className="list-disc pl-6 mb-6 text-foreground space-y-2">
                  <li>
                    <b>With trusted third-party service providers</b> – such as
                    for hosting, analytics (e.g., Google Analytics), marketing,
                    or payment processing (e.g., Razorpay).
                  </li>
                  <li>
                    <b>Legal requirements</b> – such as a subpoena, court order,
                    or other governmental requests.
                  </li>
                  <li>
                    <b>Protection of rights</b> – to enforce our rights, prevent
                    fraud, or protect users.
                  </li>
                  <li>
                    <b>Business transfers</b> – such as during a merger,
                    acquisition, or asset sale.
                  </li>
                </ul>
              </section>

              {/* Data Security */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Data Security
                </h2>
                <p className="mb-4 text-foreground">
                  We take reasonable security measures, including encryption and
                  strict access controls, to protect your personal information.
                  However, no online system is 100% secure. If you believe your
                  interaction with us is compromised, please contact us
                  immediately.
                </p>
                <div className="bg-primary/5 border-l-4 border-primary p-4 mb-6 rounded-lg">
                  <b>Important:</b>
                  <br />
                  We do not store or process sensitive personal identity
                  information such as PAN, Aadhaar, Social Security numbers, or
                  credit/debit card details. Payments made through the Site are
                  handled by secure, third-party processors.
                </div>
              </section>

              {/* Child Protection */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Child Protection
                </h2>
                <p className="mb-6 text-foreground">
                  The Site is not intended for children under the age of 13. We
                  do not knowingly collect personal information from children
                  under 13. If you&apos;re a parent or guardian and believe your
                  child has provided personal information, please contact us at{" "}
                  <b>contact@preppeo.com</b>. We will promptly delete
                  any such data.
                </p>
              </section>

              {/* Your Rights */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Your Rights
                </h2>
                <p className="mb-4 text-foreground">
                  You may request access to, correction of, or deletion of your
                  personal information by contacting us. We will respond in
                  accordance with applicable Indian laws.
                </p>
                <p className="mb-4 text-foreground">
                  Regarding location information specifically, you have the
                  right to:
                </p>
                <ul className="list-disc pl-6 mb-6 text-foreground space-y-2">
                  <li>
                    <b>Opt-out</b> – Decline location access when prompted by
                    your browser
                  </li>
                  <li>
                    <b>Manual Selection</b> – Choose your preferred city
                    manually instead of using auto-detection
                  </li>
                  <li>
                    <b>Browser Control</b> – Manage location permissions through
                    your browser settings
                  </li>
                  <li>
                    <b>Clear Data</b> – Request removal of any stored location
                    preferences
                  </li>
                </ul>
              </section>

              {/* Changes to Policy */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Changes to This Privacy Policy
                </h2>
                <p className="mb-6 text-foreground">
                  We may update this Privacy Policy to reflect operational,
                  legal, or regulatory changes. When we do, we will update the{" "}
                  <b>Effective Date</b> at the top of this page. Continued use
                  of the Site after changes are posted means you accept the
                  revised policy.
                </p>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Contact Us
                </h2>
                <p className="mb-4 text-foreground">
                  If you have any questions, concerns, or requests regarding
                  this Privacy Policy or our privacy practices, please contact
                  us at:
                </p>
                <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                  <p className="font-semibold text-primary text-lg mb-2">
                    📧 contact@preppeo.com
                  </p>
                  <p className="font-semibold text-primary text-lg">
                    📧 vidit@preppeo.com
                  </p>
                  <p className="text-muted-foreground mt-4 text-sm">
                    Shrivyapar Private Limited<br />
                    2919P, Ground Floor, Sushant Lok 2, Sector 57<br />
                    Gurugram, Haryana 122003, India
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
