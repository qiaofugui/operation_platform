<script lang="ts" setup>
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'

import useUserStore from '@/store/modules/user'
import useSettingStore from '@/store/modules/setting'
const userStore = useUserStore()
const settingStore = useSettingStore()
</script>

<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
      :class="{ fold: settingStore.fold ? true : false }"
    >
      <Logo v-if="!settingStore.fold" />
      <p v-else style="text-align: center; color: #fff">LOGO</p>
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="$base-menu-background"
          text-color="#fff"
          router
          :default-active="$route.path"
          :collapse="settingStore.fold"
        >
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: settingStore.fold ? true : false }"
    >
      <Tabbar />
    </div>
    <!-- 主体内容 -->
    <div
      class="layout_main"
      :class="{ fold: settingStore.fold ? true : false }"
    >
      <Main />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;

    &.fold {
      width: $base-menu-min-width;
    }

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-tabbar-height);

      .el-menu {
        border: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    left: $base-menu-width;
    top: 0;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100vw - $base-menu-min-width);
    }
  }

  .layout_main {
    position: absolute;
    left: $base-menu-width;
    top: $base-tabbar-height;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100vw - $base-menu-min-width);
    }
  }
}
</style>
