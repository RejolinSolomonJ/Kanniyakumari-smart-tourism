"use client";

import React, { useState } from 'react';
import { Star, MessageSquare, MapPin, Calendar, Plus, X } from 'lucide-react';
import { format } from 'date-fns';

const MOCK_REVIEWS = [
  { id: 1, author: "Rajesh Kumar", rating: 5, comment: "The sunrise at Vivekananda Rock Memorial is truly magical. Worth waking up early for!", destination: "Vivekananda Rock Memorial", date: new Date("2023-12-15") },
  { id: 2, author: "Sarah Jenkins", rating: 4, comment: "Beautiful beach but quite crowded during sunset. The local food stalls nearby are excellent.", destination: "Kanyakumari Beach", date: new Date("2024-01-05") },
  { id: 3, author: "Amit Patel", rating: 5, comment: "Thiruvalluvar Statue is an architectural marvel. The ferry ride was short and well organized.", destination: "Thiruvalluvar Statue", date: new Date("2024-02-10") },
  { id: 4, author: "Priya Sharma", rating: 3, comment: "Good place to visit but it was too hot in the afternoon. Best to visit early morning.", destination: "Vattakottai Fort", date: new Date("2024-03-22") },
  { id: 5, author: "John Doe", rating: 4, comment: "Peaceful environment. The architecture is stunning and well-maintained.", destination: "Our Lady of Ransom Church", date: new Date("2024-04-18") },
  { id: 6, author: "Meena Iyer", rating: 5, comment: "The matha temple is very serene. You can sit there for hours feeling the breeze.", destination: "Bhagavathy Amman Temple", date: new Date("2024-05-01") },
  { id: 7, author: "David Smith", rating: 4, comment: "Sunset point is breathtaking. A must-visit for photographers.", destination: "Sunset Point", date: new Date("2024-05-15") },
  { id: 8, author: "Neha Gupta", rating: 5, comment: "Absolutely loved the museum. Gives a lot of historical context about the place.", destination: "Gandhi Memorial", date: new Date("2024-06-02") },
  { id: 9, author: "Vikram Singh", rating: 4, comment: "Great place for family outing. The kids enjoyed the wax museum.", destination: "Wax Museum", date: new Date("2024-06-10") },
  { id: 10, author: "Anita Roy", rating: 5, comment: "The waterfalls are pristine. Had a great time bathing there.", destination: "Thirparappu Falls", date: new Date("2024-06-25") },
];

const DESTINATIONS = [
  "Vivekananda Rock Memorial",
  "Thiruvalluvar Statue",
  "Kanyakumari Beach",
  "Sunset Point",
  "Bhagavathy Amman Temple",
  "Gandhi Memorial",
  "Vattakottai Fort",
  "Thirparappu Falls"
];

export default function ReviewsPage() {
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ destination: "", rating: 5, comment: "" });

  const filteredReviews = filterRating 
    ? MOCK_REVIEWS.filter(r => r.rating === filterRating)
    : MOCK_REVIEWS;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-ocean via-sea to-sunset text-white py-20 px-4">
        <div className="container-wide text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Traveler Reviews</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Discover what others are saying about their Kanyakumari experiences and share your own journey.
          </p>
        </div>
      </div>

      <div className="container-wide mt-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          {/* Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 w-full md:w-auto">
            <button 
              onClick={() => setFilterRating(null)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${filterRating === null ? 'bg-ocean text-white' : 'bg-white text-granite border border-gray-200 hover:border-ocean'}`}
            >
              All Reviews
            </button>
            {[5, 4, 3, 2, 1].map(star => (
              <button
                key={star}
                onClick={() => setFilterRating(star)}
                className={`px-4 py-2 rounded-full flex items-center space-x-1 whitespace-nowrap transition-all ${filterRating === star ? 'bg-ocean text-white' : 'bg-white text-granite border border-gray-200 hover:border-ocean'}`}
              >
                <span>{star}</span>
                <Star size={14} className={filterRating === star ? 'fill-current' : 'fill-gold text-gold'} />
              </button>
            ))}
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center space-x-2 bg-gold hover:bg-yellow-500 text-granite px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 w-full md:w-auto justify-center"
          >
            <Plus size={20} />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-sea/20 flex items-center justify-center text-ocean font-bold text-lg">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-granite">{review.author}</h3>
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? "fill-current" : "text-gray-300"} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 flex items-center">
                  <Calendar size={12} className="mr-1" />
                  {format(review.date, 'MMM d, yyyy')}
                </div>
              </div>
              
              <div className="mb-4 text-sm text-ocean flex items-center bg-sea/10 inline-flex px-3 py-1 rounded-full">
                <MapPin size={14} className="mr-1" />
                {review.destination}
              </div>
              
              <p className="text-gray-600 line-clamp-4 relative">
                <MessageSquare size={16} className="absolute -left-1 -top-1 text-gray-200 -z-10 opacity-50" />
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-granite/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-granite transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-serif font-bold text-granite mb-6">Write a Review</h2>
            
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <select 
                  className="w-full border-gray-300 rounded-xl shadow-sm focus:border-ocean focus:ring-ocean p-3 border"
                  value={newReview.destination}
                  onChange={(e) => setNewReview({...newReview, destination: e.target.value})}
                  required
                >
                  <option value="">Select a destination...</option>
                  {DESTINATIONS.map(dest => (
                    <option key={dest} value={dest}>{dest}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star size={32} className={star <= newReview.rating ? "fill-gold text-gold" : "text-gray-300"} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                <textarea 
                  rows={4}
                  className="w-full border-gray-300 rounded-xl shadow-sm focus:border-ocean focus:ring-ocean p-3 border resize-none"
                  placeholder="Share details of your experience at this place..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  required
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-ocean hover:bg-blue-900 text-white py-3 rounded-xl font-medium transition-colors">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
