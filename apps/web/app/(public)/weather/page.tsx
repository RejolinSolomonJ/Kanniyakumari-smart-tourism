"use client";

import React from 'react';
import { Sun, Cloud, CloudRain, Wind, Droplets, Sunrise, Sunset, Waves } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const FORECAST = [
  { day: 'Today', temp: 28, icon: <Sun className="text-gold" size={24} />, desc: "Sunny" },
  { day: 'Mon', temp: 29, icon: <Sun className="text-gold" size={24} />, desc: "Sunny" },
  { day: 'Tue', temp: 27, icon: <Cloud className="text-gray-400" size={24} />, desc: "Cloudy" },
  { day: 'Wed', temp: 26, icon: <CloudRain className="text-ocean" size={24} />, desc: "Rain" },
  { day: 'Thu', temp: 28, icon: <Cloud className="text-gray-400" size={24} />, desc: "Partly Cloudy" },
  { day: 'Fri', temp: 29, icon: <Sun className="text-gold" size={24} />, desc: "Sunny" },
  { day: 'Sat', temp: 30, icon: <Sun className="text-gold" size={24} />, desc: "Sunny" },
];

const MONTHLY_DATA = [
  { name: 'Jan', value: 95, color: '#1A5F7A' }, // ocean
  { name: 'Feb', value: 90, color: '#1A5F7A' },
  { name: 'Mar', value: 75, color: '#3A7CA5' },
  { name: 'Apr', value: 60, color: '#F2A65A' }, // sunset
  { name: 'May', value: 55, color: '#F2A65A' },
  { name: 'Jun', value: 40, color: '#88929A' }, // granite
  { name: 'Jul', value: 45, color: '#88929A' },
  { name: 'Aug', value: 65, color: '#88929A' },
  { name: 'Sep', value: 70, color: '#3A7CA5' },
  { name: 'Oct', value: 85, color: '#1A5F7A' },
  { name: 'Nov', value: 90, color: '#1A5F7A' },
  { name: 'Dec', value: 100, color: '#1A5F7A' },
];

export default function WeatherPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1A5F7A] to-[#0A2F3F] text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/4"></div>
        <div className="container-wide relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Weather & Climate</h1>
              <p className="text-lg text-gray-300 max-w-xl">
                Plan your visit perfectly. Kanyakumari has a tropical climate, making it a year-round destination with unique seasonal charms.
              </p>
            </div>
            
            {/* Current Weather Widget */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 w-full max-w-sm shrink-0">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-gray-300 text-sm font-medium">KANYAKUMARI, TN</div>
                  <div className="text-4xl font-bold mt-1">28°C</div>
                </div>
                <Sun size={48} className="text-yellow-400 drop-shadow-lg" />
              </div>
              <div className="text-xl font-medium mb-6">Partly Cloudy</div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 rounded-xl p-3 flex items-center">
                  <Droplets size={20} className="text-blue-300 mr-2" />
                  <div>
                    <div className="text-xs text-gray-300">Humidity</div>
                    <div className="font-bold">78%</div>
                  </div>
                </div>
                <div className="bg-black/20 rounded-xl p-3 flex items-center">
                  <Wind size={20} className="text-gray-300 mr-2" />
                  <div>
                    <div className="text-xs text-gray-300">Wind</div>
                    <div className="font-bold">14 km/h</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide mt-12 px-4 space-y-12">
        
        {/* 7-Day Forecast & Sun/Tide */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Forecast */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif font-bold text-granite mb-6">7-Day Forecast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
              {FORECAST.map((day, i) => (
                <div key={i} className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${i === 0 ? 'bg-ocean/5 border-ocean/20' : 'bg-gray-50 border-gray-100 hover:border-ocean/30 transition-colors'}`}>
                  <span className="text-sm font-medium text-gray-500 mb-2">{day.day}</span>
                  {day.icon}
                  <span className="text-lg font-bold text-granite mt-2">{day.temp}°</span>
                  <span className="text-xs text-gray-400 mt-1 text-center">{day.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sun & Tide */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-sunset/20 to-gold/20 rounded-3xl p-6 border border-sunset/10 relative overflow-hidden">
              <h3 className="font-serif font-bold text-granite mb-4 text-lg">Sunrise & Sunset</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white/60 p-3 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center text-orange-600 font-medium">
                    <Sunrise size={20} className="mr-3" /> Sunrise
                  </div>
                  <div className="font-bold text-granite">06:12 AM</div>
                </div>
                <div className="flex items-center justify-between bg-white/60 p-3 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center text-sunset font-medium">
                    <Sunset size={20} className="mr-3" /> Sunset
                  </div>
                  <div className="font-bold text-granite">06:24 PM</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-sea/20 to-ocean/20 rounded-3xl p-6 border border-sea/30">
              <h3 className="font-serif font-bold text-granite mb-4 text-lg">Tide Information</h3>
              <div className="flex items-center justify-between bg-white/60 p-4 rounded-xl backdrop-blur-sm">
                <div className="flex items-center text-ocean font-medium">
                  <Waves size={24} className="mr-3" />
                  <div>
                    <div className="text-sm">High Tide</div>
                    <div className="text-xs text-gray-500 font-normal">Next at 14:30</div>
                  </div>
                </div>
                <div className="font-bold text-granite text-xl">1.2m</div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Time to Visit Chart */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-granite mb-2">Best Time to Visit</h2>
            <p className="text-gray-500">Visitor score by month based on weather conditions</p>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#88929A', fontSize: 12}} />
                <YAxis hide={true} />
                <Tooltip 
                  cursor={{fill: '#f3f4f6'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" radius={[6, 6, 6, 6]}>
                  {MONTHLY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Seasonal Guide */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-granite mb-6">Seasonal Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-2xl p-6 border-t-4 border-ocean shadow-sm">
              <h3 className="text-xl font-bold text-ocean mb-2">Winter (Peak Season)</h3>
              <div className="text-sm font-medium text-gray-400 mb-4">October to February</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                The most pleasant time to visit. The weather is cool and breezy, perfect for sightseeing, beach visits, and watching the spectacular sunrises and sunsets. Expect larger crowds.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-t-4 border-sunset shadow-sm">
              <h3 className="text-xl font-bold text-sunset mb-2">Summer (Shoulder)</h3>
              <div className="text-sm font-medium text-gray-400 mb-4">March to May</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Can get quite warm and humid, with temperatures reaching up to 35°C. Early morning and late evening activities are recommended. Good for budget travelers as hotels offer discounts.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-t-4 border-granite shadow-sm">
              <h3 className="text-xl font-bold text-granite mb-2">Monsoon (Off-Peak)</h3>
              <div className="text-sm font-medium text-gray-400 mb-4">June to September</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Experiences heavy rainfall due to both Southwest and Northeast monsoons. While outdoor sightseeing might be interrupted, the region becomes lush green and highly picturesque.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
