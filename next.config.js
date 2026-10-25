/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Static Subject Analysis site lives in public/subject-analysis and uses relative asset paths
      { source: '/subject-analysis', destination: '/subject-analysis/index.html', permanent: false },
    ]
  },
}

module.exports = nextConfig
