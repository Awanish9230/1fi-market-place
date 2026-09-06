import axios from 'axios';
import { Platform } from 'react-native';

// Standard local mock API base URL
// On Android emulator: 10.0.2.2, on iOS/Web: localhost
const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3001';
  }
  return 'http://localhost:3001';
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Response interceptor for consistent logging & handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Graceful handling of network timeouts / server offline
    return Promise.reject(error);
  }
);
