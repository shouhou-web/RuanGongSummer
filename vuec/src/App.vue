<template>
  <div id="app">
    <m-app-header></m-app-header>
    <router-view></router-view>
    <!-- 全局加载组件 -->
    <fullscrren-loading></fullscrren-loading>
  </div>
</template>

<script>
import MAppHeader from "components/common/m-header/MAppHeader";
import FullscrrenLoading from "components/common/fullscreen-loading/FullscreenLoading";
export default {
  name: "App",
  components: {
    MAppHeader,
    FullscrrenLoading
  }
};
</script>

<style>
@import "assets/css/base.css";

</style>
