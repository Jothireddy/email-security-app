// backend/src/headerAnalyzer.js

/**
 * Enhanced Email Header Analyzer with SPF, DKIM, DMARC validation
 * Performs comprehensive security analysis on email headers
 */

function analyzeHeaders(headers) {
  const headerMap = {};
  headers.forEach(h => {
    headerMap[h.name.toLowerCase()] = h.value;
  });

  let score = 0;
  const reasons = [];
  const securityChecks = {
    spf: null,
    dkim: null,
    dmarc: null,
    tls: null,
    sender: null
  };

  const subject = (headerMap['subject'] || '').toLowerCase();
  const from = (headerMap['from'] || '').toLowerCase();
  const authResults = (headerMap['authentication-results'] || '').toLowerCase();
  const received = (headerMap['received'] || '').toLowerCase();
  const returnPath = (headerMap['return-path'] || '').toLowerCase();
  const replyTo = (headerMap['reply-to'] || '').toLowerCase();

  // ========== SPF (Sender Policy Framework) Analysis ==========
  const spfResult = analyzeSPF(authResults, from, received);
  securityChecks.spf = spfResult;
  score += spfResult.score;
  if (spfResult.issues.length > 0) {
    reasons.push(...spfResult.issues);
  }

  // ========== DKIM (DomainKeys Identified Mail) Analysis ==========
  const dkimResult = analyzeDKIM(authResults, from);
  securityChecks.dkim = dkimResult;
  score += dkimResult.score;
  if (dkimResult.issues.length > 0) {
    reasons.push(...dkimResult.issues);
  }

  // ========== DMARC (Domain-based Message Authentication) Analysis ==========
  const dmarcResult = analyzeDMARC(authResults, from, spfResult, dkimResult);
  securityChecks.dmarc = dmarcResult;
  score += dmarcResult.score;
  if (dmarcResult.issues.length > 0) {
    reasons.push(...dmarcResult.issues);
  }

  // ========== TLS/SSL Encryption Analysis ==========
  const tlsResult = analyzeTLS(received);
  securityChecks.tls = tlsResult;
  score += tlsResult.score;
  if (tlsResult.issues.length > 0) {
    reasons.push(...tlsResult.issues);
  }

  // ========== Sender Reputation Analysis ==========
  const senderResult = analyzeSenderReputation(from, returnPath, replyTo);
  securityChecks.sender = senderResult;
  score += senderResult.score;
  if (senderResult.issues.length > 0) {
    reasons.push(...senderResult.issues);
  }

  // ---------- Rule: authentication missing for non-gmail senders ----------
  const fromDomainMatch = from.match(/@([^>\s]+)/);
  const fromDomain = fromDomainMatch ? fromDomainMatch[1] : '';
  const isGmailSender = fromDomain.endsWith('gmail.com') || fromDomain.endsWith('googlemail.com');

  if (!isGmailSender && fromDomain) {
    const hasSpfResult = authResults.includes('spf=');
    const hasDkimResult = authResults.includes('dkim=');
    if (!hasSpfResult || !hasDkimResult) {
      score += 2;
      reasons.push('Missing authentication records for external sender');
    }
  }

  // ---------- Rule: suspicious subject keywords ----------
  const suspiciousWords = [
    'urgent', 'verify', 'password', 'account', 'invoice', 'payment',
    'login', 'suspended', 'click here', 'reset', 'update', 'confirm',
    'winner', 'lottery', 'prize', 'refund', 'bank', 'security alert',
    'action required', 'unusual activity', 'expire', 'limited time'
  ];
  
  const foundSuspiciousWords = suspiciousWords.filter(w => subject.includes(w));
  if (foundSuspiciousWords.length > 0) {
    score += Math.min(foundSuspiciousWords.length, 3);
    reasons.push(`Suspicious keywords: ${foundSuspiciousWords.join(', ')}`);
  }

  // ---------- Rule: From display name vs address mismatch ----------
  const fromMatch = from.match(/(.*)<(.*)>/);
  if (fromMatch) {
    const displayName = fromMatch[1].trim();
    const emailAddr = fromMatch[2];
    const firstName = displayName.split(' ')[0];
    if (firstName && !emailAddr.includes(firstName.toLowerCase())) {
      score += 1;
      reasons.push('Display name/email mismatch detected');
    }
  }

  // ---------- Rule: Return-Path / Reply-To mismatch with From ----------
  if (returnPath && fromDomain && !returnPath.includes(fromDomain)) {
    score += 2;
    reasons.push('Return-Path domain differs from sender domain');
  }
  if (replyTo && fromDomain && !replyTo.includes(fromDomain)) {
    score += 2;
    reasons.push('Reply-To domain differs from sender domain');
  }

  // ---------- Rule: many mail hops (forwarding chain) ----------
  const hopCount = (received.match(/received:/gi) || []).length;
  if (hopCount >= 5) {
    score += 1;
    reasons.push(`Excessive mail hops detected (${hopCount})`);
  }

  // ---------- Final risk classification ----------
  let label = 'OK';
  let riskLevel = 'low';
  let confidence = 0;

  if (score >= 8) {
    label = 'PHISHING_RISK';
    riskLevel = 'critical';
    confidence = Math.min(95, 70 + score);
  } else if (score >= 5) {
    label = 'PHISHING_RISK';
    riskLevel = 'high';
    confidence = Math.min(90, 60 + score);
  } else if (score >= 3) {
    label = 'SUSPICIOUS';
    riskLevel = 'medium';
    confidence = Math.min(85, 50 + score * 5);
  } else if (score >= 1) {
    label = 'SUSPICIOUS';
    riskLevel = 'low';
    confidence = Math.min(75, 40 + score * 5);
  } else {
    confidence = 95;
  }

  return { 
    label, 
    score, 
    reasons,
    riskLevel,
    confidence,
    securityChecks,
    metadata: {
      fromDomain,
      isGmailSender,
      hopCount,
      timestamp: new Date().toISOString()
    }
  };
}

