'use client'

import { motion } from 'framer-motion'
import { Bus, Train, Compass, Shield, ArrowRight } from 'lucide-react'

export default function TransportPage() {
  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide max-w-4xl">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="font-serif text-heading-xl font-bold text-granite-900 mb-2">
            Public Transport & Transit
          </h1>
          <p className="text-body-sm text-granite-500">
            Official travel guide to reach Kanyakumari via local buses, trains, and neighboring airports.
          </p>
        </div>

        <div className="space-y-6">
          {/* Bus Guide */}
          <div className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm flex flex-col md:flex-row gap-5 items-start">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center flex-shrink-0">
              <Bus className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-heading-sm text-granite-900">Local & Intercity Buses (SETC & TNSTC)</h3>
              <p className="text-body-sm text-granite-600 leading-relaxed">
                The Kanyakumari Central Bus Stand (Christopher Bus Stand) in Nagercoil is the primary hub. Frequent local buses connect Nagercoil to Kanyakumari Beach (every 10-15 minutes). Direct government SETC buses run to Chennai, Madurai, Trichy, and Bangalore.
              </p>
              <div className="flex gap-4 text-caption text-granite-400 font-semibold pt-1">
                <span>⏱ Local: 05:00 AM to 10:00 PM</span>
                <span>🎫 Fare: ₹15 - ₹30 (Local)</span>
              </div>
            </div>
          </div>

          {/* Train Guide */}
          <div className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm flex flex-col md:flex-row gap-5 items-start">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center flex-shrink-0">
              <Train className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-heading-sm text-granite-900">Kanyakumari Railway Station (CAPE)</h3>
              <p className="text-body-sm text-granite-600 leading-relaxed">
                Located just 1 km from Kanyakumari Beach. Direct express trains connect Kanyakumari to major Indian cities including Trivandrum, Chennai (Kanyakumari Express), Bangalore (Island Express), Mumbai, and Delhi (Himsagar Express).
              </p>
              <div className="flex gap-4 text-caption text-granite-400 font-semibold pt-1">
                <span>📍 station code: CAPE</span>
                <span>🚶 distance: 10 mins walk to Beach</span>
              </div>
            </div>
          </div>

          {/* Airport Guide */}
          <div className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm flex flex-col md:flex-row gap-5 items-start">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center flex-shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-heading-sm text-granite-900">Nearest Airport (Trivandrum - TRV)</h3>
              <p className="text-body-sm text-granite-600 leading-relaxed">
                Trivandrum International Airport (Kerala) is the closest airport, located 90 km away. From the airport, pre-paid taxis take around 2.5 to 3 hours to reach Kanyakumari via the national highway (NH-66). Trains are also available from Trivandrum Central.
              </p>
              <div className="flex gap-4 text-caption text-granite-400 font-semibold pt-1">
                <span>🚗 Travel time: 3 hours</span>
                <span>🚕 Cab Fare: ~₹2,500 - ₹3,500</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
