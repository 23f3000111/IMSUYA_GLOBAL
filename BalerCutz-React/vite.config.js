import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    fs: { allow: ['.', resolve(__dirname, '../BalerCutz')] }
  },
  resolve: {
    alias: {
      '@img': resolve(__dirname, '../BalerCutz/BalerCutz Image')
    }
  }
})
