/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/biology-aware-rag' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/biology-aware-rag/' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
