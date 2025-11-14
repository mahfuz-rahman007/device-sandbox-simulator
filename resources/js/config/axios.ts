import axios, { AxiosError } from 'axios';

const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add CSRF token to all requests
instance.interceptors.request.use((config) => {
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  if (token) {
    config.headers['X-CSRF-TOKEN'] = token;
  }
  return config;
});

// Handle errors globally
instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const message = error.response?.data?.message ||
                    error.response?.statusText ||
                    error.message ||
                    'An error occurred';

    // Create a new error with a better message
    const enhancedError = new Error(message);
    return Promise.reject(enhancedError);
  }
);

export default instance;
