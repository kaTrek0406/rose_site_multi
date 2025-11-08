import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 🚀 Разрешаем Railway-домен
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['rose-smm-lending-production.up.railway.app'],
    host: '0.0.0.0',
    port: 8080
  },
  server: {
    host: '0.0.0.0',
    port: 8080
  }
})
