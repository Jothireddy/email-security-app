const express = require('express');
const jwt = require('jsonwebtoken');
const { getAuthUrl, getTokens, getGmailClient } = require('./googleClient');
const { upsertUser } = require('./userStore');

const router = express.Router();

// Step 1: redirect user to Google
router.get('/google', (req, res) => {
  const url = getAuthUrl();
  res.redirect(url);
});

// Step 2: Google sends user back here with ?code=...
router.get('/google/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('Missing code');

  try {
    const tokens = await getTokens(code);
    const gmail = getGmailClient(tokens);

    // Get user email
    const profile = await gmail.users.getProfile({ userId: 'me' });
    const emailAddress = profile.data.emailAddress;

    // Register Gmail push watch on INBOX
    const watchRes = await gmail.users.watch({
      userId: 'me',
      requestBody: {
        topicName: process.env.GMAIL_TOPIC_NAME,
        labelIds: ['INBOX']
      }
    });

    const historyId = watchRes.data.historyId;

    // Save user tokens + lastHistoryId in memory
    upsertUser(emailAddress, {
      tokens,
      lastHistoryId: historyId
    });

    // Issue our own JWT for frontend
    const jwtToken = jwt.sign(
      { userId: emailAddress },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const redirect = `${process.env.FRONTEND_URL}/auth/callback?token=${jwtToken}`;
    res.redirect(redirect);
  } catch (err) {
    console.error('OAuth callback error:', err.response?.data || err.message);
    res.status(500).send('Authentication failed');
  }
});

module.exports = router;