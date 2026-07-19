'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, IndianRupee, BookOpen, AlertTriangle, 
  Settings, Database, Calendar, UserCheck, ShieldAlert 
} from 'lucide-react'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts'
import { formatCurrency } from '@/lib/utils'

const mockStats = {
  todayVisitors: 245,
  totalRevenue: 54200,
  activeBookings: 182,
  openReports: 4
}

const mockChartData = [
  { date: 'Mon', visitors: 120, revenue: 15000 },
  { date: 'Tue', visitors: 150, revenue: 18000 },
  { date: 'Wed', visitors: 180, revenue: 22000 },
  { date: 'Thu', visitors: 240, revenue: 31000 },
  { date: 'Fri', visitors: 210, revenue: 28000 },
  { date: 'Sat', visitors: 310, revenue: 45000 },
  { date: 'Sun', visitors: 285, revenue: 39000 }
]

export default function AdminDashboard() {
  const [stats, setStats] = useState(mockStats)
  const [chartData, setChartData] = useState(mockChartData)
  const [activeTab, setActiveTab] = useState<'overview' | 'reports'>('overview')
  const [reports, setReports] = useState<any[]>([])

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (!token) return

    // Fetch stats
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) setStats(data)
      })
      .catch(() => console.log('Using mock admin stats.'))

    // Fetch charts
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/analytics`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setChartData(data)
      })
      .catch(() => console.log('Using mock chart data.'))

    // Fetch reports
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/reports`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setReports(data)
        } else {
          setReports(getSimulatedReports())
        }
      })
      .catch(() => {
        setReports(getSimulatedReports())
      })
  }, [])

  const getSimulatedReports = () => [
    {
      id: 'REP-102',
      status: 'OPEN',
      type: 'TOILET',
      location: 'Vivekananda Rock Ferry Waiting Hall',
      description: 'The flush system in the public washrooms is not functioning properly. Please resolve this at the earliest.',
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
    },
    {
      id: 'REP-101',
      status: 'OPEN',
      type: 'SIGNAGE',
      location: 'Muttom Beach Crossroads',
      description: 'The directional road signs heading to Muttom Beach from Nagercoil highway are damaged and faded.',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: 'REP-099',
      status: 'RESOLVED',
      type: 'CLEANLINESS',
      location: 'Kanyakumari Main Beach Promenade',
      description: 'Large amount of plastic garbage accumulated near the sunset viewpoint area. Needs cleaning.',
      createdAt: new Date(Date.now() - 86400000 * 6).toISOString()
    }
  ]

  const handleResolveReport = (id: string) => {
    const token = localStorage.getItem('auth_token')
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/reports/${id}/status`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status: 'RESOLVED' })
    })
    .then(res => res.json())
    .then(updated => {
      setReports(prev =>
        prev.map(r => r.id === id ? { ...r, status: 'RESOLVED' } : r)
      )
    })
    .catch(() => {
      // Local simulation
      setReports(prev =>
        prev.map(r => r.id === id ? { ...r, status: 'RESOLVED' } : r)
      )
    })
  }

  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide">
        
        {/* Page Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-serif text-heading-xl font-bold text-granite-900 flex items-center gap-2">
              <ShieldAlert className="w-8 h-8 text-ocean" /> Admin Dashboard
            </h1>
            <p className="text-body-sm text-granite-505">
              Tourism Officer & Collector analytics overview for Kanyakumari.
            </p>
          </div>
          
          <div className="flex gap-2.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-2.5 rounded-xl text-body-sm font-semibold border transition-all ${
                activeTab === 'overview'
                  ? 'bg-ocean border-ocean text-white'
                  : 'bg-white border-granite-200 text-granite-600'
              }`}
            >
              System Overview
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-5 py-2.5 rounded-xl text-body-sm font-semibold border transition-all ${
                activeTab === 'reports'
                  ? 'bg-ocean border-ocean text-white'
                  : 'bg-white border-granite-200 text-granite-600'
              }`}
            >
              Infrastructure Reports ({reports.filter(r => r.status === 'OPEN').length})
            </button>
          </div>
        </div>

        {activeTab === 'overview' ? (
          /* Dashboard overview stats & charts */
          <div className="space-y-8">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Today\'s Scans', value: stats.todayVisitors, icon: Users, color: 'text-blue-600 bg-blue-50' },
                { label: 'Total Revenue', value: formatCurrency(stats.totalRevenue), icon: IndianRupee, color: 'text-gold-700 bg-gold-50' },
                { label: 'Active Bookings', value: stats.activeBookings, icon: Database, color: 'text-emerald-600 bg-emerald-50' },
                { label: 'Open Reports', value: stats.openReports, icon: AlertTriangle, color: 'text-red-600 bg-red-50' }
              ].map(stat => (
                <div key={stat.label} className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-caption text-granite-400 font-medium block mb-1">{stat.label}</span>
                    <span className="text-heading font-bold text-granite-900">{stat.value}</span>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>

            {/* Recharts panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Visitor chart */}
              <div className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm space-y-4">
                <h3 className="font-serif text-heading-sm text-granite-800">Weekly Visitors</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="visitors" fill="#0B4F8A" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Revenue line chart */}
              <div className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm space-y-4">
                <h3 className="font-serif text-heading-sm text-granite-800">Revenue Analysis</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="revenue" stroke="#C9981A" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Infrastructure reports manager */
          <div className="bg-white rounded-2xl border border-granite-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-granite-100">
              <h3 className="font-serif text-heading-sm text-granite-800">Citizen Issues Reports</h3>
              <p className="text-caption text-granite-500">View and update resolution status for public toilet, signages, lighting, and cleanliness issues.</p>
            </div>
            
            <div className="divide-y divide-granite-100">
              {reports.length > 0 ? (
                reports.map((report: any) => (
                  <div key={report.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          report.status === 'OPEN' ? 'bg-red-50 text-red-600' : 'bg-sea-50 text-sea'
                        }`}>
                          {report.status}
                        </span>
                        <span className="bg-granite-100 text-granite-600 text-[10px] font-bold px-2 py-0.5 rounded">
                          {report.type}
                        </span>
                        <span className="text-[11px] text-granite-400">Submitted: {new Date(report.createdAt).toLocaleDateString('en-IN')}</span>
                      </div>
                      
                      <h4 className="font-bold text-body-sm text-granite-800">📍 {report.location}</h4>
                      <p className="text-body-sm text-granite-600">{report.description}</p>
                    </div>

                    {report.status === 'OPEN' && (
                      <button
                        onClick={() => handleResolveReport(report.id)}
                        className="btn-gold py-1.5 px-4 text-caption font-bold"
                      >
                        Mark Resolved
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-granite-400">
                  No infrastructure issues reported.
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
