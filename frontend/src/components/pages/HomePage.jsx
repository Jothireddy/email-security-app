import React from 'react';
import bg1 from '/src/assets/bg1.png';

export default function HomePage({ onViewLiveAnalysis }) {
  return (
    <div
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      className="min-h-[80vh] flex items-center"
    >
      <main className="max-w-[900px] mx-auto px-8 py-24 relative z-10">
        <div className="text-center">
          <h2 className="text-[52px] font-normal text-[#1a1a1a] leading-[1.08] mb-4 tracking-tight">
            Industry‑grade phishing detection<br />and labeling for Gmail
          </h2>
          <p className="text-[17px] text-[#6b6b6b] font-normal mb-8 leading-[1.55] max-w-[680px] mx-auto">
            MailShield connects to Gmail via OAuth2, inspects <strong>SPF</strong>,{' '}
            <strong>DKIM</strong>, <strong>DMARC</strong>, and routing headers, and
            automatically applies labels like <strong>PHISHING_RISK</strong>,{' '}
            <strong>SUSPICIOUS</strong>, and <strong>OK</strong>. Built to look and behave
            like a real production email‑security platform.
          </p>
          <div className="flex items-center justify-center gap-3 mt-7">
            <button
              className="bg-gradient-to-r from-[#c85940] to-[#d66645] text-white px-7 py-3 rounded text-[12px] font-bold tracking-[0.08em] uppercase shadow-md"
              onClick={onViewLiveAnalysis}
            >
              VIEW LIVE ANALYSIS<span className="ml-2 text-[10px]">✦</span>
            </button>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                onViewLiveAnalysis && onViewLiveAnalysis();
              }}
              className="bg-white text-[#4a4a4a] border border-gray-300 px-7 py-3 rounded text-[12px] font-bold tracking-[0.08em] uppercase shadow-sm inline-flex items-center justify-center"
            >
              SEE GMAIL LABELS
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
