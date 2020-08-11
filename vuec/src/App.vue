<template>
  <div id="app">
    <router-view></router-view>
    <!-- 全局加载组件 -->
    <fullscrren-loading></fullscrren-loading>
  </div>
</template>

<script>
import FullscrrenLoading from "components/common/fullscreen-loading/FullscreenLoading";
export default {
  name: "App",
  components: {
    FullscrrenLoading
  }
};
</script>

<style>
@import "assets/css/base.css";

</style>
