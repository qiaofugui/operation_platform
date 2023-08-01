<script lang="ts" setup>
import useSettingStore from '@/store/modules/setting.ts'

import { useRoute } from 'vue-router'

const settingStore = useSettingStore()

const route = useRoute()
</script>

<template>
  <el-icon style="margin-right: 10px" @click="settingStore.changeFold">
    <component :is="settingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, i) in route.matched"
      :key="i"
      v-show="item.name !== 'Layout'"
      :to="item.path"
    >
      <el-icon
        style="margin-right: 5px; vertical-align: middle"
        @click="settingStore.changeFold"
      >
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="vertical-align: middle">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped></style>
