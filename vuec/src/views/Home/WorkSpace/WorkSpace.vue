<template>
  <div class>
    <div>
      <my-button
        type="text"
        class="second-nav-item"
        id="button1"
        :active="isActive[0]"
        @click="toRecent"
        >最近使用</my-button
      >
      <my-button
        type="text"
        class="second-nav-item"
        :active="isActive[1]"
        @click="toIMade"
        >我的创建</my-button
      >
      <my-button
        type="text"
        class="second-nav-item"
        :active="isActive[2]"
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
  data() {
    return {
      activeIndex: 0,
      isActive: [true, false, false]
    };
  },
  methods: {
    toRecent() {
      if (this.activeIndex != 0) {
        this.isActive[this.activeIndex] = false;
        this.activeIndex = 0;
        this.isActive[0] = true;
      }
      this.$router.push({ path: "/home/workspace/recent" });
    },
    toIMade() {
      if (this.activeIndex != 1) {
        this.isActive[this.activeIndex] = false;
        this.activeIndex = 1;
        this.isActive[1] = true;
      }
      this.$router.push({ path: "/home/workspace/imade" });
    },
    toMyColletion() {
      if (this.activeIndex != 2) {
        this.isActive[this.activeIndex] = false;
        this.activeIndex = 2;
        this.isActive[2] = true;
      }
      this.$router.push({ path: "/home/workspace/mycollection" });
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

.v-enter{
 opacity: 0;
}
.v-enter-active{
 transition: 0.5s;
}
.v-enter-to{
 opacity: 1;
}
.v-leave{
 opacity: 1;
}
.v-leave-to{
 opacity:0;
}
.v-leave-active{
 transition: 0.3s;
}
</style>
