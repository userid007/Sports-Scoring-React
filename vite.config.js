import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  devServer: {
    allowedHosts: 'all',
  },
  server: {
    host: "127.0.0.1",
  },
})
