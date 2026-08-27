// API Base URL helper for Vercel (Frontend) & Render (Backend) deployment
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};
