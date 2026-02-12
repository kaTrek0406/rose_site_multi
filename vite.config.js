import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import purgecss from 'vite-plugin-purgecss'

export default defineConfig({
  base: '/rose_site_multi/',
  plugins: [
    react(),
    purgecss({
      content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
      ],
      safelist: {
        standard: [
          // Сохраняем классы от сторонних библиотек
          /^lenis/,
          // Сохраняем динамические классы
          /active$/,
          /open$/,
          /show$/,
          /visible$/,
          /hidden$/,
          /exit$/,
          // Сохраняем анимации
          'spin',
          // Blog classes
          /^blog-/,
          /^ba-/,
          /^featured-/,
          'read-more',
        ],
        deep: [/^fade/, /^slide/],
      },
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })
  ],
  preview: {
    allowedHosts: [
      'rose-smm-lending-production.up.railway.app',
      'www.rosecreative.md',
      'rosecreative.md'
    ],
    host: '0.0.0.0',
    port: 8080
  },
  server: {
    host: '0.0.0.0',
    port: 8080
  },
  build: {
    // Оптимизация сборки
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Удаляем console.log в продакшене
        drop_debugger: true,
      },
    },
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Разделяем vendor код
          'react-vendor': ['react', 'react-dom'],
          'icons': ['react-icons/fa'],
        },
      },
    },
    // Увеличиваем лимит для предупреждений о размере чанков
    chunkSizeWarningLimit: 1000,
    // Включаем сжатие
    reportCompressedSize: true,
  },
  // Оптимизация
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
