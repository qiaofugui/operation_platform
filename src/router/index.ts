import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'

export default createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 滚动行为
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
