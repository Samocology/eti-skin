import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tanstackStart(),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
  // @ts-ignore - tanstackStart is injected by the plugin
  tanstackStart: {
    server: { entry: 'server' },
  },
  nitro: {
    preset: 'vercel',
  },
})
