import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For deploying to a custom root domain, the base path must be '/'.
  // For deploying to a GitHub repository subdirectory, it should be '/<repository-name>/'.
  base: '/',
})