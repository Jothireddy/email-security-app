// backend/src/emailRoutes.js
const express = require('express');
const requireAuth = require('./authMiddleware');
const { getUserTokens } = require('./userStore');
const { getGmailClient } = require('./googleClient');
const { analyzeHeaders, analyzeSPF, analyzeDKIM, analyzeDMARC, analyzeTLS, analyzeSenderReputation } = require('./headerAnalyzer');
const { ensureLabel } = require('./gmailHelpers');

const router = express.Router();

/**
 * Get recent emails with full security analysis
 */
router.get('/recent', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const tokens = getUserTokens(userId);
  if (!tokens) {
    return res.status(401).json({ error: 'Missing tokens for user; please log in again' });
  }

  const limit = parseInt(req.query.limit || '20', 10);

  try {
    const gmail = getGmailClient(tokens);

    // Get label map (id -> name)
    const labelRes = await gmail.users.labels.list({ userId: 'me' });
    const labelMap = {};
    (labelRes.data.labels || []).forEach(l => {
      labelMap[l.id] = l.name;
    });

    const listRes = await gmail.users.messages.list({
      userId: 'me',
      labelIds: ['INBOX'],
      maxResults: limit
    });

    const messages = listRes.data.messages || [];
    const results = [];

    for (const msg of messages) {
      const full = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id,
        format: 'metadata',
        metadataHeaders: [
          'From', 'To', 'Subject', 'Date', 'Received',
          'Authentication-Results', 'Return-Path', 'Reply-To',
          'Message-ID', 'X-Originating-IP', 'Received-SPF',
          'DKIM-Signature', 'ARC-Authentication-Results'
        ]
      });

      const headers = full.data.payload.headers || [];
      const analysis = analyzeHeaders(headers);

      const gmailLabels = (full.data.labelIds || []).map(id => labelMap[id] || id);

      results.push({
        id: msg.id,
        snippet: full.data.snippet,
        headers,
        analysis,
        gmailLabels,
        threadId: full.data.threadId,
        internalDate: full.data.internalDate,
        securitySummary: {
          spf: analysis.securityChecks.spf.status,
          dkim: analysis.securityChecks.dkim.status,
          dmarc: analysis.securityChecks.dmarc.status,
          encrypted: analysis.securityChecks.tls.encrypted,
          riskLevel: analysis.riskLevel,
          score: analysis.score
        }
      });
    }

    res.json({ 
      count: results.length, 
      emails: results,
      timestamp: new Date().toISOString(),
      summary: generateEmailSummary(results)
    });
  } catch (err) {
    console.error('Recent emails error:', err.response?.data || err);
    res.status(500).json({ error: 'Failed to fetch recent emails' });
  }
});

/**
 * Get detailed authentication analysis for a specific email
 * Shows comprehensive SPF, DKIM, DMARC breakdown
 */
router.get('/auth-details/:messageId', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const tokens = getUserTokens(userId);
  if (!tokens) {
    return res.status(401).json({ error: 'Missing tokens for user; please log in again' });
  }

  const { messageId } = req.params;

  try {
    const gmail = getGmailClient(tokens);

    const full = await gmail.users.messages.get({
      userId: 'me',
      id: messageId,
      format: 'full'
    });

    const headers = full.data.payload.headers || [];
    const headerMap = {};
    headers.forEach(h => {
      headerMap[h.name.toLowerCase()] = h.value;
    });

    const authResults = headerMap['authentication-results'] || '';
    const received = headerMap['received'] || '';
    const from = headerMap['from'] || '';

    // Individual authentication component analysis
    const spf = analyzeSPF(authResults, from, received);
    const dkim = analyzeDKIM(authResults, from);
    const dmarc = analyzeDMARC(authResults, from, spf, dkim);
    const tls = analyzeTLS(received);
    const sender = analyzeSenderReputation(from, headerMap['return-path'] || '', headerMap['reply-to'] || '');

    // Full comprehensive analysis
    const fullAnalysis = analyzeHeaders(headers);

    res.json({
      messageId,
      subject: headerMap['subject'] || 'No Subject',
      from: headerMap['from'] || 'Unknown',
      to: headerMap['to'] || '',
      date: headerMap['date'] || '',
      authentication: {
        spf: {
          ...spf,
          displayName: 'Sender Policy Framework',
          description: 'Validates that the sending server is authorized to send email for this domain',
          timestamp: new Date().toISOString()
        },
        dkim: {
          ...dkim,
          displayName: 'DomainKeys Identified Mail',
          description: 'Cryptographic signature that verifies email authenticity and integrity',
          timestamp: new Date().toISOString()
        },
        dmarc: {
          ...dmarc,
          displayName: 'Domain-based Message Authentication',
          description: 'Policy framework that builds on SPF and DKIM to prevent email spoofing',
          timestamp: new Date().toISOString()
        },
        tls: {
          ...tls,
          displayName: 'Transport Layer Security',
          description: 'Encryption protocol used to secure email transmission',
          timestamp: new Date().toISOString()
        },
        sender: {
          ...sender,
          displayName: 'Sender Reputation',
          description: 'Analysis of sender domain trustworthiness and reputation',
          timestamp: new Date().toISOString()
        },
        overall: {
          allPassed: spf.pass && dkim.pass && dmarc.pass,
          totalScore: spf.score + dkim.score + dmarc.score + tls.score + sender.score,
          authenticated: spf.pass || dkim.pass,
          encrypted: tls.encrypted,
          trusted: sender.trusted,
          verdict: fullAnalysis.label,
          confidence: fullAnalysis.confidence
        }
      },
      analysis: fullAnalysis,
      rawHeaders: {
        'authentication-results': authResults,
        'received': received,
        'received-spf': headerMap['received-spf'] || 'Not available',
        'dkim-signature': headerMap['dkim-signature'] || 'Not available',
        'arc-authentication-results': headerMap['arc-authentication-results'] || 'Not available'
      },
      recommendations: generateSecurityRecommendations(fullAnalysis)
    });
  } catch (err) {
    console.error('Auth details error:', err.response?.data || err);
    res.status(500).json({ error: 'Failed to fetch authentication details' });
  }
});