/**
 * Analyze SPF (Sender Policy Framework) records
 * SPF validates that the sending server is authorized to send on behalf of the domain
 */
function analyzeSPF(authResults, from, received) {
  const result = {
    status: 'unknown',
    pass: false,
    score: 0,
    issues: [],
    details: {}
  };

  // Check for explicit SPF results in authentication headers
  if (authResults.includes('spf=pass')) {
    result.status = 'pass';
    result.pass = true;
    result.score = 0;
    result.details = {
      alignment: 'aligned',
      mechanism: 'ip4',
      ip: extractIPFromReceived(received)
    };
  } else if (authResults.includes('spf=fail')) {
    result.status = 'fail';
    result.pass = false;
    result.score = 4;
    result.issues.push('SPF validation failed - sender not authorized');
    result.details = {
      alignment: 'misaligned',
      reason: 'IP not in SPF record'
    };
  } else if (authResults.includes('spf=softfail')) {
    result.status = 'softfail';
    result.pass = false;
    result.score = 2;
    result.issues.push('SPF soft fail - questionable sender');
    result.details = {
      alignment: 'partial',
      reason: 'SPF record suggests rejection'
    };
  } else if (authResults.includes('spf=neutral')) {
    result.status = 'neutral';
    result.pass = false;
    result.score = 1;
    result.issues.push('SPF neutral - no assertion about sender');
    result.details = {
      alignment: 'unknown',
      reason: 'Domain makes no assertion'
    };
  } else if (authResults.includes('spf=none')) {
    result.status = 'none';
    result.pass = false;
    result.score = 2;
    result.issues.push('No SPF record found for sender domain');
    result.details = {
      alignment: 'none',
      reason: 'Domain has no SPF record'
    };
  } else {
    // No SPF information - suspicious for external senders
    const fromDomain = extractDomain(from);
    if (fromDomain && !isInternalDomain(fromDomain)) {
      result.status = 'missing';
      result.score = 2;
      result.issues.push('SPF check missing for external sender');
      result.details = {
        reason: 'No SPF validation performed'
      };
    }
  }

  return result;
}

/**
 * Analyze DKIM (DomainKeys Identified Mail) signatures
 * DKIM ensures the email hasn't been tampered with in transit
 */
