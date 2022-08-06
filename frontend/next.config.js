const withPWA = require('next-pwa');

let nextConfig = undefined;

if (process.env.NODE_ENV === 'development') {
  nextConfig = {
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
    basePath: '/symbol-web',
    pwa: {
      dest: 'public',
    },
    experimental: {
      images: {
        unoptimized: true,
      },
    },
  });
}

module.exports = nextConfig;
