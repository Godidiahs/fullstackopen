import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Full Stack Open Part 6, exercises 6.20-6.24
// The /api proxy forwards requests to the JSON server on
// port 3001, the same setup as the Redux anecdotes app.

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
