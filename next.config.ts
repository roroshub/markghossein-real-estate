import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Workers (OpenNext) serves images without the Next optimizer;
    // all images here are small local static assets, so serve them as-is.
    unoptimized: true,
    remotePatterns: [],
  },
}

export default nextConfig

// Enable Cloudflare bindings (env vars/secrets) during `next dev`.
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
initOpenNextCloudflareForDev()
