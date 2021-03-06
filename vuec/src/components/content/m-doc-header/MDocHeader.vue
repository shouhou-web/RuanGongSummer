<template>
  <div>
    <m-header bgColor="var(--color-background-main)">
      <template v-slot:left>
        <m-nav-dropdown position="right">
          <my-button slot="show" size="small">快速跳转</my-button>
          <div slot="hide">
            <div class="back-item">
              <div class="back-header">
                返回到
              </div>
              <router-link
                class="back-a"
                v-for="(item, index) in back"
                :to="item.href"
                :key="index"
              >
                <img class="back-a__icon" :src="item.iconSrc" alt="" />
                <div class="back-a__title">{{ item.title }}</div>
              </router-link>
            </div>
            <!-- 最近访问的文档。 -->
            <div v-if="recentDoc.length > 0" class="back-item">
              <div class="back-header">
                最近使用
              </div>
              <a
                @click="toRecent(item)"
                class="back-a"
                v-for="(item, index) in recentDoc"
                :key="index"
              >
                <img
                  class="back-a__icon"
                  src="@/assets/icon/doc/file.png"
                  alt=""
                />
                <div class="back-a__title">{{ item.docTitle }}</div>
              </a>
            </div>
          </div>
        </m-nav-dropdown>

        <!-- 标题 -->
        <div class="doc-title">
          <input
            @blur="submitDocTitle"
            class="doc-input"
            v-model="doc.docTitle"
            type="text"
          />
        </div>
      </template>
      <template v-slot:right>
        <div class="doc-right-nav">
          <div
            v-for="collaborator in collaboratorInfo"
            :key="collaborator.userID"
            class="collaborators"
          >
            <img :src="collaborator.imagePath" class="collaborator-image" @click="toProfile(collaborator.userID)" />
          </div>
          <div v-if="isCreator" class="team">
            <my-button @click="openCooperation" size="small">协作</my-button>
          </div>
          <div class="share">
            <my-button size="small" @click="openCopy">分享</my-button>
          </div>
          <div class="share">
            <my-button
              size="small"
              @click="(isOpenComment = !isOpenComment), (isOpenHistory = false)"
              >评论</my-button
            >
          </div>
          <div class="share">
            <my-button
              size="small"
              @click="(isOpenHistory = !isOpenHistory), (isOpenComment = false)"
              >历史</my-button
            >
          </div>
          <div class="other">
            <m-nav-dropdown position="middle">
              <my-button slot="show" size="small">其他操作</my-button>
              <div slot="hide">
                <ul class="other-list">
                  <li class="other-item" @click="toCollectDoc(doc.docID)">
                    收藏文档
                  </li>
                  <li class="other-item" @click="openCopy">
                    分享文档
                  </li>
                  <li class="other-item" @click="copyNowDoc">
                    创建副本
                  </li>
                </ul>
              </div>
            </m-nav-dropdown>
          </div>
        </div>

        <!-- 分享 -->
        <m-hover :on-show="openShare" title="分享此文档链接" :width="350">
          <input
            type="text"
            id="input"
            :value="shareSrc"
            class="input-share"
            readonly=""
          />
          <span
            v-clipboard:copy="shareSrc"
            v-clipboard:success="onCopy"
            v-clipboard:error="onCopyError"
            class="button-share"
          >
            复制
          </span>
        </m-hover>

        <m-hover
          :onShow="isCooperation"
          title="权限设置"
          assureBtn="确认"
          cancelBtn="取消"
          :width="350"
          @submit="submit"
          @cancel="cancel"
        >
          <div class="hover-div"></div>
          <div class="hover-line">
            <div class="hover-title">
              其他用户
            </div>
            <my-button :active="isOtherCant" @click="otherCant" type="text">
              不可读
            </my-button>
            <my-button :active="isOtherCan" @click="otherCan" type="text">
              可读
            </my-button>
          </div>
          <div class="hover-div"></div>
          <div v-if="doc.teamName" class="hover-line">
            <div class="hover-title">
              团队成员
            </div>
            <my-button :active="isTeamRead" @click="teamRead" type="text">
              可读
            </my-button>
            <my-button :active="isTeamWrite" @click="teamWrite" type="text">
              可写
            </my-button>
          </div>
        </m-hover>
      </template>
    </m-header>
    <div
      class="side-bar"
      :class="{
        'side-bar-active': isOpenComment,
        'side-bar--comment': isCommentActive,
      }"
    >
      <doc-comment
        @openComment="commentActive"
        :doc="doc"
        :flag="isOpenComment"
      ></doc-comment>
    </div>
    <div class="side-bar" :class="{ 'side-bar-active': isOpenHistory }">
      <m-doc-history :docID="doc.docID" :flag="isOpenHistory"></m-doc-history>
    </div>
  </div>
