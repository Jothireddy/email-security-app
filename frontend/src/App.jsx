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
      {/* Fixed Banner + Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-7 mt-7">
          {/* Announcement Banner */}
          <div className="rounded-t-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#c85940] to-[#d66645] text-white text-center py-1.5 px-4">
              <p className="text-[11px] font-normal tracking-wide">
                ✦✦ MailShield – Live SPF, DKIM, DMARC based phishing detection for Gmail ✦✦
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

                  {/* PROJECT Dropdown */}
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

      {/* Hero / Product Intro */}
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

      {/* Gradient Transition */}
      <div
        className="h-16"
        style={{
          background: 'linear-gradient(to bottom, rgba(245, 243, 240, 0) 0%, rgba(245, 243, 240, 1) 100%)'
        }}
      ></div>

      {/* Developer / API Section */}
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

      {/* Architecture Section */}
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

      {/* Core Capabilities Section */}
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
            {/* Card 1 - Header Analysis Engine */}
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

            {/* Card 2 - Real-time Inbox Protection */}
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

            {/* Card 3 - Scheduled Auto-labeler */}
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

      {/* Security Section */}
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
            {/* Card 1 - Least privilege */}
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

            {/* Card 2 - Transparent scoring */}
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

            {/* Card 3 - Extensible rules */}
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

      {/* Automation & Observability */}
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

      {/* Live Analysis Section */}
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

      {/* Footer */}
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
}