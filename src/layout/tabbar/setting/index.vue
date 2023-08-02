<script lang="ts" setup>
import useSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'

import { useRouter, useRoute } from 'vue-router'

const settingStore = useSettingStore()
const userStore = useUserStore()

const router = useRouter()
const route = useRoute()

// 全屏功能
const fullScreen = () => {
  // 用来判断是不是全屏返回布尔值
  const full = document.fullscreenElement
  // 有兼容问题
  if (full) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}

// 退出登录
const logout = async () => {
  // 发起退出登录请求
  // 清空用户信息
  await userStore.userLogout()
  // 跳转到登录页
  router.push({ path: '/login', query: { redirect: route.path } })
}
</script>

<template>
  <el-button
    icon="Refresh"
    circle
    @click="settingStore.changeRefresh"
  />
  <el-button
    icon="FullScreen"
    circle
    @click="fullScreen"
  />
  <el-button
    icon="Setting"
    circle
  />
  <el-avatar
    :size="35"
    fit="cover"
    :src="userStore.avatar"
    style="margin: 0 10px"
  />
  <el-dropdown>
    <span>
      {{ userStore.username }}
      <el-icon>
        <arrow-down />
      </el-icon>
    </span>
    <IEpArrowDown />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped></style>
