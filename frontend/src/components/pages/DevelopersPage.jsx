import React from 'react';

export default function DevelopersPage() {
  return (
    <div className="py-16" style={{ backgroundColor: '#f5f3f0' }}>
      <div className="max-w-[1000px] mx-auto px-8">
        <h1 className="text-[42px] font-normal text-[#2d2d2d] mb-6 tracking-tight">
          For developers
        </h1>
        <p className="text-[15px] text-[#4a4a4a] leading-[1.7] mb-6">
          MailShield is built to be read, modified, and extended. The codebase is split
          into clear backend modules and a frontend that speaks to them via a small API
          client. This page summarizes the key endpoints and patterns.
        </p>

        <h2 className="text-[22px] font-normal text-[#2d2d2d] mb-3 tracking-tight">
          Authentication
        </h2>
        <ul className="list-disc list-inside text-[15px] text-[#4a4a4a] leading-[1.7] space-y-2 mb-6">
          <li>
            <code>GET /auth/google</code> – starts the Google OAuth2 flow.
          </li>
          <li>
            <code>GET /auth/google/callback</code> – Google redirects here with{' '}
            <code>?code=...</code>; backend exchanges code for Gmail tokens, registers a
            Gmail watch, stores tokens, then issues a project‑owned{' '}
            <strong>JWT</strong> with the user's Gmail address.
          </li>
          <li>
            Frontend stores that JWT (via <code>setAuthToken</code>) and sends it as{' '}
            <code>Authorization: Bearer &lt;token&gt;</code> to all authenticated routes.
          </li>
        </ul>

        <h2 className="text-[22px] font-normal text-[#2d2d2d] mb-3 tracking-tight">
          Key API endpoints
        </h2>
        <table className="w-full text-left text-[13px] mb-8 border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 pr-3 font-semibold text-[#4a4a4a]">Endpoint</th>
              <th className="py-2 pr-3 font-semibold text-[#4a4a4a]">Method</th>
              <th className="py-2 pr-3 font-semibold text-[#4a4a4a]">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-2 pr-3 text-[#2d2d2d]">/emails/recent?limit=20</td>
              <td className="py-2 pr-3 text-[#4a4a4a]">GET</td>
              <td className="py-2 pr-3 text-[#4a4a4a]">
                Returns a list of recent INBOX messages with headers, analysis result (
                {'{ label, score, reasons }'}), and current Gmail label names.
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 pr-3 text-[#2d2d2d]">/emails/debug-profile</td>
              <td className="py-2 pr-3 text-[#4a4a4a]">GET</td>
              <td className="py-2 pr-3 text-[#4a4a4a]">
                Shows the Gmail profile (email address) that MailShield is currently
                connected to.
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 pr-3 text-[#2d2d2d]">/emails/debug-list-labels</td>
              <td className="py-2 pr-3 text-[#4a4a4a]">GET</td>
              <td className="py-2 pr-3 text-[#4a4a4a]">
                Lists existing Gmail labels; useful to confirm that{' '}
                <code>PHISHING_RISK</code>, <code>SUSPICIOUS</code>, and <code>OK</code>{' '}
                exist.
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 pr-3 text-[#2d2d2d]">/emails/debug-create-labels</td>
              <td className="py-2 pr-3 text-[#4a4a4a]">POST</td>
              <td className="py-2 pr-3 text-[#4a4a4a]">
                Ensures that the core MailShield labels exist, creating them if needed.
              </td>
            </tr>
            <tr>
              <td className="py-2 pr-3 text-[#2d2d2d]">/gmail/push</td>
              <td className="py-2 pr-3 text-[#4a4a4a]">POST</td>
              <td className="py-2 pr-3 text-[#4a4a4a]">
                Gmail Pub/Sub push endpoint that decodes notifications, fetches history,
                analyzes new messages, and applies labels.
              </td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-[22px] font-normal text-[#2d2d2d] mb-3 tracking-tight">
          Frontend wiring
        </h2>
        <ul className="list-disc list-inside text-[15px] text-[#4a4a4a] leading-[1.7] space-y-2">
          <li>
            <code>App.jsx</code> stores the JWT, email list, loading, and error state.
          </li>
          <li>
            <code>Navbar.jsx</code> triggers login and "open live demo", which navigates
            to <code>/live</code> and refreshes data from <code>/emails/recent</code>.
          </li>
          <li>
            <code>LiveAnalysisPage.jsx</code> is a pure presentation layer that takes{' '}
            <code>emails</code> and callbacks as props and renders the table using the
            same MailShield visual style.
          </li>
        </ul>
      </div>
    </div>
  );
}
