<template>
<div id="home">
  <m-app-header></m-app-header>
  <div class="main-page">
    <div class="nav">
      <!--      <div class="side-bar"></div>-->
      <div class="wrap">
        <my-button type="text" class="nav-btn" @click="toRecent" :active="isActive[0]">
          <span class="nav-item">
            <img src="@/assets/icon/home/ET.png" class="option-icon" />工作台
          </span>
        </my-button>
        <my-button type="text" class="nav-btn" @click="toTrash" :active="isActive[1]">
          <span class="nav-item">
            <img
              src="@/assets/icon/home/delete.png"
              class="option-icon"
            />回收站
          </span>
        </my-button>
        <my-button type="text" class="nav-btn" @click="toTeamSpace" :active="isActive[2]">
          <span class="nav-item">
            <img
              src="@/assets/icon/home/partner.png"
              class="option-icon"
            />团队空间
          </span>
        </my-button>
      </div>
    </div>
    <div class="divider"></div>
    <div class="second-nav">
      <transition mode="out-in">
        <router-view class="fade-in"></router-view>
      </transition>
    </div>
    <div class="sub-page">
      <div class="option-nav">
        <my-button type="text" class="nav-btn">
          <span class="nav-item">
            <img src="@/assets/icon/home/new.png" class="option-icon" />新建文档
          </span>
        </my-button>
        <my-button type="text" class="nav-btn">
          <span class="nav-item">
            <img
              src="@/assets/icon/home/sample.png"
              class="option-icon"
            />文档模板
          </span>
        </my-button>
        <my-button type="text" class="nav-btn">
          <span class="nav-item">
            <img
              src="@/assets/icon/home/newteam.png"
              class="option-icon"
            />新建团队
          </span>
        </my-button>
        <my-button type="text" class="nav-btn">
          <span class="nav-item">
            <img
              src="@/assets/icon/home/upload.png"
              class="option-icon"
            />导入文档
          </span>
        </my-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import MAppHeader from "@/components/common/m-header/MAppHeader";
import Recent from "./WorkSpace/WorkSpace";

export default {
  name: "Home",
  data() {
    return {
      activeIndex: -1,
      isActive: [false, false, false]
    };
  },
  methods: {
    toRecent() {
      if(this.activeIndex != 0) {
        this.isActive[this.activeIndex] = false;
        this.activeIndex = 0;
        this.isActive[0] = true;
      }
      this.$router.push({ path: "/home/workspace/recent" });
    },
    toTrash() {
      if(this.activeIndex != 1) {
        this.isActive[this.activeIndex] = false;
        this.activeIndex = 1;
        this.isActive[1] = true;
      }
      this.$router.push({ path: "/home/workspace/trash" });
    },
    toTeamSpace() {
      if(this.activeIndex != 2) {
        this.isActive[this.activeIndex] = false;
        this.activeIndex = 2;
        this.isActive[2] = true;
      }
      this.$router.push({ path: "/home/teamSpace" });
    }
  },
  components: {
    Recent,
    MAppHeader
  }
};
</script>

<style scoped>
.main-page {
  align-items: center;
  display: flex;
}

.nav-btn {
  padding: 10px;
  margin: 5px;
}

.nav {
  background-color: #ffffff;
  height: 90vh;
  margin: 30px;
  padding: 10px 100px;
  width: 10%;
}

.side-bar {
  position: absolute;
  border: 2px solid #7c7878;
  border-radius: 10px;
  margin-top: -3vh;
  margin-left: -3vh;
  z-index: -1;
  width: 25vh;
  height: 100vh;
  background-color: #ecf0f1;
}

.wrap {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.nav-item {
  align-items: center;
  display: flex;
}

.option-icon {
  height: 24px;
  width: 24px;
}

.divider {
  background-color: #b8b6b6;
  border: 0;
  border-top-style: solid;
  display: block;
  height: 92vh;
  margin: 0px 1px;
  width: 2px;
}

.second-nav {
  background-color: #ffffff;
  height: 90vh;
  margin: 20px 30px;
  width: 65%;
}

.sub-page {
  align-items: center;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  height: 90vh;
  width: 13%;
}

.option-nav {
  align-items: center;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

.fade-in {
  opacity: 1;
  transition: opacity 0.5s;
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
