/** @type {import('next').NextConfig} */
const fs = require('fs');

const dotenv = require('dotenv');

const env = dotenv.parse(fs.readFileSync('.env'));
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.rawg.io', 'lh3.googleusercontent.com'],
  },
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
  env: env,
};

module.exports = nextConfig;
