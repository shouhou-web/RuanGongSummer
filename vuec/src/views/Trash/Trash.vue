<template>
  <div>
    <div class="second-nav-list">
      <div class="align-icon-outer">
        <div class="align-icon-inner">
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
      <div v-if="alignStyle" class="docs-block">
        <div v-for="doc in myDeletedDocs" :key="doc.docID" class="doc">
          <l-card :ID="doc.docID" :title="doc.docTitle">
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
      <div v-else class="docs-list">
        <div v-for="doc in myDeletedDocs" :key="doc.docID" class="doc">
          <l-lcard
            :ID="doc.docID"
            :title="doc.docTitle"
            :time="doc.lastEditTime"
            :creatorID="user.userID"
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
  </div>
</template>

<script>
import { getDeletedDocs } from "network/doc.js";
import { deleteDoc } from "network/doc.js";
import { recoverDoc } from "network/doc.js";

export default {
  name: "Trash",
  data() {
    return {
      user: "",
      myDeletedDocs: "",
      noneShow: false,
      docAbsoluteDeleteHoverOn: false,
      docToAbsoluteDeleteID: "",
      alignStyle: true
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
  margin-right: 2px;
  margin-left: 2px;
}
</style>
