<template>
  <div>
    <!-- 全局加载组件 -->
    <div
      type="primary"
      @click="openFullScreen1"
      v-loading.fullscreen.lock="fullscreenLoading"
    ></div>
  </div>
</template>

<script>
export default {
  name: "FullscreenLoading",
  components: {},
  computed: {
    // vuex 多页面数据管理的引用
    fullscreenLoading() {
      return this.$store.state.fullscreenLoading;
    },
  },
  methods: {
    // 全局加载样式
    openFullScreen1() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
    },
  },
};
</script>