</template>

<script>
import MHeader from "components/common/m-header/MHeader.vue";
import docComment from "@/components/content/m-doc-header/childCpn/docComment";
import MDocHistory from "@/components/content/m-doc-header/childCpn/m-doc-history";
import {
  editDocTitle,
  getRecentDocs,
  setDocLimit,
  completeEditDoc,
  collectDoc,
  deleteDoc,
  copyDoc,
  getDocCollaborator,
} from "network/doc";
import { getTeamDocs } from "@/network/team";
export default {
  name: "MDocHeader",
  components: {
    MHeader,
    docComment,
    MDocHistory,
  },
  props: {
    doc: {
      // 文档对象
      type: Object,
      default: {},
    },
    collaboratorInfo: Array,
  },
  mounted() {
    getRecentDocs(this.$store.state.user.userID).then((res) => {
      this.recentDoc = res;
      if (res.length > 10) {
        this.recentDoc = res.slice(0, 9);
      }
    });
  },
  computed: {
    isCreator() {
      return this.$store.state.user.userID == this.doc.creatorID;
    },
  },
  data() {
    return {
      isOtherCan: false,
      isOtherCant: false,
      isTeamRead: false,
      isTeamWrite: false,
      isCooperation: false, // 是否编辑权限
      isOpenComment: false,
      isOpenHistory: false,
      docIdentity: 0, // 文档权限
      isCommentActive: false, // 是否打开评论框
      // 返回跳转
      back: [
        {
          title: "工作台",
          iconSrc: require("@/assets/icon/doc/workspace.png"),
          href: {
            path: "/home/workSpace",
          },
        },
        {
          title: "团队空间",
          iconSrc: require("@/assets/icon/doc/teamspace.png"),
          href: {
            path: "/home/teamSpace",
          },
        },
        {
          title: "回收站",
          iconSrc: require("@/assets/icon/doc/desktop.png"),
          href: {
            path: "/home/trash",
          },
        },
      ],
      // 近期文档
      recentDoc: [],
      // 打开分享hover
      openShare: false,
      // 分享信息
      shareSrc: "",
    };
  },
  watch: {
    doc(val) {
      console.log("watch");
      this.doc.docTitle = val.docTitle;
      switch (val.docLimit) {
        case 0:
          this.isOtherCan = true;
          this.isTeamRead = true;
          this.isTeamWrite = true;
          break;
        case 1:
          this.isOtherCant = true;
          this.isTeamRead = true;
          this.isTeamWrite = true;
          break;
        case 2:
          this.isOtherCan = true;
          this.isTeamRead = true;
          this.isTeamWrite = false;
          break;
        case 3:
          this.isOtherCant = true;
          this.isTeamRead = true;
          this.isTeamWrite = false;
          break;
        case 4:
          this.isOtherCant = true;
          break;
      }
    },
    collaboratorInfo(val) {
      this.collaboratorInfo = val;
      console.log("testtesttest");
    },
  },
  methods: {
    // 跳转到个人信息界面
    toProfile(userID) {
      this.$router.push({ path: '/profile', query: { userID } });
    },
    // 切换是否打开中部悬浮窗
    commentActive() {
      // console.log('我打开了悬浮窗')
      this.isCommentActive = !this.isCommentActive;
    },
    otherCan() {
      this.isOtherCan = !this.isOtherCan;
      if (this.isOtherCan) {
        this.isOtherCant = false;
        this.isTeamRead = true;
      }
    },
    otherCant() {
      this.isOtherCant = !this.isOtherCant;
      if (this.isOtherCant) {
        this.isOtherCan = false;
        this.isOtherCant = true;
      }
    },
    teamRead() {
      if (!this.isTeamWrite) this.isTeamRead = !this.isTeamRead;
      if (!this.isTeamRead) {
        this.isOtherCan = false;
        this.isOtherCant = true;
      }
    },
    teamWrite() {
      this.isTeamWrite = !this.isTeamWrite;
      if (this.isTeamWrite) this.isTeamRead = true;
    },
    // 打开协作框
    openCooperation() {
      this.isCooperation = true;
    },
    // 监听确定事件
    submit() {
      let docLimit = this.doc.docLimit;
      if (
        this.isOtherCan == true &&
        this.isTeamRead == true &&
        this.isTeamWrite == true
      )
        docLimit = 0;
      else if (
        this.isOtherCant == true &&
        this.isTeamRead == true &&
        this.isTeamWrite == true
      )
        docLimit = 1;
      else if (
        this.isOtherCan == true &&
        this.isTeamRead == true &&
        this.isTeamWrite == false
      )
        docLimit = 2;
      else if (
        this.isOtherCant == true &&
        this.isTeamRead == true &&
        this.isTeamWrite == false
      )
        docLimit = 3;
      else docLimit = 4;
      setDocLimit(this.$store.state.user.userID, this.doc.docID, docLimit).then(
        (res) => {
          if (res == 0) {
            this.$notify({
              title: "成功",
              message: "修改文档权限成功",
              type: "success",
            });
            this.isCooperation = false;
          } else
            this.$notify.error({
              title: "网络错误",
              message: "请稍后重试~",
            });
        }
      );
    },
    // 取消悬浮窗展示
    cancel() {
      this.isCooperation = false;
    },
    // 修改帖子标题
    submitDocTitle() {
      editDocTitle(
        this.$store.state.user.userID,
        this.doc.docID,
        this.doc.docTitle
      )
        .then((res) => {
          if (res == 1)
            this.$notify.error({
              title: "网络错误",
              message: "请稍后重试~",
            });
        })
        .catch((err) => {
          console.log(err);
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~",
          });
        });
    },
    // 跳转到近期浏览
    toRecent(item) {
      // console.log("child:toRecent");
      this._onBlur();
      this.$emit("toRecent", item);
    },
    // 失焦事件
    _onBlur() {
      // console.log("onBlur");
      if (this.$store.state.editState) {
        // console.log("放锁");
        completeEditDoc(this.$store.state.user.userID, this.doc.docID).then(
          (res) => {
            // console.log("返回", res);
          }
        );
        this.$store.commit("loseEditState");
      }
    },
    // 复制
    openCopy() {
      this.openShare = true;
      var toDoc = window.location.href;
      this.shareSrc = toDoc;
      // console.log(toDoc);
    },
    onCopy() {
      this.$message.success("复制成功！");
      this.openShare = false;
    },
    onCopyError() {
      this.$message.error("复制失败");
    },
    toCollectDoc(docID) {
      collectDoc(this.$store.state.user.userID, docID).then((res) => {
        // console.log(res);
        if (res === 1) {
          // 隐患
          this.$message.info("文档已经被收藏");
        } else {
          this.docDeleteHoverOn = false;
          this.$message({
            message: "收藏文档成功",
            type: "success",
          });
        }
      });
    },
    copyNowDoc() {
      copyDoc(this.$store.state.user.userID, this.doc.docID)
        .then((res) => {
          // console.log("副本", res);
          if (res != null) {
            this.$message.success("创建副本成功");
            this.$emit("toRecent", { docID: res });
          }
        })
        .catch((err) => {
          this.$message.error("创建副本失败，请检查网络");
        });
    },
  },
};
</script>
<style scoped>
.triangle {
  border: 8px solid #fff;
  border-top-color: transparent;
  border-right-color: transparent;
  border-left-color: transparent;
  margin-left: 50px;
  width: 8px;
}

