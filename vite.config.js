import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
// base: GitHub Pages sirve este proyecto en 54gj2zffvt-sys.github.io/nutricion-mma/, no en la raíz.
export default defineConfig({
  base: '/nutricion-mma/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'Ración — Plan de Martín',
        short_name: 'Ración',
        description: 'Plan de nutrición deportiva para Martín',
        theme_color: '#101518',
        background_color: '#101518',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/nutricion-mma/',
        scope: '/nutricion-mma/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,json}'],
      },
    }),
  ],
})
