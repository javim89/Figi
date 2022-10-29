/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['picsum.photos']
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
