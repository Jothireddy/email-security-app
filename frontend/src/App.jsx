/*import React, { useEffect, useState } from 'react';
import { setAuthToken, getAuthToken, fetchRecentEmails } from './api';

function App() {
  const [token, setToken] = useState(getAuthToken());
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('token');
    if (t) {
      setAuthToken(t);
      setToken(t);
      window.history.replaceState({}, '', window.location.pathname);
    } else if (getAuthToken()) {
      setAuthToken(getAuthToken());
    }
  }, []);

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  const handleLogout = () => {
    setAuthToken(null);
    setToken(null);
    setEmails([]);
  };

  const handleRefresh = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchRecentEmails(20);
      setEmails(data.emails || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load emails');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>Email Header Analysis – Live Labeling</h1>

      {!token ? (
        <div>
          <p>Connect your Gmail account to start automatic labeling.</p>
          <button onClick={handleLogin}>Login with Google</button>
        </div>
      ) : (
        <div>
          <p>
            Logged in. New emails will be labeled automatically in Gmail.
            Use “Refresh” to see recent analysis.
          </p>
          <button onClick={handleLogout} style={{ marginRight: 10 }}>
            Logout
          </button>
          <button onClick={handleRefresh} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh recent emails'}
          </button>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {emails.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h2>Recent Emails</h2>
          <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Subject</th>
                <th>From</th>
                <th>Our Label</th>
                <th>Score</th>
                <th>Reasons</th>
                <th>Gmail Labels</th>
              </tr>
            </thead>
            <tbody>
              {emails.map(email => {
                const headers = {};
                email.headers.forEach(h => {
                  headers[h.name.toLowerCase()] = h.value;
                });

                return (
                  <tr key={email.id}>
                    <td>{headers['subject']}</td>
                    <td>{headers['from']}</td>
                    <td>{email.analysis.label}</td>
                    <td>{email.analysis.score}</td>
                    <td>{email.analysis.reasons.join(', ')}</td>
                    <td>{(email.gmailLabels || []).join(', ')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;*/

/*

import React from 'react';
import bg1 from '/src/assets/bg1.png';
import bg2 from '/src/assets/bg2.png';
import bg3 from '/src/assets/bg3.png';
import bg3svg from '/src/assets/bg3.svg';
import bg4 from '/src/assets/bg4.png';
import bg4svg from '/src/assets/bg4.svg';

export default function App() {
  return (
    <div 
      className="min-h-screen relative"
      style={{ 
        fontFamily: 'Twkeverett, sans-serif',
        backgroundColor: '#f5f3f0'
      }}
    >
    
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-7 mt-7">
         
          <div className="rounded-t-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#c85940] to-[#d66645] text-white text-center py-1.5 px-4">
              <p className="text-[11px] font-normal tracking-wide">
                ✦✦ Introducing Sarvam Samvaad - Conversational AI for India ✦✦
              </p>
            </div>
          </div>

         
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
                
              
                <div className="flex items-center">
                  <h1 className="text-[24px] font-normal tracking-tight text-gray-900">
                    sarvam
                  </h1>
                </div>

              
                <div className="flex items-center gap-6">
                  
                 
                  <div className="relative group">
                    <button className="text-gray-700 text-[12px] font-bold flex items-center hover:text-[#c85940] tracking-[0.04em] uppercase transition-colors">
                      PRODUCTS
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    
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
                        <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-2">API</p>
                        <a href="#" className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors">SPEECH TO TEXT</a>
                        <a href="#" className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors">TEXT TO SPEECH</a>
                        <a href="#" className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors">SPEECH TRANSLATE</a>
                        <a href="#" className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors">TEXT</a>
                        <a href="#" className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors">API PRICING</a>
                      </div>
                      <div className="border-t border-gray-200 pt-3 px-3">
                        <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-2">PLATFORM</p>
                        <a href="#" className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors">CONVERSATIONAL AGENTS</a>
                      </div>
                    </div>
                  </div>

              
                  <div className="relative group">
                    <button className="text-gray-700 text-[12px] font-bold flex items-center hover:text-[#c85940] tracking-[0.04em] uppercase transition-colors">
                      COMPANY
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                   
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
                      <a href="#" className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors">ABOUT US</a>
                      <a href="#" className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors">SOVEREIGN AI</a>
                    </div>
                  </div>

                  <a href="#" className="text-gray-700 text-[12px] font-bold hover:text-[#c85940] tracking-[0.04em] uppercase transition-colors">BLOG</a>
                  <a href="#" className="text-gray-700 text-[12px] font-bold hover:text-[#c85940] tracking-[0.04em] uppercase transition-colors">CAREERS</a>

                  <a href="#" className="text-gray-700 text-[11px] font-bold border border-white/60 px-4 py-1.5 rounded tracking-[0.04em] uppercase hover:border-gray-300 transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)' }}>
                    API PLATFORM
                  </a>

                  <button className="bg-[#2d2d2d] text-white text-[11px] font-bold px-5 py-1.5 rounded hover:bg-gray-800 flex items-center tracking-[0.04em] uppercase shadow-sm transition-colors">
                    REQUEST A DEMO
                    <span className="ml-1.5 text-[9px]">✦</span>
                  </button>
                </div>

              </div>
            </div>
          </nav>
        </div>
      </div>

      
      <div className="min-h-screen pt-40" style={{ backgroundImage: `url(${bg1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <main className="max-w-[900px] mx-auto px-8 pt-28 pb-24 relative z-10">
          <div className="text-center">
            <h2 className="text-[52px] font-normal text-[#1a1a1a] leading-[1.08] mb-4 tracking-tight">
              Building the bedrock of<br />Sovereign AI for India
            </h2>
            <p className="text-[17px] text-[#6b6b6b] font-normal mb-8 leading-[1.55] max-w-[680px] mx-auto">
              A full-stack Generative AI platform that empowers governments,<br />enterprises, and developers to create AI for all of India
            </p>
            <div className="flex items-center justify-center gap-3 mt-7">
              <button className="bg-gradient-to-r from-[#c85940] to-[#d66645] text-white px-7 py-3 rounded text-[12px] font-bold tracking-[0.08em] uppercase shadow-md">
                BUILD WITH SARVAM<span className="ml-2 text-[10px]">✦</span>
              </button>
              <button className="bg-white text-[#4a4a4a] border border-gray-300 px-7 py-3 rounded text-[12px] font-bold tracking-[0.08em] uppercase shadow-sm">REQUEST A DEMO</button>
            </div>
          </div>
        </main>
      </div>

     
      <div className="h-16" style={{ background: 'linear-gradient(to bottom, rgba(245, 243, 240, 0) 0%, rgba(245, 243, 240, 1) 100%)' }}></div>

     
      <div className="relative overflow-hidden py-8" style={{ backgroundColor: '#f5f3f0' }}>
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex items-center justify-between gap-12">
            <div className="max-w-[480px] relative z-10">
              <h3 className="text-[40px] font-normal text-[#2d2d2d] leading-[1.1] mb-4 tracking-tight">Build with Sarvam</h3>
              <p className="text-[16px] text-[#4a4a4a] font-normal mb-7 leading-[1.6]">Create your own AI products and applications with Sarvam Models</p>
              <div className="flex items-center gap-4">
                <button className="bg-gradient-to-r from-[#c85940] to-[#d66645] text-white px-5 py-2.5 rounded text-[11px] font-bold tracking-[0.08em] uppercase shadow-md hover:shadow-lg transition-shadow">GET STARTED</button>
                <button className="text-[#c85940] text-[11px] font-bold tracking-[0.08em] uppercase flex items-center hover:text-[#b84830] transition-colors">
                  Read Docs
                  <svg className="w-3.5 h-3.5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
            <div className="flex-1 max-w-[600px]"><img src={bg2} alt="Code Example" className="w-full h-auto" /></div>
          </div>
        </div>
      </div>

     
      <div className="relative overflow-hidden py-12" style={{ backgroundColor: '#f5f3f0' }}>
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex items-center justify-between gap-12 bg-white rounded-3xl p-10 shadow-lg" style={{ border: '8px solid #e8e5df' }}>
            <div className="flex-1 max-w-[500px]"><img src={bg3} alt="India's AI Ecosystem Map" className="w-full h-auto" /></div>
            <div className="max-w-[550px] relative z-10">
              <h3 className="text-[48px] font-normal text-[#2d2d2d] leading-[1.1] mb-6 tracking-tight">Building India's<br />Sovereign AI Ecosystem</h3>
              <p className="text-[18px] text-[#4a4a4a] font-normal mb-10 leading-[1.6]">The Government of India has chosen Sarvam to build India's<br />sovereign foundational model</p>
              <button className="bg-white text-[#2d2d2d] border border-gray-300 px-6 py-3 rounded text-[12px] font-bold tracking-[0.08em] uppercase shadow-sm hover:shadow-md transition-shadow">LEARN MORE</button>
              <div className="mt-12"><img src={bg3svg} alt="Decorative pattern" className="w-full max-w-[450px] opacity-40" /></div>
            </div>
          </div>
        </div>
      </div>

    
      <div className="relative overflow-hidden py-12" style={{ backgroundColor: '#f5f3f0' }}>
        <div className="max-w-[1000px] mx-auto px-8">
          <h3 className="text-[48px] font-normal text-[#2d2d2d] leading-[1.1] mb-12 tracking-tight">Latest Research</h3>
          <div className="grid grid-cols-3 gap-5">
           
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow" style={{ border: '6px solid #e8e5df' }}>
              <div className="p-5 pb-4 h-[240px] flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-[22px] font-normal text-[#2d2d2d] tracking-tight">Sarvam-M</h4>
                  <span className="text-[16px] text-gray-400">अ</span>
                </div>
                <p className="text-[13px] text-[#6b6b6b] leading-[1.6] flex-1">A hybrid Indic model fine-tuned for Indian languages and reasoning tasks like math and programming</p>
              </div>
              <div className="h-36 flex items-center justify-center rounded-b-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #e8956f 0%, #d97a52 50%, #cc6945 100%)' }}>
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, mixBlendMode: 'overlay' }}></div>
                <h5 className="text-white text-[24px] font-bold tracking-wider relative z-10">SARVAM - M</h5>
              </div>
            </div>

           
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow" style={{ border: '6px solid #e8e5df' }}>
              <div className="p-5 pb-4 h-[240px] flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-[22px] font-normal text-[#2d2d2d] tracking-tight">Sarvam Translate</h4>
                  <span className="text-[16px] text-gray-400">अ</span>
                </div>
                <p className="text-[13px] text-[#6b6b6b] leading-[1.6] flex-1">An open-weights model that translates text across 22 Indian languages with the ability to handle diverse formats, contexts, and styles</p>
              </div>
              <div className="h-36 flex items-center justify-center rounded-b-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f4a76a 0%, #e59455 50%, #d88448 100%)' }}>
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, mixBlendMode: 'overlay' }}></div>
                <h5 className="text-white text-[24px] font-bold tracking-wider text-center leading-tight relative z-10">SARVAM -<br />TRANSLATE</h5>
              </div>
            </div>

          
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow" style={{ border: '6px solid #e8e5df' }}>
              <div className="p-5 pb-4 h-[240px] flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-[22px] font-normal text-[#2d2d2d] tracking-tight">Sarvam-1</h4>
                  <span className="text-[16px] text-gray-400">अ</span>
                </div>
                <p className="text-[13px] text-[#6b6b6b] leading-[1.6] flex-1">India's first LLM for 10 Indian languages, trained on 2B parameters</p>
              </div>
              <div className="h-36 flex items-center justify-center rounded-b-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f2a263 0%, #e38e4e 50%, #d67d42 100%)' }}>
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, mixBlendMode: 'overlay' }}></div>
                <h5 className="text-white text-[24px] font-bold tracking-wider relative z-10">SARVAM - 1</h5>
              </div>
            </div>

          </div>
        </div>
      </div>

     
      <div className="relative overflow-hidden py-16" style={{ backgroundColor: '#f5f3f0' }}>
        <div className="max-w-[1200px] mx-auto px-8">
          <h3 className="text-[48px] font-normal text-[#2d2d2d] leading-[1.1] mb-12 text-center tracking-tight">Foundational AI that India can rely on</h3>
          <div className="grid grid-cols-3 gap-6">
            
         
            <div className="bg-[#ebe8e3] rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-16 opacity-20" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, #d4cfc7 10px, #d4cfc7 11px)` }}></div>
              <div className="w-20 h-20 rounded-full bg-[#d4cfc7] flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h4 className="text-[28px] font-normal text-[#2d2d2d] mb-4 tracking-tight">Sovereign by Design</h4>
              <p className="text-[15px] text-[#6b6b6b] leading-[1.7]">AI infrastructure developed, deployed, and governed entirely in India. Complete data control, zero compromises</p>
            </div>

         
            <div className="bg-[#ebe8e3] rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-16 opacity-20" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, #d4cfc7 10px, #d4cfc7 11px)` }}></div>
              <div className="w-20 h-20 rounded-full bg-[#d4cfc7] flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
              </div>
              <h4 className="text-[28px] font-normal text-[#2d2d2d] mb-4 tracking-tight">Secure & Safe</h4>
              <p className="text-[15px] text-[#6b6b6b] leading-[1.7]">AI that works on-prem, in the cloud, or at the edge. Available wherever you need it</p>
            </div>

         
            <div className="bg-[#ebe8e3] rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-16 opacity-20" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, #d4cfc7 10px, #d4cfc7 11px)` }}></div>
              <div className="w-20 h-20 rounded-full bg-[#d4cfc7] flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h4 className="text-[28px] font-normal text-[#2d2d2d] mb-4 tracking-tight">State-of-the-art AI</h4>
              <p className="text-[15px] text-[#6b6b6b] leading-[1.7]">Advanced and affordable AI models and tools so India can build with confidence</p>
            </div>

          </div>
        </div>
      </div>


      <div className="relative overflow-hidden py-12" style={{ backgroundColor: '#f5f3f0' }}>
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="bg-white rounded-3xl p-12 shadow-lg" style={{ border: '8px solid #e8e5df' }}>
            <p className="text-[#9b9b9b] text-[16px] font-normal mb-3 text-center tracking-wide">Sarvam Samvaad</p>
            <h2 className="text-[52px] font-normal text-[#2d2d2d] leading-[1.15] mb-12 text-center tracking-tight">Effortlessly build, customize, and launch<br />AI Agents tailored for India</h2>
            <div className="flex items-start justify-between gap-12">
              <div className="flex-1 max-w-[450px] space-y-12">
                <div>
                  <h3 className="text-[32px] font-normal text-[#2d2d2d] mb-4 tracking-tight">One Agent, 11 Languages</h3>
                  <p className="text-[16px] text-[#6b6b6b] leading-[1.7] mb-4">Effortlessly deploy AI Agents that understand and respond naturally in 11 Indian languages</p>
                  <a href="#" className="text-[#c85940] text-[14px] font-bold tracking-wide uppercase flex items-center hover:text-[#b84830]">Learn More<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg></a>
                </div>
                <div><h3 className="text-[32px] font-normal text-[#8b8b8b] mb-4 tracking-tight">Available across Channels</h3></div>
                <div><h3 className="text-[32px] font-normal text-[#8b8b8b] mb-4 tracking-tight">Insights from every interaction</h3></div>
              </div>
              <div className="flex-1 max-w-[550px]"><img src={bg4} alt="AI Agent Dashboard Interface" className="w-full h-auto rounded-2xl shadow-2xl" /></div>
            </div>
          </div>
        </div>
      </div>

    
      <footer className="relative bg-[#4a4a45] text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <div className="grid grid-cols-4 gap-12">
            <div>
              <h2 className="text-[48px] font-normal mb-4 tracking-tight">sarvam</h2>
              <p className="text-[#c4b896] text-[16px] font-normal">AI for India starts here</p>
              <button className="mt-12 bg-[#5a5a55] text-white px-6 py-3 rounded text-[11px] font-bold tracking-wide uppercase flex items-center hover:bg-[#6a6a65] transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                EXPERIENCE SARVAM
              </button>
            </div>
            <div>
              <h3 className="text-[14px] font-bold tracking-wider uppercase mb-6">PRODUCTS</h3>
              <ul className="space-y-3"><li><a href="#" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">CONVERSATIONAL AGENTS</a></li></ul>
            </div>
            <div>
              <h3 className="text-[14px] font-bold tracking-wider uppercase mb-6">API</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">SPEECH TO TEXT</a></li>
                <li><a href="#" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">SPEECH TRANSLATE</a></li>
                <li><a href="#" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">TEXT</a></li>
                <li><a href="#" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">TEXT TO SPEECH</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[14px] font-bold tracking-wider uppercase mb-6">ABOUT US</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">BLOG</a></li>
                <li><a href="#" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">DISCORD</a></li>
                <li><a href="#" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">CAREERS</a></li>
                <li><a href="#" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">DEV DOCS</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-[#6a6a65] flex items-center justify-between">
            <div className="text-[#8a8a85] text-[12px]">
              <p>2026 Sarvam AI (Axonwise Private Limited)</p>
              <p className="mt-1">All rights reserved. Bengaluru- 560067</p>
            </div>
            <div className="flex items-center gap-8">
              <a href="#" className="text-[#8a8a85] text-[12px] hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="text-[#8a8a85] text-[12px] hover:text-white transition-colors">Privacy policy</a>
              <div className="flex items-center gap-4 ml-4">
                <a href="#" className="text-[#8a8a85] hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                <a href="#" className="text-[#8a8a85] hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                <a href="#" className="text-[#8a8a85] hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-40"><img src={bg4svg} alt="Decorative pattern" className="w-full h-full object-cover" /></div>
      </footer>
    </div>
  );
}*/

