// backend/src/autoLabeler.js

const cron = require('node-cron');
const { getAllUsers, getUserTokens, isMessageProcessed, markMessageProcessed, updateAuthStats } = require('./userStore');
const { getGmailClient } = require('./googleClient');
const { analyzeHeaders } = require('./headerAnalyzer');
const { ensureLabel } = require('./gmailHelpers');

/**
 * Auto-labeling service with comprehensive email security analysis
 * Features:
 * - SPF, DKIM, DMARC validation
 * - TLS encryption checking
 * - Sender reputation analysis
 * - Automatic phishing/suspicious email detection
 * - Real-time statistics tracking
 */

// Statistics tracking
const sessionStats = {
  startTime: new Date(),
  totalScans: 0,
  totalProcessed: 0,
  phishingDetected: 0,
  suspiciousDetected: 0,
  safeEmails: 0,
  authenticationPassed: 0,
  authenticationFailed: 0
};


cron.schedule('*/30 * * * * *', async () => {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║  🔍 AUTO-LABELER: Email Security Scan Started              ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  
  sessionStats.totalScans++;
  const users = getAllUsers();

  if (users.length === 0) {
    console.log('[AutoLabeler] ℹ️  No users registered. Waiting for authentication...');
    return;
  }

  console.log(`[AutoLabeler] 👥 Scanning ${users.length} user(s) for new emails...`);

  let totalProcessed = 0;
  let phishingDetected = 0;
  let suspiciousDetected = 0;

  for (const [userId] of users) {
    try {
      const stats = await processUserInbox(userId);
      totalProcessed += stats.processed;
      phishingDetected += stats.phishing;
      suspiciousDetected += stats.suspicious;
    } catch (e) {
      console.error(`[AutoLabeler] ❌ Error for ${userId}:`, e.response?.data || e.message);
    }
  }

  // Update session statistics
  sessionStats.totalProcessed += totalProcessed;
  sessionStats.phishingDetected += phishingDetected;
  sessionStats.suspiciousDetected += suspiciousDetected;

  if (totalProcessed > 0) {
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log(`║  ✅ Scan Complete: ${totalProcessed} email(s) analyzed                 ║`);
    console.log(`║  🚨 Phishing: ${phishingDetected} | ⚠️  Suspicious: ${suspiciousDetected}                           ║`);
    console.log('╚════════════════════════════════════════════════════════════╝\n');
  } else {
    console.log('[AutoLabeler] ✓ No new emails to process\n');
  }
});

/**
 * Process inbox for a single user with comprehensive security analysis
 * @param {string} userId - User email address
 * @returns {Object} Processing statistics
 */
