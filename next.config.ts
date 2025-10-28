import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for deployment without Node.js server
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Add trailing slash to URLs for better compatibility
  trailingSlash: true,
};

export default nextConfig;
