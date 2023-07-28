// 用户相关仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 引入接口
import { reqLogin } from '@/api/user'
// 引入类型
import type { loginFormData } from '@/api/user/type'

const useUserStore = defineStore('user', () => {
  const count = ref(0)
  const token = ref(localStorage.getItem('TOKEN' || ''))

  const userLogin = async (data: loginFormData) => {
    const res: any = await reqLogin(data)
    if (res.code === 200) {
      token.value = res.data.token

      return true
    } else {
      return Promise.reject(new Error(res.data.message))
    }
  }

  return {
    count,
    token,
    userLogin,
  }
})

export default useUserStore
