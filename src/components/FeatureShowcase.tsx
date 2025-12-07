'use client';

import React, { useState, useEffect } from 'react';

const FeatureShowcase = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);

  // Scroll Reveal Logic
  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".reveal");
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        }
      }
    };
    window.addEventListener("scroll", reveal);
    reveal(); 
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  return (
    // MAIN CONTAINER: Forced to full width and min-height to prevent white screen issues
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff', overflowX: 'hidden' }} className="antialiased font-sans text-slate-900 bg-white relative">
      
      {/* INTERNAL CSS FOR ANIMATIONS & UTILITIES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        body, div, p, h1, h2, h3, button { font-family: 'Plus Jakarta Sans', sans-serif; }

        /* SCROLL ANIMATIONS */
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.5, 0, 0, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }

        /* ARROW ANIMATION */
        @keyframes bounce-glow {
            0%, 100% { transform: translateY(0); opacity: 0.5; text-shadow: 0 0 0px #3b82f6; }
            50% { transform: translateY(10px); opacity: 1; text-shadow: 0 0 10px #3b82f6; }
        }
        .arrow-anim { animation: bounce-glow 2s infinite; }

        /* UTILS */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* DASHBOARD ANIMATIONS */
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade { animation: fade-in-up 0.4s ease-out forwards; }
        
        /* HOVER EFFECTS FOR DASHBOARD ITEMS */
        .dash-nav-item.active { background-color: #eff6ff; color: #2563eb; border-right: 3px solid #2563eb; }
        @media (max-width: 768px) { .dash-nav-item.active { border-right: none; border-bottom: 2px solid #2563eb; } }
      `}</style>

      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center reveal active shadow-sm">
        <div className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          TECH<span className="text-blue-600">INNOV</span>
        </div>
        <a href="/" className="text-xs font-bold bg-slate-900 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition shadow-lg hover:shadow-xl hover:scale-105">EXIT PREVIEW</a>
      </nav>

      {/* HERO / FEATURES HEADER */}
      <section className="pt-32 pb-12 px-4 flex flex-col items-center text-center w-full max-w-7xl mx-auto">
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-slate-900 reveal">
          Features We Provide
        </h1>

        <div className="reveal flex flex-wrap justify-center gap-6 text-lg font-bold text-slate-500 mb-12 bg-white px-8 py-4 rounded-full shadow-lg border border-slate-100">
          <div className="flex items-center gap-2 text-blue-600">
             <span className="bg-blue-100 p-1 rounded text-sm">01</span> Interface
          </div>
          <span className="hidden md:inline text-slate-300">➝</span>
          <div className="flex items-center gap-2 hover:text-slate-800 transition">
             <span className="bg-slate-100 p-1 rounded text-sm">02</span> Dashboard
          </div>
          <span className="hidden md:inline text-slate-300">➝</span>
          <div className="flex items-center gap-2 hover:text-slate-800 transition">
             <span className="bg-slate-100 p-1 rounded text-sm">03</span> Growth
          </div>
        </div>

        {/* --- FEATURE 01: WEBSITE INTERFACE (Keep this as is) --- */}
        <div className="w-full mb-6 border-b-2 border-slate-100 pb-4 flex items-end gap-6 reveal text-left">
          <span className="text-8xl font-black text-blue-100 leading-none" style={{ fontSize: '6rem', WebkitTextStroke: '2px #e2e8f0' }}>01</span>
          <div className="pb-2">
            <h2 className="text-3xl font-bold text-slate-900">Website Interface</h2>
            <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-1">Immersive • Responsive • Fast</p>
          </div>
        </div>

        {/* Feature 1 Preview Container */}
        <div className="w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col relative reveal hover:-translate-y-2 transition duration-500" style={{ height: '600px', minHeight: '500px' }}>
          <div className="h-12 bg-slate-50 border-b border-slate-200 flex items-center px-4 justify-between shrink-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white px-4 py-1 rounded text-xs text-slate-500 font-mono border border-slate-100 shadow-sm">
              <span className="text-green-500 animate-pulse">●</span> citizen-properties.lovable.app
            </div>
            <a href="https://citizen-properties.lovable.app/" target="_blank" className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-600 hover:text-white transition">OPEN ↗</a>
          </div>
          <iframe src="https://citizen-properties.lovable.app/" className="w-full h-full bg-white border-0" title="Preview"></iframe>
        </div>

      </section>

      <div className="flex justify-center py-8 reveal">
        <div className="arrow-anim text-5xl text-blue-300 font-bold">↓</div>
      </div>

      {/* --- FEATURE 02: ADMIN DASHBOARD (RESTORED ORIGINAL DESIGN) --- */}
      <section className="py-16 px-4 bg-white border-t border-slate-100 relative w-full">
        <div className="max-w-6xl mx-auto w-full">
          
          <div className="w-full mb-8 border-b-2 border-slate-100 pb-4 flex items-end gap-6 reveal">
            <span className="text-8xl font-black text-blue-100 leading-none" style={{ fontSize: '6rem', WebkitTextStroke: '2px #e2e8f0' }}>02</span>
            <div className="pb-2">
              <h2 className="text-3xl font-bold text-slate-900">Admin Dashboard</h2>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-1">CRM • Analytics • Listings</p>
            </div>
          </div>

          {/* DASHBOARD CONTAINER - FORCED HEIGHT to prevent collapse */}
          <div className="bg-slate-50 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row reveal hover:shadow-blue-900/10 transition duration-500" style={{ height: '650px', minHeight: '600px' }}>
            
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex flex-col shrink-0 z-10">
              <div className="p-6 hidden md:block border-b border-slate-100">
                <div className="font-bold text-slate-800 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold ring-2 ring-blue-100">RS</div>
                  <div className="leading-tight">
                    <div className="text-sm">Rahul S.</div>
                    <div className="text-xs text-slate-400">Premium Agent</div>
                  </div>
                </div>
              </div>
              
              {/* Navigation Items */}
              <div className="flex md:flex-col overflow-x-auto no-scrollbar p-2 md:p-3 gap-2 bg-white h-full">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`dash-nav-item px-4 py-3 md:p-4 rounded-lg text-sm font-medium flex items-center gap-3 transition cursor-pointer text-left ${activeTab === 'overview' ? 'active' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <span className="text-lg">📈</span> Growth
                </button>
                <button 
                  onClick={() => setActiveTab('properties')}
                  className={`dash-nav-item px-4 py-3 md:p-4 rounded-lg text-sm font-medium flex items-center gap-3 transition cursor-pointer text-left ${activeTab === 'properties' ? 'active' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <span className="text-lg">🏡</span> Listings
                </button>
                <button 
                  onClick={() => setActiveTab('leads')}
                  className={`dash-nav-item px-4 py-3 md:p-4 rounded-lg text-sm font-medium flex items-center gap-3 transition cursor-pointer text-left ${activeTab === 'leads' ? 'active' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <span className="text-lg">👥</span> Prospects
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`dash-nav-item px-4 py-3 md:p-4 rounded-lg text-sm font-medium flex items-center gap-3 transition cursor-pointer text-left ${activeTab === 'settings' ? 'active' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <span className="text-lg">⚡</span> Automation
                </button>
              </div>
            </div>

            {/* Dashboard Content Area */}
            <div className="flex-1 bg-slate-50 p-4 md:p-8 overflow-y-auto relative">
              
              {/* TAB: OVERVIEW (With the Bar Charts) */}
              {activeTab === 'overview' && (
                <div className="animate-fade">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Performance Metrics</h3>
                    <span className="text-xs font-medium text-slate-500 bg-white px-3 py-1 rounded border border-slate-200">This Month</span>
                  </div>
                  
                  {/* Metric Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:-translate-y-1 transition duration-300">
                      <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Volume</div>
                      <div className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">₹ 12.4 Cr</div>
                      <div className="text-green-500 text-xs font-bold mt-1">↑ 18% vs last month</div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:-translate-y-1 transition duration-300">
                      <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Active Deals</div>
                      <div className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">18</div>
                      <div className="text-slate-500 text-xs mt-1">Mumbai & Pune</div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm col-span-2 md:col-span-1 hover:-translate-y-1 transition duration-300">
                      <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Hot Leads</div>
                      <div className="text-2xl md:text-3xl font-bold text-blue-600 mt-2">42</div>
                      <div className="text-slate-500 text-xs mt-1">High intent buyers</div>
                    </div>
                  </div>

                  {/* Revenue Chart */}
                  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Revenue Trend</h4>
                      <div className="bg-slate-50 border border-slate-200 text-xs rounded px-2 py-1 text-slate-500">Last 30 Days</div>
                    </div>

                    <div className="flex justify-between items-end h-40 gap-2 md:gap-4 px-2 border-b border-slate-100 pb-2">
                      {[
                        { h: '45%', val: '₹45L' },
                        { h: '75%', val: '₹85L' },
                        { h: '60%', val: '₹68L' },
                        { h: '95%', val: '₹1.2Cr' },
                        { h: '35%', val: '₹35L' }
                      ].map((bar, idx) => (
                        <div key={idx} className="w-full bg-blue-50 rounded-t relative hover:bg-blue-100 transition group cursor-pointer h-full flex items-end">
                          <div 
                            className="w-full bg-blue-500 rounded-t transition-all duration-1000 group-hover:bg-blue-600 shadow-lg shadow-blue-500/20" 
                            style={{ height: bar.h, transitionDelay: `${idx * 100}ms` }}
                          ></div>
                          {/* Tooltip */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition shadow-lg whitespace-nowrap z-10">
                            {bar.val}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: PROPERTIES */}
              {activeTab === 'properties' && (
                <div className="animate-fade">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Active Listings</h3>
                    <button className="bg-blue-600 active:scale-95 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-blue-500/30 transition hover:bg-blue-700">
                      + Create Listing
                    </button>
                  </div>
                  <div className="space-y-4">
                    {/* Item 1 */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-blue-300 transition cursor-pointer hover:shadow-md">
                      <div className="w-16 h-16 rounded-lg bg-slate-200 bg-cover bg-center shrink-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-2495db9dc2c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80')" }}></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-slate-800 truncate">Lodha World Towers</div>
                        <div className="text-xs text-slate-500 truncate">Lower Parel, Mumbai</div>
                        <div className="text-blue-600 font-bold text-sm mt-1">₹ 4.5 Cr</div>
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Active</div>
                    </div>
                    
                    {/* Item 2 */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-blue-300 transition cursor-pointer hover:shadow-md">
                      <div className="w-16 h-16 rounded-lg bg-slate-200 bg-cover bg-center shrink-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80')" }}></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-slate-800 truncate">Prestige Tech Park</div>
                        <div className="text-xs text-slate-500 truncate">Marathahalli, Bangalore</div>
                        <div className="text-blue-600 font-bold text-sm mt-1">₹ 85 L</div>
                      </div>
                      <div className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">Pending</div>
                    </div>

                    {/* Item 3 */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-blue-300 transition cursor-pointer hover:shadow-md">
                      <div className="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center text-xs text-slate-400 font-bold border border-slate-200 shrink-0">Draft</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-slate-800 truncate">DLF Cyber City Office</div>
                        <div className="text-xs text-slate-500 truncate">Gurgaon, Delhi NCR</div>
                        <div className="text-slate-400 font-bold text-sm mt-1">Price Pending</div>
                      </div>
                      <div className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full">Draft</div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: LEADS */}
              {activeTab === 'leads' && (
                <div className="animate-fade">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Prospects</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center hover:bg-slate-50 transition hover:shadow-md cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold shrink-0">AP</div>
                        <div>
                          <div className="text-sm font-bold text-slate-800">Amit Patel</div>
                          <div className="text-xs text-slate-500">Inquired about Lodha</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="w-9 h-9 rounded-full bg-green-50 text-green-600 hover:bg-green-500 hover:text-white transition flex items-center justify-center shadow">💬</button>
                        <button className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white transition flex items-center justify-center shadow">📞</button>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center hover:bg-slate-50 transition hover:shadow-md cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold shrink-0">PS</div>
                        <div>
                          <div className="text-sm font-bold text-slate-800">Priya Singh</div>
                          <div className="text-xs text-slate-500">Site Visit: Monday</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="w-9 h-9 rounded-full bg-green-50 text-green-600 hover:bg-green-500 hover:text-white transition flex items-center justify-center shadow">💬</button>
                        <button className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white transition flex items-center justify-center shadow">📞</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SETTINGS */}
              {activeTab === 'settings' && (
                <div className="animate-fade">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Workflow Automation</h3>
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                    
                    {/* Toggle 1 */}
                    <div className="flex items-center justify-between cursor-pointer group" onClick={() => setWhatsappEnabled(!whatsappEnabled)}>
                      <div>
                        <div className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition">WhatsApp Lead Alerts</div>
                        <div className="text-xs text-slate-400 mt-1">Get instant notification on +91 98...</div>
                      </div>
                      <div className={`w-12 h-7 rounded-full relative transition-colors duration-300 shadow-inner ${whatsappEnabled ? 'bg-green-500' : 'bg-slate-200'}`}>
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${whatsappEnabled ? 'right-1' : 'left-1'}`}></div>
                      </div>
                    </div>

                    <hr className="border-slate-50" />

                    {/* Toggle 2 */}
                    <div className="flex items-center justify-between cursor-pointer group" onClick={() => setScheduleEnabled(!scheduleEnabled)}>
                      <div>
                        <div className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition">Auto-Schedule Site Visits</div>
                        <div className="text-xs text-slate-400 mt-1">Sync with Google Calendar</div>
                      </div>
                      <div className={`w-12 h-7 rounded-full relative transition-colors duration-300 shadow-inner ${scheduleEnabled ? 'bg-green-500' : 'bg-slate-200'}`}>
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${scheduleEnabled ? 'right-1' : 'left-1'}`}></div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-16 text-center reveal">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Ready to scale your business?</h2>
        <a href="/" className="inline-block bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-600 transition transform hover:scale-105 shadow-xl shadow-blue-900/20">
          Get Your Platform Now
        </a>
      </section>

    </div>
  );
};

export default FeatureShowcase;