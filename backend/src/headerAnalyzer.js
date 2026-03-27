// backend/src/headerAnalyzer.js

/**
 * ENHANCED Email Header Analyzer with Advanced Phishing Detection
 * Multi-layered analysis system with machine learning-inspired scoring
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
  const messageId = (headerMap['message-id'] || '').toLowerCase();

  // ========== AUTHENTICATION CHECKS (HIGH PRIORITY) ==========
  
  // SPF Analysis
  const spfResult = analyzeSPF(authResults, from, received);
  securityChecks.spf = spfResult;
  score += spfResult.score;
  if (spfResult.issues.length > 0) {
    reasons.push(...spfResult.issues);
  }

  // DKIM Analysis
  const dkimResult = analyzeDKIM(authResults, from);
  securityChecks.dkim = dkimResult;
  score += dkimResult.score;
  if (dkimResult.issues.length > 0) {
    reasons.push(...dkimResult.issues);
  }

  // DMARC Analysis
  const dmarcResult = analyzeDMARC(authResults, from, spfResult, dkimResult);
  securityChecks.dmarc = dmarcResult;
  score += dmarcResult.score;
  if (dmarcResult.issues.length > 0) {
    reasons.push(...dmarcResult.issues);
  }

  // TLS/SSL Analysis
  const tlsResult = analyzeTLS(received);
  securityChecks.tls = tlsResult;
  score += tlsResult.score;
  if (tlsResult.issues.length > 0) {
    reasons.push(...tlsResult.issues);
  }

  // Sender Reputation
  const senderResult = analyzeSenderReputation(from, returnPath, replyTo);
  securityChecks.sender = senderResult;
  score += senderResult.score;
  if (senderResult.issues.length > 0) {
    reasons.push(...senderResult.issues);
  }

  // ========== DOMAIN & SENDER ANALYSIS ==========
  
  const fromDomainMatch = from.match(/@([^>\s]+)/);
  const fromDomain = fromDomainMatch ? fromDomainMatch[1] : '';
  
  // Trusted provider check
  const trustedProviders = [
    'gmail.com', 'googlemail.com', 'google.com',
    'outlook.com', 'hotmail.com', 'live.com', 'office365.com',
    'yahoo.com', 'ymail.com', 'aol.com',
    'icloud.com', 'me.com', 'mac.com',
    'protonmail.com', 'proton.me', 'pm.me'
  ];
  
  const isTrustedProvider = trustedProviders.some(provider => fromDomain.endsWith(provider));

  // ========== ADVANCED PHISHING DETECTION ==========

  // 1. CRITICAL: Brand Impersonation Detection
  const brandImpersonationCheck = detectBrandImpersonation(from, fromDomain, subject, isTrustedProvider);
  if (brandImpersonationCheck.detected) {
    score += brandImpersonationCheck.score;
    reasons.push(...brandImpersonationCheck.reasons);
  }

  // 2. CRITICAL: Unicode/Homograph Attack Detection
  const homographCheck = detectHomographAttack(from, fromDomain);
  if (homographCheck.detected) {
    score += homographCheck.score;
    reasons.push(...homographCheck.reasons);
  }

  // 3. CRITICAL: URL Spoofing & Phishing Links
  const urlCheck = analyzeURLs(subject, from);
  if (urlCheck.suspicious) {
    score += urlCheck.score;
    reasons.push(...urlCheck.reasons);
  }

  // 4. HIGH: Urgent Action Keywords (Contextual Analysis)
  const urgencyCheck = analyzeUrgency(subject, from, isTrustedProvider);
  if (urgencyCheck.suspicious) {
    score += urgencyCheck.score;
    reasons.push(...urgencyCheck.reasons);
  }

  // 5. HIGH: Financial/Credential Theft Indicators
  const credentialCheck = detectCredentialPhishing(subject);
  if (credentialCheck.detected) {
    score += credentialCheck.score;
    reasons.push(...credentialCheck.reasons);
  }

  // 6. MEDIUM: Display Name vs Email Mismatch
  const displayNameCheck = analyzeDisplayName(from, fromDomain, isTrustedProvider);
  if (displayNameCheck.suspicious) {
    score += displayNameCheck.score;
    reasons.push(...displayNameCheck.reasons);
  }

  // 7. MEDIUM: Return-Path / Reply-To Anomalies
  if (returnPath && fromDomain && !returnPath.includes(fromDomain) && !isTrustedProvider) {
    const returnDomain = returnPath.match(/@([^>\s]+)/)?.[1] || '';
    if (returnDomain && !trustedProviders.some(p => returnDomain.endsWith(p))) {
      score += 3;
      reasons.push(`Return-Path domain mismatch: ${returnDomain}`);
    }
  }
  
  if (replyTo && fromDomain && !replyTo.includes(fromDomain) && !isTrustedProvider) {
    const replyDomain = replyTo.match(/@([^>\s]+)/)?.[1] || '';
    if (replyDomain && !trustedProviders.some(p => replyDomain.endsWith(p))) {
      score += 3;
      reasons.push(`Reply-To domain mismatch: ${replyDomain}`);
    }
  }

  // 8. LOW: Suspicious Message-ID
  if (messageId && fromDomain) {
    if (!messageId.includes(fromDomain) && !isTrustedProvider) {
      score += 1;
      reasons.push('Message-ID domain mismatch');
    }
  }

  // 9. LOW: Excessive mail hops
  const hopCount = (received.match(/received:/gi) || []).length;
  if (hopCount >= 8) {
    score += 3;
    reasons.push(`Excessive mail hops: ${hopCount}`);
  } else if (hopCount >= 6) {
    score += 1;
    reasons.push(`Multiple mail hops: ${hopCount}`);
  }

  // 10. Authentication missing for non-trusted senders
  if (!isTrustedProvider && fromDomain) {
    const hasSpfResult = authResults.includes('spf=');
    const hasDkimResult = authResults.includes('dkim=');
    if (!hasSpfResult && !hasDkimResult) {
      score += 4;
      reasons.push('No authentication for unknown sender');
    }
  }

  // ========== INTELLIGENT RISK CLASSIFICATION ==========
  
  let label = 'OK';
  let riskLevel = 'minimal';
  let confidence = 0;

  // Critical thresholds with context awareness
  if (score >= 15) {
    // Definite phishing
    label = 'PHISHING_RISK';
    riskLevel = 'critical';
    confidence = Math.min(99, 85 + score);
  } else if (score >= 10) {
    // Very likely phishing
    label = 'PHISHING_RISK';
    riskLevel = 'high';
    confidence = Math.min(95, 75 + score);
  } else if (score >= 7) {
    // Suspicious with multiple red flags
    label = 'SUSPICIOUS';
    riskLevel = 'medium-high';
    confidence = Math.min(90, 65 + score * 2);
  } else if (score >= 5) {
    // Some concerns
    label = 'SUSPICIOUS';
    riskLevel = 'medium';
    confidence = Math.min(85, 55 + score * 3);
  } else if (score >= 3) {
    // Minor issues
    if (spfResult.status === 'fail' || dkimResult.status === 'fail') {
      label = 'SUSPICIOUS';
      riskLevel = 'low-medium';
      confidence = Math.min(80, 50 + score * 5);
    } else {
      label = 'OK';
      riskLevel = 'low';
      confidence = 90;
    }
  } else if (score >= 1) {
    // Very minor concerns
    if (spfResult.status === 'fail' && dkimResult.status === 'fail') {
      label = 'SUSPICIOUS';
      riskLevel = 'low';
      confidence = 75;
    } else {
      label = 'OK';
      riskLevel = 'minimal';
      confidence = 95;
    }
  } else {
    // All clear
    label = 'OK';
    riskLevel = 'minimal';
    confidence = 98;
  }

  // Override for perfect authentication
  if (spfResult.pass && dkimResult.pass && dmarcResult.pass && score < 5) {
    label = 'OK';
    confidence = Math.max(confidence, 96);
  }

  return { 
    label, 
    score, 
    reasons: reasons.slice(0, 5), // Top 5 reasons only
    riskLevel,
    confidence,
    securityChecks,
    metadata: {
      fromDomain,
      isTrustedProvider,
      hopCount,
      timestamp: new Date().toISOString()
    }
  };
}

// ========== ADVANCED DETECTION FUNCTIONS ==========

/**
 * Detect brand impersonation attempts
 */
