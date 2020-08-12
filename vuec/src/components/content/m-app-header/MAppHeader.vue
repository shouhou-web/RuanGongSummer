<template>
  <div>
    <m-header>
      <template v-slot:left>
        <div class="welcome">
          <img class="welcome__img" src="@/assets/image/logo.png" alt="" />
        </div>
        <ul class="nav-left-ul">
          <li class="nav-left-item">
            <a class="nav-item__inner" href="#">云平台</a>
          </li>
          <li class="nav-left-item">
            <a class="nav-item__inner" href="#">课程中心</a>
          </li>
          <li class="nav-left-item">
            <a class="nav-item__inner" href="#">Github</a>
          </li>
        </ul>
      </template>
      <template v-slot:right>
        <div>
          <div class="nav-right-item" v-if="token">
            <app-search></app-search>
            <!-- 头像 -->
            <div class="item">
              <div class="mini-avator">
                <img class="mini-avator__inner" :src="user.imagePath" alt="" />
              </div>
              <!-- 隐藏部分 -->
              <div class="avator--show avator--hide">
                <div @click="toProfile" class="big-avator">
                  <img class="big-avator__inner" :src="user.imagePath" alt="" />
                </div>
                <div class="username">
                  {{ user.userName }}
                </div>
                <!-- 账户信息展示 -->
                <div class="account">
                  <div class="account-item">
                    <div class="account__header">
                      团队
                    </div>
                    <div class="account__content">
                      3
                    </div>
                  </div>
                  <div class="account-item">
                    <div class="account__header">
                      已完成
                    </div>
                    <div class="account__content">
                      1
                    </div>
                  </div>
                  <div class="account-item">
                    <div class="account__header">
                      协作成员
                    </div>
                    <div class="account__content">
                      15
                    </div>
                  </div>
                </div>
                <!-- 子页面选项 -->
                <div class="option">
                  <div class="option-item">
                    <div class="option__icon">
                      <img src="@/assets/icon/header/about.png" alt="" />
                    </div>
                    <div @click="toProfile" class="option__content">
                      账号设置
                    </div>
                  </div>
                  <div class="option-item">
                    <div class="option__icon">
                      <img src="@/assets/icon/header/component.png" alt="" />
                    </div>
                    <div class="option__content">
                      我的团队
                    </div>
                  </div>
                  <div class="option-item">
                    <div class="option__icon">
                      <img src="@/assets/icon/header/basics.png" alt="" />
                    </div>
                    <div class="option__content">
                      提交记录
                    </div>
                  </div>
                  <div class="option-item">
                    <div class="option__icon">
                      <img src="@/assets/icon/header/plugin.png" alt="" />
                    </div>
                    <div class="option__content">
                      成员统计
                    </div>
                  </div>
                </div>
                <div @click="logout" class="exit">
                  <div class="exit__icon">
                    <img src="@/assets/icon/header/exit.png" alt="" />
                  </div>
                  <div class="exit-content">
                    退出
                  </div>
                </div>
              </div>
            </div>
            <!-- 消息 -->
            <div class="item">
              <div class="">
                <a class="nav-item__inner" href="#">消息</a>
              </div>
              <!-- 隐藏层 -->
              <div class="message--show message--hide">
                <div class="header">
                  <div class="triangle"></div>
                </div>
                <ul class="">
                  <li>
                    <router-link :to="{ path: '/message' }">
                      加入申请
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="{ path: '/message/application' }">
                      团队邀请
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="{ path: '/message/system' }">
                      系统通知
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="nav-right-item" v-else>
            <app-search></app-search>
            <div class="item">
              <a @click="toLogin(0)" class="nav-item__inner">登录</a>
            </div>
            <div class="item">
              <a @click="toLogin(1)" class="nav-item__inner">注册</a>
            </div>
          </div>
        </div>
      </template>
    </m-header>
  </div>
</template>

