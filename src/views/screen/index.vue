<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 引入顶部子组件
import Top from './components/top/index.vue'
import Left from './components/left/index.vue'
import Center from './components/center/index.vue'

// #region
// 以下为数据大屏适配设置
let screenRef = ref<any>(null)
const getScale = (w = 1920, h = 1080) => {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h

  // 返回宽高比例较小的值，保证元素能够完全显示在屏幕内
  return ww < wh ? ww : wh
}
onMounted(() => {
  screenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`

  // 监听窗口变化，重新计算缩放比例并设置 transform 样式
  window.onresize = function () {
    screenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
  }
})
onUnmounted(() => {
  // 组件卸载时，移除监听事件
  window.onresize = null
})
// #endregion

</script>

<template>
  <div class="container">
    <!-- 数据大屏展示内容区域 -->
    <div
      class="screen"
      ref="screenRef"
    >
      <!-- 数据大屏顶部 -->
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Left />
        </div>
        <div class="center">
          <Center />
        </div>
        <div class="right">right</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  /* background: url(./images/bg1.png) no-repeat; */
  /* background: url(./images/bg2.png) no-repeat; */
  /* background: url(./images/bg3.jpg) no-repeat; */
  /* background: url(./images/bg4.jpg) no-repeat; */
  background-size: cover;

  .screen {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 1920px;
    height: 1080px;
    transform: scale(1);
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
    }

    .bottom {
      display: flex;

      .left {
        flex: 1;
        height: calc(1080px - 40px);
      }

      .center {
        flex: 2;
      }

      .right {
        flex: 1;
      }
    }
  }
}
</style>
