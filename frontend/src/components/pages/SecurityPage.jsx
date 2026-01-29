import React from 'react';

export default function SecurityPage() {
  return (
    <div className="py-16" style={{ backgroundColor: '#f5f3f0' }}>
      <div className="max-w-[900px] mx-auto px-8">
        <h1 className="text-[42px] font-normal text-[#2d2d2d] mb-6 tracking-tight">
          Security & privacy model
        </h1>

        <h2 className="text-[22px] font-normal text-[#2d2d2d] mb-3 tracking-tight">
          Minimal scopes, least privilege
        </h2>
        <p className="text-[15px] text-[#4a4a4a] leading-[1.7] mb-4">
          MailShield is designed to use the smallest set of Gmail permissions that still
          allows robust analysis and labeling:
        </p>
        <ul className="list-disc list-inside text-[15px] text-[#4a4a4a] leading-[1.7] space-y-2 mb-6">
          <li>
            <code>https://www.googleapis.com/auth/gmail.readonly</code> – to read message
            metadata and headers.
          </li>
          <li>
            <code>https://www.googleapis.com/auth/gmail.modify</code> – to apply labels to
            messages.
          </li>
          <li>
            <code>openid</code>, <code>email</code>, <code>profile</code> – to identify
            the account and associate it with our JWT.
          </li>
        </ul>

        <h2 className="text-[22px] font-normal text-[#2d2d2d] mb-3 tracking-tight">
          What we focus on
        </h2>
        <p className="text-[15px] text-[#4a4a4a] leading-[1.7] mb-4">
          The project is centered on headers and labels:
        </p>
        <ul className="list-disc list-inside text-[15px] text-[#4a4a4a] leading-[1.7] space-y-2 mb-6">
          <li>
            The backend uses <code>format=metadata</code> when fetching messages –
            focusing on headers like <code>From</code>, <code>To</code>,{' '}
            <code>Subject</code>, <code>Authentication-Results</code>,{' '}
            <code>Return-Path</code>, etc.
          </li>
          <li>
            No message bodies are required to compute risk scores, simplifying data
            handling.
          </li>
          <li>
            The frontend displays exactly the headers and scores returned by the backend,
            nothing more.
          </li>
        </ul>

        <h2 className="text-[22px] font-normal text-[#2d2d2d] mb-3 tracking-tight">
          Transparency for audits and teams
        </h2>
        <p className="text-[15px] text-[#4a4a4a] leading-[1.7] mb-4">
          Every decision made by MailShield is explainable:
        </p>
        <ul className="list-disc list-inside text-[15px] text-[#4a4a4a] leading-[1.7] space-y-2 mb-6">
          <li>
            The header engine returns a <strong>score</strong> plus a list of{' '}
            <strong>reasons</strong> (e.g., "SPF fail", "DKIM fail", "Return‑Path domain
            different from From domain").
          </li>
          <li>
            These reasons are shown directly in the live dashboard, mirroring how an
            enterprise SOC would expect to review alerts.
          </li>
          <li>
            Debug endpoints like <code>/emails/debug-profile</code> and{' '}
            <code>/emails/debug-list-labels</code> allow admins to verify exactly which
            account and labels are being acted on.
          </li>
        </ul>

        <p className="text-[14px] text-[#6b6b6b] leading-[1.7]">
          Because this is a demo project, user and token data is stored in memory. For a
          real deployment, the same patterns and modules can be wired into a proper
          database, with per‑tenant encryption, rotation policies, and central logging.
        </p>
      </div>
    </div>
  );
}
