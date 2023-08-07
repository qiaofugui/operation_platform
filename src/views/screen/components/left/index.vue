<script lang="ts" setup>
import Tourist from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
</script>

<template>
  <div class="left">
    <!-- 游客 -->
    <Tourist class="tourist" />
    <!-- 男女 -->
    <Sex class="sex" />
    <!-- 年龄 -->
    <Age class="age" />
  </div>
</template>

<style lang="scss" scoped>
.left {
  display: flex;
  flex-direction: column;

  .tourist {
    flex: 1.2;
    margin: 20px 0 15px 0;
  }

  .sex {
    flex: 1;
    margin: 15px 0;
  }

  .age {
    flex: 1;
    margin-top: 15px;
  }
}
</style>
