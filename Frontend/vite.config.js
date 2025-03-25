import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      "/auth": {
        target: "https://todo-app-7i4k.onrender.com",
        changeOrigin: true,
        secure: false
      },
      "/todo": {
        target: "https://todo-app-7i4k.onrender.com",
        changeOrigin: true,
        secure: false
      }
    },
    historyApiFallback: true,
  }
});
