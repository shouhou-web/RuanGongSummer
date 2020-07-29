<template>
  <div id="app">
    <el-container>
      <el-header>
        HEADER
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>

      <!-- 全局加载组件 -->
      <fullscrren-loading></fullscrren-loading>
    </el-container>
  </div>
</template>

<script>
import FullscrrenLoading from "./components/common/fullscreenloading/FullscreenLoading"
export default {
  name: "App",
  components: {
    FullscrrenLoading
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>

