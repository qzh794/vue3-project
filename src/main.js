import { createApp } from 'vue'
import pinia from './store'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register'
import  GlobalComponents  from '@/components'
import '@/styles/index.scss'
import router from './router'
import'./permission'

const app = createApp(App)
//安装仓库
pinia.use(({store})=>{
const initialState = JSON.parse(JSON.stringify(store.$state));
store.$reset = ()=>{
store.$patch(initialState);
}
});
app.use(pinia); 
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(GlobalComponents)
app.use(router)
console.log(import.meta.env);
app.mount('#app')
