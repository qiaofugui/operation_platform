import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes, anyRoutes } from './routes'

export default createRouter({
  history: createWebHashHistory(),
  routes: [...constantRoutes, ...anyRoutes],
  // 滚动行为
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
