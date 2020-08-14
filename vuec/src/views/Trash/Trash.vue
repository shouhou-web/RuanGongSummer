<template>
  <div>
    <div class="opt">
      <m-nav-dropdown position="left" class="l-card__nav">
        <div slot="show">
          <img class="l-card__setting" src="@/assets/image/teamopt.svg">
        </div>
        <div slot="hide" style="border: 1px solid #ececec;border-radius: 5px;background-color: white">
          <div class="l-card__hide-main">
            <my-button type="text-danger"
                       class="l-card__nav-btn">自己加就行</my-button>
            <my-button type="text"
                       class="l-card__nav-btn">自己加就行</my-button>
          </div>
        </div>
        <input/>
      </m-nav-dropdown>
    </div>
    <div v-if="!noneShow" class="docs" style="background-color: white;height: 80vh;margin: 20px;margin-left: 45px;overflow: auto;">
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
.opt{
  float: right;
  height: 10px;
  margin-top: -1vh;
  margin-right: 2vh;
  margin-left: 1vh;
}

.l-card {
  align-items: center;
  color: #303133;
  transition: 0.3s;
  overflow: hidden;
  -webkit-transition: 0.3s;
}

.l-card__nav {
  align-self: flex-end;
  margin-right: 2px;
  margin-top: 2px;
}

.l-card__setting {
  height: 18px;
  width: 18px;
}

.l-card__pic {
  width: 80px;
  height: 80px;
}

.l-card__body {
  margin: 10px 20px;
}

.l-card__hide-main {
  margin: auto;
  background-color: #FAFBFC;
  display: flex;
  flex-direction: column;
}

.l-card__nav-btn {
  padding: 10px 20px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.l-card__nav-btn:hover {
}
</style>
