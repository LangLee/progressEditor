import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
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
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  }
})