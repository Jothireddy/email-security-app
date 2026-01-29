import React from 'react';
import bg2 from '/src/assets/bg2.png';

export default function ProductOverviewPage() {
  return (
    <div className="py-16" style={{ backgroundColor: '#f5f3f0' }}>
      <div className="max-w-[1100px] mx-auto px-8">
        <h1 className="text-[42px] font-normal text-[#2d2d2d] leading-[1.1] mb-6 tracking-tight">
          Product overview
        </h1>
        <p className="text-[16px] text-[#4a4a4a] leading-[1.7] mb-8">
          MailShield is a full‑stack Gmail security project that demonstrates how to build
          an industry‑grade phishing detection and labeling pipeline. It combines a
          production‑style backend with a polished frontend to show the entire journey
          from OAuth login to live risk scores and Gmail labels.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-[24px] font-normal text-[#2d2d2d] mb-4 tracking-tight">
              What MailShield does
            </h2>
            <ul className="list-disc list-inside text-[15px] text-[#4a4a4a] leading-[1.7] space-y-2 mb-6">
              <li>
                Connects to your Gmail account using <strong>Google OAuth2</strong> with
                the minimal <code>gmail.readonly</code> and <code>gmail.modify</code>{' '}
                scopes.
              </li>
              <li>
                Reads message headers using the official <strong>Gmail API</strong> and a
                backend written with <strong>Express</strong> and the{' '}
                <code>googleapis</code> SDK.
              </li>
              <li>
                Runs headers through a custom <strong>headerAnalyzer</strong> that
                evaluates SPF, DKIM, DMARC, subject lines, domain mismatches, and routing
                hops.
              </li>
              <li>
                Applies Gmail labels – <code>PHISHING_RISK</code>,{' '}
                <code>SUSPICIOUS</code>, and <code>OK</code> – via the Gmail modify API.
              </li>
              <li>
                Streams the results into a rich frontend dashboard that shows score,
                label, and the exact reasons behind every decision.
              </li>
            </ul>

            <h2 className="text-[24px] font-normal text-[#2d2d2d] mb-4 tracking-tight">
              Why this is industry‑grade
            </h2>
            <ul className="list-disc list-inside text-[15px] text-[#4a4a4a] leading-[1.7] space-y-2">
              <li>Uses real OAuth 2.0 flows and JWT‑based session tokens.</li>
              <li>Implements both push‑based and cron‑based pipelines for robustness.</li>
              <li>Separates analysis logic, Gmail helpers, and routing cleanly.</li>
              <li>Designed to plug into a database for production multi‑tenant setups.</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg" style={{ border: '8px solid #e8e5df' }}>
            <h3 className="text-[20px] font-normal text-[#2d2d2d] mb-4 tracking-tight">
              Frontend experience
            </h3>
            <p className="text-[14px] text-[#4a4a4a] leading-[1.7] mb-4">
              The frontend is built with React, Tailwind‑style utility classes, and a
              glassmorphism design inspired by modern SaaS products. It focuses on:
            </p>
            <ul className="list-disc list-inside text-[14px] text-[#4a4a4a] leading-[1.7] space-y-2 mb-6">
              <li>A fixed, translucent navbar with dropdown navigation.</li>
              <li>Dedicated pages for product, architecture, security, and docs.</li>
              <li>A live analysis page wired directly to the backend APIs.</li>
            </ul>
            <img
              src={bg2}
              alt="Code example showing MailShield API usage"
              className="w-full h-auto rounded-2xl shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
