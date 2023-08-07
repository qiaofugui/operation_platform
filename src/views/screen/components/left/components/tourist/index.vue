<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import * as echarts from 'echarts'
// echarts 水球图扩展包
import 'echarts-liquidfill'

let people = ref<string>('56789')

let charts = ref<any>(null)
onMounted(() => {
  // 获取echarts的实例
  let myCharts = echarts.init(charts.value)
  // 设置实例的配置项
  myCharts.setOption({
    // 标题设置
    title: {
      text: '预约量',
      left: 'center',
      top: '25%',
      textStyle: {
        fontWeight: "normal",
        fontSize: 18,
        color: "#fff"
      },
      // 副标题
      subtextStyle: {
        fontWeight: "bold",
        fontSize: 10,
        color: "rgb(0,0,0)"
      }
    },
    // x|y轴配置
    xAxis: {},
    yAxis: {},
    // 系列
    series: [
      {
        // 展示什么样的图标表
        type: 'liquidFill',
        // 展示的数据
        data: [0.55, 0.35, 0.25],
        // 是否开启动画
        waveAnimation: true,
        // 动画时间
        animationDuration: 0,
        animationDurationUpdate: 0,
        // 半径
        radius: '90%',
        // 水球的颜色
        outline: {
          show: false,
        },
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 24,
            }
          }
        },
        backgroundStyle: {
          color: 'rgba(0,0,0,0)', //背景颜色
        },
      },
      //外层线
      {
        type: "pie",
        center: ["50%", "50%"],
        radius: ["95%", "96%"], //外层线粗细
        hoverAnimation: false,
        data: [
          {
            name: "",
            value: 100,
            labelLine: {
              show: false
            },
            itemStyle: {
              color: "#67CDFB"
            },
            emphasis: {
              labelLine: {
                show: false
              },
              itemStyle: {
                // color: "#5886f0"
              }
            }
          }
        ]
      },
      // 进度线
      {
        type: "pie",
        center: ["50%", "50%"],
        radius: ["95%", "100%"], //进度线粗细
        hoverAnimation: false,
        data: [
          {
            name: "",
            value: 55, //进度
            labelLine: {
              show: false
            },
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 2,
                colorStops: [
                  // !! 在此添加渐变过程色 !!
                  { offset: 0, color: "#33E2ED" },
                  { offset: 1, color: "#807AFE" }
                ]
              }
            },
            emphasis: {
              labelLine: {
                show: false
              },
              itemStyle: {
                // color: "#5886f0"
              }
            }
          },
          {
            //画剩余的刻度圆环
            name: "",
            value: 55,
            itemStyle: {
              color: "rgba(0,0,0,0)"
            },
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            emphasis: {
              labelLine: {
                show: false
              },
              itemStyle: {
                color: "#050038"
              }
            }
          }
        ]
      }
    ],
    // 布局设置
    grid: {
      top: '0',
      left: 0,
      right: 0,
      bottom: 0,
      containLabel: true
    }
  })
})
</script>

<template>
  <div class="tourist">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量 <span>99999</span> 人</p>
    </div>
    <div class="number">
      <span v-for="item in people" :key="item">{{ item }}</span>
      <span>人</span>
    </div>
    <!-- 展示图标 -->
    <div class="charts" ref="charts">charts</div>
  </div>
</template>

<style lang="scss" scoped>
.tourist {
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

    .right {
      float: right;
      margin-right: 10px;
      color: white;

      span {
        color: #ff8100;
      }
    }
  }

  .number {
    display: flex;
    margin: 45px 20px 15px 20px;

    span {
      flex: 1;
      height: 60px;
      background: url(../../../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      font-size: 28px;
      font-weight: 700;
      text-align: center;
      line-height: 60px;
    }
  }

  .charts {
    width: 100%;
    height: 200px;
  }
}
</style>
