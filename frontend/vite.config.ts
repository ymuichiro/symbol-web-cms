import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import Sitemap from 'vite-plugin-sitemap';
import axios from 'axios';

const generateUri = (path: string) => `https://cms.symbol-community.com/api/${path}`;

async function getPages(uri: string, category: string, store: string[]): Promise<string[]> {
  let res = await axios.get(`${uri}?locale=all`);
  for (let i = 0; i < res.data.data.length; i++) {
    store.push(`${category}/${res.data.data[i].id}`);
  }
  const pageCount = Number(res.data.meta.pagination.pageCount);
  if (!pageCount || pageCount === 1 || pageCount === 0 || pageCount.toString() === 'NaN') {
    return store;
  }
  for (let i = 2; i <= pageCount; i++) {
    res = await axios.get(`${uri}?locale=all&pagination[page]=${i}`);
    for (let k = 0; k < res.data.data.length; k++) {
      store.push(`${category}/${res.data.data[k].id}`);
    }
  }

  return store;
}

async function generateDynamicRoutes(mode: string): Promise<string[]> {
  const paths = {
    news: '/news',
    community: '/community',
    docs: '/docs',
  };

  const dynamicRoutes: string[] = Object.keys(paths).map((e) => paths[e]);

  if (mode === 'production') {
    await getPages(generateUri('news-releases'), paths.news, dynamicRoutes);
    await getPages(generateUri('community-releases'), paths.community, dynamicRoutes);
    await getPages(generateUri('documents'), paths.docs, dynamicRoutes);
  }

  console.log('Generate sitemap ...', dynamicRoutes);
  return dynamicRoutes;
}

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  return {
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
        dynamicRoutes: await generateDynamicRoutes(mode),
        hostname: 'https://symbol-community.com',
        robots: [{ userAgent: '*', allow: '/' }],
      }),
    ],
    server: {
      port: 3000,
    },
    base: '/',
  };
});
