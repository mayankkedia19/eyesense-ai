/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // ✅ Frontend /api/analyze → FastAPI at localhost:8000/api/analyze
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ]
  },
}

module.exports = nextConfig