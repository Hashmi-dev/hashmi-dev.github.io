import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { songsPlugin } from './vite-plugins/songs-plugin.mjs'

// https://vite.dev/config/
export default defineConfig({
  // User-page repo (hashmi-dev.github.io) serves from the domain root, so
  // no subpath base is needed here — unlike a project-page repo.
  base: '/',
  plugins: [react(), songsPlugin()],
})
