import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url' // Usa 'node:url' en lugar de 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url))
      },
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