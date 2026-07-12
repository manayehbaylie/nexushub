import api from './api';

const buildQueryString = (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search.trim());
  if (filters.category) params.set('category', filters.category);
  if (filters.status) params.set('status', filters.status);
  const query = params.toString();
  return query ? `?${query}` : '';
};

export const fetchResources = async (filters = {}) => api.get(`/resources${buildQueryString(filters)}`);
export const fetchResource = async (id) => api.get(`/resources/${id}`);
export const createResource = async (payload) => api.post('/resources', payload);
export const updateResource = async (id, payload) => api.put(`/resources/${id}`, payload);
export const deleteResource = async (id) => api.delete(`/resources/${id}`);
