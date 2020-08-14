<template>
  <div>
    <div v-if="!noneShow" class="docs">
      <div v-for="doc in myDocs" :key="doc.docID" class="doc">
        <l-card :ID="doc.docID" :title="doc.docTitle">
          <div slot="hide-content" class="hide-nav">
            <my-button
              type="text"
              class="nav-btn"
              @click="toCollectDoc(doc.docID)"
              >收藏</my-button
            >
            <my-button type="text" class="nav-btn">重命名</my-button>
            <my-button type="text" class="nav-btn">分享</my-button>
            <my-button
              type="text-danger"
              class="nav-btn"
              @click="deleteNotice(doc.docID)"
              >删除</my-button
            >
          </div>
        </l-card>
      </div>
    </div>
    <l-show-none v-else></l-show-none>
    <m-hover
      :onShow="docDeleteHoverOn"
      title="删除文档"
      assureBtn="确认"
      cancelBtn="手滑了"
      @cancel="cancelDelete"
      @submit="deleteDoc"
    >
      <div class="hover-text">
        删除文档后可以在回收站中还原文档，确认要删除该文档吗？
      </div>
    </m-hover>
  </div>
</template>

<script>
import { getMyDocs } from "network/workspace.js";
import { deleteDoc } from "network/workspace.js";
import { collectDoc } from "network/workspace.js";

export default {
  name: "IMade",
  data() {
    return {
      user: "",
      myDocs: "",
      noneShow: false,
      docDeleteHoverOn: false,
      docToDeleteID: ""
    };
  },
  methods: {
    deleteNotice(docID) {
      this.docDeleteHoverOn = true;
      this.docToDeleteID = docID;
    },
    cancelDelete() {
      this.docDeleteHoverOn = false;
    },
    deleteDoc() {
      deleteDoc(this.user.userID, this.docToDeleteID).then(res => {
        if (res === 1) {
          this.$message.error("删除文档失败，请检查网络或联系管理员");
        } else {
          this.docDeleteHoverOn = false;
          this.$message({
            message: "删除文档成功",
            type: "success"
          });
          getMyDocs(this.user.userID).then(res => {
            this.myDocs = res;
            if (res.length === 0) this.noneShow = true;
          });
        }
      });
    },
    toCollectDoc(docID) {
      collectDoc(this.user.userID, docID).then(res => {
        console.log(res);
        if (res === 1) {
          this.$message.error("收藏文档失败，请检查网络或联系管理员");
        } else {
          this.docDeleteHoverOn = false;
          this.$message({
            message: "收藏文档成功",
            type: "success"
          });
        }
      });
    }
  },
  created() {
    this.user = this.$store.state.user;

    if (!this.user.userID) {
      this.$message.error("请先登录");
      return;
    }
    getMyDocs(this.user.userID).then(res => {
      this.myDocs = res;
      if (res.length === 0) this.noneShow = true;
    });
  }
};
</script>

<style scoped>
.docs {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.doc {
  margin-left: 30px;
  margin-right: 10px;
  margin-top: 20px;
}

.nav-btn {
  margin-top: 3px;
  margin-bottom: 3px;
  padding: 10px 35px;
}

.hide-nav {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.hover-text {
  margin: 0 auto;
  width: 100%;
}
</style>
