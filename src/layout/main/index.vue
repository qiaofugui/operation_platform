<script lang="ts" setup></script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
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
