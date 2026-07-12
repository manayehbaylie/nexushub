import api from './api';

const buildQueryString = (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search.trim());
  if (filters.status) params.set('status', filters.status);
  if (filters.priority) params.set('priority', filters.priority);
  const query = params.toString();
  return query ? `?${query}` : '';
};

export const fetchRequests = async (filters = {}) => api.get(`/requests${buildQueryString(filters)}`);
export const fetchRequestById = async (id) => api.get(`/requests/${id}`);
export const createRequest = async (payload) => api.post('/requests', payload);
export const updateRequest = async (id, payload) => api.put(`/requests/${id}`, payload);
export const deleteRequest = async (id) => api.delete(`/requests/${id}`);
