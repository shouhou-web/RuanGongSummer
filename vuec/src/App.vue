<template>
  <div id="app">
    <router-view></router-view>
    <!-- 全局加载组件 -->
    <fullscrren-loading class="loading"></fullscrren-loading>
  </div>
</template>

<script>
import FullscrrenLoading from "components/common/fullscreen-loading/FullscreenLoading";
export default {
  name: "App",
  components: {
    FullscrrenLoading,
  },
  created() {
    if (sessionStorage.getItem("user") != null) {
      console.log("我执行了", sessionStorage.getItem("user"));
      this.$store.commit("login", JSON.parse(sessionStorage.getItem("user")));
    }
    // console.log(this.$store.state.token);
  },
};
</script>

<style>
@import "assets/css/base.css";
#app {
  min-height: 100vh;
}
</style>
