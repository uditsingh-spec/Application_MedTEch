import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// Production URL pointing to Render
export const API_URL = 'https://application-medtech.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

api.interceptors.request.use(async (config) => {
  // Use the hardcoded bypass token from the store directly
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercept 401 Unauthorized to trigger logout
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default api;
