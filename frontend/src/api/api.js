import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to request headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User endpoints
export const userAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (email, password) => {
    const credentials = btoa(`${email}:${password}`);
    return api.post('/users/login', {}, {
      headers: { Authorization: `Basic ${credentials}` }
    });
  },
};

// Notes endpoints
export const notesAPI = {
  create: (noteData) => api.post('/notes/create', noteData),
  getAll: () => api.get('/notes/all'),
  update: (id, noteData) => api.put(`/notes/update/${id}`, noteData),
  delete: (id) => api.delete(`/notes/${id}`),
};

export default api;
