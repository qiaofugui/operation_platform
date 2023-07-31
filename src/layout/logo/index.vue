<script lang="ts" setup>
import setting from '@/setting'
</script>

<template>
  <h2 class="logo">{{ setting.title }}</h2>
</template>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  text-align: center;
  line-height: $base-menu-logo-height;
  font-size: $base-logo-title-fontSize;
  color: #fff;
  font-weight: 700;
}
</style>
