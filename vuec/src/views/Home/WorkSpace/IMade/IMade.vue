<template>
  <div>
    <div v-if="!noneShow" class="docs">
      <div v-for="doc in myDocs" :key="doc.docID" class="doc">
        <l-card :ID="doc.docID" :title="doc.docTitle"></l-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getMyDocs } from "../../../../network/workspace.js";

export default {
  name: "IMade",
  data() {
    return {
      user: "",
      myDocs: "",
      myDocNum: 0,
      noneShow: false
    };
  },
  created() {
    this.user = this.$store.state.user;

    if (!this.user.userID) {
      this.$message.error("请先登录");
      return;
    }
    getMyDocs(this.user.userID).then(res => {
      this.myDocs = res;
      this.myDocNum = res.length;
      console.log(this.myDocs);
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
</style>
