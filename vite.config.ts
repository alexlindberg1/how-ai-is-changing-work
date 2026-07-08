import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { codexPreparePlugin } from './vite.codexPreparePlugin.ts'

export default defineConfig({
  plugins: [react(), tailwindcss(), codexPreparePlugin()],
})
