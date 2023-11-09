/* eslint-disable no-undef */
import { defineConfig,loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// https://vitejs.dev/config/
import { viteMockServe } from 'vite-plugin-mock'
export default defineConfig(({command,mode})=>{
  //获取各种环境下的对应变量
  const env=loadEnv(mode,process.cwd())
  return{
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // Specify symbolid format
      symbolId: "icon-[dir]-[name]",
    }),
    viteMockServe({
      // default
      mockPath: 'mock',
      localEnabled: command === 'serve',
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname,'src'),
    },
  },
    css:{ 
    preprocessorOptions: {
    scss:{ 
    javascriptEnabled: true,
    additionalData:'@import "./src/styles/variable.scss";',
    },
  },
},
server:{
    proxy:{
      [env.VITE_APP_BASE_API]:{ 
        //获取数据服务器地址设置
      target: env.VITE_SERVE,
      //是否代理跨域
      changeOrigin: true,
      //路径重写
      rewrite: (path) => path.replace(/^\/api/, ''),}
    }
}
  }
});
