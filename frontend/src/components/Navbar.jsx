import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  return (
    // Fixed Banner + Navbar Container - Stays at top when scrolling
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-7 mt-7">
        {/* Announcement Banner */}
        <div className="rounded-t-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#c85940] to-[#d66645] text-white text-center py-1.5 px-4">
            <p className="text-[11px] font-normal tracking-wide">
              ✦✦ Introducing MailShield – Live phishing detection and labeling for Gmail ✦✦
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className="rounded-b-xl"
          style={{
            background: `
              linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0.72),
                rgba(255, 255, 255, 0.58)
              )
            `,
            backdropFilter: 'blur(40px) saturate(200%)',
            WebkitBackdropFilter: 'blur(40px) saturate(200%)',
            borderBottom: '0.5px solid rgba(255, 255, 255, 0.18)',
            boxShadow: `
              0 4px 30px rgba(0, 0, 0, 0.05),
              inset 0 1px 0 rgba(255, 255, 255, 0.9)
            `
          }}
        >
          <div className="px-10 py-2.5">
            <div className="flex items-center justify-between">
              
              {/* Logo */}
              <div className="flex items-center">
                <h1 className="text-[24px] font-normal tracking-tight text-gray-900">
                  MailShield
                </h1>
              </div>

              {/* Navigation Links */}
              <div className="flex items-center gap-6">
                
                {/* PRODUCT Dropdown */}
                <div className="relative group">
                  <button className="text-gray-700 text-[12px] font-bold flex items-center hover:text-[#c85940] tracking-[0.04em] uppercase transition-colors">
                    PRODUCT
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Products Dropdown Menu */}
                  <div
                    className="absolute top-full left-0 mt-3 w-60 rounded-xl shadow-2xl py-3 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                    style={{
                      background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.75))`,
                      backdropFilter: 'blur(40px) saturate(200%)',
                      WebkitBackdropFilter: 'blur(40px) saturate(200%)',
                      border: '0.5px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: `0 10px 40px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 1)`
                    }}
                  >
                    <div className="mb-3 px-3 pt-1">
                      <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-2">FEATURES</p>
                      <button onClick={() => navigate('/live')} className="block w-full text-left py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors">
                        Live Gmail labeling
                      </button>
                      <button onClick={() => navigate('/header-engine')} className="block w-full text-left py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors">
                        Header risk‑scoring engine
                      </button>
                      <button onClick={() => navigate('/architecture')} className="block w-full text-left py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors">
                        Real‑time push pipeline
                      </button>
                      <button onClick={() => navigate('/developers')} className="block w-full text-left py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors">
                        Developer‑friendly REST API
                      </button>
                      <button onClick={() => navigate('/product')} className="block w-full text-left py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors">
                        Deployment & pricing overview
                      </button>
                    </div>
                    <div className="border-t border-gray-200 pt-3 px-3">
                      <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-2">ARCHITECTURE</p>
                      <button onClick={() => navigate('/architecture')} className="block w-full text-left py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors">
                        System architecture & flow
                      </button>
                    </div>
                  </div>
                </div>

                {/* COMPANY / PROJECT Dropdown */}
                <div className="relative group">
                  <button className="text-gray-700 text-[12px] font-bold flex items-center hover:text-[#c85940] tracking-[0.04em] uppercase transition-colors">
                    PROJECT
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Project Dropdown Menu */}
                  <div
                    className="absolute top-full left-0 mt-3 w-52 rounded-xl shadow-2xl py-3 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                    style={{
                      background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.75))`,
                      backdropFilter: 'blur(40px) saturate(200%)',
                      WebkitBackdropFilter: 'blur(40px) saturate(200%)',
                      border: '0.5px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: `0 10px 40px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 1)`
                    }}
                  >
                    <button onClick={() => navigate('/product')} className="block w-full text-left py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors">
                      About the project
                    </button>
                    <button onClick={() => navigate('/security')} className="block w-full text-left py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors">
                      Security & privacy
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/developers')}
                  className="text-gray-700 text-[12px] font-bold hover:text-[#c85940] tracking-[0.04em] uppercase transition-colors"
                >
                  DOCS
                </button>
                <a
                  href="https://github.com/your-org/your-repo"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 text-[12px] font-bold hover:text-[#c85940] tracking-[0.04em] uppercase transition-colors"
                >
                  GITHUB
                </a>

                <button
                  onClick={() => navigate('/developers')}
                  className="text-gray-700 text-[11px] font-bold border border-white/60 px-4 py-1.5 rounded tracking-[0.04em] uppercase hover:border-gray-300 transition-colors"
                  style={{ backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)' }}
                >
                  VIEW DOCS
                </button>

                <button onClick={() => navigate('/live')} className="bg-[#2d2d2d] text-white text-[11px] font-bold px-5 py-1.5 rounded hover:bg-gray-800 flex items-center tracking-[0.04em] uppercase shadow-sm transition-colors">
                  OPEN LIVE DEMO
                  <span className="ml-1.5 text-[9px]">✦</span>
                </button>
              </div>

            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