/*

import React, { useEffect, useState } from 'react';
import { setAuthToken, getAuthToken, fetchRecentEmails } from './api';

import bg1 from '/src/assets/bg1.png';
import bg2 from '/src/assets/bg2.png';
import bg3 from '/src/assets/bg3.png';
import bg3svg from '/src/assets/bg3.svg';
import bg4 from '/src/assets/bg4.png';
import bg4svg from '/src/assets/bg4.svg';

export default function App() {
  const [token, setToken] = useState(getAuthToken());
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle JWT from OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('token');
    if (t) {
      setAuthToken(t);
      setToken(t);
      window.history.replaceState({}, '', window.location.pathname);
    } else if (getAuthToken()) {
      setAuthToken(getAuthToken());
    }
  }, []);

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  const handleLogout = () => {
    setAuthToken(null);
    setToken(null);
    setEmails([]);
  };

  const handleRefresh = async (limit = 20) => {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const data = await fetchRecentEmails(limit);
      setEmails(data.emails || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load emails from backend. Please ensure the server is running and you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  const scrollToLiveAnalysis = () => {
    const el = document.getElementById('live-analysis');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleViewLiveAnalysis = () => {
    if (!token) {
      handleLogin();
    } else {
      handleRefresh();
      scrollToLiveAnalysis();
    }
  };

  const handleOpenLiveDemo = () => {
    if (!token) {
      handleLogin();
    } else {
      scrollToLiveAnalysis();
    }
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        fontFamily: 'Twkeverett, sans-serif',
        backgroundColor: '#f5f3f0'
      }}
    >
      
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-7 mt-7">
       
          <div className="rounded-t-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#c85940] to-[#d66645] text-white text-center py-1.5 px-4">
              <p className="text-[11px] font-normal tracking-wide">
                ✦✦ MailShield – Live SPF, DKIM, DMARC based phishing detection for Gmail ✦✦
              </p>
            </div>
          </div>

         
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
              
                <div className="flex items-center">
                  <h1 className="text-[24px] font-normal tracking-tight text-gray-900">
                    MailShield
                  </h1>
                </div>

             
                <div className="flex items-center gap-6">
               
                  <div className="relative group">
                    <button className="text-gray-700 text-[12px] font-bold flex items-center hover:text-[#c85940] tracking-[0.04em] uppercase transition-colors">
                      PRODUCT
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                
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
                        <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-2">
                          FEATURES
                        </p>
                        <a
                          href="#product"
                          className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors"
                        >
                          Gmail phishing labeling
                        </a>
                        <a
                          href="#capabilities"
                          className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors"
                        >
                          SPF / DKIM / DMARC analysis
                        </a>
                        <a
                          href="#capabilities"
                          className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors"
                        >
                          Header risk scoring engine
                        </a>
                        <a
                          href="#automation"
                          className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors"
                        >
                          Push & cron auto‑labeler
                        </a>
                        <a
                          href="#live-analysis"
                          className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors"
                        >
                          Live analysis dashboard
                        </a>
                      </div>
                      <div className="border-t border-gray-200 pt-3 px-3">
                        <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-2">
                          ARCHITECTURE
                        </p>
                        <a
                          href="#architecture"
                          className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors"
                        >
                          OAuth2 + Gmail + Pub/Sub flow
                        </a>
                      </div>
                    </div>
                  </div>

              
                  <div className="relative group">
                    <button className="text-gray-700 text-[12px] font-bold flex items-center hover:text-[#c85940] tracking-[0.04em] uppercase transition-colors">
                      PROJECT
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

              
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
                      <a
                        href="#about"
                        className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors"
                      >
                        About this project
                      </a>
                      <a
                        href="#security"
                        className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors"
                      >
                        Security & privacy model
                      </a>
                    </div>
                  </div>

                  <a
                    href="#developers"
                    className="text-gray-700 text-[12px] font-bold hover:text-[#c85940] tracking-[0.04em] uppercase transition-colors"
                  >
                    DOCS
                  </a>
                  <a
                    href="https://github.com/your-org/your-repo"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-700 text-[12px] font-bold hover:text-[#c85940] tracking-[0.04em] uppercase transition-colors"
                  >
                    GITHUB
                  </a>

                  <a
                    href="#developers"
                    className="text-gray-700 text-[11px] font-bold border border-white/60 px-4 py-1.5 rounded tracking-[0.04em] uppercase hover:border-gray-300 transition-colors"
                    style={{ backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)' }}
                  >
                    VIEW API DOCS
                  </a>

                  <button
                    className="bg-[#2d2d2d] text-white text-[11px] font-bold px-5 py-1.5 rounded hover:bg-gray-800 flex items-center tracking-[0.04em] uppercase shadow-sm transition-colors"
                    onClick={handleOpenLiveDemo}
                  >
                    {token ? 'OPEN LIVE DEMO' : 'CONNECT GMAIL'}
                    <span className="ml-1.5 text-[9px]">✦</span>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

     
      <div
        id="product"
        className="min-h-screen pt-40"
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <main className="max-w-[900px] mx-auto px-8 pt-28 pb-24 relative z-10">
          <div className="text-center">
            <h2 className="text-[52px] font-normal text-[#1a1a1a] leading-[1.08] mb-4 tracking-tight">
              Industry‑grade phishing detection<br />and labeling for Gmail
            </h2>
            <p className="text-[17px] text-[#6b6b6b] font-normal mb-8 leading-[1.55] max-w-[680px] mx-auto">
              MailShield is a full‑stack email security pipeline that connects to Gmail via
              OAuth2, inspects <strong>SPF</strong>, <strong>DKIM</strong>, <strong>DMARC</strong>,
              routing headers, and subjects, and automatically applies labels like{' '}
              <strong>PHISHING_RISK</strong>, <strong>SUSPICIOUS</strong>, and{' '}
              <strong>OK</strong> directly in your mailbox.
            </p>
            <div className="flex items-center justify-center gap-3 mt-7">
              <button
                className="bg-gradient-to-r from-[#c85940] to-[#d66645] text-white px-7 py-3 rounded text-[12px] font-bold tracking-[0.08em] uppercase shadow-md"
                onClick={handleViewLiveAnalysis}
              >
                VIEW LIVE ANALYSIS<span className="ml-2 text-[10px]">✦</span>
              </button>
              <button
                className="bg-white text-[#4a4a4a] border border-gray-300 px-7 py-3 rounded text-[12px] font-bold tracking-[0.08em] uppercase shadow-sm"
                onClick={() => {
                  scrollToLiveAnalysis();
                }}
              >
                SEE EMAIL LABELS
              </button>
            </div>
          </div>
        </main>
      </div>

   
      <div
        className="h-16"
        style={{
          background: 'linear-gradient(to bottom, rgba(245, 243, 240, 0) 0%, rgba(245, 243, 240, 1) 100%)'
        }}
      ></div>

    
      <div
        id="developers"
        className="relative overflow-hidden py-8"
        style={{ backgroundColor: '#f5f3f0' }}
      >
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex items-center justify-between gap-12">
            <div className="max-w-[480px] relative z-10">
              <h3 className="text-[40px] font-normal text-[#2d2d2d] leading-[1.1] mb-4 tracking-tight">
                Build with MailShield
              </h3>
              <p className="text-[16px] text-[#4a4a4a] font-normal mb-7 leading-[1.6]">
                The backend exposes a clean, JWT‑secured REST interface. Authenticate via{' '}
                <code>/auth/google</code>, inspect recent messages with{' '}
                <code>/emails/recent</code>, and use debug endpoints to validate Gmail
                profile, labels, and auto‑label behavior in development and production.
              </p>
              <p className="text-[14px] text-[#6b6b6b] font-normal mb-4 leading-[1.6]">
                Under the hood we use:
                <br />– Google OAuth2 with <strong>gmail.readonly</strong> and{' '}
                <strong>gmail.modify</strong> scopes only<br />– A reusable Gmail client for
                every user,<br />– An in‑memory user/token store (DB‑ready), and<br />– A
                header analysis engine you can extend with your own rules.
              </p>
              <div className="flex items-center gap-4">
                <button
                  className="bg-gradient-to-r from-[#c85940] to-[#d66645] text-white px-5 py-2.5 rounded text-[11px] font-bold tracking-[0.08em] uppercase shadow-md hover:shadow-lg transition-shadow"
                  onClick={handleViewLiveAnalysis}
                >
                  START WITH LIVE DATA
                </button>
                <button className="text-[#c85940] text-[11px] font-bold tracking-[0.08em] uppercase flex items-center hover:text-[#b84830] transition-colors">
                  View API structure
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 max-w-[600px]">
              <img src={bg2} alt="Code example showing MailShield API usage" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>

    
      <div
        id="architecture"
        className="relative overflow-hidden py-12"
        style={{ backgroundColor: '#f5f3f0' }}
      >
        <div className="max-w-[1200px] mx-auto px-8">
          <div
            className="flex items-center justify-between gap-12 bg-white rounded-3xl p-10 shadow-lg"
            style={{ border: '8px solid #e8e5df' }}
          >
            <div className="flex-1 max-w-[500px]">
              <img
                src={bg3}
                alt="Architecture diagram of the MailShield Gmail security pipeline"
                className="w-full h-auto"
              />
            </div>
            <div className="max-w-[550px] relative z-10">
              <h3 className="text-[48px] font-normal text-[#2d2d2d] leading-[1.1] mb-6 tracking-tight">
                Production‑ready<br />Gmail security architecture
              </h3>
              <p className="text-[18px] text-[#4a4a4a] font-normal mb-4 leading-[1.6]">
                MailShield wires together Google OAuth2, the Gmail API, Gmail watch /
                Pub/Sub push notifications, and a cron‑based fallback auto‑labeler. Every
                new INBOX message is analyzed, scored, and labeled in seconds.
              </p>
              <p className="text-[15px] text-[#6b6b6b] font-normal mb-6 leading-[1.6]">
                – <strong>OAuth flow</strong> issues a project‑owned JWT tied to the Gmail
                address.<br />
                – <strong>Push handler</strong> consumes Pub/Sub notifications and uses{' '}
                <code>users.history.list</code> to find newly added messages.<br />
                – <strong>Cron worker</strong> sweeps recent emails as a safety net.<br />
                – <strong>Label helper</strong> ensures <code>PHISHING_RISK</code>,{' '}
                <code>SUSPICIOUS</code>, and <code>OK</code> labels exist per account.
              </p>
              <button className="bg-white text-[#2d2d2d] border border-gray-300 px-6 py-3 rounded text-[12px] font-bold tracking-[0.08em] uppercase shadow-sm hover:shadow-md transition-shadow">
                VIEW SYSTEM DIAGRAM
              </button>
              <div className="mt-12">
                <img src={bg3svg} alt="Decorative pattern" className="w-full max-w-[450px] opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </div>

  
      <div
        id="capabilities"
        className="relative overflow-hidden py-12"
        style={{ backgroundColor: '#f5f3f0' }}
      >
        <div className="max-w-[1000px] mx-auto px-8">
          <h3 className="text-[48px] font-normal text-[#2d2d2d] leading-[1.1] mb-12 tracking-tight">
            Core capabilities & header intelligence
          </h3>
          <div className="grid grid-cols-3 gap-5">
           
            <div
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              style={{ border: '6px solid #e8e5df' }}
            >
              <div className="p-5 pb-4 h-[260px] flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-[22px] font-normal text-[#2d2d2d] tracking-tight">
                    Header Analysis Engine
                  </h4>
                  <span className="text-[16px] text-gray-400">H</span>
                </div>
                <p className="text-[13px] text-[#6b6b6b] leading-[1.6] flex-1">
                  A transparent, rule‑based engine that inspects:
                  <br />– <strong>Authentication‑Results</strong> for{' '}
                  <strong>SPF=pass/fail</strong>, <strong>DKIM=pass/fail</strong>, and{' '}
                  <strong>DMARC=pass/fail</strong><br />– Suspicious subject keywords
                  (password, account, payment, verify, etc.)<br />– From / Reply‑To /
                  Return‑Path domain mismatches<br />– Excessive <code>Received</code>{' '}
                  hops and display‑name tricks.
                </p>
              </div>
              <div
                className="h-36 flex items-center justify-center rounded-b-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #e8956f 0%, #d97a52 50%, #cc6945 100%)'
                }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'overlay'
                  }}
                ></div>
                <h5 className="text-white text-[24px] font-bold tracking-wider relative z-10">
                  HEADER ENGINE
                </h5>
              </div>
            </div>

           
            <div
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              style={{ border: '6px solid #e8e5df' }}
            >
              <div className="p-5 pb-4 h-[260px] flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-[22px] font-normal text-[#2d2d2d] tracking-tight">
                    Real‑time inbox protection
                  </h4>
                  <span className="text-[16px] text-gray-400">P</span>
                </div>
                <p className="text-[13px] text-[#6b6b6b] leading-[1.6] flex-1">
                  Gmail <strong>watch</strong> + <strong>Pub/Sub</strong> push
                  notifications stream newly added INBOX messages directly to the backend.
                  Each message is fetched with <code>format=metadata</code>, headers are
                  scored, and labels such as <code>PHISHING_RISK</code>,{' '}
                  <code>SUSPICIOUS</code>, or <code>OK</code> are attached in real time.
                </p>
              </div>
              <div
                className="h-36 flex items-center justify-center rounded-b-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #f4a76a 0%, #e59455 50%, #d88448 100%)'
                }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'overlay'
                  }}
                ></div>
                <h5 className="text-white text-[24px] font-bold tracking-wider text-center leading-tight relative z-10">
                  REAL‑TIME<br />PROTECTION
                </h5>
              </div>
            </div>

          
            <div
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              style={{ border: '6px solid #e8e5df' }}
            >
              <div className="p-5 pb-4 h-[260px] flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-[22px] font-normal text-[#2d2d2d] tracking-tight">
                    Scheduled auto‑labeler
                  </h4>
                  <span className="text-[16px] text-gray-400">C</span>
                </div>
                <p className="text-[13px] text-[#6b6b6b] leading-[1.6] flex-1">
                  A <strong>node‑cron</strong> worker periodically scans recent INBOX
                  messages per user, making sure labels stay consistent even if push
                  notifications are delayed. A per‑user <code>processedIds</code> set keeps
                  the job idempotent and safe to run in production.
                </p>
              </div>
              <div
                className="h-36 flex items-center justify-center rounded-b-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #f2a263 0%, #e38e4e 50%, #d67d42 100%)'
                }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'overlay'
                  }}
                ></div>
                <h5 className="text-white text-[24px] font-bold tracking-wider relative z-10">
                  CRON FALLBACK
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <div
        id="security"
        className="relative overflow-hidden py-16"
        style={{ backgroundColor: '#f5f3f0' }}
      >
        <div className="max-w-[1200px] mx-auto px-8">
          <h3 className="text-[48px] font-normal text-[#2d2d2d] leading-[1.1] mb-12 text-center tracking-tight">
            An email security foundation you can trust
          </h3>
          <div className="grid grid-cols-3 gap-6">
          
            <div className="bg-[#ebe8e3] rounded-2xl p-8 relative overflow-hidden">
              <div
                className="absolute right-0 top-0 bottom-0 w-16 opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, #d4cfc7 10px, #d4cfc7 11px)`
                }}
              ></div>
              <div className="w-20 h-20 rounded-full bg-[#d4cfc7] flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h4 className="text-[28px] font-normal text-[#2d2d2d] mb-4 tracking-tight">
                Least‑privilege by design
              </h4>
              <p className="text-[15px] text-[#6b6b6b] leading-[1.7]">
                Uses Gmail <strong>read</strong> and <strong>modify</strong> scopes only.
                Focuses on headers and labels – message bodies remain in Gmail – reducing
                data exposure and making compliance and audits easier.
              </p>
            </div>

          
            <div className="bg-[#ebe8e3] rounded-2xl p-8 relative overflow-hidden">
              <div
                className="absolute right-0 top-0 bottom-0 w-16 opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, #d4cfc7 10px, #d4cfc7 11px)`
                }}
              ></div>
              <div className="w-20 h-20 rounded-full bg-[#d4cfc7] flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>
              <h4 className="text-[28px] font-normal text-[#2d2d2d] mb-4 tracking-tight">
                Transparent, explainable scores
              </h4>
              <p className="text-[15px] text-[#6b6b6b] leading-[1.7]">
                Each email gets a numeric score and a list of reasons – <strong>SPF fail</strong>,{' '}
                <strong>DKIM fail</strong>, <strong>DMARC fail</strong>, suspicious subject
                text, domain mismatches, many hops. This makes tuning rules and explaining
                decisions to security teams straightforward.
              </p>
            </div>

            
            <div className="bg-[#ebe8e3] rounded-2xl p-8 relative overflow-hidden">
              <div
                className="absolute right-0 top-0 bottom-0 w-16 opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, #d4cfc7 10px, #d4cfc7 11px)`
                }}
              ></div>
              <div className="w-20 h-20 rounded-full bg-[#d4cfc7] flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h4 className="text-[28px] font-normal text-[#2d2d2d] mb-4 tracking-tight">
                Extensible rules & labels
              </h4>
              <p className="text-[15px] text-[#6b6b6b] leading-[1.7]">
                Ships with <strong>PHISHING_RISK</strong>, <strong>SUSPICIOUS</strong>, and{' '}
                <strong>OK</strong> labels by default. The rules live in a single{' '}
                <code>headerAnalyzer</code> module, making it easy to add new industry
                checks and custom labels for your environment.
              </p>
            </div>
          </div>
        </div>
      </div>

     
      <div
        id="automation"
        className="relative overflow-hidden py-12"
        style={{ backgroundColor: '#f5f3f0' }}
      >
        <div className="max-w-[1200px] mx-auto px-8">
          <div
            className="bg-white rounded-3xl p-12 shadow-lg"
            style={{ border: '8px solid #e8e5df' }}
          >
            <p className="text-[#9b9b9b] text-[16px] font-normal mb-3 text-center tracking-wide">
              MailShield automation
            </p>
            <h2 className="text-[52px] font-normal text-[#2d2d2d] leading-[1.15] mb-12 text-center tracking-tight">
              Effortlessly deploy, monitor, and tune<br />automatic labeling for every mailbox
            </h2>
            <div className="flex items-start justify-between gap-12">
              <div className="flex-1 max-w-[450px] space-y-12">
                <div>
                  <h3 className="text-[32px] font-normal text-[#2d2d2d] mb-4 tracking-tight">
                    One pipeline, many accounts
                  </h3>
                  <p className="text-[16px] text-[#6b6b6b] leading-[1.7] mb-4">
                    Plug in multiple Gmail users through Google OAuth. MailShield keeps
                    tokens and <code>processedIds</code> per user, ensuring that every
                    mailbox is labeled exactly once per message and stays consistent over
                    time.
                  </p>
                </div>
                <div>
                  <h3 className="text-[32px] font-normal text-[#8b8b8b] mb-4 tracking-tight">
                    Push & cron working together
                  </h3>
                  <p className="text-[16px] text-[#6b6b6b] leading-[1.7]">
                    Pub/Sub push gives near real‑time reaction to new mail, while the cron
                    auto‑labeler sweeps the INBOX every few seconds. You get resilience,
                    observability, and reliability from day one.
                  </p>
                </div>
                <div>
                  <h3 className="text-[32px] font-normal text-[#8b8b8b] mb-4 tracking-tight">
                    Insights from every interaction
                  </h3>
                  <p className="text-[16px] text-[#6b6b6b] leading-[1.7]">
                    Use the live dashboard, <code>/emails/recent</code> endpoint, and debug
                    tools (<code>/emails/debug-profile</code>, <code>/emails/debug-list-labels</code>, etc.)
                    to understand which messages are being labeled and why.
                  </p>
                </div>
              </div>
              <div className="flex-1 max-w-[550px]">
                <img
                  src={bg4}
                  alt="Dashboard of MailShield showing email risk scores and labels"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <div
        id="live-analysis"
        className="relative overflow-hidden py-12"
        style={{ backgroundColor: '#f5f3f0' }}
      >
        <div className="max-w-[1100px] mx-auto px-8">
          <h3 className="text-[36px] font-normal text-[#2d2d2d] leading-[1.1] mb-6 tracking-tight text-center">
            Live Gmail header analysis & labels
          </h3>
          <p className="text-[15px] text-[#6b6b6b] text-center mb-8 max-w-[800px] mx-auto leading-[1.6]">
            Connect your Gmail account, then use the live dashboard below to fetch recent
            INBOX messages, see how MailShield scores each one, and inspect SPF, DKIM,
            DMARC‑driven reasons, subject heuristics, and applied Gmail labels in real
            time.
          </p>

          <div className="bg-white rounded-3xl p-6 shadow-lg mb-6" style={{ border: '6px solid #e8e5df' }}>
            {!token ? (
              <div className="text-center">
                <p className="text-[14px] text-[#4a4a4a] mb-4">
                  To see the system in action, connect a Gmail account using Google OAuth.
                  We request only the minimal scopes needed to read headers and apply
                  labels.
                </p>
                <button
                  onClick={handleLogin}
                  className="bg-gradient-to-r from-[#c85940] to-[#d66645] text-white px-7 py-3 rounded text-[12px] font-bold tracking-[0.08em] uppercase shadow-md"
                >
                  LOGIN WITH GOOGLE<span className="ml-2 text-[10px]">✦</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-[14px] text-[#4a4a4a]">
                  Logged in with a Gmail account. New emails will be labeled automatically
                  via push + cron. Use <strong>Refresh</strong> to fetch the latest
                  analysis snapshot from the backend.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLogout}
                    className="bg-white text-[#4a4a4a] border border-gray-300 px-4 py-2 rounded text-[11px] font-bold tracking-[0.08em] uppercase shadow-sm"
                  >
                    LOGOUT
                  </button>
                  <button
                    onClick={() => handleRefresh(20)}
                    disabled={loading}
                    className="bg-gradient-to-r from-[#c85940] to-[#d66645] text-white px-5 py-2.5 rounded text-[11px] font-bold tracking-[0.08em] uppercase shadow-md disabled:opacity-60"
                  >
                    {loading ? 'LOADING…' : 'REFRESH RECENT EMAILS'}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <p className="mt-4 text-[13px] text-red-600">
                {error}
              </p>
            )}
          </div>

          {emails.length > 0 && (
            <div className="bg-white rounded-3xl p-6 shadow-lg" style={{ border: '6px solid #e8e5df' }}>
              <h4 className="text-[20px] font-normal text-[#2d2d2d] mb-4">
                Recent INBOX emails (analyzed by MailShield)
              </h4>
              <div className="overflow-x-auto">
                <table
                  className="min-w-full text-left text-[12px]"
                  cellPadding="6"
                  style={{ borderCollapse: 'collapse' }}
                >
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 pr-3 font-semibold text-[#4a4a4a]">Subject</th>
                      <th className="py-2 pr-3 font-semibold text-[#4a4a4a]">From</th>
                      <th className="py-2 pr-3 font-semibold text-[#4a4a4a]">Our Label</th>
                      <th className="py-2 pr-3 font-semibold text-[#4a4a4a]">Score</th>
                      <th className="py-2 pr-3 font-semibold text-[#4a4a4a]">Reasons</th>
                      <th className="py-2 pr-3 font-semibold text-[#4a4a4a]">Gmail Labels</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emails.map(email => {
                      const headers = {};
                      (email.headers || []).forEach(h => {
                        headers[h.name.toLowerCase()] = h.value;
                      });

                      return (
                        <tr key={email.id} className="border-b border-gray-100 align-top">
                          <td className="py-2 pr-3 text-[#2d2d2d]">
                            {headers['subject'] || <span className="text-gray-400 italic">No subject</span>}
                          </td>
                          <td className="py-2 pr-3 text-[#4a4a4a]">
                            {headers['from'] || <span className="text-gray-400 italic">Unknown</span>}
                          </td>
                          <td className="py-2 pr-3">
                            <span
                              className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase ${
                                email.analysis?.label === 'PHISHING_RISK'
                                  ? 'bg-red-100 text-red-700'
                                  : email.analysis?.label === 'SUSPICIOUS'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-700'
                              }`}
                            >
                              {email.analysis?.label || 'N/A'}
                            </span>
                          </td>
                          <td className="py-2 pr-3 text-[#4a4a4a]">
                            {email.analysis?.score ?? '-'}
                          </td>
                          <td className="py-2 pr-3 text-[#6b6b6b]">
                            {(email.analysis?.reasons || []).join(', ')}
                          </td>
                          <td className="py-2 pr-3 text-[#6b6b6b]">
                            {(email.gmailLabels || []).join(', ')}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {token && !loading && emails.length === 0 && !error && (
            <p className="mt-4 text-center text-[13px] text-[#6b6b6b]">
              No emails loaded yet. Click <strong>Refresh recent emails</strong> above to
              fetch the latest INBOX messages and see how they are labeled.
            </p>
          )}
        </div>
      </div>

   
      <footer className="relative bg-[#4a4a45] text-white overflow-hidden" id="about">
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <div className="grid grid-cols-4 gap-12">
            <div>
              <h2 className="text-[48px] font-normal mb-4 tracking-tight">MailShield</h2>
              <p className="text-[#c4b896] text-[16px] font-normal">
                Email security for modern teams
              </p>
              <button className="mt-12 bg-[#5a5a55] text-white px-6 py-3 rounded text-[11px] font-bold tracking-wide uppercase flex items-center hover:bg-[#6a6a65] transition-colors">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                EXPERIENCE MAILSHIELD
              </button>
            </div>
            <div>
              <h3 className="text-[14px] font-bold tracking-wider uppercase mb-6">PRODUCT</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#product"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    Gmail phishing labeling
                  </a>
                </li>
                <li>
                  <a
                    href="#capabilities"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    SPF/DKIM/DMARC rules
                  </a>
                </li>
                <li>
                  <a
                    href="#live-analysis"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    Live analysis dashboard
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[14px] font-bold tracking-wider uppercase mb-6">API</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#developers"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    Header analysis API
                  </a>
                </li>
                <li>
                  <a
                    href="#developers"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    Gmail labeling API
                  </a>
                </li>
                <li>
                  <a
                    href="#automation"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    Push & cron events
                  </a>
                </li>
                <li>
                  <a
                    href="#developers"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    Debug & admin tools
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[14px] font-bold tracking-wider uppercase mb-6">RESOURCES</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#architecture"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    Architecture docs
                  </a>
                </li>
                <li>
                  <a
                    href="#security"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    Security & privacy
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/your-org/your-repo"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    GitHub repository
                  </a>
                </li>
                <li>
                  <a
                    href="#live-analysis"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    Live demo
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-[#6a6a65] flex items-center justify-between">
            <div className="text-[#8a8a85] text-[12px]">
              <p>2026 MailShield (Demo email security project)</p>
              <p className="mt-1">All rights reserved.</p>
            </div>
            <div className="flex items-center gap-8">
              <a
                href="#security"
                className="text-[#8a8a85] text-[12px] hover:text-white transition-colors"
              >
                Terms of use
              </a>
              <a
                href="#security"
                className="text-[#8a8a85] text-[12px] hover:text-white transition-colors"
              >
                Privacy policy
              </a>
              <div className="flex items-center gap-4 ml-4">
                <a
                  href="https://www.linkedin.com"
                  className="text-[#8a8a85] hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://x.com"
                  className="text-[#8a8a85] hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  className="text-[#8a8a85] hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-40">
          <img src={bg4svg} alt="Decorative pattern" className="w-full h-full object-cover" />
        </div>
      </footer>
    </div>
  );
}*/

