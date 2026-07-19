import React from 'react'
import { Accessibility as AccessibilityIcon, Eye, Type, Ear } from 'lucide-react'

export default function AccessibilityPage() {
  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-granite-100 p-8 md:p-12">
          
          <div className="flex items-center gap-4 mb-6 border-b border-granite-100 pb-4">
            <div className="w-12 h-12 bg-ocean-50 rounded-full flex items-center justify-center">
              <AccessibilityIcon className="w-6 h-6 text-ocean" />
            </div>
            <h1 className="font-serif text-heading-xl text-granite-900 font-bold">
              Accessibility Statement
            </h1>
          </div>
          
          <div className="prose prose-granite max-w-none text-granite-600 space-y-6">
            <p className="text-body font-medium text-granite-800">
              The Department of Tourism, Government of Kanyakumari is committed to making its digital services and physical destinations accessible to all users, including people with disabilities.
            </p>

            <h3 className="font-serif text-heading-sm font-bold text-granite-900 mt-8 mb-4">
              Website Accessibility
            </h3>
            <p>
              We strive to ensure our website complies with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. Features include:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-granite-50 p-6 rounded-xl border border-granite-100 text-center">
                <Eye className="w-8 h-8 text-ocean mx-auto mb-3" />
                <h4 className="font-bold text-granite-900 mb-2">Screen Reader Friendly</h4>
                <p className="text-sm">Semantic HTML and ARIA labels are used throughout the site.</p>
              </div>
              <div className="bg-granite-50 p-6 rounded-xl border border-granite-100 text-center">
                <Type className="w-8 h-8 text-ocean mx-auto mb-3" />
                <h4 className="font-bold text-granite-900 mb-2">Text Scaling</h4>
                <p className="text-sm">Content can be resized up to 200% without loss of functionality.</p>
              </div>
              <div className="bg-granite-50 p-6 rounded-xl border border-granite-100 text-center">
                <Ear className="w-8 h-8 text-ocean mx-auto mb-3" />
                <h4 className="font-bold text-granite-900 mb-2">Media Alternatives</h4>
                <p className="text-sm">Captions and transcripts are provided for video content where applicable.</p>
              </div>
            </div>

            <h3 className="font-serif text-heading-sm font-bold text-granite-900 mt-8 mb-4">
              Physical Destination Accessibility
            </h3>
            <p>
              Many of our major tourist spots in Kanyakumari are equipped with accessibility features:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Vivekananda Rock Memorial:</strong> Ramps available at the ferry terminal. Staff assistance provided for boarding.</li>
              <li><strong>Thiruvalluvar Statue:</strong> Accessible pathways on the lower deck.</li>
              <li><strong>Government Museum:</strong> Wheelchair ramps and accessible restrooms available.</li>
              <li><strong>Beaches:</strong> Select beach areas have paved viewpoints for wheelchair access.</li>
            </ul>

            <h3 className="font-serif text-heading-sm font-bold text-granite-900 mt-8 mb-4">
              Feedback & Support
            </h3>
            <p>
              We welcome your feedback on the accessibility of Kanyakumari Tourism services. If you encounter any barriers, please let us know:
            </p>
            <div className="bg-ocean-50/50 p-6 rounded-xl border border-ocean-100 mt-4">
              <p className="mb-2"><strong>Phone:</strong> 04652-246276 (Available Mon-Fri, 10 AM - 5 PM)</p>
              <p className="mb-0"><strong>Email:</strong> accessibility@kanyakumaritourism.org</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
