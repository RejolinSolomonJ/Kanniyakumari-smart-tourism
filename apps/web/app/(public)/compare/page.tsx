"use client";

import React, { useState } from 'react';
import { Search, X, MapPin, Clock, Ticket, Star, ArrowRight } from 'lucide-react';

const MOCK_DESTINATIONS = [
  {
    id: "1",
    name: "Vivekananda Rock Memorial",
    category: "Monument",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80",
    fee: "₹50 (Ferry ticket)",
    hours: "8:00 AM - 4:00 PM",
    rating: 4.8,
    distance: "1 km from center",
    highlights: ["Meditation Hall", "Ferry Ride", "Sunrise View", "Historical Significance"],
    bestTime: "Early Morning (6 AM - 8 AM)"
  },
  {
    id: "2",
    name: "Thiruvalluvar Statue",
    category: "Monument",
    image: "https://images.unsplash.com/photo-1621886292650-520f76c747d6?auto=format&fit=crop&q=80",
    fee: "Included with Rock Memorial",
    hours: "8:00 AM - 4:00 PM",
    rating: 4.7,
    distance: "1.2 km from center",
    highlights: ["133 feet tall", "Architectural Marvel", "Ocean Views", "Cultural Icon"],
    bestTime: "Morning or Late Afternoon"
  },
  {
    id: "3",
    name: "Kanyakumari Beach",
    category: "Nature",
    image: "https://images.unsplash.com/photo-1614088739982-108151475c74?auto=format&fit=crop&q=80",
    fee: "Free",
    hours: "24 Hours",
    rating: 4.5,
    distance: "0.5 km from center",
    highlights: ["Triveni Sangam", "Sunrise/Sunset", "Street Food", "Shopping"],
    bestTime: "Sunset (5:30 PM - 7:00 PM)"
  },
  {
    id: "4",
    name: "Vattakottai Fort",
    category: "Heritage",
    image: "https://images.unsplash.com/photo-1599818826723-6b7a5a82fa2c?auto=format&fit=crop&q=80",
    fee: "₹25 per person",
    hours: "8:00 AM - 5:00 PM",
    rating: 4.3,
    distance: "7 km from center",
    highlights: ["Sea Views", "Historical Fort", "Peaceful", "Photography"],
    bestTime: "Late Afternoon"
  },
  {
    id: "5",
    name: "Thirparappu Falls",
    category: "Nature",
    image: "https://images.unsplash.com/photo-1543343354-9e328006e864?auto=format&fit=crop&q=80",
    fee: "₹30 per person",
    hours: "6:30 AM - 6:30 PM",
    rating: 4.6,
    distance: "55 km from center",
    highlights: ["Waterfalls", "Boating", "Swimming", "Shiva Temple"],
    bestTime: "Monsoon (Jul-Nov)"
  },
  {
    id: "6",
    name: "Padmanabhapuram Palace",
    category: "Heritage",
    image: "https://images.unsplash.com/photo-1574880539169-160fa4ea28b9?auto=format&fit=crop&q=80",
    fee: "₹50 per person",
    hours: "9:00 AM - 4:30 PM (Closed Mon)",
    rating: 4.7,
    distance: "35 km from center",
    highlights: ["Wooden Architecture", "Antiques", "Kerala Style", "History"],
    bestTime: "Morning"
  }
];

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["1", "3"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const selectedDestinations = selectedIds.map(id => MOCK_DESTINATIONS.find(d => d.id === id)!).filter(Boolean);
  
  const availableToAdd = MOCK_DESTINATIONS.filter(d => !selectedIds.includes(d.id) && d.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleRemove = (id: string) => {
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
  };

  const handleAdd = (id: string) => {
    if (selectedIds.length < 3) {
      setSelectedIds([...selectedIds, id]);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-ocean to-granite text-white py-16 px-4">
        <div className="container-wide text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Compare Destinations</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Can't decide where to go? Compare up to 3 destinations side-by-side to plan your perfect itinerary.
          </p>
        </div>
      </div>

      <div className="container-wide mt-12 px-4">
        {/* Compare Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-granite font-medium">
            Comparing <span className="text-ocean font-bold">{selectedIds.length}</span> of 3 destinations
          </div>
          
          {selectedIds.length < 3 && (
            <div className="relative w-full md:w-auto">
              {!showSearch ? (
                <button 
                  onClick={() => setShowSearch(true)}
                  className="w-full md:w-auto btn-primary bg-ocean hover:bg-blue-900 text-white px-6 py-2 rounded-full font-medium transition-colors"
                >
                  + Add Destination
                </button>
              ) : (
                <div className="relative w-full md:w-72 animate-in fade-in zoom-in duration-200 z-20">
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="Search destination..."
                    className="w-full pl-10 pr-10 py-2 border border-ocean rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-ocean/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                  <button onClick={() => setShowSearch(false)} className="absolute right-3 top-2.5 text-gray-400 hover:text-granite">
                    <X size={18} />
                  </button>
                  
                  {availableToAdd.length > 0 && (
                    <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 max-h-60 overflow-y-auto z-30">
                      {availableToAdd.map(dest => (
                        <div 
                          key={dest.id} 
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center border-b border-gray-50 last:border-0"
                          onClick={() => handleAdd(dest.id)}
                        >
                          <div className="w-10 h-10 rounded bg-gray-200 mr-3 overflow-hidden flex-shrink-0 relative">
                            <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-sm font-medium text-granite truncate">{dest.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Comparison Grid */}
        <div className="overflow-x-auto pb-8">
          <div className="min-w-[800px] bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Header Row (Images & Titles) */}
            <div className="grid grid-cols-4 border-b border-gray-100">
              <div className="p-6 bg-gray-50 flex items-center justify-center font-serif text-lg text-gray-500 font-medium">
                Destination Highlights
              </div>
              
              {selectedDestinations.map(dest => (
                <div key={dest.id} className="p-6 relative text-center border-l border-gray-100 group">
                  {selectedDestinations.length > 1 && (
                    <button 
                      onClick={() => handleRemove(dest.id)}
                      className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-1.5 rounded-full text-gray-400 hover:text-sunset hover:bg-red-50 transition-colors z-10 opacity-0 group-hover:opacity-100"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <div className="w-full h-40 relative rounded-xl overflow-hidden mb-4 shadow-sm">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md">
                      {dest.category}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-granite leading-tight h-12 flex items-center justify-center">{dest.name}</h3>
                </div>
              ))}
              
              {/* Empty state columns to maintain grid structure */}
              {Array.from({ length: 3 - selectedDestinations.length }).map((_, i) => (
                <div key={`empty-${i}`} className="p-6 border-l border-gray-100 flex flex-col items-center justify-center bg-gray-50/50">
                  <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center mb-4 text-gray-400">
                    <Plus size={24} />
                  </div>
                  <span className="text-sm text-gray-400">Add Destination</span>
                </div>
              ))}
            </div>

            {/* Rating Row */}
            <div className="grid grid-cols-4 border-b border-gray-100">
              <div className="p-4 bg-gray-50 text-sm font-medium text-gray-600 flex items-center">
                <Star size={16} className="mr-2 text-gold" /> Rating
              </div>
              {selectedDestinations.map(dest => (
                <div key={`rating-${dest.id}`} className="p-4 border-l border-gray-100 text-center flex items-center justify-center">
                  <span className="font-bold text-granite mr-1">{dest.rating}</span>
                  <Star size={14} className="fill-gold text-gold" />
                </div>
              ))}
              {Array.from({ length: 3 - selectedDestinations.length }).map((_, i) => (
                <div key={`empty-rating-${i}`} className="p-4 border-l border-gray-100 bg-gray-50/50"></div>
              ))}
            </div>

            {/* Entry Fee Row */}
            <div className="grid grid-cols-4 border-b border-gray-100">
              <div className="p-4 bg-gray-50 text-sm font-medium text-gray-600 flex items-center">
                <Ticket size={16} className="mr-2 text-ocean" /> Entry Fee
              </div>
              {selectedDestinations.map(dest => (
                <div key={`fee-${dest.id}`} className="p-4 border-l border-gray-100 text-center text-sm text-gray-800">
                  {dest.fee}
                </div>
              ))}
              {Array.from({ length: 3 - selectedDestinations.length }).map((_, i) => (
                <div key={`empty-fee-${i}`} className="p-4 border-l border-gray-100 bg-gray-50/50"></div>
              ))}
            </div>

            {/* Timing Row */}
            <div className="grid grid-cols-4 border-b border-gray-100">
              <div className="p-4 bg-gray-50 text-sm font-medium text-gray-600 flex items-center">
                <Clock size={16} className="mr-2 text-forest" /> Timings
              </div>
              {selectedDestinations.map(dest => (
                <div key={`hours-${dest.id}`} className="p-4 border-l border-gray-100 text-center text-sm text-gray-800">
                  {dest.hours}
                </div>
              ))}
              {Array.from({ length: 3 - selectedDestinations.length }).map((_, i) => (
                <div key={`empty-hours-${i}`} className="p-4 border-l border-gray-100 bg-gray-50/50"></div>
              ))}
            </div>

            {/* Distance Row */}
            <div className="grid grid-cols-4 border-b border-gray-100">
              <div className="p-4 bg-gray-50 text-sm font-medium text-gray-600 flex items-center">
                <MapPin size={16} className="mr-2 text-sunset" /> Location
              </div>
              {selectedDestinations.map(dest => (
                <div key={`distance-${dest.id}`} className="p-4 border-l border-gray-100 text-center text-sm text-gray-800">
                  {dest.distance}
                </div>
              ))}
              {Array.from({ length: 3 - selectedDestinations.length }).map((_, i) => (
                <div key={`empty-distance-${i}`} className="p-4 border-l border-gray-100 bg-gray-50/50"></div>
              ))}
            </div>
            
            {/* Best Time Row */}
            <div className="grid grid-cols-4 border-b border-gray-100">
              <div className="p-4 bg-gray-50 text-sm font-medium text-gray-600 flex items-center">
                Best Time to Visit
              </div>
              {selectedDestinations.map(dest => (
                <div key={`bestTime-${dest.id}`} className="p-4 border-l border-gray-100 text-center text-sm font-medium text-ocean">
                  {dest.bestTime}
                </div>
              ))}
              {Array.from({ length: 3 - selectedDestinations.length }).map((_, i) => (
                <div key={`empty-bestTime-${i}`} className="p-4 border-l border-gray-100 bg-gray-50/50"></div>
              ))}
            </div>

            {/* Highlights Row */}
            <div className="grid grid-cols-4">
              <div className="p-4 bg-gray-50 text-sm font-medium text-gray-600 flex items-start pt-6">
                Key Highlights
              </div>
              {selectedDestinations.map(dest => (
                <div key={`highlights-${dest.id}`} className="p-6 border-l border-gray-100">
                  <ul className="space-y-2">
                    {dest.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start">
                        <ArrowRight size={14} className="text-ocean mt-0.5 mr-2 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {Array.from({ length: 3 - selectedDestinations.length }).map((_, i) => (
                <div key={`empty-highlights-${i}`} className="p-6 border-l border-gray-100 bg-gray-50/50"></div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Needed to add Plus icon since it was used in empty state but not imported
const Plus = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
