import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const entry = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // second shell so /xbox/submit/:ref can be rewritten to xbox branded preview tags
      input: {
        main: entry('index.html'),
        xbox: entry('xbox-preview.html'),
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
