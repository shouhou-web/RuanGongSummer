<template>
  <div id="home" class="whole-page">
    <div class="nav">
<!--      <div class="side-bar"></div>-->
      <div class="wrap">
        <my-button type="text" class="nav-btn" @click="toRecent">
          <span class="nav-item">
            <img src="@/assets/icon/header/ET.png" class="option-icon" />工作台
          </span>
        </my-button>
        <my-button type="text" class="nav-btn" @click="toRecent">
          <span class="nav-item">
            <img src="@/assets/icon/header/delete.png" class="option-icon" />回收站
          </span>
        </my-button>
        <my-button type="text" class="nav-btn" @click="toTeamSpace">
          <span class="nav-item">
            <img src="@/assets/icon/header/partner.png" class="option-icon" />团队空间
          </span>
        </my-button>
      </div>
    </div>
    <div class="second-nav">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MyButton from "components/common/l-app-button/MyButton";
import Recent from "./WorkSpace/WorkSpace";

export default {
  name: "Home",
  methods: {
    toRecent() {
      this.$router.push({path: '/home/workspace/recent'})
    },
    toTeamSpace() {
      this.$router.push({path: '/home/TeamSpace'})
    }
  },
  components: {
    MyButton,
    Recent,
  },
};
</script>

<style scoped>
.whole-page {
  display: flex;
}

.nav-btn {
  padding: 10px;
  margin: 5px;
}

.nav {
  width: 10%;
  height: 100%;
  margin: 30px;
}

.side-bar{
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-item {
  align-items: center;
  display: flex;
}

.option-icon {
  height: 24px;
  width: 24px;
}

.second-nav {
  width: 100%;
  margin: 20px 30px;
}

</style>
