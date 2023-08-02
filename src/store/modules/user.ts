// 用户相关仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 引入接口
import { reqLogin } from '@/api/user'
// 引入类型
import type { loginFormData, loginResponseData } from '@/api/user/type'

import { GET_TOKEN } from '@/utils/token'

import { constantRoutes } from '@/router/routes'

const useUserStore = defineStore(
  'user',
  () => {
    const token = ref(GET_TOKEN() || '')
    const menuRoutes = ref(constantRoutes)
    const username = ref('qiao')

    const userLogin = async (data: loginFormData) => {
      const res: loginResponseData = await reqLogin(data)
      if (res.code === 200) {
        token.value = res.data.token as string

        return true
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    }

    const userInfo = async () => {}

    const userLogout = () => {
      token.value = ''
      username.value = ''
    }

    return {
      token,
      userLogin,
      menuRoutes,
      username,
      userLogout,
      userInfo,
    }
  },
  {
    persist: [{ paths: ['token'], storage: localStorage }],
  },
)

export default useUserStore
