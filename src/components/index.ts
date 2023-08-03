import SvgIcon from './SvgIcon/index.vue'
import Category from '@/components/Category/index.vue'

import type { App, Component } from 'vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGlobalComponent: Component = { SvgIcon, Category }

export default {
  install(app: App) {
    Object.keys(allGlobalComponent).forEach((key: string) => {
      // 注册为全局组件
      app.component(key, allGlobalComponent[key])
    })
    // 将 element-plus 的图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
