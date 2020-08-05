<template>
  <div id="app">
    <div class="header">
      <div class="header__name">
        PRACTICE OF YU
      </div>
      <div class="header__userstate" v-if="!token">
        <router-link tag="div" to="/register">
          Log in/Sign up
        </router-link>
      </div>
      <div class="header__userstate" v-if="token">
        {{$store.state.user.userName}}
      </div>
    </div>

    <div class="main">
      <router-view></router-view>
    </div>

    <div class="footer"></div>
    <!-- 全局加载组件 -->
    <fullscrren-loading></fullscrren-loading>
  </div>
</template>

<script>
import FullscrrenLoading from "./components/common/fullscreenloading/FullscreenLoading"
import {login, register} from "@/network/user";

export default {
  name: "App",
  data() {
    return {
      // 暂无可用数据
    }
  },
  computed: {
    token: function () {
      if (sessionStorage.getItem("user") != null) {
        this.$store.commit("login", JSON.parse(sessionStorage.getItem("user")));
      }
      return this.$store.state.token;
    }
  },
  components: {
    FullscrrenLoading
  },
  methods: {}
};
</script>

<style scoped>
@import "assets/css/base.css";

.header {
  background: #66ccff;
  display: flex;
  flex-direction: row;
}

.header__name {
  font-size: 30px;
  height: 80px;
  padding-left: 20px;
  padding-top: 20px;
  text-align: left;
}

.header__userstate {
  cursor: pointer;
  display: flex;
  font-size: 20px;
  height: 80px;
  margin-left: 65%;
  padding-top: 30px;
}

.main {
  height: 100%;
  position: absolute;
  width: 100%;
}

.footer {
  background: #66ccff;
  height: 200px;
  margin-top: 55%;
}
</style>

