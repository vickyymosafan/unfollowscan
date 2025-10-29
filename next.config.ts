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

  // React Compiler will be enabled when babel-plugin-react-compiler is installed
  // For now, we rely on React 19's built-in optimizations
  // To enable: npm install babel-plugin-react-compiler
  // Then uncomment:
  // reactCompiler: true,
};

export default nextConfig;
