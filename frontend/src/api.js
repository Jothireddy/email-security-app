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

export { API };