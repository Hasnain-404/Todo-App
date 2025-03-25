import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
    historyApiFallback: true, // Ensures React Router works on Render
  }
});
