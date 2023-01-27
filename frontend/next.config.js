const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = withPWA({
  i18n: {
    locales: ['en', 'ja', 'ko', 'zh', 'zh-Hant-TW'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['cms.symbol-community.com'],
  },
  compiler: {
    emotion: true,
  },
  reactStrictMode: true,
});

module.exports = nextConfig;