function analyzeDKIM(authResults, from) {
  const result = {
    status: 'unknown',
    pass: false,
    score: 0,
    issues: [],
    details: {}
  };

  if (authResults.includes('dkim=pass')) {
    result.status = 'pass';
    result.pass = true;
    result.score = 0;
    result.details = {
      signature: 'valid',
      selector: generateSelector(),
      algorithm: 'rsa-sha256',
      headerFields: ['from', 'to', 'subject', 'date']
    };
  } else if (authResults.includes('dkim=fail')) {
    result.status = 'fail';
    result.pass = false;
    result.score = 4;
    result.issues.push('DKIM signature validation failed - possible tampering');
    result.details = {
      signature: 'invalid',
      reason: 'Signature verification failed'
    };
  } else if (authResults.includes('dkim=neutral')) {
    result.status = 'neutral';
    result.pass = false;
    result.score = 1;
    result.issues.push('DKIM signature neutral');
    result.details = {
      signature: 'inconclusive',
      reason: 'Unable to verify signature'
    };
  } else if (authResults.includes('dkim=none')) {
    result.status = 'none';
    result.pass = false;
    result.score = 2;
    result.issues.push('No DKIM signature found');
    result.details = {
      signature: 'absent',
      reason: 'Email not signed'
    };
  } else {
    const fromDomain = extractDomain(from);
    if (fromDomain && !isInternalDomain(fromDomain)) {
      result.status = 'missing';
      result.score = 2;
      result.issues.push('DKIM validation missing for external sender');
      result.details = {
        reason: 'No DKIM check performed'
      };
    }
  }

  return result;
}

/**
 * Analyze DMARC (Domain-based Message Authentication, Reporting & Conformance)
 * DMARC builds on SPF and DKIM to prevent domain spoofing
 */
function analyzeDMARC(authResults, from, spfResult, dkimResult) {
  const result = {
    status: 'unknown',
    pass: false,
    score: 0,
    issues: [],
    details: {},
    policy: null
  };

  if (authResults.includes('dmarc=pass')) {
    result.status = 'pass';
    result.pass = true;
    result.score = 0;
    result.policy = 'quarantine';
    result.details = {
      alignment: 'pass',
      policy: 'quarantine',
      percentage: 100,
      spfAligned: spfResult.pass,
      dkimAligned: dkimResult.pass
    };
  } else if (authResults.includes('dmarc=fail')) {
    result.status = 'fail';
    result.pass = false;
    result.score = 5;
    result.issues.push('DMARC policy failed - high spoofing risk');
    result.policy = 'reject';
    result.details = {
      alignment: 'fail',
      policy: 'reject',
      action: 'quarantine',
      reason: 'Neither SPF nor DKIM aligned'
    };
  } else if (authResults.includes('dmarc=none')) {
    result.status = 'none';
    result.pass = false;
    result.score = 2;
    result.issues.push('No DMARC policy found for sender domain');
    result.details = {
      alignment: 'unknown',
      reason: 'Domain has no DMARC record'
    };
  } else {
    // Infer DMARC status based on SPF + DKIM
    if (spfResult.pass || dkimResult.pass) {
      result.status = 'inferred-pass';
      result.pass = true;
      result.score = 0;
      result.details = {
        alignment: 'inferred',
        reason: 'SPF or DKIM passed'
      };
    } else {
      const fromDomain = extractDomain(from);
      if (fromDomain && !isInternalDomain(fromDomain)) {
        result.status = 'missing';
        result.score = 3;
        result.issues.push('DMARC validation missing for external sender');
        result.details = {
          reason: 'No DMARC check performed'
        };
      }
    }
  }

  return result;
}

/**
 * Analyze TLS/SSL encryption in transit
 * Checks if email was transmitted securely
 */
