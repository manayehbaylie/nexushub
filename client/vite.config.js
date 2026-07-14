import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const rawApiUrl = (env.VITE_API_URL || 'http://localhost:5000').trim();
  let apiTarget = 'http://localhost:5000';

  if (rawApiUrl && rawApiUrl !== '/api') {
    try {
      const parsed = new URL(rawApiUrl);
      apiTarget = parsed.toString().replace(/\/$/, '');
    } catch {
      if (rawApiUrl.startsWith('http://') || rawApiUrl.startsWith('https://')) {
        apiTarget = rawApiUrl.replace(/\/$/, '');
      }
    }
  }

  return {
    plugins: [react()],
    server: {
      port: 5173,
      strictPort: true,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
