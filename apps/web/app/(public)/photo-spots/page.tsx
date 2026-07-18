"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Sun, Clock, Compass, Info } from 'lucide-react';

const CATEGORIES = ["All", "Sunrise", "Sunset", "Architecture", "Nature", "Aerial"];

const PHOTO_SPOTS = [
  {
    id: 1,
    title: "Vivekananda Rock at Dawn",
    category: "Sunrise",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80",
    time: "05:45 AM - 06:30 AM",
    difficulty: "Easy",
    location: "Kanyakumari Beach Viewing Tower",
    tip: "Use a telephoto lens (70-200mm) to compress the rising sun against the memorial."
  },
  {
    id: 2,
    title: "Triveni Sangam Sunset",
    category: "Sunset",
    image: "https://images.unsplash.com/photo-1614088739982-108151475c74?auto=format&fit=crop&q=80",
    time: "05:30 PM - 06:45 PM",
    difficulty: "Easy",
    location: "Sunset Point",
    tip: "Include the rocky foreground in your wide-angle shots for better composition."
  },
  {
    id: 3,
    title: "Thiruvalluvar Statue Silhouettes",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1621886292650-520f76c747d6?auto=format&fit=crop&q=80",
    time: "Blue Hour (Post-sunset)",
    difficulty: "Medium",
    location: "Ferry Point",
    tip: "Wait for the floodlights to turn on against the dark blue sky for a striking contrast."
  },
  {
    id: 4,
    title: "Mathur Aqueduct Perspectives",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1574880539169-160fa4ea28b9?auto=format&fit=crop&q=80", // placeholder
    time: "Mid-morning",
    difficulty: "Medium",
    location: "Mathur, 60km from city",
    tip: "Shoot from below using an ultra-wide lens to emphasize the massive pillars."
  },
  {
    id: 5,
    title: "Vattakottai Fort Coastline",
    category: "Aerial",
    image: "https://images.unsplash.com/photo-1599818826723-6b7a5a82fa2c?auto=format&fit=crop&q=80",
    time: "Late Afternoon",
    difficulty: "Medium",
    location: "Vattakottai Fort Walls",
    tip: "The contrast between the black sand, blue sea, and green palms is best captured from the highest rampart."
  },
  {
    id: 6,
    title: "Padmanabhapuram Palace Courtyards",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1600100397608-f010f419c918?auto=format&fit=crop&q=80", // placeholder
    time: "09:00 AM - 11:00 AM",
    difficulty: "Hard",
    location: "Thuckalay",
    tip: "Low light inside. Use a fast lens (f/1.8 or f/2.8). Flash and tripods are strictly prohibited."
  },
  {
    id: 7,
    title: "Thirparappu Waterfalls",
    category: "Nature",
    image: "https://images.unsplash.com/photo-1543343354-9e328006e864?auto=format&fit=crop&q=80",
    time: "Early Morning",
    difficulty: "Medium",
    location: "Thirparappu",
    tip: "Use a slow shutter speed (1/5s to 1s) with an ND filter for smooth, silky water effects."
  },
  {
    id: 8,
    title: "Fishing Boats at Muttom",
    category: "Nature",
    image: "https://images.unsplash.com/photo-1520695029312-d9dc5b169871?auto=format&fit=crop&q=80", // placeholder
    time: "Golden Hour",
    difficulty: "Easy",
    location: "Muttom Beach",
    tip: "Look for colorful boats against the dramatic rocky backdrop. Great for abstract details."
  }
];

export default function PhotoSpotsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSpots = activeCategory === "All" 
    ? PHOTO_SPOTS 
    : PHOTO_SPOTS.filter(spot => spot.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header */}
      <div className="bg-granite text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1506198547285-d698e3b56417?auto=format&fit=crop&q=80" 
            alt="Photography background" 
            layout="fill" 
            objectFit="cover" 
            className="opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-granite to-transparent"></div>
        </div>
        
        <div className="container-wide relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-ocean/20 rounded-full mb-6 backdrop-blur-sm border border-ocean/30 text-ocean-light">
            <Camera size={24} className="text-blue-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Photography Guide</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover the most photogenic locations in Kanyakumari. Curated spots, best timings, and pro tips to capture stunning memories.
          </p>
        </div>
      </div>

      <div className="container-wide mt-12 px-4">
        
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === category ? 'bg-ocean text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Spots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpots.map((spot) => (
            <div key={spot.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
              <div className="h-64 relative overflow-hidden">
                <Image 
                  src={spot.image} 
                  alt={spot.title} 
                  layout="fill" 
                  objectFit="cover" 
                  className="group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  {spot.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-granite mb-4">{spot.title}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start text-sm text-gray-600">
                    <Clock size={16} className="mr-2 text-ocean mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold block text-gray-800">Best Time:</span>
                      {spot.time}
                    </div>
                  </div>
                  <div className="flex items-start text-sm text-gray-600">
                    <Compass size={16} className="mr-2 text-sunset mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold block text-gray-800">Vantage Point:</span>
                      {spot.location}
                    </div>
                  </div>
                </div>
                
                <div className="bg-sea/10 rounded-xl p-4 border border-sea/20">
                  <div className="flex items-center font-semibold text-ocean mb-1 text-sm">
                    <Info size={14} className="mr-1.5" /> Pro Tip
                  </div>
                  <p className="text-sm text-gray-700 italic">"{spot.tip}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* General Pro Tips Section */}
        <div className="mt-20 bg-gradient-to-br from-granite to-[#1A1A1A] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-ocean/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <h2 className="text-3xl font-serif font-bold mb-8 relative z-10">General Photography Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 text-gold">
                <Sun size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Beat the Haze</h3>
              <p className="text-gray-400 text-sm">Coastal haze is common in Kanyakumari. Use a circular polarizer (CPL) filter to cut through glare and saturate the sky and sea.</p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 text-ocean-light">
                <Camera size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Salt Spray Care</h3>
              <p className="text-gray-400 text-sm">The constant sea breeze carries salt. Always keep a microfiber cloth handy and wipe your lens frequently. Clean your gear thoroughly after the trip.</p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 text-sunset">
                <Clock size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Arrive Early</h3>
              <p className="text-gray-400 text-sm">Sunrise viewpoints get crowded by 5:30 AM. Arrive by 5:00 AM to secure a spot with an unobstructed foreground for your tripod.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