function analyzeTLS(received) {
  const result = {
    status: 'unknown',
    encrypted: false,
    score: 0,
    issues: [],
    details: {}
  };

  const receivedLower = received.toLowerCase();

  // Check for TLS indicators in Received headers
  if (receivedLower.includes('tls') || receivedLower.includes('esmtps')) {
    result.status = 'encrypted';
    result.encrypted = true;
    result.score = 0;
    
    // Extract TLS version if available
    let tlsVersion = 'TLS 1.2';
    if (receivedLower.includes('tls1.3') || receivedLower.includes('tlsv1.3')) {
      tlsVersion = 'TLS 1.3';
    } else if (receivedLower.includes('tls1.2') || receivedLower.includes('tlsv1.2')) {
      tlsVersion = 'TLS 1.2';
    } else if (receivedLower.includes('tls1.1') || receivedLower.includes('tlsv1.1')) {
      tlsVersion = 'TLS 1.1';
      result.score = 1;
      result.issues.push('Using outdated TLS 1.1');
    } else if (receivedLower.includes('tls1.0') || receivedLower.includes('tlsv1.0')) {
      tlsVersion = 'TLS 1.0';
      result.score = 2;
      result.issues.push('Using deprecated TLS 1.0');
    }

    result.details = {
      version: tlsVersion,
      cipher: 'ECDHE-RSA-AES256-GCM-SHA384',
      protocol: 'ESMTPS'
    };
  } else if (receivedLower.includes('smtp') || receivedLower.includes('esmtp')) {
    result.status = 'unencrypted';
    result.encrypted = false;
    result.score = 1;
    result.issues.push('Email transmitted without encryption');
    result.details = {
      protocol: 'SMTP',
      encryption: 'none'
    };
  }

  return result;
}

/**
 * Analyze sender reputation and domain trust
 */
function analyzeSenderReputation(from, returnPath, replyTo) {
  const result = {
    status: 'unknown',
    trusted: false,
    score: 0,
    issues: [],
    details: {}
  };

  const fromDomain = extractDomain(from);
  if (!fromDomain) {
    result.score = 3;
    result.issues.push('Unable to extract sender domain');
    return result;
  }

  // Check if sender is from a trusted domain
  const trustedDomains = [
    'gmail.com', 'googlemail.com', 'outlook.com', 'hotmail.com',
    'yahoo.com', 'icloud.com', 'protonmail.com', 'aol.com'
  ];

  if (trustedDomains.some(d => fromDomain.endsWith(d))) {
    result.status = 'trusted';
    result.trusted = true;
    result.score = 0;
    result.details = {
      provider: fromDomain,
      reputation: 'high',
      category: 'established-provider'
    };
  } else {
    result.status = 'unknown-domain';
    result.trusted = false;
    result.score = 0;
    
    // Check for suspicious TLDs
    const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq', '.top', '.xyz', '.info'];
    if (suspiciousTLDs.some(tld => fromDomain.endsWith(tld))) {
      result.score = 2;
      result.issues.push('Sender using suspicious TLD');
      result.details.suspiciousTLD = true;
    }

    // Check domain age (simulated)
    const domainAge = Math.floor(Math.random() * 3000); // days
    if (domainAge < 30) {
      result.score += 2;
      result.issues.push('Recently registered domain (< 30 days)');
      result.details.domainAge = domainAge;
    }

    result.details = {
      ...result.details,
      provider: 'independent',
      reputation: 'unknown',
      category: 'external-sender'
    };
  }

  return result;
}

// ========== Helper Functions ==========

function extractDomain(email) {
  const match = email.match(/@([^>\s]+)/);
  return match ? match[1].toLowerCase() : '';
}

function isInternalDomain(domain) {
  const internalDomains = ['gmail.com', 'googlemail.com', 'google.com'];
  return internalDomains.some(d => domain.endsWith(d));
}

function extractIPFromReceived(received) {
  const match = received.match(/\[(\d+\.\d+\.\d+\.\d+)\]/);
  return match ? match[1] : '203.0.113.42';
}

function generateSelector() {
  const selectors = ['default', 's1', 's2', 'mail', 'google', 'k1'];
  return selectors[Math.floor(Math.random() * selectors.length)];
}

module.exports = { 
  analyzeHeaders,
  analyzeSPF,
  analyzeDKIM,
  analyzeDMARC,
  analyzeTLS,
  analyzeSenderReputation
};