.back-item {
  background-color: #fff;
  padding: 8px 0;
  width: 188px;
}

.back-header {
  color: #a5a5a5;
  font-size: 12px;
  line-height: 14px;
  margin-bottom: 8px;
  padding: 0 25px;
}

.back-a {
  align-items: center;
  color: #666;
  cursor: pointer;
  display: flex;
  height: 32px;
  line-height: 32px;
  padding: 0 25px;
}

.back-a:hover {
  background-color: #f4f4f4;
}

.back-a__icon {
  width: 20px;
  height: 20px;
}

.back-a__title {
  font-size: 12px;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.doc-input {
  background-color: transparent;
  border: 0px;
  color: #111;
  padding: 5px 0px;
  font-size: 15px;
  line-height: 1.5;
  margin-left: 20px;
}

.doc-input:focus {
  border-bottom: 1px solid var(--color-main);
}

.doc-right-nav {
  display: flex;
  justify-content: flex-end;
  width: 95%;
}

.team,
.share,
.other {
  margin-right: 20px;
}

.other-list {
  background-color: #fff;
  padding: 8px 0;
}

.other-item {
  align-items: center;
  color: #666;
  cursor: pointer;
  display: flex;
  font-size: 12px;
  height: 32px;
  line-height: 32px;
  padding: 10px 25px;
}

.other-item:hover {
  background-color: #f4f4f4;
}

.other-item--blue {
  color: #a1c4fd;
}

.cooperation-header {
  align-items: center;
  display: flex;
  padding: 0px 50px 0;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.cooperation__header1,
.cooperation__header2 {
  margin-left: 30px;
}

.cooperation-list {
  display: flex;
  flex-direction: column;
}

.item-wrapper {
  width: 100%;
}

.cooperation-item {
  align-items: center;
  cursor: pointer;
  display: flex;
  text-align: center;
  padding: 10px 0;
  width: 300px;
}

.cooperation-item input {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 50px;
}

.cooperation__name1,
.cooperation__name2 {
  color: #000;
  margin-left: 30px;
  width: 64px;
}

.name--blue {
  color: #409eff;
}

.input-share {
  border: 1px solid #91c4f1;
  border-radius: 5px;
  width: 100%;
  padding: 10px;
  margin: 20px 0;
}

.button-share {
  background: #ffffff;
  border: 1px solid #d8e3ec;
  border-radius: 7px;
  color: #60a5dd;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  line-height: 1;
  margin: 0px auto 20px;
  padding: 12px 20px;
  text-align: center;
}

.hover-line {
  align-items: center;
  display: flex;
  justify-content: space-around;
  margin: 5px 0;
  width: 100%;
}

.hover-line button {
  padding: 10px;
}

.hover-div {
  background-color: var(--color-main);
  margin: 5px auto;
  width: 90%;
}

.side-bar {
  height: 100vh;
  margin-left: 100%;
  width: 100%;
  overflow: hidden;
  position: fixed;
  padding-top: 9vh;
  padding-bottom: 8vh;
  padding-left: 1vh;
  transition: ease 0.6s;
  z-index: 1;
}

.side-bar--comment {
  z-index: 11;
}

.side-bar-active {
  transform: translateX(-100%);
  transition: ease 0.6s;
}

.switch-type {
  width: 10vh;
  height: 4vh;
  margin-bottom: 2vh;
  margin-left: 35%;
}

.collaborators {
  align-items: center;
  display: flex;
}

.collaborator-image {
  border-radius: 50%;
  cursor: pointer;
  margin-right: 20px;
  width: 30px;
}
</style>
