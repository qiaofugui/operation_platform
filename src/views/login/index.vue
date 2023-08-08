<script setup lang="ts">
import { ref } from 'vue'

import LoginForm from './components/LoginForm.vue'

let dark = ref(false)

// 暗黑模式切换
const changeDark = (value: boolean) => {
  // 获取html根节点
  let html = document.documentElement
  value ? html.className = 'dark' : html.className = ''
}
</script>

<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="dark">
        <el-switch v-model="dark" inline-prompt active-icon="Sunny" inactive-icon="Moon" @change="changeDark" />
      </div>
      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login_left.png" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/logo.svg" alt="" />
          <h2 class="logo-text">甄选运营平台</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./index.scss";
</style>
