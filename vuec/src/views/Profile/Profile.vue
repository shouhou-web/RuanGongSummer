<template>
  <div>
    <m-app-header></m-app-header>
    <div class="wrapper">
      <div class="profile-mask"></div>
      <div class="header">
        <profile-header :user="user" :achieve="achieve"></profile-header>
      </div>
      <div class="main">
        <div class="nav">
          <!-- <div class="nav-item" :class="[isEditProfile ? 'active' : '']">
            <router-link to="/profile/editProfile">账号信息</router-link>
          </div> -->
          <!-- <div class="nav-item">
            <router-link to="/profile/myTeam">参与的团队</router-link>
          </div>
          <div class="nav-item">
            <router-link to="/profile/setMessage">消息设置</router-link>
          </div> -->
        </div>
        <div class="div"></div>
        <!-- 子页面 -->
        <div class="content">
          <edit-profile :user="user"></edit-profile>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MAppHeader from "components/content/m-app-header/MAppHeader";
import ProfileHeader from "./childCpn/profile-header";
import EditProfile from "./EditProfile";
import { getUserAchievement, getUserInfo } from "network/user";
export default {
  name: "Home",
  components: {
    MAppHeader,
    ProfileHeader,
    EditProfile,
  },
  created() {
    let userID = this.$route.query.userID;
    if (userID == this.$store.state.user.userID) {
      this.user = this.$store.state.user;
      getUserAchievement(userID).then((res) => {
        this.achieve = res;
        this.$store.commit("setAchieve", res);
      });
    } else
      getUserInfo(userID)
        .then((res) => {
          this.user = res;
        })
        .then(
          getUserAchievement(userID).then((res) => {
            this.achieve = res;
            this.$store.commit("setAchieve", res);
          })
        )
        .catch((err) => {
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~",
          });
          this.$router.go(-1);
        });
  },
  data() {
    return {
      user: {},
      achieve: {},
    };
  },
  computed: {
    isEditProfile() {
      return this.$route.path == "/profile/editProfile";
    },
  },
};
</script>

<style scoped>
.profile-mask {
  background-color: rgba(255, 255, 255, 0.5);
  height: 100vh;
  left: 0;
  width: 100vw;
  position: absolute;
  top: 0;
  z-index: -1;
}

.wrapper {
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 12px #ebebeb;
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
