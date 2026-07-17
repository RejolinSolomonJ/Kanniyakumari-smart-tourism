'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Eye, Tag } from 'lucide-react'

const mockDownloads = [
  {
    id: '1',
    titleEn: 'Official Kanyakumari Tourist Map',
    titleTa: 'அதிகாரப்பூர்வ சுற்றுலா வரைபடம்',
    fileUrl: '/downloads/tourist_map.pdf',
    fileType: 'PDF',
    category: 'Maps',
    downloadCount: 420
  },
  {
    id: '2',
    titleEn: 'Tamil Nadu Tourism Guide - Kanyakumari Edition',
    titleTa: 'தமிழ்நாடு சுற்றுலா வழிகாட்டி - கன்னியாகுமரி பதிப்பு',
    fileUrl: '/downloads/tourist_guide.pdf',
    fileType: 'PDF',
    category: 'Brochures',
    downloadCount: 185
  }
]

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState(mockDownloads)

  useEffect(() => {
    fetch('http://localhost:5000/api/downloads')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setDownloads(data)
        }
      })
      .catch(() => console.log('Using mock downloads.'))
  }, [])

  const handleDownload = (id: string, fileUrl: string) => {
    // Record download count
    fetch(`http://localhost:5000/api/downloads/${id}/count`, { method: 'POST' })
      .then(() => {
        // Increment count locally
        setDownloads(prev =>
          prev.map(d => d.id === id ? { ...d, downloadCount: d.downloadCount + 1 } : d)
        )
      })
      .catch(err => console.log(err))

    // Open/download file
    window.open(fileUrl, '_blank')
  }

  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide max-w-4xl">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="font-serif text-heading-xl font-bold text-granite-900 mb-2">
            Brochures & Maps
          </h1>
          <p className="text-body-sm text-granite-500">
            Download official PDF maps, transit routes, and regional brochures provided by the Department of Tourism.
          </p>
        </div>

        {/* Downloads list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {downloads.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="bg-ocean-50 text-ocean text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {item.category}
                  </span>
                  <span className="text-[10px] font-semibold text-granite-400 bg-granite-100 px-2 py-0.5 rounded">
                    {item.fileType}
                  </span>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0 border border-orange-100">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-granite-900 leading-snug group-hover:text-ocean transition-colors">
                      {item.titleEn}
                    </h3>
                    <p className="text-caption text-granite-400 font-tamil">{item.titleTa}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-granite-100 flex items-center justify-between">
                <span className="text-caption text-granite-400 font-medium">
                  {item.downloadCount} Downloads
                </span>
                <button
                  onClick={() => handleDownload(item.id, item.fileUrl)}
                  className="btn-gold py-2 px-5 text-body-sm font-semibold flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