/**
 * Get authentication statistics for all emails
 * Provides aggregate metrics on email security
 */
router.get('/auth-stats', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const tokens = getUserTokens(userId);
  if (!tokens) {
    return res.status(401).json({ error: 'Missing tokens for user; please log in again' });
  }

  try {
    const gmail = getGmailClient(tokens);

    const listRes = await gmail.users.messages.list({
      userId: 'me',
      labelIds: ['INBOX'],
      maxResults: 100 // Analyze last 100 emails
    });

    const messages = listRes.data.messages || [];
    
    const stats = {
      total: messages.length,
      analyzed: 0,
      spf: {
        pass: 0,
        fail: 0,
        softfail: 0,
        neutral: 0,
        none: 0,
        missing: 0,
        temperror: 0,
        permerror: 0
      },
      dkim: {
        pass: 0,
        fail: 0,
        neutral: 0,
        none: 0,
        missing: 0,
        policy: 0,
        temperror: 0,
        permerror: 0
      },
      dmarc: {
        pass: 0,
        fail: 0,
        none: 0,
        missing: 0,
        'inferred-pass': 0,
        bestguesspass: 0,
        temperror: 0,
        permerror: 0
      },
      tls: {
        encrypted: 0,
        unencrypted: 0,
        'tls-1.3': 0,
        'tls-1.2': 0,
        'tls-1.1': 0,
        'tls-1.0': 0
      },
      riskLevels: {
        minimal: 0,
        low: 0,
        medium: 0,
        high: 0,
        critical: 0
      },
      labels: {
        ok: 0,
        suspicious: 0,
        phishing: 0
      }
    };

    // Process first 50 emails for performance
    for (const msg of messages.slice(0, 50)) {
      try {
        const full = await gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
          format: 'metadata',
          metadataHeaders: ['Authentication-Results', 'Received', 'From']
        });

        const headers = full.data.payload.headers || [];
        const analysis = analyzeHeaders(headers);

        stats.analyzed++;

        // Count SPF results
        if (analysis.securityChecks.spf) {
          const status = analysis.securityChecks.spf.status;
          if (stats.spf[status] !== undefined) {
            stats.spf[status]++;
          }
        }

        // Count DKIM results
        if (analysis.securityChecks.dkim) {
          const status = analysis.securityChecks.dkim.status;
          if (stats.dkim[status] !== undefined) {
            stats.dkim[status]++;
          }
        }

        // Count DMARC results
        if (analysis.securityChecks.dmarc) {
          const status = analysis.securityChecks.dmarc.status;
          if (stats.dmarc[status] !== undefined) {
            stats.dmarc[status]++;
          }
        }

        // Count TLS results
        if (analysis.securityChecks.tls) {
          if (analysis.securityChecks.tls.encrypted) {
            stats.tls.encrypted++;
            const version = analysis.securityChecks.tls.details.version || 'TLS 1.2';
            const versionKey = version.toLowerCase().replace(/ /g, '-');
            if (stats.tls[versionKey] !== undefined) {
              stats.tls[versionKey]++;
            }
          } else {
            stats.tls.unencrypted++;
          }
        }

        // Count risk levels
        if (stats.riskLevels[analysis.riskLevel] !== undefined) {
          stats.riskLevels[analysis.riskLevel]++;
        }

        // Count labels
        if (analysis.label === 'OK') stats.labels.ok++;
        else if (analysis.label === 'SUSPICIOUS') stats.labels.suspicious++;
        else if (analysis.label === 'PHISHING_RISK') stats.labels.phishing++;

      } catch (emailErr) {
        console.error(`Error processing email ${msg.id}:`, emailErr.message);
      }
    }

    // Calculate percentages
    stats.percentages = {
      spfPass: stats.analyzed > 0 ? ((stats.spf.pass / stats.analyzed) * 100).toFixed(1) : '0',
      dkimPass: stats.analyzed > 0 ? ((stats.dkim.pass / stats.analyzed) * 100).toFixed(1) : '0',
      dmarcPass: stats.analyzed > 0 ? (((stats.dmarc.pass + stats.dmarc['inferred-pass']) / stats.analyzed) * 100).toFixed(1) : '0',
      encrypted: stats.analyzed > 0 ? ((stats.tls.encrypted / stats.analyzed) * 100).toFixed(1) : '0',
      authenticated: stats.analyzed > 0 ? (((stats.spf.pass + stats.dkim.pass) / (stats.analyzed * 2)) * 100).toFixed(1) : '0',
      safe: stats.analyzed > 0 ? ((stats.labels.ok / stats.analyzed) * 100).toFixed(1) : '0',
      suspicious: stats.analyzed > 0 ? ((stats.labels.suspicious / stats.analyzed) * 100).toFixed(1) : '0',
      phishing: stats.analyzed > 0 ? ((stats.labels.phishing / stats.analyzed) * 100).toFixed(1) : '0'
    };

    // Overall security score (0-100)
    const securityScore = calculateSecurityScore(stats);

    res.json({
      stats,
      securityScore,
      analyzed: stats.analyzed,
      timestamp: new Date().toISOString(),
      recommendations: generateStatsRecommendations(stats, securityScore)
    });
  } catch (err) {
    console.error('Auth stats error:', err.response?.data || err);
    res.status(500).json({ error: 'Failed to fetch authentication statistics' });
  }
});

