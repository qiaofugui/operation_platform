<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import { ECharts, EChartsOption, init } from "echarts";

let charts = ref<any>(null)

interface ChartProp {
  value: string;
  name: string;
  percentage: string;
}
onMounted(() => {
  let ageData = [
    {
      value: 200,
      name: "10岁以下",
      percentage: "16%"
    },
    {
      value: 110,
      name: "10 - 18岁",
      percentage: "8%"
    },
    {
      value: 150,
      name: "18 - 30岁",
      percentage: "10%"
    },
    {
      value: 310,
      name: "30 - 40岁",
      percentage: "26%"
    },
    {
      value: 250,
      name: "40 - 60岁",
      percentage: "20%"
    },
    {
      value: 260,
      name: "60岁以上",
      percentage: "20%"
    }
  ]
  initChart(ageData)
})

const initChart = (data: any): ECharts => {
  const charEle = charts.value
  const charEch: ECharts = init(charEle)
  /* echarts colors */
  const colors = ["#F6C95C", "#EF7D33", "#1F9393", "#184EA1", "#81C8EF", "#9270CA"];
  const option: EChartsOption = {
    color: colors,
    tooltip: {
      show: true,
      trigger: "item",
      formatter: "{b} <br/>占比：{d}%"
    },
    legend: {
      orient: "vertical",
      right: "20px",
      top: "15px",
      itemGap: 15,
      itemWidth: 14,
      formatter: function (name) {
        let text = "";
        data.forEach((val: ChartProp) => {
          if (val.name === name) {
            text = " " + name + "　 " + val.percentage
          }
        });
        return text;
      },
      textStyle: {
        color: "#fff"
      }
    },
    grid: {
      top: "bottom",
      left: 10,
      bottom: 10
    },
    series: [
      {
        zlevel: 1,
        name: "年龄比例",
        type: "pie",
        selectedMode: "single",
        radius: [50, 90],
        center: ["35%", "50%"],
        startAngle: 60,
        // hoverAnimation: false,
        label: {
          position: "inside",
          show: true,
          color: "#fff",
          formatter: function (params: any) {
            return params.data.percentage;
          },
          rich: {
            b: {
              fontSize: 16,
              lineHeight: 30,
              color: "#fff"
            }
          }
        },
        itemStyle: {
          shadowColor: "rgba(0, 0, 0, 0.2)",
          shadowBlur: 10
        },
        data: data.map((val: ChartProp, index: number) => {
          return {
            value: val.value,
            name: val.name,
            percentage: val.percentage,
            itemStyle: {
              borderWidth: 10,
              shadowBlur: 20,
              borderColor: colors[index],
              borderRadius: 10
            }
          };
        })
      },
      {
        name: "",
        type: "pie",
        selectedMode: "single",
        radius: [50, 90],
        center: ["35%", "50%"],
        startAngle: 60,
        data: [
          {
            value: 1000,
            name: "",
            label: {
              show: true,
              formatter: "{a|本日总数}",
              rich: {
                a: {
                  align: "center",
                  color: "rgb(98,137,169)",
                  fontSize: 14
                }
              },
              position: "center"
            }
          }
        ]
      }
    ]
  };
  charEch.setOption(option);
  return charEch;
}
defineExpose({
  initChart
})
</script>

<template>
  <div class="age">
    <div class="top">
      <p class="title">男女比例</p>
      <p class="bg"></p>
    </div>

    <div class="charts" ref="charts"></div>
  </div>
</template>

<style lang="scss" scoped>
.age {
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

  .charts {
    margin-top: 30px;
    width: 100%;
    height: 220px;
  }
}
</style>
