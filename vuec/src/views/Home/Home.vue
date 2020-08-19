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
          <my-button type="text" class="nav-btn" @click="openTemplate">
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

    <m-hover :on-show="openTemplates"
             title="模板文件库"
             cancel-btn="X"
             @cancel="openTemplates = false">
      <div style="display: flex;flex-direction: row">
        <div v-for="(temp,tIndex) in templates" :key="tIndex">
          <div @click="addNewDocWithTeamplate(temp.templateID)">
            <l-model-card :title="temp.templateName"
                          :i-d="temp.templateID"
                          >
            </l-model-card>
          </div>
        </div>
      </div>
    </m-hover>
  </div>
</template>

<script>
import MAppHeader from "components/content/m-app-header/MAppHeader";
import Recent from "./WorkSpace/WorkSpace";

import { addTeam } from "../../network/team.js";
import { addDoc,addDocWithTemplate,getAllTemplate } from "../../network/doc.js";

export default {
  name: "Home",
  data() {
    return {
      user: "",
      teamName: "",
      teamHoverOn: false,
      templates: '',
      openTemplates: false
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
      if (!this.user.userID) {
        this.$message.error("请先登录");
        return;
      }
      if (!this.teamName) {
        this.$message.error("团队名称不能为空");
        return;
      }
      if (this.teamName.length > 10) {
        this.$message.error("团队名称不能超过10个字");
        return;
      }
      console.log(this.teamName);
      addTeam(this.user.userID, this.teamName).then((res) => {
        console.log(res);
        if (res === 1) {
          this.$message.error("创建失败，请检查网络或联系管理员");
        } else if (res === 0) {
          this.teamHoverOn = false;
          this.teamName = "";
          this.$router.go(0);
          this.$message({
            message: "创建团队成功",
            type: "success",
          });
        }
      });
    },
    addNewDoc() {
      if (!this.user.userID) {
        this.$message.error("请先登录！");
        return;
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
          addDoc(this.user.userID, nowTeamID).then((res) => {
            if (res === 1) {
              this.$message.error("创建文档失败，请检查网络或联系管理员");
            } else {
              this.$message({
                message: "创建文档成功",
                type: "success",
              });
              this.$router.push({
                path: "/doc",
                query: {
                  docID: res,
                  docTitle: "",
                },
              });
            }
          });
        }
      } else if (
        currentPath === "/home/workSpace/recent" ||
        currentPath === "/home/workSpace/iMade" ||
        currentPath === "/home/workSpace/myCollection"
      ) {
        addDoc(this.user.userID, 0).then((res) => {
          if (res === 1) {
            this.$message.error("创建文档失败，请检查网络或联系管理员");
          } else {
            this.$message({
              message: "创建文档成功",
              type: "success",
            });
            this.$router.push({
              path: "/doc",
              query: {
                docID: res,
                docTitle: "",
              },
            });
          }
        });
      }
    },
    checkNotice() {
      this.noticeHoverOn = false;
    },
    getTemplates() {
      console.log('获取模板');
      getAllTemplate()
        .then(res => {
          console.log(res);
          this.templates = res;
        })
        .catch(err => {
          this.$message.error('无法获取模板，请检查网络');
        })
    },
    openTemplate() {
      console.log('OPEN');
      this.openTemplates = true;
      this.getTemplates();
    },
    addNewDocWithTeamplate(templateID) {
      console.log('啊这啊这啊这啊这');
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
            this.$message.error("请选择团队后再创建模板文档");
          }
        } else {
          addDocWithTemplate(this.$store.state.user.userID,nowTeamID,templateID)
            .then(res => {
              console.log('TEAM - TEMPLAETE - DOC',res);
              if (res === null) {
                this.$message.error("创建文档失败，请检查网络或联系管理员");
              }
              else {
                this.$message.success('模板文档创建成功');
                this.$router.push({
                  path: "/doc",
                  query: {docID: res.docID, docTitle: res.docTitle},
                })
              }
            })
        }
      } else if (
        currentPath === "/home/workSpace/recent" ||
        currentPath === "/home/workSpace/iMade" ||
        currentPath === "/home/workSpace/myCollection"
      ) {
        addDocWithTemplate(this.$store.state.user.userID,0,templateID)
          .then(res => {
            console.log('TEAM - TEMPLAETE - DOC',res);
            if (res === null) {
              this.$message.error("创建文档失败，请检查网络或联系管理员");
            }
            else {
              this.$message.success('模板文档创建成功');
              this.$router.push({
                path: "/doc",
                query: {docID: res.docID, docTitle: res.docTitle},
              })
            }
          })
      }
    },
  },
  components: {
    Recent,
    MAppHeader,
  },
  created() {
    this.user = this.$store.state.user;

    if (!this.user.userID) {
      this.$message.error("请先登录！");
      return;
    }
  },
};
</script>

<style scoped>
#home {
  --height: calc(100vh - 56px);
}

#home ::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

#home ::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: #a1c4fd;
}

#home ::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(236, 186, 186, 0.2);
  background: none;
  border-radius: 10px;
}

.test {
  margin: 5px;
}

.main-page {
  background-color: var(--color-background-main);
  height: var(--height);
  justify-content: center;
  display: flex;
  padding: 0px 50px;
}

.nav-btn {
  padding: 13px;
  margin: 5px;
}

.nav,
.sub-page {
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.5);
}

.second-nav {
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
}

.nav {
  height: var(--height);
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
  height: var(--height);
  flex: 1;
}

.sub-page {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: var(--height);
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
