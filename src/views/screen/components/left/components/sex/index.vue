<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import * as echarts from 'echarts'

let charts = ref<any>(null)
onMounted(() => {
  // 获取echarts的实例
  let myCharts = echarts.init(charts.value)
  // 设置实例的配置项
  myCharts.setOption({
    tooltip: {
      show: true,
      trigger: "item",
      formatter: "{b} <br/>占比：{c}%"
    },
    xAxis: {
      type: "value",
      show: false
    },
    yAxis: [
      {
        type: "category",
        position: "left",
        data: ["男士"],
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        }
      },
      {
        type: "category",
        position: "right",
        data: ["女士"],
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false,
          padding: [0, 0, 40, -60],
          fontSize: 12,
          lineHeight: 60,
          color: "rgba(255, 255, 255, 0.9)",
          formatter: "{value}" + 50 + "%",
          rich: {
            a: {
              color: "transparent",
              lineHeight: 30,
              fontFamily: "digital",
              fontSize: 12
            }
          }
        }
      }
    ],
    series: [
      {
        type: "bar",
        barWidth: 20,
        data: [50],
        z: 999,
        itemStyle: {
          borderRadius: 10,
          color: "#007AFE"
        },
        label: {
          show: true,
          color: "#E7E8ED",
          position: "insideLeft",
          offset: [0, -20],
          fontSize: 14,
          formatter: () => {
            return `男士 50%`;
          }
        }
      },
      {
        type: "bar",
        barWidth: 20,
        data: [100],
        barGap: "-100%",
        itemStyle: {
          borderRadius: 10,
          color: "#FF4B7A"
        },
        label: {
          show: true,
          color: "#E7E8ED",
          position: "insideRight",
          offset: [0, -20],
          fontSize: 14,
          formatter: () => {
            return `女士 50%`;
          }
        }
      }
    ],
    // 布局设置
    grid: {
      top: 20,
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
        <img src="../../../../assets/images/man.png" alt="">
      </div>
      <div class="women">
        <img src="../../../../assets/images/woman.png" alt="">
      </div>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<style lang="scss" scoped>
.sex {
  background: url(../../../../assets/images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;

  .top {
    margin-left: 10px;

    .title {
      color: white;
      font-size: 20px;
      font-family: "YouSheBiaoTiHei", sans-serif;
    }

    .bg {
      width: 68px;
      height: 8px;
      margin: 10px 0;
      background: url(../../../../assets/images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  .gender {
    display: flex;
    justify-content: center;
    font-size: 14px;

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
      background: url(../../../../assets/images/man-bg.png) no-repeat;

      &::after {
        content: '男';
        position: absolute;
        top: 3px;
        left: 47px;
        color: white;
      }
    }

    .women {
      background: url(../../../../assets/images/woman-bg.png) no-repeat;

      &::after {
        content: '女';
        position: absolute;
        top: 3px;
        left: 47px;
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
