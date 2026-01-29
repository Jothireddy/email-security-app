// backend/src/userStore.js

/**
 * In-memory user store with authentication statistics tracking
 * For production, replace with a proper database (MongoDB, PostgreSQL, Redis, etc.)
 * 
 * This store tracks:
 * - User OAuth tokens
 * - Processed message IDs
 * - Authentication statistics (SPF, DKIM, DMARC)
 * - Email security metrics
 */

const users = new Map();
// userId (email) -> {
//   tokens: { access_token, refresh_token, ... },
//   lastHistoryId: string,
//   processedIds: Set<string>,
//   authStats: {
//     totalEmails: number,
//     spfPass: number,
//     spfFail: number,
//     dkimPass: number,
//     dkimFail: number,
//     dmarcPass: number,
//     dmarcFail: number,
//     tlsEncrypted: number,
//     tlsUnencrypted: number,
//     phishingDetected: number,
//     suspiciousDetected: number,
//     safeEmails: number,
//     lastUpdated: Date
//   }
// }

/**
 * Create or update user data
 * @param {string} userId - User email address
 * @param {Object} data - User data to upsert
 */
function upsertUser(userId, data) {
  const existing = users.get(userId) || { 
    processedIds: new Set(),
    authStats: createEmptyAuthStats()
  };
  
  const updated = {
    ...existing,
    ...data,
    processedIds: existing.processedIds || new Set(),
    authStats: existing.authStats || createEmptyAuthStats()
  };
  
  users.set(userId, updated);
  console.log(`[UserStore] ✅ User ${userId} upserted. Total users: ${users.size}`);
}

/**
 * Get user's OAuth tokens
 * @param {string} userId - User email address
 * @returns {Object|null} OAuth tokens or null
 */
function getUserTokens(userId) {
  const u = users.get(userId);
  return u ? u.tokens : null;
}

/**
 * Get complete user object
 * @param {string} userId - User email address
 * @returns {Object|undefined} User object or undefined
 */
function getUser(userId) {
  return users.get(userId);
}

/**
 * Get all users (for cron jobs and batch processing)
 * @returns {Array} Array of [userId, userObject] tuples
 */
function getAllUsers() {
  return Array.from(users.entries()); // [ [userId, userObj], ... ]
}

/**
 * Mark a message as processed (already labeled/analyzed)
 * @param {string} userId - User email address
 * @param {string} messageId - Gmail message ID
 */
function markMessageProcessed(userId, messageId) {
  const u = users.get(userId);
  if (!u) {
    console.warn(`[UserStore] ⚠️ Attempted to mark message for non-existent user: ${userId}`);
    return;
  }
  u.processedIds.add(messageId);
}

/**
 * Check if a message has been processed
 * @param {string} userId - User email address
 * @param {string} messageId - Gmail message ID
 * @returns {boolean} True if message was processed
 */
function isMessageProcessed(userId, messageId) {
  const u = users.get(userId);
  if (!u) return false;
  return u.processedIds.has(messageId);
}

/**
 * Update user's last history ID (for Gmail push notifications)
 * @param {string} userId - User email address
 * @param {string} historyId - Gmail history ID
 */
function updateHistoryId(userId, historyId) {
  const u = users.get(userId);
  if (!u) {
    console.warn(`[UserStore] ⚠️ Attempted to update history for non-existent user: ${userId}`);
    return;
  }
  u.lastHistoryId = historyId;
  console.log(`[UserStore] 🔄 Updated history ID for ${userId}: ${historyId}`);
}

/**
 * Update authentication statistics for a user based on email analysis
 * @param {string} userId - User email address
 * @param {Object} analysis - Email analysis object from headerAnalyzer
 */
