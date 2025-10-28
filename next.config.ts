import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration for Vercel deployment
  images: {
    unoptimized: true,
  },
  
  // Add trailing slash to URLs for better compatibility
  trailingSlash: true,
  
  // Enable styled-components
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
