import React from 'react';

export default function HeaderEnginePage() {
  return (
    <div className="py-16" style={{ backgroundColor: '#f5f3f0' }}>
      <div className="max-w-[900px] mx-auto px-8">
        <h1 className="text-[42px] font-normal text-[#2d2d2d] mb-4 tracking-tight">
          Header intelligence (SPF / DKIM / DMARC)
        </h1>
        <p className="text-[15px] text-[#4a4a4a] leading-[1.7] mb-6">
          At the heart of MailShield is <code>headerAnalyzer.js</code> – a transparent,
          rule‑based engine that inspects raw SMTP headers and converts them into a
          numeric risk score and high‑level label. Instead of a black‑box model, you get
          clear, explainable behavior you can tune and extend.
        </p>

        <h2 className="text-[22px] font-normal text-[#2d2d2d] mb-3 tracking-tight">
          Signals we inspect
        </h2>
        <ul className="list-disc list-inside text-[15px] text-[#4a4a4a] leading-[1.7] space-y-2 mb-6">
          <li>
            <strong>SPF status</strong> – <code>spf=pass</code> vs <code>spf=fail</code>{' '}
            in <code>Authentication-Results</code>, with heavy penalties for FAIL.
          </li>
          <li>
            <strong>DKIM status</strong> – <code>dkim=pass</code> vs <code>dkim=fail</code>{' '}
            to catch tampered or spoofed messages.
          </li>
          <li>
            <strong>DMARC status</strong> – <code>dmarc=fail</code> is treated as a
            serious indicator for spoofing.
          </li>
          <li>
            <strong>Missing auth for non‑Gmail senders</strong> – if an external domain
            sends mail without SPF or DKIM results at all, we bump risk.
          </li>
          <li>
            <strong>Suspicious subject keywords</strong> – words like "urgent", "verify
            your account", "password", "invoice", "payment", "security alert".
          </li>
          <li>
            <strong>From vs Reply‑To vs Return‑Path</strong> – domain mismatches are a
            classic phishing trick and are scored accordingly.
          </li>
          <li>
            <strong>Display name tricks</strong> – names that don't match the underlying
            email address at all.
          </li>
          <li>
            <strong>Hop count</strong> – many <code>Received:</code> hops can indicate
            unusual routing.
          </li>
        </ul>

        <h2 className="text-[22px] font-normal text-[#2d2d2d] mb-3 tracking-tight">
          Scoring and labels
        </h2>
        <p className="text-[15px] text-[#4a4a4a] leading-[1.7] mb-4">
          Each rule contributes to a numeric score. Thresholds map that score into three
          labels:
        </p>
        <ul className="list-disc list-inside text-[15px] text-[#4a4a4a] leading-[1.7] space-y-1 mb-6">
          <li>
            <strong>OK</strong> – score below 2, nothing obviously dangerous detected.
          </li>
          <li>
            <strong>SUSPICIOUS</strong> – score between 2 and 4; worth extra attention.
          </li>
          <li>
            <strong>PHISHING_RISK</strong> – score 5 or above; strong signs of spoofing
            or fraud.
          </li>
        </ul>

        <p className="text-[14px] text-[#6b6b6b] leading-[1.7]">
          The engine returns <code>{'{ label, score, reasons[] }'}</code>, and those
          reasons are surfaced directly in the UI so analysts can see exactly which
          signals fired. This is critical for audits, tuning, and explaining decisions to
          non‑technical stakeholders.
        </p>
      </div>
    </div>
  );
}
