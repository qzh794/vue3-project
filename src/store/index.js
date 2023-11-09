//仓库index大仓库
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//创建大仓库的create方法
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
//对外暴露
export default pinia 
