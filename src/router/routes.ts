// 常量路由
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true, // 路由标题是否显示在侧边栏
    },
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: 'Layout',
      hidden: false,
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
        },
      },
      {
        path: '/cs',
        name: 'cs',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: 'cs',
          hidden: false,
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
      hidden: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Any',
    redirect: '/404',
    meta: {
      title: 'Any',
      hidden: true,
    },
  },
]
