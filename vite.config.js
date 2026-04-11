import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Raise the chunk size warning threshold (avoids noisy build output)
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Split vendor libraries into separate cached chunks
        manualChunks: {
          // React core — changes rarely, stays cached between deploys
          'vendor-react': ['react', 'react-dom'],
          // Router — separate so page code doesn't bust router cache
          'vendor-router': ['react-router-dom'],
          // Helmet — tiny, but isolated for clarity
          'vendor-helmet': ['react-helmet-async'],
        },
      },
    },

    // Minification settings
    minify: 'esbuild',
    target: 'es2015',

    // Asset inlining threshold — inline files < 4 KB as base64
    assetsInlineLimit: 4096,
  },

  // Faster HMR in dev
  server: {
    hmr: true,
  },
})
