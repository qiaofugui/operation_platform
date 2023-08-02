// 路由鉴权
import router from '@/router'

import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
Nprogress.configure({ showSpinner: false })
import useUserStore from '@/store/modules/user'
import pinia from '@/store'

import setting from '@/setting'

// 全部路由组件：登录|404|任意路由|主页|数据大屏|权限管理（三个子路由）|商品管理（四个子路由）

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 放在外面会持久化失效
  const userStore = useUserStore(pinia)

  Nprogress.start()
  document.title = `${setting.title} - ${to.meta.title}`
  const token = userStore.token
  const username = userStore.username
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!username) {
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      } else {
        next()
      }
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
