import React from 'react';
import bg3 from '/src/assets/bg3.png';
import bg3svg from '/src/assets/bg3.svg';

export default function ArchitecturePage() {
  return (
    <div className="py-16" style={{ backgroundColor: '#f5f3f0' }}>
      <div className="max-w-[1100px] mx-auto px-8">
        <h1 className="text-[42px] font-normal text-[#2d2d2d] mb-6 tracking-tight">
          System architecture
        </h1>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white rounded-3xl p-10 shadow-lg mb-10"
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
            <h2 className="text-[26px] font-normal text-[#2d2d2d] mb-3 tracking-tight">
              High‑level flow
            </h2>
            <ol className="list-decimal list-inside text-[15px] text-[#4a4a4a] leading-[1.7] space-y-2 mb-4">
              <li>
                User clicks "Login with Google" → backend <code>/auth/google</code> starts
                OAuth.
              </li>
              <li>
                Google redirects to <code>/auth/google/callback</code> with a{' '}
                <code>code</code>; backend exchanges it for tokens.
              </li>
              <li>
                Backend uses the Gmail API to fetch the user profile and registers a{' '}
                <strong>Gmail watch</strong> on the INBOX, pointing to a Pub/Sub topic.
              </li>
              <li>
                Tokens and a <code>lastHistoryId</code> are stored per user (via{' '}
                <code>userStore</code>).
              </li>
              <li>
                Gmail push events hit <code>/gmail/push</code>, which fetches new
                messages, analyzes headers, and applies labels.
              </li>
              <li>
                A background cron job (<code>autoLabeler.js</code>) periodically sweeps
                recent messages as a fallback.
              </li>
              <li>
                The frontend calls <code>/emails/recent</code> to render the live
                dashboard.
              </li>
            </ol>
            <img
              src={bg3svg}
              alt="Decorative pattern"
              className="w-full max-w-[450px] opacity-40 mt-6"
            />
          </div>
        </div>

        <h2 className="text-[24px] font-normal text-[#2d2d2d] mb-3 tracking-tight">
          Backend modules
        </h2>
        <ul className="list-disc list-inside text-[15px] text-[#4a4a4a] leading-[1.7] space-y-2">
          <li>
            <code>authRoutes.js</code> – OAuth initiation and callback, Gmail watch
            registration, issuing project‑owned JWT.
          </li>
          <li>
            <code>emailRoutes.js</code> – <code>/emails/recent</code>, label creation
            debugging, and <code>/debug-*</code> endpoints.
          </li>
          <li>
            <code>pushRoutes.js</code> – Pub/Sub push handler that processes Gmail history
            deltas and labels new messages in near real time.
          </li>
          <li>
            <code>autoLabeler.js</code> – cron‑based fallback worker that sweeps recent
            messages every few seconds.
          </li>
          <li>
            <code>headerAnalyzer.js</code> – reusable scoring and labeling engine for
            headers.
          </li>
          <li>
            <code>gmailHelpers.js</code> – utilities to ensure labels exist and to talk to
            Gmail in a clean way.
          </li>
          <li>
            <code>googleClient.js</code> – OAuth2 client and Gmail client factory, scoped
            with the right permissions.
          </li>
          <li>
            <code>userStore.js</code> – in‑memory representation of users, tokens, and
            processed message IDs (database‑ready).
          </li>
        </ul>
      </div>
    </div>
  );
}