async function processUserInbox(userId) {
  const tokens = getUserTokens(userId);
  if (!tokens) {
    console.log(`[AutoLabeler] ⚠️  No tokens for ${userId}, skipping`);
    return { processed: 0, phishing: 0, suspicious: 0 };
  }

  const gmail = getGmailClient(tokens);

  // Ensure all security labels exist
  console.log(`[AutoLabeler] 🏷️  Ensuring labels for ${userId.substring(0, 25)}...`);
  const phishingLabelId = await ensureLabel(gmail, 'me', 'PHISHING_RISK');
  const suspiciousLabelId = await ensureLabel(gmail, 'me', 'SUSPICIOUS');
  const okLabelId = await ensureLabel(gmail, 'me', 'OK');

  // Get recent INBOX messages
  const listRes = await gmail.users.messages.list({
    userId: 'me',
    labelIds: ['INBOX'],
    maxResults: 50
  });

  const messages = listRes.data.messages || [];
  if (!messages.length) {
    console.log(`[AutoLabeler] ✓ ${userId.substring(0, 25)}... - No messages in INBOX`);
    return { processed: 0, phishing: 0, suspicious: 0 };
  }

  let processed = 0;
  let phishingCount = 0;
  let suspiciousCount = 0;
  let safeCount = 0;

  console.log(`[AutoLabeler] 📧 Processing ${messages.length} message(s) for ${userId.substring(0, 25)}...`);

  for (const msg of messages) {
    // Skip already processed messages
    if (isMessageProcessed(userId, msg.id)) {
      continue;
    }

    try {
      // Fetch full message headers for security analysis
      const full = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id,
        format: 'metadata',
        metadataHeaders: [
          'From',
          'To',
          'Subject',
          'Date',
          'Received',
          'Authentication-Results',
          'Return-Path',
          'Reply-To',
          'Message-ID',
          'X-Originating-IP',
          'Received-SPF',
          'DKIM-Signature',
          'ARC-Authentication-Results'
        ]
      });

      const headers = full.data.payload.headers || [];
      
      // Perform comprehensive security analysis
      const analysis = analyzeHeaders(headers);

      // Update user's authentication statistics
      updateAuthStats(userId, analysis);

      // Update session statistics
      if (analysis.securityChecks.spf.pass || analysis.securityChecks.dkim.pass) {
        sessionStats.authenticationPassed++;
      } else {
        sessionStats.authenticationFailed++;
      }

      // Determine security label to apply
      let addLabelIds = [];
      let labelName = '';
      
      if (analysis.label === 'PHISHING_RISK') {
        addLabelIds = [phishingLabelId];
        labelName = 'PHISHING_RISK';
        phishingCount++;
      } else if (analysis.label === 'SUSPICIOUS') {
        addLabelIds = [suspiciousLabelId];
        labelName = 'SUSPICIOUS';
        suspiciousCount++;
      } else {
        addLabelIds = [okLabelId];
        labelName = 'OK';
        safeCount++;
      }

      // Apply the security label
      await gmail.users.messages.modify({
        userId: 'me',
        id: msg.id,
        requestBody: { addLabelIds }
      });

      markMessageProcessed(userId, msg.id);
      processed++;

      // Log comprehensive analysis
      logEmailAnalysis(userId, msg.id, analysis, labelName);

    } catch (err) {
      console.error(`[AutoLabeler] ❌ Failed to process message ${msg.id}:`, err.message);
    }
  }

  // Summary for this user
  if (processed > 0) {
    console.log(`[AutoLabeler] ✅ ${userId.substring(0, 25)}... - Processed: ${processed} | Safe: ${safeCount} | Suspicious: ${suspiciousCount} | Phishing: ${phishingCount}`);
  }

  return { 
    processed, 
    phishing: phishingCount, 
    suspicious: suspiciousCount,
    safe: safeCount
  };
}

/**
 * Log detailed email analysis with security checks
 * @param {string} userId - User email
 * @param {string} messageId - Gmail message ID
 * @param {Object} analysis - Analysis result from headerAnalyzer
 * @param {string} labelName - Applied label name
 */
function logEmailAnalysis(userId, messageId, analysis, labelName) {
  const userShort = userId.substring(0, 20);
  const msgShort = messageId.substring(0, 10);
  
  // Build authentication status string
  const authStatus = [
    `SPF:${analysis.securityChecks.spf.status}`,
    `DKIM:${analysis.securityChecks.dkim.status}`,
    `DMARC:${analysis.securityChecks.dmarc.status}`,
    `TLS:${analysis.securityChecks.tls.encrypted ? 'YES' : 'NO'}`
  ].join(' | ');

  // Determine log icon based on label
  let icon = '✅';
  if (labelName === 'PHISHING_RISK') icon = '🚨';
  else if (labelName === 'SUSPICIOUS') icon = '⚠️';

  console.log(`[AutoLabeler] ${icon} ${userShort}... | ${msgShort}... → ${labelName}`);
  console.log(`              └─ ${authStatus}`);
  console.log(`              └─ Score: ${analysis.score}/15 | Risk: ${analysis.riskLevel.toUpperCase()} | Confidence: ${analysis.confidence}%`);

  // Log specific security issues if any
  if (analysis.reasons.length > 0) {
    const reasonsShort = analysis.reasons.slice(0, 2).join(', ');
    const moreCount = analysis.reasons.length - 2;
    console.log(`              └─ Issues: ${reasonsShort}${moreCount > 0 ? ` (+${moreCount} more)` : ''}`);
  }

  // Log critical findings
  if (analysis.securityChecks.dmarc.status === 'fail') {
    console.log(`              └─ ⚠️  CRITICAL: DMARC failed - possible domain spoofing!`);
  }
  if (analysis.securityChecks.spf.status === 'fail' && analysis.securityChecks.dkim.status === 'fail') {
    console.log(`              └─ ⚠️  WARNING: Both SPF and DKIM failed!`);
  }
}