/**
 * Test SPF/DKIM/DMARC analysis on sample authentication results
 */
router.post('/test-auth-analysis', requireAuth, async (req, res) => {
  const { authResults, received, from } = req.body;

  if (!authResults) {
    return res.status(400).json({ error: 'Missing authResults in request body' });
  }

  try {
    const spf = analyzeSPF(authResults, from || '', received || '');
    const dkim = analyzeDKIM(authResults, from || '');
    const dmarc = analyzeDMARC(authResults, from || '', spf, dkim);
    const tls = analyzeTLS(received || '');

    res.json({
      spf,
      dkim,
      dmarc,
      tls,
      overall: {
        allPass: spf.pass && dkim.pass && dmarc.pass,
        totalScore: spf.score + dkim.score + dmarc.score + tls.score,
        verdict: spf.pass && dkim.pass && dmarc.pass ? 'AUTHENTICATED' : 'SUSPICIOUS',
        recommendation: spf.pass && dkim.pass && dmarc.pass 
          ? 'Email appears legitimate with valid authentication'
          : 'Email has authentication issues - proceed with caution'
      },
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Test auth analysis error:', err);
    res.status(500).json({ error: 'Failed to analyze authentication' });
  }
});

// ========== DEBUG ENDPOINTS ==========

router.get('/debug-profile', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const tokens = getUserTokens(userId);
  if (!tokens) return res.status(401).json({ error: 'No tokens; login again' });

  try {
    const gmail = getGmailClient(tokens);
    const profile = await gmail.users.getProfile({ userId: 'me' });
    res.json(profile.data);
  } catch (err) {
    console.error('debug-profile error:', err.response?.data || err);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

router.post('/debug-label-one', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const tokens = getUserTokens(userId);
  if (!tokens) return res.status(401).json({ error: 'No tokens; login again' });

  try {
    const gmail = getGmailClient(tokens);
    const suspiciousId = await ensureLabel(gmail, 'me', 'SUSPICIOUS');

    const listRes = await gmail.users.messages.list({
      userId: 'me',
      labelIds: ['INBOX'],
      maxResults: 1
    });

    const messages = listRes.data.messages || [];
    if (!messages.length) {
      return res.json({ message: 'No messages in INBOX' });
    }

    const msgId = messages[0].id;
    await gmail.users.messages.modify({
      userId: 'me',
      id: msgId,
      requestBody: { addLabelIds: [suspiciousId] }
    });

    res.json({ message: 'Labeled latest INBOX message as SUSPICIOUS', msgId });
  } catch (err) {
    console.error('debug-label-one error:', err.response?.data || err);
    res.status(500).json({ error: 'Failed to label latest email' });
  }
});

router.get('/debug-list-labels', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const tokens = getUserTokens(userId);
  if (!tokens) return res.status(401).json({ error: 'No tokens; login again' });

  try {
    const gmail = getGmailClient(tokens);
    const labelRes = await gmail.users.labels.list({ userId: 'me' });
    res.json(labelRes.data.labels);
  } catch (err) {
    console.error('debug-list-labels error:', err.response?.data || err);
    res.status(500).json({ error: 'Failed to list labels' });
  }
});

router.post('/debug-create-labels', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const tokens = getUserTokens(userId);
  if (!tokens) return res.status(401).json({ error: 'No tokens; login again' });

  try {
    const gmail = getGmailClient(tokens);

    const okId = await ensureLabel(gmail, 'me', 'OK');
    const suspiciousId = await ensureLabel(gmail, 'me', 'SUSPICIOUS');
    const phishingId = await ensureLabel(gmail, 'me', 'PHISHING_RISK');

    res.json({ okId, suspiciousId, phishingId });
  } catch (err) {
    console.error('debug-create-labels error:', err.response?.data || err);
    res.status(500).json({ error: 'Failed to create labels' });
  }
});

// ========== HELPER FUNCTIONS ==========

function generateEmailSummary(emails) {
  const summary = {
    total: emails.length,
    authenticated: 0,
    encrypted: 0,
    safe: 0,
    suspicious: 0,
    phishing: 0
  };

  emails.forEach(email => {
    if (email.securitySummary.spf === 'pass' || email.securitySummary.dkim === 'pass') {
      summary.authenticated++;
    }
    if (email.securitySummary.encrypted) {
      summary.encrypted++;
    }
    if (email.analysis.label === 'OK') summary.safe++;
    else if (email.analysis.label === 'SUSPICIOUS') summary.suspicious++;
    else if (email.analysis.label === 'PHISHING_RISK') summary.phishing++;
  });

  return summary;
}

function generateSecurityRecommendations(analysis) {
  const recommendations = [];

  if (analysis.securityChecks.spf.status === 'fail') {
    recommendations.push({
      severity: 'high',
      message: 'SPF validation failed - verify sender authenticity before trusting',
      action: 'Check sender domain and contact sender through known channels'
    });
  }

  if (analysis.securityChecks.dkim.status === 'fail') {
    recommendations.push({
      severity: 'high',
      message: 'DKIM signature invalid - email may have been tampered with',
      action: 'Do not trust email contents or click any links'
    });
  }

  if (analysis.securityChecks.dmarc.status === 'fail') {
    recommendations.push({
      severity: 'critical',
      message: 'DMARC policy failed - high risk of domain spoofing',
      action: 'Report as phishing and do not respond'
    });
  }

  if (!analysis.securityChecks.tls.encrypted) {
    recommendations.push({
      severity: 'medium',
      message: 'Email transmitted without encryption',
      action: 'Be cautious with sensitive information'
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      severity: 'low',
      message: 'All security checks passed',
      action: 'Email appears legitimate, but always verify important requests'
    });
  }

  return recommendations;
}

function calculateSecurityScore(stats) {
  if (stats.analyzed === 0) return 0;

  const spfScore = (stats.spf.pass / stats.analyzed) * 30;
  const dkimScore = (stats.dkim.pass / stats.analyzed) * 30;
  const dmarcScore = ((stats.dmarc.pass + stats.dmarc['inferred-pass']) / stats.analyzed) * 25;
  const tlsScore = (stats.tls.encrypted / stats.analyzed) * 15;

  return Math.round(spfScore + dkimScore + dmarcScore + tlsScore);
}

function generateStatsRecommendations(stats, securityScore) {
  const recommendations = [];

  if (securityScore < 50) {
    recommendations.push('Critical: Your inbox has significant security issues. Enable SPF/DKIM/DMARC for your domain.');
  } else if (securityScore < 70) {
    recommendations.push('Warning: Many emails lack proper authentication. Be cautious with unknown senders.');
  } else if (securityScore < 85) {
    recommendations.push('Good: Most emails are authenticated. Continue monitoring for suspicious activity.');
  } else {
    recommendations.push('Excellent: Your inbox shows strong email security. Keep up the good practices.');
  }

  if (stats.tls.unencrypted > stats.tls.encrypted / 2) {
    recommendations.push('Many emails are transmitted without encryption. Consider using secure email providers.');
  }

  if (stats.labels.phishing > 0) {
    recommendations.push(`${stats.labels.phishing} potential phishing emails detected. Review and report them.`);
  }

  return recommendations;
}

module.exports = router;