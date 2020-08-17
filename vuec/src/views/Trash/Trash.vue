<template>
  <div>
    <div class="second-nav-list">
      <div class="align-icon-outer">
        <div class="align-icon-inner">
          <m-nav-dropdown v-if="showMoreOrNot" triColor="#DCDFE6">
            <div style="height=20px" slot="show">
              <img src="@/assets/icon/home/more.svg" class="align-icon" />
            </div>
            <div slot="hide" class="batch-nav">
              <my-button
                type="text"
                class="nav-btn"
                @click="batchRecover"
                >批量还原</my-button
              >
              <my-button
                type="text-danger"
                class="nav-btn"
                @click="batchAbsoluteDelete"
                >批量彻底删除</my-button
              >
            </div>
          </m-nav-dropdown>
          <img
            src="@/assets/icon/home/block.svg"
            class="align-icon"
            @click="toBlock"
          />
          <img
            src="@/assets/icon/home/list.svg"
            class="align-icon"
            @click="toList"
          />
        </div>
      </div>
    </div>
    <div
      v-if="!noneShow"
      style="height: 80vh;margin: 20px;margin-left: 45px;overflow: auto;"
    >
      <div v-if="alignStyle" class="docs-block" @click="cancelBatch">
        <div
          v-for="doc in myDeletedDocs"
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
                @click="toRecover(doc.docID)"
                >还原</my-button
              >
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
      <div v-else class="docs-list" @click="cancelBatch">
        <div
          v-for="doc in myDeletedDocs"
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
                @click="toRecover(doc.docID)"
                >还原</my-button
              >
              <my-button
                type="text-danger"
                class="nav-btn"
                @click="absoluteDeleteNotice(doc.docID)"
                >彻底删除</my-button
              >
            </div>
          </l-lcard>
        </div>
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
    <m-hover
      :onShow="batchDocAbsoluteDeleteHoverOn"
      title="批量彻底删除文档"
      assureBtn="确认"
      cancelBtn="手滑了"
      @cancel="cancelBatchAbsoluteDelete"
      @submit="absoluteDeleteBatchDoc"
    >
      <div class="hover-text">
        彻底删除文档将永久删除文档，确认要批量彻底删除文档吗？
      </div>
    </m-hover>
  </div>
</template>

<script>
import { getDeletedDocs } from "network/doc.js";
import { deleteDoc } from "network/doc.js";
import { recoverDoc } from "network/doc.js";
import { docBatchDelete, docBatchRecover } from "@/network/doc";
const qs = require("qs");

export default {
  name: "Trash",
  data() {
    return {
      user: "",
      myDeletedDocs: "",
      noneShow: false,
      docAbsoluteDeleteHoverOn: false,
      docToAbsoluteDeleteID: "",
      alignStyle: true,
      batchDocAbsoluteDeleteHoverOn: false,
      batchOrNot: true,
      batchDocs: [],
      showMoreOrNot: false
    };
  },
  methods: {
    toBlock() {
      console.log(this.alignStyle);
      this.alignStyle = true;
    },
    toList() {
      console.log(this.alignStyle);
      this.alignStyle = false;
    },
    toRecover(docID) {
      recoverDoc(this.user.userID, docID).then(res => {
        if (res === 1) {
          this.$message.error("恢复文档失败，请检查网络或联系管理员");
        } else {
          this.$message({
            message: "恢复成功",
            type: "success"
          });
        }
        getDeletedDocs(this.user.userID).then(res => {
          this.myDeletedDocs = res;
          if (res.length === 0) this.noneShow = true;
        });
      });
    },
    absoluteDeleteNotice(docID) {
      this.docToAbsoluteDeleteID = docID;
      this.docAbsoluteDeleteHoverOn = true;
    },
    cancelAbsoluteDelete() {
      this.docAbsoluteDeleteHoverOn = false;
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
    cancelBatch() {
      this.batchOrNot = false;
    },
    confirmBatch() {
      this.batchOrNot = true;
    },
    addToBatchDocs(docID) {
      this.batchDocs.push(docID);
      this.showMoreOrNot = true;
    },
    removeFromBatchDocs(docID) {
      for (var i = 0; i < this.batchDocs.length; i++) {
        if (this.batchDocs[i] == docID) {
          this.batchDocs.splice(i, 1);
          break;
        }
      }
      if (this.batchDocs.length === 0) this.showMoreOrNot = false;
    },
    batchAbsoluteDelete() {
      this.batchDocAbsoluteDeleteHoverOn = true;
    },
    cancelBatchAbsoluteDelete() {
      this.batchDocAbsoluteDeleteHoverOn = false;
    },
    absoluteDeleteBatchDoc() {
      var chosen_Docs = qs.stringify(this.batchDocs, { indices: false });
      docBatchDelete(chosen_Docs, this.user.userID)
        .then(res => {
          if (res == 0) {
            this.batchDocAbsoluteDeleteHoverOn = false;
            this.showMoreOrNot = false;
            this.$message.success("批量彻底删除成功");
            getDeletedDocs(this.user.userID).then(res => {
              this.myDeletedDocs = res;
              if (res.length === 0) this.noneShow = true;
            });
          } else {
            this.$message.error("请检查网络，删除失败");
            return;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("请检查网络，删除失败");
          return;
        });
    },
    batchRecover() {
      var chosen_Docs = qs.stringify(this.batchDocs, { indices: false });
      docBatchRecover(chosen_Docs, this.user.userID)
        .then(res => {
          if (res == 0) {
            this.showMoreOrNot = false;
            this.$message({
              message: "批量还原成功",
              type: "success"
            });
            getDeletedDocs(this.user.userID).then(res => {
              this.myDeletedDocs = res;
              if (res.length === 0) this.noneShow = true;
            });
          } else {
            this.$message.error("请检查网络，删除失败");
            return;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("请检查网络，删除失败");
          return;
        });
    },
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

.batch-nav {
  align-items: center;
  background-color: #fafbfc;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 5px 8px;
}

.second-nav-list {
  /* background-color: #fff;
  box-shadow: var(--box-shadow); */
  align-items: center;
  border-radius: 12px;
  display: flex;
  margin: 10px 20px;
  padding: 10px 0;
}

.align-icon-outer {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}

.align-icon-inner {
  align-items: center;
  display: flex;
}

.align-icon {
  cursor: pointer;
  margin-right: 2px;
  margin-left: 2px;
  width: 20px;
  height: 20px;
}

.hover-text {
  margin: 0 auto;
  padding: 20px;
}
</style>
