<template>
  <div>
    <div v-if="!noneShow" class="docs">
      <div v-for="doc in myCollection" :key="doc.docID" class="doc">
        <l-card :ID="doc.docID" :title="doc.docTitle">
          <div slot="hide-content" class="hide-nav">
            <my-button type="text" class="nav-btn">移出收藏</my-button>
            <my-button type="text" class="nav-btn" @click="toRename(doc.docID)"
              >重命名</my-button
            >
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
    <l-show-none v-else style="height: 70vh"></l-show-none>
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
    <m-hover
      :onShow="docRenameHoverOn"
      title="修改文档标题"
      assureBtn="确认"
      cancelBtn="取消"
      @cancel="cancelRename"
      @submit="renameDoc"
    >
      <div class="hover-whole">
        <div class="hover-text">
          请输入新的文档标题:
        </div>
        <input
          class="hover-input"
          placeholder="新的文档标题"
          v-model="newDocTitle"
        />
      </div>
    </m-hover>
  </div>
</template>

<script>
import { getFavoriteDocs } from "network/doc.js";
import { deleteDoc } from "network/doc.js";
import { editDocTitle } from "network/doc.js";

export default {
  name: "MyCollection",
  data() {
    return {
      user: "",
      myCollection: "",
      noneShow: false,
      docDeleteHoverOn: false,
      docToDeleteID: "",
      docRenameHoverOn: false,
      docToRenameID: "",
      newDocTitle: "",
    };
  },
  methods: {
    cancelRename() {
      this.docRenameHoverOn = false;
    },
    toRename(docID) {
      this.docRenameHoverOn = true;
      this.docToRenameID = docID;
    },
    renameDoc() {
      if (this.newDocTitle.length === 0) {
        this.$message.error("文档标题不能为空");
        return;
      }
      editDocTitle(this.user.userID, this.docToRenameID, this.newDocTitle).then(
        res => {
          console.log(this.newDocTitle);
          if (res === 1) {
            this.$message.error("重命名文档失败，请检查网络或联系管理员");
          } else {
            this.docRenameHoverOn = false;
            this.$message({
              message: "重命名文档成功",
              type: "success"
            });
            getFavoriteDocs(this.user.userID).then(res => {
              this.myCollection = res;
              if (res.length === 0) this.noneShow = true;
            });
          }
        }
      );
    },
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
          getFavoriteDocs(this.user.userID).then(res => {
            this.myCollection = res;
            if (res.length === 0) this.noneShow = true;
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
    getFavoriteDocs(this.user.userID).then(res => {
      this.myCollection = res;
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
  padding: 10px 35px;
}

.hide-nav {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.hover-whole {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.hover-text {
  margin: 0 auto;
  padding: 20px;
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
</style>
