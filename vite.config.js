import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // или 'localhost' или '0.0.0.0' для доступа извне
    port: 5173 // порт, на котором будет запущен Vite
  },
  build: {
    sourcemap: true,
  },  
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
