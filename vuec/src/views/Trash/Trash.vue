<template>
  <div>
    <div v-if="!noneShow" class="docs">
      <div v-for="doc in myDeletedDocs" :key="doc.docID" class="doc">
        <l-card :ID="doc.docID" :title="doc.docTitle">
          <div slot="hide-content" class="hide-nav">
            <my-button type="text" class="nav-btn">还原</my-button>
            <my-button
              type="text-danger"
              class="nav-btn"
              @click="absoluteDeleteNotice(doc.docID)"
              >彻底删除</my-button
            >
          </div>
        </l-card>
      </div>
    </div>
    <l-show-none v-else></l-show-none>
    <m-hover
      :onShow="docAbsoluteDeleteHoverOn"
      title="彻底删除文档"
      assureBtn="确认"
      cancelBtn="手滑了"
      @cancel="cancelAbsoluteDelete"
      @submit="absoluteDeleteDoc"
    >
      <div class="hover-text">
        彻底删除文档将永久删除文档，确认要彻底删除该文档吗？
      </div>
    </m-hover>
  </div>
</template>

<script>
import { getDeletedDocs } from "network/trash.js";
import { deleteDoc } from "network/trash.js";

export default {
  name: "Trash",
  data() {
    return {
      user: "",
      myDeletedDocs: "",
      noneShow: false,
      docAbsoluteDeleteHoverOn: false,
      docToAbsoluteDeleteID: ""
    };
  },
  methods: {
    absoluteDeleteNotice(docID) {
      this.docToAbsoluteDeleteID = docID;
      this.docAbsoluteDeleteHoverOn = true;
    },
    absoluteDeleteDoc() {
      deleteDoc(this.user.userID, this.docToAbsoluteDeleteID).then(res => {
        if (res === 1) {
          this.$message.error("彻底删除文档失败，请检查网络或联系管理员");
        } else {
          this.docAbsoluteDeleteHoverOn = false;
          this.$message({
            message: "文档已被彻底删除",
            type: "success"
          });
          getDeletedDocs(this.user.userID).then(res => {
            this.myDeletedDocs = res;
            if (res.length === 0) this.noneShow = true;
          });
        }
      });
    },
    cancelAbsoluteDelete() {
      this.docAbsoluteDeleteHoverOn = false;
    }
  },
  created() {
    this.$store.state.hasTeam = false;
    this.$store.state.nowTeamID = -1;

    this.user = this.$store.state.user;

    if (!this.user.userID) {
      this.$message.error("请先登录");
      return;
    }
    getDeletedDocs(this.user.userID).then(res => {
      this.myDeletedDocs = res;
      if (res.length === 0) this.noneShow = true;
    });
  }
};
</script>

<style scoped>
.docs {
  display: flex;
  flex-wrap: wrap;
}

.doc {
  margin-left: 30px;
  margin-right: 10px;
  margin-top: 20px;
}

.nav-btn {
  margin-top: 3px;
  margin-bottom: 3px;
  padding: 10px 25px;
}

.hide-nav {
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>