/**
 * Get current session statistics
 * @returns {Object} Session statistics
 */
function getSessionStats() {
  const uptime = Math.floor((new Date() - sessionStats.startTime) / 1000); // seconds
  
  return {
    ...sessionStats,
    uptime: `${Math.floor(uptime / 60)}m ${uptime % 60}s`,
    successRate: sessionStats.totalProcessed > 0 
      ? ((sessionStats.safeEmails / sessionStats.totalProcessed) * 100).toFixed(1) + '%'
      : '0%',
    authRate: (sessionStats.authenticationPassed + sessionStats.authenticationFailed) > 0
      ? ((sessionStats.authenticationPassed / (sessionStats.authenticationPassed + sessionStats.authenticationFailed)) * 100).toFixed(1) + '%'
      : '0%'
  };
}

/**
 * Reset session statistics
 */
function resetSessionStats() {
  sessionStats.startTime = new Date();
  sessionStats.totalScans = 0;
  sessionStats.totalProcessed = 0;
  sessionStats.phishingDetected = 0;
  sessionStats.suspiciousDetected = 0;
  sessionStats.safeEmails = 0;
  sessionStats.authenticationPassed = 0;
  sessionStats.authenticationFailed = 0;
  console.log('[AutoLabeler] 📊 Session statistics reset');
}

/**
 * Manual trigger function for testing/debugging
 * @param {string} userId - User email address
 * @returns {Promise<Object>} Processing results
 */
async function manualScan(userId) {
  console.log(`\n[AutoLabeler] 🔍 Manual scan triggered for ${userId}`);
  console.log('════════════════════════════════════════════════════════');
  
  const result = await processUserInbox(userId);
  
  console.log('════════════════════════════════════════════════════════');
  console.log(`[AutoLabeler] ✓ Manual scan complete\n`);
  
  return result;
}

/**
 * Display current statistics banner
 */
function displayStats() {
  const stats = getSessionStats();
  
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                AUTO-LABELER STATISTICS                     ║');
  console.log('╠════════════════════════════════════════════════════════════╣');
  console.log(`║  Uptime: ${stats.uptime.padEnd(48)} ║`);
  console.log(`║  Total Scans: ${stats.totalScans.toString().padEnd(43)} ║`);
  console.log(`║  Emails Processed: ${stats.totalProcessed.toString().padEnd(38)} ║`);
  console.log(`║  Authentication Rate: ${stats.authRate.padEnd(35)} ║`);
  console.log('╠════════════════════════════════════════════════════════════╣');
  console.log(`║  🚨 Phishing: ${stats.phishingDetected.toString().padEnd(44)} ║`);
  console.log(`║  ⚠️  Suspicious: ${stats.suspiciousDetected.toString().padEnd(41)} ║`);
  console.log(`║  ✅ Safe: ${stats.safeEmails.toString().padEnd(48)} ║`);
  console.log('╚════════════════════════════════════════════════════════════╝\n');
}

// Display stats every 5 minutes
cron.schedule('*/5 * * * *', () => {
  displayStats();
});

// Log startup
console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║                                                            ║');
console.log('║         🚀 AUTO-LABELER SERVICE INITIALIZED                ║');
console.log('║                                                            ║');
console.log('║  Features:                                                 ║');
console.log('║    ✓ SPF Validation                                        ║');
console.log('║    ✓ DKIM Signature Verification                           ║');
console.log('║    ✓ DMARC Policy Enforcement                              ║');
console.log('║    ✓ TLS Encryption Detection                              ║');
console.log('║    ✓ Sender Reputation Analysis                            ║');
console.log('║    ✓ Automatic Phishing Detection                          ║');
console.log('║                                                            ║');
console.log('║  Schedule: Every 30 seconds                                ║');
console.log('║                                                            ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

module.exports = {
  processUserInbox,
  manualScan,
  getSessionStats,
  resetSessionStats,
  displayStats
};