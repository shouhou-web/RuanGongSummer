<template>
  <div>
    <div v-if="!noneShow">
      <div v-if="alignStyle" class="docs-block" @click="cancelBatch">
        <div
          v-for="doc in myRecentDocs"
          :key="doc.docID"
          class="doc"
          @click.stop="confirmBatch"
        >
          <l-card
            :ID="doc.docID"
            :title="doc.docTitle"
            :forceUnchecked="batchOrNot"
            @addDoc="addToBatchDocs"
            @cancelDoc="removeFromBatchDocs"
          >
            <div slot="hide-content" class="hide-nav">
              <my-button
                type="text"
                class="nav-btn"
                @click="toCollectDoc(doc.docID)"
                >收藏</my-button
              >
              <my-button
                type="text"
                class="nav-btn"
                @click="toRename(doc.docID)"
                >重命名</my-button
              >
              <my-button type="text"
                         class="nav-btn"
                         @click="shareDoc(doc.docID,doc.docTitle)">分享</my-button>
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
      <div v-else class="docs-list" @click="cancelBatch">
        <div
          v-for="doc in myRecentDocs"
          :key="doc.docID"
          class="doc"
          @click.stop="confirmBatch"
        >
          <l-lcard
            :ID="doc.docID"
            :title="doc.docTitle"
            :time="doc.lastEditTime"
            :creatorID="user.userID"
            :forceUnchecked="batchOrNot"
            @addDoc="addToBatchDocs"
            @cancelDoc="removeFromBatchDocs"
          >
            <div slot="hide-content" class="hide-nav">
              <my-button
                type="text"
                class="nav-btn"
                @click="toCollectDoc(doc.docID)"
                >收藏</my-button
              >
              <my-button
                type="text"
                class="nav-btn"
                @click="toRename(doc.docID)"
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
          </l-lcard>
        </div>
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
      :onShow="batchDocDeleteHoverOn"
      title="批量删除文档"
      assureBtn="确认"
      cancelBtn="手滑了"
      @cancel="cancelBatchDelete"
      @submit="deleteBatchDoc"
    >
      <div class="hover-text">
        被删除的文档后可以在回收站中还原文档，确认要删除该文档吗？
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
    <m-hover :on-show="openShare" title="分享此文档链接">
      <div>
        <input type="text"
               id="input"
               :value="shareSrc"
               class="input-share" readonly="">
        <br>
        <span v-clipboard:copy="shareSrc"
              v-clipboard:success="onCopy"
              v-clipboard:error="onCopyError" class="button-share">
          复制
        </span>
      </div>
    </m-hover>
  </div>
</template>

<script>
import { getRecentDocs } from "network/doc.js";
import { deleteDoc } from "network/doc.js";
import { collectDoc } from "network/doc.js";
import { editDocTitle } from "network/doc.js";
import { docBatchDelete, docBatchFavorite } from "@/network/doc";
const qs = require("qs");

export default {
  name: "Recent",
  data() {
    return {
      user: "",
      myRecentDocs: "",
      noneShow: false,
      docDeleteHoverOn: false,
      docToDeleteID: "",
      batchDocDeleteHoverOn: false,
      docRenameHoverOn: false,
      docToRenameID: "",
      newDocTitle: "",
      batchOrNot: true,
      batchDocs: [],
      shareSrc: '',
      openShare: false,
    };
  },
  methods: {
    cancelBatch() {
      this.batchOrNot = false;
    },
    confirmBatch() {
      this.batchOrNot = true;
    },
    addToBatchDocs(docID) {
      this.batchDocs.push(docID);
      this.$emit("showMore");
    },
    removeFromBatchDocs(docID) {
      for (var i = 0; i < this.batchDocs.length; i++) {
        if (this.batchDocs[i] == docID) {
          this.batchDocs.splice(i, 1);
          break;
        }
      }
      if (this.batchDocs.length === 0) this.$emit("hideMore");
    },
    batchDelete() {
      this.batchDocDeleteHoverOn = true;
    },
    cancelBatchDelete() {
      this.batchDocDeleteHoverOn = false;
    },
    deleteBatchDoc() {
      var chosen_Docs = qs.stringify(this.batchDocs, { indices: false });
      docBatchDelete(chosen_Docs, this.user.userID)
        .then(res => {
          if (res == 0) {
            this.batchDocDeleteHoverOn = false;
            this.$emit("hideMore");
            this.$notify.success("批量删除成功");
            getRecentDocs(this.user.userID).then(res => {
              this.myRecentDocs = res;
              if (res.length === 0) this.noneShow = true;
            });
          } else {
            this.$notify.error("请检查网络，删除失败");
            return;
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify.error("请检查网络，删除失败");
          return;
        });
    },
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
            getRecentDocs(this.user.userID).then(res => {
              this.myRecentDocs = res;
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
          getRecentDocs(this.user.userID).then(res => {
            this.myRecentDocs = res;
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
    },
    shareDoc(docID,docTitle) {
      var toDoc = window.location.href;
      toDoc = toDoc.substring(0,toDoc.length - 15);
      toDoc = toDoc + '/doc?docID=' + docID + '&docTitle=' + docTitle;
      console.log(toDoc);
      this.shareSrc = toDoc;
      this.openShare = true;
    },
    cancelShare() {
      this.openShare = false;
    },
    onCopy() {
      this.$message.success('复制成功！');
      this.openShare = false;
    },
    onCopyError() {
      this.$message.error('复制失败');
    }
  },
  created() {
    this.user = this.$store.state.user;

    if (!this.user.userID) {
      this.$message.error("请先登录");
      return;
    }
    getRecentDocs(this.user.userID).then(res => {
      this.myRecentDocs = res;
      console.log(this.myRecentDocs);
    });
  },
  props: {
    alignStyle: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
.docs-block {
  display: flex;
  flex-wrap: wrap;
}

.docs-list {
  display: flex;
  flex-direction: column;
}

.doc {
  margin-left: 30px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
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

.input-share{
  border: 1px solid #91c4f1;
  border-radius: 5px;
  width: 100%;
  padding: 10px;
}

.button-share{
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

.button-share:hover{
  color: #25374f;
  border-color: #c6e2ff;
  box-shadow: 2px 3px 5px 1px rgba(29, 120, 223, 0.2);
  transition: 0.5s;
}
</style>
