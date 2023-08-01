<script lang="ts" setup>
import { watch, ref, nextTick } from 'vue'
import useSettingStore from '@/store/modules/setting'
const settingStore = useSettingStore()

// 控制当前组件是否销毁重建
let flag = ref(true)
// 监听仓库的变化，如果变化了，就说明用户点击刷新按钮了，这时候就要刷新页面
watch(
  () => settingStore.refresh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<style lang="scss" scoped>
/* .v-enter {}
.v-enter-active {}
.v-enter-leave {} */

/* .fade-enter {}
.fade-enter-active {}
.fade-enter-leave {} */

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
