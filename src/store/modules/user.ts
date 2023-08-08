// 用户相关仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 引入接口
import { loginAPI, getUserInfoAPI, logoutAPI } from '@/api/user'
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'

import { GET_TOKEN } from '@/utils/token'

import { constantRoutes, asyncRoutes, anyRoutes } from '@/router/routes'
import router from '@/router'

import cloneDeep from 'lodash/cloneDeep'

// 静态方法
/**
 * @description: 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param {any} asyncRoutes 异步路由表
 * @param {string[]} router 当前用户拥有的路由标识
 * @return {*}
 */
const filterAsyncRoutes = (asyncRoutes: any, router: string[]) => {
  // 过滤异步路由表
  return asyncRoutes.filter((item: any) => {
    // 如果当前用户拥有的路由标识中包含当前路由标识
    if (router.includes(item.name)) {
      // 如果当前路由标识包含子路由
      if (item.children && item.children.length > 0) {
        // 递归过滤子路由
        item.children = filterAsyncRoutes(item.children, router)
      }
      return true
    }
  })
}

const useUserStore = defineStore(
  'user',
  () => {
    const token = ref(GET_TOKEN() || '')
    const menuRoutes = ref<any>(constantRoutes)
    const username = ref('')
    const avatar = ref('')
    //存储当前用户是否包含某一个按钮
    const buttons = ref<string[]>([])

    const userLogin = async (data: loginFormData) => {
      //登录请求
      const result: loginResponseData = await loginAPI(data)
      //登录请求:成功200->token
      //登录请求:失败201->登录失败错误的信息
      if (result.code === 200) {
        token.value = result.data as string
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    }

    const userInfo = async () => {
      //获取用户信息进行存储仓库当中[用户头像、名字]
      const result: userInfoResponseData = await getUserInfoAPI()
      //如果获取用户信息成功，存储一下用户信息
      if (result.code === 200) {
        username.value = result.data.name
        avatar.value = result.data.avatar
        buttons.value = result.data.buttons

        // 登录成功
        // 路由权限处理
        // 计算当前用户拥有的路由标识
        // ****要用深拷贝，否则会污染asyncRoutes
        const userAsyncRoute: any = filterAsyncRoutes(cloneDeep(asyncRoutes), result.data.routes)
        // 将常量路由表和用户拥有的路由表进行合并
        menuRoutes.value = [...constantRoutes, ...userAsyncRoute, anyRoutes,]
          // 将路由表添加到路由当中
          ;[...userAsyncRoute, anyRoutes].forEach((item: any) => {
          router.addRoute(item)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    }

    const userLogout = async () => {
      //退出登录请求
      const result: any = await logoutAPI()
      if (result.code === 200) {
        //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
        token.value = ''
        username.value = ''
        avatar.value = ''
        buttons.value = []
        menuRoutes.value = []
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    }

    return {
      token,
      userLogin,
      username,
      userLogout,
      userInfo,
      avatar,
      buttons,
      menuRoutes
    }
  },
  {
    persist: [
      {
        paths: ['token', 'username', 'avatar', 'buttons', 'menuRoutes'],
        storage: localStorage,
      },
    ],
  },
)

export default useUserStore
