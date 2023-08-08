<script lang="ts" setup>
import Top from './components/top/index.vue'
import Bottom from './components/bottom/index.vue'
</script>

<template>
  <div class="center">
    <Top class="top" />
    <Bottom class="bottom" />
  </div>
</template>

<style lang="scss" scoped>
.center {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 35px;

  .top {
    flex: 7.5;
  }

  .bottom {
    flex: 2.5;
  }
}
</style>
