<script setup lang="ts">
import { getTime } from '@/utils/time';
//引入用户相关的仓库,获取当前用户的头像、昵称
import useUserStore from '@/store/modules/user';
//获取存储用户信息的仓库对象
let userStore = useUserStore();

import setting from '@/setting.ts'
</script>

<template>
  <div class="container">
    <el-card>
      <div class="box">
        <img
          :src="userStore.avatar"
          alt=""
          class="avatar"
        >
        <div class="bottom">
          <h3 class="title">{{ getTime() }} {{ userStore.username }}</h3>
          <p class="subtitle">{{ setting.title }}</p>
        </div>
      </div>
    </el-card>
    <div class="bottoms">

    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100%;
  background: url(../../assets/images/welcome.png) no-repeat center 60%;
  background-size: 70%;
}

.box {
  display: flex;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 30px;

    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }

    .subtitle {
      font-style: italic;
    }
  }
}
.bottoms{
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>