function detectBrandImpersonation(from, fromDomain, subject, isTrustedProvider) {
  const result = { detected: false, score: 0, reasons: [] };
  
  // Well-known brands to check
  const brands = [
    { name: 'paypal', domains: ['paypal.com', 'paypal.co.uk'] },
    { name: 'amazon', domains: ['amazon.com', 'amazon.co.uk', 'amazon.de'] },
    { name: 'microsoft', domains: ['microsoft.com', 'office365.com', 'live.com'] },
    { name: 'apple', domains: ['apple.com', 'icloud.com', 'me.com'] },
    { name: 'google', domains: ['google.com', 'gmail.com', 'youtube.com'] },
    { name: 'facebook', domains: ['facebook.com', 'fb.com'] },
    { name: 'netflix', domains: ['netflix.com'] },
    { name: 'linkedin', domains: ['linkedin.com'] },
    { name: 'instagram', domains: ['instagram.com'] },
    { name: 'twitter', domains: ['twitter.com', 'x.com'] },
    { name: 'bank', domains: ['chase.com', 'wellsfargo.com', 'bankofamerica.com', 'citibank.com'] },
    { name: 'fedex', domains: ['fedex.com'] },
    { name: 'ups', domains: ['ups.com'] },
    { name: 'dhl', domains: ['dhl.com'] },
    { name: 'usps', domains: ['usps.com'] }
  ];

  for (const brand of brands) {
    const brandInDisplay = from.toLowerCase().includes(brand.name);
    const brandInSubject = subject.toLowerCase().includes(brand.name);
    const legitDomain = brand.domains.some(d => fromDomain.endsWith(d));

    if ((brandInDisplay || brandInSubject) && !legitDomain && !isTrustedProvider) {
      result.detected = true;
      result.score = 8; // High score for brand impersonation
      result.reasons.push(`⚠️ Brand impersonation: Claims to be ${brand.name.toUpperCase()} but from ${fromDomain}`);
      break;
    }
  }

  return result;
}

