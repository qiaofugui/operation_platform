// 路由鉴权
import router from '@/router'

import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 全局前置守卫
router.beforeEach((to, from, next) => {
  Nprogress.start()
  console.log(11)
  next()
})

// 全局后置守卫
router.afterEach((to, from) => {
  Nprogress.done()
})
