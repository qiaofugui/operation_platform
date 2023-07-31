// 常量路由
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: 'Layout',
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
        },
      },
      {
        path: '/cs',
        name: 'cs',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: 'cs',
        },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Any',
    redirect: '/404',
    meta: {
      title: 'Any',
    },
  },
]
