import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/',  // Change to absolute path for Vercel
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
