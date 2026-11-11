import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Full Stack Open Part 5, exercise 5.1-5.2
// Vite config for the bloglist frontend. The dev server proxies
// /api to the Part 4 backend (port 3003), so the frontend code
// can use relative URLs and avoid CORS issues in development.

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