/*

import React, { useEffect, useState } from 'react';
import { setAuthToken, getAuthToken, fetchRecentEmails } from './api';

import bg1 from '/src/assets/bg1.png';
import bg2 from '/src/assets/bg2.png';
import bg3 from '/src/assets/bg3.png';
import bg3svg from '/src/assets/bg3.svg';
import bg4 from '/src/assets/bg4.png';
import bg4svg from '/src/assets/bg4.svg';

export default function App() {
  const [token, setToken] = useState(getAuthToken());
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle JWT from OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('token');
    if (t) {
      setAuthToken(t);
      setToken(t);
      window.history.replaceState({}, '', window.location.pathname);
    } else if (getAuthToken()) {
      setAuthToken(getAuthToken());
    }
  }, []);

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  const handleLogout = () => {
    setAuthToken(null);
    setToken(null);
    setEmails([]);
  };

  const handleRefresh = async (limit = 20) => {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const data = await fetchRecentEmails(limit);
      setEmails(data.emails || []);
    } catch (err) {
      console.error(err);
      setError(
        'Failed to load emails from backend. Please ensure the server is running and you are logged in.'
      );
    } finally {
      setLoading(false);
    }
  };

  const scrollToLiveAnalysis = () => {
    const el = document.getElementById('live-analysis');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleViewLiveAnalysis = () => {
    if (!token) {
      handleLogin();
    } else {
      handleRefresh();
      scrollToLiveAnalysis();
    }
  };

  const handleOpenLiveDemo = () => {
    if (!token) {
      handleLogin();
    } else {
      scrollToLiveAnalysis();
    }
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        fontFamily: 'Twkeverett, sans-serif',
        backgroundColor: '#f5f3f0'
      }}
    >
      
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-7 mt-7">
          
          <div className="rounded-t-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#c85940] to-[#d66645] text-white text-center py-1.5 px-4">
              <p className="text-[11px] font-normal tracking-wide">
                ✦✦ MailShield – Live SPF, DKIM, DMARC based phishing detection for Gmail ✦✦
              </p>
            </div>
          </div>

         
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
               
                <div className="flex items-center">
                  <h1 className="text-[24px] font-normal tracking-tight text-gray-900">
                    MailShield
                  </h1>
                </div>

               
                <div className="flex items-center gap-6">
               
                  <div className="relative group">
                    <button className="text-gray-700 text-[12px] font-bold flex items-center hover:text-[#c85940] tracking-[0.04em] uppercase transition-colors">
                      PRODUCT
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

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
                        <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-2">
                          FEATURES
                        </p>
                        <a
                          href="#product"
                          className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors"
                        >
                          Gmail phishing labeling
                        </a>
                        <a
                          href="#capabilities"
                          className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors"
                        >
                          SPF / DKIM / DMARC analysis
                        </a>
                        <a
                          href="#capabilities"
                          className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors"
                        >
                          Header risk scoring engine
                        </a>
                        <a
                          href="#automation"
                          className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors"
                        >
                          Push & cron auto‑labeler
                        </a>
                        <a
                          href="#live-analysis"
                          className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors"
                        >
                          Live analysis dashboard
                        </a>
                      </div>
                      <div className="border-t border-gray-200 pt-3 px-3">
                        <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-2">
                          ARCHITECTURE
                        </p>
                        <a
                          href="#architecture"
                          className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors"
                        >
                          OAuth2 + Gmail + Pub/Sub flow
                        </a>
                      </div>
                    </div>
                  </div>

               
                  <div className="relative group">
                    <button className="text-gray-700 text-[12px] font-bold flex items-center hover:text-[#c85940] tracking-[0.04em] uppercase transition-colors">
                      PROJECT
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

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
                      <a
                        href="#about"
                        className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors"
                      >
                        About this project
                      </a>
                      <a
                        href="#architecture"
                        className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors"
                      >
                        Architecture
                      </a>
                      <a
                        href="#security"
                        className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors"
                      >
                        Security & privacy model
                      </a>
                      <a
                        href="#developers"
                        className="block py-1.5 text-[12px] text-gray-700 hover:text-[#c85940] font-medium transition-colors"
                      >
                        For developers
                      </a>
                    </div>
                  </div>

                  <a
                    href="#developers"
                    className="text-gray-700 text-[12px] font-bold hover:text-[#c85940] tracking-[0.04em] uppercase transition-colors"
                  >
                    DOCS
                  </a>
                  <a
                    href="https://github.com/your-org/your-repo"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-700 text-[12px] font-bold hover:text-[#c85940] tracking-[0.04em] uppercase transition-colors"
                  >
                    GITHUB
                  </a>

                  <a
                    href="#developers"
                    className="text-gray-700 text-[11px] font-bold border border-white/60 px-4 py-1.5 rounded tracking-[0.04em] uppercase hover:border-gray-300 transition-colors"
                    style={{ backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)' }}
                  >
                    VIEW API DOCS
                  </a>

                  <button
                    className="bg-[#2d2d2d] text-white text-[11px] font-bold px-5 py-1.5 rounded hover:bg-gray-800 flex items-center tracking-[0.04em] uppercase shadow-sm transition-colors"
                    onClick={handleOpenLiveDemo}
                  >
                    {token ? 'OPEN LIVE DEMO' : 'CONNECT GMAIL'}
                    <span className="ml-1.5 text-[9px]">✦</span>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

   
      <div
        id="product"
        className="min-h-screen pt-40"
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <main className="max-w-[900px] mx-auto px-8 pt-28 pb-24 relative z-10">
          <div className="text-center">
            <h2 className="text-[52px] font-normal text-[#1a1a1a] leading-[1.08] mb-4 tracking-tight">
              Industry‑grade phishing detection<br />and labeling for Gmail
            </h2>
            <p className="text-[17px] text-[#6b6b6b] font-normal mb-8 leading-[1.55] max-w-[680px] mx-auto">
              MailShield is a full‑stack email security pipeline that connects to Gmail via
              OAuth2, inspects <strong>SPF</strong>, <strong>DKIM</strong>, <strong>DMARC</strong>,
              routing headers, and subjects, and automatically applies labels like{' '}
              <strong>PHISHING_RISK</strong>, <strong>SUSPICIOUS</strong>, and{' '}
              <strong>OK</strong> directly in your mailbox.
            </p>
            <div className="flex items-center justify-center gap-3 mt-7">
              <button
                className="bg-gradient-to-r from-[#c85940] to-[#d66645] text-white px-7 py-3 rounded text-[12px] font-bold tracking-[0.08em] uppercase shadow-md"
                onClick={handleViewLiveAnalysis}
              >
                VIEW LIVE ANALYSIS<span className="ml-2 text-[10px]">✦</span>
              </button>
              <button
                className="bg-white text-[#4a4a4a] border border-gray-300 px-7 py-3 rounded text-[12px] font-bold tracking-[0.08em] uppercase shadow-sm"
                onClick={scrollToLiveAnalysis}
              >
                SEE EMAIL LABELS
              </button>
            </div>
          </div>
        </main>
      </div>

      <div
        className="h-16"
        style={{
          background: 'linear-gradient(to bottom, rgba(245, 243, 240, 0) 0%, rgba(245, 243, 240, 1) 100%)'
        }}
      ></div>


      <div
        id="developers"
        className="relative overflow-hidden py-8"
        style={{ backgroundColor: '#f5f3f0' }}
      >
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex items-center justify-between gap-12">
            <div className="max-w-[480px] relative z-10">
              <h3 className="text-[40px] font-normal text-[#2d2d2d] leading-[1.1] mb-4 tracking-tight">
                Build with MailShield
              </h3>
              <p className="text-[16px] text-[#4a4a4a] font-normal mb-7 leading-[1.6]">
                The backend exposes a clean, JWT‑secured REST interface. Authenticate via{' '}
                <code>/auth/google</code>, inspect recent messages with{' '}
                <code>/emails/recent</code>, and use debug endpoints to validate Gmail
                profile, labels, and auto‑label behavior in development and production.
              </p>
              <p className="text-[14px] text-[#6b6b6b] font-normal mb-4 leading-[1.6]">
                Under the hood we use:
                <br />– Google OAuth2 with <strong>gmail.readonly</strong> and{' '}
                <strong>gmail.modify</strong> scopes only<br />– A reusable Gmail client for
                every user,<br />– An in‑memory user/token store (DB‑ready), and<br />– A
                header analysis engine you can extend with your own rules.
              </p>
              <div className="flex items-center gap-4">
                <button
                  className="bg-gradient-to-r from-[#c85940] to-[#d66645] text-white px-5 py-2.5 rounded text-[11px] font-bold tracking-[0.08em] uppercase shadow-md hover:shadow-lg transition-shadow"
                  onClick={handleViewLiveAnalysis}
                >
                  START WITH LIVE DATA
                </button>
                <button className="text-[#c85940] text-[11px] font-bold tracking-[0.08em] uppercase flex items-center hover:text-[#b84830] transition-colors">
                  View API structure
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 max-w-[600px]">
              <img src={bg2} alt="Code example showing MailShield API usage" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>

      
      <div
        id="architecture"
        className="relative overflow-hidden py-12"
        style={{ backgroundColor: '#f5f3f0' }}
      >
        <div className="max-w-[1200px] mx-auto px-8">
          <div
            className="flex items-center justify-between gap-12 bg-white rounded-3xl p-10 shadow-lg"
            style={{ border: '8px solid #e8e5df' }}
          >
            <div className="flex-1 max-w-[500px]">
              <img
                src={bg3}
                alt="Architecture diagram of the MailShield Gmail security pipeline"
                className="w-full h-auto"
              />
            </div>
            <div className="max-w-[550px] relative z-10">
              <h3 className="text-[48px] font-normal text-[#2d2d2d] leading-[1.1] mb-6 tracking-tight">
                Production‑ready<br />Gmail security architecture
              </h3>
              <p className="text-[18px] text-[#4a4a4a] font-normal mb-4 leading-[1.6]">
                MailShield wires together Google OAuth2, the Gmail API, Gmail watch /
                Pub/Sub push notifications, and a cron‑based fallback auto‑labeler. Every
                new INBOX message is analyzed, scored, and labeled in seconds.
              </p>
              <p className="text-[15px] text-[#6b6b6b] font-normal mb-6 leading-[1.6]">
                – <strong>OAuth flow</strong> issues a project‑owned JWT tied to the Gmail
                address.<br />
                – <strong>Push handler</strong> consumes Pub/Sub notifications and uses{' '}
                <code>users.history.list</code> to find newly added messages.<br />
                – <strong>Cron worker</strong> sweeps recent emails as a safety net.<br />
                – <strong>Label helper</strong> ensures <code>PHISHING_RISK</code>,{' '}
                <code>SUSPICIOUS</code>, and <code>OK</code> labels exist per account.
              </p>
              <button className="bg-white text-[#2d2d2d] border border-gray-300 px-6 py-3 rounded text-[12px] font-bold tracking-[0.08em] uppercase shadow-sm hover:shadow-md transition-shadow">
                VIEW SYSTEM DIAGRAM
              </button>
              <div className="mt-12">
                <img src={bg3svg} alt="Decorative pattern" className="w-full max-w-[450px] opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </div>

   
      <div
        id="capabilities"
        className="relative overflow-hidden py-12"
        style={{ backgroundColor: '#f5f3f0' }}
      >
        <div className="max-w-[1000px] mx-auto px-8">
          <h3 className="text-[48px] font-normal text-[#2d2d2d] leading-[1.1] mb-12 tracking-tight">
            Core capabilities & header intelligence
          </h3>
          <div className="grid grid-cols-3 gap-5">
          
            <div
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              style={{ border: '6px solid #e8e5df' }}
            >
              <div className="p-5 pb-4 h-[260px] flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-[22px] font-normal text-[#2d2d2d] tracking-tight">
                    Header Analysis Engine
                  </h4>
                  <span className="text-[16px] text-gray-400">H</span>
                </div>
                <p className="text-[13px] text-[#6b6b6b] leading-[1.6] flex-1">
                  A transparent, rule‑based engine that inspects:
                  <br />– <strong>Authentication‑Results</strong> for{' '}
                  <strong>SPF=pass/fail</strong>, <strong>DKIM=pass/fail</strong>, and{' '}
                  <strong>DMARC=pass/fail</strong><br />– Suspicious subject keywords
                  (password, account, payment, verify, etc.)<br />– From / Reply‑To /
                  Return‑Path domain mismatches<br />– Excessive <code>Received</code>{' '}
                  hops and display‑name tricks.
                </p>
              </div>
              <div
                className="h-36 flex items-center justify-center rounded-b-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #e8956f 0%, #d97a52 50%, #cc6945 100%)'
                }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'overlay'
                  }}
                ></div>
                <h5 className="text-white text-[24px] font-bold tracking-wider relative z-10">
                  HEADER ENGINE
                </h5>
              </div>
            </div>

           
            <div
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              style={{ border: '6px solid #e8e5df' }}
            >
              <div className="p-5 pb-4 h-[260px] flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-[22px] font-normal text-[#2d2d2d] tracking-tight">
                    Real‑time inbox protection
                  </h4>
                  <span className="text-[16px] text-gray-400">P</span>
                </div>
                <p className="text-[13px] text-[#6b6b6b] leading-[1.6] flex-1">
                  Gmail <strong>watch</strong> + <strong>Pub/Sub</strong> push
                  notifications stream newly added INBOX messages directly to the backend.
                  Each message is fetched with <code>format=metadata</code>, headers are
                  scored, and labels such as <code>PHISHING_RISK</code>,{' '}
                  <code>SUSPICIOUS</code>, or <code>OK</code> are attached in real time.
                </p>
              </div>
              <div
                className="h-36 flex items-center justify-center rounded-b-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #f4a76a 0%, #e59455 50%, #d88448 100%)'
                }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'overlay'
                  }}
                ></div>
                <h5 className="text-white text-[24px] font-bold tracking-wider text-center leading-tight relative z-10">
                  REAL‑TIME<br />PROTECTION
                </h5>
              </div>
            </div>

           
            <div
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              style={{ border: '6px solid #e8e5df' }}
            >
              <div className="p-5 pb-4 h-[260px] flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-[22px] font-normal text-[#2d2d2d] tracking-tight">
                    Scheduled auto‑labeler
                  </h4>
                  <span className="text-[16px] text-gray-400">C</span>
                </div>
                <p className="text-[13px] text-[#6b6b6b] leading-[1.6] flex-1">
                  A <strong>node‑cron</strong> worker periodically scans recent INBOX
                  messages per user, making sure labels stay consistent even if push
                  notifications are delayed. A per‑user <code>processedIds</code> set keeps
                  the job idempotent and safe to run in production.
                </p>
              </div>
              <div
                className="h-36 flex items-center justify-center rounded-b-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #f2a263 0%, #e38e4e 50%, #d67d42 100%)'
                }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'overlay'
                  }}
                ></div>
                <h5 className="text-white text-[24px] font-bold tracking-wider relative z-10">
                  CRON FALLBACK
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

 
      <div
        id="security"
        className="relative overflow-hidden py-16"
        style={{ backgroundColor: '#f5f3f0' }}
      >
        <div className="max-w-[1200px] mx-auto px-8">
          <h3 className="text-[48px] font-normal text-[#2d2d2d] leading-[1.1] mb-12 text-center tracking-tight">
            An email security foundation you can trust
          </h3>
          <div className="grid grid-cols-3 gap-6">
          
            <div className="bg-[#ebe8e3] rounded-2xl p-8 relative overflow-hidden">
              <div
                className="absolute right-0 top-0 bottom-0 w-16 opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, #d4cfc7 10px, #d4cfc7 11px)`
                }}
              ></div>
              <div className="w-20 h-20 rounded-full bg-[#d4cfc7] flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h4 className="text-[28px] font-normal text-[#2d2d2d] mb-4 tracking-tight">
                Least‑privilege by design
              </h4>
              <p className="text-[15px] text-[#6b6b6b] leading-[1.7]">
                Uses Gmail <strong>read</strong> and <strong>modify</strong> scopes only.
                Focuses on headers and labels – message bodies remain in Gmail – reducing
                data exposure and making compliance and audits easier.
              </p>
            </div>

        
            <div className="bg-[#ebe8e3] rounded-2xl p-8 relative overflow-hidden">
              <div
                className="absolute right-0 top-0 bottom-0 w-16 opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, #d4cfc7 10px, #d4cfc7 11px)`
                }}
              ></div>
              <div className="w-20 h-20 rounded-full bg-[#d4cfc7] flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>
              <h4 className="text-[28px] font-normal text-[#2d2d2d] mb-4 tracking-tight">
                Transparent, explainable scores
              </h4>
              <p className="text-[15px] text-[#6b6b6b] leading-[1.7]">
                Each email gets a numeric score and a list of reasons – <strong>SPF fail</strong>,{' '}
                <strong>DKIM fail</strong>, <strong>DMARC fail</strong>, suspicious subject
                text, domain mismatches, many hops. This makes tuning rules and explaining
                decisions to security teams straightforward.
              </p>
            </div>

          
            <div className="bg-[#ebe8e3] rounded-2xl p-8 relative overflow-hidden">
              <div
                className="absolute right-0 top-0 bottom-0 w-16 opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, #d4cfc7 10px, #d4cfc7 11px)`
                }}
              ></div>
              <div className="w-20 h-20 rounded-full bg-[#d4cfc7] flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h4 className="text-[28px] font-normal text-[#2d2d2d] mb-4 tracking-tight">
                Extensible rules & labels
              </h4>
              <p className="text-[15px] text-[#6b6b6b] leading-[1.7]">
                Ships with <strong>PHISHING_RISK</strong>, <strong>SUSPICIOUS</strong>, and{' '}
                <strong>OK</strong> labels by default. The rules live in a single{' '}
                <code>headerAnalyzer</code> module, making it easy to add new industry
                checks and custom labels for your environment.
              </p>
            </div>
          </div>
        </div>
      </div>

  
      <div
        id="automation"
        className="relative overflow-hidden py-12"
        style={{ backgroundColor: '#f5f3f0' }}
      >
        <div className="max-w-[1200px] mx-auto px-8">
          <div
            className="bg-white rounded-3xl p-12 shadow-lg"
            style={{ border: '8px solid #e8e5df' }}
          >
            <p className="text-[#9b9b9b] text-[16px] font-normal mb-3 text-center tracking-wide">
              MailShield automation
            </p>
            <h2 className="text-[52px] font-normal text-[#2d2d2d] leading-[1.15] mb-12 text-center tracking-tight">
              Effortlessly deploy, monitor, and tune<br />automatic labeling for every mailbox
            </h2>
            <div className="flex items-start justify-between gap-12">
              <div className="flex-1 max-w-[450px] space-y-12">
                <div>
                  <h3 className="text-[32px] font-normal text-[#2d2d2d] mb-4 tracking-tight">
                    One pipeline, many accounts
                  </h3>
                  <p className="text-[16px] text-[#6b6b6b] leading-[1.7] mb-4">
                    Plug in multiple Gmail users through Google OAuth. MailShield keeps
                    tokens and <code>processedIds</code> per user, ensuring that every
                    mailbox is labeled exactly once per message and stays consistent over
                    time.
                  </p>
                </div>
                <div>
                  <h3 className="text-[32px] font-normal text-[#8b8b8b] mb-4 tracking-tight">
                    Push & cron working together
                  </h3>
                  <p className="text-[16px] text-[#6b6b6b] leading-[1.7]">
                    Pub/Sub push gives near real‑time reaction to new mail, while the cron
                    auto‑labeler sweeps the INBOX every few seconds. You get resilience,
                    observability, and reliability from day one.
                  </p>
                </div>
                <div>
                  <h3 className="text-[32px] font-normal text-[#8b8b8b] mb-4 tracking-tight">
                    Insights from every interaction
                  </h3>
                  <p className="text-[16px] text-[#6b6b6b] leading-[1.7]">
                    Use the live dashboard, <code>/emails/recent</code> endpoint, and debug
                    tools (<code>/emails/debug-profile</code>, <code>/emails/debug-list-labels</code>, etc.)
                    to understand which messages are being labeled and why.
                  </p>
                </div>
              </div>
              <div className="flex-1 max-w-[550px]">
                <img
                  src={bg4}
                  alt="Dashboard of MailShield showing email risk scores and labels"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="live-analysis"
        className="relative overflow-hidden py-12"
        style={{ backgroundColor: '#f5f3f0' }}
      >
        <div className="max-w-[1100px] mx-auto px-8">
          <h3 className="text-[36px] font-normal text-[#2d2d2d] leading-[1.1] mb-6 tracking-tight text-center">
            Live Gmail header analysis & labels
          </h3>
          <p className="text-[15px] text-[#6b6b6b] text-center mb-8 max-w-[800px] mx-auto leading-[1.6]">
            Connect your Gmail account, then use the live dashboard below to fetch recent
            INBOX messages, see how MailShield scores each one, and inspect SPF, DKIM,
            DMARC‑driven reasons, subject heuristics, and applied Gmail labels in real
            time.
          </p>

          <div className="bg-white rounded-3xl p-6 shadow-lg mb-6" style={{ border: '6px solid #e8e5df' }}>
            {!token ? (
              <div className="text-center">
                <p className="text-[14px] text-[#4a4a4a] mb-4">
                  To see the system in action, connect a Gmail account using Google OAuth.
                  We request only the minimal scopes needed to read headers and apply
                  labels.
                </p>
                <button
                  onClick={handleLogin}
                  className="bg-gradient-to-r from-[#c85940] to-[#d66645] text-white px-7 py-3 rounded text-[12px] font-bold tracking-[0.08em] uppercase shadow-md"
                >
                  LOGIN WITH GOOGLE<span className="ml-2 text-[10px]">✦</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-[14px] text-[#4a4a4a]">
                  Logged in with a Gmail account. New emails will be labeled automatically
                  via push + cron. Use <strong>Refresh</strong> to fetch the latest
                  analysis snapshot from the backend.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLogout}
                    className="bg-white text-[#4a4a4a] border border-gray-300 px-4 py-2 rounded text-[11px] font-bold tracking-[0.08em] uppercase shadow-sm"
                  >
                    LOGOUT
                  </button>
                  <button
                    onClick={() => handleRefresh(20)}
                    disabled={loading}
                    className="bg-gradient-to-r from-[#c85940] to-[#d66645] text-white px-5 py-2.5 rounded text-[11px] font-bold tracking-[0.08em] uppercase shadow-md disabled:opacity-60"
                  >
                    {loading ? 'LOADING…' : 'REFRESH RECENT EMAILS'}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <p className="mt-4 text-[13px] text-red-600">
                {error}
              </p>
            )}
          </div>

          {emails.length > 0 && (
            <div className="bg-white rounded-3xl p-6 shadow-lg" style={{ border: '6px solid #e8e5df' }}>
              <h4 className="text-[20px] font-normal text-[#2d2d2d] mb-4">
                Recent INBOX emails (analyzed by MailShield)
              </h4>
              <div className="overflow-x-auto">
                <table
                  className="min-w-full text-left text-[12px]"
                  cellPadding="6"
                  style={{ borderCollapse: 'collapse' }}
                >
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 pr-3 font-semibold text-[#4a4a4a]">Subject</th>
                      <th className="py-2 pr-3 font-semibold text-[#4a4a4a]">From</th>
                      <th className="py-2 pr-3 font-semibold text-[#4a4a4a]">Our Label</th>
                      <th className="py-2 pr-3 font-semibold text-[#4a4a4a]">Score</th>
                      <th className="py-2 pr-3 font-semibold text-[#4a4a4a]">Reasons</th>
                      <th className="py-2 pr-3 font-semibold text-[#4a4a4a]">Gmail Labels</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emails.map(email => {
                      const headers = {};
                      (email.headers || []).forEach(h => {
                        headers[h.name.toLowerCase()] = h.value;
                      });

                      return (
                        <tr key={email.id} className="border-b border-gray-100 align-top">
                          <td className="py-2 pr-3 text-[#2d2d2d]">
                            {headers['subject'] || <span className="text-gray-400 italic">No subject</span>}
                          </td>
                          <td className="py-2 pr-3 text-[#4a4a4a]">
                            {headers['from'] || <span className="text-gray-400 italic">Unknown</span>}
                          </td>
                          <td className="py-2 pr-3">
                            <span
                              className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase ${
                                email.analysis?.label === 'PHISHING_RISK'
                                  ? 'bg-red-100 text-red-700'
                                  : email.analysis?.label === 'SUSPICIOUS'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-700'
                              }`}
                            >
                              {email.analysis?.label || 'N/A'}
                            </span>
                          </td>
                          <td className="py-2 pr-3 text-[#4a4a4a]">
                            {email.analysis?.score ?? '-'}
                          </td>
                          <td className="py-2 pr-3 text-[#6b6b6b]">
                            {(email.analysis?.reasons || []).join(', ')}
                          </td>
                          <td className="py-2 pr-3 text-[#6b6b6b]">
                            {(email.gmailLabels || []).join(', ')}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {token && !loading && emails.length === 0 && !error && (
            <p className="mt-4 text-center text-[13px] text-[#6b6b6b]">
              No emails loaded yet. Click <strong>Refresh recent emails</strong> above to
              fetch the latest INBOX messages and see how they are labeled.
            </p>
          )}
        </div>
      </div>


      <footer className="relative bg-[#4a4a45] text-white overflow-hidden" id="about">
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <div className="grid grid-cols-4 gap-12">
            <div>
              <h2 className="text-[48px] font-normal mb-4 tracking-tight">MailShield</h2>
              <p className="text-[#c4b896] text-[16px] font-normal">
                Email security for modern teams
              </p>
              <button className="mt-12 bg-[#5a5a55] text-white px-6 py-3 rounded text-[11px] font-bold tracking-wide uppercase flex items-center hover:bg-[#6a6a65] transition-colors">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                EXPERIENCE MAILSHIELD
              </button>
            </div>
            <div>
              <h3 className="text-[14px] font-bold tracking-wider uppercase mb-6">PRODUCT</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#product"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    Gmail phishing labeling
                  </a>
                </li>
                <li>
                  <a
                    href="#capabilities"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    SPF/DKIM/DMARC rules
                  </a>
                </li>
                <li>
                  <a
                    href="#live-analysis"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    Live analysis dashboard
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[14px] font-bold tracking-wider uppercase mb-6">API</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#developers"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    Header analysis API
                  </a>
                </li>
                <li>
                  <a
                    href="#developers"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    Gmail labeling API
                  </a>
                </li>
                <li>
                  <a
                    href="#automation"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    Push & cron events
                  </a>
                </li>
                <li>
                  <a
                    href="#developers"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    Debug & admin tools
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[14px] font-bold tracking-wider uppercase mb-6">RESOURCES</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#architecture"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    Architecture docs
                  </a>
                </li>
                <li>
                  <a
                    href="#security"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    Security & privacy
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/your-org/your-repo"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    GitHub repository
                  </a>
                </li>
                <li>
                  <a
                    href="#live-analysis"
                    className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors"
                  >
                    Live demo
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-[#6a6a65] flex items-center justify-between">
            <div className="text-[#8a8a85] text-[12px]">
              <p>2026 MailShield (Demo email security project)</p>
              <p className="mt-1">All rights reserved.</p>
            </div>
            <div className="flex items-center gap-8">
              <a
                href="#security"
                className="text-[#8a8a85] text-[12px] hover:text-white transition-colors"
              >
                Terms of use
              </a>
              <a
                href="#security"
                className="text-[#8a8a85] text-[12px] hover:text-white transition-colors"
              >
                Privacy policy
              </a>
              <div className="flex items-center gap-4 ml-4">
                <a
                  href="https://www.linkedin.com"
                  className="text-[#8a8a85] hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://x.com"
                  className="text-[#8a8a85] hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  className="text-[#8a8a85] hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-40">
          <img src={bg4svg} alt="Decorative pattern" className="w-full h-full object-cover" />
        </div>
      </footer>
    </div>
  );
}*/

