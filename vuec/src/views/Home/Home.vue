<template>
  <div id="home">
    <m-app-header></m-app-header>
    <div class="main-page">
      <div class="nav">
        <div class="wrap">
          <my-button
            type="text"
            class="nav-btn"
            @click="toRecent"
            :active="this.$store.state.homeLeftNav === 1"
          >
            <span class="nav-item">
              <img src="@/assets/icon/home/ET.png" class="option-icon" />工作台
            </span>
          </my-button>
          <my-button
            type="text"
            class="nav-btn"
            @click="toTrash"
            :active="this.$store.state.homeLeftNav === 2"
          >
            <span class="nav-item">
              <img
                src="@/assets/icon/home/delete.png"
                class="option-icon"
              />回收站
            </span>
          </my-button>
          <my-button
            type="text"
            class="nav-btn"
            @click="toTeamSpace"
            :active="this.$store.state.homeLeftNav === 3"
          >
            <span class="nav-item">
              <img
                src="@/assets/icon/home/partner.png"
                class="option-icon"
              />团队空间
            </span>
          </my-button>
        </div>
      </div>
      <div class="row-divider"></div>
      <div class="second-nav">
        <transition mode="out-in">
          <router-view class="fade-in"></router-view>
        </transition>
      </div>
      <div class="row-divider"></div>
      <div class="sub-page">
        <div class="option-nav">
          <my-button type="text" class="nav-btn">
            <span class="nav-item">
              <img
                src="@/assets/icon/home/new.png"
                class="option-icon"
              />新建文档
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
        <div class="column-divider"></div>
        <div class="Other">
          Other Things!
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
  methods: {
    toRecent() {
      this.$router.push({ path: "/home/workSpace" });
    },
    toTrash() {
      this.$router.push({ path: "/home/trash" });
    },
    toTeamSpace() {
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
  padding: 13px;
  margin: 5px;
}

.nav {
  background-color: #ffffff;
  height: 90vh;
  margin: 30px;
  padding: 10px 90px;
  width: 10%;
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

.row-divider {
  background-color: #b8b6b6;
  border: 0;
  border-top-style: solid;
  height: 92vh;
  width: 2px;
}

.column-divider {
  background-color: #b8b6b6;
  border: 0;
  border-top-style: solid;
  height: 1px;
  width: 180px;
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
  margin: 30px;
  width: 13%;
}

.option-nav {
  align-items: center;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.Other {
  margin-top: 20px;
}

.fade-in {
  opacity: 1;
  transition: opacity 0.5s;
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
