"use client";

import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Clock, Ticket, Star, ArrowRight, Plus } from 'lucide-react';
import { destinations as fallbackDestinations } from '@/lib/data';

export default function ComparePage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Fetch real destinations from API if backend is running, otherwise fall back to local lib/data
  useEffect(() => {
    fetch('http://localhost:5000/api/destinations')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setDestinations(data);
        } else {
          setDestinations(fallbackDestinations);
        }
      })
      .catch(() => {
        console.log('Using fallback mock destinations for comparison.');
        setDestinations(fallbackDestinations);
      });
  }, []);

  // Initialize selected destinations dynamically when data loads
  useEffect(() => {
    if (destinations.length > 0 && selectedIds.length === 0) {
      if (destinations.length >= 2) {
        setSelectedIds([destinations[0].id, destinations[1].id]);
      } else {
        setSelectedIds([destinations[0].id]);
      }
    }
  }, [destinations, selectedIds]);

  const formatDestination = (dest: any) => {
    if (!dest) return null;
    const feeStr = dest.entryFeeAdult !== undefined && dest.entryFeeAdult !== null
      ? (dest.entryFeeAdult === 0 ? "Free Entry" : `₹${dest.entryFeeAdult} per person`)
      : "Free Entry";
    
    let highlights = ["Beautiful landscapes", "Scenic viewpoints", "Great photo spots"];
    const cat = dest.category?.toUpperCase() || "";
    if (cat === "BEACH") {
      highlights = ["Triveni Sangam view", "Multi-colored sand shores", "Sunrise / Sunset vistas"];
    } else if (cat === "TEMPLE") {
      highlights = ["Spiritual heritage", "Traditional rituals", "Intricate architecture"];
    } else if (cat === "HERITAGE") {
      highlights = ["Rich history", "Guided tours", "Historical monuments"];
    } else if (cat === "WATERFALL") {
      highlights = ["Fresh water plunge pools", "Boating & recreational activities", "Forest surroundings"];
    } else if (cat === "MUSEUM") {
      highlights = ["Antiques collection", "Art galleries", "Guided history walk"];
    }
    
    if (dest.tips) {
      highlights.unshift(dest.tips);
    }
    highlights = highlights.slice(0, 4);

    let bestTime = "October - March (Cool Climate)";
    if (cat === "BEACH") {
      bestTime = "Sunrise (5:30 AM) or Sunset (5:30 PM)";
    } else if (cat === "TEMPLE") {
      bestTime = "Morning (6 AM - 10 AM) or Evening (5 PM - 8 PM)";
    } else if (cat === "WATERFALL") {
      bestTime = "Monsoon Season (Jul - Nov)";
    }

    return {
      id: dest.id,
      name: dest.nameEn,
      category: dest.category?.toLowerCase() || "nature",
      image: dest.heroImage || "/images/mixed/kanyakumari-beaches.jpg",
      fee: feeStr,
      hours: dest.openingHours || "8:00 AM - 6:00 PM",
      rating: dest.rating || 4.7,
      distance: dest.location || "Central Kanyakumari",
      highlights,
      bestTime
    };
  };

  const selectedDestinations = selectedIds
    .map(id => {
      const raw = destinations.find(d => d.id === id);
      return formatDestination(raw);
    })
    .filter(Boolean) as any[];
  
  const availableToAdd = destinations
    .filter(d => !selectedIds.includes(d.id) && d.nameEn.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(d => formatDestination(d))
    .filter(Boolean) as any[];

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
      <div className="bg-slate-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="container-wide text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Compare Destinations</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Can't decide where to go? Compare up to 3 destinations side-by-side to plan your perfect itinerary.
          </p>
        </div>
      </div>

      <div className="container-wide mt-12 px-4">
        {/* Compare Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-slate-700 font-bold font-sans">
            Comparing <span className="text-[#0B4F8A]">{selectedIds.length}</span> of 3 destinations
          </div>
          
          {selectedIds.length < 3 && (
            <div className="relative w-full md:w-auto">
              {!showSearch ? (
                <button 
                  onClick={() => setShowSearch(true)}
                  className="w-full md:w-auto bg-[#0B4F8A] hover:bg-blue-800 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Plus size={16} /> Add Destination
                </button>
              ) : (
                <div className="relative w-full md:w-72 animate-in fade-in zoom-in duration-200 z-20">
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="Search destination..."
                    className="w-full pl-10 pr-10 py-2 border border-blue-400 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm font-semibold"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                  <button onClick={() => setShowSearch(false)} className="absolute right-3 top-2.5 text-gray-400 hover:text-slate-700">
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
                          <span className="text-sm font-bold text-slate-800 truncate">{dest.name}</span>
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
              <div className="p-6 bg-gray-50/50 flex items-center justify-center font-serif text-lg text-slate-500 font-bold text-center leading-snug">
                Destination Highlights
              </div>
              
              {selectedDestinations.map(dest => (
                <div key={dest.id} className="p-6 relative text-center border-l border-gray-100 group">
                  {selectedDestinations.length > 1 && (
                    <button 
                      onClick={() => handleRemove(dest.id)}
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-gray-400 hover:text-red-650 hover:bg-red-50 transition-colors z-10 opacity-0 group-hover:opacity-100 shadow-sm border border-gray-100"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <div className="w-full h-40 relative rounded-xl overflow-hidden mb-4 shadow-sm">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {dest.category}
                    </div>
                  </div>
                  <h3 className="text-md font-bold text-slate-800 leading-snug h-12 flex items-center justify-center font-serif px-2">{dest.name}</h3>
                </div>
              ))}
              
              {/* Empty state columns to maintain grid structure */}
              {Array.from({ length: 3 - selectedDestinations.length }).map((_, i) => (
                <div key={`empty-${i}`} className="p-6 border-l border-gray-100 flex flex-col items-center justify-center bg-gray-50/20">
                  <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center mb-4 text-gray-400 cursor-pointer hover:border-blue-400 hover:text-blue-500 transition-colors" onClick={() => setShowSearch(true)}>
                    <Plus size={24} />
                  </div>
                  <span className="text-sm font-semibold text-gray-400">Add Destination</span>
                </div>
              ))}
            </div>

            {/* Rating Row */}
            <div className="grid grid-cols-4 border-b border-gray-100">
              <div className="p-4 bg-gray-50/50 text-sm font-bold text-slate-600 flex items-center">
                <Star size={16} className="mr-2 text-amber-500 fill-amber-500" /> Rating
              </div>
              {selectedDestinations.map(dest => (
                <div key={`rating-${dest.id}`} className="p-4 border-l border-gray-100 text-center flex items-center justify-center">
                  <span className="font-bold text-slate-800 mr-1 text-sm">{dest.rating}</span>
                  <Star size={14} className="fill-amber-500 text-amber-500" />
                </div>
              ))}
              {Array.from({ length: 3 - selectedDestinations.length }).map((_, i) => (
                <div key={`empty-rating-${i}`} className="p-4 border-l border-gray-100 bg-gray-50/20"></div>
              ))}
            </div>

            {/* Entry Fee Row */}
            <div className="grid grid-cols-4 border-b border-gray-100">
              <div className="p-4 bg-gray-50/50 text-sm font-bold text-slate-600 flex items-center">
                <Ticket size={16} className="mr-2 text-blue-600" /> Entry Fee
              </div>
              {selectedDestinations.map(dest => (
                <div key={`fee-${dest.id}`} className="p-4 border-l border-gray-100 text-center text-sm font-semibold text-slate-700">
                  {dest.fee}
                </div>
              ))}
              {Array.from({ length: 3 - selectedDestinations.length }).map((_, i) => (
                <div key={`empty-fee-${i}`} className="p-4 border-l border-gray-100 bg-gray-50/20"></div>
              ))}
            </div>

            {/* Timing Row */}
            <div className="grid grid-cols-4 border-b border-gray-100">
              <div className="p-4 bg-gray-50/50 text-sm font-bold text-slate-600 flex items-center">
                <Clock size={16} className="mr-2 text-emerald-600" /> Timings
              </div>
              {selectedDestinations.map(dest => (
                <div key={`hours-${dest.id}`} className="p-4 border-l border-gray-100 text-center text-sm font-semibold text-slate-700">
                  {dest.hours}
                </div>
              ))}
              {Array.from({ length: 3 - selectedDestinations.length }).map((_, i) => (
                <div key={`empty-hours-${i}`} className="p-4 border-l border-gray-100 bg-gray-50/20"></div>
              ))}
            </div>

            {/* Distance Row */}
            <div className="grid grid-cols-4 border-b border-gray-100">
              <div className="p-4 bg-gray-50/50 text-sm font-bold text-slate-600 flex items-center">
                <MapPin size={16} className="mr-2 text-rose-600" /> Location
              </div>
              {selectedDestinations.map(dest => (
                <div key={`distance-${dest.id}`} className="p-4 border-l border-gray-100 text-center text-sm font-semibold text-slate-700">
                  {dest.distance}
                </div>
              ))}
              {Array.from({ length: 3 - selectedDestinations.length }).map((_, i) => (
                <div key={`empty-distance-${i}`} className="p-4 border-l border-gray-100 bg-gray-50/20"></div>
              ))}
            </div>
            
            {/* Best Time Row */}
            <div className="grid grid-cols-4 border-b border-gray-100">
              <div className="p-4 bg-gray-50/50 text-sm font-bold text-slate-600 flex items-center">
                Best Time to Visit
              </div>
              {selectedDestinations.map(dest => (
                <div key={`bestTime-${dest.id}`} className="p-4 border-l border-gray-100 text-center text-sm font-bold text-[#0B4F8A]">
                  {dest.bestTime}
                </div>
              ))}
              {Array.from({ length: 3 - selectedDestinations.length }).map((_, i) => (
                <div key={`empty-bestTime-${i}`} className="p-4 border-l border-gray-100 bg-gray-50/20"></div>
              ))}
            </div>

            {/* Highlights Row */}
            <div className="grid grid-cols-4">
              <div className="p-4 bg-gray-50/50 text-sm font-bold text-slate-600 flex items-start pt-6">
                Key Highlights
              </div>
              {selectedDestinations.map(dest => (
                <div key={`highlights-${dest.id}`} className="p-6 border-l border-gray-100">
                  <ul className="space-y-2">
                    {dest.highlights.map((h: string, i: number) => (
                      <li key={i} className="text-sm text-slate-750 font-sans font-medium flex items-start leading-relaxed">
                        <ArrowRight size={14} className="text-[#0B4F8A] mt-0.5 mr-2 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {Array.from({ length: 3 - selectedDestinations.length }).map((_, i) => (
                <div key={`empty-highlights-${i}`} className="p-6 border-l border-gray-100 bg-gray-50/20"></div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
