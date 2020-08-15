<template>
  <div>
    <div class="second-nav-list">
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
    <div class="second-nav-main">
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
    },
  },
  components: {},
  created() {
    this.$store.state.hasTeam = false;
    this.$store.state.nowTeamID = -1;
  },
};
</script>

<style scoped>
second-whole-page {
  display: flex;
  flex-direction: column;
}

.second-nav-list {
  /* background-color: #fff;
  box-shadow: var(--box-shadow); */
  border-radius: 12px;
  margin: 10px 20px;
  padding: 10px 0;
}

.second-nav-item {
  font-size: 17px;
  padding: 7px 20px;
  margin-left: 15px;
}

.second-nav-main {
  /* background-color: #fff;
  box-shadow: var(--box-shadow);
  border-radius: 12px; */
  overflow: auto;
  height: 73vh;
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
