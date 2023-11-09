//通过路由插件实现模板路由配置
import { createRouter,createWebHashHistory} from "vue-router";
// js文件，默认导入不需要花括号，区别export和.vue
import  constantRoute from "./routes";
//创建路由
const router =createRouter({
    //路由模式
    history:createWebHashHistory(),
    routes:constantRoute,
    //滚动行为
    scrollBehavior(){
        return{
            left:0,
            top:0
        }
    }
})
export default router