<script lang="ts" setup>
import { reactive, ref } from 'vue'

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

// 主题相关数据
let theme = reactive({
  color: '#409EFF',
  dark: false
})
// 手动控制popover显示与隐藏
let popover = ref(false)

// 暗黑模式切换
const changeDark = (value: boolean) => {
  // 获取html根节点
  let html = document.documentElement
  value ? html.className = 'dark' : html.className = ''

  popover.value = false
}

// 预置主题颜色
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

// 切换主题颜色
const changeActiveTheme = (e: string) => {
  // document.documentElement 是全局变量时
  const el = document.documentElement
  // const el = document.getElementById('xxx')

  // 获取 css 变量
  getComputedStyle(el).getPropertyValue(`--el-color-primary`)

  // 设置 css 变量
  el.style.setProperty('--el-color-primary', e)
}
// 切换主题颜色
const changeTheme = () => {
  popover.value = false
}
</script>

<template>
  <el-button icon="Refresh" circle @click="settingStore.changeRefresh" />
  <el-button icon="FullScreen" circle @click="fullScreen" />
  <el-popover :visible="popover" placement="bottom-end" trigger="manual" title="主题设置" :width="100"
    :popperAppendToBody="false">
    <template #reference>
      <el-button icon="Setting" circle @click="popover = !popover" />
    </template>
    <el-form>
      <el-form-item label="主题颜色">
        <div @click.stop>
          <el-color-picker v-model="theme.color" :predefine="predefineColors" show-alpha
            @active-change="changeActiveTheme" @change="changeTheme" />
        </div>
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch v-model="theme.dark" inline-prompt active-icon="Sunny" inactive-icon="Moon" @change="changeDark" />
      </el-form-item>
    </el-form>
  </el-popover>

  <el-avatar :size="35" fit="cover" :src="userStore.avatar" style="margin: 0 10px" />
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
