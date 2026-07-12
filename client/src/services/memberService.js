import api from './api';

const buildQueryString = (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search.trim());
  if (filters.department) params.set('department', filters.department);
  if (filters.status) params.set('status', filters.status);
  const query = params.toString();
  return query ? `?${query}` : '';
};

export const fetchMembers = async (filters = {}) => api.get(`/members${buildQueryString(filters)}`);
export const fetchMemberById = async (id) => api.get(`/members/${id}`);
export const createMember = async (payload) => api.post('/members', payload);
export const updateMember = async (id, payload) => api.put(`/members/${id}`, payload);
export const deleteMember = async (id) => api.delete(`/members/${id}`);