<script>
import MHeader from "components/common/m-header/MHeader.vue";
import appSearch from "./childCpn/app-header-search";
export default {
  name: "MAppHeader",
  components: {
    MHeader,
    appSearch
  },
  props: {
    bgColor: {
      type: String,
      default: "var(--color-main)"
    }
  },
  data() {
    return {
      user: {} // 用户数据
    };
  },
  created() {
    this.user = this.$store.state.user;
  },
  computed: {
    token() {
      if (sessionStorage.getItem("user") != null) {
        // console.log("我执行了", sessionStorage.getItem("user"));
        this.$store.commit("login", JSON.parse(sessionStorage.getItem("user")));
      }
      // console.log(this.$store.state.token);
      return this.$store.state.token;
    }
  },
  methods: {
    toLogin(e) {
      console.log(e);
      this.$router.push({
        path: "/Login",
        query: {
          page: e
        }
      });
    },
    toProfile() {
      this.$router.push({ path: "/profile" });
    },
    logout() {
      this.$store.commit("logout");
      this.$router.push({ path: "/home" });
    }
  }
};
</script>
<style scoped>
.nav-left-ul,
.nav-right-item {
  align-items: center;
  display: flex;
}

.nav-left-item {
  margin-left: 15px;
}

.nav-item__inner {
  color: #fff;
  display: inline-block;
  height: 30px;
}

.welcome {
  height: 36px;
  width: 110px;
}

.welcome__img {
  height: 100%;
  width: 100%;
}

.nav-right {
  flex-shrink: 0;
}

.nav-right .item {
  display: flex;
  position: relative;
  margin-left: 36px;
  cursor: pointer;
}

.mini-avator {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  position: relative;
  margin-right: 10px;
}

.mini-avator__inner {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: 0.2s;
}

.message--show {
  height: 205px;
  left: -60px;
  line-height: 0;
  padding-top: 12px;
  position: absolute;
  width: 152px;
  z-index: 628;
}

.message--show .header {
  display: flex;
  justify-content: center;
  height: 12px;
}

.triangle {
  border: 6px solid #fff;
  border-top-color: transparent;
  border-right-color: transparent;
  border-left-color: transparent;
}

.message--show ul {
  background-color: #fff;
  padding: 7px 0;
}

.message--show li {
  font-size: 14px;
  padding: 20px;
}

.avator--show {
  align-items: center;
  background-color: #fff;
  cursor: auto;
  display: flex;
  flex-direction: column;
  line-height: 20px;
  left: -103px;
  position: absolute;
  padding: 7px 0;
  width: 240px;
  z-index: 628;
}

.big-avator,
.account-item,
.option-item,
.exit {
  cursor: pointer;
}

.big-avator {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: relative;
}

.big-avator__inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  margin-top: -25px;
}

.username {
  font-size: 16px;
  margin: -10px 0 10px;
}

.account {
  align-items: center;
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
  display: flex;
  justify-content: space-between;
  height: 58px;
  text-align: center;
  width: 100%;
}

.account-item {
  flex: 1;
  color: #999;
}

.account-item:hover {
  color: #00a1d6;
}

.account__header {
  font-size: 12px;
}

.account__content {
  height: 20px;
  font-size: 16px;
  font-weight: 600;
}

.option {
  border-bottom: 1px solid #f4f4f4;
  padding: 7px 0;
  width: 100%;
}

.exit,
.option-item {
  align-items: center;
  display: flex;
  font-size: 16px;
  padding: 8px 23px;
  width: 100%;
}

.message--show li:hover,
.exit:hover,
.option-item:hover {
  background-color: #f4f4f4;
}

.exit__icon,
.option__icon {
  height: 24px;
  width: 24px;
}

.exit__icon img,
.option__icon img {
  height: 100%;
  width: 100%;
}

.option__content,
.exit-content {
  margin-left: 15px;
}

/* ---------------隐藏层动效---------------- */

.avator--hide,
.message--hide {
  display: none;
  animation: slowout 0.5s ease forwards;
}

.item:hover .message--hide {
  display: block;
  animation: slowin 0.5s ease forwards;
}

.item:hover .mini-avator {
  transform: scale(1.3) translateY(20px);
  transition: transform 0.5s;
}

.item:hover .avator--hide {
  display: flex;
  animation: avator-show 0.5s ease forwards;
}

@keyframes slowin {
  0% {
    opacity: 0;
    top: 0;
  }
  100% {
    opacity: 1;
    top: 12px;
  }
}

@keyframes slowout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes avator-show {
  0% {
    opacity: 0;
    top: 0;
  }
  100% {
    opacity: 1;
    top: 40px;
  }
}
</style>
