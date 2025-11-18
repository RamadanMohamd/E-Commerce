import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import viteCompression from 'vite-plugin-compression';

// Strip top-level "use client" directives from dependencies during transform.
// Some packages ship a module-level directive that causes bundlers to warn.
const stripUseClientPlugin = () => ({
  name: 'strip-use-client',
  enforce: 'pre' as const,
  transform(code: string, id: string) {
    if (id.includes('node_modules') && /(^|[\n\r])["']use client["']/.test(code)) {
      const newCode = code.replace(/(^\s*["']use client["'];?\s*)+/gm, '');
      return { code: newCode, map: null } as any;
    }
    return null;
  }
});

export default defineConfig({
  plugins: [
    stripUseClientPlugin(), 
    react(),
    // Brotli compression (better compression ratio)
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 1024, // Only compress files larger than 1KB
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false,
    }),
    // Gzip compression (wider browser support)
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 1024,
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    headers: {
      // Ensure proper caching for bfcache support
      'Cache-Control': 'no-cache',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Performance optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-checkbox', '@radix-ui/react-collapsible'],
          'icons': ['lucide-react', 'react-icons'],
          'state': ['zustand', 'swr', 'immer'],
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable minification with esbuild (faster than terser)
    minify: 'esbuild',
    // CSS minification
    cssMinify: true,
    // Target modern browsers for smaller output
    target: 'es2015',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  css: {
    // Additional CSS optimization
    devSourcemap: false,
  },
});