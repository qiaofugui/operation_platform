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

import { constantRoutes } from '@/router/routes'

const useUserStore = defineStore(
  'user',
  () => {
    const token = ref(GET_TOKEN() || '')
    const menuRoutes = ref(constantRoutes)
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
        return Promise.reject(new Error(result.data))
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
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    }

    return {
      token,
      userLogin,
      menuRoutes,
      username,
      userLogout,
      userInfo,
      avatar,
      buttons,
    }
  },
  {
    persist: [
      {
        paths: ['token', 'username', 'avatar', 'buttons'],
        storage: localStorage,
      },
    ],
  },
)

export default useUserStore
