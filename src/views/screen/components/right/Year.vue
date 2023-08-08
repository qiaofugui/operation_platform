<script lang="ts" setup>
import { ref, onMounted } from 'vue'

let charts = ref<any>(null)

</script>

<template>
  <div class="rank">
    <div class="top">
      <p class="title">年度游客量对比</p>
      <p class="bg"></p>
    </div>
    <!-- 展示图标 -->
    <div class="charts" ref="charts">charts</div>
  </div>
</template>

<style lang="scss" scoped>
.year {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;

  .top {
    margin-left: 10px;

    .title {
      color: white;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 8px;
      margin: 10px 0;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  .charts {
    width: 100%;
  }
}
</style>
