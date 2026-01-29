import React from 'react';
import bg4svg from '/src/assets/bg4.svg';

export default function Footer() {
  return (
    <footer className="relative bg-[#4a4a45] text-white overflow-hidden mt-16" id="about">
      <div className="max-w-[1400px] mx-auto px-8 py-16">
        <div className="grid grid-cols-4 gap-12">
          <div>
            <h2 className="text-[48px] font-normal mb-4 tracking-tight">MailShield</h2>
            <p className="text-[#c4b896] text-[16px] font-normal">
              Email security for modern teams
            </p>
            <a href="/live">
              <button className="mt-12 bg-[#5a5a55] text-white px-6 py-3 rounded text-[11px] font-bold tracking-wide uppercase flex items-center hover:bg-[#6a6a65] transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              EXPERIENCE MAILSHIELD
            </button>
            </a>
          </div>

          <div>
            <h3 className="text-[14px] font-bold tracking-wider uppercase mb-6">PRODUCT</h3>
            <ul className="space-y-3">
              <li>
                <a href="/product" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="/live" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">
                  Live analysis dashboard
                </a>
              </li>
              <li>
                <a href="/header-engine" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">
                  Header intelligence
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-bold tracking-wider uppercase mb-6">API</h3>
            <ul className="space-y-3">
              <li>
                <a href="/developers" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">
                  Header analysis API
                </a>
              </li>
              <li>
                <a href="/developers" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">
                  Gmail labeling API
                </a>
              </li>
              <li>
                <a href="/architecture" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">
                  Push & cron pipeline
                </a>
              </li>
              <li>
                <a href="/developers" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">
                  Debug & admin tools
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-bold tracking-wider uppercase mb-6">RESOURCES</h3>
            <ul className="space-y-3">
              <li>
                <a href="/architecture" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">
                  Architecture docs
                </a>
              </li>
              <li>
                <a href="/security" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">
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
                <a href="/live" className="text-[#c4c4c4] text-[14px] hover:text-white transition-colors">
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
            <a href="/security" className="text-[#8a8a85] text-[12px] hover:text-white transition-colors">
              Terms of use
            </a>
            <a href="/security" className="text-[#8a8a85] text-[12px] hover:text-white transition-colors">
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
  );
}