function updateAuthStats(userId, analysis) {
  const u = users.get(userId);
  if (!u) {
    console.warn(`[UserStore] ⚠️ Attempted to update stats for non-existent user: ${userId}`);
    return;
  }

  if (!u.authStats) {
    u.authStats = createEmptyAuthStats();
  }

  u.authStats.totalEmails++;
  
  // Track SPF results
  if (analysis.securityChecks && analysis.securityChecks.spf) {
    if (analysis.securityChecks.spf.status === 'pass') {
      u.authStats.spfPass++;
    } else if (analysis.securityChecks.spf.status === 'fail') {
      u.authStats.spfFail++;
    }
  }

  // Track DKIM results
  if (analysis.securityChecks && analysis.securityChecks.dkim) {
    if (analysis.securityChecks.dkim.status === 'pass') {
      u.authStats.dkimPass++;
    } else if (analysis.securityChecks.dkim.status === 'fail') {
      u.authStats.dkimFail++;
    }
  }

  // Track DMARC results
  if (analysis.securityChecks && analysis.securityChecks.dmarc) {
    if (analysis.securityChecks.dmarc.status === 'pass' || 
        analysis.securityChecks.dmarc.status === 'inferred-pass') {
      u.authStats.dmarcPass++;
    } else if (analysis.securityChecks.dmarc.status === 'fail') {
      u.authStats.dmarcFail++;
    }
  }

  // Track TLS encryption
  if (analysis.securityChecks && analysis.securityChecks.tls) {
    if (analysis.securityChecks.tls.encrypted) {
      u.authStats.tlsEncrypted++;
    } else {
      u.authStats.tlsUnencrypted++;
    }
  }

  // Track security labels
  if (analysis.label === 'PHISHING_RISK') {
    u.authStats.phishingDetected++;
  } else if (analysis.label === 'SUSPICIOUS') {
    u.authStats.suspiciousDetected++;
  } else if (analysis.label === 'OK') {
    u.authStats.safeEmails++;
  }

  u.authStats.lastUpdated = new Date();

  // Log significant events
  if (analysis.label === 'PHISHING_RISK') {
    console.log(`[UserStore] 🚨 Phishing detected for ${userId}! Total: ${u.authStats.phishingDetected}`);
  }
}

/**
 * Get authentication statistics for a user with calculated percentages
 * @param {string} userId - User email address
 * @returns {Object} Authentication statistics with percentages
 */
function getAuthStats(userId) {
  const u = users.get(userId);
  
  if (!u || !u.authStats || u.authStats.totalEmails === 0) {
    return {
      totalEmails: 0,
      spfPass: 0,
      spfFail: 0,
      spfPassRate: '0%',
      dkimPass: 0,
      dkimFail: 0,
      dkimPassRate: '0%',
      dmarcPass: 0,
      dmarcFail: 0,
      dmarcPassRate: '0%',
      tlsEncrypted: 0,
      tlsUnencrypted: 0,
      encryptionRate: '0%',
      phishingDetected: 0,
      suspiciousDetected: 0,
      safeEmails: 0,
      overallAuthRate: '0%',
      securityScore: 0,
      lastUpdated: new Date()
    };
  }

  const stats = u.authStats;
  const total = stats.totalEmails;

  // Calculate authentication rates
  const spfPassRate = ((stats.spfPass / total) * 100).toFixed(1);
  const dkimPassRate = ((stats.dkimPass / total) * 100).toFixed(1);
  const dmarcPassRate = ((stats.dmarcPass / total) * 100).toFixed(1);
  const encryptionRate = ((stats.tlsEncrypted / total) * 100).toFixed(1);

  // Calculate overall authentication rate
  const totalAuthChecks = total * 3; // SPF + DKIM + DMARC
  const totalPasses = stats.spfPass + stats.dkimPass + stats.dmarcPass;
  const overallAuthRate = ((totalPasses / totalAuthChecks) * 100).toFixed(1);

  // Calculate security score (0-100)
  const securityScore = calculateSecurityScore(stats, total);

  return {
    ...stats,
    spfPassRate: spfPassRate + '%',
    dkimPassRate: dkimPassRate + '%',
    dmarcPassRate: dmarcPassRate + '%',
    encryptionRate: encryptionRate + '%',
    overallAuthRate: overallAuthRate + '%',
    securityScore: Math.round(securityScore),
    safetyRate: ((stats.safeEmails / total) * 100).toFixed(1) + '%',
    riskRate: (((stats.phishingDetected + stats.suspiciousDetected) / total) * 100).toFixed(1) + '%'
  };
}

/**
 * Clear processed messages for a user (useful for testing/debugging)
 * @param {string} userId - User email address
 */
