'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

const foods = [
  {
    name: 'Meen Kuzhambu',
    nameTa: 'மீன் குழம்பு',
    type: 'Seafood',
    location: 'Kanyakumari Town',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=300&fit=crop',
    description: 'Tangy fish curry with coconut milk',
  },
  {
    name: 'Kothu Parotta',
    nameTa: 'கொத்து பரோட்டா',
    type: 'Street Food',
    location: 'Nagercoil',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop',
    description: 'Shredded parotta with spicy masala',
  },
  {
    name: 'Nandu Masala',
    nameTa: 'நண்டு மசாலா',
    type: 'Seafood',
    location: 'Colachel',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=300&h=300&fit=crop',
    description: 'Spicy crab masala with local spices',
  },
  {
    name: 'Kappa & Kadala Curry',
    nameTa: 'கப்ப & கடலை கறி',
    type: 'Vegetarian',
    location: 'Throughout District',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=300&fit=crop',
    description: 'Boiled tapioca with chickpea curry',
  },
  {
    name: 'Nannari Sarbath',
    nameTa: 'நன்னாரி சர்பத்',
    type: 'Beverage',
    location: 'Beach Vendors',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=300&fit=crop',
    description: 'Refreshing sarsaparilla root drink',
  },
  {
    name: 'Avial',
    nameTa: 'அவியல்',
    type: 'Vegetarian',
    location: 'Local Restaurants',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300&h=300&fit=crop',
    description: 'Mixed vegetables in coconut & curd',
  },
]

const typeColors: Record<string, string> = {
  'Seafood': 'bg-blue-50 text-blue-700',
  'Street Food': 'bg-orange-50 text-orange-700',
  'Vegetarian': 'bg-green-50 text-green-700',
  'Beverage': 'bg-purple-50 text-purple-700',
}

export default function FoodTrails() {
  return (
    <section className="section-padding bg-granite-50">
      <div className="container-wide">
        <div className="section-header">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold font-medium text-body-sm tracking-wider uppercase mb-2"
          >
            Culinary Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Food Trails
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-subtitle"
          >
            Taste the authentic flavors of Kanyakumari&apos;s coastal cuisine
          </motion.p>
        </div>

        {/* Horizontal Scroll */}
        <div className="scroll-container">
          {foods.map((food, index) => (
            <motion.div
              key={food.name}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="scroll-item w-72"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400 group">
                <div className="relative overflow-hidden">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-3 right-3 ${typeColors[food.type] || 'bg-gray-50 text-gray-700'} text-[11px] font-semibold px-3 py-1 rounded-full`}>
                    {food.type}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-heading-sm text-granite-900 mb-0.5">
                    {food.name}
                  </h3>
                  <p className="text-caption text-granite-400 font-tamil mb-2">{food.nameTa}</p>
                  <p className="text-body-sm text-granite-500 mb-3">{food.description}</p>
                  <div className="flex items-center gap-1.5 text-caption text-granite-400">
                    <MapPin className="w-3.5 h-3.5 text-ocean" />
                    {food.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
