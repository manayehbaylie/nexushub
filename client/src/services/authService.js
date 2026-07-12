import api from './api';
export const login = async (credentials) => api.post('/auth/login', credentials);
export const logout = async () => {
  localStorage.removeItem('nexushub_session');
  localStorage.removeItem('nexushub_user');
};
