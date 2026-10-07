import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // forward api calls to the express server during development
    proxy: {
      '/api': 'http://127.0.0.1:5050',
    },
  },
});
