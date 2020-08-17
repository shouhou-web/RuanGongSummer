<template>
  <div>
    <m-header bgColor="#f7f7f7">
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
          <div class="team">
            <my-button @click="openCooperation" size="small">协作</my-button>
          </div>
          <div class="share">
            <my-button size="small" @click="openCopy">分享</my-button>
          </div>
          <div class="share">
            <my-button size="small" @click="isOpenComment = !isOpenComment">评论</my-button>
          </div>
          <div class="share">
            <my-button size="small" @click="">历史</my-button>
          </div>
          <div class="other">
            <m-nav-dropdown position="middle">
              <my-button slot="show" size="small">其他操作</my-button>
              <div slot="hide">
                <ul class="other-list">
                  <li class="other-item">
                    收藏文档
                  </li>
                  <li class="other-item" @click="openCopy">
                    分享文档
                  </li>
                  <li class="other-item other-item--red">
                    删除文档
                  </li>
                </ul>
              </div>
            </m-nav-dropdown>
          </div>
        </div>

        <!-- 分享 -->
        <m-hover :on-show="openShare" title="分享此文档链接" :width="350">
          <div>
            <input
              type="text"
              id="input"
              :value="shareSrc"
              class="input-share"
              readonly=""
            />
            <br />
            <span
              v-clipboard:copy="shareSrc"
              v-clipboard:success="onCopy"
              v-clipboard:error="onCopyError"
              class="button-share"
            >
              复制
            </span>
          </div>
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
    <div class="side-bar" v-if="isOpenComment">
      <doc-comment :doc="doc"></doc-comment>
    </div>
  </div>
</template>

<script>
import MHeader from "components/common/m-header/MHeader.vue";
import docComment from "@/components/content/m-doc-header/childCpn/docComment";
import { editDocTitle, getRecentDocs, setDocLimit } from "network/doc";
export default {
  name: "MDocHeader",
  components: {
    MHeader,
    docComment
  },
  props: {
    doc: {
      // 文档对象
      type: Object,
      default: {},
    },
  },
  mounted() {
    getRecentDocs(this.$store.state.user.userID).then((res) => {
      this.recentDoc = res;
      if (res.length > 10) {
        this.recentDoc = res.slice(0, 9);
      }
    });
  },
  computed: {},
  data() {
    return {
      isOtherCan: false,
      isOtherCant: false,
      isTeamRead: false,
      isTeamWrite: false,
      isCooperation: false, // 是否编辑权限
      isOpenComment: false,
      docIdentity: 0, // 文档权限
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
      console.log("docLimit", val.docLimit);
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
          console.log(1);
          break;
        case 2:
          this.isOtherCan = true;
          this.isTeamRead = true;
          this.isTeamWrite = false;
          console.log(233);
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
  },
  methods: {
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
      console.log("child:toRecent");
      this.$emit("toRecent", item);
    },
    // 复制
    openCopy() {
      this.openShare = true;
      var toDoc = window.location.href;
      this.shareSrc = toDoc;
      console.log(toDoc);
    },
    onCopy() {
      this.$message.success("复制成功！");
      this.openShare = false;
    },
    onCopyError() {
      this.$message.error("复制失败");
    },
  },
  created() {
    console.log('HEADER CREATED');
  }
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

.other-item--red {
  color: var(--color-tint);
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
}

.button-share {
  position: fixed;
  margin-top: 10px;
  margin-left: 120px;
  background: #ffffff;
  border: 1px solid #d8e3ec;
  border-radius: 7px;
  color: #60a5dd;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  line-height: 1;
  padding: 12px 20px;
  text-align: center;
  transition: ease-in-out 0.5s;
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

.side-bar{
  width: 20%;
  height: 100vh;
  position: fixed;
  overflow: auto;
  margin-left: 80%;
  padding-top: 9vh;
  padding-bottom: 8vh;
  padding-left: 1vh;
}

.switch-type{
  width: 10vh;
  height: 4vh;
  margin-bottom: 2vh;
  margin-left: 35%;
}
</style>
