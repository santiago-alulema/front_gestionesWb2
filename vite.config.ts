import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "./src") },
      {
        find: /^@mui\/icons-material\/esm\/(.*)\.js$/,
        replacement: '@mui/icons-material/$1'
      }
    ]
  },
  optimizeDeps: {
    include: [
      'sweetalert2',
      '@mui/icons-material',
      '@mui/material'
    ],
    exclude: ['js-big-decimal']
  }
})