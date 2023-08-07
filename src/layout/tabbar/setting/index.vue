<script lang="ts" setup>
import useSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { reactive } from 'vue'

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

// 主题相关数据
let theme = reactive({
  color: '#409EFF',
  dark: false
})

// 暗黑模式切换
const changeDark = (value: boolean) => {
  // 获取html根节点
  let html = document.documentElement
  value ? html.className = 'dark' : html.className = ''
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
  <el-popover
    placement="bottom-end"
    title="主题设置"
    :width="100"
    trigger="click"
  >
    <template #reference>
      <el-button
        icon="Setting"
        circle
      />
    </template>
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="theme.color"
          show-alpha
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="theme.dark"
          inline-prompt
          active-icon="Moon"
          inactive-icon="Sunny"
          @change="changeDark"
        />
      </el-form-item>
    </el-form>
  </el-popover>

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
