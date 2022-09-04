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
    swcMinify: false,
    // basePath: '/symbol-web',
    pwa: {
      dest: 'public',
    },
    images: {
      domains: ['localhost'],
    },
    experimental: {
      images: {
        unoptimized: true,
      },
    },
  });
}

module.exports = nextConfig;
