<script lang="ts" setup>
defineProps(['menuList'])
</script>
<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <template v-if="!item.children">
      <!-- 没有子路由 -->
      <el-menu-item v-if="!item.meta.hidden" :index="index">
        <template #title>
          <span>t</span>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <template v-if="item.children && item.children.length === 1">
      <!-- 只有一个子路由 -->
      <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path">
        <template #title>
          <span>t</span>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 子路由大于一个 -->
    <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
      <template #title>
        <span>t</span>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children" />
    </el-sub-menu>
  </template>
</template>

<style lang="scss" scoped></style>
