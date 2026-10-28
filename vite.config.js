import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
// base: GitHub Pages sirve este proyecto en 54gj2zffvt-sys.github.io/knockout-kitchen/, no en la raíz.
// El nombre del repo/URL es neutro a propósito (sin "mma") — ver pedido del usuario.
export default defineConfig({
  base: '/knockout-kitchen/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'Knockout Kitchen — Plan de Martín',
        short_name: 'Knockout',
        description: 'Plan de nutrición deportiva para Martín',
        theme_color: '#101518',
        background_color: '#101518',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/knockout-kitchen/',
        scope: '/knockout-kitchen/',
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
