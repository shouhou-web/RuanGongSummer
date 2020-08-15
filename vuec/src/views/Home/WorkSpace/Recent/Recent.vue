<template>
  <div>
    <div v-if="!noneShow" class="docs">
      <div v-for="doc in myDocs" :key="doc.docID" class="doc">
        <l-card :ID="doc.docID" :title="doc.docTitle"></l-card>
      </div>
    </div>
    <l-show-none v-else style="height: 70vh"></l-show-none>
  </div>
</template>

<script>
import { getRecentDocs } from "network/doc.js";

export default {
  name: "Recent",
  data() {
    return {
      user: "",
      myDocs: "",
      noneShow: true
    };
  },
  created() {
    this.user = this.$store.state.user;

    if (!this.user.userID) {
      this.$message.error("请先登录");
      return;
    }
    getRecentDocs(this.user.userID).then(res => {
      this.myDocs = res;
      console.log(this.myDocs);
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
</style>
