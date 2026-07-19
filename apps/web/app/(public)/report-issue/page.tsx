"use client";

import React, { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, Camera, Upload, CheckCircle, Clock } from 'lucide-react';

const ISSUE_TYPES = [
  "TOILET", "LIGHTING", "ROAD", "SIGNAGE", "SAFETY", "CLEANLINESS", "OTHER"
];

const getStatusColor = (status: string) => {
  switch(status) {
    case 'OPEN': return 'bg-rose-50 text-rose-600 border-rose-100';
    case 'IN_PROGRESS': return 'bg-amber-50 text-amber-600 border-amber-100';
    case 'RESOLVED': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch(status) {
    case 'OPEN': return <AlertTriangle size={14} className="mr-1" />;
    case 'IN_PROGRESS': return <Clock size={14} className="mr-1" />;
    case 'RESOLVED': return <CheckCircle size={14} className="mr-1" />;
    default: return null;
  }
};

export default function ReportIssuePage() {
  const [formData, setFormData] = useState({ location: "", type: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [recentReports, setRecentReports] = useState<any[]>([]);

  const fetchRecentReports = () => {
    fetch(`${(process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "").endsWith("/api") ? (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "") : (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "") + "/api"}/reports/infra/public`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRecentReports(data);
        }
      })
      .catch(err => console.error('Failed to fetch public reports:', err));
  };

  useEffect(() => {
    fetchRecentReports();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location || !formData.type || !formData.description) return;
    
    setIsSubmitting(true);
    const token = localStorage.getItem('auth_token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "").endsWith("/api") ? (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "") : (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "") + "/api"}/reports/infra`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          location: formData.location,
          type: formData.type,
          description: formData.description
        })
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ location: "", type: "", description: "" });
        fetchRecentReports();
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to submit report. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Failed to submit report.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-slate-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Report an Issue</h1>
            <p className="text-lg text-gray-300">
              Help us keep Kanyakumari beautiful and safe. Report infrastructure issues directly to the authorities.
            </p>
          </div>
        </div>
      </div>

      <div className="container-wide mt-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Section */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6">Submit a Report</h2>
              
              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-6 text-center animate-in fade-in zoom-in">
                  <CheckCircle size={48} className="mx-auto mb-4 text-emerald-500" />
                  <h3 className="text-xl font-bold mb-2">Report Submitted!</h3>
                  <p>Thank you for your report. Our team will look into it shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location of Issue</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin size={18} className="text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        className="pl-10 w-full border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                        placeholder="e.g. Near Gandhi Memorial Main Gate"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {ISSUE_TYPES.map(type => (
                        <div 
                          key={type}
                          onClick={() => setFormData({...formData, type})}
                          className={`cursor-pointer rounded-lg border p-3 text-center text-sm font-bold transition-all ${
                            formData.type === type 
                              ? 'bg-[#0B4F8A] text-white border-[#0B4F8A] shadow-sm' 
                              : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50/30'
                          }`}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea 
                      rows={4}
                      className="w-full border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border resize-none"
                      placeholder="Please provide details about the issue..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo (Optional)</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-500 transition-colors bg-gray-50 cursor-pointer">
                      <div className="space-y-1 text-center">
                        <Camera className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-650 justify-center font-semibold">
                          <span className="relative rounded-md font-medium text-[#0B4F8A] hover:text-blue-800 focus-within:outline-none">
                            <span>Upload a file</span>
                          </span>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || !formData.location || !formData.type || !formData.description}
                    className="w-full bg-[#0B4F8A] hover:bg-blue-800 text-white py-4 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center shadow-md"
                  >
                    {isSubmitting ? (
                      <span className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                    ) : (
                      <Upload size={20} className="mr-2" />
                    )}
                    Submit Report
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Recent Reports Section */}
          <div className="lg:col-span-5">
            <h3 className="text-xl font-serif font-bold text-slate-800 mb-6">Recent Reports</h3>
            <div className="space-y-4">
              {recentReports.length > 0 ? (
                recentReports.map((report) => (
                  <div key={report.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-3 font-sans">
                      <span className="text-xs font-bold text-gray-400 tracking-wider">#{report.id.substring(report.id.length - 6).toUpperCase()} • {report.type}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center font-bold uppercase ${getStatusColor(report.status)}`}>
                        {getStatusIcon(report.status)}
                        {report.status.replace('_', ' ')}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800 mb-1 flex items-center">
                      <MapPin size={16} className="text-[#0B4F8A] mr-1 flex-shrink-0" />
                      <span className="truncate">{report.location}</span>
                    </h4>
                    <p className="text-sm text-gray-600 mb-3 font-sans">{report.description}</p>
                    <div className="text-[11px] text-gray-400 font-medium font-sans">
                      {new Date(report.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-450 text-body-sm font-sans font-medium">
                  No infrastructure reports submitted yet.
                </div>
              )}
            </div>
            
            <div className="mt-6 bg-rose-50/50 rounded-2xl p-6 border border-rose-100">
              <h4 className="font-bold text-rose-600 mb-2 flex items-center">
                <AlertTriangle size={18} className="mr-2" />
                Emergency?
              </h4>
              <p className="text-sm text-gray-650 mb-4 font-sans font-medium leading-relaxed">For emergencies requiring immediate police or medical assistance, please call the toll-free numbers directly.</p>
              <div className="space-y-2 text-sm font-bold font-sans">
                <div className="flex justify-between border-b border-rose-100/50 pb-2"><span>Police:</span> <span className="text-rose-600">100</span></div>
                <div className="flex justify-between border-b border-rose-100/50 pb-2"><span>Ambulance:</span> <span className="text-rose-600">108</span></div>
                <div className="flex justify-between pt-1"><span>Tourist Helpline:</span> <span className="text-[#0B4F8A]">1800-425-31111</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

