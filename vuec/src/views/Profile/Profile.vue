<template>
  <div class="wrapper">
    <div class="header">
      <profile-header></profile-header>
    </div>
    <div class="main">
      <div class="nav">
        <div class="nav-item" :class="[isEditProfile ? 'active' : '']">
          <router-link to="/profile/editProfile">账号信息</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/profile/myTeam">参与的团队</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/profile/setMessage">消息设置</router-link>
        </div>
      </div>
      <div class="div"></div>
      <!-- 子页面 -->
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileHeader from "./childCpn/profile-header";
export default {
  name: "Home",
  components: {
    ProfileHeader
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    isEditProfile() {
      return this.$route.path == "/profile/editProfile";
    }
  }
};
</script>

<style scoped>
.wrapper {
  border-radius: 8px;
  background-color: #fff;
  box-shadow:  0 2px 12px #ebebeb;
  margin: 100px auto 0;
  padding-bottom: 20px;
  width: 746px;
}

.main {
  padding: 0 70px;
}

.nav {
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
}

.nav-item {
  cursor: pointer;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  width: 100px;
}

.active,
.nav-item:hover {
  border-bottom: 1px solid var(--color-main);
}

.active a,
.nav-item:hover a {
  color: var(--color-main);
  font-weight: bold;
}

.div {
  border-bottom: 1px solid #f0f0f0;
  margin: 0px auto 10px;
}
</style>
