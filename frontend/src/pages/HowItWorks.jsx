import React from 'react';

export default function HowItWorks(){
  return (
    <section className="section">
      <div className="container">
        <div className="frame">
          <h1>Methodology</h1>
          <p style={{color:'var(--text-muted)'}}>We analyze the invisible trust signals attached to every email header and produce transparent reasoning along with a deterministic risk score.</p>

          <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:28, marginTop:28}}>
            <div>
              <h3>1. SPF & DKIM Verification</h3>
              <p style={{color:'var(--text-muted)'}}>We check IP authorization (SPF) and signature validity (DKIM) to verify origin authenticity.</p>
            </div>

            <div>
              <h3>2. Header Forensics</h3>
              <p style={{color:'var(--text-muted)'}}>We reconstruct the relay path to detect tampering and obfuscation attempts.</p>
            </div>

            <div>
              <h3>3. Heuristic & ML Signals</h3>
              <p style={{color:'var(--text-muted)'}}>Hybrid models combine heuristics and lightweight ML signals for robust detection.</p>
            </div>

            <div>
              <h3>4. Human-Readable Reasons</h3>
              <p style={{color:'var(--text-muted)'}}>Every decision includes reasons and vectors so you can audit and act confidently.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}