<template>
  <div id="home" class="whole-page">
    <div class="nav">
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
        <my-button type="text" class="nav-btn" @click="toRecent">
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