function clearProcessedMessages(userId) {
  const u = users.get(userId);
  if (!u) return;
  
  const count = u.processedIds.size;
  u.processedIds.clear();
  console.log(`[UserStore] 🧹 Cleared ${count} processed messages for ${userId}`);
}

/**
 * Reset authentication statistics for a user
 * @param {string} userId - User email address
 */
function resetAuthStats(userId) {
  const u = users.get(userId);
  if (!u) return;
  
  u.authStats = createEmptyAuthStats();
  console.log(`[UserStore] 🔄 Reset auth stats for ${userId}`);
}

/**
 * Get number of active users
 * @returns {number} Number of users in store
 */
function getActiveUserCount() {
  return users.size;
}

/**
 * Get total processed messages count across all users
 * @returns {number} Total processed messages
 */
function getTotalProcessedCount() {
  let total = 0;
  users.forEach(user => {
    total += user.processedIds.size;
  });
  return total;
}

/**
 * Get aggregate statistics across all users
 * @returns {Object} Aggregate statistics
 */
function getAggregateStats() {
  const aggregate = createEmptyAuthStats();
  
  users.forEach(user => {
    if (!user.authStats) return;
    
    aggregate.totalEmails += user.authStats.totalEmails;
    aggregate.spfPass += user.authStats.spfPass;
    aggregate.spfFail += user.authStats.spfFail;
    aggregate.dkimPass += user.authStats.dkimPass;
    aggregate.dkimFail += user.authStats.dkimFail;
    aggregate.dmarcPass += user.authStats.dmarcPass;
    aggregate.dmarcFail += user.authStats.dmarcFail;
    aggregate.tlsEncrypted += user.authStats.tlsEncrypted;
    aggregate.tlsUnencrypted += user.authStats.tlsUnencrypted;
    aggregate.phishingDetected += user.authStats.phishingDetected;
    aggregate.suspiciousDetected += user.authStats.suspiciousDetected;
    aggregate.safeEmails += user.authStats.safeEmails;
  });

  return {
    users: users.size,
    ...aggregate,
    averageSecurityScore: aggregate.totalEmails > 0 
      ? calculateSecurityScore(aggregate, aggregate.totalEmails) 
      : 0
  };
}

/**
 * Remove a user from the store
 * @param {string} userId - User email address
 */
function removeUser(userId) {
  const existed = users.delete(userId);
  if (existed) {
    console.log(`[UserStore] 🗑️ Removed user: ${userId}`);
  }
  return existed;
}

/**
 * Reset all user data (for testing/development)
 */
function resetAll() {
  const count = users.size;
  users.clear();
  console.log(`[UserStore] 🧹 All user data cleared (${count} users removed)`);
}

// ========== HELPER FUNCTIONS ==========

/**
 * Create empty authentication statistics object
 * @returns {Object} Empty auth stats
 */
function createEmptyAuthStats() {
  return {
    totalEmails: 0,
    spfPass: 0,
    spfFail: 0,
    dkimPass: 0,
    dkimFail: 0,
    dmarcPass: 0,
    dmarcFail: 0,
    tlsEncrypted: 0,
    tlsUnencrypted: 0,
    phishingDetected: 0,
    suspiciousDetected: 0,
    safeEmails: 0,
    lastUpdated: new Date()
  };
}

/**
 * Calculate overall security score (0-100)
 * @param {Object} stats - Authentication statistics
 * @param {number} total - Total emails
 * @returns {number} Security score
 */
function calculateSecurityScore(stats, total) {
  if (total === 0) return 0;

  // Weight: SPF(30%) + DKIM(30%) + DMARC(25%) + TLS(15%)
  const spfScore = (stats.spfPass / total) * 30;
  const dkimScore = (stats.dkimPass / total) * 30;
  const dmarcScore = (stats.dmarcPass / total) * 25;
  const tlsScore = (stats.tlsEncrypted / total) * 15;

  return spfScore + dkimScore + dmarcScore + tlsScore;
}

module.exports = {
  upsertUser,
  getUserTokens,
  getUser,
  getAllUsers,
  markMessageProcessed,
  isMessageProcessed,
  updateHistoryId,
  updateAuthStats,
  getAuthStats,
  clearProcessedMessages,
  resetAuthStats,
  getActiveUserCount,
  getTotalProcessedCount,
  getAggregateStats,
  removeUser,
  resetAll
};