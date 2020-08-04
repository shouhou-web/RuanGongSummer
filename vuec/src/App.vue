<template>
  <div id="app">
    <div>
      <div class="topbar">
        <div class="project-name">
          PRACTICE OF YU
        </div>
        <div v-if="!token" class="user-operate">
          <router-link to="/register" tag="div">Log in/Sign up</router-link>
        </div>
        <div v-if="token" class="user-operate">
          {{$store.state.user.userName}}
        </div>
      </div>
      <div class="all-main">
        <router-view></router-view>
      </div>
      <div class="footer"></div>
      <!-- 全局加载组件 -->
      <fullscrren-loading></fullscrren-loading>
    </div>
  </div>
</template>

<script>
import FullscrrenLoading from "./components/common/fullscreenloading/FullscreenLoading"
import {login, register} from "@/network/user";

export default {
  name: "App",
  data() {
    return {

    }
  },
  computed: {
    token: function () {
      if (sessionStorage.getItem("user") != null){
        this.$store.commit("login",JSON.parse(sessionStorage.getItem("user")));
      }

      return this.$store.state.token;
    }
  },
  components: {
    FullscrrenLoading
  },
  methods: {

  }
};
</script>

<style>
@import "assets/css/base.css";

.topbar{
  display: flex;
  flex-direction: row;
  background: #b8b6b6;
}

.project-name {
  font-size: 30px;
  text-align: left;
  font-family: "JetBrains Mono";

  height: 80px;
  padding-top: 20px;
}

.user-operate{
  display: flex;

  font-size: 20px;
  font-family: "JetBrains Mono",KaiTi;

  height: 80px;
  padding-top: 30px;
  margin-left: 65%;

  cursor: pointer;
}

.all-main{
  position: absolute;
  width: 100%;
  height: 100%;
}

.footer{
  margin-top: 55%;
  height: 200px;
  background: #b8b6b6;
}
</style>

