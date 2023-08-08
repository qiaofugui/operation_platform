<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import * as echarts from 'echarts'

let charts = ref<any>(null)
onMounted(() => {
  // 获取echarts的实例
  let myCharts = echarts.init(charts.value)
  // 设置实例的配置项
  myCharts.setOption({})
})
</script>

<template>
  <div class="bottom">
    Bottom
    <!-- 展示图标 -->
    <div class="charts" ref="charts">charts</div>
  </div>
</template>

<style lang="scss" scoped>
.bottom {
  height: 100%;
  background-color: red;

  .charts {
    width: 100%;
  }
}
</style>
