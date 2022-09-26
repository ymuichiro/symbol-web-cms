const withPWA = require('next-pwa');

let nextConfig = undefined;

if (process.env.NODE_ENV === 'development') {
  nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['localhost'],
    },
    i18n: {
      locales: ['en-US', 'ja-JP'],
      defaultLocale: 'en-US',
    },
  };
} else {
  nextConfig = withPWA({
    reactStrictMode: true,
    swcMinify: false,
    pwa: {
      dest: 'public',
    },
    images: {
      domains: ['localhost'],
    },
    i18n: {
      locales: ['en-US', 'ja-JP'],
      defaultLocale: 'en-US',
    },
  });
}

module.exports = nextConfig;
