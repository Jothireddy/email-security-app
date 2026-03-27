import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});

export function setAuthToken(token) {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('authToken', token);
  } else {
    delete API.defaults.headers.common['Authorization'];
    localStorage.removeItem('authToken');
  }
}

export function getAuthToken() {
  return localStorage.getItem('authToken');
}

export async function fetchRecentEmails(limit = 20) {
  const res = await API.get(`/api/emails/recent?limit=${limit}`);
  return res.data;
}

/**
 * Ensure all security labels exist in Gmail
 * Creates labels if they were deleted
 * @returns {Promise} Label creation result
 */
export async function ensureLabels() {
  const res = await API.post('/api/emails/ensure-labels');
  return res.data;
}

/**
 * Check if labels exist without creating them
 * @returns {Promise} Label existence status
 */
export async function checkLabels() {
  const res = await API.get('/api/emails/check-labels');
  return res.data;
}

/**
 * Get authentication statistics
 * @returns {Promise} Email security statistics
 */
export async function getAuthStats() {
  const res = await API.get('/api/emails/auth-stats');
  return res.data;
}

/**
 * Get detailed authentication analysis for specific email
 * @param {string} messageId - Gmail message ID
 * @returns {Promise} Detailed authentication data
 */
export async function getAuthDetails(messageId) {
  const res = await API.get(`/api/emails/auth-details/${messageId}`);
  return res.data;
}

export { API };