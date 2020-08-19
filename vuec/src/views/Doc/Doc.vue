<template>
  <div id="doc">
    <div class="header">
      <m-doc-header
        :doc="doc"
        :collaboratorInfo="collaborators"
        @toRecent="toRecent"
      ></m-doc-header>
    </div>
    <div class="editor">
      <in-editor :disabled="disabled" :doc="doc"></in-editor>
    </div>

    <m-hover
      title="登录"
      assureBtn="登录"
      cancelBtn="取消"
      :onShow="openLogin"
      @submit="login"
      @cancel="cancel"
    >
      <input
        class="hover-input"
        placeholder="账号名称/邮箱"
        v-model="name"
        type="text"
      />
      <input
        class="hover-input"
        placeholder="密码"
        v-model="password"
        type="password"
      />
      <router-link
        class="hover-link"
        :to="{ path: '/login', query: { page: 1 } }"
      >
        还没有账号？前往注册
      </router-link>
    </m-hover>
  </div>
</template>

<script>
import MDocHeader from "@/components/content/m-doc-header/MDocHeader";
import inEditor from "./childCpn/in-editor/index";
import {
  getDoc,
  getDocLimit,
  getCollaboratorInfo,
  getDocCollaborator,
} from "network/doc";
import { login } from "network/user";
export default {
  name: "Doc",
  components: {
    inEditor,
    MDocHeader,
  },
  data() {
    return {
      doc: {
        docID: "",
        docTitle: "无标题",
        docContent: "",
      },
      disabled: false, // 是否禁用
      // login相关
      openLogin: false,
      name: "", // 账号
      password: "", // 密码
      collaborators: [], // 协作者
    };
  },
  created() {
    // console.log("docID", this.$route.query.docID);
    // console.log("docTitle", this.$route.query.docTitle);
    let userID = this.$store.state.user.userID;
    let docID = this.$route.query.docID;
    let docTitle = this.$route.query.docTitle;
    if (userID == null) {
      this.$notify.info({
        title: "您还未登录",
        message: "请登录已获取文档阅读权限~",
      });
      this.openLogin = true;
    }
    // else if (docTitle == "")
    //   // 新建文档
    //   this.doc.docID = docID;
    else this._index(userID, docID);
  },
  methods: {
    // login登录
    login() {
      if (!this.name || !this.password) {
        this.$message.error("请完整填写信息~");
        return;
      }
      login(this.name, this.password)
        .then((res) => {
          if (res == null) {
            this.$notify.error({
              title: "网络错误",
              message: "请稍后重试~",
            });
          } else {
            this.openLogin = false;
            this.$store.commit("login", res);
            this.$notify({
              title: "成功",
              message: "登录成功",
              type: "success",
            });
            this._index(this.$store.state.user.userID, this.$route.query.docID);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~",
          });
        });
    },
    // 取消时做身份验证
    cancel() {
      let userID = this.$store.state.user.userID;
      if (userID == null) {
        this.$notify.info({
          title: "您还未登录",
          message: "请登录已获取文档阅读权限~",
        });
        return;
      }
      this.openLogin = false;
    },
    // 完整流程
    _index(userID, docID) {
      // 获取doc数据
      this._getDoc(userID, docID);
      // 获取权限
      this._getDocLimit(userID, docID);
      // console.log('要设置的数据',this.$route.query.docID)
      this.$store.commit("setDocID", this.$route.query.docID);
      getCollaboratorInfo(this.$route.query.docID)
        .then((res) => {
          console.log("这回该有了吧", res);
          this.$store.commit("setDocCol", res);
        })
        .then(
          getDocCollaborator(this.$route.query.docID).then((res) => {
            this.collaborators = res;
            console.log(res);
          })
        );
    },
    // 获取doc数据
    _getDoc(userID, docID) {
      getDoc(userID, docID)
        .then((res) => {
          // console.log(res);
          // 暂时直接赋值
          this.doc = res;
        })
        .catch((err) => {
          console.log(err);
          this.$notify.error({
            title: "网络错误",
            message: "请稍后重试~",
          });
        });
    },
    // 获取文档权限
    _getDocLimit(userID, docID) {
      getDocLimit(userID, docID).then((res) => {
        if (res == 0) this.disabled = false;
        else if (res == 1) this.disabled = true;
        else {
          this.$notify.error({
            title: "错误",
            message: "您没有该文档的阅读权限~",
          });
          this.$router.push({ path: "/home" });
        }
      });
    },
    // 跳转到最近的文档
    toRecent(item) {
      // console.log("father:toRecent");
      this._index(this.$store.state.user.userID, item.docID);
      this.$router.push({
        path: "/doc",
        query: { docID: item.docID },
      });
    },
  },
};
</script>

<style scoped>
#doc {
  overflow-x: hidden;
  overflow-y: hidden;
}

.hover-input {
  border: 1px solid var(--color-main);
  border-radius: 4px;
  color: #111;
  padding: 15px 20px;
  font-size: 15px;
  line-height: 1.5;
  margin-top: 10px;
  width: 360px;
}

.hover-input:focus {
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}

.hover-link {
  color: var(--color-main);
  text-align: center;
  margin-top: 10px;
}
</style>