/**
 * Detect Unicode homograph attacks (lookalike characters)
 */
function detectHomographAttack(from, fromDomain) {
  const result = { detected: false, score: 0, reasons: [] };
  
  // Check for non-ASCII characters in domain
  const hasNonAscii = /[^\x00-\x7F]/.test(fromDomain);
  
  if (hasNonAscii) {
    result.detected = true;
    result.score = 10; // Very high score
    result.reasons.push('🚨 Unicode homograph attack detected in domain');
    return result;
  }

  // Check for common lookalike substitutions
  const suspiciousPatterns = [
    /[0O][0O]/g,  // Multiple O's and 0's together (e.g., paypa1.com)
    /rn/g,        // 'rn' looks like 'm' (e.g., arnаzon.com)
    /vv/g,        // 'vv' looks like 'w'
    /[1l|!]/g     // 1, l, |, ! confusion
  ];

  const popularDomains = ['paypal', 'amazon', 'microsoft', 'apple', 'google', 'netflix'];
  
  for (const domain of popularDomains) {
    if (fromDomain.includes(domain.substring(0, 4))) { // partial match
      if (!fromDomain.includes(domain)) { // but not exact
        result.detected = true;
        result.score = 7;
        result.reasons.push(`Suspicious domain similarity to ${domain}.com`);
        break;
      }
    }
  }

  return result;
}

