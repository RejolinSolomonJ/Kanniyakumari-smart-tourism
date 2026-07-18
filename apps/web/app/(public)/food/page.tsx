'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Info } from 'lucide-react'
import { foods as allFoods } from '@/lib/data'

const foods = [
  {
    name: 'Meen Kuzhambu',
    nameTa: 'மீன் குழம்பு',
    type: 'Seafood',
    location: 'Kanyakumari Town & Coastal Shacks',
    image: '/images/food/meen_kuzhambu.png',
    description: 'A spicy and tangy fish curry prepared with fresh catch, coconut milk, tamarind, and raw mangoes. Reflects local coastal heritage.',
    recipeInfo: 'Best paired with boiled red rice or tapioca.'
  },
  {
    name: 'Kothu Parotta',
    nameTa: 'கொத்து பரோட்டா',
    type: 'Street Food',
    location: 'Nagercoil Street Vendors',
    image: '/images/food/kothu_parotta.png',
    description: 'Shredded flatbread cooked on a hot iron griddle with eggs, chicken gravy, onion, and spices, served with fresh salna.',
    recipeInfo: 'Rhythmic preparation sounds are famous in night markets.'
  },
  {
    name: 'Nandu Masala (Crab Masala)',
    nameTa: 'நண்டு மசாலா',
    type: 'Seafood',
    location: 'Colachel Harbour Shacks',
    image: '/images/food/nandu_masala.png',
    description: 'Fresh crabs cooked in a rich, aromatic coconut gravy with black pepper, dry red chillies, and curry leaves.',
    recipeInfo: 'A spicy delicacy cooked by local fishing families.'
  },
  {
    name: 'Tapioca (Kappa) & Kadala Curry',
    nameTa: 'கப்ப & கடலை கறி',
    type: 'Vegetarian',
    location: 'Tea Shops throughout the District',
    image: '/images/food/kappa_kadala.png',
    description: 'Boiled tapioca roots served with a spicy, thick chickpea curry, representing a unique culinary fusion with neighboring Kerala.',
    recipeInfo: 'Standard breakfast item for local farmers and laborers.'
  },
  {
    name: 'Nannari Sarbath',
    nameTa: 'நன்னாரி சர்பத்',
    type: 'Beverage',
    location: 'Beachside Vendors',
    image: '/images/food/nannari_sarbath.png',
    description: 'A cooling beverage made from sarsaparilla root extract, lemon juice, sugar syrup, and iced water.',
    recipeInfo: 'Popular summer drink, also available with tender coconut.'
  }
]

export default function FoodTrailsPage() {
  const [filter, setFilter] = useState('ALL')

  const filteredFoods = filter === 'ALL' ? allFoods : allFoods.filter(f => f.type === filter)

  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="font-serif text-heading-xl font-bold text-granite-900 mb-2">
            Local Food Trails
          </h1>
          <p className="text-body-sm text-granite-500">
            Taste the coastal spices, fresh seafood, and unique street food delicacies of Kanyakumari.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-10">
          {['ALL', 'Seafood', 'Street Food', 'Vegetarian', 'Beverage', 'Snacks', 'Sweets'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full border text-body-sm font-semibold transition-all ${
                filter === cat
                  ? 'bg-ocean border-ocean text-white'
                  : 'bg-white border-granite-200 text-granite-600 hover:border-granite-300'
              }`}
            >
              {cat === 'ALL' ? 'All Food' : cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFoods.map(food => (
            <div key={food.name} className="bg-white rounded-2xl overflow-hidden shadow-card border border-granite-100 flex flex-col justify-between">
              <div>
                <img src={food.image} alt={food.name} className="w-full h-56 object-cover" />
                
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-serif text-heading-sm text-granite-900 leading-tight">
                      {food.name}
                    </h3>
                    <p className="text-caption text-granite-400 font-tamil">{food.nameTa}</p>
                  </div>

                  <p className="text-body-sm text-granite-600 leading-relaxed">{food.description}</p>
                  
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <span className="flex items-center gap-1.5 text-caption text-granite-500">
                      <MapPin className="w-4 h-4 text-ocean" />
                      {food.location}
                    </span>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(food.location + ', Kanyakumari')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded bg-ocean-50 text-ocean hover:bg-ocean hover:text-white transition-all duration-200 text-[11px] font-bold flex items-center gap-1 border border-ocean-100 cursor-pointer"
                      title="Search locations on Google Maps"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-granite-100 bg-granite-50/50 flex gap-2.5 items-start">
                <Info className="w-4 h-4 text-ocean flex-shrink-0 mt-0.5" />
                <p className="text-caption text-granite-500 italic leading-snug">{food.recipeInfo}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
