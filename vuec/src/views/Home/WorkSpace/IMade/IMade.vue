<template>
  <div>
    <div v-if="!noneShow" class="docs">
      <div v-for="doc in myDocs" :key="doc.docID" class="doc">
        <l-card :ID="doc.docID" :title="doc.docTitle">
          <div slot="hide-content" class="hide-nav">
            <my-button type="text" class="nav-btn">打开</my-button>
            <my-button type="text" class="nav-btn">收藏</my-button>
            <my-button type="text" class="nav-btn">重命名</my-button>
            <my-button type="text" class="nav-btn">分享</my-button>
            <my-button type="text-danger" class="nav-btn">删除</my-button>
          </div>
        </l-card>
      </div>
    </div>
    <l-show-none v-else></l-show-none>
  </div>
</template>

<script>
import { getMyDocs } from "../../../../network/workspace.js";
import LShowNone from "components/content/l-show-none/LShowNone";

export default {
  name: "IMade",
  data() {
    return {
      user: "",
      myDocs: "",
      noneShow: false
    };
  },
  components: {
    LShowNone
  },
  created() {
    this.user = this.$store.state.user;

    if (!this.user.userID) {
      this.$message.error("请先登录");
      return;
    }
    getMyDocs(this.user.userID).then(res => {
      this.myDocs = res;
      console.log(this.myDocs.length);
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
</style>
