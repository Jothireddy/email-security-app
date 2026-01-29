import React, { useEffect, useState } from 'react';
import { fetchRecentEmails } from '../api';

const Dashboard = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ loadData(); },[]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchRecentEmails(20);
      setEmails(data.emails || []);
    } catch(e){
      console.error(e);
    } finally { setLoading(false); }
  };

  const getLabelBadge = (label) => {
    if(label === 'PHISHING_RISK') return <span style={{background:'#ffebee', color:'#c62828', padding:'4px 8px', borderRadius:6,fontWeight:700}}>Critical Risk</span>;
    if(label === 'SUSPICIOUS') return <span style={{background:'#fff3e0', color:'#ef6c00', padding:'4px 8px', borderRadius:6,fontWeight:700}}>Suspicious</span>;
    return <span style={{background:'#e8f5e9', color:'#2e7d32', padding:'4px 8px', borderRadius:6,fontWeight:700}}>Verified</span>;
  };

  return (
    <section className="section">
      <div className="container">
        <div className="frame">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <h2 style={{margin:0}}>Recent Transmissions</h2>
            <button className="cta-primary" onClick={loadData}>{loading ? 'Scanning...' : 'Refresh Analysis'}</button>
          </div>

          {(!emails || emails.length === 0) && !loading ? (
            <div style={{padding:40, textAlign:'center', color: 'var(--text-muted)'}}>No recent emails. Connect an account to analyze.</div>
          ) : (
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%', borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{textAlign:'left', color:'var(--text-muted)', textTransform:'uppercase', fontSize:12}}>
                    <th style={{padding:'12px 10px'}}>Subject</th>
                    <th style={{padding:'12px 10px'}}>From</th>
                    <th style={{padding:'12px 10px'}}>Analysis</th>
                    <th style={{padding:'12px 10px'}}>Score</th>
                    <th style={{padding:'12px 10px'}}>Reasons</th>
                  </tr>
                </thead>
                <tbody>
                  {emails.map(e => {
                    const headers = {};
                    (e.headers || []).forEach(h => headers[h.name.toLowerCase()] = h.value);
                    return (
                      <tr key={e.id}>
                        <td style={{padding:12, borderTop:'1px solid var(--border-soft)'}}>{headers.subject || '(No subject)'}</td>
                        <td style={{padding:12, borderTop:'1px solid var(--border-soft)', color:'var(--text-muted)'}}>{headers.from}</td>
                        <td style={{padding:12, borderTop:'1px solid var(--border-soft)'}}>{getLabelBadge(e.analysis.label)}</td>
                        <td style={{padding:12, borderTop:'1px solid var(--border-soft)', fontFamily:'monospace'}}>{e.analysis.score}/10</td>
                        <td style={{padding:12, borderTop:'1px solid var(--border-soft)', color:'var(--text-muted)'}}>{(e.analysis.reasons||[]).join(', ') || 'Clean'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;