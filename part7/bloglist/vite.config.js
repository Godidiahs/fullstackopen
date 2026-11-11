import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Full Stack Open Part 7, exercises 7.9-7.21
// The /api proxy forwards requests to the Part 4 backend
// on port 3003.

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
})
