<template>
  <div>
    <div class="opt">
      <m-nav-dropdown position="left" class="l-card__nav">
        <div slot="show">
          <img class="l-card__setting" src="@/assets/image/teamopt.svg">
        </div>
        <div slot="hide" style="border: 1px solid #ececec;border-radius: 5px;background-color: white">
          <div class="l-card__hide-main">
            <my-button type="text-danger"
                       class="l-card__nav-btn">自己加就行</my-button>
            <my-button type="text"
                       class="l-card__nav-btn">自己加就行</my-button>
          </div>
        </div>
        <input/>
      </m-nav-dropdown>
    </div>

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
    <div style="overflow: auto;height: 73vh;margin: 20px">
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
  components: {},
  created() {
    this.$store.state.hasTeam = false;
    this.$store.state.nowTeamID = -1;
  }
};
</script>

<style scoped>
second-whole-page {
  display: flex;
  flex-direction: column;
}

.second-nav-list {
  padding-left: 20px;
}

.second-nav-item {
  font-size: 17px;
  padding: 7px 20px;
  margin-left: 10px;
  margin-right: 5px;
  margin-top: 20px;
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
.opt{
  float: right;
  height: 10px;
  margin-top: 5px;
  margin-right: 30px;
}

.l-card {
  align-items: center;
  color: #303133;
  transition: 0.3s;
  overflow: hidden;
  -webkit-transition: 0.3s;
}

.l-card__nav {
  align-self: flex-end;
  margin-right: 2px;
  margin-top: 2px;
}

.l-card__setting {
  height: 18px;
  width: 18px;
}

.l-card__pic {
  width: 80px;
  height: 80px;
}

.l-card__body {
  margin: 10px 20px;
}

.l-card__hide-main {
  margin: auto;
  background-color: #FAFBFC;
  display: flex;
  flex-direction: column;
}

.l-card__nav-btn {
  padding: 10px 20px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.l-card__nav-btn:hover {
}
</style>