/*
import React, { useEffect, useState } from 'react';
import { setAuthToken, getAuthToken, fetchRecentEmails } from './api';

export default function App() {
  const [token, setToken] = useState(getAuthToken());
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('token');
    if (t) {
      setAuthToken(t);
      setToken(t);
      window.history.replaceState({}, '', window.location.pathname);
    } else if (getAuthToken()) {
      setAuthToken(getAuthToken());
    }
  }, []);

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  const handleLogout = () => {
    setAuthToken(null);
    setToken(null);
    setEmails([]);
  };

  const handleRefresh = async (limit = 20) => {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const data = await fetchRecentEmails(limit);
      setEmails(data.emails || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load emails. Please ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const scrollToDashboard = () => {
    const el = document.getElementById('dashboard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGetStarted = () => {
    if (!token) {
      handleLogin();
    } else {
      handleRefresh();
      scrollToDashboard();
    }
  };

  const featureDetails = {
    authentication: {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Authentication Analysis',
      gradient: 'from-cyan-400 to-blue-500',
      details: {
        overview: 'MailShield performs comprehensive email authentication analysis using industry-standard protocols to verify sender legitimacy.',
        features: [
          {
            name: 'SPF Validation',
            description: 'Sender Policy Framework checks verify that emails come from authorized mail servers for the sending domain.',
            icon: '✓'
          },
          {
            name: 'DKIM Verification',
            description: 'DomainKeys Identified Mail ensures message integrity by validating cryptographic signatures in email headers.',
            icon: '🔑'
          },
          {
            name: 'DMARC Compliance',
            description: 'Domain-based Message Authentication checks sender domain policies and alignment between SPF and DKIM.',
            icon: '🛡️'
          }
        ],
        benefits: [
          'Detects spoofed sender addresses',
          'Prevents domain impersonation attacks',
          'Validates email authenticity in real-time',
          'Provides detailed authentication reports'
        ]
      }
    },
    realtime: {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Real-Time Protection',
      gradient: 'from-blue-400 to-indigo-500',
      details: {
        overview: 'Instant email analysis and labeling powered by Gmail Push Notifications for immediate threat detection.',
        features: [
          {
            name: 'Push Notifications',
            description: 'Gmail Pub/Sub integration triggers instant analysis the moment a new email arrives in your inbox.',
            icon: '📲'
          },
          {
            name: 'Automatic Labeling',
            description: 'Emails are automatically tagged with security labels (Phishing Risk, Suspicious, or Ok) based on analysis.',
            icon: '🏷️'
          },
          {
            name: 'Zero Delay',
            description: 'Analysis completes in milliseconds, ensuring you see security warnings before you open suspicious emails.',
            icon: '⚡'
          }
        ],
        benefits: [
          'No manual scanning required',
          'Immediate threat identification',
          'Reduces exposure to phishing attacks',
          'Works 24/7 in the background'
        ]
      }
    },
    analytics: {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Smart Analytics',
      gradient: 'from-indigo-400 to-purple-500',
      details: {
        overview: 'Advanced scoring system with full transparency - understand exactly why each email received its security rating.',
        features: [
          {
            name: 'Multi-Factor Scoring',
            description: 'Combines SPF, DKIM, DMARC results with sender reputation, domain age, and content analysis for accurate ratings.',
            icon: '📊'
          },
          {
            name: 'Detailed Reasoning',
            description: 'Every security label includes specific reasons explaining why the email was flagged or approved.',
            icon: '💡'
          },
          {
            name: 'Historical Tracking',
            description: 'View trends and patterns in your email security over time to identify recurring threats.',
            icon: '📈'
          }
        ],
        benefits: [
          'Understand security decisions',
          'Learn to identify phishing patterns',
          'Customize sensitivity thresholds',
          'Export detailed security reports'
        ]
      }
    },
    oauth: {
      icon: '🔐',
      title: 'OAuth2 Security',
      gradient: 'from-blue-500 to-cyan-500',
      details: {
        overview: 'Industry-standard OAuth2 authentication ensures your Gmail credentials remain secure and private.',
        features: [
          {
            name: 'Minimal Permissions',
            description: 'Only requests access to read email headers and manage labels - never accesses email content or password.',
            icon: '🔒'
          },
          {
            name: 'Google-Verified',
            description: 'Authentication flow is managed entirely by Google, ensuring enterprise-grade security standards.',
            icon: '✓'
          },
          {
            name: 'Revocable Access',
            description: 'You can revoke MailShield access anytime from your Google Account settings with one click.',
            icon: '🚫'
          }
        ],
        benefits: [
          'No password sharing required',
          'Encrypted token-based authentication',
          'Full control over permissions',
          'Google security standards'
        ]
      }
    },
    realtimeAnalysis: {
      icon: '⚡',
      title: 'Real-Time Analysis',
      gradient: 'from-yellow-400 to-orange-500',
      details: {
        overview: 'Lightning-fast email processing powered by Gmail Push Notifications for instantaneous security alerts.',
        features: [
          {
            name: 'Instant Labeling',
            description: 'Emails are labeled the moment they arrive, before they appear in your inbox, providing immediate awareness.',
            icon: '🏷️'
          },
          {
            name: 'Background Processing',
            description: 'Analysis runs automatically without any user interaction, ensuring continuous protection.',
            icon: '🔄'
          },
          {
            name: 'Smart Notifications',
            description: 'Optional alerts for high-risk emails so you never miss a critical security warning.',
            icon: '🔔'
          }
        ],
        benefits: [
          'Proactive threat detection',
          'Seamless user experience',
          'No performance impact',
          'Always-on protection'
        ]
      }
    },
    scoring: {
      icon: '📊',
      title: 'Transparent Scoring',
      gradient: 'from-purple-400 to-pink-500',
      details: {
        overview: 'Clear, explainable security scores with detailed breakdowns of every factor influencing the decision.',
        features: [
          {
            name: 'Reason Tracking',
            description: 'Each security label includes a list of specific reasons explaining the decision (e.g., "SPF failed", "Suspicious domain").',
            icon: '📝'
          },
          {
            name: 'Score Breakdown',
            description: 'Numerical scores show exactly how close an email was to different security thresholds.',
            icon: '🎯'
          },
          {
            name: 'Learning Mode',
            description: 'Review past decisions to understand phishing patterns and improve your security awareness.',
            icon: '🎓'
          }
        ],
        benefits: [
          'No "black box" decisions',
          'Educational insights',
          'Build security knowledge',
          'Audit trail for compliance'
        ]
      }
    }
  };

  return (
    <div className="min-h-screen relative" style={{
      background: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%)'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Outfit', sans-serif;
        }
        
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(3deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-float-slow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-modal-in {
          animation: modalFadeIn 0.3s ease-out forwards;
        }
        
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        
        .gradient-text {
          background: linear-gradient(120deg, #0ea5e9 0%, #3b82f6 50%, #6366f1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glass {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 24px rgba(14, 165, 233, 0.06);
        }
        
        .glow-soft {
          box-shadow: 0 0 60px rgba(14, 165, 233, 0.12);
        }
        
        .btn-primary {
          background: linear-gradient(120deg, #0ea5e9 0%, #3b82f6 100%);
          box-shadow: 0 4px 20px rgba(14, 165, 233, 0.25);
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
          box-shadow: 0 6px 30px rgba(14, 165, 233, 0.35);
          transform: translateY(-1px);
        }

        .feature-card {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
        }
      `}</style>

      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-200/25 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-blue-200/25 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-200/15 rounded-full blur-3xl"></div>
      </div>

    
      <nav className="fixed top-4 left-0 right-0 z-50 px-6">
        <div className="max-w-[95%] mx-auto glass rounded-2xl px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden" style={{
                background: 'linear-gradient(120deg, #0ea5e9 0%, #3b82f6 100%)'
              }}>
                <div className="absolute inset-0 shimmer"></div>
                <svg className="w-5 h-5 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-lg font-bold gradient-text">MailShield</h1>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#home" className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">
                Home
              </a>
              <a href="#dashboard" className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">
                Dashboard
              </a>
              <button
                onClick={handleGetStarted}
                className="btn-primary text-white px-5 py-2 rounded-xl font-semibold text-sm"
              >
                {token ? 'View Emails' : 'Get Started'}
              </button>
            </div>
          </div>
        </div>
      </nav>

     
      {selectedFeature && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}
          onClick={() => setSelectedFeature(null)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
          
            <div className={`p-8 bg-gradient-to-br ${selectedFeature.gradient} text-white relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              </div>
              <div className="relative z-10">
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="absolute top-0 right-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
                    {typeof selectedFeature.icon === 'string' ? selectedFeature.icon : selectedFeature.icon}
                  </div>
                  <h2 className="text-3xl font-bold">{selectedFeature.title}</h2>
                </div>
                <p className="text-white/90 text-base leading-relaxed">
                  {selectedFeature.details.overview}
                </p>
              </div>
            </div>

           
            <div className="p-8">
             
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
                  Key Features
                </h3>
                <div className="space-y-4">
                  {selectedFeature.details.features.map((feature, index) => (
                    <div key={index} className="glass p-5 rounded-xl hover:shadow-lg transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center flex-shrink-0 text-xl">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">{feature.name}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

           
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
                  Benefits
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedFeature.details.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

          
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                <p className="text-gray-700 text-sm leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Ready to experience {selectedFeature.title.toLowerCase()}? Connect your Gmail account to get started.
                </p>
                <button
                  onClick={() => {
                    setSelectedFeature(null);
                    if (!token) {
                      handleLogin();
                    } else {
                      scrollToDashboard();
                    }
                  }}
                  className="btn-primary text-white px-6 py-3 rounded-xl font-semibold text-sm w-full"
                >
                  {token ? 'Go to Dashboard' : 'Connect Gmail Account'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-16 px-6 relative">
        <div className="w-full max-w-[95%] mx-auto text-center relative z-10">
          <div className="mb-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold" style={{
              background: 'linear-gradient(120deg, rgba(14, 165, 233, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)',
              border: '1px solid rgba(14, 165, 233, 0.15)',
              color: '#0ea5e9'
            }}>
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
              Secure Email Protection
            </span>
          </div>
          
          <h1 
            className="text-5xl font-bold mb-6 leading-tight animate-fade-in-up"
            style={{ 
              animationDelay: '0.1s',
              letterSpacing: '-0.02em'
            }}
          >
            <span className="gradient-text">
              Email Header Analysis Tool
            </span>
            <br />
            <span className="text-gray-800">
              for Cyber Threat Intelligence
            </span>
          </h1>

          <p className="text-base text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ 
            animationDelay: '0.2s',
            fontFamily: 'Inter, sans-serif'
          }}>
            MailShield connects to Gmail via OAuth2 and analyzes every email using{' '}
            <span className="font-semibold text-blue-600">SPF</span>,{' '}
            <span className="font-semibold text-blue-600">DKIM</span>, and{' '}
            <span className="font-semibold text-blue-600">DMARC</span> protocols. 
            Automatically labels emails as{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
              Phishing Risk
            </span>{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-yellow-50 text-yellow-700 border border-yellow-100">
              Suspicious
            </span>{' '}
            or{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-green-50 text-green-600 border border-green-100">
              Ok
            </span>
          </p>

          <div className="flex items-center justify-center gap-3 mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={handleGetStarted}
              className="btn-primary text-white px-8 py-3 rounded-xl font-semibold text-sm"
            >
              Start Live Analysis
            </button>
            <button
              onClick={scrollToDashboard}
              className="glass text-gray-700 px-8 py-3 rounded-xl font-semibold text-sm hover:bg-white transition-all"
            >
              View Dashboard
            </button>
          </div>

        
          <div className="grid grid-cols-3 gap-6 max-w-[90%] mx-auto">
            {[
              {
                key: 'authentication',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Authentication Analysis',
                description: 'Real-time SPF, DKIM, and DMARC header validation',
                gradient: 'from-cyan-400 to-blue-500'
              },
              {
                key: 'realtime',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Real-Time Protection',
                description: 'Instant labeling with push notifications',
                gradient: 'from-blue-400 to-indigo-500'
              },
              {
                key: 'analytics',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Smart Analytics',
                description: 'Transparent scoring with detailed insights',
                gradient: 'from-indigo-400 to-purple-500'
              }
            ].map((feature, index) => (
              <div
                key={index}
                onClick={() => setSelectedFeature(featureDetails[feature.key])}
                className="feature-card glass p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${feature.gradient} text-white mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {feature.description}
                </p>
                <div className="flex items-center justify-center text-blue-600 text-xs font-semibold group-hover:gap-2 gap-1 transition-all">
                  Learn More
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="dashboard" className="min-h-screen py-16 px-6 relative">
        <div className="w-full max-w-[95%] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
              <span className="gradient-text">Live Email Analysis</span>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Connect your Gmail account to experience real-time phishing detection with automatic security labeling
            </p>
          </div>

          <div className="glass rounded-2xl p-8 mb-8 glow-soft">
            {!token ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto bg-gradient-to-br from-cyan-400 to-blue-500 text-white">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Connect Your Gmail Account
                </h3>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Securely connect via Google OAuth to enable real-time email security analysis.
                  We only request minimal permissions to read headers and apply labels.
                </p>
                <button
                  onClick={handleLogin}
                  className="btn-primary text-white px-10 py-3 rounded-xl font-semibold text-base"
                >
                  Connect with Google
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Connected</p>
                      <p className="text-base font-bold text-gray-800">Gmail Account Active</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleLogout}
                      className="glass text-gray-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white transition-all"
                    >
                      Disconnect
                    </button>
                    <button
                      onClick={() => handleRefresh(20)}
                      disabled={loading}
                      className="btn-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm disabled:opacity-50"
                    >
                      {loading ? 'Loading...' : 'Refresh Emails'}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-xl mb-6">
                    <p className="text-red-700 font-semibold text-sm">{error}</p>
                  </div>
                )}

                {emails.length > 0 ? (
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <thead style={{ background: 'linear-gradient(120deg, #0ea5e9 0%, #3b82f6 100%)' }}>
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-white/90">
                              Subject
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-white/90">
                              From
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-white/90">
                              Security Label
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-white/90">
                              Score
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-white/90">
                              Analysis
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {emails.map((email) => {
                            const headers = {};
                            (email.headers || []).forEach(h => {
                              headers[h.name.toLowerCase()] = h.value;
                            });

                            return (
                              <tr key={email.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all">
                                <td className="px-6 py-4">
                                  <p className="font-semibold text-gray-800 truncate max-w-md text-sm">
                                    {headers['subject'] || <span className="text-gray-400 italic">No subject</span>}
                                  </p>
                                </td>
                                <td className="px-6 py-4">
                                  <p className="text-gray-600 text-sm truncate max-w-xs">
                                    {headers['from'] || <span className="text-gray-400 italic">Unknown</span>}
                                  </p>
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold ${
                                    email.analysis?.label === 'PHISHING_RISK'
                                      ? 'bg-red-50 text-red-600 border border-red-100'
                                      : email.analysis?.label === 'SUSPICIOUS'
                                      ? 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                                      : 'bg-green-50 text-green-600 border border-green-100'
                                  }`}>
                                    {email.analysis?.label || 'N/A'}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="font-bold text-blue-600 text-base">
                                    {email.analysis?.score ?? '-'}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <p className="text-xs text-gray-600 max-w-xs line-clamp-2 leading-relaxed">
                                    {(email.analysis?.reasons || []).join(', ') || 'No issues detected'}
                                  </p>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : !loading && (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-semibold text-base mb-1">No emails loaded yet</p>
                    <p className="text-gray-500 text-sm">Click "Refresh Emails" to fetch your recent inbox messages</p>
                  </div>
                )}

                {loading && (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-700 font-semibold text-base">Loading your emails...</p>
                  </div>
                )}
              </div>
            )}
          </div>

        
          <div className="grid grid-cols-3 gap-5">
            {[
              { key: 'oauth', emoji: '🔐', title: 'OAuth2 Security', desc: 'Secure authentication with minimal Gmail permissions' },
              { key: 'realtimeAnalysis', emoji: '⚡', title: 'Real-Time Analysis', desc: 'Push notifications ensure instant email labeling' },
              { key: 'scoring', emoji: '📊', title: 'Transparent Scoring', desc: 'Every decision explained with detailed reasons' }
            ].map((item, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedFeature(featureDetails[item.key])}
                className="feature-card glass p-5 rounded-2xl hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center">
                    <span className="text-xl">{item.emoji}</span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {item.desc}
                </p>
                <div className="flex items-center text-blue-600 text-xs font-semibold gap-1">
                  Learn More
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden" style={{
        background: 'linear-gradient(120deg, #0c4a6e 0%, #0e7490 50%, #0891b2 100%)'
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="w-full max-w-[95%] mx-auto px-6 py-12 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">MailShield</h3>
                <p className="text-cyan-100 text-xs">Email Security Platform</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-cyan-100 text-sm">© 2026 MailShield</p>
              <p className="text-cyan-200 text-xs mt-0.5">Advanced Phishing Protection</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}*/

