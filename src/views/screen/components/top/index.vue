<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import moment from 'moment'

const router = useRouter()
const goHome = () => {
  router.push('/')
}
// 存储当前时间
let time = ref<any>(moment().format('YYYY年MM月DD日 HH:mm:ss'))
let timer = ref<any>(null)
// 开启定时器
onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY年MM月DD日 HH:mm:ss')
  }, 1000)
})
// 组件卸载时，清除定时器
onUnmounted(() => {
  clearInterval(timer.value)
})
</script>

<template>
  <div class="top">
    <div class="left">
      <div
        class="lbtn"
        @click="goHome"
      >首页</div>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据展示平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间: {{ time }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  display: flex;
  width: 100%;
  height: 100%;

  .left {
    flex: 1.5;
    display: flex;
    justify-content: end;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;

    .lbtn {
      width: 150px;
      height: 40px;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      cursor: pointer;
    }
  }

  .center {
    flex: 2;

    .title {
      width: 100%;
      height: 75px;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      font-size: 28px;
      text-align: center;
      line-height: 75px;
      color: #29fcff;
    }
  }

  .right {
    flex: 1.5;
    display: flex;
    justify-content: space-between;
    background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: cover;
    text-align: center;
    line-height: 40px;
    color: #29fcff;

    .rbtn {
      width: 150px;
      height: 40px;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      font-size: 20px;
    }

    .time {
      font-size: 18px;
      margin-right: 10px;
    }
  }
}
</style>
