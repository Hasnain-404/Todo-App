import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
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
    }
  }
,
  plugins: [react(),
  tailwindcss()
  ],
})
