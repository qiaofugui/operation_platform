<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'

import { getTime } from '@/utils/time'

// 用户修改仓库
import useUserStore from '@/store/modules/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 收集表单数据
let loginForm = reactive({
  username: 'admin',
  password: 'atguigu123',
})
const validatorUserName = (rule: any, value: any, callback: any) => {
  console.log(rule)
  console.log(value)
  console.log(callback)
}
const loginRules = {
  username: [
    // { required: true, message: '请输入用户名', trigger: 'blur' },
    // { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' },
    { trigger: 'change', validator: validatorUserName },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
  ],
}

const loading = ref(false)
const loginFormRef = ref(null)
// 登录按钮
const login = async () => {
  // let result = await loginFormRef.value.validate()

  loading.value = true
  // 通知仓库发登录请求
  try {
    await userStore.userLogin(loginForm)

    const redirect = route.query.redirect

    loading.value = false
    // 请求成功跳转首页
    router.push({ path: redirect || '/' })
    // 登录成功提示
    ElNotification({
      title: '登录成功',
      message: `Hi,${getTime()}好欢迎回来`,
      type: 'success',
      duration: 2000,
    })
  } catch (error) {
    loading.value = false
    // 请求失败提示错误信息
    ElNotification({
      title: '登录失败',
      message: (error as Error).message || '未知错误',
      type: 'error',
      duration: 2000,
    })
  }
}
</script>

<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login-form"
          :model="loginForm"
          :rules="loginRules"
          ref="loginFormRef"
        >
          <h1>登录</h1>
          <h2>欢迎登录甄选运营平台</h2>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" clearable>
              <template #prefix>
                <IEpUser />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              clearable
              show-password
            >
              <template #prefix>
                <IEpLock />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-btn"
              type="primary"
              @click="login"
              :loading="loading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login-form {
    position: relative;
    width: 80%;
    padding: 40px;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;

    h1 {
      font-size: 40px;
      color: #fff;
    }

    h2 {
      margin: 20px 0;
      font-size: 20px;
      color: #fff;
    }

    .login-btn {
      width: 100%;
    }
  }
}
</style>