import React, { useEffect, useState } from 'react';
import { setAuthToken, getAuthToken, fetchRecentEmails, ensureLabels, API } from './api';

export default function App() {
  const [token, setToken] = useState(getAuthToken());
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [labelStatus, setLabelStatus] = useState(null);
  
  // Calendar Modal state
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [historicalEmails, setHistoricalEmails] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('token');
    if (t) {
      setAuthToken(t);
      setToken(t);
      window.history.replaceState({}, '', window.location.pathname);
    } else if (getAuthToken()) {
      setAuthToken(getAuthToken());
    }
  }, []);

  // AUTO-CREATE LABELS WHEN USER LOGS IN
  useEffect(() => {
    if (token) {
      console.log('[App] User logged in, ensuring labels exist...');
      ensureLabels()
        .then(result => {
          console.log('[App] ✓ Labels verified:', result);
          setLabelStatus({ success: true, message: 'Labels ready' });
        })
        .catch(err => {
          console.warn('[App] Label creation warning:', err);
          setLabelStatus({ success: false, message: 'Label verification failed' });
        });
    }
  }, [token]);

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  const handleLogout = () => {
    setAuthToken(null);
    setToken(null);
    setEmails([]);
    setLabelStatus(null);
    setStartDate('');
    setEndDate('');
    setHistoricalEmails([]);
    setShowCalendarModal(false);
  };

  const handleRefresh = async (limit = 20) => {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      // First ensure labels exist (will create if missing)
      console.log('[App] Ensuring labels exist before fetching emails...');
      try {
        const labelResult = await ensureLabels();
        console.log('[App] ✓ Labels verified:', labelResult);
        setLabelStatus({ success: true, message: 'Labels verified' });
      } catch (labelErr) {
        console.warn('[App] Label creation warning:', labelErr);
      }

      // Fetch RECENT emails only (no date filter for main table)
      const response = await API.get(`/api/emails/recent?limit=${limit}`);
      const data = response.data;
      
      setEmails(data.emails || []);
      
      if (data.labelsVerified) {
        setLabelStatus({ success: true, message: 'All labels active' });
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load emails. Please ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchHistoricalInModal = async () => {
    if (!token) return;
    if (!startDate && !endDate) {
      alert('Please select at least one date (From or To)');
      return;
    }

    setLoading(true);
    try {
      let url = `/api/emails/recent?limit=50`;
      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;

      const response = await API.get(url);
      setHistoricalEmails(response.data.emails || []);
    } catch (err) {
      console.error(err);
      alert('Failed to search historical emails');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLabels = async () => {
    try {
      setLoading(true);
      const result = await ensureLabels();
      setLabelStatus({ success: true, message: 'Labels created!' });
      alert('Labels created successfully!\n\n' + 
        `✓ OK: ${result.labels.ok.id}\n` +
        `✓ SUSPICIOUS: ${result.labels.suspicious.id}\n` +
        `✓ PHISHING_RISK: ${result.labels.phishing.id}`
      );
    } catch (err) {
      setLabelStatus({ success: false, message: 'Failed to create labels' });
      alert('Failed to create labels: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const scrollToDashboard = () => {
    const el = document.getElementById('dashboard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGetStarted = () => {
    if (!token) {
      handleLogin();
    } else {
      handleRefresh();
      scrollToDashboard();
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Render email table row
  const renderEmailRow = (email) => {
    const headers = {};
    (email.headers || []).forEach(h => {
      headers[h.name.toLowerCase()] = h.value;
    });

    return (
      <tr key={email.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all">
        <td className="px-6 py-4">
          <p className="font-semibold text-gray-800 truncate max-w-md text-sm">
            {headers['subject'] || <span className="text-gray-400 italic">No subject</span>}
          </p>
        </td>
        <td className="px-6 py-4">
          <p className="text-gray-600 text-sm truncate max-w-xs">
            {headers['from'] || <span className="text-gray-400 italic">Unknown</span>}
          </p>
        </td>
        <td className="px-6 py-4">
          {email.analysis?.label ? (
            <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold ${
              email.analysis.label === 'PHISHING_RISK'
                ? 'bg-red-50 text-red-600 border border-red-100'
                : email.analysis.label === 'SUSPICIOUS'
                ? 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                : 'bg-green-50 text-green-600 border border-green-100'
            }`}>
              {email.analysis.label === 'PHISHING_RISK' ? 'PHISHING RISK' :
               email.analysis.label === 'SUSPICIOUS' ? 'SUSPICIOUS' :
               'OK'}
            </span>
          ) : (
            <span className="text-gray-400 text-xs italic">Not analyzed</span>
          )}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-blue-600 text-base">
              {email.analysis?.score ?? '-'}
            </span>
            <span className="text-xs text-gray-500">
              ({email.analysis?.confidence ?? '-'}%)
            </span>
          </div>
        </td>
        <td className="px-6 py-4">
          {email.analysis?.reasons && email.analysis.reasons.length > 0 ? (
            <div className="space-y-1">
              {email.analysis.reasons.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 text-xs mt-0.5">•</span>
                  <span className="text-xs text-gray-700 leading-relaxed">
                    {reason}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-xs text-green-600 italic">All checks passed</span>
          )}
        </td>
      </tr>
    );
  };

  const featureDetails = {
    authentication: {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Authentication Analysis',
      gradient: 'from-cyan-400 to-blue-500',
      details: {
        overview: 'MailShield performs comprehensive email authentication analysis using industry-standard protocols to verify sender legitimacy.',
        features: [
          {
            name: 'SPF Validation',
            description: 'Sender Policy Framework checks verify that emails come from authorized mail servers for the sending domain.',
            icon: '✓'
          },
          {
            name: 'DKIM Verification',
            description: 'DomainKeys Identified Mail ensures message integrity by validating cryptographic signatures in email headers.',
            icon: '🔑'
          },
          {
            name: 'DMARC Compliance',
            description: 'Domain-based Message Authentication checks sender domain policies and alignment between SPF and DKIM.',
            icon: '🛡️'
          }
        ],
        benefits: [
          'Detects spoofed sender addresses',
          'Prevents domain impersonation attacks',
          'Validates email authenticity in real-time',
          'Provides detailed authentication reports'
        ]
      }
    },
    realtime: {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Real-Time Protection',
      gradient: 'from-blue-400 to-indigo-500',
      details: {
        overview: 'Instant email analysis and labeling powered by Gmail Push Notifications for immediate threat detection.',
        features: [
          {
            name: 'Push Notifications',
            description: 'Gmail Pub/Sub integration triggers instant analysis the moment a new email arrives in your inbox.',
            icon: '📲'
          },
          {
            name: 'Automatic Labeling',
            description: 'Emails are automatically tagged with security labels (Phishing Risk, Suspicious, or Ok) based on analysis.',
            icon: '🏷️'
          },
          {
            name: 'Zero Delay',
            description: 'Analysis completes in milliseconds, ensuring you see security warnings before you open suspicious emails.',
            icon: '⚡'
          }
        ],
        benefits: [
          'No manual scanning required',
          'Immediate threat identification',
          'Reduces exposure to phishing attacks',
          'Works 24/7 in the background'
        ]
      }
    },
    analytics: {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Smart Analytics',
      gradient: 'from-indigo-400 to-purple-500',
      details: {
        overview: 'Advanced scoring system with full transparency - understand exactly why each email received its security rating.',
        features: [
          {
            name: 'Multi-Factor Scoring',
            description: 'Combines SPF, DKIM, DMARC results with sender reputation, domain age, and content analysis for accurate ratings.',
            icon: '📊'
          },
          {
            name: 'Detailed Reasoning',
            description: 'Every security label includes specific reasons explaining why the email was flagged or approved.',
            icon: '💡'
          },
          {
            name: 'Historical Tracking',
            description: 'View trends and patterns in your email security over time to identify recurring threats.',
            icon: '📈'
          }
        ],
        benefits: [
          'Understand security decisions',
          'Learn to identify phishing patterns',
          'Customize sensitivity thresholds',
          'Export detailed security reports'
        ]
      }
    },
    oauth: {
      icon: '🔐',
      title: 'OAuth2 Security',
      gradient: 'from-blue-500 to-cyan-500',
      details: {
        overview: 'Industry-standard OAuth2 authentication ensures your Gmail credentials remain secure and private.',
        features: [
          {
            name: 'Minimal Permissions',
            description: 'Only requests access to read email headers and manage labels - never accesses email content or password.',
            icon: '🔒'
          },
          {
            name: 'Google-Verified',
            description: 'Authentication flow is managed entirely by Google, ensuring enterprise-grade security standards.',
            icon: '✓'
          },
          {
            name: 'Revocable Access',
            description: 'You can revoke MailShield access anytime from your Google Account settings with one click.',
            icon: '🚫'
          }
        ],
        benefits: [
          'No password sharing required',
          'Encrypted token-based authentication',
          'Full control over permissions',
          'Google security standards'
        ]
      }
    },
    realtimeAnalysis: {
      icon: '⚡',
      title: 'Real-Time Analysis',
      gradient: 'from-yellow-400 to-orange-500',
      details: {
        overview: 'Lightning-fast email processing powered by Gmail Push Notifications for instantaneous security alerts.',
        features: [
          {
            name: 'Instant Labeling',
            description: 'Emails are labeled the moment they arrive, before they appear in your inbox, providing immediate awareness.',
            icon: '🏷️'
          },
          {
            name: 'Background Processing',
            description: 'Analysis runs automatically without any user interaction, ensuring continuous protection.',
            icon: '🔄'
          },
          {
            name: 'Smart Notifications',
            description: 'Optional alerts for high-risk emails so you never miss a critical security warning.',
            icon: '🔔'
          }
        ],
        benefits: [
          'Proactive threat detection',
          'Seamless user experience',
          'No performance impact',
          'Always-on protection'
        ]
      }
    },
    scoring: {
      icon: '📊',
      title: 'Transparent Scoring',
      gradient: 'from-purple-400 to-pink-500',
      details: {
        overview: 'Clear, explainable security scores with detailed breakdowns of every factor influencing the decision.',
        features: [
          {
            name: 'Reason Tracking',
            description: 'Each security label includes a list of specific reasons explaining the decision (e.g., "SPF failed", "Suspicious domain").',
            icon: '📝'
          },
          {
            name: 'Score Breakdown',
            description: 'Numerical scores show exactly how close an email was to different security thresholds.',
            icon: '🎯'
          },
          {
            name: 'Learning Mode',
            description: 'Review past decisions to understand phishing patterns and improve your security awareness.',
            icon: '🎓'
          }
        ],
        benefits: [
          'No "black box" decisions',
          'Educational insights',
          'Build security knowledge',
          'Audit trail for compliance'
        ]
      }
    }
  };

  return (
    <div className="min-h-screen relative" style={{
      background: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%)'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Outfit', sans-serif;
        }
        
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(3deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-float-slow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-modal-in {
          animation: modalFadeIn 0.3s ease-out forwards;
        }
        
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        
        .gradient-text {
          background: linear-gradient(120deg, #0ea5e9 0%, #3b82f6 50%, #6366f1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glass {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 24px rgba(14, 165, 233, 0.06);
        }
        
        .glow-soft {
          box-shadow: 0 0 60px rgba(14, 165, 233, 0.12);
        }
        
        .btn-primary {
          background: linear-gradient(120deg, #0ea5e9 0%, #3b82f6 100%);
          box-shadow: 0 4px 20px rgba(14, 165, 233, 0.25);
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
          box-shadow: 0 6px 30px rgba(14, 165, 233, 0.35);
          transform: translateY(-1px);
        }

        .feature-card {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
        }
      `}</style>

      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-200/25 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-blue-200/25 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-200/15 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-4 left-0 right-0 z-50 px-6">
        <div className="max-w-[95%] mx-auto glass rounded-2xl px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden" style={{
                background: 'linear-gradient(120deg, #0ea5e9 0%, #3b82f6 100%)'
              }}>
                <div className="absolute inset-0 shimmer"></div>
                <svg className="w-5 h-5 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-lg font-bold gradient-text">MailShield</h1>
              {labelStatus && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  labelStatus.success 
                    ? 'bg-green-50 text-green-600 border border-green-100' 
                    : 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                }`}>
                  {labelStatus.message}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#home" className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">
                Home
              </a>
              <a href="#dashboard" className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">
                Dashboard
              </a>
              <button
                onClick={handleGetStarted}
                className="btn-primary text-white px-5 py-2 rounded-xl font-semibold text-sm"
              >
                {token ? 'View Emails' : 'Get Started'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Calendar Modal */}
      {showCalendarModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowCalendarModal(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h2 className="text-2xl font-bold">Check Previous Emails</h2>
                </div>
                <button
                  onClick={() => setShowCalendarModal(false)}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Date Picker */}
            <div className="p-6 bg-gray-50 border-b">
              <p className="text-sm text-gray-600 mb-4">Select a date range to analyze historical emails</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">From Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">To Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>
              <button
                onClick={handleSearchHistoricalInModal}
                disabled={loading}
                className="btn-primary text-white px-6 py-2 rounded-lg font-semibold text-sm disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search Emails'}
              </button>
            </div>

            {/* Results Table */}
            <div className="p-6">
              {loading ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-700 font-semibold text-base">Searching emails...</p>
                </div>
              ) : historicalEmails.length > 0 ? (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <thead style={{ background: 'linear-gradient(120deg, #0ea5e9 0%, #3b82f6 100%)' }}>
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-white/90">Subject</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-white/90">From</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-white/90">Security Label</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-white/90">Score</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-white/90 w-64">Why / Reasons</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {historicalEmails.map(renderEmailRow)}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500 text-sm">Select dates and click "Search Emails" to view historical emails</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Feature Modal */}
      {selectedFeature && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}
          onClick={() => setSelectedFeature(null)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`p-8 bg-gradient-to-br ${selectedFeature.gradient} text-white relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              </div>
              <div className="relative z-10">
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="absolute top-0 right-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
                    {typeof selectedFeature.icon === 'string' ? selectedFeature.icon : selectedFeature.icon}
                  </div>
                  <h2 className="text-3xl font-bold">{selectedFeature.title}</h2>
                </div>
                <p className="text-white/90 text-base leading-relaxed">
                  {selectedFeature.details.overview}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Features Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
                  Key Features
                </h3>
                <div className="space-y-4">
                  {selectedFeature.details.features.map((feature, index) => (
                    <div key={index} className="glass p-5 rounded-xl hover:shadow-lg transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center flex-shrink-0 text-xl">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">{feature.name}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
                  Benefits
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedFeature.details.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                <p className="text-gray-700 text-sm leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Ready to experience {selectedFeature.title.toLowerCase()}? Connect your Gmail account to get started.
                </p>
                <button
                  onClick={() => {
                    setSelectedFeature(null);
                    if (!token) {
                      handleLogin();
                    } else {
                      scrollToDashboard();
                    }
                  }}
                  className="btn-primary text-white px-6 py-3 rounded-xl font-semibold text-sm w-full"
                >
                  {token ? 'Go to Dashboard' : 'Connect Gmail Account'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-16 px-6 relative">
        <div className="w-full max-w-[95%] mx-auto text-center relative z-10">
          <div className="mb-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold" style={{
              background: 'linear-gradient(120deg, rgba(14, 165, 233, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)',
              border: '1px solid rgba(14, 165, 233, 0.15)',
              color: '#0ea5e9'
            }}>
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
              Secure Email Protection
            </span>
          </div>
          
          <h1 
            className="text-5xl font-bold mb-6 leading-tight animate-fade-in-up"
            style={{ 
              animationDelay: '0.1s',
              letterSpacing: '-0.02em'
            }}
          >
            <span className="gradient-text">
              Email Header Analysis Tool
            </span>
            <br />
            <span className="text-gray-800">
              for Cyber Threat Intelligence
            </span>
          </h1>

          <p className="text-base text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ 
            animationDelay: '0.2s',
            fontFamily: 'Inter, sans-serif'
          }}>
            MailShield connects to Gmail via OAuth2 and analyzes every email using{' '}
            <span className="font-semibold text-blue-600">SPF</span>,{' '}
            <span className="font-semibold text-blue-600">DKIM</span>, and{' '}
            <span className="font-semibold text-blue-600">DMARC</span> protocols. 
            Automatically labels emails as{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
              Phishing Risk
            </span>{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-yellow-50 text-yellow-700 border border-yellow-100">
              Suspicious
            </span>{' '}
            or{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-green-50 text-green-600 border border-green-100">
              Ok
            </span>
          </p>

          <div className="flex items-center justify-center gap-3 mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={handleGetStarted}
              className="btn-primary text-white px-8 py-3 rounded-xl font-semibold text-sm"
            >
              Start Live Analysis
            </button>
            <button
              onClick={scrollToDashboard}
              className="glass text-gray-700 px-8 py-3 rounded-xl font-semibold text-sm hover:bg-white transition-all"
            >
              View Dashboard
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-3 gap-6 max-w-[90%] mx-auto">
            {[
              {
                key: 'authentication',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Authentication Analysis',
                description: 'Real-time SPF, DKIM, and DMARC header validation',
                gradient: 'from-cyan-400 to-blue-500'
              },
              {
                key: 'realtime',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Real-Time Protection',
                description: 'Instant labeling with push notifications',
                gradient: 'from-blue-400 to-indigo-500'
              },
              {
                key: 'analytics',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Smart Analytics',
                description: 'Transparent scoring with detailed insights',
                gradient: 'from-indigo-400 to-purple-500'
              }
            ].map((feature, index) => (
              <div
                key={index}
                onClick={() => setSelectedFeature(featureDetails[feature.key])}
                className="feature-card glass p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${feature.gradient} text-white mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {feature.description}
                </p>
                <div className="flex items-center justify-center text-blue-600 text-xs font-semibold group-hover:gap-2 gap-1 transition-all">
                  Learn More
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard" className="min-h-screen py-16 px-6 relative">
        <div className="w-full max-w-[95%] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
              <span className="gradient-text">Live Email Analysis</span>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Connect your Gmail account to experience real-time phishing detection with automatic security labeling
            </p>
          </div>

          {/* Connection Card */}
          <div className="glass rounded-2xl p-8 mb-8 glow-soft">
            {!token ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto bg-gradient-to-br from-cyan-400 to-blue-500 text-white">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Connect Your Gmail Account
                </h3>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Securely connect via Google OAuth to enable real-time email security analysis.
                  We only request minimal permissions to read headers and apply labels.
                </p>
                <button
                  onClick={handleLogin}
                  className="btn-primary text-white px-10 py-3 rounded-xl font-semibold text-base"
                >
                  Connect with Google
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Connected</p>
                      <p className="text-base font-bold text-gray-800">Gmail Account Active</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowCalendarModal(true)}
                      className="btn-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Check Previous Emails
                    </button>
                    <button
                      onClick={handleCreateLabels}
                      disabled={loading}
                      className="glass text-gray-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white transition-all disabled:opacity-50"
                    >
                      Create Labels
                    </button>
                    <button
                      onClick={handleLogout}
                      className="glass text-gray-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white transition-all"
                    >
                      Disconnect
                    </button>
                    <button
                      onClick={() => handleRefresh(20)}
                      disabled={loading}
                      className="glass text-blue-600 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-all disabled:opacity-50 border border-blue-200"
                    >
                      {loading ? 'Loading...' : 'Refresh Recent'}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-xl mb-6">
                    <p className="text-red-700 font-semibold text-sm">{error}</p>
                  </div>
                )}

                {emails.length > 0 ? (
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <thead style={{ background: 'linear-gradient(120deg, #0ea5e9 0%, #3b82f6 100%)' }}>
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-white/90">
                              Subject
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-white/90">
                              From
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-white/90">
                              Security Label
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-white/90">
                              Score
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-white/90 w-64">
                              Why / Reasons
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {emails.map(renderEmailRow)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : !loading && (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-semibold text-base mb-1">No emails found</p>
                    <p className="text-gray-500 text-sm">Click "Refresh Recent" to fetch your latest inbox messages</p>
                  </div>
                )}

                {loading && (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-700 font-semibold text-base">Loading your emails...</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Security Features */}
          <div className="grid grid-cols-3 gap-5">
            {[
              { key: 'oauth', emoji: '🔐', title: 'OAuth2 Security', desc: 'Secure authentication with minimal Gmail permissions' },
              { key: 'realtimeAnalysis', emoji: '⚡', title: 'Real-Time Analysis', desc: 'Push notifications ensure instant email labeling' },
              { key: 'scoring', emoji: '📊', title: 'Transparent Scoring', desc: 'Every decision explained with detailed reasons' }
            ].map((item, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedFeature(featureDetails[item.key])}
                className="feature-card glass p-5 rounded-2xl hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center">
                    <span className="text-xl">{item.emoji}</span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {item.desc}
                </p>
                <div className="flex items-center text-blue-600 text-xs font-semibold gap-1">
                  Learn More
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden" style={{
        background: 'linear-gradient(120deg, #0c4a6e 0%, #0e7490 50%, #0891b2 100%)'
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="w-full max-w-[95%] mx-auto px-6 py-12 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">MailShield</h3>
                <p className="text-cyan-100 text-xs">Email Security Platform</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-cyan-100 text-sm">© 2026 MailShield</p>
              <p className="text-cyan-200 text-xs mt-0.5">Advanced Phishing Protection</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}