import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { portfolioPwa } from './scripts/pwa-plugin.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), portfolioPwa()],
})
