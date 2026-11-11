import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Full Stack Open Part 6 -- Vite config for the anecdotes apps.
// The dev server proxies /api to the JSON server (port 3001).

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
