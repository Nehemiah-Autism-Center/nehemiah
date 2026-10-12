import axios from 'axios';
import { API_URL } from './constants';

const AUTH_STORAGE_KEY = 'auth-storage';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

function readStoredToken(): string | undefined {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) return undefined;

  try {
    const token = JSON.parse(stored)?.state?.token;
    return typeof token === 'string' ? token : undefined;
  } catch {
    // A corrupt value would otherwise throw here and fail every request; discard it instead.
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return undefined;
  }
}

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = readStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