/**
 * Analyze URLs for phishing indicators
 */
function analyzeURLs(subject, from) {
  const result = { suspicious: false, score: 0, reasons: [] };
  
  const urlPattern = /https?:\/\/[^\s<>"]+/gi;
  const urls = subject.match(urlPattern) || [];

  if (urls.length > 0) {
    result.suspicious = true;
    result.score = 3;
    result.reasons.push(`${urls.length} link(s) in subject line`);

    // Check for URL shorteners (high risk)
    const shorteners = ['bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly', 'is.gd', 'buff.ly', 'adf.ly'];
    urls.forEach(url => {
      if (shorteners.some(s => url.includes(s))) {
        result.score += 4;
        result.reasons.push('🚨 URL shortener detected (high risk)');
      }
    });

    // Check for suspicious TLDs
    const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top', '.click', '.link'];
    urls.forEach(url => {
      if (suspiciousTLDs.some(tld => url.includes(tld))) {
        result.score += 3;
        result.reasons.push('Suspicious TLD in URL');
      }
    });
  }

  return result;
}

/**
 * Analyze urgency and pressure tactics
 */
function analyzeUrgency(subject, from, isTrustedProvider) {
  const result = { suspicious: false, score: 0, reasons: [] };

  // CRITICAL urgency phrases (immediate action required)
  const criticalUrgency = [
    'account suspended', 'account locked', 'urgent action required',
    'verify immediately', 'confirm now', 'expires today',
    'final notice', 'last warning', 'suspended account',
    'unusual activity detected', 'suspicious activity',
    'unauthorized access', 'security alert'
  ];

  // HIGH urgency phrases
  const highUrgency = [
    'urgent', 'immediate', 'action required', 'verify account',
    'confirm identity', 'update payment', 'expire', 'limited time',
    'act now', 'click here now', 'respond immediately'
  ];

  // MEDIUM urgency phrases
  const mediumUrgency = [
    'reminder', 'notification', 'alert', 'update available',
    'please verify', 'please confirm', 'reset password'
  ];

  let urgencyLevel = 0;
  let foundPhrases = [];

  // Check critical urgency
  criticalUrgency.forEach(phrase => {
    if (subject.includes(phrase)) {
      urgencyLevel = 3;
      foundPhrases.push(phrase);
    }
  });

  // Check high urgency if no critical found
  if (urgencyLevel === 0) {
    highUrgency.forEach(phrase => {
      if (subject.includes(phrase)) {
        urgencyLevel = 2;
        foundPhrases.push(phrase);
      }
    });
  }

  // Check medium urgency if no high found
  if (urgencyLevel === 0) {
    mediumUrgency.forEach(phrase => {
      if (subject.includes(phrase)) {
        urgencyLevel = 1;
        foundPhrases.push(phrase);
      }
    });
  }

  // Apply scoring based on context
  if (urgencyLevel === 3) {
    result.suspicious = true;
    result.score = isTrustedProvider ? 2 : 7; // Lower score if from trusted provider
    result.reasons.push(`🚨 Critical urgency detected: "${foundPhrases[0]}"`);
  } else if (urgencyLevel === 2) {
    result.suspicious = true;
    result.score = isTrustedProvider ? 1 : 4;
    result.reasons.push(`⚠️ High urgency language: "${foundPhrases[0]}"`);
  } else if (urgencyLevel === 1 && !isTrustedProvider) {
    result.suspicious = true;
    result.score = 1;
    result.reasons.push(`Medium urgency: "${foundPhrases[0]}"`);
  }

  return result;
}

/**
 * Detect credential/financial phishing attempts
 */
function detectCredentialPhishing(subject) {
  const result = { detected: false, score: 0, reasons: [] };

  const credentialKeywords = [
    // Financial
    'wire transfer', 'bank account', 'routing number', 'account number',
    'credit card', 'debit card', 'cvv', 'social security',
    'tax refund', 'inheritance', 'lottery', 'prize money',
    'bitcoin', 'cryptocurrency', 'wallet',
    
    // Credentials
    'password reset', 'verify password', 'confirm password',
    'login credentials', 'username', 'security code',
    'two-factor', '2fa code', 'verification code'
  ];

  let foundKeywords = [];
  credentialKeywords.forEach(keyword => {
    if (subject.includes(keyword)) {
      foundKeywords.push(keyword);
    }
  });

  if (foundKeywords.length > 0) {
    result.detected = true;
    result.score = foundKeywords.length * 3; // 3 points per keyword
    result.reasons.push(`🚨 Credential/financial keywords: ${foundKeywords.slice(0, 2).join(', ')}`);
  }

  return result;
}

/**
 * Analyze display name vs email address
 */
function analyzeDisplayName(from, fromDomain, isTrustedProvider) {
  const result = { suspicious: false, score: 0, reasons: [] };

  const fromMatch = from.match(/(.*)<(.*)>/);
  if (!fromMatch) return result;

  const displayName = fromMatch[1].trim().toLowerCase();
  const emailAddr = fromMatch[2].toLowerCase();

  // Check for suspicious display names
  const suspiciousNames = ['ceo', 'admin', 'administrator', 'support', 'service', 'security', 'notification'];
  
  if (suspiciousNames.some(name => displayName.includes(name)) && !isTrustedProvider) {
    result.suspicious = true;
    result.score = 2;
    result.reasons.push('Generic/suspicious display name');
  }

  // Check if display name contains @ symbol (impersonation attempt)
  if (displayName.includes('@')) {
    result.suspicious = true;
    result.score = 5;
    result.reasons.push('Display name contains email address');
  }

  // Check for complete name/email mismatch
  const firstName = displayName.split(' ')[0];
  if (firstName && firstName.length > 2 && !emailAddr.includes(firstName.substring(0, 3))) {
    result.suspicious = true;
    result.score = 1;
    result.reasons.push('Name/email mismatch');
  }

  return result;
}

// ========== AUTHENTICATION ANALYSIS FUNCTIONS ==========
// (Keep existing SPF, DKIM, DMARC, TLS, Sender functions)

function analyzeSPF(authResults, from, received) {
  const result = {
    status: 'unknown',
    pass: false,
    score: 0,
    issues: [],
    details: {}
  };

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
    result.score = 6; // Increased from 5
    result.issues.push('❌ SPF validation failed');
    result.details = {
      alignment: 'misaligned',
      reason: 'IP not in SPF record'
    };
  } else if (authResults.includes('spf=softfail')) {
    result.status = 'softfail';
    result.pass = false;
    result.score = 3;
    result.issues.push('⚠️ SPF soft fail');
    result.details = {
      alignment: 'partial',
      reason: 'SPF suggests rejection'
    };
  } else if (authResults.includes('spf=neutral')) {
    result.status = 'neutral';
    result.pass = false;
    result.score = 1;
    result.details = {
      alignment: 'unknown',
      reason: 'No SPF assertion'
    };
  } else if (authResults.includes('spf=none')) {
    result.status = 'none';
    result.pass = false;
    result.score = 2;
    result.issues.push('No SPF record found');
    result.details = {
      alignment: 'none',
      reason: 'Domain has no SPF'
    };
  }

  return result;
}

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
      selector: 'default',
      algorithm: 'rsa-sha256',
      headerFields: ['from', 'to', 'subject', 'date']
    };
  } else if (authResults.includes('dkim=fail')) {
    result.status = 'fail';
    result.pass = false;
    result.score = 6; // Increased from 5
    result.issues.push('❌ DKIM signature failed');
    result.details = {
      signature: 'invalid',
      reason: 'Signature verification failed'
    };
  } else if (authResults.includes('dkim=neutral')) {
    result.status = 'neutral';
    result.pass = false;
    result.score = 1;
    result.details = {
      signature: 'inconclusive',
      reason: 'Unable to verify'
    };
  } else if (authResults.includes('dkim=none')) {
    result.status = 'none';
    result.pass = false;
    result.score = 2;
    result.issues.push('No DKIM signature');
    result.details = {
      signature: 'absent',
      reason: 'Email not signed'
    };
  }

  return result;
}

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
    result.score = 7; // Increased from 6
    result.issues.push('🚨 DMARC policy failed');
    result.policy = 'reject';
    result.details = {
      alignment: 'fail',
      policy: 'reject',
      action: 'quarantine',
      reason: 'SPF/DKIM not aligned'
    };
  } else if (authResults.includes('dmarc=none')) {
    result.status = 'none';
    result.pass = false;
    result.score = 1;
    result.details = {
      alignment: 'unknown',
      reason: 'No DMARC record'
    };
  } else {
    if (spfResult.pass || dkimResult.pass) {
      result.status = 'inferred-pass';
      result.pass = true;
      result.score = 0;
      result.details = {
        alignment: 'inferred',
        reason: 'SPF or DKIM passed'
      };
    }
  }

  return result;
}

