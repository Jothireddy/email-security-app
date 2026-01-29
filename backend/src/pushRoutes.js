const express = require('express');
const { getUser, getUserTokens, markMessageProcessed, isMessageProcessed, updateHistoryId } = require('./userStore');
const { getGmailClient } = require('./googleClient');
const { analyzeHeaders } = require('./headerAnalyzer');
const { ensureLabel } = require('./gmailHelpers');

const router = express.Router();

// Pub/Sub push endpoint: POST /gmail/push
router.post('/push', async (req, res) => {
  try {
    const msg = req.body.message;
    if (!msg || !msg.data) {
      return res.status(400).send('No message data');
    }

    const decoded = Buffer.from(msg.data, 'base64').toString('utf8');
    const data = JSON.parse(decoded);
    const { emailAddress, historyId } = data;

    if (!emailAddress || !historyId) {
      console.log('Invalid push data:', data);
      return res.status(204).send(); // ack anyway
    }

    console.log(`[Push] Notification for ${emailAddress}, historyId=${historyId}`);
    await handleHistoryForUser(emailAddress, historyId);

    // ACK to Pub/Sub
    return res.status(204).send();
  } catch (err) {
    console.error('Push handler error:', err);
    // Still return 204 so Pub/Sub doesn't retry forever
    return res.status(204).send();
  }
});

async function handleHistoryForUser(emailAddress, historyId) {
  const user = getUser(emailAddress);
  if (!user || !user.tokens) {
    console.log(`[Push] No stored user/tokens for ${emailAddress}`);
    return;
  }

  const gmail = getGmailClient(user.tokens);

  // If we don't have a previous historyId, just update it and return.
  if (!user.lastHistoryId) {
    updateHistoryId(emailAddress, historyId);
    return;
  }

  // Fetch history of message additions since lastHistoryId
  const historyRes = await gmail.users.history.list({
    userId: 'me',
    startHistoryId: user.lastHistoryId,
    historyTypes: ['messageAdded']
  });

  const history = historyRes.data.history || [];
  const newMessageIds = new Set();

  history.forEach(entry => {
    (entry.messagesAdded || []).forEach(ma => {
      if (ma.message && ma.message.id) {
        newMessageIds.add(ma.message.id);
      }
    });
  });

  if (!newMessageIds.size) {
    updateHistoryId(emailAddress, historyId);
    return;
  }

  console.log(`[Push] ${emailAddress} new messages:`, Array.from(newMessageIds));

  const phishingLabelId = await ensureLabel(gmail, 'me', 'PHISHING_RISK');
  const suspiciousLabelId = await ensureLabel(gmail, 'me', 'SUSPICIOUS');
  const okLabelId = await ensureLabel(gmail, 'me', 'OK_SAFE');

  for (const msgId of newMessageIds) {
    if (isMessageProcessed(emailAddress, msgId)) continue;

    const full = await gmail.users.messages.get({
      userId: 'me',
      id: msgId,
      format: 'metadata',
      metadataHeaders: [
        'From',
        'To',
        'Subject',
        'Date',
        'Received',
        'Authentication-Results',
        'Return-Path',
        'Reply-To'
      ]
    });

    const headers = full.data.payload.headers || [];
    const analysis = analyzeHeaders(headers);

    let addLabelIds = [];
    if (analysis.label === 'PHISHING_RISK') addLabelIds = [phishingLabelId];
    else if (analysis.label === 'SUSPICIOUS') addLabelIds = [suspiciousLabelId];
    else addLabelIds = [okLabelId];

    await gmail.users.messages.modify({
      userId: 'me',
      id: msgId,
      requestBody: {
        addLabelIds
      }
    });

    markMessageProcessed(emailAddress, msgId);
    console.log(`[Push] Labeled ${emailAddress} / ${msgId} as ${analysis.label}`);
  }

  // Update our stored lastHistoryId to the newest one we got
  updateHistoryId(emailAddress, historyId);
}

module.exports = router;