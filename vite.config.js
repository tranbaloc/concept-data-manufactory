import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,   // lắng nghe trên 0.0.0.0 → các máy khác truy cập qua IP
    port: 5173,
    allowedHosts: ['giavico-concept.tranbaloc.io.vn'],
  },
})