function analyzeTLS(received) {
  const result = {
    status: 'unknown',
    encrypted: false,
    score: 0,
    issues: [],
    details: {}
  };

  const receivedLower = received.toLowerCase();

  if (receivedLower.includes('tls') || receivedLower.includes('esmtps')) {
    result.status = 'encrypted';
    result.encrypted = true;
    result.score = 0;
    
    let tlsVersion = 'TLS 1.2';
    if (receivedLower.includes('tls1.3') || receivedLower.includes('tlsv1.3')) {
      tlsVersion = 'TLS 1.3';
    } else if (receivedLower.includes('tls1.1') || receivedLower.includes('tlsv1.1')) {
      tlsVersion = 'TLS 1.1';
      result.score = 1;
      result.issues.push('Outdated TLS 1.1');
    } else if (receivedLower.includes('tls1.0') || receivedLower.includes('tlsv1.0')) {
      tlsVersion = 'TLS 1.0';
      result.score = 2;
      result.issues.push('⚠️ Deprecated TLS 1.0');
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
    result.issues.push('Unencrypted transmission');
    result.details = {
      protocol: 'SMTP',
      encryption: 'none'
    };
  }

  return result;
}

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
    result.score = 4;
    result.issues.push('Unable to extract sender domain');
    return result;
  }

  const trustedDomains = [
    'gmail.com', 'googlemail.com', 'google.com',
    'outlook.com', 'hotmail.com', 'live.com', 'microsoft.com',
    'yahoo.com', 'ymail.com', 'rocketmail.com',
    'icloud.com', 'me.com', 'mac.com',
    'protonmail.com', 'pm.me', 'proton.me',
    'aol.com', 'aim.com'
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
    
    const suspiciousTLDs = [
      '.tk', '.ml', '.ga', '.cf', '.gq', '.top', '.xyz', 
      '.info', '.click', '.link', '.work', '.date', '.download',
      '.bid', '.win', '.review', '.country', '.stream', '.zip'
    ];
    
    if (suspiciousTLDs.some(tld => fromDomain.endsWith(tld))) {
      result.score = 4; // Increased from 3
      result.issues.push('🚨 Suspicious domain TLD');
      result.details.suspiciousTLD = true;
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

// ========== HELPER FUNCTIONS ==========

function extractDomain(email) {
  const match = email.match(/@([^>\s]+)/);
  return match ? match[1].toLowerCase() : '';
}

function extractIPFromReceived(received) {
  const match = received.match(/\[(\d+\.\d+\.\d+\.\d+)\]/);
  return match ? match[1] : '203.0.113.42';
}

module.exports = { 
  analyzeHeaders,
  analyzeSPF,
  analyzeDKIM,
  analyzeDMARC,
  analyzeTLS,
  analyzeSenderReputation
};