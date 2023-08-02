// 路由鉴权
import router from '@/router'

import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
Nprogress.configure({ showSpinner: false })
import useUserStore from '@/store/modules/user'
import pinia from '@/store'

import setting from '@/setting'

const userStore = useUserStore(pinia)

// 全部路由组件：登录|404|任意路由|主页|数据大屏|权限管理（三个子路由）|商品管理（四个子路由）

// 全局前置守卫
router.beforeEach((to, from, next) => {
  Nprogress.start()
  document.title = `${setting.title} - ${to.meta.title}`
  const token = userStore.token
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  Nprogress.done()
})
