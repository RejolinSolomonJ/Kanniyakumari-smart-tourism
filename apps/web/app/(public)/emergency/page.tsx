'use client'

import { useState, useEffect } from 'react'
import { Phone, ShieldAlert, HeartPulse, Flame, HelpCircle, MapPin, Compass } from 'lucide-react'
import { emergencyContacts as allContacts } from '@/lib/data'

const mockContacts = [
  {
    id: '1',
    nameEn: 'Police Control Room',
    nameTa: 'காவல் கட்டுப்பாட்டு அறை',
    type: 'POLICE',
    phone: '100'
  },
  {
    id: '2',
    nameEn: 'Ambulance Service',
    nameTa: 'ஆம்புலன்ஸ் சேவை',
    type: 'AMBULANCE',
    phone: '108'
  },
  {
    id: '3',
    nameEn: 'Govt. Medical College Hospital',
    nameTa: 'அரசு மருத்துவக் கல்லூரி மருத்துவமனை',
    type: 'HOSPITAL',
    phone: '04652-223201',
    address: 'Asaripallam, Nagercoil'
  },
  {
    id: '4',
    nameEn: 'National Tourist Helpline',
    nameTa: 'தேசிய சுற்றுலா உதவி எண்',
    type: 'TOURIST_HELPLINE',
    phone: '1363',
    address: 'Toll Free (24/7 Multi-Lingual)'
  },
  {
    id: '5',
    nameEn: 'District Disaster Control Room',
    nameTa: 'மாவட்ட பேரிடர் கட்டுப்பாட்டு அறை',
    type: 'TOURIST_HELPLINE',
    phone: '1077'
  }
]

const typeIcons: Record<string, any> = {
  'POLICE': ShieldAlert,
  'AMBULANCE': HeartPulse,
  'HOSPITAL': HeartPulse,
  'FIRE': Flame,
  'TOURIST_HELPLINE': Compass
}

const typeColors: Record<string, string> = {
  'POLICE': 'bg-blue-50 text-blue-600 border-blue-200',
  'AMBULANCE': 'bg-red-50 text-red-600 border-red-200',
  'HOSPITAL': 'bg-red-50 text-red-600 border-red-200',
  'FIRE': 'bg-orange-50 text-orange-600 border-orange-200',
  'TOURIST_HELPLINE': 'bg-emerald-50 text-emerald-600 border-emerald-200'
}

export default function EmergencyPage() {
  const [contacts, setContacts] = useState(allContacts)

  useEffect(() => {
    fetch(`${(process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "").endsWith("/api") ? (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "") : (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "") + "/api"}/emergency/contacts`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setContacts(data)
        }
      })
      .catch(() => console.log('Using mock contacts.'))
  }, [])

  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide max-w-4xl">
        
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 text-red-600 rounded-full">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="font-serif text-heading-xl font-bold text-granite-900">
            Emergency Contacts
          </h1>
          <p className="text-body-sm text-granite-500">
            Immediate assistance helpline numbers for medical, police, fire, and tourism safety in Kanyakumari.
          </p>
        </div>

        {/* Contacts card list */}
        <div className="space-y-4">
          {contacts.map(c => {
            const Icon = typeIcons[c.type] || HelpCircle
            const colorClass = typeColors[c.type] || 'bg-granite-100 text-granite-600'
            
            return (
              <div key={c.id} className="bg-white p-5 rounded-2xl border border-granite-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex gap-4 items-start">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0 ${colorClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-heading-sm text-granite-900 leading-tight">
                      {c.nameEn}
                    </h3>
                    <p className="text-caption text-granite-400 font-tamil mb-1">{c.nameTa}</p>
                    {'address' in c && c.address && (
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(c.nameEn + ', Kanyakumari')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] text-granite-400 hover:text-ocean transition-colors cursor-pointer group"
                        title="Get Directions"
                      >
                        <MapPin className="w-3 h-3 text-ocean group-hover:scale-110 transition-transform" />
                        <span className="hover:underline">{c.address}</span>
                      </a>
                    )}
                  </div>
                </div>

                <a
                  href={`tel:${c.phone}`}
                  className="btn-danger py-2.5 px-6 text-body-sm font-semibold flex items-center gap-2 self-start sm:self-center"
                >
                  <Phone className="w-4 h-4 fill-white" />
                  Call: {c.phone}
                </a>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

