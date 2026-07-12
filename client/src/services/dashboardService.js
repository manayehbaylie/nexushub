import api from './api';
export const fetchDashboardSummary = async () => api.get('/dashboard/summary');
