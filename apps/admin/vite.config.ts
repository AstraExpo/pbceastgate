import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      srcDirectory: 'src',
      router: {
        // This matches the "app" folder structure you saw in the docs
        routesDirectory: 'app', 
      },
    }),
    viteReact(),
    nitro(),
  ],
  resolve: {
    // Ensures Vite can resolve your @eastgate workspace packages
    alias: {
      "@": "/src",
    },
  },
})