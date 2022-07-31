const withPWA = require('next-pwa');

let nextConfig = undefined;

if (process.env.NODE_ENV === 'development') {
  nextConfig = {
    i18n: {
      locales: ['en', 'ja'],
      defaultLocale: 'en',
    },
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['localhost'],
    },
  };
} else {
  nextConfig = withPWA({
    reactStrictMode: true,
    swcMinify: true,
    pwa: {
      dest: 'public',
    },
    images: {},
  });
}

module.exports = nextConfig;
