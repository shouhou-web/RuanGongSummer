<template>
  <div class>
    <div>
      <my-button
        type="text"
        class="second-nav-item"
        :active="this.$store.state.homeMidNav === 1"
        @click="toRecent"
        >最近使用</my-button
      >
      <my-button
        type="text"
        class="second-nav-item"
        :active="this.$store.state.homeMidNav === 2"
        @click="toIMade"
        >我的创建</my-button
      >
      <my-button
        type="text"
        class="second-nav-item"
        :active="this.$store.state.homeMidNav === 3"
        @click="toMyColletion"
        >我的收藏</my-button
      >
    </div>
    <div>
      <transition mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkSpace",
  methods: {
    toRecent() {
      this.$router.push({ path: "/home/workSpace/recent" });
    },
    toIMade() {
      this.$router.push({ path: "/home/workSpace/iMade" });
    },
    toMyColletion() {
      this.$router.push({ path: "/home/workSpace/myCollection" });
    }
  },
  components: {}
};
</script>

<style scoped>
second-whole-page {
  display: flex;
  flex-direction: column;
}

.second-nav-item {
  font-size: 20px;
  padding: 10px 25px;
  margin: 20px;
}

.v-enter {
  opacity: 0;
}
.v-enter-active {
  transition: 0.5s;
}
.v-enter-to {
  opacity: 1;
}
.v-leave {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
.v-leave-active {
  transition: 0.3s;
}
</style>
