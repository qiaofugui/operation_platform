<script lang="ts" setup>
import useSettingStore from '@/store/modules/setting.ts'

const settingStore = useSettingStore()
</script>

<template>
  <el-icon style="margin-right: 10px" @click="settingStore.changeFold">
    <component :is="settingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped></style>
