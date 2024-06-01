import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  base: "./",
  resolve: {
    alias: [
      {
        find: "@", // 别名
        replacement: resolve(__dirname, "src"), // 别名对应地址
      },
      {
        find: "components",
        replacement: resolve(__dirname, "src/components"),
      },
    ],
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        // ws: true,
        changeOrigin: true,
      },
    },
  },
  //配置全局引入scss全局变量
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/mixins.scss";',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        //静态资源分类打包
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
    minify: "terser",
    terserOptions: {
      //生产环境时移除console
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
