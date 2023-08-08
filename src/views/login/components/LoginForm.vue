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
  if(value.trim().length === 0) {
    callback(new Error('请输入用户名'))
  } else if(value.length < 4 || value.length > 10) {
    callback(new Error('长度在 4 到 10 个字符'))
  } else {
    callback()
  }
}
const loginRules = {
  username: [
    // { required: true, message: '请输入用户名', trigger: 'blur' },
    // { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' },
    { trigger: 'blur', validator: validatorUserName },
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
  await loginFormRef.value.validate()

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
      message: `Hi,${getTime()} 欢迎回来`,
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

// resetForm
const resetForm = () => {
  loginFormRef.value.resetFields()
  Object.assign(loginForm, {
    username: '',
    password: ''
  })
}
</script>

<template>
  <el-form
    ref="loginFormRef"
    :model="loginForm"
    :rules="loginRules"
    size="large"
  >
    <el-form-item prop="username">
      <el-input
        v-model="loginForm.username"
        placeholder="请输入用户名"
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <user />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        type="password"
        placeholder="请输入密码"
        show-password
        autocomplete="new-password"
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button
      icon="CircleClose"
      round
      size="large"
      @click="resetForm()"
    > 重置 </el-button>
    <el-button
      icon="UserFilled"
      round
      size="large"
      type="primary"
      :loading="loading"
      @click="login()"
    >
      登录
    </el-button>
  </div>
</template>

<style scoped lang="scss">
@import "../index.scss";
</style>
