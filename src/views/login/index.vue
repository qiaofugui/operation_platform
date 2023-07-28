<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

// 用户修改仓库
import useUserStore from '@/store/modules/user'

const router = useRouter()
const userStore = useUserStore()

// 收集表单数据
let loginForm = reactive({
  username: 'admin',
  password: '111111',
})

const loading = ref(false)
// 登录按钮
const login = async () => {
  loading.value = true
  // 通知仓库发登录请求
  try {
    await userStore.userLogin(loginForm)
    loading.value = false
    // 请求成功跳转首页
    router.push('/')
    // 登录成功提示
    ElNotification({
      title: '登录成功',
      message: '欢迎回来',
      type: 'success',
    })
  } catch (error) {
    loading.value = false
    // 请求失败提示错误信息
    ElNotification({
      title: '登录失败',
      message: (error as Error).message || '未知错误',
      type: 'error',
    })
  }
}
</script>

<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login-form">
          <h1>登录</h1>
          <h2>欢迎登录甄选运营平台</h2>
          <el-form-item>
            <el-input v-model="loginForm.username" clearable>
              <template #prefix>
                <IEpUser />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
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
