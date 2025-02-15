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
    __RESEND_API_KEY__: `"${process.env.VITE_RESEND_API_KEY}"`,
  },
  optimizeDeps: {
    include: ['@supabase/supabase-js', 'react-day-picker']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@headlessui/react', '@heroicons/react', 'lucide-react'],
          charts: ['recharts'],
          date: ['date-fns', 'react-day-picker']
        }
      }
    }
  }
})