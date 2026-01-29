import React from 'react';

export default function LiveAnalysisPage({
  token,
  emails,
  loading,
  error,
  onLogin,
  onLogout,
  onRefresh
}) {
  return (
    <div className="py-16" style={{ backgroundColor: '#f5f3f0' }}>
      <div className="max-w-[1100px] mx-auto px-8">
        <h1 className="text-[42px] font-normal text-[#2d2d2d] mb-3 tracking-tight">
          Live analysis dashboard
        </h1>
        <p className="text-[15px] text-[#6b6b6b] leading-[1.7] mb-8 max-w-[800px]">
          This page is wired directly to the backend. When you connect Gmail, MailShield
          uses the <code>/emails/recent</code> endpoint to pull your latest INBOX messages,
          runs each through the header analysis engine, and shows the live label, score,
          and reasons. This is exactly how a production SOC or admin UI would inspect and
          debug email classification.
        </p>

        <div
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
          style={{ border: '6px solid #e8e5df' }}
        >
          {!token ? (
            <div className="text-center">
              <p className="text-[14px] text-[#4a4a4a] mb-4">
                To see MailShield in action, connect a Gmail account using Google OAuth.
                We request only the minimal scopes needed to read headers and apply
                labels.
              </p>
              <button
                onClick={onLogin}
                className="bg-gradient-to-r from-[#c85940] to-[#d66645] text-white px-7 py-3 rounded text-[12px] font-bold tracking-[0.08em] uppercase shadow-md"
              >
                LOGIN WITH GOOGLE<span className="ml-2 text-[10px]">✦</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-[14px] text-[#4a4a4a]">
                Logged in with a Gmail account. New emails will be labeled automatically
                via push + cron. Use <strong>Refresh</strong> to fetch the latest analysis
                snapshot.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={onLogout}
                  className="bg-white text-[#4a4a4a] border border-gray-300 px-4 py-2 rounded text-[11px] font-bold tracking-[0.08em] uppercase shadow-sm"
                >
                  LOGOUT
                </button>
                <button
                  onClick={() => onRefresh(20)}
                  disabled={loading}
                  className="bg-gradient-to-r from-[#c85940] to-[#d66645] text-white px-5 py-2.5 rounded text-[11px] font-bold tracking-[0.08em] uppercase shadow-md disabled:opacity-60"
                >
                  {loading ? 'LOADING…' : 'REFRESH RECENT EMAILS'}
                </button>
              </div>
            </div>
          )}

          {error && <p className="mt-4 text-[13px] text-red-600">{error}</p>}
        </div>

        {emails.length > 0 && (
          <div
            className="bg-white rounded-3xl p-6 shadow-lg"
            style={{ border: '6px solid #e8e5df' }}
          >
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
                          {headers['subject'] || (
                            <span className="text-gray-400 italic">No subject</span>
                          )}
                        </td>
                        <td className="py-2 pr-3 text-[#4a4a4a]">
                          {headers['from'] || (
                            <span className="text-gray-400 italic">Unknown</span>
                          )}
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
            fetch your latest INBOX messages and see how they are labeled.
          </p>
        )}
      </div>
    </div>
  );
}
