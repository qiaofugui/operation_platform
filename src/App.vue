<!-- <script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import SvgIcon from '@/components/SvgIcon/index.vue'
</script> -->

<!-- <template> -->
<!-- 设置element-plus中文 -->
<!-- <el-config-provider :locale="zhCn"> -->
<!-- <div>App</div> -->
<!-- <el-button type="primary">Primary</el-button> -->
<!-- 测试自动导入element-plus组件 -->
<!-- <el-icon> -->
<!-- <IEpUserFilled /> -->
<!-- </el-icon> -->
<!-- 测试svg组件 -->
<!-- <SvgIcon name="home" color="pink" width="100px" height="100px" /> -->
<!-- </el-config-provider> -->
<!-- </template> -->

<!-- <style scoped></style> -->

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<template>
  <!-- 设置element-plus中文 -->
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
