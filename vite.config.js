import path from "path";
import vue from '@vitejs/plugin-vue'

export default {
  // 文件路径重定向
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // 全局使用scss变量
  css:{
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  // 开发代理服务器
  server: {
    proxy: {
      '/api': {
        target: 'http://elm.cangdu.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
			},
    },
  },
  // .vue文件解析插件
  plugins: [
    vue()
  ],
}
