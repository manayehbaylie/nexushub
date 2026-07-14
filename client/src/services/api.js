const resolveApiBaseUrl = () => {
  const configuredUrl = (import.meta.env.VITE_API_URL || '/api').trim();

  if (!configuredUrl || configuredUrl === 'http://localhost:5000' || configuredUrl === 'http://localhost:5000/api') {
    return '/api';
  }

  return configuredUrl.replace(/\/$/, '');
};

const API_BASE_URL = import.meta.env.DEV ? '/api' : resolveApiBaseUrl();

const getToken = () => {
  try {
    const session = JSON.parse(localStorage.getItem('nexushub_session') || 'null');
    return session?.token || null;
  } catch {
    return null;
  }
};

const clearSession = () => {
  localStorage.removeItem('nexushub_session');
  localStorage.removeItem('nexushub_user');
};

const buildHeaders = (body) => {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  return headers;
};

const buildUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

const handleResponse = async (response, fallbackMessage = 'Request failed') => {
  const text = await response.text().catch(() => '');
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (response.ok) {
    return response.status === 204 ? null : data;
  }

  const message = typeof data === 'object' && data?.message ? data.message : (text || `${fallbackMessage} with status ${response.status}`);

  if (response.status === 401 || response.status === 403) {
    clearSession();
  }

  if (typeof data === 'object' && data && data.fallback === true) {
    return data;
  }

  throw new Error(message);
};

const api = {
  get: async (path) => {
    const response = await fetch(buildUrl(path), {
      headers: buildHeaders(),
    });
    return handleResponse(response, 'Request failed');
  },
  post: async (path, body) => {
    const response = await fetch(buildUrl(path), {
      method: 'POST',
      headers: buildHeaders(body),
      body: JSON.stringify(body),
    });
    return handleResponse(response, 'Request failed');
  },
  put: async (path, body) => {
    const response = await fetch(buildUrl(path), {
      method: 'PUT',
      headers: buildHeaders(body),
      body: JSON.stringify(body),
    });
    return handleResponse(response, 'Request failed');
  },
  delete: async (path) => {
    const response = await fetch(buildUrl(path), {
      method: 'DELETE',
      headers: buildHeaders(),
    });
    return handleResponse(response, 'Request failed');
  },
};

export default api;
