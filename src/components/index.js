import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
import Category from './Category/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const allGlobalComponent = { SvgIcon, Pagination, Category }

export default {
  install(app) {
    //注册项目全部的全局组件
    Object.keys(allGlobalComponent)
    for (const key in allGlobalComponent) {
      //注册为全局组件
      app.component(key, allGlobalComponent[key])
    }
    //将element-plus提供的图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}
