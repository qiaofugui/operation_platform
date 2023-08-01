<script lang="ts" setup>
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<template>
  <div class="tabbar">
    <div class="left">
      <Breadcrumb />
    </div>
    <div class="right">
      <Setting />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  .left {
    display: flex;
  }

  .right {
    display: flex;
    align-items: center;
  }
}
</style>
