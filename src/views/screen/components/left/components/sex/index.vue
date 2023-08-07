<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import * as echarts from 'echarts'

let charts = ref<any>(null)
onMounted(() => {
  // 获取echarts的实例
  let myCharts = echarts.init(charts.value)
  // 设置实例的配置项
  myCharts.setOption({
    title: {
      // text: '男女比例',
      // left: 'center',
      // top: '0',
      // textStyle: {
      //   fontWeight: "normal",
      //   fontSize: 14,
      //   color: "#fff"
      // },
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    // x|y轴配置
    xAxis: {
      show: false,
      min: 0,
      max: 100
    },
    yAxis: {
      type: 'category',
      show: false
    },
    // 系列
    series: [
      {
        type: 'bar',
        name: '男',
        data: [50],
        barWidth: 20,
        itemStyle: {
          color: '#007afe',
          borderRadius: [10, 10, 10, 10]
        },
        z: 10,
      },
      {
        type: 'bar',
        name: '女',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          color: '#ff4b7a',
          borderRadius: [10, 10, 10, 10]
        },
      }
    ],
    // 布局设置
    grid: {
      top: 0,
      left: 50,
      right: 60,
      bottom: 0,
      containLabel: true
    }
  })
})
</script>

<template>
  <div class="sex">
    <div class="top">
      <p class="title">男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="gender">
      <div class="man">
        <img src="../../../../images/man.png" alt="">
      </div>
      <div class="women">
        <img src="../../../../images/woman.png" alt="">
      </div>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<style lang="scss" scoped>
.sex {
  background: url(../../../../images/dataScreen-main-lb.png) no-repeat;
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
      background: url(../../../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  .gender {
    display: flex;
    justify-content: center;

    .man,
    .women {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 110px;
      height: 135px;
      margin: 35px 25px 10px 25px;
    }

    .man {
      background: url(../../../../images/man-bg.png) no-repeat;

      &::after {
        content: '男士';
        position: absolute;
        top: 2px;
        left: 40px;
        color: white;
      }
    }

    .women {
      background: url(../../../../images/woman-bg.png) no-repeat;

      &::after {
        content: '女士';
        position: absolute;
        top: 2px;
        left: 40px;
        color: white;
      }
    }
  }

  .charts {
    width: 100%;
    height: 60px;
  }
}
</style>
