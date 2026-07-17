'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Users, Activity, BarChart, PlusCircle, CheckCircle2, ShieldAlert } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const predictiveData = [
  { month: 'Jul', actual: 12000, predicted: 12000 },
  { month: 'Aug', actual: 14500, predicted: 14000 },
  { month: 'Sep', actual: null, predicted: 16800 },
  { month: 'Oct', actual: null, predicted: 22000 },
  { month: 'Nov', actual: null, predicted: 28500 },
  { month: 'Dec', actual: null, predicted: 45000 },
]

export default function CRMAndCampaignsPage() {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'predictions'>('predictions')

  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-granite-900">Advanced CRM & Analytics</h1>
            <p className="text-granite-500 mt-1">Phase 2 AI-powered predictions and campaign management</p>
          </div>
          
          <div className="flex bg-white rounded-lg p-1 shadow-sm border border-granite-200 mt-4 md:mt-0">
            <button
              onClick={() => setActiveTab('predictions')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                activeTab === 'predictions' ? 'bg-ocean text-white shadow' : 'text-granite-600 hover:bg-granite-100'
              }`}
            >
              <Activity className="w-4 h-4 inline mr-2" />
              AI Predictions
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                activeTab === 'campaigns' ? 'bg-ocean text-white shadow' : 'text-granite-600 hover:bg-granite-100'
              }`}
            >
              <Send className="w-4 h-4 inline mr-2" />
              Campaigns
            </button>
          </div>
        </div>

        {activeTab === 'predictions' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-granite-200">
                <h3 className="text-granite-500 font-semibold mb-1">Predicted Dec Peak</h3>
                <p className="text-4xl font-bold text-granite-900">45,000</p>
                <p className="text-sm text-emerald-600 font-medium mt-2 flex items-center gap-1">
                  <Activity className="w-4 h-4" /> +15% vs Last Year
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-granite-200">
                <h3 className="text-granite-500 font-semibold mb-1">Sentiment Score</h3>
                <p className="text-4xl font-bold text-granite-900">92/100</p>
                <p className="text-sm text-emerald-600 font-medium mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Positive Trend
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-granite-200">
                <h3 className="text-granite-500 font-semibold mb-1">AI Recommendation</h3>
                <p className="text-lg font-bold text-granite-900 mt-2">Increase Beach Deployments</p>
                <p className="text-sm text-granite-500 mt-1">High influx expected at Sunset Point.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-granite-200">
              <h2 className="font-serif text-xl font-bold mb-6">6-Month Footfall Forecast (Gemini Powered)</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={predictiveData}>
                    <defs>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0B4B6C" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0B4B6C" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E2A836" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#E2A836" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${val / 1000}k`} />
                    <Tooltip />
                    <Area type="monotone" dataKey="actual" stroke="#0B4B6C" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" name="Actual Visitors" />
                    <Area type="monotone" dataKey="predicted" stroke="#E2A836" strokeWidth={3} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" name="Predicted (AI)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'campaigns' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex justify-end mb-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-ocean text-white font-semibold rounded-lg hover:bg-ocean-600 transition-colors">
                <PlusCircle className="w-5 h-5" /> Create Campaign
              </button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-granite-200 overflow-hidden">
              <table className="w-full text-left text-sm text-granite-600">
                <thead className="bg-granite-50 text-granite-700 font-semibold border-b border-granite-200">
                  <tr>
                    <th className="p-4">Campaign Name</th>
                    <th className="p-4">Target Audience</th>
                    <th className="p-4">Channel</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Engagement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-granite-100">
                  <tr className="hover:bg-granite-50">
                    <td className="p-4 font-semibold text-granite-900">Cape Festival Promo</td>
                    <td className="p-4">Previous Visitors (Dec)</td>
                    <td className="p-4">Email + SMS</td>
                    <td className="p-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">ACTIVE</span></td>
                    <td className="p-4">24% Open Rate</td>
                  </tr>
                  <tr className="hover:bg-granite-50">
                    <td className="p-4 font-semibold text-granite-900">Monsoon Discounts</td>
                    <td className="p-4">All Registered Users</td>
                    <td className="p-4">Email</td>
                    <td className="p-4"><span className="px-2 py-1 bg-granite-100 text-granite-700 rounded-full text-xs font-bold">DRAFT</span></td>
                    <td className="p-4">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}
