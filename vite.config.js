import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { songsPlugin } from './vite-plugins/songs-plugin.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), songsPlugin()],
})
