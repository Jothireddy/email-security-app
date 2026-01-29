async function ensureLabel(gmail, userId, labelName) {
  const list = await gmail.users.labels.list({ userId });
  const existing = (list.data.labels || []).find(l => l.name === labelName);
  if (existing) return existing.id;

  const created = await gmail.users.labels.create({
    userId,
    requestBody: {
      name: labelName,
      labelListVisibility: 'labelShow',
      messageListVisibility: 'show'
    }
  });

  return created.data.id;
}

module.exports = { ensureLabel };