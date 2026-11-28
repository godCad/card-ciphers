import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const entry = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // extra shells so branded submit paths can be rewritten to matching preview tags
      input: {
        main: entry('index.html'),
        xbox: entry('xbox-preview.html'),
        razor: entry('razor-preview.html'),
      },
    },
  },
  server: {
    // forward api calls to the express server during development
    proxy: {
      '/api': 'http://127.0.0.1:5050',
    },
  },
});
