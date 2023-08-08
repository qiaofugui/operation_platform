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
// import { onMounted } from 'vue'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'

// import useUserStore from "@/store/modules/user"

// const userStore = useUserStore()

// onMounted(async() => {
//   await userStore.userInfo()
// })
</script>

<template>
  <!-- 设置element-plus中文 -->
  <el-config-provider :locale="zhCn">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </el-config-provider>
</template>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
