import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import Sitemap from 'vite-plugin-sitemap';
import { paths } from './src/navigation/paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    splitVendorChunkPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        theme_color: '#B32AF9',
        background_color: '#000',
        display: 'fullscreen',
        scope: '/',
        start_url: '/',
        name: 'Symbol',
        short_name: 'Symbol',
        description: 'Learn what the next generation of blockchain Symbol is',
        icons: [
          {
            src: '/maskable_icon_x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/maskable_icon_x128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/maskable_icon_x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/maskable_icon_x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    Sitemap({
      dynamicRoutes: Object.keys(paths).map((e) => paths[e]),
      hostname: 'http://localhost',
      robots: [{ userAgent: '*', allow: '/' }],
    }),
  ],
  server: {
    port: 1337,
  },
  base: '/symbol_web',
});
