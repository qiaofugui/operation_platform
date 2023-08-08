// 路由鉴权
import router from '@/router'

import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
Nprogress.configure({ showSpinner: false })
import useUserStore from '@/store/modules/user'
import pinia from '@/store'

import setting from '@/setting'

import { ElMessage } from 'element-plus'

import { ref } from 'vue'
const flag = ref(false)

// 全部路由组件：登录|404|任意路由|主页|数据大屏|权限管理（三个子路由）|商品管理（四个子路由）

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  Nprogress.start()
  document.title = `${setting.title} - ${to.meta.title}`

  // 放在外面会持久化失效
  const userStore = useUserStore(pinia)
  const token = userStore.token
  const username = userStore.username
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!username) {
        try {
          await userStore.userInfo()
          next({ ...to, replace: true })
        } catch (error) {
          ElMessage.error('获取用户信息失败，请重新登陆')
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      } else {
        // ********** 刷新白屏路由丢失解决方法 **********
        if (!flag.value) {
          await userStore.userInfo()
          flag.value = true
          next({ ...to })
        } else {
          next()
        }
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
router.afterEach(async (to, from) => {
  Nprogress.done()
})
