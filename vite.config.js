import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  css: {
    postcss: './postcss.config.cjs',
  },
=======
>>>>>>> 6428b2e (Updated UI and fixed bugs)
  server: {
    port: 3000,
    host: true,
  },
<<<<<<< HEAD
  build: {
    outDir: 'build',
    sourcemap: true,
  }
=======
>>>>>>> 6428b2e (Updated UI and fixed bugs)
})