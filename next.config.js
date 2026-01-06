/** @type {import('next').NextConfig} */
// Temporarily disable PWA for initial setup verification
// PWA will be configured in issue #2
// const withPWA = require('next-pwa')({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === 'development',
// });

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

// module.exports = withPWA(nextConfig);
module.exports = nextConfig;

