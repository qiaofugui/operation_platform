<script setup lang="ts">
import { reactive } from 'vue'

// 收集表单数据
let loginForm = reactive({
  username: 'admin',
  password: '111111',
})
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
            <el-input v-model="loginForm.password" type="password" clearable show-password>
              <template #prefix>
                <IEpLock />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary">登录</el-button>
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
