/**
 * Get color configuration for security labels
 * Uses Gmail's official predefined color palette
 * See: https://developers.google.com/gmail/api/guides/labels#label_colors
 */
function getLabelColors(labelName) {
  const colorMap = {
    'PHISHING_RISK': {
      backgroundColor: '#fb4c2f',  // Gmail's official red
      textColor: '#ffffff'         // White text
    },
    'SUSPICIOUS': {
      backgroundColor: '#ffad47',  // Gmail's official orange
      textColor: '#ffffff'         // White text
    },
    'OK': {
      backgroundColor: '#16a766',  // Gmail's official green
      textColor: '#ffffff'         // White text
    }
  };

  return colorMap[labelName] || null;
}

/**
 * Ensure a label exists in Gmail with proper colors
 * Creates if missing, updates colors if needed
 */
async function ensureLabel(gmail, userId, labelName) {
  const list = await gmail.users.labels.list({ userId });
  const existing = (list.data.labels || []).find(l => l.name === labelName);
  
  if (existing) {
    // Check if existing label has colors, if not, update it
    if (!existing.color || !existing.color.backgroundColor) {
      const colors = getLabelColors(labelName);
      if (colors) {
        try {
          await gmail.users.labels.update({
            userId,
            id: existing.id,
            requestBody: {
              color: colors,
              labelListVisibility: 'labelShow',
              messageListVisibility: 'show'
            }
          });
          console.log(`[Labels] ✓ Updated ${labelName} with colors`);
        } catch (err) {
          console.error(`[Labels] Failed to update ${labelName} colors:`, err.message);
        }
      }
    }
    return existing.id;
  }

  // Create new label with colors
  const colors = getLabelColors(labelName);
  const requestBody = {
    name: labelName,
    labelListVisibility: 'labelShow',
    messageListVisibility: 'show'
  };

  if (colors) {
    requestBody.color = colors;
  }

  const created = await gmail.users.labels.create({
    userId,
    requestBody
  });

  console.log(`[Labels] ✓ Created ${labelName} with colors`);
  return created.data.id;
}

module.exports = { ensureLabel };