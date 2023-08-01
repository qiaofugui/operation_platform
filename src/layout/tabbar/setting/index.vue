<script lang="ts" setup>
import useSettingStore from '@/store/modules/setting'
const settingStore = useSettingStore()
</script>

<template>
  <el-button icon="Refresh" circle @click="settingStore.changeRefresh" />
  <el-button icon="FullScreen" circle />
  <el-button icon="Setting" circle />
  <el-avatar
    :size="35"
    fit="cover"
    src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
    style="margin: 0 10px"
  />
  <el-dropdown>
    <span>
      Name
      <el-icon>
        <arrow-down />
      </el-icon>
    </span>
    <IEpArrowDown />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped></style>
