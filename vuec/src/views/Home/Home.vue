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
      <div class="second-nav">
        <transition mode="out-in">
          <router-view class="fade-in"></router-view>
        </transition>
      </div>
      <div class="sub-page">
        <div class="option-nav">
          <my-button type="text" class="nav-btn" @click="addNewDoc">
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
          <my-button type="text" class="nav-btn" @click="addNewTeam">
            <span class="nav-item">
              <img
                src="@/assets/icon/home/newteam.png"
                class="option-icon"
              />新建团队
            </span>
          </my-button>
        </div>
        <div class="column-divider"></div>
        <div class="Other">
          Other Things!
        </div>
      </div>
    </div>
    <m-hover
      :onShow="teamHoverOn"
      title="创建我的团队"
      assureBtn="创建"
      cancelBtn="取消"
      @cancel="cancelNewTeamHover"
      @submit="createNewTeamHover"
    >
      <div class="hover-text">
        请输入要创建的团队名称：
      </div>
      <input class="hover-input" placeholder="团队名称" v-model="teamName" />
    </m-hover>
  </div>
</template>

<script>
import MAppHeader from "components/content/m-app-header/MAppHeader";
import Recent from "./WorkSpace/WorkSpace";

import { addTeam } from "../../network/team.js";
import { addDoc } from "../../network/home.js";

export default {
  name: "Home",
  data() {
    return {
      user: "",
      teamName: "",
      teamHoverOn: false
    };
  },
  methods: {
    toRecent() {
      this.$router.push({ path: "/home/workSpace" });
    },
    toTrash() {
      this.$router.push({ path: "/home/trash" });
    },
    toTeamSpace() {
      this.$router.push({ path: "/home/teamSpace" });
    },
    addNewTeam() {
      this.teamHoverOn = true;
    },
    cancelNewTeamHover() {
      this.teamHoverOn = false;
    },
    createNewTeamHover() {
      if (!this.teamName) {
        this.$message.error("团队名称不能为空");
      }
      if (!this.user.userID) {
        this.$message.error("请先登录");
      }
      console.log(this.teamName);
      addTeam(this.user.userID, this.teamName).then(res => {
        console.log(res);
        if (res === 1) {
          this.$message.error("创建失败，请检查网络或联系管理员");
        } else if (res === 0) {
          this.teamHoverOn = false;
          this.$router.go(0);
          this.$message({
            message: "创建团队成功",
            type: "success"
          });
        }
      });
    },
    addNewDoc() {
      if (!this.user.userID) {
        this.$message.error("请先登录！");
      }
      var currentPath = this.$route.path;
      if (currentPath === "/home/teamSpace") {
        var nowTeamID = this.$store.state.nowTeamID;
        var hasTeam = this.$store.state.hasTeam;
        if (nowTeamID === -1) {
          if (!hasTeam) {
            this.$message.error("请先创建或加入团队");
          } else {
            this.$message.error("请选择团队后再创建文档");
          }
        } else {
          addDoc(this.user.userID, nowTeamID).then(res => {
            if (res === 1) {
              this.$message.error("创建文档失败，请检查网络或联系管理员");
            } else {
              this.$message({
                message: "创建文档成功",
                type: "success"
              });
              this.$router.push({
                path: "/doc",
                query: {
                  docID: res,
                  docTitle: ""
                }
              });
            }
          });
        }
      } else if (
        currentPath === "/home/workSpace/recent" ||
        currentPath === "/home/workSpace/iMade" ||
        currentPath === "/home/workSpace/myCollection"
      ) {
        addDoc(this.user.userID, 0).then(res => {
          if (res === 1) {
            this.$message.error("创建文档失败，请检查网络或联系管理员");
          } else {
            this.$message({
              message: "创建文档成功",
              type: "success"
            });
            this.$router.push({
              path: "/doc",
              query: {
                docID: res,
                docTitle: ""
              }
            });
          }
        });
      }
    },
    checkNotice() {
      this.noticeHoverOn = false;
    }
  },
  components: {
    Recent,
    MAppHeader
  },
  created() {
    this.user = this.$store.state.user;

    if (!this.user.userID) {
      this.$message.error("请先登录！");
      return;
    }
    console.log(this.user.userID);
  }
};
</script>

<style scoped>
.test {
  margin: 5px;
}

.main-page {
  background-color: #cce6ff;
  height: calc(100vh - 56px);
  justify-content: center;
  display: flex;
  padding: 35px 60px 0;
}

.nav-btn {
  padding: 13px;
  margin: 5px;
}

.nav,
.sub-page,
.second-nav {
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  background-color: rgba(255, 255, 255, 0.8);
}

.nav {
  height: 85vh;
  margin-right: 10px;
  padding: 10px 90px;
  width: 140px;
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

.column-divider {
  background-color: #b8b6b6;
  border: 0;
  border-top-style: solid;
  height: 1px;
  width: 180px;
}

.second-nav {
  height: 85vh;
  margin-left: 10px;
  margin-right: 10px;
  flex: 1;
}

.sub-page {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 85vh;
  margin-left: 10px;
  width: 200px;
}

.option-nav {
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.Other {
  margin-top: 20px;
}

.hover-text {
  margin-bottom: 5px;
  padding: 7px;
  width: 500px;
}

.hover-input {
  border: 1px solid #c5d9e8;
  border-radius: 20px;
  margin-bottom: 30px;
  margin-left: 20px;
  margin-top: 10px;
  padding: 8px 15px;
  width: 450px;
  transition: 0.5s;
}

.hover-input:focus {
  border-color: #3f536e;
  box-shadow: 2px 2px 5px 1px rgba(10, 69, 105, 0.2);
  transition: 0.5s;
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
