import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  // server: {
  //   proxy: {
  //     '^/user': {
  //       target: 'http://127.0.0.1:3000',
  //       changeOrigin: true
  //     },
  //     '^/books': {
  //       target: 'http://127.0.0.1:3000',
  //       changeOrigin: true
  //     }
  //   }
  // },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@tiptap')) {
            return 'tiptap';
          } else if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
})