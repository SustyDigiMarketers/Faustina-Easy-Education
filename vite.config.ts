import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: For deploying to a GitHub repository page, the base path
  // must be the name of your repository.
  base: '/Faustina-Easy-Education/',
})