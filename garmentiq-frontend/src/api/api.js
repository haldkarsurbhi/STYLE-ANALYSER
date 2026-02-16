import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'System error occurred';

    if (error.response) {
      const { status, data } = error.response;
      errorMessage = data?.message || `Error ${status}`;
    } else if (error.request) {
      errorMessage = 'Server connection failed';
    }

    error.userMessage = errorMessage;
    return Promise.reject(error);
  }
);

export const uploadTechPack = async (formData) => {
  const response = await api.post('/api/techpack/analyse', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default api;
