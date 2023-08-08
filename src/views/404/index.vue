<script setup lang="ts">
import { useRouter } from 'vue-router';
let $router = useRouter();
const goHome = () => {
  $router.push('/home')
}
</script>

<template>
  <div class="box">
    <img src="../../assets/images/error_images/404.png" />
    <div>
      <h2>你访问的页面不存在~🤷‍♂️🤷‍♀️</h2>
      <p>请检查你的 url 是否正确，或者点击下面按钮回到首页</p>
      <div>
        <el-button
          type="primary"
          round
          @click="goHome"
        >返回到首页</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 800px;
    height: 400px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    h2 {
      color: #409eff;
      font-size: 36px;
      font-weight: 600;
    }
    p {
      color: gray;
      font-size: 16px;
      margin: 20px 0 50px 0;
    }
  }
}
</style>