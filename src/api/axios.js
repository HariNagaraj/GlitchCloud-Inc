import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
});

// Automatically add JWT token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('glitchcloud_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
