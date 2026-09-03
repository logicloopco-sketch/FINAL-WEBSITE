import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Raise the chunk size warning threshold (avoids noisy build output)
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Split vendor libraries into separate cached chunks. Function form so the
        // SSR build (which externalises react/react-dom/router) is left untouched.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-router') || id.includes('@remix-run')) return 'vendor-router'
          if (id.includes('/react-dom/') || id.includes('/react/') || id.includes('/scheduler/')) return 'vendor-react'
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
