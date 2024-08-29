import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer'
import vueJsx from "@vitejs/plugin-vue-jsx"; // 配置vue使用jsx

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
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
        //入口文件输出配置
        entryFileNames: `js/[name]-[hash].js`,
        //代码分割后的文件输出配置
        chunkFileNames: `js/[name]-[hash].js`,
        //静态资源输出配置
        assetFileNames(assetInfo) {
          let fileName = assetInfo && assetInfo.name;
          if (!fileName) return;
          //css文件单独输出到css文件夹
          if (fileName.endsWith(".css")) {
            return `css/[name]-[hash].css`;
          }
          //图片文件单独输出到img文件夹
          else if (
            [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"].some((ext) =>
              fileName.endsWith(ext)
            )
          ) {
            return `img/[name]-[hash].[ext]`;
          }
          //其他资源输出到assets文件夹
          else {
            return `assets/[name]-[hash].[ext]`;
          }
        },
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