<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div>App</div>
    <el-button type="primary">Primary</el-button>
    <el-icon>
      <IEpUserFilled />
    </el-icon>
  </el-config-provider>
</template>

<style scoped></style>
