import React from 'react'

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-granite-100 p-8 md:p-12">
          <h1 className="font-serif text-heading-xl text-granite-900 font-bold mb-6 border-b border-granite-100 pb-4">
            Privacy Policy
          </h1>
          
          <div className="prose prose-granite max-w-none space-y-6 text-granite-600">
            <p className="text-body font-medium text-granite-800">
              Last Updated: July 2026
            </p>

            <p>
              The Department of Tourism, Government of Kanyakumari ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. This privacy policy informs you about how we look after your personal data when you visit our website (www.kanyakumaritourism.org) and tells you about your privacy rights.
            </p>

            <h3 className="font-serif text-heading-sm font-bold text-granite-900 mt-8 mb-4">
              1. Information We Collect
            </h3>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you, which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Identity Data:</strong> includes first name, last name, username, or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes billing address, email address, and telephone numbers (collected during bookings or inquiries).</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting, browser plug-in types, operating system, and platform.</li>
              <li><strong>Usage Data:</strong> includes information about how you use our website and services.</li>
            </ul>

            <h3 className="font-serif text-heading-sm font-bold text-granite-900 mt-8 mb-4">
              2. How We Use Your Data
            </h3>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>To process your ticket bookings or accommodation reservations.</li>
              <li>To manage our relationship with you, including notifying you about changes to our terms or privacy policy.</li>
              <li>To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance).</li>
              <li>To deliver relevant website content to you.</li>
            </ul>

            <h3 className="font-serif text-heading-sm font-bold text-granite-900 mt-8 mb-4">
              3. Data Security
            </h3>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. Access to your personal data is limited to employees, contractors, and third parties who have a business need to know.
            </p>

            <h3 className="font-serif text-heading-sm font-bold text-granite-900 mt-8 mb-4">
              4. Contact Us
            </h3>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:privacy@kanyakumaritourism.org" className="text-ocean hover:underline">privacy@kanyakumaritourism.org</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
