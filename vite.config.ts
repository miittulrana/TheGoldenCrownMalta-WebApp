import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  define: {
    // Explicitly make environment variables available
    __RESEND_API_KEY__: `"${process.env.VITE_RESEND_API_KEY}"`,
  }
})